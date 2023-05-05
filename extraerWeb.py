#!/usr/bin/env python3

from selenium import webdriver
from selenium.webdriver.common.by import By
import csv

# Abrir navegador Firefox y navegar por la web
driver = webdriver.Firefox()


# Conseguir todas las direcciones
direcciones = ["http://www.hispaligas.net/Balonmano/Balonmano.html", "http://www.hispaligas.net/Balonmano%20Femenino/Balonmano%20Femenino.html"]

# Crear lista vacía para almacenar los resultados
resultados = []

for direccion in direcciones:
    driver.get(direccion)
    filas = driver.find_elements(By.TAG_NAME, 'tbody')
    for fila in filas:
        celdas = fila.find_elements(By.TAG_NAME, 'td')
        for celda in celdas:
            datos = celda.find_elements(By.TAG_NAME, 'a')
            for dato in datos:
                resultados.append(dato.get_attribute('href'))

#driver.close()

# Crear archivo CSV
with open('datosPruebaCaptura.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=';', quotechar='"', quoting=csv.QUOTE_MINIMAL)

    for i in range(len(resultados)):
        driver.get(resultados[i])
        numero_index = i  # usar el índice de la lista direccion para acceder al número correspondiente en la lista numeros
        # Extraer los datos
        filas = driver.find_elements(By.TAG_NAME,'tbody')
        for fila in filas:
            celdas = fila.find_elements(By.TAG_NAME,'tr')
            celdas.pop(0)  # Eliminar la primera fila, que contiene el encabezado
            for celda in celdas:
                datos = celda.find_elements(By.TAG_NAME,'td')
                datos_filtrados = []
                for j, dato in enumerate(datos):
                    if j == 0 or j == 2 or j == 6:
                        continue
                    if dato.text:
                        datos_filtrados.append(dato.text)
                    else:
                        datos_filtrados.append("XXX")
                if len(datos_filtrados) < 4:
                    datos_filtrados += ["XXX"] * (4 - len(datos_filtrados))
                nuevos_datos = ["(", "0", ",", datos_filtrados[0], ",", "0", ",", "0", ",", datos_filtrados[1], ",", datos_filtrados[2], ",", datos_filtrados[3], ",", ")", ","]
                writer.writerow(nuevos_datos)
        nuevos_datos = ["-", "-", ",", "-", ",", "-", ",", "-", ",", "-", ",", "-", ",", "-", ",", ")", ","]
        writer.writerow(nuevos_datos)
# Cerrar navegador
driver.close()

#ME FALTA POR METER LOS DATOS DE LOS GOLES. AHORA NO APARECEN EN ESTA PAGINA. HAY QUE SOLUCIONAR ESTO!!!!
#"https://www.rfebm.com/competiciones/resultados_completos.php?seleccion=0&id=6124#"

# Extraer los datos
#filas = driver.find_elements(By.TAG_NAME,'tbody')

#for fila in filas:
#	celdas = fila.find_elements(By.TAG_NAME,'tr')
#for celda in celdas:
#	datos = celda.find_elements(By.TAG_NAME,'td')
#	print(datos[0].text + " " + datos[1].text)

# Guardar 

#direccion = ["http://www.hispaligas.net/Balonmano/70-71%20Division%20de%20Honor.html", "http://www.hispaligas.net/Balonmano%20Femenino/75-76%20Primera%20Femenina.html"]
#numeros = [234,235]

# Abrir navegador Firefox y navegar por la web
#driver = webdriver.Firefox()