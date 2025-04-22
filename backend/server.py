from flask import Flask, request, jsonify
from flask_cors import CORS 
from calculadora import calcular

app = Flask(__name__)
CORS(app) 

@app.route('/calcular', methods=['POST'])
def procesar_calculo():
    data = request.get_json()
    expresion = data.get('entrada', '')
    resultado = calcular(expresion)
    return jsonify({'resultado': resultado})

if __name__ == '__main__':
    app.run(debug=True)
