from langchain_ibm import WatsonxEmbeddings
from langchain_ibm import WatsonxLLM
from ibm_watsonx_ai.foundation_models.utils.enums import EmbeddingTypes
from ibm_watsonx_ai.foundation_models.utils.enums import ModelTypes
from secret.config import *

_embeddings_model = WatsonxEmbeddings(
    model_id=EmbeddingTypes.IBM_SLATE_30M_ENG.value,
    url=watsonx_cred("url"),
    apikey=watsonx_cred("apikey"),
    project_id=watsonx_cred("project-id")
)

def get_query_embedding(query):
    return _embeddings_model.embed_query(query)

def load_llm(params):
    return WatsonxLLM(
        model_id=ModelTypes.GRANITE_13B_CHAT_V2.value,
        url=watsonx_cred("url"),
        apikey=watsonx_cred("apikey"),
        project_id=watsonx_cred("project-id"),
        params=params
    )