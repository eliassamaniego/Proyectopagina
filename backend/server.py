from flask import Flask, request, jsonify
from flask_cors import CORS 
from calculadora import calcular

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

@app.route('/calcular', methods=['POST', 'OPTIONS'])
def procesar_calculo():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.get_json()
    expresion = data.get('entrada', '')
    resultado = calcular(expresion)
    return jsonify({'resultado': resultado})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
