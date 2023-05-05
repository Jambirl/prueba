// Funciones para Ficha de Partido publi
	function prepararPantallaPreviaPartido(IdPartido) {
		document.getElementById("fichaLoader").classList.add("loader");
		let deporte = sessionStorage.getItem("Deporte");
		// Tomar los datos del partido por el ID
		$.ajax({
			url: "php/menuSuperiorPreviaPartido.php",
			type: 'POST',
			data: {
				deporte: deporte,
				IDPartido: IdPartido,
				idioma: localStorage.getItem("idioma")
			},
			success: function(res){
				var js= JSON.parse(res);

				// Tomar Idioma
				var textoIdioma = textoCompeticiones();

				localStorage.setItem("Escudo Local",js.EscudoLocal);
				localStorage.setItem("Escudo Visitante",js.EscudoVisitante);


				// Menu Superior
				var superior = "	<div id='cuadroDatosPartido' class='w25 h100 centradoXY flexWrap'>";
				superior += "			<div class='w100 h30 datosMarcador centradoXY flexWrap'>";
				switch (js.Estado) {
					case "Amistoso":
						var hoy = new Date().toLocaleDateString(localStorage.getItem("idioma"));
						superior += "		<label class='w100 h50' style='text-align: center; font-size:.8rem'>Partido Amistoso</label>";
						superior += "		<label class='w100 h50' style='text-align: center; font-size:.8rem'>"+hoy+"</label>";
						break;
					case "0":
					case "1":
					case "2":
					case "3":
						superior += "		<label class='w100 h50' style='text-align: center; font-size:.8rem'>"+js.Pabellon+"</label>";
						superior += "		<label class='w100 h50' style='text-align: center; font-size:.8rem'>"+js.Fecha+" "+js.Hora+"</label>";
						break;
				}
				superior += "			</div>";
				superior += "			<div class='w100 h70 cajaPartido centradoInlineXY'>";

				switch (js.Estado) {
					case "0":
					//case "3":
						superior += "		<div class='puntuacion w30 h100 spaceAroundXY'>";
						superior += "			<img class='h70' src='img/Clubes/"+textoDeportes(deporte)+"/Equipos/"+js.EscudoLocal+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
						superior += "			</div>";
						superior += "		<div class='guion w40 h100 centradoXY'>";
						switch (deporte) {
							case "Balonmano":
							case "1":
							case 1:
								if (IdPartido == 0) {
									var min = 100000000;
									var max = 1000000000;
									var aleatorio = Math.floor((Math.random() * (max - min + 1)) + min);
									IdPartidoAleatorio = 99000000000 + aleatorio;

									superior += "<button class='botonIrPartido' onclick=\"capturaPartidoBalonmano(0,"+IdPartidoAleatorio+","+js.IdLocal+","+js.IdVisitante+")\">Ir<br>Partido</button>";
								}else{
									superior += "<button class='botonIrPartido' onclick=\"capturaPartidoBalonmano(1,"+IdPartido+","+js.IdLocal+","+js.IdVisitante+")\">Ir<br>Partido</button>";}
								break;
							case "Baloncesto":
							case "2":
								superior += "	<button>No<br>Disponible</button>";
								break;
							case "Futsal":
							case "3":
								superior += "	<button>No<br>Disponible</button>";
								break;
						}
						superior += "		</div>";
						superior += "		<div class='puntuacion w30 h100 spaceAroundXY'>";
						superior += "			<img class='h70' src='img/Clubes/"+textoDeportes(deporte)+"/Equipos/"+js.EscudoVisitante+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
						superior += "		</div>";
						superior += "	</div>";
						superior += "</div>";
						break;
					case "1":
					case "2":
						superior += "		<div class='puntuacion w40 h100 spaceAroundXY'>";
						superior += "			<img class='h70' src='img/Clubes/"+textoDeportes(deporte)+"/Equipos/"+js.EscudoLocal+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
						superior += "			<input type='text' id='marcadorL' value='0' style='display: none;'>";
						superior += "				<label id='imprimirMarcadorL'>"+js.PuntuacionLocal+"</label>";
						superior += "			</div>";
						superior += "		<div class='guion w10 h100 centradoXY'>";
						superior += "			<img src='img/Captura/guion.png'>";
						superior += "		</div>";
						superior += "		<div class='puntuacion w40 h100 spaceAroundXY'>";
						superior += "			<input type='text' id='marcadorV' value='0' style='display: none;'>";
						superior += "				<label id='imprimirMarcadorV'>"+js.PuntuacionVisitante+"</label>";
						superior += "			<img class='h70' src='img/Clubes/"+textoDeportes(deporte)+"/Equipos/"+js.EscudoVisitante+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
						superior += "		</div>";
						superior += "		<button class='botonIrPartido' onclick=\"capturaPartidoBalonmano(1,"+IdPartido+","+js.IdLocal+","+js.IdVisitante+")\">Ir<br>Partido</button>";
						break;
					case "3":
						superior += "		<div class='puntuacion w40 h100 spaceAroundXY'>";
						superior += "			<img class='h70' src='img/Clubes/"+textoDeportes(deporte)+"/Equipos/"+js.EscudoLocal+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
						superior += "			<input type='text' id='marcadorL' value='0' style='display: none;'>";
						superior += "				<label id='imprimirMarcadorL'>"+js.PuntuacionLocal+"</label>";
						superior += "			</div>";
						superior += "		<div class='guion w10 h100 centradoXY'>";
						superior += "			<img src='img/Captura/guion.png'>";
						superior += "		</div>";
						superior += "		<div class='puntuacion w40 h100 spaceAroundXY'>";
						superior += "			<input type='text' id='marcadorV' value='0' style='display: none;'>";
						superior += "				<label id='imprimirMarcadorV'>"+js.PuntuacionVisitante+"</label>";
						superior += "			<img class='h70' src='img/Clubes/"+textoDeportes(deporte)+"/Equipos/"+js.EscudoVisitante+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
						superior += "		</div>";
						superior += "		<button class='botonIrPartido' onclick=\"capturaPartidoBalonmano(1,"+IdPartido+","+js.IdLocal+","+js.IdVisitante+")\">Ir<br>Partido</button>";
						break;
				}
				superior += "			</div>";
				superior += "		</div>";

				superior += "		<div id='cuadroMenu' class='h100 spaceBetweenXY'>";
				superior += 			versionBeta();
				superior += "			<img class='h15 botonVolverMenuSuperior' src='img/Menu/anterior.png' alt='Volver'>";
				superior += "			<label onclick=\"pasarPantalla('menuPartido','menuIndex')\">"+textoIdioma[0]+"</label>";
				superior += "			<label class='botonMenuSuperior'>"+textoIdioma[1]+"</label>";
				superior += "			<img class='botonMenuSuperior logoBigDT' src='img/Menu/Logo_BigDT.png' onclick=\"pasarPantalla('menuPartido','menuIndex')\">";
				superior += "		</div>";

				$("#cajaMenuSuperiormenuPartido").html(superior);

				// Menú Ficha
				document.getElementById("menuVs").classList.add("invisible");
				document.getElementById("menuEstGenerales").classList.add("invisible");
				document.getElementById("menuEstIndividuales").classList.add("invisible");
				document.getElementById("menuFichaPro").classList.add("invisible");
				document.getElementById("menuVsPro").classList.add("invisible");
				document.getElementById("menuEstGeneralesPro").classList.add("invisible");
				document.getElementById("menuEstIndividualesPro").classList.add("invisible");
				document.getElementById("menuFicha").classList.remove("invisible");
				if (IdPartido !== 0) {
					document.getElementById("menuPartidoInferior").classList.remove("invisible");
					mostrarEstadisticas(textoDeportes(deporte), IdPartido, js.Temporada, js.IdLocal, js.IdVisitante, "NormStats"); // Mostrar por defecto
				}else{
					document.getElementById("fichaLoader").classList.remove("loader");
					document.getElementById("menuPartidoInferior").classList.add("invisible");

					var medioL = "<h1>Partido Rápido Amistoso</h1><p class='w90 textoAmistoso'>En este modo podrás iniciar un partido amistoso de forma rápida sin tener que configurar nada.</p><p class='w90 textoAmistoso'>Utilizarás equipos genéricos, por lo que podrás visualizar todas las estadísticas, pero <span class='error'>los datos no se guardarán</span>.</p><p class='w90 textoAmistoso'>Si quieres jugar un amistoso y que se guarden todos los datos, deberás crear una competición desde el <strong class='colorDiv1'>menú Edición</strong>.</p>";

					var medioV = "<h1>Instrucciones</h1><p class='w90 textoAmistoso'>1. Haz clic en el botón <strong class='colorDiv1'>Ir partido</strong></p><p class='w90 textoAmistoso'>2. Seleccionar el número de jugadores que tiene cada equipo para formar las convocatorias.</p><p class='w90 textoAmistoso'>3. Iniciar el partido</p><p class='w90 textoAmistoso'>NOTA: Cuando vuelvas al menú principal se perderán los datos del partido amistoso y no podrás volver a consultar los datos recogidos.</p>";

					$("#fichaLocal").html(medioL);
					$("#fichaVisitante").html(medioV);
				}

				// Menú Inferior
				let codigoInferior = "";
				codigoInferior += "<div id='cuadroMenuInferiorPrevia' class='w100 h50'>";
				codigoInferior += "	<div id='cuadroEstNormales' class='h100 w100 cuadroPro spaceBetweenXY'>";
				codigoInferior += "		<div class='h100 w20'>";
				codigoInferior += "			<button id='botonFicha' class='h100 w100 botonSeleccionado' onclick=\"cambiarFicha('Ficha')\">Ficha</button></div>";
				codigoInferior += "		<div class='h100 w20'>";
				codigoInferior += "			<button id='botonVs' class='h100 w100' onclick=\"cambiarFicha('Vs')\">Versus</button></div>";
				codigoInferior += "		<div class='h100 w20'>";
				codigoInferior += "			<button id='botonEstGenerales' class='h100 w100' onclick=\"cambiarFicha('EstGenerales')\">Generales</button></div>";
				codigoInferior += "		<div class='h100 w20'>";
				codigoInferior += "			<button id='botonEstIndividuales' class='h100 w100' onclick=\"cambiarFicha('EstIndividuales')\">Individuales</button></div>";
				codigoInferior += "		<div class='h100 w20"+permisoEstado(deporte)+"'>";
				codigoInferior += "			<button id='botonProStats' class='h100 w100' onclick=\"cambiarFichaPro('ProStats')\"><span class='textoPro'>ProStats <img class='h50' src='img/Menu/switch.png' alt='Cambiar'></span></button>";
				codigoInferior += "		</div>";
				codigoInferior += "	</div>";
				codigoInferior += "	<div id='cuadroEstPro' class='h100 w100 cuadroNormal spaceBetweenXY desaparecerSubMenu'>";
				codigoInferior += "		<div class='h100 w20'>";
				codigoInferior += "			<button id='botonFichaPro' class='h100 w100 botonSeleccionado' onclick=\"cambiarFicha('FichaPro')\">Tendencias</button></div>";
				codigoInferior += "		<div class='h100 w20'>";
				codigoInferior += "			<button id='botonVsPro' class='h100 w100' onclick=\"cambiarFicha('VsPro')\">Versus</button></div>";
				codigoInferior += "		<div class='h100 w20'>";
				codigoInferior += "			<button id='botonEstGeneralesPro' class='h100 w100' onclick=\"cambiarFicha('EstGeneralesPro')\">Generales</button></div>";
				codigoInferior += "		<div class='h100 w20'>";
				codigoInferior += "			<button id='botonEstIndividualesPro' class='h100 w100' onclick=\"cambiarFicha('EstIndividualesPro')\">Individuales</button></div>";
				codigoInferior += "		<div class='h100 w20'>";
				codigoInferior += "			<button id='botonNormStats' class='h100 w100' onclick=\"cambiarFichaPro('NormStats')\"><span>NormStats <img class='h50' src='img/Menu/switch.png' alt='Cambiar'></span></button>";
				codigoInferior += "		</div>";
				codigoInferior += "	</div>";
				codigoInferior += "</div>";

				document.getElementById("menuPartidoInferior").innerHTML = codigoInferior;
			},
			timeout: 10000,
			error: function() {prepararPantallaPreviaPartido(deporte, IdPartido);}
		});
	};

	function cambiarFicha(seccion) {
		ocultarFichas();

		mostrarFicha(seccion);

		function ocultarFichas() {
			var categoria = Array("","Pro");
			var secciones = Array("Ficha","Vs","EstGenerales","EstIndividuales","ProStats");

			for (var i = 0; i < categoria.length; i++) {
				for (var j = 0; j < secciones.length; j++) {
					var idMenu = "#menu"+secciones[j]+categoria[i];
					var idBoton = "#boton"+secciones[j]+categoria[i];

					$(idMenu).addClass("invisible");
					$(idBoton).removeClass("botonSeleccionado");
				}
			}
		};

		function mostrarFicha(seccion) {
			var variable = "#menu"+seccion;
			var boton = "#boton"+seccion;
			$(variable).removeClass("invisible");
			$(boton).addClass("botonSeleccionado");
		};
	};

	function cambiarFichaPro(estado) {
		switch (estado) {
			case 'NormStats':
				document.getElementById("cuadroEstNormales").classList.remove("desaparecerSubMenu");
				document.getElementById("cuadroEstNormales").classList.add("aparecerSubMenu");
				document.getElementById("cuadroEstPro").classList.remove("aparecerSubMenu");
				document.getElementById("cuadroEstPro").classList.add("desaparecerSubMenu");
				break;
			case 'ProStats':
				document.getElementById("cuadroEstPro").classList.remove("desaparecerSubMenu");
				document.getElementById("cuadroEstPro").classList.add("aparecerSubMenu");
				document.getElementById("cuadroEstNormales").classList.remove("aparecerSubMenu");
				document.getElementById("cuadroEstNormales").classList.add("desaparecerSubMenu");
				break;
		}		
		mostrarEstadisticas(estado);
	};

	function mostrarEstadisticas(deporte, IdPartido, temporada, IdLocal, IdVisitante, estado) {
		var idioma = localStorage.getItem("idioma");
		document.getElementById("fichaLoader").classList.add("loader");
		switch (estado) {
			case 'NormStats':
				$.ajax({
			        url: "php/estadisticasPartido.php",
			        type: 'POST',
			        data: {
			        	deporte: deporte,
			        	IdPartido: IdPartido,
			        	temporada: temporada,
			        	IdLocal: IdLocal,
			        	IdVisitante: IdVisitante,
			        	temporada: temporada
			        },
			        success: function(res){
			        	var js= JSON.parse(res); 

						document.getElementById("fichaLoader").classList.remove("loader");

			        	// Variables globales
			        	var valoracionLocal = Array();
			        	var valoracionVisitante = Array();

			        	// Menú Ficha
			        	var id = Array("#fichaLocal", "#fichaVisitante");
			        	var tipoEquipo = Array(eval("js.Jugadores.Local"),eval("js.Jugadores.Visitante"));
			        	for (var j = 0; j < 2; j++) {
			        		var categoria = Array("filaLocal", "filaVisitante");
			        		var codigo = "	<div class='w100 h80 datosJugadores'>";
			        		if (tipoEquipo[j][0][0] !== "0") {
								for (var i = 0; i < tipoEquipo[j][0].length; i++) {
									codigo += "	<div class='w90 h10 spaceBetweenXY filaAlineacion "+categoria[j]+"'>";
									codigo += "		<div class='w15 h100 centradoXY'><label class='numeroAlineacion centradoXY'>"+tipoEquipo[j][0][i].Dorsal+"</label></div>";
									codigo += "		<div class='w70'><label>"+tipoEquipo[j][0][i].Nombre+" "+tipoEquipo[j][0][i].Apellido+"</label></div>";

									var valoracionMedia = obtenerValoracionMedia(tipoEquipo[j].Valoracion[i]);

									if (j == 0) {
										valoracionLocal.push(valoracionMedia);
									}else if (j == 1) {
										valoracionVisitante.push(valoracionMedia);
									}

									codigo += "		<div class='w20 h100 spaceAroundXY'>";
									codigo += "			<label class='pAlineacion centradoXY "+colorValoracion(valoracionMedia)+"'>"+valoracionMedia+"</label>";
									codigo += "			<label class='pAlineacion centradoXY'>"+textoPuestos(numeroDeporte(deporte),tipoEquipo[j][0][i].Posicion, '1')+"</label>";
									codigo += "		</div>";
									codigo += "	</div>";	
								}
			        		}else{
			        			codigo += "<div class='w100 h50 centradoXY'>No existen datos de la Plantilla</div>";
			        		}
			        		codigo += "		</div>";
			        		codigo += "		<div class='w90 h20 centradoXY flexWrap cuadroTecnico'>";
			        		if (js.Tecnicos[j][0] !== "0") {
								var tecnicos = textoTecnicos(idioma);
								for (var i = 0; i < js.Tecnicos[j].length; i++) {
										codigo += "			<label class='h25 w100'><strong class='w30'>"+tecnicos[js.Tecnicos[j][i].Puesto]+":</strong> <small class='w70'>"+js.Tecnicos[j][i].Nombre+"</small></label>";
								}
							codigo += "			</div>";
			        		}else{
			        			codigo += "No existen datos del Equipo Técnico";
			        		}
			        		codigo += "		</div>";

					        $(id[j]).html(codigo);
						
					    }

						// Menú Versus
						if (tipoEquipo[0][0][0] !== "0") {
							var mediaLocal = obtenerValoracionMedia(valoracionLocal);
						}else{
							var mediaLocal = "--";
						}
						if (tipoEquipo[1][0][0] !== "0") {
							var mediaVisitante = obtenerValoracionMedia(valoracionVisitante);
						}else{
							var mediaVisitante = "--";
						}

						var nombreImgL = js.Versus[0][1]+deporte+js.Partido[0].SeccionLocal;
						var nombreImgV = js.Versus[1][1]+deporte+js.Partido[0].SeccionVisitante;

						switch (deporte) {
							case "Balonmano":
								var escudoLocal = localStorage.getItem("Escudo Local");
								var escudoVisitante = localStorage.getItem("Escudo Visitante");
								break;
							case "Baloncesto":
								var escudoLocal = "828007b617f6b8dee2dbe092ddff06d5";
								var escudoVisitante = "137f50e8669a457c6f1ab6745646bf4e";
								break;
							case "Futsal":
								var escudoLocal = "577bf99e008a326db3547fd48c391ad0";
								var escudoVisitante = "3aee162c78e94bc448ca059a74b8b938";
								break;
						}

						var codigoVs = "	<div class='w20 h100 cuadroEquipos'>";
						////////////// incluir imagen de jugador o imagen por defecto
						codigoVs += "			<img class='w40 h40 miniEscudoIzq izq' src='img/Clubes/"+deporte+"/Equipos/"+escudoLocal+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
						if (deporte == "Futsal") {
							codigoVs += "		<img class='h40 imagenJugador izq' src='img/Clubes/"+deporte+"/Plantillas/Real Betis Futsal/2021/Eric Perez.png'>";
						}else{
							codigoVs += "		<img class='w50 h40 imagenJugador siluetaJugador izq' src='img/Clubes/"+deporte+"/Plantillas/"+nombreImgL+".png'>";
						}
						codigoVs += "			<label class='w100'>"+js.Versus[0][0]+"</label>";
						codigoVs += "		</div>";

						codigoVs += "		<div id='cuadroVs' class='w60 h100 centradoXY flexWrap'>";
						codigoVs += "			<img id='PPreviaVS' class='h15' src='x.png'>"; /////////// PUBLICIDAD
						codigoVs += "			<div class='w80 h20 cuadro centradoInlineXY'>";
						codigoVs += "				<div class='centradoXY datoValor datoValoracion'>"+mediaLocal+"</div>";
						codigoVs += "				<div class='w60 h25 cajaMenu'>Valoración del Equipo</div>";
						codigoVs += "				<div class='centradoXY datoValor datoValoracion'>"+mediaVisitante+"</div>";
						codigoVs += "			</div>";
						codigoVs += "			<div class='w80 h20 cuadro centradoInlineXY'>";
						codigoVs += "				<div class='centradoXY datoValor datoPuesto'>"+js.Versus[0][3]+"</div>";
						codigoVs += "				<div class='w60 h25 cajaMenu'>Posición</div>";
						codigoVs += "				<div class='centradoXY datoValor datoPuesto'>"+js.Versus[1][3]+"</div>";
						codigoVs += "			</div>";
						codigoVs += "			<div class='w80 h20 cuadro centradoInlineXY'>";

						codigoVs += "				<div class='spaceBetweenXY datoValor datoRacha'>";
						for (var i = 4; i < js.Versus[0].length; i++) {
							codigoVs += "				<div class='centradoXY "+colorPartido(js.Versus[0][i])+"'>"+js.Versus[0][i]+"</div>";
						}
						codigoVs += "				</div>";

						codigoVs += "				<div class='w60 h25 cajaMenu'>Últimos partidos</div>";

						codigoVs += "				<div class='spaceBetweenXY datoValor datoRacha'>";
						for (var i = 4; i < js.Versus[0].length; i++) {
							codigoVs += "				<div class='centradoXY "+colorPartido(js.Versus[1][i])+"'>"+js.Versus[1][i]+"</div>";
						}
						codigoVs += "				</div>";
						codigoVs += "			</div>";
						codigoVs += "			<img class='logoBigDT' src='img/Menu/Logo_BigDT.png'>";
						codigoVs += "		</div>";

						codigoVs += "		<div class='w20 h100 cuadroEquipos'>";
						/////////////// incluir imagen de jugador o imagen por defecto
						codigoVs += "			<img class='w40 h40 miniEscudoDer der' src='img/Clubes/"+deporte+"/Equipos/"+escudoVisitante+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
						if (deporte == "Futsal") {
							codigoVs += "		<img class='h40 imagenJugador der' src='img/Clubes/"+deporte+"/Plantillas/Barça/2021/Ferrao.png'>";
						}else{
							codigoVs += "		<img class='w50 h40 imagenJugador siluetaJugador der' src='img/Clubes/"+deporte+"/Plantillas/"+nombreImgV+".png'>";
						}
						codigoVs += "			<label class='w100'>"+js.Versus[1][0]+"</label>";
						codigoVs += "		</div>";

						$("#menuVs").html(codigoVs);

						publiPrevia("VS");

						function colorPartido(casilla){
							switch(casilla) {
								case "V":
									var color = "acierto";
									break;
								case "E":
									var color = "empate";
									break;
								case "D":
									var color = "error";
									break;
							}
							return color;
						};

						// Menú Generales
						var codigoGen = "	<div class='w100 h33 spaceAroundXY'>";
						codigoGen += "			<div class='w30 h90 cajaMenu'>";
						codigoGen += "				<label class='w100 h30 tituloLabel'>Goles a favor</label>";
						codigoGen += "				<div class='w100 h70 spaceAroundXY'>";
						var dato = js.Generales[0][0] === null ? "0" : Number(js.Generales[0][0]).toFixed(1);
						codigoGen += "					<div class='w50 h100 centradoXY textolocal bordeLocal'>"+dato+"</div>";
						var dato = js.Generales[1][0] === null ? "0" : Number(js.Generales[1][0]).toFixed(1);
						codigoGen += "					<div class='w50 h100 centradoXY textovisitante'>"+dato+"</div>";
						codigoGen += "				</div>";
						codigoGen += "			</div>";
						codigoGen += "			<div class='w30 h90 cajaMenu'>";
						codigoGen += "				<label class='w100 h30 tituloLabel'>Acierto en Pases</label>";
						codigoGen += "				<div class='w100 h70 spaceAroundXY'>";
						var dato = js.Generales[0][1] === null ? "0" : Number(js.Generales[0][1]).toFixed(1);
						codigoGen += "					<div class='w50 h100 centradoXY textolocal bordeLocal'>"+dato+"%</div>";
						var dato = js.Generales[1][1] === null ? "0" : Number(js.Generales[1][1]).toFixed(1);
						codigoGen += "					<div class='w50 h100 centradoXY textovisitante'>"+dato+"%</div>";
						codigoGen += "				</div>";
						codigoGen += "			</div>";
						codigoGen += "			<div class='w30 h90 cajaMenu'>";
						codigoGen += "				<label class='w100 h30 tituloLabel'>Goles en contra</label>";
						codigoGen += "				<div class='w100 h70 spaceAroundXY'>";
						var dato = js.Generales[0][2] === null ? "0" : Number(js.Generales[0][2]).toFixed(1);
						codigoGen += "					<div class='w50 h100 centradoXY textolocal bordeLocal'>"+dato+"</div>";
						var dato = js.Generales[1][2] === null ? "0" : Number(js.Generales[1][2]).toFixed(1);
						codigoGen += "					<div class='w50 h100 centradoXY textovisitante'>"+dato+"</div>";
						codigoGen += "				</div>";
						codigoGen += "			</div>";
						codigoGen += "		</div>";

						switch (deporte) {
							case "Baloncesto":
								var tiro = Array("1p:","2p:","3p:");
								break;
							case "Balonmano":
								var tiro = Array("<small>7m:</small>","<small>Int:</small>","<small>Ext:</small>");
								break;
							case "Futsal":
								var tiro = Array("<small>Tir:</small>","<small>Pen:</small>","<small>Dobl:</small>");
								break;
						}
						codigoGen += "		<div class='w100 h33 spaceAroundXY'>";
						codigoGen += "			<div class='w30 h90 cajaMenu'>";
						codigoGen += "				<label class='w100 h30 tituloLabel'>Tiros a favor</label>";
						codigoGen += "				<div class='w100 h70 spaceAroundXY'>";
						codigoGen += "					<div class='w50 h100 tiros bordeLocal'>";
						codigoGen += "						<div class='w100 h33 centradoInlineXY'>";
						codigoGen += "							<div class='w40'>"+tiro[0]+"</div>";
						var dato = js.Generales[0][3][0] === null ? 0 : Number(js.Generales[0][3][0]).toFixed(1);
						codigoGen += "							<div class='w60 textolocal'>"+dato+"%</div>";
						codigoGen += "						</div>";
						codigoGen += "						<div class='w100 h33 centradoInlineXY'>";
						codigoGen += "							<div class='w40'>"+tiro[1]+"</div>";
						var dato = js.Generales[0][3][1] === null ? 0 : Number(js.Generales[0][3][1]).toFixed(1);
						codigoGen += "							<div class='w60 textolocal'>"+dato+"%</div>";
						codigoGen += "						</div>";
						codigoGen += "						<div class='w100 h33 centradoInlineXY'>";
						codigoGen += "							<div class='w40'>"+tiro[2]+"</div>";
						var dato = js.Generales[0][3][2] === null ? 0 : Number(js.Generales[0][3][2]).toFixed(1);
						codigoGen += "							<div class='w60 textolocal'>"+dato+"%</div>";
						codigoGen += "						</div>";
						codigoGen += "					</div>";
						codigoGen += "					<div class='w50 h100 tiros'>";
						codigoGen += "						<div class='w100 h33 centradoInlineXY'>";
						codigoGen += "							<div class='w40'>"+tiro[0]+"</div>";
						var dato = js.Generales[1][3][0] === null ? 0 : Number(js.Generales[1][3][0]).toFixed(1);
						codigoGen += "							<div class='w60 textovisitante'>"+dato+"%</div>";
						codigoGen += "						</div>";
						codigoGen += "						<div class='w100 h33 centradoInlineXY'>";
						codigoGen += "							<div class='w40'>"+tiro[1]+"</div>";
						var dato = js.Generales[1][3][1] === null ? 0 : Number(js.Generales[1][3][1]).toFixed(1);
						codigoGen += "							<div class='w60 textovisitante'>"+dato+"%</div>";
						codigoGen += "						</div>";
						codigoGen += "						<div class='w100 h33 centradoInlineXY'>";
						codigoGen += "							<div class='w40'>"+tiro[2]+"</div>";
						var dato = js.Generales[1][3][2] === null ? 0 : Number(js.Generales[1][3][2]).toFixed(1);
						codigoGen += "							<div class='w60 textovisitante'>"+dato+"%</div>";
						codigoGen += "						</div>";
						codigoGen += "					</div>";
						codigoGen += "				</div>";
						codigoGen += "			</div>";

						codigoGen += "			<div class='w30 h90 centradoXY flexWrap'>";
						codigoGen += "				<img id='PPreviaGen' class='w100 h80' src='x.png'>"; ///////////// PUBLICIDAD
						codigoGen += "				<label id='labelGenerales' class='w100 h20'>Datos medios por Partido</label>";
						codigoGen += "			</div>";

						codigoGen += "			<div class='w30 h90 cajaMenu'>";
						codigoGen += "				<label class='w100 h30 tituloLabel'>Tiros en contra</label>";
						codigoGen += "				<div class='w100 h70 spaceAroundXY'>";
						codigoGen += "					<div class='w50 h100 tiros bordeLocal'>";
						codigoGen += "						<div class='w100 h33 centradoInlineXY'>";
						codigoGen += "							<div class='w40'>"+tiro[0]+"</div>";
						var dato = js.Generales[0][4][0] === null ? 0 : Number(js.Generales[0][4][0]).toFixed(1);
						codigoGen += "							<div class='w60 textolocal'>"+dato+"%</div>";
						codigoGen += "						</div>";
						codigoGen += "						<div class='w100 h33 centradoInlineXY'>";
						codigoGen += "							<div class='w40'>"+tiro[1]+"</div>";
						var dato = js.Generales[0][4][1] === null ? 0 : Number(js.Generales[0][4][1]).toFixed(1);
						codigoGen += "							<div class='w60 textolocal'>"+dato+"%</div>";
						codigoGen += "						</div>";
						codigoGen += "						<div class='w100 h33 centradoInlineXY'>";
						codigoGen += "							<div class='w40'>"+tiro[2]+"</div>";
						var dato = js.Generales[0][4][2] === null ? 0 : Number(js.Generales[0][4][2]).toFixed(1);
						codigoGen += "							<div class='w60 textolocal'>"+dato+"%</div>";
						codigoGen += "						</div>";
						codigoGen += "					</div>";
						codigoGen += "					<div class='w50 h100 tiros'>";
						codigoGen += "						<div class='w100 h33 centradoInlineXY'>";
						codigoGen += "							<div class='w40'>"+tiro[0]+"</div>";
						var dato = js.Generales[1][4][0] === null ? 0 : Number(js.Generales[1][4][0]).toFixed(1);
						codigoGen += "							<div class='w60 textovisitante'>"+dato+"%</div>";
						codigoGen += "						</div>";
						codigoGen += "						<div class='w100 h33 centradoInlineXY'>";
						codigoGen += "							<div class='w40'>"+tiro[1]+"</div>";
						var dato = js.Generales[1][4][1] === null ? 0 : Number(js.Generales[1][4][1]).toFixed(1);
						codigoGen += "							<div class='w60 textovisitante'>"+dato+"%</div>";
						codigoGen += "						</div>";
						codigoGen += "						<div class='w100 h33 centradoInlineXY'>";
						codigoGen += "							<div class='w40'>"+tiro[2]+"</div>";
						var dato = js.Generales[1][4][2] === null ? 0 : Number(js.Generales[1][4][2]).toFixed(1);
						codigoGen += "							<div class='w60 textovisitante'>"+dato+"%</div>";
						codigoGen += "						</div>";
						codigoGen += "					</div>";
						codigoGen += "				</div>";
						codigoGen += "			</div>";
						codigoGen += "		</div>";

						codigoGen += "		<div class='w100 h33 spaceAroundXY'>";
						codigoGen += "			<div class='w30 h90 cajaMenu'>";
						codigoGen += "				<label class='w100 h30 tituloLabel'>Asistencias</label>";
						codigoGen += "				<div class='w100 h70 spaceAroundXY'>";
						var dato = js.Generales[0][5] === null ? 0 : Number(js.Generales[0][5]).toFixed(1);
						codigoGen += "					<div class='w50 h100 centradoXY textolocal bordeLocal'>"+dato+"</div>";
						var dato = js.Generales[1][5] === null ? 0 : Number(js.Generales[1][5]).toFixed(1);
						codigoGen += "					<div class='w50 h100 centradoXY textovisitante'>"+dato+"</div>";
						codigoGen += "				</div>";
						codigoGen += "			</div>";
						codigoGen += "			<div class='w30 h90 cajaMenu'>";
						codigoGen += "				<label class='w100 h30 tituloLabel'>Robos</label>";
						codigoGen += "				<div class='w100 h70 spaceAroundXY'>";
						var dato = js.Generales[0][6] === null ? 0 : Number(js.Generales[0][6]).toFixed(1);
						codigoGen += "					<div class='w50 h100 centradoXY textolocal bordeLocal'>"+dato+"</div>";
						var dato = js.Generales[1][6] === null ? 0 : Number(js.Generales[1][6]).toFixed(1);
						codigoGen += "					<div class='w50 h100 centradoXY textovisitante'>"+dato+"</div>";
						codigoGen += "				</div>";
						codigoGen += "			</div>";
						codigoGen += "			<div class='w30 h90 cajaMenu'>";
						codigoGen += "				<label class='w100 h30 tituloLabel'>Faltas <small>Expulsiones</small></label>";
						codigoGen += "				<div class='w100 h70 spaceAroundXY'>";
						codigoGen += "					<div class='w50 h100 bordeLocal'>";
						var dato = js.Generales[0][7][0] === null ? 0 : Number(js.Generales[0][7][0]).toFixed(1);
						codigoGen += "						<div class='w100 h60 centradoXY textolocal'>"+dato+"</div>";
						var dato = js.Generales[0][7][1] === null ? 0 : Number(js.Generales[0][7][1]).toFixed(1);
						codigoGen += "						<div class='w100 h40 centradoXY expulsiones'>"+dato+"</div>";
						codigoGen += "					</div>";
						codigoGen += "					<div class='w50 h100 bordeVisitante'>";
						var dato = js.Generales[1][7][0] === null ? 0 : Number(js.Generales[1][7][0]).toFixed(1);
						codigoGen += "						<div class='w100 h60 centradoXY textovisitante'>"+dato+"</div>";
						var dato = js.Generales[1][7][1] === null ? 0 : Number(js.Generales[1][7][1]).toFixed(1);
						codigoGen += "						<div class='w100 h40 centradoXY expulsiones'>"+dato+"</div>";
						codigoGen += "					</div>";
						codigoGen += "				</div>";
						codigoGen += "			</div>";
						codigoGen += "		</div>";

						$("#menuEstGenerales").html(codigoGen);

						publiPrevia("Gen");

						// Menú Individuales
						var codigoNumeros = "";
						for (var l = 0; l < 2; l++) {
							if (l == 0) {
								var equipo = "L";
								var clase = "local";
								var idEquipo = IdLocal;
							}else if (l == 1) {
								var equipo = "V";
								var clase = "visitante";
								var idEquipo = IdVisitante;
							}
							var longitud = tipoEquipo[l][0].length;
							codigoNumeros += "		<div class='w50 h100'>";
							codigoNumeros += "			<div class='w100 h50 spaceAroundXY filas'>";

							if (tipoEquipo[l][0][0] !== "0") {
								if (longitud < 9) {
									for (var j = 0; j < Math.min(8,longitud); j++) {
										codigoNumeros += "		<div id='"+tipoEquipo[l][0][j].Dorsal+""+equipo+"' class='centradoXY pulsable jugadorIndividual "+clase+"' onclick=\"verFichaJugador("+tipoEquipo[l][0][j].ID_Jugador+",'"+tipoEquipo[l][0][j].Nombre+"','"+tipoEquipo[l][0][j].Apellido+"','"+tipoEquipo[l][0][j].Dorsal+"','"+tipoEquipo[l][0][j].Edad+"', '"+deporte+"', '"+tipoEquipo[l][0][j].Seccion+"', '"+equipo+"', "+tipoEquipo[l][0][j].ID_Equipo+", '"+tipoEquipo[l][0][j].Foto+"', '"+textoPuestos(numeroDeporte(deporte),tipoEquipo[l][0][j].Posicion)+"', "+tipoEquipo[l][0][j].Posicion+", "+tipoEquipo[l].Valoracion[j]+",'"+tipoEquipo[l][0][j].Altura+"','"+tipoEquipo[l][0][j].Peso+"', '"+tipoEquipo[l][0][j].Nacionalidad+"', '"+tipoEquipo[l][0][j].Nacionalidad2+"')\">"+tipoEquipo[l][0][j].Dorsal+"</div>";
									}
								}else{
									for (var j = 0; j < longitud/2; j++) {
										codigoNumeros += "		<div id='"+tipoEquipo[l][0][j].Dorsal+""+equipo+"' class='centradoXY pulsable jugadorIndividual "+clase+"' onclick=\"verFichaJugador("+tipoEquipo[l][0][j].ID_Jugador+",'"+tipoEquipo[l][0][j].Nombre+"','"+tipoEquipo[l][0][j].Apellido+"','"+tipoEquipo[l][0][j].Dorsal+"','"+tipoEquipo[l][0][j].Edad+"', '"+deporte+"', '"+tipoEquipo[l][0][j].Seccion+"', '"+equipo+"', "+tipoEquipo[l][0][j].ID_Equipo+", '"+tipoEquipo[l][0][j].Foto+"', '"+textoPuestos(numeroDeporte(deporte),tipoEquipo[l][0][j].Posicion)+"', "+tipoEquipo[l][0][j].Posicion+", "+tipoEquipo[l].Valoracion[j]+",'"+tipoEquipo[l][0][j].Altura+"','"+tipoEquipo[l][0][j].Peso+"', '"+tipoEquipo[l][0][j].Nacionalidad+"', '"+tipoEquipo[l][0][j].Nacionalidad2+"')\">"+tipoEquipo[l][0][j].Dorsal+"</div>";
									}
									codigoNumeros += "		</div>";
									codigoNumeros += "		<div class='w100 h50 spaceAroundXY filas'>";
									for (var k = Math.round(longitud/2); k < longitud; k++) {
										codigoNumeros += "		<div id='"+tipoEquipo[l][0][k].Dorsal+""+equipo+"' class='centradoXY pulsable jugadorIndividual "+clase+"' onclick=\"verFichaJugador("+tipoEquipo[l][0][k].ID_Jugador+",'"+tipoEquipo[l][0][k].Nombre+"','"+tipoEquipo[l][0][k].Apellido+"','"+tipoEquipo[l][0][k].Dorsal+"','"+tipoEquipo[l][0][k].Edad+"', '"+deporte+"', '"+tipoEquipo[l][0][k].Seccion+"', '"+equipo+"', "+tipoEquipo[l][0][j].ID_Equipo+", '"+tipoEquipo[l][0][k].Foto+"', '"+textoPuestos(numeroDeporte(deporte),tipoEquipo[l][0][k].Posicion)+"', "+tipoEquipo[l][0][k].Posicion+", "+tipoEquipo[l].Valoracion[k]+",'"+tipoEquipo[l][0][k].Altura+"','"+tipoEquipo[l][0][k].Peso+"', '"+tipoEquipo[l][0][k].Nacionalidad+"', '"+tipoEquipo[l][0][k].Nacionalidad2+"')\">"+tipoEquipo[l][0][k].Dorsal+"</div>";
									}
								}
							}
							codigoNumeros += "			</div>";
							codigoNumeros += "		</div>";
						}
						$("#cajaDorsales").html(codigoNumeros);
						publiPrevia("Ind");
			        },
			        timeout: 10000,
			        error: function() {mostrarEstadisticas(deporte, IdPartido, temporada, IdLocal, IdVisitante, estado);}
		      	});
				break;
			case 'ProStats':
				$.ajax({
			        url: "php/estadisticasPartidoPro.php",
			        type: 'POST',
			        data: {
			        	deporte: deporte
			        },
			        success: function(res){
			        	document.getElementById("fichaLoader").classList.remove("loader");
			        	var js= JSON.parse(res);

			        	var titulos = Array("Acumulados<br>5 partidos previos", "Histórico<br>Enfrentamientos Directos", "Acumulados<br>Actual Temporada");
			        	var menu = Array("#tituloMenuFichaPro", "#tituloMenuVsPro", "#tituloMenuEstGenPro");
			        	var datos = Array("#datosMenuFichaPro", "#datosMenuVsPro", "#datosMenuEstGenPro");
			        	var arrayVariables = Array(
			        		Array(js.Estadistica1, js.Estadistica2, js.Estadistica3, js.Estadistica4, js.Estadistica5, js.Estadistica6, js.Estadistica7, js.Estadistica8, js.Estadistica9),
			        		Array(js.Estadistica11, js.Estadistica12, js.Estadistica13, js.Estadistica14, js.Estadistica15, js.Estadistica16, js.Estadistica17, js.Estadistica18, js.Estadistica19),
			        		Array(js.Estadistica21, js.Estadistica22, js.Estadistica23, js.Estadistica24, js.Estadistica25, js.Estadistica26, js.Estadistica27, js.Estadistica28, js.Estadistica29)
			        		);

			        	var variable;
			        	for (var j = 0; j < titulos.length; j++) {
			        		// Título superior
				        	var codigoTitulo = "	<div class='w33 h100'>";
							codigoTitulo += "			<div class='w20 h100'><p>1P<br><small>"+js.Parciales[0]+"'-"+js.Parciales[1]+"'</small></p></div>";
							codigoTitulo += "			<div class='w20 h100'><p>2P<br><small>"+js.Parciales[2]+"'-"+js.Parciales[3]+"'</small></p></div>";
							codigoTitulo += "			<div class='w20 h100'><p>3P<br><small>"+js.Parciales[4]+"'-"+js.Parciales[5]+"'</small></p></div>";
							codigoTitulo += "			<div class='w20 h100'><p>4P<br><small>"+js.Parciales[6]+"'-"+js.Parciales[7]+"'</small></p></div>";
							codigoTitulo += "		</div>";
							codigoTitulo += "		<div class='w34 h100 subtitulo'><label>"+titulos[j]+"</label></div>";
							codigoTitulo += "		<div class='w33 h100'>";
							codigoTitulo += "			<div class='w20 h100'><p>1P<br><small>"+js.Parciales[0]+"'-"+js.Parciales[1]+"'</small></p></div>";
							codigoTitulo += "			<div class='w20 h100'><p>2P<br><small>"+js.Parciales[2]+"'-"+js.Parciales[3]+"'</small></p></div>";
							codigoTitulo += "			<div class='w20 h100'><p>3P<br><small>"+js.Parciales[4]+"'-"+js.Parciales[5]+"'</small></p></div>";
							codigoTitulo += "			<div class='w20 h100'><p>4P<br><small>"+js.Parciales[6]+"'-"+js.Parciales[7]+"'</small></p></div>";
							codigoTitulo += "		</div>";
				
				        	$(menu[j]).html(codigoTitulo);

				        	// Presentación de datos
				        	var codigoDatos = "";
				        	for (var i = 0; i < 9; i++) {
				        		variable = arrayVariables[j][i];
					        	codigoDatos += "	<div class='w100 h7'>";
								codigoDatos += "		<div class='w33 h100'>";
								codigoDatos += "			<div class='w20 h100 local borderIzq'>"+variable[1][0]+"</div>";
								codigoDatos += "			<div class='w20 h100 local'>"+variable[1][1]+"</div>";
								codigoDatos += "			<div class='w20 h100 local'>"+variable[1][2]+"</div>";
								codigoDatos += "			<div class='w20 h100 local borderDer'>"+variable[1][3]+"</div>";
								codigoDatos += "		</div>";
								codigoDatos += "		<div class='w34 cajaMenu'>";
								codigoDatos += "			<label>"+variable[0]+"</label>";
								codigoDatos += "		</div>";
								codigoDatos += "		<div class='w33 h100'>";
								codigoDatos += "			<div class='w20 h100 visitante borderIzq'>"+variable[2][0]+"</div>";
								codigoDatos += "			<div class='w20 h100 visitante'>"+variable[2][1]+"</div>";
								codigoDatos += "			<div class='w20 h100 visitante'>"+variable[2][2]+"</div>";
								codigoDatos += "			<div class='w20 h100 visitante borderDer'>"+variable[2][3]+"</div>";
								codigoDatos += "		</div>";
								codigoDatos += "	</div>";
				        	}
				        	$(datos[j]).html(codigoDatos);
				        	publiPrevia("PPreviaIndPro");
			        	}
			        },
			        timeout: 10000,
			        error: function() {mostrarEstadisticas(deporte, IdPartido, temporada, IdLocal, IdVisitante, estado);}
		      	});
				break;
		}
	};
	function verFichaJugador(idJugador,nombre, apellido, dorsal, edad, deporte, seccion, equipo, idEquipo, foto, posicion, posicionNum, valoracion1, valoracion2, valoracion3, valoracion4, valoracion5, valoracion6, valoracion7, valoracion8, altura, peso, nacionalidad, nacionalidad2) {
		$(".jugadorIndividual").removeClass("botonSeleccionado");
		var jugadorSeleccionado = "#"+dorsal+equipo;
		$(jugadorSeleccionado).addClass("botonSeleccionado");

		$("#figuraDefecto").addClass("invisible");

		//////////////////////// INCLUIR ESTA LÍNEA POR SI NO EXISTE IMAGEN DEL JUGADOR. SI LA HAY, SE MUESTRA ESA IMAGEN
		var codigoFigura = "<img id='siluetaJugador' class='w90 h90' src='img/Clubes/"+deporte+"/Plantillas/"+posicion+deporte+seccion+".png'>";
		
		var escudoLocal = localStorage.getItem("Escudo Local");
		var escudoVisitante = localStorage.getItem("Escudo Visitante");
		
		if (equipo === "L") {
			codigoFigura += "<img id='escudoLocal' src='img/Clubes/"+deporte+"/Equipos/"+escudoLocal+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
			$("#escudoLocal").removeClass("invisible");
			$("#escudoVisitante").addClass("invisible");
		}else if (equipo === "V") {
			codigoFigura += "<img id='escudoVisitante' src='img/Clubes/"+deporte+"/Equipos/"+escudoVisitante+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
			$("#escudoVisitante").removeClass("invisible");
			$("#escudoLocal").addClass("invisible");
		}
		$("#figuras").html(codigoFigura);

		var codigoNombre = "<label class='nombre w100'>"+nombre+"</label>";
		codigoNombre += "	<label class='apellido w100'>"+apellido+"</label>";
		codigoNombre += "	<img src='img/Menu/buscar.png' alt='verJugador' class='botonJugador h60' onclick=\"ventanaDatos('jugador',"+idJugador+")\">";
		$("#fichaNombre").html(codigoNombre);

		var codigoDorsal = "<label class='dorsal centradoXY'>"+dorsal+"</label>";
		codigoDorsal += "	<label class='posicion w100 centradoXY'>"+textoPuestos(numeroDeporte(deporte),posicionNum)+"</label>";
		$("#fichaDorsal").html(codigoDorsal);


		if (edad == "0") {		var labelEdad = "--";	}else{	var labelEdad = edad;	}
		if (altura == "0") {	var labelAltura = "--";	}else{	var labelAltura = altura;	}
		if (peso == "0") {		var labelPeso = "--";	}else{	var labelPeso = peso;	}

		var codigoDatos = "	<div class='datosEAP w35 centradoXY flexWrap'>";
		codigoDatos += "		<label class='centradoXY'>"+labelEdad+"</label>";
		codigoDatos += "		<label class='centradoXY'>Años</label>";
		codigoDatos += "	</div>";
		codigoDatos += "	<div class='w35 centradoXY flexWrap'>";
		codigoDatos += "		<div class='datosEAP w100 centradoInlineXY'>";
		codigoDatos += "			<label class='centradoXY'>"+labelAltura+"</label>";
		codigoDatos += "			<label class='centradoXY'>Cm</label>";
		codigoDatos += "		</div>";
		codigoDatos += "		<div class='datosEAP w100 centradoInlineXY'>";
		codigoDatos += "			<label class='centradoXY'>"+labelPeso+"</label>";
		codigoDatos += "			<label class='centradoXY'>Kg</label>";
		codigoDatos += "		</div>";
		codigoDatos += "	</div>";
		$("#fichaDatos").html(codigoDatos);

		if (nacionalidad2 != '') {
			var codigoNac = "	<img class='w90' src='img/Idiomas/"+nacionalidad+".png' alt='Nacionalidad' title='"+nacionalidad+"' onerror=\"this.src='img/Idiomas/idioma.png'\" style='clip-path: polygon(0 0, 0% 100%, 100% 0);'>";
			codigoNac += "	<img class='w90' src='img/Idiomas/"+nacionalidad2+".png' alt='Nacionalidad' title='"+nacionalidad2+"' onerror=\"this.src='img/Idiomas/idioma.png'\" style='clip-path: polygon(100% 0, 0% 100%, 100% 100%);position: absolute;'>";
		}else{
			var codigoNac = "	<img class='w90' src='img/Idiomas/"+nacionalidad+".png' alt='Nacionalidad' title='"+nacionalidad+"' onerror=\"this.src='img/Idiomas/idioma.png'\">";
		}
		$("#fichaNacionalidad").html(codigoNac);

		var codigoFoto = "	<img class='h100 w100' style='border-radius: 50%' src='img/Clubes/"+deporte+"/Plantillas/"+idEquipo+"/"+foto+"' alt='Foto Jugador' onerror=\"this.src='img/Clubes/usuario.png'\">";
		$("#cuadroFoto").html(codigoFoto);

		// Dibujar la grafica de datos
		dibujarGrafica("#graficaLabel","#graficaFicha", valoracion1, valoracion2, valoracion3, valoracion4, valoracion5, valoracion6, valoracion7, valoracion8);
	};
		function dibujarGrafica(label,ficha, valoracion1, valoracion2, valoracion3, valoracion4, valoracion5, valoracion6, valoracion7, valoracion8) {
			// Fórmula: Math.floor((Math.random()*(max-min+1))+min)

			var valorX1 = "50"; // Valor Fijo
			var valorY1 = String(50-(valoracion1*Math.abs(0-50))/100+Math.min(50,0)); // min 50 | max 0

			var valorX2 = String((valoracion2*Math.abs(85-50))/100+Math.min(50,85)); // min 50 | max 85
			var valorY2 = String(100 - parseInt(valorX2)); // Valor Fijo

			var valorX3 = String((valoracion3*Math.abs(100-50))/100+Math.min(50,100)); // min 50 | max 100
			var valorY3 = "50"; // Valor Fijo 

			var valorX4 = String((valoracion4*Math.abs(85-50))/100+Math.min(50,85)); // min 50 | max 85
			var valorY4 = String(valorX4); // Valor Fijo

			var valorX5 = "50" // Valor Fijo
			var valorY5 = String((valoracion5*Math.abs(100-50))/100+Math.min(50,100)); // min 50 | max 100

			var valorX6 = String(50-(valoracion6*Math.abs(15-50))/100); // min 50 | max 15
			var valorY6 = String(100 - parseInt(valorX6)); // Valor Fijo

			var valorX7 = String(50-(valoracion7*Math.abs(0-50))/100+Math.min(50,0)); // min 50 | max 0
			var valorY7 = "50" // Valor Fijo

			var valorX8 = String(50-(valoracion8*Math.abs(15-50))/100); // min 50 | max 15
			var valorY8 = String(valorX8); // Valor Fijo


			var codigoEstrella = "	<div id='graficaFondo'>";
			codigoEstrella += "			<div id='circulo1' class='h75 w75'></div>";
			codigoEstrella += "			<div id='circulo2' class='h50 w50'></div>";
			codigoEstrella += "			<div id='circulo3' class='h25 w25'></div>";
			codigoEstrella += "			<div id='linea1' class='w100'></div>";
			codigoEstrella += "			<div id='linea2' class='w100'></div>";
			codigoEstrella += "			<div id='linea3' class='w100'></div>";
			codigoEstrella += "			<div id='linea4' class='w100'></div>";
			codigoEstrella += "		</div>";

			codigoEstrella += "		<div id='graficaEstrella' class='h100 w100' style='-webkit-clip-path: polygon("+valorX1+"% "+valorY1+"%, "+valorX2+"% "+valorY2+"%, "+valorX3+"% "+valorY3+"%, "+valorX4+"% "+valorY4+"%, "+valorX5+"% "+valorY5+"%, "+valorX6+"% "+valorY6+"%, "+valorX7+"% "+valorY7+"%, "+valorX8+"% "+valorY8+"%); clip-path: polygon("+valorX1+"% "+valorY1+"%, "+valorX2+"% "+valorY2+"%, "+valorX3+"% "+valorY3+"%, "+valorX4+"% "+valorY4+"%, "+valorX5+"% "+valorY5+"%, "+valorX6+"% "+valorY6+"%, "+valorX7+"% "+valorY7+"%, "+valorX8+"% "+valorY8+"%);'></div>";


			var codigoLabel = "";
			codigoLabel += "			<div class='w100 h10 centradoInlineXY'>Valoración</div>";
			codigoLabel += "			<div class='w100 h20 spaceBetweenXY'>";
			codigoLabel += "				<div class='w35 alineacionDer'>Acierto en Pases</div>";
			codigoLabel += "				<div class='w35'>Acierto en Robos</div>";
			codigoLabel += "			</div>";
			codigoLabel += "			<div class='w100 h30 spaceBetweenXY'>";
			codigoLabel += "				<div class='w30 alineacionDer'>Acierto en Asistencias</div>";
			codigoLabel += "				<div class='w30'>Defensivo 2</div>";
			codigoLabel += "			</div>";
			codigoLabel += "			<div class='w100 h20 spaceBetweenXY'>";
			codigoLabel += "				<div class='w35 alineacionDer'>Participación Goles</div>";
			codigoLabel += "				<div class='w35'>Defensivo 3</div>";
			codigoLabel += "			</div>";
			codigoLabel += "			<div class='w100 h10 centradoInlineXY'>Minutos Participación</div>";
			
			$(label).html(codigoLabel);
			$(ficha).html(codigoEstrella);
		};