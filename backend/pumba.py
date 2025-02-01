import streamlit as st
import chromadb
import chromadb.utils.embedding_functions as embedding_functions
from datetime import datetime
import google.generativeai as genai
import uuid

# Page config
st.set_page_config(page_title="Chat with Memory", layout="wide")

# Initialize session state
if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []
if 'conversation_id' not in st.session_state:
    st.session_state.conversation_id = str(uuid.uuid4())

# Constants
API_KEY = "AIzaSyCaMUsyaIG6IK_AmVWLj6CEyNTUgpQQWR4"  # In production, use st.secrets
COLLECTION_NAME = "chat_memory"

# Initialize ChromaDB and Gemini
google_ef = embedding_functions.GoogleGenerativeAiEmbeddingFunction(api_key=API_KEY)
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize ChromaDB client
chroma_client = chromadb.HttpClient(host='localhost', port=8000)

# Get or create collection
collection = chroma_client.get_or_create_collection(
    name=COLLECTION_NAME,
    embedding_function=google_ef,
    metadata={
        "description": "Chat memory storage",
        "created": str(datetime.now())
    }
)

def store_message(role: str, content: str):
    """Store a message in ChromaDB with embeddings."""
    message_id = f"{st.session_state.conversation_id}_{len(st.session_state.chat_history)}"
    
    # Store in ChromaDB
    collection.upsert(
        documents=[content],
        ids=[message_id],
        metadatas=[{
            "role": role,
            "conversation_id": st.session_state.conversation_id,
            "timestamp": str(datetime.now())
        }]
    )
    
    # Update chat history
    st.session_state.chat_history.append({"role": role, "content": content})

def get_relevant_context(query: str, n_results: int = 5) -> list:
    """Retrieve relevant context from previous conversations."""
    results = collection.query(
        query_texts=[query],
        n_results=n_results,
        where={"conversation_id": st.session_state.conversation_id}
    )
    
    context_messages = []
    for doc, metadata in zip(results['documents'][0], results['metadatas'][0]):
        context_messages.append({
            "role": metadata['role'],
            "content": doc
        })
    
    return context_messages

def generate_response(query: str, context_messages: list) -> str:
    """Generate a response using context-aware prompting."""
    context_str = "\n".join([
        f"{msg['role']}: {msg['content']}" 
        for msg in context_messages
    ])
    
    prompt = f"""You are a helpful assistant in an ongoing conversation. 
    
Previous relevant context:
{'-' * 40}
{context_str}
{'-' * 40}

Current query: {query}

Instructions:
1. Consider the conversation history and context provided above
2. Provide a response that:
   - Maintains continuity with previous relevant messages
   - Directly addresses the current query
   - Uses a natural, conversational tone
   - References relevant information from the context when appropriate
   - Avoids repeating information unless necessary for clarity

Response:"""

    response = model.generate_content(prompt)
    return response.text

# UI Layout
st.title("💬 Chat with Memory")

# Chat interface
for message in st.session_state.chat_history:
    with st.chat_message(message["role"]):
        st.write(message["content"])

# Chat input
if prompt := st.chat_input("What would you like to discuss?"):
    # Display user message
    with st.chat_message("user"):
        st.write(prompt)
    
    # Store user message
    store_message("user", prompt)
    
    # Get relevant context
    context = get_relevant_context(prompt)
    
    # Generate and display response
    with st.chat_message("assistant"):
        response = generate_response(prompt, context)
        st.write(response)
    
    # Store assistant response
    store_message("assistant", response)

# Sidebar for debugging
with st.sidebar:
    st.header("Debug Information")
    if st.button("Show Collection Stats"):
        st.write(f"Total messages: {collection.count()}")
        st.write(f"Current conversation ID: {st.session_state.conversation_id}")
    
    if st.button("Start New Conversation"):
        st.session_state.conversation_id = str(uuid.uuid4())
        st.session_state.chat_history = []
        st.rerun()