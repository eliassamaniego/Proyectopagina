# calculadora_backend.py

DENSIDAD_HIELO = 917  # kg/m³
ENTALPIA_FUSION_HIELO = 334000  # J/kg
TIEMPO_SEGUNDOS = 10 * 24 * 3600  # 10 días

def calcular_eficiencia_aislamiento(cajas):
    resultados = []
    for caja in cajas:
        nombre = caja['nombre']
        delta_t = caja['delta_t']
        area = caja['area']
        
        resistencia_total = sum(m['espesor_mm'] / 1000 / m['conductividad'] for m in caja['materiales'])
        flujo_calor = (delta_t * area) / resistencia_total
        calor_total = flujo_calor * TIEMPO_SEGUNDOS

        masa_hielo_derretido = calor_total / ENTALPIA_FUSION_HIELO
        volumen_hielo_derretido = masa_hielo_derretido / DENSIDAD_HIELO

        resultados.append({
            'Caja': nombre,
            'R_termina': resistencia_total,
            'Flujo_calor': flujo_calor,
            'Calor_total': calor_total,
            'Masa_hielo': masa_hielo_derretido,
            'Volumen_hielo': volumen_hielo_derretido
        })
    
    peor_flujo = max(r['Flujo_calor'] for r in resultados)
    for r in resultados:
        r['Eficiencia'] = (1 - r['Flujo_calor'] / peor_flujo) * 100

    return resultados
