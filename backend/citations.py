from pymilvus import Collection
from secret.config import *
from watson_essentials import get_query_embedding, load_llm

_llm = load_llm(params=llm_params('citations'))

# def _search_similar_documents(query_embedding, top_k=5):
#     collection = Collection(get_collection_name('citations-data'))
#     collection.load()
#     search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
#     results = collection.search(
#         data=[query_embedding],
#         anns_field="embedding",
#         param=search_params,
#         limit=top_k,
#         output_fields=["content", "document"]
#     )
#     collection.release()
#     return results[0]

def analyze_legal_case(pdf_text, max_tokens=512):
    # global _similar_docs
    # case_embedding = get_query_embedding(pdf_text[:max_tokens])
    # similar_docs = _search_similar_documents(case_embedding)
    # Prepare retrieved documents for the LLM
    # retrieved_texts = [
    #     f"Document {i+1} (ID: {doc.entity.get('document')}): {doc.entity.get('content')[:200]}..."
    #     for i, doc in enumerate(similar_docs)
    # ]
    prompt =  gen_citation_prompt(
        case_summary=pdf_text,
        # similar_docs=' '.join(retrieved_texts)
    )
    response = _llm.invoke(prompt)
    return response

# def _clean_context(context):
#     sentences = context.split('.')
#     cleaned_sentences = [
#         sentence for sentence in sentences
#         if not sentence.strip().startswith("I apologize but I don't have the necessary knowledge")
#     ]
#     cleaned_context = '. '.join(cleaned_sentences).strip()
#     return cleaned_context

def generate_response(user_input: str, analysis: str):
    try:
        prompt = gen_conversation_prompt(
            citation_summary=analysis,
            user_query=user_input
        )
        print(f"[LOG] Prompt prepared. Prompt length: {len(prompt)}", flush=True)
        
        print("[PROCESS] Fetching response..", flush=True)
        response = _llm.invoke(prompt)
        print("[LOG] Response obtained.", flush=True)
        return response
    except Exception as e:
        print(f"[ERROR] Error in generate_response: {str(e)}", flush=True)
        raise
