// Funciones para pantalla BestDt
function prepararPantallaBestDT() {
	var textoIdioma = textoMiPlantilla(); // Tomar Idioma

	// Preparar código cuadro superior
	var superior = versionBeta();		
	superior += "	<img class='h15 botonVolverMenuSuperior' src='img/Menu/anterior.png' alt='Volver'>";
	superior += "	<label onclick=\"pasarPantalla('menuBestDT','menuIndex')\">"+textoIdioma[0]+"</label>";
	superior += "	<label class='botonMenuSuperior'>Premios Best DT</label>";
	superior += "	<img class='botonMenuSuperior logoBigDT' src='img/Menu/Logo_BigDT.png' onclick=\"pasarPantalla('menuBestDT','menuIndex')\">";


	// Preparar código cuadro central
	// Con el ID del Jugador se hace un Ajax y se recogen sus datos personales
	// Nombre
	// Posición
	// Valoración (según dónde esté)
	// Equipo
	// Foto
	datos = "";
	datos += "	<div class='w50 h100 centradoXY flexWrap'>";
	datos += "		<div class='w90 h30 centradoXY'>";
	datos += 			marcoJugador('G',5,'África','Sempere',6,'87','198','2021/01e36149f3a1e70f194cd91e9f004b4e.jpg','2021/e873e048f529333f6171c5255bc11b02.png',"2");
	datos += "		</div>";
	datos += "		<div class='w90 h30 spaceAroundXY'>";
	datos += 			marcoJugador('G',5,'Lucas','Lozano',5,'17','15','2021/daaed9dc1e3e67919cdea753ce754b0f.svg','2021/fa57c22af82923e9ad91eb39dc9fa8e8.jfif',"1");
	datos += 			marcoJugador('G',5,'Ekaterina','Zhukova',7,'95','198','2021/01e36149f3a1e70f194cd91e9f004b4e.jpg','2021/92b11e24362d00a06f85a8c0cd25aa3f.jpg',"1");
	datos += 			marcoJugador('G',5,'Julia','Aznaltegui',4,'98','147','2021/fa079e0d5a423633735ec10bdb9ef310.jpg','2021/a92d8dc3535b7152b5ca8ea3c78944fd.jpg',"1");
	datos += "		</div>";
	datos += "		<div class='w90 h30 spaceBetweenXY'>";
	datos += 			marcoJugador('G',5,'Pepita','Pérez',3,'79','159','2021/8d10152d0aa2ed0dabe96b24406ef829.jpg','2021/00a9be6fcfaade649c1cec810601d6b5.jpg',"1");
	datos += 			marcoJugador('G',5,'Juanjo','Urbano',1,'24','101','2021/3f4e5c424fa567c087d30f0dbb7ddc56.svg','2021/71249ea7c7a924f8fa2c0ff73568eac9.jfif',"1");
	datos += 			marcoJugador('G',5,'John','Svenson',2,'22','37','2021/c491c0b3e53a3b40f0d4d3d05f662d86.svg','2021/682061a351a736c808c527a292b8f535.jfif',"1");
	datos += "		</div>";
	datos += "	</div>";
	datos += "	<div class='w50 h90'>";
	datos += "		<div><h1>SALÓN DE LA FAMA</h1><br><br><p>En esta pantalla te mostraremos sólo a los mejores entre los mejores.<br><br>Gracias al <strong>algortimo desarrollado por BigDT</strong> para obtener una <strong>valoración de cada jugador ajustada</strong> a todos los parámetros que pueden existir dentro de un partido y dentro de una temporada o campeonato, podremos saber con precisión qué jugadores son los más valiosos.<br><br>Podremos conocer quiénes son:<br>· El equipo ideal<br>· Los mejores por demarcación<br>· Los mejores de cada jornada<br>· Los mejores de cada mes<br>· Podremos conocer la evolución de cada jugador por temporadas<br>· Podreis competir entre los amigos para conseguir ser el mejor<br>· Y mucho, mucho más...</p></div>";
	datos += "	</div>";

	$("#cajaMenuSuperiorBestDT").html(superior);
	$("#cajaMenuCentralBestDT").html(datos);
};