from flask import Flask, request, jsonify
from flask_cors import CORS
from calculadora_backend import calcular_eficiencia_aislamiento

app = Flask(__name__)
CORS(app)

@app.route('/calcular', methods=['POST'])
def procesar_calculo():
    data = request.get_json()
    resultado = calcular_eficiencia_aislamiento(data['cajas'])  # data debe contener una lista de cajas
    return jsonify(resultado)

if __name__ == '__main__':
    app.run(debug=True)

