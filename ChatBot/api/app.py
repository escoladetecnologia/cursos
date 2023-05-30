import json
import os
import requests
from flask import Flask, render_template, request
from transformers import BertTokenizer

app = Flask(__name__)

# Obter o caminho absoluto para o arquivo JSON
json_path = os.path.join(os.path.dirname(__file__), 'dados.json')

# Carregar o arquivo JSON com as perguntas e respostas
with open(json_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Carregar o tokenizador do BERT
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# Função para consultar o JSON e obter a melhor resposta
def query_json(question):
    best_similarity_threshold = 0.8
    best_similarity = 0
    best_answer = None
    for item in data:
        similarity = calculate_similarity(question, item['pergunta'])
        if similarity > best_similarity and similarity > best_similarity_threshold:
            best_similarity = similarity
            best_answer = item['resposta']
    return best_answer

# Função para calcular a similaridade entre duas frases usando o modelo BERT via API
def calculate_similarity(sentence1, sentence2):
    payload = {
        "inputs": {
            "sentence1": sentence1,
            "sentence2": sentence2
        }
    }
    headers = {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
    }
    response = requests.post("https://api-inference.huggingface.co/models/google/bert_uncased_L-12_H-768_A-12/versions/v1/similarity", headers=headers, json=payload)
    similarity_score = response.json()[0]["score"]
    return similarity_score

# Rota principal para exibir o formulário
@app.route('/', methods=['GET'])
def home():
    return render_template('formulario.html')

# Rota para lidar com as solicitações POST do formulário
@app.route('/chat', methods=['POST'])
def chat():
    pergunta = request.json['question']
    resposta = query_json(pergunta)
    if resposta:
        return resposta
    else:
        return "Desculpe, não tenho uma resposta para essa pergunta."

if __name__ == '__main__':
    app.run(debug=True)
