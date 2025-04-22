import sys

def calcular(entrada):
    try:
        # Entrada simulada: "5+3"
        resultado = eval(entrada)
        return str(resultado)
    except Exception as e:
        return f"Error: {str(e)}"

# Si lo ejecutamos desde la terminal con argumento
if __name__ == "__main__":
    if len(sys.argv) > 1:
        print(calcular(sys.argv[1]))
    else:
        print("No se recibió argumento")
