from pymilvus import Collection
from watson_essentials import load_llm, get_query_embedding
from secret.config import *

_llm = load_llm(params=llm_params("legal-assist"))

def _search_similar_documents(query_embedding, top_k=5):
    collection = Collection(get_collection_name("legal-assist-data"))
    collection.load()
    search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
    results = collection.search(
        data=[query_embedding],
        anns_field="embedding",
        param=search_params,
        limit=top_k,
        output_fields=["chunk_text", "document_id"]
    )
    collection.release()
    return results[0]

def generate_response(user_input):
    print("[PROCESS] Generating embedding for user input..", flush=True)
    query_embedding = get_query_embedding(user_input)
    print("[LOG] Embedding generated.", flush=True)
    if query_embedding is None:
        print("[LOG-?] Query embedding not obtained.", flush=True)
        return "I'm sorry😔, but I couldn't process your question. Please try again."

    print("[PROCESS] Searching for similar documents...")
    similar_docs = _search_similar_documents(query_embedding)
    if not similar_docs:
        print("[LOG-?] No similar documents found.", flush=True)
        return "I'm sorry🥺, but I couldn't find any relevant information.\nPlease try rephrasing your question.😊"
    print(f"[LOG] Found {len(similar_docs)} similar documents.", flush=True)
    
    retrieved_texts = [
        f"Document: {doc.entity.get('document_id')}\nContent: {doc.entity.get('chunk_text')[:200]}..."
        for doc in similar_docs
    ]
    print(f"[LOG] Retrieved {len(retrieved_texts)} texts.", flush=True)

    prompt = gen_legal_assist_prompt(
        user_query=user_input,
        context=' '.join(retrieved_texts)
    )
    try:
        response = _llm.invoke(prompt)
        return response
    except Exception as e:
        print(f"[ERROR] Error generating LLM response: {str(e)}", flush=True)
        return "I'm sorry, but I encountered an error while generating a response.😔\nPlease try again later."
