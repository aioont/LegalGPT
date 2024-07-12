from flask import Flask, jsonify, redirect, request
from flask_cors import CORS
import os
import PyPDF2
from markdown2 import markdown
from secret.config import *
import legal_assist, similarity, citations
process_pdf_and_summarize = similarity.process_pdf_and_summarize
analyze_legal_case = citations.analyze_legal_case

os.environ["GRPC_DNS_RESOLVER"] = "native"

WEBSITE = "http://localhost:3000" # Frontend website. Changed in prod.

app = Flask(__name__)
CORS(app, resources={
    "/*": {"origins": WEBSITE} 
}, supports_credentials=True)

UPLOAD_FOLDER = './static/files'
app.config['UPLOAD_FOLDER'] =  UPLOAD_FOLDER

connect_to_milvus()

## LEGAL ASSIST #######################################################################################

@app.route("/legal-assist/chat", methods=["POST"])
def legal_assist_chat():
    data = request.json
    query = data.get('query')
    if not query:
        print("[ERROR] No query.", flush=True)
        return jsonify({"error": "No query provided"}), 400
    try:
        print("[PROCESS] Generating response..", flush=True)
        response = legal_assist.generate_response(query)
        print("[LOG] Obtained response.", flush=True)
        return jsonify({"response": markdown(response)}), 200
    except Exception as e:
        print("[ERROR] LLM error.", flush=True)
        return jsonify({"error": str(e)}), 500

## SIMILARITY SEARCH ####################################################################################

@app.route("/similarity-search/doc-upload", methods=["POST"])
def similarity_doc_upload():
    if request.method == 'POST':   
        uploaded_file = request.files['file']
        print("[LOG] File obtained.", flush=True)
        if uploaded_file.filename != '':
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
            uploaded_file.save(file_path)
            print("[LOG] File saved.", flush=True)
            print("[PROCESS] Going to summarize..", flush=True)
            summary = process_pdf_and_summarize(uploaded_file)
            print("[LOG] Summary obtained.", flush=True)
            return jsonify({'result': markdown(summary), 'pdf_name': uploaded_file.filename}), 200

## LEGAL CITATIONS ####################################################################################

@app.route("/legal-citations/doc-upload", methods=["POST"])
def citations_doc_upload():
    if request.method == 'POST':   
        uploaded_file = request.files['file']
        print("[LOG] File obtained.", flush=True)
        if uploaded_file.filename != '':
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
            uploaded_file.save(file_path)
            print("[LOG] File saved.", flush=True)
            
            print("[PROCESS] Going to analyse..", flush=True)
            pdf_text = ""            
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    pdf_text += page.extract_text()
            analysis = analyze_legal_case(pdf_text)
            print("[LOG] Analysis obtained.", flush=True)
            return jsonify({'result': markdown(analysis), 'pdf_name': uploaded_file.filename}), 200

@app.route("/legal-citations/chat", methods=["POST"])
def citations_chat():
    data = request.json
    query = data.get('query')
    analysis = data.get('context')
    if not query:
        return jsonify({"error": "No query provided"}), 400
    try:
        response = citations.generate_response(query, analysis)        
        # Return the response as JSON
        return jsonify({"response": markdown(response)}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

########################################################################################################

@app.route("/")
def root():
    return redirect(WEBSITE)

if __name__ == "__main__":
    app.run(port=8080, debug=True)