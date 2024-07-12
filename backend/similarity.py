import PyPDF2
from pymilvus import Collection
from functools import lru_cache
from typing import List, Dict
import hashlib
from secret.config import *
from watson_essentials import get_query_embedding, load_llm

@lru_cache(maxsize=1)
def get_llm():
    return load_llm(params=llm_params("similarity"))

def generate_document_id(text: str) -> str:
    return hashlib.md5(text.encode()).hexdigest()

def search_similar_docs(query_embedding: List[float], current_doc_id: str, top_k: int = 5) -> List[Dict]:
    collection = Collection(get_collection_name("high-court-data"))
    collection.load()
    results = collection.search(
        data=[query_embedding],
        anns_field="embedding",
        param={"metric_type": "L2", "params": {"nprobe": 10}},
        limit=top_k + 1,  # Fetch one extra to account for potential self-match
        output_fields=["chunk_text", "document_id"],
        expr=f'document_id != "{current_doc_id}"'  # Exclude the current document
    )
    
    return [
        {"content": res.entity.get("chunk_text"), "document_id": res.entity.get("document_id")}
        for res in results[0]
        if res.entity.get("document_id") != current_doc_id
    ][:top_k]

def extract_text_from_pdf(pdf_file) -> str:
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        return "".join(page.extract_text() for page in pdf_reader.pages)
    except PyPDF2.errors.PdfReadError as e:
        raise ValueError(f"Error reading PDF: {e}")

def process_pdf_and_summarize(pdf_file, max_tokens: int = 512) -> str:
    pdf_text = extract_text_from_pdf(pdf_file)
    truncated_text = pdf_text[:max_tokens]
    pdf_embedding = get_query_embedding(truncated_text)
    
    current_doc_id = generate_document_id(truncated_text)
    retrieved_documents = search_similar_docs(pdf_embedding, current_doc_id)
    
    similar_cases = ' '.join(
        f"Case {i+1}: {doc['content'][:200]}..."
        for i, doc in enumerate(retrieved_documents)
    )
    
    prompt = gen_similarity_prompt(
        case_summary=truncated_text,
        similar_cases=similar_cases
    )
    
    llm = get_llm()
    return llm.invoke(prompt)