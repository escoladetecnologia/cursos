import json
import os
from flask import Flask, render_template, request
from transformers import T5Tokenizer, T5ForConditionalGeneration
import requests

app = Flask(__name__)

# Obter o caminho absoluto para o arquivo JSON
json_path = os.path.join(os.path.dirname(__file__), 'dados.json')

# Carregar o arquivo JSON com as perguntas e respostas
with open(json_path, 'r', encoding='utf-8') as file:
    data = json.load(file)


# Função para gerar a resposta utilizando o modelo T5 via API
def generate_answer(question):
    payload = {
        "inputs": question,
        "options": {
            "use_cache": True,
            "max_length": 250  # Aumentar o tamanho da resposta desejada
        }
    }
    headers = {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
    }
    response = requests.post("https://api-inference.huggingface.co/models/google/flan-t5-xxl", headers=headers, json=payload)
    print(response.json())  # Imprimir a resposta completa para análise
    return None

# Função para consultar o JSON e obter a resposta adequada
def query_json(question):
    for item in data:
        if question.lower() in item['pergunta'].lower():
            return item['resposta']
    return None

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
        resposta = generate_answer(pergunta)
        if resposta:
            return resposta
        else:
            return "Desculpe, não tenho uma resposta para essa pergunta."

if __name__ == '__main__':
    app.run(debug=True)
