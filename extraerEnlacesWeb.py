#!/usr/bin/env python3

from selenium import webdriver
from selenium.webdriver.common.by import By
import csv

direccion = ["http://www.hispaligas.net/Balonmano%20Femenino/Balonmano%20Femenino.html"]

# Abrir navegador Firefox y navegar por la web
driver = webdriver.Firefox()

driver.get(direccion[0])

# Extraer los datos
filas = driver.find_elements(By.TAG_NAME,'tbody')

for fila in filas:
	celdas = fila.find_elements(By.TAG_NAME,'tr')

	for celda in celdas:
	    datos = celda.find_elements(By.TAG_NAME,'a')
	    for dato in datos:
	        print(dato.get_attribute('href'))

driver.close()