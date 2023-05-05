// Funciones para pantalla Mi Clasificacion cambiarFichaDatos
function prepararPantallaMiClasificacion(IdEquipo) {marcoJugador
	// Tomar Idioma
	var textoIdioma = textoMiClasificacion();
	
	$.ajax({
		url: "php/miClasificacion.php",
		type: 'POST',
		data: {
			equipo: IdEquipo
		},
		success: function(res){
			var js= JSON.parse(res);
	

			// Preparar código cuadro superior
			var superior = versionBeta();				
			superior += "	<img class='h20 w2' src='img/Menu/anterior.png' alt='Volver'>";
			superior += "	<label onclick=\"pasarPantalla('menuMiClasificacion','menuIndex')\">"+textoIdioma[0]+"</label>";
			superior += "	<label class='botonMenuSuperior'>"+textoIdioma[1]+"</label>";
			superior += "	<img class='botonMenuSuperior logoBigDT' src='img/Menu/Logo_BigDT.png' onclick=\"pasarPantalla('menuMiClasificacion','menuIndex')\">";

			// Preparar código cuadro central
			var central = "";
			central += "		<img id='imagenFondoCompeticiones' src='img/Menu/Brumafondo.png' alt='Fondo Bruma'>"; // Imagen de fondo

			central += " 		<div id='listadoMiClasificacion' class='h100 w65 centradoXY flexWrap'>";
			if (js.Clasificacion[0] !== "0") {
				central += "			<label class='w100 h5'>"+textoIdioma[2]+" <strong class='colorDiv"+js.Datos[0][0].Nivel_Competicion+"'>"+js.Datos[0][0].Nombre_Competicion+"</strong></label>";
			}else{
				central += "			<label class='w100 h5'>"+textoIdioma[2]+"</label>";
			}
			central += "			<div id='marcoMiClasificacionGeneral' class='w100 h40 centradoXY flexWrap'>";
			central += "				<div class='w95 h15 centradoInlineXY'>";
			central += "					<div class='w7 centradoXY'></div>";
			central += "					<div class='w50'></div>";
			central += "					<div class='w7 centradoXY'><strong>Pts</strong></div>";
			central += "					<div class='w7 centradoXY'><strong>PJ</strong></div>";
			central += "					<div class='w7 centradoXY'><strong>V</strong></div>";
			central += "					<div class='w7 centradoXY'><strong>E</strong></div>";
			central += "					<div class='w7 centradoXY'><strong>D</strong></div>";
			central += "					<div class='w7 centradoXY'><strong>GF</strong></div>";
			central += "					<div class='w7 centradoXY'><strong>GC</strong></div>";
			central += "					<div class='w7 centradoXY'><strong>Dif</strong></div>";
			central += "				</div>";

			central += "				<div id='cuadroMiClasificacionGeneral' class='w95 h85 centradoXY flexWrap'>";
			if (js.Clasificacion[0] !== "0") {
				for (var i = 0; i < js.Clasificacion[0].length; i++) {
					var color = js.Clasificacion[0][i].ID_Equipo == IdEquipo ? " marcadoMiEquipo" : "";
					if (i == 0) {
						var colorPosicion = "equipoAscenso";
					}else if (i == js.Clasificacion[0].length - 1) {
						var colorPosicion = "equipoDescenso";
					}else {
						var colorPosicion = "";
					}
					central += "			<div class='w100 h15 centradoInlineXY"+color+" "+colorPosicion+"'>";
					central += "				<div class='w7 h60 centradoXY numeroClasificacion'>"+(i+1)+"</div>";
					central += "				<div class='w50 nombreClasificacionGeneral'>"+js.Clasificacion[0][i].Nombre+"</div>";
					central += "				<strong class='w7 centradoXY puntosClasificacion'>"+js.Clasificacion[0][i].Puntos+"</strong>";
					central += "				<div class='w7 centradoXY'>"+js.Clasificacion[0][i].PJ+"</div>";
					central += "				<div class='w7 centradoXY'>"+js.Clasificacion[0][i].V+"</div>";
					central += "				<div class='w7 centradoXY'>"+js.Clasificacion[0][i].E+"</div>";
					central += "				<div class='w7 centradoXY'>"+js.Clasificacion[0][i].D+"</div>";
					central += "				<div class='w7 centradoXY'><small>"+(js.Clasificacion[0][i].GF).toLocaleString(localStorage.getItem('idioma'))+"</small></div>";
					central += "				<div class='w7 centradoXY'><small>"+(js.Clasificacion[0][i].GC).toLocaleString(localStorage.getItem('idioma'))+"</small></div>";
					central += "				<div class='w7 centradoXY'><small>"+(js.Clasificacion[0][i].Dif).toLocaleString(localStorage.getItem('idioma'))+"</small></div>";
					central += "			</div>";
				}
			}else{
				central += "				<label>Datos de Clasificación no disponibles</label>";
			}
			central += "				</div>";
			central += "			</div>";

			central += "			<label class='w100 h10'></label>";

			central += "			<label class='w100 h5'>"+textoIdioma[3]+"</label>";
			central += "			<div id='cuadroMisClasificacionesHistoricas' class='w100 h30 centradoXY flexWrap'>";
			if (js.Clasificacion[0] !== "0") {
				var temporadas = Array("2021-2022","2020-2021","2019-2020","2018-2019","2017-2018");
				for (var i = 0; i < temporadas.length; i++) {
					central += "		<div class='w90 h15 centradoInlineXY'>";
					central += "			<div class='w25 h100 centradoXY'>"+temporadas[i]+"</div>";
					central += "			<div class='w50 h100 centradoXY'>Primera Nacional</div>";
					central += "			<div class='w25 h100 centradoXY'>5º (35pts)</div>";
					central += "		</div>";
				}
			}else{
				central += "			<label>Datos de Clasificación no disponibles</label>";
			}
			central += "			</div>";		
			central += " 		</div>";
			central += " 		<div class='h100 w35 centradoXY flexWrap' style='z-index:5'>";
			central += " 			<div class='w90 h70 centradoXY flexWrap'>";
			central += "				<img class='h45 w100' src='img/Clubes/Balonmano/Equipos/"+js.Datos[0][0].Escudo+"' alt='Escudo' onerror=\"this.src='img/Clubes/usuario.png'\">";
			central += "	 			<div class='h10 w100 centradoXY'><strong>"+js.Datos[0][0].Nombre+"</strong></div>";
			central += "	 			<div class='h5 w100 centradoXY'>";
			central += "					<img src='img/Clubes/Clubes/Localidades/"+js.Datos[0][0].Comunidad+".png'>";
			central += "					&nbsp;· "+valorCategoria(js.Datos[0][0].Categoria)+" · "+textoSeccion(js.Datos[0][0].Seccion,"Completa")+"</div>";
			central += "				<div class='h15 w80 spaceAroundXY pulsable' onclick=\"ventanaDatos('club',"+js.Datos[0][0].ID_Club+")\" style='background: var(--color-corporativo-rosa);border-radius: 20px;'>";
			central += "					<img src='img/Clubes/Clubes/"+js.Datos[0][0].EscudoClub+"' class='w15 h80'>";
			central += "					<div class='w60'>"+js.Datos[0][0].NombreClub+"</div>";
			central += "					<img src='img/Menu/buscar.png' class='h60'>";
			central += "				</div>";
			central += "	 		</div>";
			central += " 			<div class='w80 h25 centradoXY flexWrap' style='border-bottom: 4px solid var(--color-corporativo-morado); border-radius: 20px; border-top: 4px solid var(--color-corporativo-rosa);'>";
			central += "				<div class='h20 w100 centradoXY'><strong>Temporada "+js.Datos[0][0].Temporada+"-"+(Number(js.Datos[0][0].Temporada)+1)+"</strong></div>";
			central += "				<div class='h70 w100 centradoXY flexWrap'>";
			central += "					<div class='w50 h100 centradoXY flexWrap'>";
			central += "						<div style='border-radius: 50px;background: var(--color-fondo-principal);' class='w70 h30 centradoXY'>Liga</div>";
			central += "						<div style='border-radius: 50px;background: var(--color-corporativo-morado);' class='w70 h30 centradoXY'>Copa</div>";
			central += "					</div>";
			central += "					<div class='w50 h100 centradoXY flexWrap'>";
			central += "						<div style='border-radius: 50px;background: var(--color-corporativo-morado);' class='w70 h30 centradoXY'>Pretemporada</div>";
			central += "						<div style='border-radius: 50px;background: var(--color-corporativo-morado);' class='w70 h30 centradoXY'>Amistosos</div>";
			central += "					</div>";
			central += "				</div>";
			central += " 			</div>";
			central += " 		</div>";

			// Publicar códigos
			$("#cajaMenuSuperiorMiClasificacion").html(superior);
			$("#cajaMenuSuperiorMiClasificacion").show(superior);

			$("#cajaMenuCentralMiClasificacion").html(central);
			$("#cajaMenuCentralMiClasificacion").show(central);

			// Dibujar la grafica de datos
			dibujarGrafica("#graficaMiLabel","#graficaMiFicha", 25, 89, 74, 46, 75, 88, 69, 90);
		}
	});
};

// Funciones para pantalla Mi Plantilla
function prepararPantallaMiPlantilla(IdEquipo) {
	// Tomar Idioma
	var textoIdioma = textoMiPlantilla();

	// Preparar código cuadro superior
	var superior = versionBeta();		
	superior += "	<img class='h20 w2' src='img/Menu/anterior.png' alt='Volver'>";
	superior += "	<label onclick=\"pasarPantalla('menuMiPlantilla','menuIndex')\">"+textoIdioma[0]+"</label>";
	superior += "	<label class='botonMenuSuperior'>"+textoIdioma[1]+"</label>";
	superior += "	<img class='botonMenuSuperior logoBigDT' src='img/Menu/Logo_BigDT.png' onclick=\"pasarPantalla('menuMiPlantilla','menuIndex')\">";

	// Preparar código cuadro central
	var central = "";

	// Imagen de fondo
	central += "		<img id='imagenFondoCompeticiones' src='img/Menu/Brumafondo.png' alt='Fondo Bruma'>";

	central += "		<div class='h100 w50 centradoXY flexWrap'>";

	$.ajax({
		url: "php/miPlantilla.php",
		type: 'POST',
		data: {
			equipo: IdEquipo
		},
		success: function(res){
			var js = JSON.parse(res);

			if (js == 303) {
				window.location.replace("../?error=fuera");
			}else{
				if (js.Jugadores == "0" && js.Entrenador == "0" && js.Ayudante == "0" && js.Medico == "0" && js.Oficial == "0" && js.Adicional == "0") {
					// Listado plantilla
					central += " 			<div id='listadoMiPlantilla' class='h70 w100 centradoXY flexWrap' style='border-top: 4px solid var(--color-corporativo-rosa); border-bottom: 4px solid var(--color-corporativo-morado); border-radius: 20px'>";
					for (var i = 1; i <= 20; i++) {
						central += "			<div class='w95 spaceBetweenXY'>";
						central += "				<div class='w5 centradoXY'>+</div>";
						central += "				<div class='fichaDorsal w5 centradoXY'>"+i+"</div>";
						central += "				<div class='fichaNombre w60'>Nombre Apellido Apellido</div>";
						
						var valoracion = Math.floor((Math.random() * (100-1)) + 1); //Aleatorio entre 1 y 100
						switch(true) {
							case (valoracion < 50):
								var color = "background:var(--color-error)";
								break
							case (valoracion < 85):
								var color = "background:var(--color-acierto)";
								break
							case (valoracion >= 85):
								var color = "background:var(--color-oro1)";
								break

						}
						central += "				<div class='fichaValoracion w5 centradoXY' style='"+color+"'>"+valoracion+"</div>";

						var posiciones = Array("PO","LD","LI","ED","EI","CT","DF","PV");
						var posicion = Math.floor(Math.random() * 7); //Aleatorio entre 0 y 7
						central += "				<div class='fichaPosicion w5 centradoXY'>"+posiciones[posicion]+"</div>";

						var naciones = Array("es.png","en.png","fr.png","de.png");
						var nacion = Math.floor(Math.random() * 4); //Aleatorio entre 0 y 7
						central += "				<div class='fichaNac w5 centradoXY'><img src='img/Idiomas/"+naciones[nacion]+"' alt='Nacionalidad' onerror=\"this.src='img/Idiomas/idioma.png'\"></div>";

						central += "				<div class='fichaBuscar w5 centradoXY'><img class='h90' src='img/Menu/buscar.png' alt='Ver Jugador'></div>";
						////////////////////////////////////////////////////// Poner todo en css y poner hover con cambio de color
						central += "			</div>";
					}
					central += "	 		</div>";
					// Staff técnico
					central += "	 		<div id='listadoMiPlantilla' class='h25 w80 centradoXY flexWrap' style='border-top: 4px solid var(--color-corporativo-rosa); border-bottom: 4px solid var(--color-corporativo-morado); border-radius: 20px'>";
					var arrayTecnico = Array("","Entrenador", "Ayte.Entrenador", "Oficial", "Médico", "Staff Adicional");
					for (var i = 1; i <= 5; i++) {
						central += "			<div class='w95 h20 spaceBetweenXY'>";
						central += "				<div class='w35 h90 centradoXY' style='background:var(--color-texto); border-radius:50px; color:var(--color-corporativo-rosa); aspect-ratio: auto 1 / 1'>"+arrayTecnico[i]+"</div>";
						central += "				<div class='w60' style='text-align:left; padding:2%'>Nombre Apellido Apellido</div>";
						central += "	 		</div>";
						central += "			<div></div>";
					}
					central += "	 		</div>";
					central += "		</div>";

					central += " 		<div class='h100 w50 centradoXY flexWrap'>";
					central += " 			<div class='w90 h70 centradoXY flexWrap' style='position:relative'>";
					central += "				<img class='h30' src='img/Clubes/Clubes/defecto.png' alt='Escudo' style='position:absolute;right:0;top:0;z-index:0'>";
					central += "	 			<div class='h20' style='position:absolute;top:8%;left:10%;font-size:17px;text-align:center'>Mi<br>Equipo Ideal</div>";
					central += "	 			<div class='w100 h30 centradoXY'>";
					central +=  					marcoJugador('P','Nombre Apellido','CT',Math.floor((Math.random() * (100-50)) + 50),'Visitaelche.com BM Elche','','Africa Sempere Herrera.jpg',0);
					central += "		 		</div>";
					central += "	 			<div class='w100 h30 spaceAroundXY'>";
					central +=  					marcoJugador('P','Nombre Apellido','LI',Math.floor((Math.random() * (100-50)) + 50),'Visitaelche.com BM Elche','','Africa Sempere Herrera.jpg',0);
					central +=  					marcoJugador('P','Nombre Apellido','PV',Math.floor((Math.random() * (100-50)) + 50),198,'','2021/e873e048f529333f6171c5255bc11b02.png',1);
					central +=  					marcoJugador('P','Nombre Apellido','LD',Math.floor((Math.random() * (100-50)) + 50),'Visitaelche.com BM Elche','','Africa Sempere Herrera.jpg',0);
					central += "		 		</div>";
					central += "	 			<div class='w100 h30 spaceBetweenXY'>";
					central +=  					marcoJugador('P','Nombre Apellido','EI',Math.floor((Math.random() * (100-50)) + 50),'Visitaelche.com BM Elche','','Africa Sempere Herrera.jpg',0);
					central +=  					marcoJugador('P','Nombre Apellido','PO',Math.floor((Math.random() * (100-50)) + 50),'Visitaelche.com BM Elche','','Africa Sempere Herrera.jpg',0);
					central +=  					marcoJugador('P','Nombre Apellido','ED',Math.floor((Math.random() * (100-50)) + 50),'Visitaelche.com BM Elche','','Africa Sempere Herrera.jpg',0);
					central += "		 		</div>";
					central += "	 		</div>";
					central += " 			<div class='w90 h30 centradoXY flexWrap' style='position:relative'>";
					central += "				<div id='graficaMiFicha' class='graficaFicha h70'></div>";
					central += "				<div id='graficaMiLabel' class='graficaLabel w100 h100 centradoXY flexWrap'>";
					central += "				</div>";
					central += " 			</div>";
					central += " 		</div>";

					// Publicar códigos
					$("#cajaMenuSuperiorMiPlantilla").html(superior);
					$("#cajaMenuSuperiorMiPlantilla").show(superior);

					$("#cajaMenuCentralMiPlantilla").html(central);
					$("#cajaMenuCentralMiPlantilla").show(central);

					// Dibujar la grafica de datos
					dibujarGrafica("#graficaMiLabel","#graficaMiFicha", 25, 89, 74, 46, 75, 88, 69, 90);
				}else{
					// Listado plantilla
					central += " 			<div id='listadoMiPlantilla' class='h70 w100 centradoXY flexWrap' style='border-top: 4px solid var(--color-corporativo-rosa); border-bottom: 4px solid var(--color-corporativo-morado); border-radius: 20px'>";
					for (var i = 0; i < js.Jugadores.length; i++) {
						central += "			<div class='w95 spaceBetweenXY'>";
						central += "				<div class='w5 centradoXY'>+</div>";
						central += "				<div class='fichaDorsal w5 centradoXY'>"+js.Jugadores[i].Dorsal+"</div>";
						central += "				<div class='fichaNombre w60'>"+js.Jugadores[i].Nombre+" "+js.Jugadores[i].Apellido+"</div>";
						
						switch(true) {
							case !js.Jugadores[i].Valoracion:
								var color = "background:var(--color-contraste)";
								break
							case (js.Jugadores[i].Valoracion < 50):
								var color = "background:var(--color-error)";
								break
							case (js.Jugadores[i].Valoracion < 85):
								var color = "background:var(--color-acierto)";
								break
							case (js.Jugadores[i].Valoracion >= 85):
								var color = "background:var(--color-oro1)";
								break
						}
						const valoracion = js.Jugadores[i].Valoracion ? js.Jugadores[i].Valoracion : "--"
						central += "				<div class='fichaValoracion w5 centradoXY' style='"+color+"'>"+valoracion+"</div>";

						if (js.Jugadores[i].Posicion !== "0") {
							central += "				<div class='fichaPosicion w5 centradoXY'>"+textoPuestos(sessionStorage.getItem("Deporte"),js.Jugadores[i].Posicion,"1")+"</div>";
						}else{
							central += "				<div class='fichaPosicion w5 centradoXY'>--</div>";
						}

						if (js.Jugadores[i].Nacionalidad2) {
							central += "			<div class='fichaNac w5 centradoXY'>";
							central += "				<img src='img/Idiomas/"+js.Jugadores[i].Nacionalidad+".png' alt='Nacionalidad' style='clip-path: polygon(0 0, 0% 100%, 100% 0)' title='"+js.Jugadores[i].Nacionalidad+"' onerror=\"this.src='img/Idiomas/idioma.png'\">";
							central += "				<img class='w90' src='img/Idiomas/"+js.Jugadores[i].Nacionalidad2+".png' alt='Nacionalidad2' style='clip-path: polygon(100% 0, 0% 100%, 100% 100%); position:absolute' title='"+js.Jugadores[i].Nacionalidad2+"' onerror=\"this.src='img/Idiomas/idioma.png'\"></div>";
						}else if(js.Jugadores[i].Nacionalidad){
							central += "			<div class='fichaNac w5 centradoXY'><img src='img/Idiomas/"+js.Jugadores[i].Nacionalidad+".png' alt='Nacionalidad' title='"+nombrePais(js.Jugadores[i].Nacionalidad)+"' onerror=\"this.src='img/Idiomas/idioma.png'\"></div>";
						}else{
							central += "			<div class='fichaNac w5 centradoXY'><img src='img/Idiomas/idioma.png' alt='Nacionalidad' title='Sin Datos'></div>";
						}

						central += "				<div class='fichaBuscar w5 centradoXY' onclick=\"ventanaDatos('jugador',"+js.Jugadores[i].ID_Jugador+")\"><img class='h90' src='img/Menu/buscar.png' alt='Ver Jugador'></div>";
						////////////////////////////////////////////////////// Poner todo en css y poner hover con cambio de color
						central += "			</div>";
					}
					central += "	 		</div>";
					// Staff técnico
					central += "	 		<div id='listadoMiPlantilla' class='h25 w90 centradoXY flexWrap' style='border-top: 4px solid var(--color-corporativo-rosa); border-bottom: 4px solid var(--color-corporativo-morado); border-radius: 20px; font-size: clamp(9px,85%,16px);'>";
					if (js.Entrenador !== "0") {
						for (var i = 0; i < js.Entrenador.length; i++) {
							central += "		<div class='w95 h20 spaceBetweenXY'>";
							central += "			<div class='w35 h90 centradoXY' style='background:var(--color-texto); border-radius:50px; color:var(--color-corporativo-rosa); aspect-ratio: auto 1 / 1'>"+tecnicoTexto(1)+"</div>";
							central += "			<div class='w60' style='text-align:left; padding:2%'>"+js.Entrenador[i].Nombre+"</div>";
							central += "			<div class='w5 centradoXY' style='background:var(--color-corporativo-rosa);border-radius:50px;aspect-ratio: auto 1 / 1'><img class='h90' src='img/Menu/buscar.png' alt='Ver Tecnico'></div>";
							central += " 		</div>";
						}
					}
					if (js.Ayudante !== "0") {
						for (var i = 0; i < js.Ayudante.length; i++) {
							central += "		<div class='w95 h20 spaceBetweenXY'>";
							central += "			<div class='w35 h90 centradoXY' style='background:var(--color-texto); border-radius:50px; color:var(--color-corporativo-rosa); aspect-ratio: auto 1 / 1'>"+tecnicoTexto(2)+"</div>";
							central += "			<div class='w60' style='text-align:left; padding:2%'>"+js.Ayudante[i].Nombre+"</div>";
							central += "			<div class='w5 centradoXY' style='background:var(--color-corporativo-rosa);border-radius:50px;aspect-ratio: auto 1 / 1'><img class='h90' src='img/Menu/buscar.png' alt='Ver Tecnico'></div>";
							central += " 		</div>";
						}
					}
					if (js.Medico !== "0") {
						for (var i = 0; i < js.Medico.length; i++) {
							central += "		<div class='w95 h20 spaceBetweenXY'>";
							central += "			<div class='w35 h90 centradoXY' style='background:var(--color-texto); border-radius:50px; color:var(--color-corporativo-rosa); aspect-ratio: auto 1 / 1'>"+tecnicoTexto(3)+"</div>";
							central += "			<div class='w60' style='text-align:left; padding:2%'>"+js.Medico[i].Nombre+"</div>";
							central += "			<div class='w5 centradoXY' style='background:var(--color-corporativo-rosa);border-radius:50px;aspect-ratio: auto 1 / 1'><img class='h90' src='img/Menu/buscar.png' alt='Ver Tecnico'></div>";
							central += " 		</div>";
						}
					}
					if (js.Oficial !== "0") {
						for (var i = 0; i < js.Oficial.length; i++) {
							central += "		<div class='w95 h20 spaceBetweenXY'>";
							central += "			<div class='w35 h90 centradoXY' style='background:var(--color-texto); border-radius:50px; color:var(--color-corporativo-rosa); aspect-ratio: auto 1 / 1'>"+tecnicoTexto(4)+"</div>";
							central += "			<div class='w60' style='text-align:left; padding:2%'>"+js.Oficial[i].Nombre+"</div>";
							central += "			<div class='w5 centradoXY' style='background:var(--color-corporativo-rosa);border-radius:50px;aspect-ratio: auto 1 / 1'><img class='h90' src='img/Menu/buscar.png' alt='Ver Tecnico'></div>";
							central += " 		</div>";
						}
					}
					if (js.Adicional !== "0") {
						for (var i = 0; i < js.Adicional.length; i++) {
							central += "		<div class='w95 h20 spaceBetweenXY'>";
							central += "			<div class='w35 h90 centradoXY' style='background:var(--color-texto); border-radius:50px; color:var(--color-corporativo-rosa); aspect-ratio: auto 1 / 1'>"+tecnicoTexto(5)+"</div>";
							central += "			<div class='w60' style='text-align:left; padding:2%'>"+js.Adicional[i].Nombre+"</div>";
							central += "			<div class='w5 centradoXY' style='background:var(--color-corporativo-rosa);border-radius:50px;aspect-ratio: auto 1 / 1'><img class='h90' src='img/Menu/buscar.png' alt='Ver Tecnico'></div>";
							central += " 		</div>";
						}
					}

					central += "	 		</div>";
					central += "		</div>";

					central += " 		<div class='h100 w50 centradoXY flexWrap'>";
					central += " 			<div class='w90 h70 centradoXY flexWrap' style='position:relative'>";
					central += "				<img class='h30' src='img/Clubes/Balonmano/Equipos/"+js.Jugadores[0].Escudo+"' alt='Escudo' onerror=\"this.src='img/Clubes/usuario.png'\" style='position:absolute;right:0;top:0;z-index:0'>";
					central += "	 			<div class='h20' style='position:absolute;top:8%;left:10%;font-size:17px;text-align:center'>Mi<br>Equipo Ideal</div>";
					central += "	 			<div class='w100 h30 centradoXY'>";
					arrayDorsales = [];
					for (var i = 0; i < js.Jugadores.length; i++) {
						arrayDorsales.push(js.Jugadores[i].Dorsal);
					}
					numeroDorsalJugador = Math.floor(Math.random() * arrayDorsales.length);

					dorsalJugador = arrayDorsales[numeroDorsalJugador];
					central +=  					marcoJugador('P',js.Jugadores[numeroDorsalJugador].ID_Jugador,js.Jugadores[numeroDorsalJugador].Nombre,js.Jugadores[numeroDorsalJugador].Apellido,js.Jugadores[numeroDorsalJugador].Posicion,js.Jugadores[numeroDorsalJugador].Dorsal,IdEquipo,js.Jugadores[numeroDorsalJugador].Escudo,js.Jugadores[numeroDorsalJugador].Foto,js.Jugadores[numeroDorsalJugador].Tipo);
					central += "		 		</div>";
					central += "	 			<div class='w100 h30 spaceAroundXY'>";
					numeroDorsalJugador = Math.floor(Math.random() * arrayDorsales.length);
					dorsalJugador = arrayDorsales[numeroDorsalJugador];
					central +=  					marcoJugador('P',js.Jugadores[numeroDorsalJugador].ID_Jugador,js.Jugadores[numeroDorsalJugador].Nombre,js.Jugadores[numeroDorsalJugador].Apellido,js.Jugadores[numeroDorsalJugador].Posicion,js.Jugadores[numeroDorsalJugador].Dorsal,IdEquipo,js.Jugadores[numeroDorsalJugador].Escudo,js.Jugadores[numeroDorsalJugador].Foto,js.Jugadores[numeroDorsalJugador].Tipo);
					numeroDorsalJugador = Math.floor(Math.random() * arrayDorsales.length);
					dorsalJugador = arrayDorsales[numeroDorsalJugador];
					central +=  					marcoJugador('P',js.Jugadores[numeroDorsalJugador].ID_Jugador,js.Jugadores[numeroDorsalJugador].Nombre,js.Jugadores[numeroDorsalJugador].Apellido,js.Jugadores[numeroDorsalJugador].Posicion,js.Jugadores[numeroDorsalJugador].Dorsal,IdEquipo,js.Jugadores[numeroDorsalJugador].Escudo,js.Jugadores[numeroDorsalJugador].Foto,js.Jugadores[numeroDorsalJugador].Tipo);
					numeroDorsalJugador = Math.floor(Math.random() * arrayDorsales.length);
					dorsalJugador = arrayDorsales[numeroDorsalJugador];
					central +=  					marcoJugador('P',js.Jugadores[numeroDorsalJugador].ID_Jugador,js.Jugadores[numeroDorsalJugador].Nombre,js.Jugadores[numeroDorsalJugador].Apellido,js.Jugadores[numeroDorsalJugador].Posicion,js.Jugadores[numeroDorsalJugador].Dorsal,IdEquipo,js.Jugadores[numeroDorsalJugador].Escudo,js.Jugadores[numeroDorsalJugador].Foto,js.Jugadores[numeroDorsalJugador].Tipo);
					central += "		 		</div>";
					central += "	 			<div class='w100 h30 spaceBetweenXY'>";
					numeroDorsalJugador = Math.floor(Math.random() * arrayDorsales.length);
					dorsalJugador = arrayDorsales[numeroDorsalJugador];
					central +=  					marcoJugador('P',js.Jugadores[numeroDorsalJugador].ID_Jugador,js.Jugadores[numeroDorsalJugador].Nombre,js.Jugadores[numeroDorsalJugador].Apellido,js.Jugadores[numeroDorsalJugador].Posicion,js.Jugadores[numeroDorsalJugador].Dorsal,IdEquipo,js.Jugadores[numeroDorsalJugador].Escudo,js.Jugadores[numeroDorsalJugador].Foto,js.Jugadores[numeroDorsalJugador].Tipo);
					numeroDorsalJugador = Math.floor(Math.random() * arrayDorsales.length);
					dorsalJugador = arrayDorsales[numeroDorsalJugador];
					central +=  					marcoJugador('P',js.Jugadores[numeroDorsalJugador].ID_Jugador,js.Jugadores[numeroDorsalJugador].Nombre,js.Jugadores[numeroDorsalJugador].Apellido,js.Jugadores[numeroDorsalJugador].Posicion,js.Jugadores[numeroDorsalJugador].Dorsal,IdEquipo,js.Jugadores[numeroDorsalJugador].Escudo,js.Jugadores[numeroDorsalJugador].Foto,js.Jugadores[numeroDorsalJugador].Tipo);
					numeroDorsalJugador = Math.floor(Math.random() * arrayDorsales.length);
					dorsalJugador = arrayDorsales[numeroDorsalJugador];
					central +=  					marcoJugador('P',js.Jugadores[numeroDorsalJugador].ID_Jugador,js.Jugadores[numeroDorsalJugador].Nombre,js.Jugadores[numeroDorsalJugador].Apellido,js.Jugadores[numeroDorsalJugador].Posicion,js.Jugadores[numeroDorsalJugador].Dorsal,IdEquipo,js.Jugadores[numeroDorsalJugador].Escudo,js.Jugadores[numeroDorsalJugador].Foto,js.Jugadores[numeroDorsalJugador].Tipo);
					central += "		 		</div>";
					central += "	 		</div>";
					central += " 			<div class='w90 h30 centradoXY flexWrap' style='position:relative'>";
					central += "				<div id='graficaMiFicha' class='graficaFicha h70'></div>";
					central += "				<div id='graficaMiLabel' class='graficaLabel w100 h100 centradoXY flexWrap'>";
					central += "				</div>";
					central += " 			</div>";
					central += " 		</div>";

					// Publicar códigos
					$("#cajaMenuSuperiorMiPlantilla").html(superior);
					$("#cajaMenuSuperiorMiPlantilla").show(superior);

					$("#cajaMenuCentralMiPlantilla").html(central);
					$("#cajaMenuCentralMiPlantilla").show(central);

					// Dibujar la grafica de datos
					dibujarGrafica("#graficaMiLabel","#graficaMiFicha", 25, 89, 74, 46, 75, 88, 69, 90);
				}
			}

		}
	});		
};

// Funciones para mostrar ventana de Datos (jugadores, técnicos, equipos o clubes)
function ventanaDatos(tipo,id,temporada) {
	document.getElementById("loaderCajaFichas").classList.add("loader");
	switch (tipo) {
		case "club":
			if (document.getElementById("equipoFicha")) { document.getElementById("equipoFicha").classList.remove("invisible"); }

			$.ajax({
				url: "php/datosClub.php",
				type: 'POST',
				data: {
					idClub: id,
				},
				success: function(res){
					document.getElementById("loaderCajaFichas").classList.remove("loader");
					var js= JSON.parse(res);
					var codigo = "";
					codigo += "	<div class='h15 w100 centradoInlineXY'>";
					codigo += "		<label id='labelnombreClub' class='w90'>"+js[0].Nombre+"</label>";
					codigo += "		<img id='fichaSalir' class='h50' src='img/Menu/boton_salir.png' alt='salir' onclick=\"salirVentanaDatos('Club')\">";
					codigo += "	</div>";
					codigo += "	<div class='h7 w50 spaceAroundXY'>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonClubFicha' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('club','Ficha')\">Ficha</button></div>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonClubEquipos' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('club','Equipos',"+js[0].ID_Club+")\">Equipos</button></div>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonClubPalmares' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('club','Palmares')\">Palmarés</button></div>";
					codigo += "	</div>";

					codigo += "	<div id='clubFicha' class='h65 w95 centradoInlineXY'>";
					codigo += "		<div class='w30 h100 centradoXY'>";
					codigo += "			<img class='w60' src='img/Clubes/Clubes/"+js[0].Escudo+"' alt='logoClub'>";
					codigo += "		</div>";
					codigo += "		<div class='h90 w100'>";
					codigo += "			<div class='h80 w100 centradoXY flexWrap'>";
					codigo += "				<div class='w100 h20 centradoInlineXY'>";
					if (js[0].Fundacion) { var fundacion = js[0].Fundacion;	}else{	var fundacion = "--"; }
					codigo += "					<label class='w40'>Año de Fundación: </label><label class='w60'>"+fundacion+"</label>";
					codigo += "				</div>";
					codigo += "				<div class='w100 h20 centradoInlineXY'>";
					codigo += "					<label class='w40'>Localidad: </label><label class='w60'>"+js[0].Localidad+"<br>"+js[0].Provincia.toUpperCase()+" <img src='img/Clubes/Clubes/Localidades/"+js[0].Comunidad+".png' alt='Comunidad'></label>";
					codigo += "				</div>";
					codigo += "				<div class='w100 h20 centradoInlineXY'>";
					if (js[0].Presidente == "undefined" || js[0].Presidente == "") { var presidencia = "--";	}else{	var presidencia = js[0].Presidente; }
					codigo += "					<label class='w40'>Presidencia: </label><label class='w60'>"+presidencia+"</label>";
					codigo += "				</div>";
					codigo += "				<div class='w100 h20 centradoInlineXY'>";
					codigo += "					<label class='w40'>Tipo de Club: </label><label class='w60'>Federado</label>";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div class='h20 w100 centradoXY'>";
					codigo += "				<label class='w30 h70 centradoXY'>Editar Club</label>";
					codigo += "			</div>";
					codigo += "		</div>";
					codigo += "	</div>";

					codigo += "	<div id='clubEquipos' class='h65 w95 centradoXY flexWrap invisible'>";
					codigo += "		<div class='w100 h10 centradoInlineXY'>";
					codigo += "			<div id='botonClubDeporte1' onclick=\"cambiarFichaDatos('clubDeporte','1',"+js[0].ID_Club+")\">Balonmano</div>";
					codigo += "			<div id='botonClubDeporte2' onclick=\"cambiarFichaDatos('clubDeporte','2',"+js[0].ID_Club+")\">Baloncesto</div>";
					codigo += "			<div id='botonClubDeporte3' onclick=\"cambiarFichaDatos('clubDeporte','3',"+js[0].ID_Club+")\">Futsal</div>";
					codigo += "		</div>";
					codigo += "		<div class='w100 h90 centradoXY'>";
					codigo += "			<div id='clubDeporte1' class='w100 h90 centradoXY flexWrap'></div>";
					codigo += "			<div id='clubDeporte2' class='w100 h90 centradoXY flexWrap invisible'></div>";
					codigo += "			<div id='clubDeporte3' class='w100 h90 centradoXY flexWrap invisible'></div>";
					codigo += "		</div>";
					codigo += "	</div>";

					codigo += "	<div id='clubPalmares' class='h65 w95 centradoInlineXY invisible'>";
					codigo += "	</div>";

					codigo += " <footer class='PFooter centradoXY h10'></footer>";

					document.getElementById("cajaClub").innerHTML = codigo;

					mostrarVentanaDatos(tipo);

					// Personalizacion de colores
					const labelColor = "Color"+sessionStorage.getItem("Deporte");
					var colores = JSON.parse(sessionStorage.getItem(labelColor));
					if (sessionStorage.getItem(labelColor)) {
						document.getElementById("botonClubFicha").style.color = js[0].Color2;
						document.getElementById("botonClubDeporte1").style.color = js[0].Color1;
						document.getElementById("cajaClub").style.background = js[0].ColorFondo;
						var label = document.getElementById("cajaClub");
						label.getElementsByTagName("label").color = js[0].ColorTexto;
					}
				},
				timeout: 10000,
				error: function() {ventanaDatos(tipo,id,temporada);}
			});
			break;
		case "equipo":
			$.ajax({
				url: "php/datosEquipo.php",
				type: 'POST',
				data: {
					idEquipo: id,
					temporada: temporada
				},
				success: function(res){
					document.getElementById("loaderCajaFichas").classList.remove("loader");
					var js= JSON.parse(res);

					var codigo = "";
					codigo += "	<div class='h15 w100 centradoInlineXY'>";
					codigo += "		<div id='labelnombreEquipo' class='w90'>"+js[0].Nombre+"</div>";
					codigo += "		<img id='fichaSalir' class='h50' src='img/Menu/boton_salir.png' alt='salir' onclick=\"salirVentanaDatos('Equipo')\">";
					codigo += "	</div>";
					codigo += "	<div class='h7 w50 spaceAroundXY'>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonEquipoFicha' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('equipo','Ficha')\">Equipo</button></div>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonEquipoPlantilla' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('equipo','Plantilla',"+id+","+temporada+","+js[0].ID_Club+")\">Plantilla</button></div>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonEquipoTecnicos' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('equipo','Tecnicos',"+id+","+temporada+","+js[0].ID_Club+")\">Técnicos</button></div>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonEquipoPalmares' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('equipo','Palmares')\">Palmarés</button></div>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonEquipoClub' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('equipo','Club',"+js[0].ID_Club+")\">Club</button></div>";
					codigo += "	</div>";

					codigo += "	<div id='equipoFicha' class='h65 w95 centradoInlineXY'>";
					codigo += "		<div class='h100 w30 centradoXY'>";
					codigo += "			<img class='w70 fotoFichaEquipo' src='img/Clubes/"+valorDeporte(js[0].Deporte)+"/Equipos/"+js[0].Escudo+"' alt='Escudo' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
					codigo += "		</div>";
					codigo += "		<div class='h100 w40 centradoXY flexWrap'>";
					codigo += "			<div class='h10 w90 centradoInlineXY'>";
					codigo += "				<label class='labelDatos'><strong>"+valorCategoria(js[0].Categoria)+"</strong></label>";
					codigo += "				<img class='h70 w30' src='img/Menu/"+js[0].Seccion+".png' alt='seccion'>";
					codigo += "			</div>";
					codigo += "			<div class='h10 w90 centradoInlineXY'>";
					codigo += "				<div class='h100 w40'>";
					codigo += "					<label class='labelDatos'>Responsable</label>";
					codigo += "				</div>";
					codigo += "				<div class='h100 w60'>";
					codigo += "					<label class='fichaDato'>"+js[0].Responsable+"</label>";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div class='h10 w90 centradoInlineXY'>";
					codigo += "				<div class='h100 w40'>";
					codigo += "					<label class='labelDatos'>Pabellón</label>";
					codigo += "				</div>";
					codigo += "				<div class='h100 w60'>";
					codigo += "					<label class='fichaDato'>"+js[0].Pabellon+"</label>";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div class='h10 w90 spaceAroundXY'>";
					codigo += "				<img class='h80' src='img/Idiomas/"+js[0].Pais+".png' alt='pais'>";
					if (js[0].Comunidad) {
						codigo += "			<img class='h50' src='img/Clubes/Clubes/Localidades/"+js[0].Comunidad+".png' alt='pais'>";
					}
					if (js[0].Localidad) {
						codigo += "			<label class='labelDatos'>"+js[0].Localidad+"</label>";
					}
					codigo += "			</div>";
					codigo += "		</div>";
					codigo += "		<div class='h100 w30 centradoInlineXY'>";
					const valorNivel = js[0].Nivel_Competicion ? js[0].Nivel_Competicion : 0;
					codigo += "			<div class='w80 centradoInlineXY flexWrap division"+valorNivel+"Fondo' style='aspect-ratio: auto 10/3;border-top-left-radius: 33%;border-top-right-radius: 33%;border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;'>";
					codigo += "				<label class='labelDatos w70 spaceAroundXY' style='font-size:1.7rem'>1º <small>20 pts</small></label>";
					const valorNombreComp = js[0].Nombre_Competicion ? js[0].Nombre_Competicion : "";
					codigo += "				<label class='labelDatos' style='font-size: clamp(.9rem,13px,1.2rem);'>"+valorNombreComp+"</label>";
					codigo += "			</div>";
					codigo += "		</div>";
					codigo += "	</div>";

					codigo += "	<div id='equipoPlantilla' class='h65 w90 spaceAroundXY invisible'>";
					codigo += "	</div>";

					codigo += "	<div id='equipoTecnicos' class='h65 w90 spaceAroundXY invisible'>";
					codigo += " 	Menú en proceso";
					codigo += "	</div>";

					codigo += "	<div id='equipoPalmares' class='h65 w90 centradoXY flexWrap invisible'>";
					codigo += " 	Aquí se mostrará el palmarés del equipo en cada temporada";
					codigo += "	</div>";

					codigo += " <footer class='PFooter centradoXY h10'></footer>";

					document.getElementById("cajaEquipo").innerHTML = codigo;
					document.getElementById("botonEquipoFicha").style.color = "var(--color-corporativo-morado)";

					mostrarVentanaDatos(tipo);

					// Colores personalizados
					const labelColor = "Color"+sessionStorage.getItem("Deporte");
					if (sessionStorage.getItem(labelColor)) {
						var colores = JSON.parse(sessionStorage.getItem(labelColor));
						document.getElementById("labelnombreEquipo").style.color = colores[3];
						document.getElementById("cajaEquipo").style.background = colores[2];
					}

					// Ventana por defecto
					document.getElementById("equipoFicha").classList.remove("invisible");
				},
				timeout: 10000,
				error: function() {ventanaDatos(tipo,id,temporada);}
			});
			break;
		case "jugador":
			$.ajax({
				url: "php/datosJugador.php",
				type: 'POST',
				data: {
					idJugador: id
				},
				success: function(res){
					document.getElementById("loaderCajaFichas").classList.remove("loader");
					var js= JSON.parse(res);

					var codigo = "";
					codigo += "	<div class='h15 w100 centradoInlineXY'>";
					codigo += "		<div id='labelnombreJugador' class='w90'>"+js[0].NombreCompleto+"</div>";
					codigo += "		<img id='fichaSalir' class='h50' src='img/Menu/boton_salir.png' alt='salir' onclick=\"salirVentanaDatos('Jugador')\">";
					codigo += "	</div>";
					codigo += "	<div class='h7 w50 spaceAroundXY'>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonJugadorFicha' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('jugador','Ficha')\">Ficha</button></div>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonJugadorCarrera' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('jugador','Carrera')\">Carrera</button></div>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonJugadorEvolucion' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('jugador','Evolucion')\">Evolución</button></div>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonJugadorEvolucionPro' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('jugador','EvolucionPro')\">Evolución <span style='color: var(--color-pro)'>Pro</span></button></div>";
					codigo += "	</div>";

					codigo += "	<div id='jugadorFicha' class='h65 w95 centradoInlineXY'>";
					codigo += "		<div class='h100 w30 centradoXY'>";
					let claseFondo = "";
					switch(js[0].Tipo) {
					case "1":
						claseFondo = "fondoFichaJugador";
						//claseFoto = "fotoFichaJugador";
						break;
					case "2":
						claseFondo = "fondoFichaJugadorEspecial";
						//claseFoto = "fotoFichaJugadorEspecial";
						break;
					case "3":
						claseFondo = "fondoFichaJugadorEspecialBigDT";
						//claseFoto = "fotoFichaJugadorEspecialBigDT";
						break;
					}
					codigo += "			<div class='h70 w20 centradoXY "+claseFondo+"'></div>";
					let nombreFoto = js[0].Foto == "" ? "x.png" : js[0].Foto;
					if (js[0].Foto == "") {
						for (var i = js.length - 1; i >= 0; i--) {
							if(js[i].Foto !== "") {
								nombreFoto = js[i].Foto;
							}
						}
					}
					const deporteNombre = js[0].Deporte !== null ? valorDeporte(js[0].Deporte) : valorDeporte(sessionStorage.getItem("Deporte"));
					const estiloFotoFichaJugador = js[0].Tipo == "2" || js[0].Tipo == "3" ? " style='border-radius:0;object-fit:contain'" : "";
					codigo += "			<img class='h70 fotoFichaJugador' src='img/Clubes/"+deporteNombre+"/Plantillas/"+js[0].ID_Equipo+"/"+nombreFoto+"' alt='Foto' onerror=\"this.src='img/Clubes/usuario.png'\""+estiloFotoFichaJugador+">";
					codigo += "		</div>";
					codigo += "		<div class='h100 w40 centradoXY flexWrap'>";
					codigo += "			<div class='h10 w90 centradoInlineXY'>";
					codigo += "				<div class='h100 w60'>";
					codigo += "					<label class='labelDatos'>Nacionalidad</label>";
					codigo += "				</div>";
					codigo += "				<div class='h100 w40'>";
					if (js[0].Nacionalidad2 == "") {
						var nacionalidad = "<img class='h100' src='img/Idiomas/"+js[0].Nacionalidad+".png' alt='"+js[0].Nacionalidad+"' title='"+nombrePais(js[0].Nacionalidad)+"'>";
					}else{
						var nacionalidad = "<img class='h100' src='img/Idiomas/"+js[0].Nacionalidad+".png' alt='"+js[0].Nacionalidad+"' title='"+nombrePais(js[0].Nacionalidad)+"'> <img class='h100' src='img/Idiomas/"+js[0].Nacionalidad2+".png' alt='"+js[0].Nacionalidad2+"' title='"+nombrePais(js[0].Nacionalidad2)+"'>";
					}
					codigo += 					nacionalidad;
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div class='h10 w90 centradoInlineXY'>";
					codigo += "				<div class='h100 w60'>";
					codigo += "					<label class='labelDatos'>Edad</label>";
					codigo += "				</div>";
					codigo += "				<div class='h100 w40'>";
					codigo += "					<label class='fichaDato'>"+js[0].Edad+" Años</label>";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div class='h10 w90 centradoInlineXY'>";
					codigo += "				<div class='h100 w60'>";
					codigo += "					<label class='labelDatos'>Altura</label>";
					codigo += "				</div>";
					codigo += "				<div class='h100 w40'>";
					codigo += "					<label class='fichaDato'>"+js[0].Altura+" cms</label>";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div class='h10 w90 centradoInlineXY'>";
					codigo += "				<div class='h100 w60'>";
					codigo += "					<label class='labelDatos'>Peso</label>";
					codigo += "				</div>";
					codigo += "				<div class='h100 w40'>";
					codigo += "					<label class='fichaDato'>"+js[0].Peso+" kgs</label>";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div class='h10 w90 centradoInlineXY'>";
					codigo += "				<div class='h100 w60'>";
					codigo += "					<label class='labelDatos'>Estilo</label>";
					codigo += "				</div>";
					codigo += "				<div class='h100 w40'>";
					codigo += "					<label class='fichaDato'>-</label>";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "		</div>";
					codigo += "		<div class='h100 w30 centradoInlineXY'>";
					const deporteNum = js[0].Deporte !== null ? js[0].Deporte : sessionStorage.getItem("Deporte");
					codigo += "			<img class='h80' src='img/Menu/campo"+deporteNum+js[0].Posicion+".png' alt='campo'>";
					codigo += "		</div>";
					codigo += "	</div>";

					codigo += "	<div id='jugadorCarrera' class='h65 w90 invisible'>";
					for (var i = 0; i < js.length; i++) {
						codigo += "	<div class='w90 h20 centradoInlineXY'>";
						codigo += " 	<div class='h100 w30 spaceAroundXY'>";
						if (js[i].Foto == "") {
							for (var j = i; j < js.length; j++) {
								if (js[j].Foto !== "") {
									var foto = js[j].Foto; 
								}
							}
						}else{
							var foto = js[i].Foto;
						}
						var deporteCarreraNombre = js[i].Deporte !== null ? valorDeporte(js[i].Deporte) : valorDeporte(sessionStorage.getItem("Deporte"));
						if (js[i].Tipo == "2") {
							codigo += "		<div class='w50 h100 centradoXY' style='position:relative'>";
							codigo += "			<div class='h100 w50 centradoXY fondoFichaJugadorEspecial'></div><img class='h100 fotoFichaJugador' src='img/Clubes/"+deporteCarreraNombre+"/Plantillas/"+js[i].ID_Equipo+"/"+foto+"' alt='Foto' onerror=\"this.src='img/Clubes/usuario.png'\"></div>";
						}else if (js[i].Tipo == "3") {
							codigo += "		<div class='w50 h100 centradoXY' style='position:relative'>";
							codigo += "			<div class='h100 w50 centradoXY fondoFichaJugadorEspecialBigDT'></div>";
							codigo += "			<img class='h100 fotoFichaJugadorEspecialBigDT' src='img/Clubes/"+deporteCarreraNombre+"/Plantillas/"+js[i].ID_Equipo+"/"+foto+"' alt='Foto' onerror=\"this.src='img/Clubes/usuario.png'\">";
							codigo += "		</div>";
						}else{
							codigo += "		<div class='w50 h100 centradoXY'><img class='h90 fotoFichaJugador' src='img/Clubes/"+deporteCarreraNombre+"/Plantillas/"+js[i].ID_Equipo+"/"+foto+"' alt='Foto' onerror=\"this.src='img/Clubes/usuario.png'\"></div>";
						}
						codigo += "			<div class='w50 h100 centradoXY'><img class='h90' src='img/Clubes/"+deporteCarreraNombre+"/Equipos/"+js[i].Escudo+"' alt='escudo' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\"></div>";
						codigo += " 	</div>";
						codigo += " 	<div class='h100 w70'>";
						codigo += " 		<div class='h100 w100 spaceAroundXY'>";
						codigo += "				<div class='h100 w20 centradoXY flexWrap'>"+js[i].NombreClub+"</div>";
						codigo += "				<label class='w20'>"+js[i].Temporada+"/"+(parseInt(js[i].Temporada)+1)+"</label>";
						codigo += "				<div class='h40 centradoXY cajaNumeroDorsal'>"+js[i].Dorsal+"</div>";
						codigo += "				<div class='h40 centradoXY cajaPosicion'>"+textoPuestos(sessionStorage.getItem("Deporte"),js[i].Posicion,"1")+"</div>";
						codigo += "				<label class='w10'> "+js[i].Edad+" años </label>";
						codigo += "				<label class='w10'> "+js[i].Altura+" cms </label>";
						codigo += "				<label class='w10'> "+js[i].Peso+" kgs </label>";
						codigo += " 		</div>";
						codigo += " 	</div>";
						codigo += " </div>";
					}
					codigo += "	</div>";

					codigo += "	<div id='jugadorEvolucion' class='h65 w90 centradoXY flexWrap invisible'>";
					codigo += " 	<div class='h45 w50 centradoXY flexWrap'>";
					codigo += "		 	<div class='h90 w90 centradoXY flexWrap cajaGrafica'>";
					codigo += "			 	<div class='h90 w100 evolucionGrafica'>";
					for (var i = 1; i <= 4; i++) {
						codigo += "				<div class='lineaGrafica w100 h"+(25*i)+"'></div>";
					}
					codigo += "					<canvas id='lineaAltura' width='425.25' height='190'>Tu navegador no soporta HTML5 Canvas</canvas>";
					codigo += "					<canvas id='lineaPeso' width='425.25' height='190'>Tu navegador no soporta HTML5 Canvas</canvas>";
					codigo += "				</div>";
					codigo += "			 	<div class='h10 w100 centradoInlineXY evolucionLabel'>";
					for (var i = js.length - 1; i >= 0; i--) {
						if (js.length > 9) {
							var temporadaSplit = js[i].Temporada.split("");
							var temporada = temporadaSplit[2]+js[i].Temporada[3];
						}else{
							var temporada = js[i].Temporada;
						}
						codigo += "				<div class='h100 centradoXY' style='width:"+(100/js.length).toFixed(0)+"%'>"+temporada+"</div>";
					}
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += " 		<div class='h10 w90 centradoXY'><span class='color1'>Peso</span>&nbspy&nbsp<span class='color2'>Altura</span>";
					codigo += "			</div>";
					codigo += "		</div>";
					codigo += " 	<div class='h45 w50 centradoXY flexWrap'>";
					codigo += "		 	<div class='h90 w90 centradoXY flexWrap cajaGrafica'>";
					codigo += "			 	<div class='h90 w100 evolucionGrafica'>";
					for (var i = 1; i <= 4; i++) {
						codigo += "				<div class='lineaGrafica w100 h"+(25*i)+"'></div>";
					}
					codigo += "					<canvas id='lineaMinutos' width='425.25' height='190'>Tu navegador no soporta HTML5 Canvas</canvas>";
					codigo += "					<canvas id='lineaPartidos' width='425.25' height='190'>Tu navegador no soporta HTML5 Canvas</canvas>";
					codigo += "				</div>";
					codigo += "			 	<div class='h10 w100 centradoInlineXY evolucionLabel'>";
					for (var i = js.length - 1; i >= 0; i--) {
						if (js.length > 9) {
							var temporadaSplit = js[i].Temporada.split("");
							var temporada = temporadaSplit[2]+js[i].Temporada[3];
						}else{
							var temporada = js[i].Temporada;
						}
						codigo += "				<div class='h100 centradoXY' style='width:"+(100/js.length).toFixed(0)+"%'>"+temporada+"</div>";
					}
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += " 		<div class='h10 w90 centradoXY'><span class='color1'>Minutos Jugados</span>&nbspy&nbsp<span class='color2'>Partidos Jugados</span>";
					codigo += "			</div>";
					codigo += "		</div>";
					codigo += " 	<div class='h45 w50 centradoXY flexWrap'>";
					codigo += "		 	<div class='h90 w90 centradoXY flexWrap cajaGrafica'>";
					codigo += "			 	<div class='h90 w100 evolucionGrafica'>";
					for (var i = 1; i <= 4; i++) {
						codigo += "				<div class='lineaGrafica w100 h"+(25*i)+"'></div>";
					}
					codigo += "					<canvas id='lineaValoracion' width='425.25' height='190'>Tu navegador no soporta HTML5 Canvas</canvas>";
					codigo += "				</div>";
					codigo += "			 	<div class='h10 w100 centradoInlineXY evolucionLabel'>";
					for (var i = js.length - 1; i >= 0; i--) {
						if (js.length > 9) {
							var temporadaSplit = js[i].Temporada.split("");
							var temporada = temporadaSplit[2]+js[i].Temporada[3];
						}else{
							var temporada = js[i].Temporada;
						}
						codigo += "				<div class='h100 centradoXY' style='width:"+(100/js.length).toFixed(0)+"%'>"+temporada+"</div>";
					}
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += " 		<div class='h10 w90 centradoXY'><span class='color1'>Valoración Media</span>";
					codigo += "			</div>";
					codigo += "		</div>";
					codigo += "	</div>";

					codigo += "	<div id='jugadorEvolucionPro' class='h65 w90 invisible'>";
					codigo += "		Aquí podrás visualizar y analizar la evolución de datos más particulares del jugador, como son:<br>· Fuerza mental<br>· Habilidad técnica<br>· Capacidad física<br>· Capacidad táctica<br>· ...";
					codigo += "	</div>";

					codigo += " <footer class='PFooter centradoXY h10'></footer>";
					document.getElementById("cajaJugador").innerHTML = codigo;
					document.getElementById("botonJugadorFicha").style.color = "var(--color-corporativo-morado)";

					mostrarVentanaDatos(tipo);

					dibujarGrafica("Altura",1);
					dibujarGrafica("Peso",2);

					// Colores personalizados
					const labelColor = "Color"+deporteNum;
					if (sessionStorage.getItem(labelColor)) {
						var colores = JSON.parse(sessionStorage.getItem(labelColor));						
						document.getElementById("labelnombreJugador").style.color = colores[3];
						document.getElementById("cajaJugador").style.background = colores[2];
					}

					// Dibujar gráfica
					function dibujarGrafica(nombre,opcion) {
						var label = "linea"+nombre;
						var canvas = document.getElementById(label).getContext("2d");

						canvas.beginPath();
						canvas.lineWidth = 2;
						canvas.miterLimit = 35;
						canvas.lineCap = "square";
						switch (opcion) {
							case 1:
								var color = "#a557d8";
								break;
							case 2:
								var color = "#c52bb4";
								break;
						}
						switch (nombre) {
							case "Altura":
								var valorMaximo = 220;  // Min Altura: 0; Max Altura: 220 cms
								break;
							case "Peso":
								var valorMaximo = 150; // Min Peso: 0; Max Peso: 150 kgs
								break;
						}
						canvas.strokeStyle = color;
						canvas.lineJoin = "round";
						
						var partes = 425.25 / js.length; // Ancho de canvas: 425.25px
						var xInicial = partes / 2;
						var yInicial = 190 - (eval("js[js.length - 1]."+nombre) * 190 / valorMaximo); // Alto de canvas: 190px
						canvas.moveTo(xInicial,yInicial);
						//console.log(eval("js[js.length - 1]."+nombre));

						for (var i = js.length - 1; i >= 0; i--) {
							var j = js.length - i;
							var x = (j * partes) - (partes/2);

							var dato = eval("js[i]."+nombre);
							var y = 190 - (dato * 190 / valorMaximo);

							canvas.lineTo(x.toFixed(2),y.toFixed(2));
							canvas.lineTo(x.toFixed(2),y.toFixed(2));
						}
						canvas.stroke();
						canvas.stroke();
					}
				},
				timeout: 10000,
				error: function() {ventanaDatos(tipo,id,temporada);}
			});
			break;
		case "entrenador":
			$.ajax({
				url: "php/datosEntrenador.php",
				type: 'POST',
				data: {
					idEntrenador: id
				},
				success: function(res){
					document.getElementById("loaderCajaFichas").classList.remove("loader");
					var js= JSON.parse(res);

					var codigo = "";
					codigo += "	<div class='h15 w100 centradoInlineXY'>";
					codigo += "		<div id='labelnombreEntrenador' class='w90'>"+js[0].Nombre+"</div>";
					codigo += "		<img id='fichaSalir' class='h50' src='img/Menu/boton_salir.png' alt='salir' onclick=\"salirVentanaDatos('Entrenador')\">";
					codigo += "	</div>";
					codigo += "	<div class='h7 w50 spaceAroundXY'>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonEntrenadorFicha' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('entrenador','Ficha')\">Ficha</button></div>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonEntrenadorCarrera' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('entrenador','Carrera')\">Carrera</button></div>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonEntrenadorEvolucion' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('entrenador','Evolucion')\">Evolución</button></div>";
					codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonEntrenadorEvolucionPro' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('entrenador','EvolucionPro')\">Evolución <span style='color: var(--color-pro)'>Pro</span></button></div>";
					codigo += "	</div>";

					codigo += "	<div id='entrenadorFicha' class='h65 w95 centradoInlineXY'>";
					codigo += "		<div class='h100 w30 centradoXY'>";
					if (js[0].Tipo == "2") { /////////////////////////////// ESTO HAY QUE INCLUIRLO ///////////////////////////////////////////
						codigo += "		<div class='h70 w20 centradoXY' style='background: url(\"../img/fondoFichaEspecial.png\") no-repeat; background-position-x: 0%; background-position-y: 0%; background-size: auto; background-size: auto; background-size: contain; background-position: center; position: absolute; transform: rotate(-6deg);'></div>";
					}
					let nombreFoto = js[0].Foto == "" ? "x.png" : js[0].Foto;
					if (js[0].Foto == "") {
						for (var i = js.length - 1; i >= 0; i--) {
							if(js[i].Foto !== "") {
								nombreFoto = js[i].Foto;
							}
						}
					}
					const deporteNombre = valorDeporte(sessionStorage.getItem("Deporte"));
					const estiloFotoFichaEntrenador = js[0].Tipo == "2" ? " style='border-radius:0;object-fit:contain'" : "";
					codigo += "			<img class='h70 fotoFichaEntrenador' src='img/Clubes/"+deporteNombre+"/Plantillas/"+js[0].ID_Equipo+"/"+nombreFoto+"' alt='Foto' onerror=\"this.src='img/Clubes/usuario.png'\""+estiloFotoFichaEntrenador+">";
					codigo += "		</div>";
					codigo += "		<div class='h100 w60 centradoXY flexWrap'>";
					codigo += "			<div class='h10 w90 centradoInlineXY'>";
					codigo += "				<div class='h100 w40'>";
					codigo += "					<label class='labelDatos'>Nacionalidad</label>";
					codigo += "				</div>";
					codigo += "				<div class='h100 w60'>";
					if (js[0].Nacionalidad2 == "" || js[0].Nacionalidad2 == null) {
						var nacionalidad = "<img class='h100' src='img/Idiomas/"+js[0].Nacionalidad+".png' alt='"+js[0].Nacionalidad+"' title='"+nombrePais(js[0].Nacionalidad)+"'>";
					}else{
						var nacionalidad = "<img class='h100' src='img/Idiomas/"+js[0].Nacionalidad+".png' alt='"+js[0].Nacionalidad+"' title='"+nombrePais(js[0].Nacionalidad)+"'> <img class='h100' src='img/Idiomas/"+js[0].Nacionalidad2+".png' alt='"+js[0].Nacionalidad2+"' title='"+nombrePais(js[0].Nacionalidad2)+"'>";
					}
					codigo += 					nacionalidad;
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div class='h10 w90 centradoInlineXY'>";
					codigo += "				<div class='h100 w40'>";
					codigo += "					<label class='labelDatos'>Edad</label>";
					codigo += "				</div>";
					codigo += "				<div class='h100 w60'>";
					let labelEdad = js[0].Edad == null ? "--" : js[0].Edad;
					codigo += "					<label class='fichaDato'>"+labelEdad+" Años</label>";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "			<div class='h10 w90 centradoInlineXY'>";
					codigo += "				<div class='h100 w40'>";
					codigo += "					<label class='labelDatos'>Puesto</label>";
					codigo += "				</div>";
					codigo += "				<div class='h100 w60'>";
					codigo += "					<label class='fichaDato'>"+textoTecnicos(js[0].Puesto)+"</label>";
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += "		</div>";
					/*codigo += "		<div class='h100 w30 centradoInlineXY'>";
					const deporteNum = js[0].Deporte !== null ? js[0].Deporte : sessionStorage.getItem("Deporte");
					codigo += "			<img class='h80' src='img/Menu/campo"+deporteNum+js[0].Posicion+".png' alt='campo'>";
					codigo += "		</div>";*/
					codigo += "	</div>";

					codigo += "	<div id='entrenadorCarrera' class='h65 w90 invisible'>";
					for (var i = 0; i < js.length; i++) {
						codigo += "	<div class='w90 h20 centradoInlineXY'>";
						codigo += " 	<div class='h100 w30 spaceAroundXY'>";
						if (js[i].Foto == "") {
							for (var j = i; j < js.length; j++) {
								if (js[j].Foto !== "") {
									var foto = js[j].Foto; 
								}
							}
						}else{
							var foto = js[i].Foto;
						}
						if (js[i].Tipo == "2") {
							codigo += "		<div class='w50 h100 centradoXY' style='position:relative'><div class='h100 w60 centradoXY' style='background: url(\"../img/fondoFichaEspecial.png\") no-repeat; background-position-x: 0%; background-position-y: 0%; background-size: auto; background-size: auto; background-size: contain; background-position: center; position: absolute; transform: rotate(-6deg);'></div><img class='h100 fotoFichaEntrenador' style='border-radius:0%; border-radius:0;object-fit:contain' src='img/Clubes/"+deporteNombre+"/Plantillas/"+js[i].ID_Equipo+"/"+foto+"' alt='Foto' onerror=\"this.src='img/Clubes/usuario.png'\"></div>";
						}else{
							codigo += "		<div class='w50 h100 centradoXY'><img class='h90 fotoFichaEntrenador' src='img/Clubes/"+deporteNombre+"/Plantillas/"+js[i].ID_Equipo+"/"+foto+"' alt='Foto' onerror=\"this.src='img/Clubes/usuario.png'\"></div>";
						}
						codigo += "			<div class='w50 h100 centradoXY'><img class='h90' src='img/Clubes/"+deporteNombre+"/Equipos/"+js[i].Escudo+"' alt='escudo' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\"></div>";
						codigo += " 	</div>";
						codigo += " 	<div class='h100 w70'>";
						codigo += " 		<div class='h100 w100 spaceAroundXY'>";
						codigo += "				<div class='h100 w20 centradoXY flexWrap'>"+js[i].NombreClub+"</div>";
						codigo += "				<label class='w20'>"+js[i].Temporada+"/"+(parseInt(js[i].Temporada)+1)+"</label>";
						codigo += "				<div class='h40 centradoXY'>"+textoTecnicos(js[0].Puesto)+"</div>";
						let labelEdad = js[i].Edad == null ? "--" : js[i].Edad;
						codigo += "				<label class='w15'> "+labelEdad+" años </label>";
						codigo += " 		</div>";
						codigo += " 	</div>";
						codigo += " </div>";
					}
					codigo += "	</div>";

					codigo += "	<div id='entrenadorEvolucion' class='h65 w90 centradoXY flexWrap invisible'>";
					codigo += " 	<div class='h45 w50 centradoXY flexWrap'>";
					codigo += "		 	<div class='h90 w90 centradoXY flexWrap cajaGrafica'>";
					codigo += "			 	<div class='h90 w100 evolucionGrafica'>";
					for (var i = 1; i <= 4; i++) {
						codigo += "				<div class='lineaGrafica w100 h"+(25*i)+"'></div>";
					}
					codigo += "					<canvas id='lineaAltura' width='425.25' height='190'>Tu navegador no soporta HTML5 Canvas</canvas>";
					codigo += "					<canvas id='lineaPeso' width='425.25' height='190'>Tu navegador no soporta HTML5 Canvas</canvas>";
					codigo += "				</div>";
					codigo += "			 	<div class='h10 w100 centradoInlineXY evolucionLabel'>";
					for (var i = js.length - 1; i >= 0; i--) {
						if (js.length > 9) {
							var temporadaSplit = js[i].Temporada.split("");
							var temporada = temporadaSplit[2]+js[i].Temporada[3];
						}else{
							var temporada = js[i].Temporada;
						}
						codigo += "				<div class='h100 centradoXY' style='width:"+(100/js.length).toFixed(0)+"%'>"+temporada+"</div>";
					}
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += " 		<div class='h10 w90 centradoXY'><span class='color1'>Peso</span>&nbspy&nbsp<span class='color2'>Altura</span>";
					codigo += "			</div>";
					codigo += "		</div>";
					codigo += " 	<div class='h45 w50 centradoXY flexWrap'>";
					codigo += "		 	<div class='h90 w90 centradoXY flexWrap cajaGrafica'>";
					codigo += "			 	<div class='h90 w100 evolucionGrafica'>";
					for (var i = 1; i <= 4; i++) {
						codigo += "				<div class='lineaGrafica w100 h"+(25*i)+"'></div>";
					}
					codigo += "					<canvas id='lineaMinutos' width='425.25' height='190'>Tu navegador no soporta HTML5 Canvas</canvas>";
					codigo += "					<canvas id='lineaPartidos' width='425.25' height='190'>Tu navegador no soporta HTML5 Canvas</canvas>";
					codigo += "				</div>";
					codigo += "			 	<div class='h10 w100 centradoInlineXY evolucionLabel'>";
					for (var i = js.length - 1; i >= 0; i--) {
						if (js.length > 9) {
							var temporadaSplit = js[i].Temporada.split("");
							var temporada = temporadaSplit[2]+js[i].Temporada[3];
						}else{
							var temporada = js[i].Temporada;
						}
						codigo += "				<div class='h100 centradoXY' style='width:"+(100/js.length).toFixed(0)+"%'>"+temporada+"</div>";
					}
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += " 		<div class='h10 w90 centradoXY'><span class='color1'>Minutos Jugados</span>&nbspy&nbsp<span class='color2'>Partidos Jugados</span>";
					codigo += "			</div>";
					codigo += "		</div>";
					codigo += " 	<div class='h45 w50 centradoXY flexWrap'>";
					codigo += "		 	<div class='h90 w90 centradoXY flexWrap cajaGrafica'>";
					codigo += "			 	<div class='h90 w100 evolucionGrafica'>";
					for (var i = 1; i <= 4; i++) {
						codigo += "				<div class='lineaGrafica w100 h"+(25*i)+"'></div>";
					}
					codigo += "					<canvas id='lineaValoracion' width='425.25' height='190'>Tu navegador no soporta HTML5 Canvas</canvas>";
					codigo += "				</div>";
					codigo += "			 	<div class='h10 w100 centradoInlineXY evolucionLabel'>";
					for (var i = js.length - 1; i >= 0; i--) {
						if (js.length > 9) {
							var temporadaSplit = js[i].Temporada.split("");
							var temporada = temporadaSplit[2]+js[i].Temporada[3];
						}else{
							var temporada = js[i].Temporada;
						}
						codigo += "				<div class='h100 centradoXY' style='width:"+(100/js.length).toFixed(0)+"%'>"+temporada+"</div>";
					}
					codigo += "				</div>";
					codigo += "			</div>";
					codigo += " 		<div class='h10 w90 centradoXY'><span class='color1'>Valoración Media</span>";
					codigo += "			</div>";
					codigo += "		</div>";
					codigo += "	</div>";

					codigo += "	<div id='entrenadorEvolucionPro' class='h65 w90 invisible'>";
					codigo += "		Aquí podrás visualizar y analizar la evolución de datos más particulares del entrenador, como son:<br>· Fuerza mental<br>· Habilidad técnica<br>· Capacidad física<br>· Capacidad táctica<br>· ...";
					codigo += "	</div>";

					codigo += " <footer class='PFooter centradoXY h10'></footer>";
					document.getElementById("cajaEntrenador").innerHTML = codigo;
					document.getElementById("botonEntrenadorFicha").style.color = "var(--color-corporativo-morado)";

					mostrarVentanaDatos(tipo);

					dibujarGrafica("Altura",1);
					dibujarGrafica("Peso",2);

					// Colores personalizados
					const labelColor = "Color"+sessionStorage.getItem("Deporte");
					if (sessionStorage.getItem(labelColor)) {
						var colores = JSON.parse(sessionStorage.getItem(labelColor));						
						document.getElementById("labelnombreEntrenador").style.color = colores[3];
						document.getElementById("cajaEntrenador").style.background = colores[2];
					}

					// Dibujar gráfica
					function dibujarGrafica(nombre,opcion) {
						var label = "linea"+nombre;
						var canvas = document.getElementById(label).getContext("2d");

						canvas.beginPath();
						canvas.lineWidth = 2;
						canvas.miterLimit = 35;
						canvas.lineCap = "square";
						switch (opcion) {
							case 1:
								var color = "#a557d8";
								break;
							case 2:
								var color = "#c52bb4";
								break;
						}
						switch (nombre) {
							case "Altura":
								var valorMaximo = 220;  // Min Altura: 0; Max Altura: 220 cms
								break;
							case "Peso":
								var valorMaximo = 150; // Min Peso: 0; Max Peso: 150 kgs
								break;
						}
						canvas.strokeStyle = color;
						canvas.lineJoin = "round";
						
						var partes = 425.25 / js.length; // Ancho de canvas: 425.25px
						var xInicial = partes / 2;
						var yInicial = 190 - (eval("js[js.length - 1]."+nombre) * 190 / valorMaximo); // Alto de canvas: 190px
						canvas.moveTo(xInicial,yInicial);
						//console.log(eval("js[js.length - 1]."+nombre));

						for (var i = js.length - 1; i >= 0; i--) {
							var j = js.length - i;
							var x = (j * partes) - (partes/2);

							var dato = eval("js[i]."+nombre);
							var y = 190 - (dato * 190 / valorMaximo);

							canvas.lineTo(x.toFixed(2),y.toFixed(2));
							canvas.lineTo(x.toFixed(2),y.toFixed(2));
						}
						canvas.stroke();
						canvas.stroke();
					}
				},
				timeout: 10000,
				error: function() {ventanaDatos(tipo,id,temporada);}
			});
			break;
		case "torneo":
			document.getElementById("loaderCajaFichas").classList.remove("loader");

			let codigo = "";
			codigo += "	<div class='h15 w100 centradoInlineXY'>";
			codigo += "		<div id='labelnombreTorneo' class='w90'>"+sessionStorage.getItem('Campeonato_Nombre')+"</div>";
			codigo += "		<img id='fichaSalir' class='h50' src='img/Menu/boton_salir.png' alt='salir' onclick=\"salirVentanaDatos('Torneo')\">";
			codigo += "	</div>";
			codigo += "	<div class='h7 w50 spaceAroundXY'>";
			codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonTorneoFicha' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('torneo','Ficha')\">Ficha</button></div>";
			codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonTorneoInscripciones' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('torneo','Inscripciones')\">Inscripciones</button></div>";
			codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonTorneoNormativa' class='botonesFicha w100 h80' onclick=\"cambiarFichaDatos('torneo','Normativa')\">Normativa</button></div>";
			codigo += "		<div class='h80 centradoXY flexWrap'><button id='botonTorneoGestion' class='botonesFicha w100 h80 textoPro' onclick=\"cambiarFichaDatos('torneo','Gestion')\">Gestionar</button></div>";
			codigo += "	</div>";

			codigo += " <div class='h60 w95'>";
			codigo += "		<div id='torneoFicha' class='h100 w100 centradoXY flexWrap'>";
			codigo += " 		<div class='h70 w30 centradoXY flexWrap'>";
			codigo += "				<img class='w60 h60' src='img/Clubes/Clubes/"+sessionStorage.getItem("Campeonato_Escudo")+"' alt='Escudo'>";
			codigo += "				<img class='w90 h15' src='img/Menu/"+sessionStorage.getItem("Campeonato_Seccion")+".png' alt='Seccion'>";
			codigo += "			</div>";
			codigo += " 		<div class='h60 w50 spaceAroundXY flexWrap' style='font-size: 2em;'>";
			codigo += "				<div class='w100 centradoInlineXY'>";
			codigo += "					<strong class='w30 color2'>Deporte: </strong>";
			codigo += "					<label class='w50'>"+textoDeportes(sessionStorage.getItem("Deporte"))+"</label>";
			codigo += "				</div>";
			codigo += "				<div class='w100 centradoInlineXY'>";
			codigo += "					<strong class='w30 color2'>Equipos: </strong>";
			if (sessionStorage.getItem("Campeonato_Participantes") == sessionStorage.getItem("Campeonato_MaxParticipantes")) {
				codigo += "				<label class='w50'>"+sessionStorage.getItem("Campeonato_Participantes")+"</label>";
			}else{
				codigo += "				<label class='w50'>"+sessionStorage.getItem("Campeonato_Participantes")+" / <strong class='color1'>"+sessionStorage.getItem("Campeonato_MaxParticipantes")+"</strong></label>";
			}
			codigo += "				</div>";
			codigo += "				<div class='w100 centradoInlineXY'>";
			codigo += "					<strong class='w30 color2'>Estado: </strong>";
			if (sessionStorage.getItem("Campeonato_Estado") == "1") {
				if (sessionStorage.getItem("Campeonato_Participantes") == sessionStorage.getItem("Campeonato_MaxParticipantes")) {
					codigo += "			<div class='w50'><div class='w60 centradoXY' style='border: 2px solid var(--color-corporativo-rosa);border-radius: 15px; font-size: .7em;'>Completo</div></div>";
				}else{
					codigo += "			<div class='w50'><div class='w60 centradoXY parpadeo pulsable' onclick=\"cambiarFichaDatos('torneo','Inscripciones')\" style='border: 2px solid var(--color-corporativo-rosa);border-radius: 15px; font-size: .7em;'>Inscríbete</div></div>";
				}
			}else if (sessionStorage.getItem("Campeonato_Estado") == "2"){
				codigo += "				<label class='w50'>En activo</label>";
			}else if (sessionStorage.getItem("Campeonato_Estado") == "3"){
				codigo += "				<label class='w50'>Finalizado</label>";
			}
			codigo += "				</div>";
			codigo += "			</div>";
			codigo += "			<fieldset class='h20 w90' style='border: 2px solid var(--color-corporativo-rosa);border-radius: 15px;'>";
			codigo += "				<legend style='margin-left: 20px;padding: 0 1%;'><h2>Observaciones</h2></legend>";
			codigo += " 			<p style='padding: 1%; text-align: justify; color: var(--color-plata2);'>Este campeonato pertenece a la gira 'ReTo BigDT 2023'</p>";
			codigo += "			</fieldset>";
			codigo += "		</div>";

			codigo += "		<div id='torneoInscripciones' class='h100 w100 centradoInlineXY'>";
			codigo += "			<div class='h90 w30 centradoXY flexWrap'>";
			codigo += "				<div class='h15 w90'></div>";
			codigo += "				<select id='equipoPropioInscripcion' name='listadoEquiposPropios' class='w70'>";
			codigo += "					<option value='equipo 1'>Equipo 1</option>";
			codigo += "					<option value='equipo 2'>Equipo 2</option>";
			codigo += "				</select>";
			codigo += "				<div class='h40 w80 centradoXY flexWrap'>";
			codigo += "					<img class='h50' src='img/Clubes/Clubes/"+sessionStorage.getItem("Campeonato_Escudo")+"' alt='Escudo'>";
			codigo += "					<label style='text-align: center;'>Nombre del Equipo seleccionado</label>";
			codigo += "				</div>";
			codigo += "				<div class='h10 w50 centradoXY pulsable' style='background:var(--color-corporativo-rosa); border-radius: 50px'>Inscribir</div>";
			codigo += "				<div class='h10 w90'></div>";
			codigo += "			</div>";
			codigo += "			<div class='h90 w50 centradoXY flexWrap'>";
			codigo += "				<h2 class='h10 w90 centradoXY'>Equipos Inscritos</h2>";
			codigo += "				<fieldset class='h90 w90 centradoXY flexWrap' style='overflow-y:auto; border: 2px solid var(--color-corporativo-rosa);border-radius: 20px;padding: 2%;'>";
			codigo += "					<legend class='color2' style='margin-left: 85%;padding: 0 1%;'>10/16</legend>";
			for (var i = 0; i < 10; i++) {
				// Listado de Participantes
				codigo += "				<div class='w100 h20 spaceAroundXY' style='background: var(--color-fondoIndex);margin-bottom: 1%;border-radius: 10px;'>";
				codigo += "				 	<img class='w10 h70' src='img/Clubes/Clubes/"+sessionStorage.getItem("Campeonato_Escudo")+"' alt='Escudo'/>";
				codigo += "				 	<div class='w60 centradoXY flexWrap'>";
				codigo += "				 		<div class='w90'><strong>Nombre Equipo</strong></div>";
				codigo += "				 		<div class='w90'><small class='color1'>Nombre Usuario</small></div>";
				codigo += "					</div>";
				codigo += "				 	<img class='w5 h30' src='img/Menu/3.png' alt='Sección'>";
				codigo += "				</div>";
			}
			for (var i = 0; i < 2; i++) {
				// Cuando un equipo propio ya está inscrito a esta competición
				codigo += "				<div class='w100 h20 spaceAroundXY' style='background:var(--color-fondo-principal); border: 2px solid var(--color-corporativo-rosa);margin-bottom: 1%;border-radius: 10px;'>";
				codigo += "				 	<img class='w10 h80' src='img/Clubes/Clubes/"+sessionStorage.getItem("Campeonato_Escudo")+"' alt='Escudo'/>";
				codigo += "				 	<div class='w60 centradoXY flexWrap'>";
				codigo += "				 		<div class='w90'><strong>Equipo "+(i+1)+"</strong></div>";
				codigo += "				 		<div class='w90'><small class='color2'>"+leerDatosUsuario("Usuario")+"</small></div>";
				codigo += "					</div>";
				codigo += "				 	<img class='w5 h30' src='img/Menu/3.png' alt='Sección'>";
				codigo += "				 	<img class='w10 h70 pulsable' src='img/Menu/borrar.png' alt='Eliminar'>";
				codigo += "				</div>";
			}
			for (var i = 0; i < 6; i++) {
				// Casillas vacías hasta completar el MaxParticipantes
				codigo += "				<div class='w100 h20 spaceAroundXY' style='border: 1px solid var(--color-corporativo-morado);;margin-bottom: 1%;border-radius: 10px;'>";
				codigo += "				 	<img class='w10 h70' src='img/Clubes/Clubes/defecto.png' alt='Escudo'/>";
				codigo += "				 	<div class='w60 centradoXY flexWrap'>";
				codigo += "				 		<div class='w90'><strong>Vacío</strong></div>";
				codigo += "				 		<div class='w90'><small class='color1'></small></div>";
				codigo += "					</div>";
				codigo += "				 	<div class='w5 h30'></div>";
				codigo += "				</div>";
			}
			codigo += "				</fieldset>";
			codigo += "			</div>";
			codigo += "		</div>";

			codigo += "		<div id='torneoNormativa' class='h100 w100 centradoInlineXY'>Normas y características del torneo";
			codigo += "		</div>";
			codigo += " </div>";

			codigo += " <footer class='PFooter centradoXY h10'></footer>";

			document.getElementById("cajaTorneo").innerHTML = codigo;
			mostrarVentanaDatos(tipo);
			cambiarFichaDatos('torneo','Ficha');
			break;
	}

	function mostrarVentanaDatos(caja) {
		document.getElementById("cajaClub").classList.remove("alFrente");
		document.getElementById("cajaEquipo").classList.remove("alFrente");
		document.getElementById("cajaJugador").classList.remove("alFrente");
		document.getElementById("cajaEntrenador").classList.remove("alFrente");
		document.getElementById("cajaTorneo").classList.remove("alFrente");

		let texto = caja.charAt(0).toUpperCase() + caja.slice(1);
		let label = "caja"+texto;
		if (document.getElementById(label)) {
			document.getElementById(label).classList.add("alFrente");
			document.getElementById(label).classList.toggle("invisible");
		}

		switch(caja) {
		case "club":
		case "equipo":
			label = "menuEdicion";
			break;
		case "jugador":
		case "entrenador":
			label = "menuMiPlantilla";
			break;
		case "torneo":
			label = "menuCompeticiones";
		}
		document.getElementById(label).style = "pointer-events: none";
		mostrarPubli();
	};
};
	function cambiarFichaDatos(tipo,opcion,equipo,temporada,idClub) {
		// Personalizacion de colores
		const labelColor = "Color"+sessionStorage.getItem("Deporte");
		var colores = JSON.parse(sessionStorage.getItem(labelColor));

		switch (tipo) {
			case "club":
				var arrayBoton = Array("botonClubFicha", "botonClubEquipos", "botonClubPalmares");
				var arrayID = Array("clubFicha", "clubEquipos", "clubPalmares");
				var label = "botonClub"+opcion;
				var color = colores[1];
				if (opcion == "Equipos") {
					mostrarTablaEquipos("1",equipo);
				}
				break;
			case "clubDeporte":
				var arrayBoton = Array("botonClubDeporte1", "botonClubDeporte2", "botonClubDeporte3");
				var arrayID = Array("clubDeporte1", "clubDeporte2", "clubDeporte3");
				var label = "botonClubDeporte"+opcion;
				var color = colores[0];
				mostrarTablaEquipos(opcion,equipo);
				break;
			case "equipo":
				var arrayBoton = Array("botonEquipoFicha","botonEquipoClub","botonEquipoPlantilla","botonEquipoTecnicos","botonEquipoPalmares");
				var arrayID = Array("equipoFicha","equipoPlantilla", "equipoTecnicos", "equipoPalmares");
				var label = "botonEquipo"+opcion;
				var color = colores[1];
				break;
			case "jugador":
				var arrayBoton = Array("botonJugadorFicha","botonJugadorCarrera","botonJugadorEvolucion","botonJugadorEvolucionPro");
				var arrayID = Array("jugadorFicha", "jugadorCarrera", "jugadorEvolucion", "jugadorEvolucionPro");
				var label = "botonJugador"+opcion;
				var color = colores[1];
				break;
			case "entrenador":
				var arrayBoton = Array("botonEntrenadorFicha","botonEntrenadorCarrera","botonEntrenadorEvolucion","botonEntrenadorEvolucionPro");
				var arrayID = Array("entrenadorFicha", "entrenadorCarrera", "entrenadorEvolucion", "entrenadorEvolucionPro");
				var label = "botonEntrenador"+opcion;
				var color = colores[1];
				break;
			case "torneo":
				var arrayBoton = Array("botonTorneoFicha","botonTorneoInscripciones","botonTorneoNormativa","botonTorneoGestion");
				var arrayID = Array("torneoFicha", "torneoInscripciones", "torneoNormativa");
				var label = "botonTorneo"+opcion;
				var color = opcion == "Gestion" ? "" : "#a557d8";
				break;
		}

		// Asignar colores
		for (var i = 0; i < arrayBoton.length; i++) {
			document.getElementById(arrayBoton[i]).style.color = colores[3];
		}
		document.getElementById(label).style.color = color;

		// Cambio de pantallas
		for (var i = 0; i < arrayID.length; i++) {
			document.getElementById(arrayID[i]).classList.add("invisible");
		}
		var label2 = tipo+opcion;
		if (document.getElementById(label2)) { document.getElementById(label2).classList.remove("invisible") };

		switch(label2) {
			case "equipoPlantilla":
				mostrarPlantilla(equipo,temporada,idClub); // Mostrar datos de la plantilla
				break;
			case "equipoClub":
				ventanaDatos('club',equipo,temporada); // Cambiar a ventana Club
				break;
		}

		if (opcion == "Gestion") {
			abrirMiEvento();
		}
	};
	function salirVentanaDatos(tipo) {
		var label = "caja"+tipo;
		document.getElementById(label).classList.toggle("invisible");
		document.getElementById("menuEdicion").style = "pointer-events: all";
		document.getElementById("menuMiPlantilla").style = "pointer-events: all";
		document.getElementById("menuCompeticiones").style = "pointer-events: all";
	};
	function mostrarTablaEquipos(deporte,idClub) {
		var categorias = Array("","Primer Equipo","Segundo Equipo","Equipo Senior","Equipo Adaptado","Juvenil 17A","Juvenil 16A","Cadete 15A","Cadete 14A","Infantil 13A","Infantil 12A","Alevín 11A","Alevín 10A","Benjamín 9A","Benjamín 8A","Pre Benjamín");

		$.ajax({
			url: "php/equiposClub.php",
			type: 'POST',
			data: {
				idClub: idClub,
				deporte: deporte
			},
			success: function(res){
				var js = JSON.parse(res);
				
				codigo = "";
				codigo += "		<div class='h10 w100 centradoInlineXY lineaSuperior'>";
				codigo += "			<div class='h100 w15 centradoXY bordeDerecha'></div>";
				codigo += "			<div class='h100 w30 centradoXY'>Masculino</div>";
				codigo += "			<div class='h100 w30 centradoXY'>Femenino</div>";
				codigo += "			<div class='h100 w30 centradoXY'>Mixto</div>";
				codigo += "		</div>";

				codigo += "		<div id='cuadroListadoEquipos' class='w100 h90'>";
				for (var i = 1; i < categorias.length; i++) {
					codigo += "		<div class='h9 w100 centradoInlineXY'>";
					codigo += "			<div class='h100 w15 centradoXY bordeDerecha'>"+categorias[i]+"</div>";
					for (var j = 0; j < js.length; j++) {
						if (js[j].Categoria == i && js[j].Seccion == 1) {
							var id1 = js[j].ID_Equipo;
							var temp1 = js[j].Temporada;
						}
						if (js[j].Categoria == i && js[j].Seccion == 2) {
							var id2 = js[j].ID_Equipo;
							var temp2 = js[j].Temporada;
						}
						if (js[j].Categoria == i && js[j].Seccion == 3) {
							var id3 = js[j].ID_Equipo;
							var temp3 = js[j].Temporada;
						}
					}
					codigo += "			<div class='h100 w30 centradoXY' style='padding:0 1%'>"+buscarEquipo(i,"1",id1,temp1)+"</div>";
					codigo += "			<div class='h100 w30 centradoXY' style='padding:0 1%'>"+buscarEquipo(i,"2",id2,temp2)+"</div>";
					codigo += "			<div class='h100 w30 centradoXY' style='padding:0 1%'>"+buscarEquipo(i,"3",id3,temp3)+"</div>";
					codigo += "		</div>";
				}
				codigo += "		</div>";

				var label = "clubDeporte"+deporte;
				document.getElementById(label).innerHTML = codigo;

				// Personalizar colores
				const labelColor = "Color"+deporte;
				var colores = JSON.parse(sessionStorage.getItem(labelColor));
				
				var coleccionSuperior = document.getElementsByClassName("lineaSuperior");
				for (var i = 0; i < coleccionSuperior.length; i++) {	coleccionSuperior[i].style.borderBottom = "2px solid "+colores[0];	}
				
				var coleccionDerecha = document.getElementsByClassName("bordeDerecha");
				for (var i = 0; i < coleccionDerecha.length; i++) {	coleccionDerecha[i].style.borderRight = "2px solid "+colores[0];	}

				function buscarEquipo(categoria,seccion,idEquipo,temporada) {
					var contador = -1;
					for (var j = 0; j < js.length; j++) {
						if (js[j].Categoria == categoria && js[j].Seccion == seccion) {
							contador = j;
						}
					}
					if (contador > -1) {
						var codigo = js[contador].Nombre+"<img class='h70' src='img/Clubes/"+valorDeporte(deporte)+"/Equipos/"+js[contador].Escudo+"' alt='Escudo'><img class='h70' src='img/Menu/buscar.png' alt='Ver Equipo' onclick=\"ventanaDatos('equipo',"+idEquipo+","+temporada+")\">";
					}else{
						var codigo = "--";
					}
					return codigo;
				};
			}
		});
	};

	function mostrarPlantilla(idEquipo,temporada,idClub) {
		document.getElementById("loaderCajaFichas").classList.add("loader");
		$.ajax({
			url: "php/listadoPlantilla.php",
			type: 'POST',
			data: {
				idEquipo: idEquipo,
				temporada: temporada,
				idClub: idClub
			},
			success: function(res){
				document.getElementById("loaderCajaFichas").classList.remove("loader");
				var js= JSON.parse(res);
				if (js.Jugadores == "0") {
					sessionStorage.setItem("EquipoGestion","");
				}else{
					sessionStorage.setItem("EquipoGestion",JSON.stringify(js.Jugadores));
				}

				codigo = "";
				codigo += "		<div class='w25 h100 centradoXY flexWrap'>";
					const opcionesBoton = js.Club[0].IDClub == idClub ? "pulsable" : "botonGestionarNoOperativo";
					const clickBoton = js.Club[0].IDClub == idClub ? " onclick=\"gestionarPlantilla("+idEquipo+","+temporada+")\"" : "";
				codigo += "			<div id='botonGestionarPlantilla' class='w90 h10 centradoXY botonGestionarPlantilla "+opcionesBoton+"' "+clickBoton+">&nbsp;Gestionar Plantilla</div>";
				codigo += "			<div id='botonGuardarGestionarPlantilla' class='w90 h10 centradoXY botonGestionarPlantilla pulsable invisible' onclick=\"guardarGestionarPlantilla("+temporada+")\"><img class='h60 w20' src='img/Menu/guardar.png' alt='guardar'><label>Guardar Cambios</label></div>";
				const hoy = new Date();
				codigo += "			<div id='cajaNuevaTemporadaPlantilla' class='w60 h10 botonAltaSeleccion centradoXY flexWrap pulsable invisible' style='margin:5%; border-radius:50px'>";
				codigo += "				+ "+(hoy.getFullYear()+1)+"/"+(hoy.getFullYear()+2);
				codigo += "			</div>";
				codigo += "			<div id='cajaTemporadasPlantilla' class='w90 h70 spaceAroundXY flexWrap'>";
				const fechaFundacion = js.Club[0].Fundacion ? js.Club[0].Fundacion : 2000;

				const temporadaActual = hoy.getMonth > 6 ? hoy.getFullYear() : hoy.getFullYear()-1;
				const fechaFin = js.Club[0].Desaparicion !== "0" ? js.Club[0].Desaparicion : hoy.getFullYear();

				for (var j = fechaFin; j > fechaFundacion; j--) {
					var temporadaExiste = 0;
					for (var k = 0; k < js.Temporadas.length; k++) {
						if (j == js.Temporadas[k].Temporada) {
							temporadaExiste = 1;
						}
					}
					const temporadaMin = j.toString().slice(-2);
					const temporadaMinSig = (j+1).toString().slice(-2);

					if (temporadaExiste == 1 || j == temporadaActual) {
							codigo += "		<div id='botonTemporada"+j+"' class='w40 h10 centradoXY botonTemporada pulsable' onclick=\"mostrarPlantilla("+idEquipo+","+j+","+idClub+")\">"+temporadaMin+"/"+temporadaMinSig+"</div>";
						}else{
							codigo += "		<div id='botonTemporada"+j+"' class='w40 h10 centradoXY botonTemporada botonTemporadaNoOperativo'>"+temporadaMin+"/"+temporadaMinSig+"</div>";
						}
				}
				codigo += "			</div>";
				codigo += "		</div>";
				codigo += "		<div id='plantillaVisualizar' class='w70 h100 centradoXY flexWrap'>";
				codigo += "			<div id='cajaJugadoresPlantilla' class='w100 h100 spaceAroundXY flexWrap'>";
				if (js.Jugadores == "0") {
					codigo += "			No existen datos para esta temporada";
				}else{
					for (var i = 0; i < js.Jugadores.length; i++) {
						codigo += "		<div class='h35 centradoXY' style='margin: 1%'>";
						codigo += 			marcoJugador('P',js.Jugadores[i].ID_Jugador,js.Jugadores[i].Nombre,js.Jugadores[i].Apellido,js.Jugadores[i].Posicion,js.Jugadores[i].Dorsal,idEquipo,js.Jugadores[i].Escudo,js.Jugadores[i].Foto,js.Jugadores[i].Tipo);
						codigo += "		</div>";
					}
				}
				codigo += "			</div>";
				codigo += "		</div>";
				codigo += "		<div id='plantillaGestion' class='w75 h100 centradoXY flexWrap invisible' style='position:relative'>";
				codigo += "			<h2>Gestión de Altas y Bajas</h2>";
				codigo += "			<div id='cajaJugadoresPlantilla' class='h90 w100 spaceAroundXY flexWrap'>";
				codigo += "					<div class='w80 h20 centradoXY flexWrap'>";
				codigo += "						<div class='w60 h50 centradoXY botonAltaSeleccion pulsable' onclick=\"nuevoJugadorPlantilla("+temporada+","+idEquipo+")\" style='border-radius:50px'>+ Añadir nuevo miembro a la Plantilla</div>";
				codigo += "					</div>";
				if (js.Jugadores == "0") {
					codigo += "				<div class='w80 h20 centradoXY flexWrap'>";
					codigo += "					<div class='w60 h50 centradoXY botonAltaSeleccion pulsable' style='border-radius:50px'>+ Importar plantilla del año anterior</div>";
					codigo += "				</div>";
					codigo += "				<div id='jugadoresPlantilla0' class='w80 h40 jugadorEdicionPlantilla centradoXY flexWrap'>";
					codigo += "				</div>";
				}else{
					for (var i = 0; i < js.Jugadores.length; i++) {
						codigo += "			<div id='jugadoresPlantilla"+js.Jugadores[i].ID_Jugador+"' class='w80 h40 jugadorEdicionPlantilla centradoXY flexWrap'>";
						codigo += "				<div class='h90 centradoXY' style='margin: 1%'>";
						codigo +=					marcoJugador('P',js.Jugadores[i].ID_Jugador,js.Jugadores[i].Nombre,js.Jugadores[i].Apellido,js.Jugadores[i].Posicion,js.Jugadores[i].Dorsal,idEquipo,js.Jugadores[i].Escudo,js.Jugadores[i].Foto,js.Jugadores[i].Tipo);
						codigo += "				</div>";
						codigo += "				<div class='w70 h60 centradoXY flexWrap'>";
						codigo += "					<div id='botonEdicionContinua"+js.Jugadores[i].ID_Jugador+"' class='w40 h40 centradoXY botonGestionSeleccion pulsable' onclick=\"gestionAyB('Continua',"+js.Jugadores[i].ID_Jugador+")\">Continúa en Temporada "+temporada.toString().slice(-2)+"/"+(temporada+1).toString().slice(-2);
						codigo += "					</div>";
						codigo += "					<div id='botonEdicionTraspaso"+js.Jugadores[i].ID_Jugador+"' class='w40 h40 centradoXY botonGestionSeleccion pulsable' onclick=\"gestionAyB('Traspaso',"+js.Jugadores[i].ID_Jugador+")\">Traspaso/Cesión a...";
						codigo += "					</div>";
						codigo += "					<div id='botonEdicionFin"+js.Jugadores[i].ID_Jugador+"' class='w40 h40 centradoXY botonGestionSeleccion pulsable' onclick=\"gestionAyB('Fin',"+js.Jugadores[i].ID_Jugador+")\">Finalización<br>de contrato";
						codigo += "					</div>";
						codigo += "					<div id='botonEdicionRetirar"+js.Jugadores[i].ID_Jugador+"' class='w40 h40 centradoXY botonGestionSeleccion pulsable' onclick=\"gestionAyB('Retirar',"+js.Jugadores[i].ID_Jugador+")\">Retirar Jugador";
						codigo += "					</div>";
						codigo += "				</div>";
						codigo += "			</div>";
					}
				}
				codigo += "			</div>";
				codigo += "		</div>";
				document.getElementById("equipoPlantilla").innerHTML = codigo;
				
				// Marcar temporada seleccionada
				const botonesTemporadas = document.getElementsByClassName("botonTemporada");
				for (var l = 0; l < botonesTemporadas.length; l++) {
					document.getElementById(botonesTemporadas[l].id).classList.remove("botonTemporadaSeleccionado");
				}
				const temporadaSeleccionada = "botonTemporada"+temporada;
				if (document.getElementById(temporadaSeleccionada)) {
					document.getElementById(temporadaSeleccionada).classList.add("botonTemporadaSeleccionado");
				}

				// Poner colores del equipo


















			},
			setTimeout: 10000,
			error: function(){	mostrarPlantilla(idEquipo,temporada,idClub);	}
		});
	};
		function gestionarPlantilla(idEquipo,temporada) {
			document.getElementById("botonGestionarPlantilla").classList.add("invisible");
			document.getElementById("botonGuardarGestionarPlantilla").classList.remove("invisible");

			document.getElementById("cajaNuevaTemporadaPlantilla").classList.remove("invisible");

			document.getElementById("plantillaVisualizar").classList.add("invisible");
			document.getElementById("plantillaGestion").classList.remove("invisible");
		};
		function guardarGestionarPlantilla(temporada) {
			let arrayJugadores = JSON.parse(sessionStorage.getItem("EquipoGestion"));
			let arrayID = [];
			let arrayEstado = [];

			for (var i = 0; i < arrayJugadores.length; i++) {
				arrayID.push(arrayJugadores[i].ID_Jugador);
				console.log("estado ",i,": ",arrayJugadores[i]);
				estado = arrayJugadores[i].Estado ? arrayJugadores[i].Estado : "2";
				arrayEstado.push(estado);
			}

			console.log(arrayEstado);
			/*



Aquí hay que meter un array con los siguientes datos:
	· id de cada jugador que se ha añadido nuevo (para ponerlo esta temporada en este equipo y quitarlo del anterior)
	· situación de cada jugador (para mantenerlo en esta temporada o quitarlo de la plantilla)
		· Opciones: mantener esta temporada, no ha estado en esta temporada, baja a mitad de temporada

Al dar al botón de editar hay que dejar libres las temporadas anteriores para poder editarlas, pero hay poner un aviso de que sólo se guarda la temporada que esté señalada. Para guardar otra temporada hay que volver a entrar y señalar la temporada

Falta también lo de añadir la siguiente temporada (hacerlo igual que con el botón para las fichas). Hay que tener en cuenta que lo incluya correctamente en orden (si la temporada tiene su id, lo hace sin problemas)







			*/
			$.ajax({
				url: "php/guardarEdicionPlantilla.php",
				type: 'POST',
				data: {
					temporada: temporada
				},
				success: function(){
					document.getElementById("botonGuardarGestionarPlantilla").classList.add("invisible");
					document.getElementById("botonGestionarPlantilla").classList.remove("invisible");

					document.getElementById("cajaNuevaTemporadaPlantilla").classList.add("invisible");

					document.getElementById("plantillaGestion").classList.add("invisible");
					document.getElementById("plantillaVisualizar").classList.remove("invisible");

					// Borrar
					sessionStorage.removeItem("EquipoGestion");
				},
				error: function(){
					document.getElementById("botonGuardarGestionarPlantilla").classList.add("shake");
				}
			});
		};

		function gestionAyB(opcion,idJugador) {
			const array = ["Continua","Traspaso","Fin","Retirar"];
			for (var i = array.length - 1; i >= 0; i--) {
				const label = "botonEdicion"+array[i]+idJugador;
				document.getElementById(label).style.backgroundColor = "transparent";
			}
			const labelElegido = "botonEdicion"+opcion+idJugador;
			document.getElementById(labelElegido).style.backgroundColor = "var(--color-corporativo-rosa)";
		};

		function nuevoJugadorPlantilla(temporada,idEquipo) {
			let arrayJugadores = sessionStorage.getItem("EquipoGestion") ? JSON.parse(sessionStorage.getItem("EquipoGestion")) : "0";
			const orden = "N" + Math.floor(Math.random() * 100);
			const label = "jugadoresPlantilla"+orden;
			codigo = "";
			codigo += "			<div id='"+label+"' class='w80 h40 jugadorEdicionPlantilla centradoXY flexWrap'>";
			codigo += "				<div class='h90 w15 centradoXY' style='margin: 1%; border-radius:10px; border:1px solid var(--color-corporativo-rosa)'></div>";
			codigo += "				<div id='cuadroOpciones"+orden+"' class='w70 h60 centradoXY flexWrap'>";
			codigo += "					<div class='w40 h60 centradoXY botonGestionSeleccion pulsable' onclick=\"buscarNuevoJugador('"+orden+"',"+temporada+","+idEquipo+")\"><img class='h60' src='img/Menu/editar.png' alt='Nuevo'></div>";
			codigo += "					<div class='w40 h60 centradoXY botonGestionSeleccion pulsable' onclick=\"eliminarJugadorPlantilla('"+orden+"')\"><img class='h60' src='img/Menu/borrar.png' alt='Borrar'></div>";
			codigo += "				</div>";
			codigo += "			</div>";
			const clase = document.getElementsByClassName("jugadorEdicionPlantilla");
			document.getElementById(clase[0].id).insertAdjacentHTML("beforebegin",codigo);
		};
			function buscarNuevoJugador(idJugador,temporada,idEquipo) {
				$.ajax({
					url: "php/listaTotalJugadores.php",
					type: 'POST',
					success: function(res){
						var js= JSON.parse(res);
						codigo = "";
						codigo += "		<input id='jugadorSeleccionado' list='listadoJugadores' class='w90 h20' style='background:none;border:none;border-bottom: 1px solid var(--color-texto);'>";
						codigo += "		<datalist id='listadoJugadores'>";
						for (var i = 0; i < js.length; i++) {
							codigo += "		<option value='"+js[i].ID_Jugador+"'>"+js[i].NombreCompleto+" ("+js[i].Edad+")</option>";
						}
						codigo += "		</datalist>";
						codigo += "		<div id='botonSeleccionarNuevoJugador"+idJugador+"' class='w30 h40 centradoXY botonGestionSeleccion pulsable' onclick=\"seleccionarNuevoJugador('"+idJugador+"',"+idEquipo+","+temporada+")\"><img class='h60' src='img/Menu/ok.png' alt='Guardar'></div>";
						codigo += "		<div id='botonEliminarJugadorPlantilla"+idJugador+"' class='w30 h40 centradoXY botonGestionSeleccion pulsable' onclick=\"eliminarJugadorPlantilla('"+idJugador+"')\"><img class='h60' src='img/Menu/borrar.png' alt='Borrar'></div>";

						const label = "cuadroOpciones"+idJugador;
						document.getElementById(label).innerHTML= codigo;
						document.getElementById(label).classList.remove("h60");
						document.getElementById(label).classList.add("h80");
					},
					setTimeout: 10000,
					error: function(){	buscarNuevoJugador(idJugador,temporada,idEquipo);	}
				});
			};
				function seleccionarNuevoJugador(idJugadorAntiguo,idEquipo,temporada) {
					const idJugador = document.getElementById("jugadorSeleccionado").value;
					$.ajax({
						url: "php/buscarJugador.php",
						type: 'POST',
						data: {
							idJugador: idJugador
						},
						success: function(res){
							var js= JSON.parse(res);
							let arrayJugadores = [];

							// Incluir en storage
							if (sessionStorage.getItem("EquipoGestion") !== "") {
								arrayJugadores = JSON.parse(sessionStorage.getItem("EquipoGestion"));
							}
							let valorJugador = {
								'Escudo': js[0].Escudo,
								'Tipo': js[0].Tipo,
								'Nombre': js[0].Nombre,
								'Apellidos': js[0].Apellido,
								'ID_Jugador': idJugador,
								'Dorsal': js[0].Dorsal,
								'Posicion': js[0].Posicion,
								'Foto': js[0].Foto,
								'Estado': "1"
								/*
									Estado:
										1: Alta nueva
										2: Continúa
										3: Trapaso a
										4: Fin de contrato
										5: Retirar Jugador
									NOTA: Esto hay que verlo bien
								*/
							};
							arrayJugadores.unshift(valorJugador);
							sessionStorage.setItem("EquipoGestion", JSON.stringify(arrayJugadores));


							// Mostrar
							codigo = "";
							codigo += "			<div class='h90 centradoXY' style='margin: 1%'>";
							codigo +=				marcoJugador('P',idJugador,js[0].Nombre,js[0].Apellido,js[0].Posicion,js[0].Dorsal,js[0].ID_Equipo,js[0].Escudo,js[0].Foto,js[0].Tipo);
							codigo += "			</div>";
							codigo += "			<div id='cuadroOpciones"+idJugador+"' class='w70 h60 centradoXY flexWrap'>";
							codigo += "				<div class='w40 h60 centradoXY botonGestionSeleccion pulsable' onclick=\"buscarNuevoJugador('"+idJugador+"',"+temporada+","+idEquipo+")\"><img class='h60' src='img/Menu/editar.png' alt='Nuevo'></div>";
							codigo += "				<div class='w40 h60 centradoXY botonGestionSeleccion pulsable' onclick=\"eliminarJugadorPlantilla('"+idJugador+"')\"><img class='h60' src='img/Menu/borrar.png' alt='Borrar'></div>";
							codigo += "			</div>";
							let label = "jugadoresPlantilla"+idJugadorAntiguo;
							document.getElementById(label).innerHTML= codigo;
							document.getElementById(label).classList.remove("h80");
							document.getElementById(label).classList.add("h60");
							document.getElementById(label).id = "jugadoresPlantilla"+idJugador;

							/*
Al editar no elimina de storage al antiguo jugador











































							*/
						}
					});
				};
			function eliminarJugadorPlantilla(idJugador) {
				if (sessionStorage.getItem("EquipoGestion") !== "") {
					let arrayJugadores = JSON.parse(sessionStorage.getItem("EquipoGestion"));
					for (var i = 0; i < arrayJugadores.length; i++) {
						if(arrayJugadores[i].ID_Jugador == idJugador) {
							arrayJugadores.splice(i,1);
						}
					}
					sessionStorage.setItem("EquipoGestion", JSON.stringify(arrayJugadores));
				}

				const label = "jugadoresPlantilla"+idJugador;
				document.getElementById(label).remove();
			};