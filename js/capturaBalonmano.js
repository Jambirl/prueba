function capturaPartidoBalonmano(tipo,IdPartido, IdLocal, IdVisitante) { modoCaptura
	let deporte = sessionStorage.getItem("Deporte");
	const color1 = sessionStorage.getItem("Color1"); // Almacenar
	const colorSplit1 = color1.split(",");
	const color2 = sessionStorage.getItem("Color2"); // Almacenar
	const colorSplit2 = color2.split(",");
	const color3 = sessionStorage.getItem("Color3"); // Almacenar
	const colorSplit3 = color3.split(",");

	sessionStorage.clear(); // Limpiar todo sessionStorage
	sessionStorage.setItem("Color1",JSON.stringify(Array(colorSplit1[0].slice(2,-1),colorSplit1[1].slice(1,-1),colorSplit1[2].slice(1,-1),colorSplit1[3].slice(1,-2)))); // Devolver datos a sessionStorage
	sessionStorage.setItem("Color2",JSON.stringify(Array(colorSplit2[0].slice(2,-1),colorSplit2[1].slice(1,-1),colorSplit2[2].slice(1,-1),colorSplit2[3].slice(1,-2)))); // Devolver datos a sessionStorage
	sessionStorage.setItem("Color3",JSON.stringify(Array(colorSplit3[0].slice(2,-1),colorSplit3[1].slice(1,-1),colorSplit3[2].slice(1,-1),colorSplit3[3].slice(1,-2)))); // Devolver datos a sessionStorage
	sessionStorage.setItem("Deporte",deporte);
	sessionStorage.setItem("Tipo pase","Clasico"); //Poner este valor como pase predeterminado
	sessionStorage.setItem("Tipo parada","Despeje"); //Poner este valor como pase predeterminado

	bloquearPantalla(); // Preguntar si se puede mantener la pantalla sin apagarse

	mostrarPantallaCaptura(tipo,IdPartido, IdLocal, IdVisitante,localStorage.getItem("idioma"));

};
	function bloquearPantalla() {
		if ('wakeLock' in navigator) { // comprueba si el API de Wake Lock está disponible
		  const requestWakeLock = async () => {
		    try {
		      const wakeLock = await navigator.wakeLock.request('screen'); // solicita permiso para mantener la pantalla activa
		      console.log('Permiso concedido para mantener la pantalla activa');
		      wakeLock.addEventListener('release', () => {
		        console.log('El bloqueo de pantalla ha sido liberado');
		      }); // registra un listener para el evento de liberación de pantalla

		      // bloquea la pantalla si el usuario ha concedido permiso
		      wakeLock.acquire()
		      .then(() => {
		        console.log('La pantalla está bloqueada');
		      })
		      .catch((e) => {
		        console.error('Error al bloquear la pantalla:', e);
		      });
		    } catch (err) {
		      console.error('Error al solicitar el permiso de Wake Lock:', err);
		    }
		  }

		  // muestra un diálogo de confirmación para solicitar el permiso del usuario
		  if (confirm('¿Quieres mantener durante el partido la pantalla siempre activa? Esto evitará problemas en el reloj y en la sincronización de datos.')) {
		    requestWakeLock();
		  } else {
		    console.log('Ha dicho que no');
		  }

		} else {
		  console.log('El API de Wake Lock no está disponible en este navegador');
		}
	};

function mostrarPantallaCaptura(tipo,IdPartido, IdLocal, IdVisitante,idioma) {
	const direccion = tipo == 1 ? "php/datosInicialesPartido.php" : "php/datosInicialesAmistosoRapido.php";
	$.ajax({
        url: direccion,
        type: 'POST',
        data: {
        	IdPartido: IdPartido,
        	IdLocal: IdLocal,
        	IdVisitante: IdVisitante,
        	idioma: idioma
        },
        success: function(res){
        	var js= JSON.parse(res);

        	//Guardar json en sessionStorage
			sessionStorage.setItem('idPartido', IdPartido);
			sessionStorage.setItem('idLocal', IdLocal);
			sessionStorage.setItem('idVisitante', IdVisitante);
			sessionStorage.setItem('MarcadorL', js.Datos[0].GolesLocal);
			sessionStorage.setItem('MarcadorV', js.Datos[0].GolesVisitante);
			sessionStorage.setItem('jugadoresL', JSON.stringify(js.Local.Jugadores));
			sessionStorage.setItem('jugadoresV', JSON.stringify(js.Visitante.Jugadores));
			sessionStorage.setItem('tecnicosL', JSON.stringify(js.Local.Tecnicos));
			sessionStorage.setItem('tecnicosV', JSON.stringify(js.Visitante.Tecnicos));
			const guardarPeriodo = js.Datos[0].Estado == "2" ? sessionStorage.setItem("periodo", "2") : sessionStorage.setItem("periodo", "1");

        	// Incluir datos de jugadores convocados y titulares
			if (js.Local.Convocados !== "0" && js.Local.Jugadores) {
				let arrayConvocatoriaL = new Array;
				for (var i = 0; i < js.Local.Convocados.length; i++) {
					for (var j = 0; j < js.Local.Jugadores.length; j++) {
						if (js.Local.Jugadores[j].ID_Jugador == js.Local.Convocados[i].ID_Jugador) {	arrayConvocatoriaL.push(String(js.Local.Jugadores[j].Dorsal));	}
					}
				}
				sessionStorage.setItem('ConvocatoriaL', JSON.stringify(arrayConvocatoriaL));
				sessionStorage.setItem("totalConvocadosL",i);

				if (js.Local.Titulares !== 0 && js.Local.Jugadores) {
					let arrayTitularesL = new Array;
					let arraySuplentesL = new Array;
					for (var i = 0; i < js.Local.Jugadores.length; i++) {
						for (var j = 0; j < js.Local.Convocados.length; j++) {
							if (js.Local.Convocados[j].ID_Jugador == js.Local.Jugadores[i].ID_Jugador) { arraySuplentesL.push(js.Local.Jugadores[i].Dorsal); }
						}
						for (var j = 0; j < js.Local.Titulares.length; j++) {
							if (js.Local.Titulares[j].ID_Jugador == js.Local.Jugadores[i].ID_Jugador) {
								arrayTitularesL.push(js.Local.Jugadores[i].Dorsal);
								arraySuplentesL.splice(arraySuplentesL.indexOf(js.Local.Jugadores[i].Dorsal),1);
							}
						}
					}
					const arrayTitularesFiltradoL = [...new Set(arrayTitularesL)];
					const arraySuplentesFiltradoL = [...new Set(arraySuplentesL)];
					sessionStorage.setItem('TitularesL', JSON.stringify(arrayTitularesFiltradoL));
					sessionStorage.setItem('BanquilloL', JSON.stringify(arraySuplentesFiltradoL));
				}
			}

			if (js.Visitante.Convocados !== "0" && js.Visitante.Jugadores) {
				let arrayConvocatoriaV = new Array;
				for (var i = 0; i < js.Visitante.Convocados.length; i++) {
					for (var j = 0; j < js.Visitante.Jugadores.length; j++) {
						if (js.Visitante.Jugadores[j].ID_Jugador == js.Visitante.Convocados[i].ID_Jugador) {	arrayConvocatoriaV.push(String(js.Visitante.Jugadores[j].Dorsal));	}
					}
				}
				sessionStorage.setItem('ConvocatoriaV', JSON.stringify(arrayConvocatoriaV));
				sessionStorage.setItem("totalConvocadosV",i);
				
				if (js.Visitante.Titulares !== 0 && js.Visitante.Jugadores) {
					let arrayTitularesV = new Array;
					let arraySuplentesV = new Array;
					for (var i = 0; i < js.Visitante.Jugadores.length; i++) {
						for (var j = 0; j < js.Visitante.Convocados.length; j++) {
							if (js.Visitante.Convocados[j].ID_Jugador == js.Visitante.Jugadores[i].ID_Jugador) { arraySuplentesV.push(js.Visitante.Jugadores[i].Dorsal); }
						}
						for (var j = 0; j < js.Visitante.Titulares.length; j++) {
							if (js.Visitante.Titulares[j].ID_Jugador == js.Visitante.Jugadores[i].ID_Jugador) {
								arrayTitularesV.push(js.Visitante.Jugadores[i].Dorsal);
								arraySuplentesV.splice(arraySuplentesV.indexOf(js.Visitante.Jugadores[i].Dorsal),1);
							}
						}
					}
					const arrayTitularesFiltradoV = [...new Set(arrayTitularesV)];
					const arraySuplentesFiltradoV = [...new Set(arraySuplentesV)];
					sessionStorage.setItem('TitularesV', JSON.stringify(arrayTitularesFiltradoV));
					sessionStorage.setItem('BanquilloV', JSON.stringify(arraySuplentesFiltradoV));
				}
			}

			

			// Listado de acciones en el partido
/*




VA MEDIO BIEN, PERO TODAVÍA HAY QUE SEGUIR VIENDO CADA CASO PARA QUE APAREZCA CORRECTAMENTE





*/
			//registroDatos(accion, dorsal, equipo, dorsalAnt, equipoAnt, opcion1,opcion2,opcion3)
			//var arrayLectura = [minuto, segundo, accion, dorsal, equipo, dorsalAnt, equipoAnt, opcion1,opcion2,opcion3];
        	var arrayLecturasIniciales = Array();

			for (var i = 0; i < js.MaM.length; i++) {
				var arrayDatosIniciales = [];
				if (i == 0) {
					arrayDatosIniciales = ["00","00","Inicio1","","","","","","",""]; // Lectura inicio de partido
				}else {
					if (js.MaM[i].Periodo > js.MaM[i-1].Periodo) {
						arrayDatosIniciales = ["","","Mitad","","","","","","",""]; // Cambiar a 2º periodo
					}else{
						var dorsal1 = jugadorDorsal(tipoEquipo(js.MaM[i].ID_Equipo1),js.MaM[i].ID_Jugador1) ? jugadorDorsal(tipoEquipo(js.MaM[i].ID_Equipo1),js.MaM[i].ID_Jugador1) : "";
						var dorsal2 = jugadorDorsal(tipoEquipo(js.MaM[i].ID_Equipo2),js.MaM[i].ID_Jugador2) ? jugadorDorsal(tipoEquipo(js.MaM[i].ID_Equipo2),js.MaM[i].ID_Jugador2) : "";
						var equipo1 = tipoEquipo(js.MaM[i].ID_Equipo1) == 0 ? "" : tipoEquipo(js.MaM[i].ID_Equipo1);
						var equipo2 = tipoEquipo(js.MaM[i].ID_Equipo2) == 0 ? "" : tipoEquipo(js.MaM[i].ID_Equipo2);
						switch (js.MaM[i].Evento) {
							case "1":
								var textoTT = textoTipoTiro();
								evento = js.MaM[i].Acierto == "1" ? "Gol" : "Parada";
								arrayDatosIniciales = [js.MaM[i].Minuto,js.MaM[i].Segundo,evento,dorsal2,equipo2,dorsal1,equipo1,textoTT[js.MaM[i].Tipo]];
								break;
							case "2":
								var textoTP = textoTipoPase();
								switch(js.MaM[i].Acierto) {
									case "1":
										arrayDatosIniciales = [js.MaM[i].Minuto,js.MaM[i].Segundo,"Pase",dorsal2,equipo2,dorsal1,equipo1,textoTP[js.MaM[i].Tipo]];
										break;
									case "2":
										switch(js.MaM[i].Opcion){
											case "1":
												arrayDatosIniciales = [js.MaM[i].Minuto,js.MaM[i].Segundo,"No Forzado","","","","","","",""];
												break;
											case "2":
												arrayDatosIniciales = [js.MaM[i].Minuto,js.MaM[i].Segundo,"prueba","","","","","","",""];
												break;
										}
								}
							//arrayLecturasIniciales.push(Array(js.MaM[i].Minuto,js.MaM[i].Segundo,evento,jugadorDorsal(tipoEquipo(js.MaM[i].ID_Equipo1),js.MaM[i].ID_Jugador1),tipoEquipo(js.MaM[i].ID_Equipo1),js.MaM[i].ID_Jugador2,js.MaM[i].ID_Equipo2,js.MaM[i].ID_Jugador3,js.MaM[i].ID_Equipo3));
								break;
							case "3":
								var textoTP = textoTipoPase();
								arrayDatosIniciales = [js.MaM[i].Minuto,js.MaM[i].Segundo,"Asistencia",dorsal2,equipo2,dorsal1,equipo1,textoTP[js.MaM[i].Tipo]];
								break;
							case "4":
								evento = "Falta";
								arrayDatosIniciales = [js.MaM[i].Minuto,js.MaM[i].Segundo,"Falta","","","","","","",""];
								break;
							case "5":
								evento = "Pérdida";
								arrayDatosIniciales = [js.MaM[i].Minuto,js.MaM[i].Segundo,"Pérdida","","","","","","",""];
								break;
							case "6":
								evento = "Contraataque";
								arrayDatosIniciales = [js.MaM[i].Minuto,js.MaM[i].Segundo,"Contraataque","","","","","","",""];
								break;
							case "7":
								evento = "Pasivo";
								arrayDatosIniciales = [js.MaM[i].Minuto,js.MaM[i].Segundo,"Pasivo","","","","","","",""];
								break;
							case "8":
								evento = "Porteria";
								arrayDatosIniciales = [js.MaM[i].Minuto,js.MaM[i].Segundo,"Porteria","","","","","","",""];
								break;
							case "9":
								evento = "Táctica";
								arrayDatosIniciales = [js.MaM[i].Minuto,js.MaM[i].Segundo,"Táctica","","","","","","",""];
								break;
							case "10":
								evento = "Tiempo Muerto";
								arrayDatosIniciales = [js.MaM[i].Minuto,js.MaM[i].Segundo,"Tiempo Muerto","","","","","","",""];
								break;
							case "11": // No hacer nada
								break;
						}
					}
				}
        		// Meter registro en array
				//var arrayLectura = [minuto, segundo, accion, dorsal, equipo, dorsalAnt, equipoAnt, opcion1,opcion2,opcion3];
				//arrayLecturasIniciales.push(arrayLectura);


        		/*

en main.js está la función jugadorDorsal() para coger el número de dorsal según el id
el array de abajo hay que rellenarlo individualmente con cada dato, ya que hay que personalizarlo mejor
        		*/

/////////////// ¿Se mete aquí una llamada a la función registroDatos para que los guarde y los publique? Así se quita todo esto y, según cada dato del ajax, se guarda el dato. De esta forma los va a guardar bien
/////////////// Habría que poner una opción que sea para indicar que estos datos ya vienen de la BD y no los tiene que volver a guardar en BD, sólo en storage y publicarlos en pantalla
				//console.log(arrayDatosIniciales);
				arrayLecturasIniciales.push(arrayDatosIniciales);
        	}
        		function tipoEquipo(equipo) {
        			let tipoEquipo = sessionStorage.getItem('idLocal') == equipo ? "L" : "V";
        			return tipoEquipo;
        		};
        	//console.log(arrayLecturasIniciales);
        	sessionStorage.setItem('arrayRegistros', JSON.stringify(arrayLecturasIniciales));
		    
			///////////////////////////////////////////////////
			//Número mínimo y máximo de jugadores que se pueden convocar para el partido
			var arrayConvocatoria = Array("7","16"); //Estos datos los tiene que coger de la BD
			sessionStorage.setItem('convocatoria',JSON.stringify(arrayConvocatoria));
			///////////////////////////////////////////////////

			
			$("#bodyMenu").addClass("invisible");
			$("#bodyCaptura").removeClass("invisible");

			const labelEscudoCampeonato = js.Datos[0].Escudo_Campeonato ? js.Datos[0].Escudo_Campeonato : "x.png";

			var datos = "";
			datos += "	<div id='transicion1' class='cuadroTransicion'></div>";
			datos += "	<div id='transicion2' class='cuadroTransicion'>";
			datos += "		<img src='img/Publicidad/logoAdidas.png'>"; ////////////////////////////////// Publicidad
			datos += "	</div>";
			datos += "	<div class='recuadroBody centradoInlineXY'>";
			datos += "		<div id='lateralIzquierdo' class='w75 h100 centradoXY flexWrap'>";
			datos += "			<div id='marcadorSuperior' class='h15 w100 centradoInlineXY'>";
			datos += "				<div class='escudo w30 h100 centradoXY flexWrap'>";
			datos += "					<img class='h60' src='img/Clubes/Balonmano/Equipos/"+js.Datos[0].EscudoLocal+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
			datos += "					<label class='w100'>"+js.Datos[0].NombreLocal+"</label>";
			datos += "				</div>";
			datos += "				<div class='datosMarcador w40 h100'>";
			datos += "					<div id='cajaPabellon' class='h35 centradoXY flexWrap'>";
			datos += 							js.Datos[0].Nombre_Campeonato+"<br>";
			datos += "							Jornada "+js.Datos[0].Jornada;
			datos += "					</div>";
			datos += "					<div id='cajaMarcador' class='h65 centradoXY flexWrap'>";
			datos += "						<div id='cajaNumeros' class='h85 w100 spaceBetweenXY'>";
			datos += "							<div id='imprimirMarcadorCapturaL' class='w45 h100 centradoXY'><label>"+js.Datos[0].GolesLocal+"</label></div>";
			datos += "							<div id='guion' class='w10 h100 centradoXY'><img src='img/Captura/guion.png'></div>";
			datos += "							<div id='imprimirMarcadorCapturaV' class='w45 h100 centradoXY'><label>"+js.Datos[0].GolesVisitante+"</label></div>";
			datos += "						</div>";
			datos += "						<div class='cajaTM h15 w100 spaceBetweenXY'>";
			datos += "							<div class='w10'></div>";
			datos += "							<div id='tiempoMuertoLocal' class='spaceAroundXY w30 h100'></div>";
			datos += "							<div class='w30'></div>";
			datos += "							<div id='tiempoMuertoVisitante' class='spaceAroundXY w30 h100'></div>";
			datos += "							<div class='w10'></div>";
			datos += "						</div>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "				<div class='escudo w30 h100 centradoXY flexWrap'>";
			datos += "					<img class='h60' src='img/Clubes/Balonmano/Equipos/"+js.Datos[0].EscudoVisitante+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
			datos += "					<label class='w100'>"+js.Datos[0].NombreVisitante+"</label>";
			datos += "				</div>";
			datos += "			</div>";

			datos += "			<div id='marcadorCentral' class='h55 w100 centradoXY flexWrap'>";
			datos += "				<div id='pantallaEquipos' class='h100 w100 spaceAroundXY'>";
			// Cuadro local
		///////////////// Esta parte de local y visitante se debe resumir en un bucle for para reducir a la mitad el código
			if (sessionStorage.getItem("totalConvocadosL")) {
				var altura = "h100";
				var cambiar = "";
				var confirmar = "invisible";
			}else{
				var altura = "h0";
				var cambiar = "invisible";
				var confirmar = "";
			}
			datos += "					<div id='cuadroLocal' class='w49 h100'>";
			datos += "						<div id='localSecundario' class='w100 h100 centradoXY flexWrap invisible'>";
			datos += "							<div class='w90 h25 spaceAroundXY'>";
			datos += "								<div id='botonFormacionAtqL' class='h90 w40 centradoXY flexWrap'>";
			datos += "									<div class='w90 h60 centradoXY flexWrap'>";
			datos += "										<img id='botonFormacionL' class='h90 w90' src='' alt='Ver Formación'>";
			datos += "									</div>";
			datos += "									<div class='w90 h40 centradoXY flexWrap botonMando noFondo'>";
			datos += "										<img class='imgCambiarFormacion h60' src='img/Menu/anterior.png' alt='Img'>";
			datos += "										<label class='w100'>Formación Defensa</label>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<div id='botonFormacionDefL' class='h90 w40 centradoXY flexWrap'>";
			datos += "									<div class='w90 h60 centradoXY flexWrap'>";
			datos += "										<img id='botonFormacionL' class='h90 w90' src='' alt='Ver Formación'>";
			datos += "									</div>";
			datos += "									<div class='w90 h40 centradoXY flexWrap botonMando noFondo'>";
			datos += "										<img class='imgCambiarFormacion h60' src='img/Menu/anterior.png' alt='Img'>";
			datos += "										<label class='w100'>Formación Ataque</label>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<div class='w25 h90 centradoXY'>";
			datos += "									<div id='botonSancionPasivoL' class='botonMando centradoXY flexWrap error2 w90 h60' onclick=\"sancionPasivo('L')\" ontouchstart=\"inicioPulsacion('botonSancionPasivoL')\" ontouchend=\"finPulsacion('botonSancionPasivoL')\">";
			datos += "										<img class='h70' src='img/Captura/Pasivo.png'>";
			datos += "										<strong class='w100'>Pasivo</strong>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<div class='w25 h90 centradoXY'>";
			datos += "									<div id='botonPorteriaVaciaL' class='w90 h60 centradoXY flexWrap botonMando noFondo' onclick=\"porteriaVacia('L')\" ontouchstart=\"inicioPulsacion('botonPorteriaVaciaL')\" ontouchend=\"finPulsacion('botonPorteriaVaciaL')\">";
			datos += "										<img class='h70' src='img/Captura/porteria.png' alt='Vacía'>";
			datos += "										<strong>Vacía</strong>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "							</div>";
			/*datos += "							<div class='w80 h20 spaceAroundXY'>";
			datos += "								<div class='w30 h90 centradoXY'>";
			datos += "									<div id='botonRoboL' class='w90 h65 centradoXY flexWrap recuadroIcono acierto2' onclick=\"sessionStorage.setItem('equipoActivo','L'); sessionStorage.setItem('equipoAntiguo','V'); accionDefensa('Robo','Robo')\" ontouchstart=\"inicioPulsacion('botonPorteriaVaciaL')\" ontouchend=\"finPulsacion('botonPorteriaVaciaL')\">";
			datos += "										<img class='h65 w90' src='img/Captura/roboOk.png' alt='Robo'>";
			datos += "										<label>Robo</label>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<div class='w30 h90 centradoXY'>";
			datos += "									<div class='w90 h65 centradoXY flexWrap recuadroIcono error2' onclick=\"sessionStorage.setItem('equipoActivo','L'); accionPerdida('Falta ataque')\">";
			datos += "										<img class='h65 w90' src='img/Captura/roboError.png' alt='Pérdida'>";
			datos += "										<label>Pérdida</label>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<div class='w30 h90 centradoXY flexWrap'>";
			datos += "									<div class='w90 h65 centradoXY flexWrap botonMando error2'>";
			datos += "										<img class='h65 w90' src='img/Captura/dosMinutos4.png' alt='2Min'>";
			datos += "										<label class='w100'>Exclusión</label>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "							</div>";*/
			datos += "							<div class='w100 h75 centradoInlineXY'>";
			datos += "								<div class='h95 w30 spaceAroundXY flexWrap'>";
			datos += "									<div class='centradoXY'>Contraataque</div>";
			datos += "									<div class='w90 h90 spaceAroundXY flexWrap'>";
			datos += "										<div id='botonTiroGolL' class='w90 h15 centradoXY botonMando acierto2 flexWrap' onclick=\"accionBasica('1', '1', 'L')\" ontouchstart=\"inicioPulsacion('botonTiroGolL')\" ontouchend=\"finPulsacion('botonTiroGolL')\">";
			datos += "											<img src='img/Captura/acierto.png' alt='img'>";
			datos += "											<strong>Gol</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroParadaL' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('1', '2', 'L')\" ontouchstart=\"inicioPulsacion('botonTiroParadaL')\" ontouchend=\"finPulsacion('botonTiroParadaL')\">";
			datos += "											<img src='img/Captura/parada.png' alt='img'>";
			datos += "											<strong>Parada</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroContraFueraL' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('1', '3', 'L')\" ontouchstart=\"inicioPulsacion('botonTiroContraFueraL')\" ontouchend=\"finPulsacion('botonTiroContraFueraL')\">";
			datos += "											<img src='img/Captura/fueraBanda.png' alt='img'>";
			datos += "											<strong>Fuera</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroContraBloqueadoL' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('1', '4', 'L')\" ontouchstart=\"inicioPulsacion('botonTiroContraBloqueadoL')\" ontouchend=\"finPulsacion('botonTiroContraBloqueadoL')\">";
			datos += "											<img src='img/Captura/paradaMano.png' alt='img'>";
			datos += "											<strong>Bloqueado</strong>";
			datos += "										</div>";
			datos += "										<span class='w90 h1' style='border-bottom: 2px dotted var(--color-contraste);'></span>";
			datos += "										<div id='botonTiroRoboL' class='w90 h12 centradoXY flexWrap botonMando error2' onclick=\"accionBasica('1', '5', 'L')\" ontouchstart=\"inicioPulsacion('botonTiroRoboL')\" ontouchend=\"finPulsacion('botonTiroRoboL')\">";
			datos += "											<img src='img/Captura/roboOk.png' alt='Robo'>";
			datos += "											<strong>Robo</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroPerdidaL' class='w90 h12 centradoXY flexWrap botonMando error2' onclick=\"accionBasica('1', '6', 'L')\" ontouchstart=\"inicioPulsacion('botonTiroPerdidaL')\" ontouchend=\"finPulsacion('botonTiroPerdidaL')\">";
			datos += "											<img src='img/Captura/roboError.png' alt='Pérdida'>";
			datos += "											<strong>Pérdida</strong>";
			datos += "										</div>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<span class='w1 h95' style='border-left: 2px dotted var(--color-contraste);'></span>";
			datos += "								<div class='h95 w30 spaceAroundXY flexWrap'>";
			datos += "									<div class='centradoXY'>Tiro Campo</div>";
			datos += "									<div class='w90 h90 spaceAroundXY flexWrap'>";
			datos += "										<div id='botonTiroCampoGolL' class='w90 h15 centradoXY botonMando acierto2 flexWrap' onclick=\"accionBasica('2', '1', 'L')\" ontouchstart=\"inicioPulsacion('botonTiroCampoGolL')\" ontouchend=\"finPulsacion('botonTiroCampoGolL')\">";
			datos += "											<img src='img/Captura/acierto.png' alt='img'>";
			datos += "											<strong class='w100'>Gol</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroCampoParadaL' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('2', '2', 'L')\" ontouchstart=\"inicioPulsacion('botonTiroCampoParadaL')\" ontouchend=\"finPulsacion('botonTiroCampoParadaL')\">";
			datos += "											<img src='img/Captura/parada.png' alt='img'>";
			datos += "											<strong>Parada</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroCampoFueraL' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('2', '3', 'L')\" ontouchstart=\"inicioPulsacion('botonTiroCampoFueraL')\" ontouchend=\"finPulsacion('botonTiroCampoFueraL')\">";
			datos += "											<img src='img/Captura/fueraBanda.png' alt='img'>";
			datos += "											<strong class='w100'>Fuera</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroCampoBloqueadoL' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('2', '4', 'L')\" ontouchstart=\"inicioPulsacion('botonTiroCampoBloqueadoL')\" ontouchend=\"finPulsacion('botonTiroCampoBloqueadoL')\">";
			datos += "											<img src='img/Captura/paradaMano.png' alt='img'>";
			datos += "											<strong>Bloqueado</strong>";
			datos += "										</div>";
			datos += "										<span class='w90 h1' style='border-bottom: 2px dotted var(--color-contraste);'></span>";
			datos += "										<div id='botonTiroCampoRoboL' class='w90 h12 centradoXY flexWrap botonMando error2' onclick=\"accionBasica('2', '5', 'L')\"\" ontouchstart=\"inicioPulsacion('botonTiroCampoRoboL')\" ontouchend=\"finPulsacion('botonTiroCampoRoboL')\">";
			datos += "											<img src='img/Captura/roboOk.png' alt='Robo'>";
			datos += "											<strong>Robo</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroCampoPerdidaL' class='w90 h12 centradoXY flexWrap botonMando error2' onclick=\"accionBasica('2', '6', 'L')\" ontouchstart=\"inicioPulsacion('botonTiroCampoPerdidaL')\" ontouchend=\"finPulsacion('botonTiroCampoPerdidaL')\">";
			datos += "											<img src='img/Captura/roboError.png' alt='Pérdida'>";
			datos += "											<strong>Pérdida</strong>";
			datos += "										</div>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<span class='w1 h95' style='border-right: 2px dotted var(--color-contraste);'></span>";
			datos += "								<div class='h95 w30 spaceAroundXY flexWrap'>";
			datos += "									<div class='centradoXY'>7 metros</div>";
			datos += "									<div class='w90 h90 spaceAroundXY flexWrap'>";
			datos += "										<div id='tiroPenaltiGolL' class='w90 h15 centradoXY botonMando acierto2 flexWrap' onclick=\"accionBasica('3', '1', 'L')\" ontouchstart=\"inicioPulsacion('tiroPenaltiGolL')\" ontouchend=\"finPulsacion('tiroPenaltiGolL')\">";
			datos += "											<img src='img/Captura/acierto.png' alt='img'>";
			datos += "											<strong class='w100'>Gol</strong>";
			datos += "										</div>";
			datos += "										<div id='tiroPenaltiParadaL' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('3', '2', 'L')\" ontouchstart=\"inicioPulsacion('tiroPenaltiParadaL')\" ontouchend=\"finPulsacion('tiroPenaltiParadaL')\">";
			datos += "											<img src='img/Captura/parada.png' alt='img'>";
			datos += "											<strong>Parada</strong>";
			datos += "										</div>";
			datos += "										<div id='tiroPenaltiFueraL' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('3', '3', 'L')\" ontouchstart=\"inicioPulsacion('tiroPenaltiFueraL')\" ontouchend=\"finPulsacion('tiroPenaltiFueraL')\">";
			datos += "											<img src='img/Captura/fueraBanda.png' alt='img'>";
			datos += "											<strong class='w100'>Fuera</strong>";
			datos += "										</div>";
			datos += "										<span class='w90' style='height:16%; border-bottom: 2px dotted var(--color-contraste);'></span>";
			datos += "										<div id='exclusionL' class='w90 h15 centradoXY flexWrap botonMando error2' onclick=\"accionBasica('0', '7', 'L')\" ontouchstart=\"inicioPulsacion('exclusionL')\" ontouchend=\"finPulsacion('exclusionL')\">";
			datos += "											<img src='img/Captura/dosMinutos4.png' alt='2Min'>";
			datos += "											<strong class='textoSombra'>2 Min</strong>";
			datos += "										</div>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div id='localConvocatoria' class='w100 h100 centradoXY flexWrap "+confirmar+"'>";
			datos += "							<div class='w90 h10 spaceBetweenXY'>";
			datos += "								<div class='cartelConvocatoria'>";
			datos += "									Convocatoria";
			datos += "								</div>";
			datos += "								<div class='cartelNumConvocatoria centradoInlineXY'>";
			datos += "									<div id='totalConvocadosL'>0</div>/<div id='totalConvocatoriaL' style='color:var(--color-texto)'>"+arrayConvocatoria[1]+"</div>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "							<div class='cuadroPlantillaConvocatoria w90 h70 centradoXY flexWrap'>";
			datos += "								<div class='labelConvocatoriaJugadores w90 h15'>Jugadores</div>";
			if (js.Local.Jugadores !== "0" && js.Local.Jugadores !== null) {
				for (var i = 0; i < js.Local.Jugadores.length; i++) {
					datos += "							<div id='jugadorConvocadoL"+js.Local.Jugadores[i].Dorsal+"' class='w90 h10 centradoInlineXY jugadorNoConvocado pulsable' onclick=\"convocarJugador("+js.Local.Jugadores[i].Dorsal+",'"+textoPuestos(sessionStorage.getItem("Deporte"),js.Local.Jugadores[i].Posicion,1)+"','L')\">";
					datos += "								<div class='dorsalConvocatoria noOperativo local h80 centradoXY' style='filter:none'>"+js.Local.Jugadores[i].Dorsal+"</div>";
					datos += "								<div class='posicionConvocatoria noOperativo h80 centradoXY' style='filter:none'>"+textoPuestos(sessionStorage.getItem("Deporte"),js.Local.Jugadores[i].Posicion,1)+"</div>";
					datos += "								<div class='nombreConvocatoria noOperativo w70'>"+js.Local.Jugadores[i].NombreCompleto+"</div>";
					datos += "							</div>";
				}				
			}else{
				datos += " 								<div class='w90 h10 centradoInlineXY jugadorNoConvocado'>Sin datos de la plantilla</div>";
			}
			var arrayTecnicos = Array(eval("js.Local.Tecnicos.Entrenador"),eval("js.Local.Tecnicos.Ayudante"),eval("js.Local.Tecnicos.Medico"),eval("js.Local.Tecnicos.Oficial"),eval("js.Local.Tecnicos.Adicional"));
			if (arrayTecnicos) {
				datos += "								<div class='labelConvocatoriaJugadores w90 h15'>Cuerpo Técnico</div>";
				for (var k = 0; k < arrayTecnicos.length; k++) {
					if (k == 0 && arrayTecnicos[0] == "0") {
						datos += " 							<div class='w90 h10 centradoInlineXY jugadorNoConvocado'>Sin datos de Entrenador Principal</div>";
					}
					if (arrayTecnicos[k] !== "0") {
						for (var i = 0; i < arrayTecnicos[k].length; i++) {
							datos += "						<div id='tecnicoConvocadoL"+arrayTecnicos[k][i].ID_tecnico+"' class='w90 h10 pulsable centradoInlineXY jugadorNoConvocado' onclick=\"convocarTecnico("+arrayTecnicos[k][i].ID_tecnico+",'L')\">";
							datos += "							<div class='posicionConvocatoria noOperativo h80 w30 centradoXY'>"+tecnicoTexto(arrayTecnicos[k][i].Puesto)+"</div>";
							datos += "							<div class='w70 noOperativo'>"+arrayTecnicos[k][i].Nombre+"</div>";
							datos += "						</div>";
						}
					}
				}
				datos += "							</div>";				
			}
			datos += "							<div class='botonGuardarConvocatoria w50 h10 centradoXY' onclick=\"guardarConvocatoria('L')\">";
			datos += "								Guardar Convocatoria";
			datos += "							</div>";
			datos += "						</div>";

			datos += "						<div id='localPartido' class='h100 "+altura+" centradoXY flexWrap'>";
			datos += "							<div id='mandoCapturaL' class='w100 h33'>";
			datos += "								<div id='sancionesL' class='w100 h10'></div>"; // Incluir contadores de exclusiones
			datos += "								<div class='w100 h90 centradoInlineXY'>";
			datos += "									<div class='w50 h100 spaceAroundXY flexWrap'>";
			datos += "										<div id='botonSancionBanquilloL' class='botonMando centradoXY flexWrap error2 w40 h40' onclick=\"sancionBanquillo('L')\">";
			datos += "											<img class='h70' src='img/Captura/sancionBanquillo.png'>";
			datos += "											<label class='w100'>Sanción Banquillo</label>";
			datos += "										</div>";
			datos += "										<div id='botonSancionPasivoL' class='botonMando centradoXY flexWrap error2 w40 h40' onclick=\"sancionPasivo('L')\">";
			datos += "											<img class='h70' src='img/Captura/Pasivo.png'>";
			datos += "											<label class='w100'>Pasivo</label>";
			datos += "										</div>";
			datos += "										<div id='botonPorteriaVaciaMinL' class='botonMando centradoXY flexWrap noFondo w40 h40' onclick=\"porteriaVacia('L')\">";
			datos += "											<img class='h70' src='img/Captura/porteria.png'>";
			datos += "											<label class='w100'>Vacía</label>";
			datos += "										</div>";
			datos += "										<div id='botonAvisoPasivoL' class='botonMando centradoXY flexWrap noFondo w40 h40' onclick=\"avisoPasivo('L')\">";
			datos += "											<img class='h70' src='img/Captura/avisoPasivo.png'>";
			datos += "											<label class='w100'>Aviso Pasivo</label>";
			datos += "										</div>";
			datos += "									</div>";
			datos += "									<div id='botonGeneralCambiarFormacionL' class='w50 h100 spaceAroundXY flexWrap'>";
			datos += "										<div class='centradoXY flexWrap w90 h40'>";
			datos += "											<img id='botonFormacionL' class='h90 w90' src='' alt='Establecer Formación'>";
			datos += "										</div>";
			datos += "										<div id='botonCambiarFormacionL' class='botonMando centradoXY flexWrap noFondo w70 h40' onclick=\"cambiarFormacion('L')\">";
			datos += "											<img class='imgCambiarFormacion h70' src='img/Menu/anterior.png'>";
			datos += "											<label>Cambiar Formación</label>";
			datos += "										</div>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "							<div id='pantallacapturaL' class='cuadroCaptura w100 h65 centradoXY flexWrap'>";
			datos += "								<div id='botonCambioL' class='w100 h20 spaceAroundXY cuadroCambios "+cambiar+"' onclick=\"mostrarBanquillo('L')\">";
			datos += "									<img src='img/Menu/anterior.png' alt='cambio' class='h100'>";
			datos += "									Cambiar Jugador";
			datos += "									<img src='img/Menu/anterior.png' alt='cambio' class='h100'>";
			datos += "								</div>";
			datos += "								<div id='botonOKCambioL' class='w100 h20 spaceAroundXY cuadroCambios "+confirmar+"' onclick=\"ocultarBanquillo('L')\">";
			datos += "									<img src='img/Menu/siguiente.png' alt='cambio' class='h100'>";
			datos += "									Confirmar";
			datos += "									<img src='img/Menu/siguiente.png' alt='cambio' class='h100'>";
			datos += "								</div>";
			datos += "								<div id='botonOKSancionBanquilloL' class='w100 h20 spaceAroundXY cuadroCambios invisible' onclick=\"cerrarBanquillo('L')\">";
			datos += "									Seleccionar Jugador o Técnico Sancionado";
			datos += "								</div>";
			datos += "								<div id='banquilloL' class='w100 h45 spaceAroundXY flexWrap "+confirmar+"'>";
			
			datos += "								</div>";
			datos += "								<div id='banquilloSancionL' class='w100 h10 spaceAroundXY flexWrap invisible'>";
			
			datos += "								</div>";
			datos += "								<div id='titularL' class='w100 h80 centradoInlineXY flexWrap cuadroTitular "+confirmar+"'>";

			datos += "								</div>";
			datos += "								<div id='jugandoL' class='w100 h80 centradoInlineXY flexWrap cuadroTitular "+cambiar+"'>";

			datos += "								</div>";
			datos += "							</div>";
			datos += "						</div>";			
			datos += "					</div>";

			// Cuadro Visitante
			if (sessionStorage.getItem("totalConvocadosV")) {
				var altura = "h100";
				var cambiar = "";
				var confirmar = "invisible";
			}else{
				var altura = "h0";
				var cambiar = "invisible";
				var confirmar = "";
			}
			datos += "					<div id='cuadroVisitante' class='w49 h100'>";
			datos += "						<div id='visitanteSecundario' class='w100 h100 centradoXY flexWrap invisible'>";
			datos += "							<div class='w90 h25 spaceAroundXY'>";
			datos += "								<div id='botonFormacionAtqV' class='h90 w40 centradoXY flexWrap'>";
			datos += "									<div class='w90 h60 centradoXY flexWrap'>";
			datos += "										<img id='botonFormacionV' class='h90 w90' src='' alt='Ver Formación'>";
			datos += "									</div>";
			datos += "									<div class='w90 h40 centradoXY flexWrap botonMando noFondo'>";
			datos += "										<img class='imgCambiarFormacion h60' src='img/Menu/anterior.png' alt='Img'>";
			datos += "										<label class='w100'>Formación Defensa</label>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<div id='botonFormacionDefV' class='h90 w40 centradoXY flexWrap'>";
			datos += "									<div class='w90 h60 centradoXY flexWrap'>";
			datos += "										<img id='botonFormacionV' class='h90 w90' src='' alt='Ver Formación'>";
			datos += "									</div>";
			datos += "									<div class='w90 h40 centradoXY flexWrap botonMando noFondo'>";
			datos += "										<img class='imgCambiarFormacion h60' src='img/Menu/anterior.png' alt='Img'>";
			datos += "										<label class='w100'>Formación Ataque</label>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<div class='w25 h90 centradoXY'>";
			datos += "									<div id='botonSancionPasivoV' class='botonMando centradoXY flexWrap error2 w90 h60' onclick=\"sancionPasivo('V')\">";
			datos += "										<img class='h70' src='img/Captura/Pasivo.png'>";
			datos += "										<strong class='w100'>Pasivo</strong>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<div class='w25 h90 centradoXY'>";
			datos += "									<div id='botonPorteriaVaciaMinV' class='w90 h60 centradoXY flexWrap botonMando noFondo' onclick=\"porteriaVacia('V')\"'>";
			datos += "										<img class='h70' src='img/Captura/porteria.png' alt='Vacía'>";
			datos += "										<strong>Vacía</strong>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "							</div>";
			/*datos += "							<div class='w80 h20 spaceAroundXY'>";
			datos += "								<div class='w25 h90 centradoXY'>";
			datos += "									<div class='w90 h60 centradoXY flexWrap recuadroIcono acierto2' onclick=\"sessionStorage.setItem('equipoActivo','V'); sessionStorage.setItem('equipoAntiguo','L'); accionDefensa('Robo','Robo')\">";
			datos += "										<img class='h70' src='img/Captura/roboOk.png' alt='Robo'>";
			datos += "										<label>Robo</label>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<div class='w25 h90 centradoXY'>";
			datos += "									<div class='w90 h60 centradoXY flexWrap recuadroIcono error2' onclick=\"sessionStorage.setItem('equipoActivo','V'); accionPerdida('Falta ataque')\">";
			datos += "										<img class='h70' src='img/Captura/roboError.png' alt='Pérdida'>";
			datos += "										<label>Pérdida</label>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<div class='w40 h90 centradoXY flexWrap'>";
			datos += "									<div class='w100 h80 centradoXY noOperativo'>";
			datos += "										<div class='w60 h80 centradoXY flexWrap botonMando error2'>";
			datos += "											<img class='h70' src='img/Captura/dosMinutos4.png' alt='2Min'>";
			datos += "											<label class='w100'>Exclusión</label>";
			datos += "										</div>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "							</div>";*/
			datos += "							<div class='w100 h75 centradoInlineXY'>";
			datos += "								<div class='h95 w30 spaceAroundXY flexWrap'>";
			datos += "									<div class='centradoXY'>Contraataque</div>";
			datos += "									<div class='w90 h90 spaceAroundXY flexWrap'>";
			datos += "										<div id='botonTiroGolV' class='w90 h15 centradoXY botonMando acierto2 flexWrap' onclick=\"accionBasica('1', '1', 'V')\" ontouchstart=\"inicioPulsacion('botonTiroGolV')\" ontouchend=\"finPulsacion('botonTiroGolV')\">";
			datos += "											<img src='img/Captura/acierto.png' alt='img'>";
			datos += "											<strong class='textoSombra'>Gol</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroParadaV' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('1', '2', 'V')\" ontouchstart=\"inicioPulsacion('botonTiroParadaV')\" ontouchend=\"finPulsacion('botonTiroParadaV')\">";
			datos += "											<img src='img/Captura/parada.png' alt='img'>";
			datos += "											<strong class='textoSombra'>Parada</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroContraFueraV' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('1', '3', 'V')\" ontouchstart=\"inicioPulsacion('botonTiroContraFueraV')\" ontouchend=\"finPulsacion('botonTiroContraFueraV')\">";
			datos += "											<img src='img/Captura/fueraBanda.png' alt='img'>";
			datos += "											<strong class='textoSombra'>Fuera</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroContraBloqueadoV' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('1', '4', 'V')\" ontouchstart=\"inicioPulsacion('botonTiroContraBloqueadoV')\" ontouchend=\"finPulsacion('botonTiroContraBloqueadoV')\">";
			datos += "											<img src='img/Captura/paradaMano.png' alt='img'>";
			datos += "											<strong class='textoSombra'>Bloqueado</strong>";
			datos += "										</div>";
			datos += "										<span class='w90 h1' style='border-bottom: 2px dotted var(--color-contraste);'></span>";
			datos += "										<div id='botonTiroRoboV' class='w90 h12 centradoXY flexWrap botonMando error2' onclick=\"accionBasica('1', '5', 'V')\" ontouchstart=\"inicioPulsacion('botonTiroRoboV')\" ontouchend=\"finPulsacion('botonTiroRoboV')\">";
			datos += "											<img src='img/Captura/roboOk.png' alt='Robo'>";
			datos += "											<strong class='textoSombra'>Robo</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroPerdidaV' class='w90 h12 centradoXY flexWrap botonMando error2' onclick=\"accionBasica('1', '6', 'V')\" ontouchstart=\"inicioPulsacion('botonTiroPerdidaV')\" ontouchend=\"finPulsacion('botonTiroPerdidaV')\">";
			datos += "											<img src='img/Captura/roboError.png' alt='Pérdida'>";
			datos += "											<strong class='textoSombra'>Pérdida</strong>";
			datos += "										</div>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<span class='w1 h95' style='border-right: 2px dotted var(--color-contraste);'></span>";
			datos += "								<div class='h95 w30 spaceAroundXY flexWrap'>";
			datos += "									<div class='centradoXY'>Tiro Campo</div>";
			datos += "									<div class='w90 h90 spaceAroundXY flexWrap'>";
			datos += "										<div id='botonTiroCampoGolV' class='w90 h15 centradoXY botonMando acierto2 flexWrap' onclick=\"accionBasica('2', '1', 'V')\" ontouchstart=\"inicioPulsacion('botonTiroCampoGolV')\" ontouchend=\"finPulsacion('botonTiroCampoGolV')\">";
			datos += "											<img src='img/Captura/acierto.png' alt='img'>";
			datos += "											<strong class='textoSombra'>Gol</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroCampoParadaV' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('2', '2', 'V')\" ontouchstart=\"inicioPulsacion('botonTiroCampoParadaV')\" ontouchend=\"finPulsacion('botonTiroCampoParadaV')\">";
			datos += "											<img src='img/Captura/parada.png' alt='img'>";
			datos += "											<strong class='textoSombra'>Parada</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroCampoFueraV' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('2', '3', 'V')\" ontouchstart=\"inicioPulsacion('botonTiroCampoFueraV')\" ontouchend=\"finPulsacion('botonTiroCampoFueraV')\">";
			datos += "											<img src='img/Captura/fueraBanda.png' alt='img'>";
			datos += "											<strong class='textoSombra'>Fuera</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroCampoBloqueadoV' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('2', '4', 'V')\" ontouchstart=\"inicioPulsacion('botonTiroCampoBloqueadoV')\" ontouchend=\"finPulsacion('botonTiroCampoBloqueadoV')\">";
			datos += "											<img src='img/Captura/paradaMano.png' alt='img'>";
			datos += "											<strong class='textoSombra'>Bloqueado</strong>";
			datos += "										</div>";
			datos += "										<span class='w90 h1' style='border-bottom: 2px dotted var(--color-contraste);'></span>";
			datos += "										<div id='botonTiroCampoRoboV' class='w90 h12 centradoXY flexWrap botonMando error2' onclick=\"accionBasica('2', '5', 'V')\"\" ontouchstart=\"inicioPulsacion('botonTiroCampoRoboV')\" ontouchend=\"finPulsacion('botonTiroCampoRoboV')\">";
			datos += "											<img src='img/Captura/roboOk.png' alt='Robo'>";
			datos += "											<strong class='textoSombra'>Robo</strong>";
			datos += "										</div>";
			datos += "										<div id='botonTiroCampoPerdidaV' class='w90 h12 centradoXY flexWrap botonMando error2' onclick=\"accionBasica('2', '6', 'V')\" ontouchstart=\"inicioPulsacion('botonTiroCampoPerdidaV')\" ontouchend=\"finPulsacion('botonTiroCampoPerdidaV')\">";
			datos += "											<img src='img/Captura/roboError.png' alt='Pérdida'>";
			datos += "											<strong class='textoSombra'>Pérdida</strong>";
			datos += "										</div>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "								<span class='w1 h95' style='border-right: 2px dotted var(--color-contraste);'></span>";
			datos += "								<div class='h95 w30 spaceAroundXY flexWrap'>";
			datos += "									<div class='centradoXY'>7 metros</div>";
			datos += "									<div class='w90 h90 spaceAroundXY flexWrap'>";
			datos += "										<div id='tiroPenaltiGolV' class='w90 h15 centradoXY botonMando acierto2 flexWrap' onclick=\"accionBasica('3', '1', 'V')\" ontouchstart=\"inicioPulsacion('tiroPenaltiGolV')\" ontouchend=\"finPulsacion('tiroPenaltiGolV')\">";
			datos += "											<img src='img/Captura/acierto.png' alt='img'>";
			datos += "											<strong class='textoSombra'>Gol</strong>";
			datos += "										</div>";
			datos += "										<div id='tiroPenaltiParadaV' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('3', '2', 'V')\" ontouchstart=\"inicioPulsacion('tiroPenaltiParadaV')\" ontouchend=\"finPulsacion('tiroPenaltiParadaV')\">";
			datos += "											<img src='img/Captura/parada.png' alt='img'>";
			datos += "											<strong class='textoSombra'>Parada</strong>";
			datos += "										</div>";
			datos += "										<div id='tiroPenaltiFueraV' class='w90 h12 centradoXY botonMando error2 flexWrap' onclick=\"accionBasica('3', '3', 'V')\" ontouchstart=\"inicioPulsacion('tiroPenaltiFueraV')\" ontouchend=\"finPulsacion('tiroPenaltiFueraV')\">";
			datos += "											<img src='img/Captura/fueraBanda.png' alt='img'>";
			datos += "											<strong class='textoSombra'>Fuera</strong>";
			datos += "										</div>";
			datos += "										<span class='w90' style='height:16%; border-bottom: 2px dotted var(--color-contraste);'></span>";
			datos += "										<div id='exclusionV' class='w90 h15 centradoXY flexWrap botonMando error2' onclick=\"accionBasica('0', '7', 'V')\" ontouchstart=\"inicioPulsacion('exclusionV')\" ontouchend=\"finPulsacion('exclusionV')\">";
			datos += "											<img src='img/Captura/dosMinutos4.png' alt='2Min'>";
			datos += "											<strong class='textoSombra'>2 Min</strong>";
			datos += "										</div>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div id='visitanteConvocatoria' class='w100 h100 centradoXY flexWrap "+confirmar+"'>";
			datos += "							<div class='w90 h10 spaceBetweenXY'>";
			datos += "								<div class='cartelConvocatoria'>";
			datos += "									Convocatoria";
			datos += "								</div>";
			datos += "								<div class='cartelNumConvocatoria centradoInlineXY'>";
			datos += "									<div id='totalConvocadosV'>0</div>/<div id='totalConvocatoriaV' style='color:var(--color-texto)'>"+arrayConvocatoria[1]+"</div>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "							<div class='cuadroPlantillaConvocatoria w90 h70 centradoXY flexWrap'>";
			datos += "								<div class='labelConvocatoriaJugadores w90 h15'>Jugadores</div>";
			if (js.Visitante.Jugadores !== "0" && js.Visitante.Jugadores !== null) {
				for (var i = 0; i < js.Visitante.Jugadores.length; i++) {
					datos += "							<div id='jugadorConvocadoV"+js.Visitante.Jugadores[i].Dorsal+"' class='w90 h10 pulsable centradoInlineXY jugadorNoConvocado' onclick=\"convocarJugador("+js.Visitante.Jugadores[i].Dorsal+",'"+textoPuestos(sessionStorage.getItem("Deporte"),js.Visitante.Jugadores[i].Posicion,1)+"','V')\">";
					datos += "								<div class='dorsalConvocatoria noOperativo visitante h80 centradoXY' style='filter:none'>"+js.Visitante.Jugadores[i].Dorsal+"</div>";
					datos += "								<div class='posicionConvocatoria noOperativo h80 centradoXY' style='filter:none'>"+textoPuestos(sessionStorage.getItem("Deporte"),js.Visitante.Jugadores[i].Posicion,1)+"</div>";
					datos += "								<div class='nombreConvocatoria noOperativo w70'>"+js.Visitante.Jugadores[i].NombreCompleto+"</div>";
					datos += "							</div>";
				}
			}else{
				datos += " 								<div class='w90 h10 centradoInlineXY jugadorNoConvocado'>Sin datos de la plantilla</div>";
			}
			var arrayTecnicos = Array(eval("js.Visitante.Tecnicos.Entrenador"),eval("js.Visitante.Tecnicos.Ayudante"),eval("js.Visitante.Tecnicos.Medico"),eval("js.Visitante.Tecnicos.Oficial"),eval("js.Visitante.Tecnicos.Adicional"));
			if (arrayTecnicos) {
				datos += "								<div class='labelConvocatoriaJugadores w90 h15'>Cuerpo Técnico</div>";
				for (var k = 0; k < arrayTecnicos.length; k++) {
					if (k == 0 && arrayTecnicos[0] == "0") {
						datos += " 							<div class='w90 h10 centradoInlineXY jugadorNoConvocado'>Sin datos de Entrenador Principal</div>";
					}
					if (arrayTecnicos[k] !== "0") {
						for (var i = 0; i < arrayTecnicos[k].length; i++) {
							datos += "						<div id='tecnicoConvocadoL"+arrayTecnicos[k][i].ID_tecnico+"' class='w90 h10 pulsable centradoInlineXY jugadorNoConvocado' onclick=\"convocarTecnico("+arrayTecnicos[k][i].ID_tecnico+",'V')\">";
							datos += "							<div class='posicionConvocatoria noOperativo h80 w30 centradoXY'>"+tecnicoTexto(arrayTecnicos[k][i].Puesto)+"</div>";
							datos += "							<div class='w70 noOperativo'>"+arrayTecnicos[k][i].Nombre+"</div>";
							datos += "						</div>";
						}
					}
				}
				datos += "							</div>";
			}
			datos += "							<div class='botonGuardarConvocatoria w50 h10 centradoXY' onclick=\"guardarConvocatoria('V')\">";
			datos += "								Guardar Convocatoria";
			datos += "							</div>";
			datos += "						</div>";

			datos += "						<div id='visitantePartido' class='h100 "+altura+" centradoXY flexWrap'>";
			datos += "							<div id='mandoCapturaV' class='w100 h33'>";
			datos += "								<div id='sancionesV' class='w100 h10'></div>"; // Incluir contadores de exclusiones
			datos += "								<div class='w100 h90 centradoInlineXY'>";
			datos += "									<div class='w50 h100 spaceAroundXY flexWrap'>";
			datos += "										<div id='botonSancionBanquilloV' class='botonMando centradoXY flexWrap error2 w40 h40' onclick=\"sancionBanquillo('V')\">";
			datos += "											<img class='h70' src='img/Captura/sancionBanquillo.png'>";
			datos += "											<label class='w100'>Sanción Banquillo</label>";
			datos += "										</div>";
			datos += "										<div id='botonSancionPasivoV' class='botonMando centradoXY flexWrap error2 w40 h40' onclick=\"sancionPasivo('V')\">";
			datos += "											<img class='h70' src='img/Captura/Pasivo.png'>";
			datos += "											<label class='w100'>Pasivo</label>";
			datos += "										</div>";
			datos += "										<div id='botonPorteriaVaciaV' class='botonMando centradoXY flexWrap noFondo w40 h40' onclick=\"porteriaVacia('V')\">";
			datos += "											<img class='h70' src='img/Captura/porteria.png'>";
			datos += "											<label class='w100'>Vacía</label>";
			datos += "										</div>";
			datos += "										<div id='botonAvisoPasivoV' class='botonMando centradoXY flexWrap noFondo w40 h40' onclick=\"avisoPasivo('V')\">";
			datos += "											<img class='h70' src='img/Captura/avisoPasivo.png'>";
			datos += "											<label class='w100'>Aviso Pasivo</label>";
			datos += "										</div>";
			datos += "									</div>";
			datos += "									<div id='botonGeneralCambiarFormacionV' class='w50 h100 spaceAroundXY flexWrap'>";
			datos += "										<div class='centradoXY flexWrap w90 h40'>";
			datos += "											<img id='botonFormacionV' class='h90 w90' src='' alt='Establecer Formación'>";
			datos += "										</div>";
			datos += "										<div id='botonCambiarFormacionV' class='botonMando centradoXY flexWrap noFondo w70 h40' onclick=\"cambiarFormacion('V')\">";
			datos += "											<img class='imgCambiarFormacion h70' src='img/Menu/anterior.png'>";
			datos += "											<label>Cambiar Formación</label>";
			datos += "										</div>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "							<div id='pantallacapturaV' class='cuadroCaptura w100 h65 centradoXY flexWrap'>";
			datos += "								<div id='botonCambioV' class='w100 h20 spaceAroundXY cuadroCambios "+cambiar+"' onclick=\"mostrarBanquillo('V')\">";
			datos += "									<img src='img/Menu/anterior.png' alt='cambio' class='h100'>";
			datos += "									Cambiar Jugador";
			datos += "									<img src='img/Menu/anterior.png' alt='cambio' class='h100'>";
			datos += "								</div>";
			datos += "								<div id='botonOKCambioV' class='w100 h20 spaceAroundXY cuadroCambios "+confirmar+"' onclick=\"ocultarBanquillo('V')\">";
			datos += "									<img src='img/Menu/siguiente.png' alt='cambio' class='h100'>";
			datos += "									Confirmar";
			datos += "									<img src='img/Menu/siguiente.png' alt='cambio' class='h100'>";
			datos += "								</div>";
			datos += "								<div id='botonOKSancionBanquilloV' class='w100 h20 spaceAroundXY cuadroCambios invisible' onclick=\"cerrarBanquillo('V')\">";
			datos += "									Seleccionar Jugador o Técnico Sancionado";
			datos += "								</div>";
			datos += "								<div id='banquilloV' class='w100 h45 spaceAroundXY flexWrap "+confirmar+"'>";
			
			datos += "								</div>";
			datos += "								<div id='banquilloSancionV' class='w100 spaceAroundXY flexWrap invisible'>";
			
			datos += "								</div>";
			datos += "								<div id='titularV' class='w100 h80 centradoInlineXY flexWrap cuadroTitular "+confirmar+"'>";

			datos += "								</div>";
			datos += "								<div id='jugandoV' class='w100 h80 centradoInlineXY flexWrap cuadroTitular "+cambiar+"'>";

			datos += "								</div>";
			datos += "							</div>";
			datos += "						</div>";			
			datos += "					</div>";
			datos += "				</div>";

			// Pantallas eventos
			datos += "				<div id='pantallaTiro' style='display: none;'>";
			datos += "					<div id='tiroFuera' class='w100 h100 centradoInlineXY'>";
			datos += "						<div class='fueraBanda centradoXY' onclick=\"tiroFuera(12)\"><label>Fuera<br>de<br>Banda</label></div>";
			datos += "						<div class='fueraFondo w85 h100 centradoXY flexWrap'>";
			datos += "							<div id='fondoSuperior' class='centradoXY' onclick=\"tiroFuera(10)\"><label>Fuera de portería</label></div>";
			datos += "							<div id='fondoLateral' class='centradoInlineXY' onclick=\"tiroFuera(11)\">";
			datos += "								<label class='w25'>Fuera<br>de<br>Fondo<br>Lateral</label>";
			datos += "								<div class='w50'></div>";
			datos += "								<label class='w25'>Fuera<br>de<br>Fondo<br>Lateral</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div class='fueraBanda centradoXY' onclick=\"tiroFuera(12)\"><label>Fuera<br>de<br>Banda</label></div>";
			datos += "					</div>";
			datos += "					<div id='tiroDentro'>";
			datos += "						<div id='tiroPoste' onclick=\"botonPoste('palo')\" ondblclick=\"botonPoste('dentro')\" ontouchstart=\"inicioPulsacion('tiroPoste')\" ontouchend=\"finPulsacion('tiroPoste')\">";
			datos += "						</div>";
			datos += "						<div id='tiroPorteria' class='spaceBetweenXY flexWrap'>";
			datos += "							<div class='w33 h33 spaceAroundXY'>";
			datos += "								<div id='aciertoA1' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(1); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoA1')\" ontouchend=\"finPulsacion('aciertoA1')\"><img class='h50' src='img/Captura/acierto.png'><label>Gol</label></div>";
			datos += "								<div id='errorA1' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada(1);\" ontouchstart=\"inicioPulsacion('errorA1')\" ontouchend=\"finPulsacion('errorA1')\"><img class='h50' src='img/Captura/error.png'><label>Parada</label></div>";
			datos += "							</div>";
			datos += "							<div class='w33 h33 spaceAroundXY'>";
			datos += "								<div id='aciertoA2' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(2); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoA2')\" ontouchend=\"finPulsacion('aciertoA2')\"><img class='h50' src='img/Captura/acierto.png'><label>Gol</label></div>";
			datos += "								<div id='errorA2' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada(2);\" ontouchstart=\"inicioPulsacion('errorA2')\" ontouchend=\"finPulsacion('errorA2')\"><img class='h50' src='img/Captura/error.png'><label>Parada</label></div>";
			datos += "							</div>";
			datos += "							<div class='w33 h33 spaceAroundXY'>";
			datos += "								<div id='aciertoA3' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(3); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoA3')\" ontouchend=\"finPulsacion('aciertoA3')\"><img class='h50' src='img/Captura/acierto.png'><label>Gol</label></div>";
			datos += "								<div id='errorA3' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada(3);\" ontouchstart=\"inicioPulsacion('errorA3')\" ontouchend=\"finPulsacion('errorA3')\"><img class='h50' src='img/Captura/error.png'><label>Parada</label></div>";
			datos += "							</div>";
			datos += "							<div class='w33 h33 spaceAroundXY'>";
			datos += "								<div id='aciertoB1' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(4); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoB1')\" ontouchend=\"finPulsacion('aciertoB1')\"><img class='h50' src='img/Captura/acierto.png'><label>Gol</label></div>";
			datos += "								<div id='errorB1' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada(4);\" ontouchstart=\"inicioPulsacion('errorB1')\" ontouchend=\"finPulsacion('errorB1')\"><img class='h50' src='img/Captura/error.png'><label>Parada</label></div>";
			datos += "							</div>";
			datos += "							<div class='w33 h33 spaceAroundXY'>";
			datos += "								<div id='aciertoB2' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(5); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoB2')\" ontouchend=\"finPulsacion('aciertoB2')\"><img class='h50' src='img/Captura/acierto.png'><label>Gol</label></div>";
			datos += "								<div id='errorB2' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada(5);\" ontouchstart=\"inicioPulsacion('errorB2')\" ontouchend=\"finPulsacion('errorB2')\"><img class='h50' src='img/Captura/error.png'><label>Parada</label></div>";
			datos += "							</div>";
			datos += "							<div class='w33 h33 spaceAroundXY'>";
			datos += "								<div id='aciertoB3' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(6); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoB3')\" ontouchend=\"finPulsacion('aciertoB3')\"><img class='h50' src='img/Captura/acierto.png'><label>Gol</label></div>";
			datos += "								<div id='errorB3' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada(6);\" ontouchstart=\"inicioPulsacion('errorB3')\" ontouchend=\"finPulsacion('errorB3')\"><img class='h50' src='img/Captura/error.png'><label>Parada</label></div>";
			datos += "							</div>";
			datos += "							<div class='w33 h33 spaceAroundXY'>";
			datos += "								<div id='aciertoC1' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(7); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoC1')\" ontouchend=\"finPulsacion('aciertoC1')\"><img class='h50' src='img/Captura/acierto.png'><label>Gol</label></div>";
			datos += "								<div id='errorC1' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada(7);\" ontouchstart=\"inicioPulsacion('errorC1')\" ontouchend=\"finPulsacion('errorC1')\"><img class='h50' src='img/Captura/error.png'><label>Parada</label></div>";
			datos += "							</div>";
			datos += "							<div class='w33 h33 spaceAroundXY'>";
			datos += "								<div id='aciertoC2' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(8); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoC2')\" ontouchend=\"finPulsacion('aciertoC2')\"><img class='h50' src='img/Captura/acierto.png'><label>Gol</label></div>";
			datos += "								<div id='errorC2' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada(8);\" ontouchstart=\"inicioPulsacion('errorC2')\" ontouchend=\"finPulsacion('errorC2')\"><img class='h50' src='img/Captura/error.png'><label>Parada</label></div>";
			datos += "							</div>";
			datos += "							<div class='w33 h33 spaceAroundXY'>";
			datos += "								<div id='aciertoC3' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(9); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoC3')\" ontouchend=\"finPulsacion('aciertoC3')\"><img class='h50' src='img/Captura/acierto.png'><label>Gol</label></div>";
			datos += "								<div id='errorC3' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada(9);\" ontouchstart=\"inicioPulsacion('errorC3')\" ontouchend=\"finPulsacion('errorC3')\"><img class='h50' src='img/Captura/error.png'><label>Parada</label></div>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "				<div id='pantallaZonaTiro' class='w100 h40'>";
			datos += "					<div id='pantallaZonaTiro3D' class='w100'>";
			datos += "						<div id='pantallaZonaTiroArea' class='w70 h30'></div>";
			datos += "						<div id='pantallaZonaTiroLineaPenalti' class='w10 h3'></div>";
			datos += "						<div id='pantallaZonaTiroLinea9' class='w90 h55'></div>";
			datos += "						<div id='pantallaZonaTiroZona1' class='w30 h55' onclick=\"marcarZonaCampo(1)\"></div>";
			datos += "						<div id='pantallaZonaTiroZona2' class='w30 h55' onclick=\"marcarZonaCampo(2)\"></div>";
			datos += "						<div id='pantallaZonaTiroZona3' class='w30 h55' onclick=\"marcarZonaCampo(3)\"></div>";
			datos += "						<div id='pantallaZonaTiroZona4' class='w30 h55' onclick=\"marcarZonaCampo(4)\"></div>";
			datos += "						<div id='pantallaZonaTiroZona5' class='w30 h55' onclick=\"marcarZonaCampo(5)\"></div>";
			datos += "						<div id='pantallaZonaTiroZona6' class='w30 h75' onclick=\"marcarZonaCampo(6)\"></div>";
			datos += "						<div id='pantallaZonaTiroZona8' class='w40 h30' onclick=\"marcarZonaCampo(8)\"></div>";
			datos += "						<div id='pantallaZonaTiroZona9' class='w30 h75' onclick=\"marcarZonaCampo(9)\"></div>";
			datos += "						<div id='pantallaZonaTiroZona10' class='w100 h25' onclick=\"marcarZonaCampo(10)\"></div>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "			</div>";

			datos += "			<div id='marcadorInferior' class='h25 w100'>";
			datos += "				<div id='opcionesDefecto' class='centradoXY h100'>";
			datos += "					<img class='w50 h50' src='img/Publicidad/logoJambitec.png' alt='Publicidad' style='opacity: .8'>"; ////////////////// Publicidad
			datos += "					<label>Para iniciar jugada, selecciona al jugador que posee la pelota</label>";
			datos += "					<img class='w50 h50' src='img/Publicidad/logoJambitec.png' alt='Publicidad' style='opacity: .8'>"; ////////////////// Publicidad
			datos += "				</div>";
			datos += "				<div id='opcionesJugador' class='centradoInlineXY w100 h100' style='display: none;'>";
			datos += "					<div class='botonVolver w10 centradoXY' onclick=\"botonVolver()\"><img class='w80' src='img/Captura/deshacer.png'></div>";
			datos += "					<div id='botonesTiro' class='w30 h100 centradoXY flexWrap'>";
			datos += "						<div class='w100 h50 centradoXY'>";
			datos += "							<div class='recuadroIcono centradoXY flexWrap acierto2 h75 w80' id='botonTiro' onclick=\"abrirVentanaTiro()\" ontouchstart=\"inicioPulsacion('botonTiro')\" ontouchend=\"finPulsacion('botonTiro')\">";
			datos += "								<img class='logoIcono' src='img/Captura/tiro.png'>";
			datos += "								<label class='labelIcono'>Tiro</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div class='w100 h50 centradoInlineXY'>";
			datos += "								<div class='recuadroIcono centradoXY flexWrap w30 h75 error2' id='botonTarjetaAmarilla' onclick=\"accionPerdida('TAmarilla')\" ontouchstart=\"inicioPulsacion('botonTarjetaAmarilla')\" ontouchend=\"finPulsacion('botonTarjetaAmarilla')\">";
			datos += "									<img src='img/Captura/tarjetaAmarilla.png'>";
			datos += "									<br>";
			datos += "									<label>Tarjeta</label>";
			datos += "								</div>";
			datos += "								<div class='recuadroIcono centradoXY flexWrap w30 h75 error2' id='botonTarjetaRoja' onclick=\"accionPerdida('TRoja')\" ontouchstart=\"inicioPulsacion('botonTarjetaRoja')\" ontouchend=\"finPulsacion('botonTarjetaRoja')\">";
			datos += "									<img src='img/Captura/tarjetaRoja.png'>";
			datos += "									<br>";
			datos += "									<label>Tarjeta</label>";
			datos += "								</div>";
			datos += "								<div class='recuadroIcono centradoXY flexWrap w30 h75 error2' id='botonTarjetaAzul' onclick=\"accionPerdida('TAzul')\" ontouchstart=\"inicioPulsacion('botonTarjetaAzul')\" ontouchend=\"finPulsacion('botonTarjetaAzul')\">";
			datos += "									<img src='img/Captura/tarjetaAzul.png'>";
			datos += "									<br>";
			datos += "									<label>Tarjeta</label>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "					</div>";
			datos += "					<div id='botonesErrores' class='w60 h100 centradoXY flexWrap'>";
			datos += "							<div class='w100 h50 spaceAroundXY'>";
			datos += "								<div id='botonFaltaAtaque' class='recuadroIcono centradoXY flexWrap error2 w45 h75' onclick=\"accionPerdida('Falta ataque')\" ontouchstart=\"inicioPulsacion('botonFaltaAtaque')\" ontouchend=\"finPulsacion('botonFaltaAtaque')\">";
			datos += "									<img class='logoIcono' src='img/Captura/faltaAtaque.png'>";
			datos += "									<br>";
			datos += "									<label class='labelIcono'>Falta en ataque</label>";
			datos += "								</div>";
			datos += "								<div id='botonBalonFuera' class='recuadroIcono centradoXY flexWrap error2 w45 h75' onclick=\"accionPerdida('Balon fuera')\" ontouchstart=\"inicioPulsacion('botonBalonFuera')\" ontouchend=\"finPulsacion('botonBalonFuera')\">";
			datos += "									<img class='logoIcono' src='img/Captura/fueraBanda.png'>";
			datos += "									<br>";
			datos += "									<label class='labelIcono'>Balón fuera</label>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "							<div class='w100 h50 spaceAroundXY'>";
			datos += "								<div id='botonPasos' class='recuadroIcono centradoXY flexWrap error2 w30 h75' onclick=\"accionPerdida('Pasos')\" ontouchstart=\"inicioPulsacion('botonPasos')\" ontouchend=\"finPulsacion('botonPasos')\">";
			datos += "									<img class='logoIcono' src='img/Captura/pasos.png'>";
			datos += "									<br>";
			datos += "									<label class='labelIcono'>Pasos</label>";
			datos += "								</div>";
			datos += "								<div id='botonDobles' class='recuadroIcono centradoXY flexWrap error2 w30 h75' onclick=\"accionPerdida('Dobles')\" ontouchstart=\"inicioPulsacion('botonDobles')\" ontouchend=\"finPulsacion('botonDobles')\">";
			datos += "									<img class='logoIcono' src='img/Captura/dobles.png'>";
			datos += "									<br>";
			datos += "									<label class='labelIcono'>Dobles</label>";
			datos += "								</div>";
			datos += "								<div id='botonInvasion' class='recuadroIcono centradoXY flexWrap error2 w30 h75' onclick=\"accionPerdida('Invasion')\" ontouchstart=\"inicioPulsacion('botonInvasion')\" ontouchend=\"finPulsacion('botonInvasion')\">";
			datos += "									<img class='logoIcono' src='img/Captura/invasion.png'>";
			datos += "									<br>";
			datos += "									<label class='labelIcono'>Invasión área</label>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "				<div id='opcionesTiro' class='w100 h100 centradoInlineXY' style='display: none;'>";
			datos += "					<div class='botonVolver w10 centradoXY' onclick=\"botonVolver()\"><img class='w80' src='img/Captura/deshacer.png'></div>";
			datos += "					<div id='botonesTipoTiro' class='w40 h100 centradoXY flexWrap'>";
			datos += "						<div class='opcionesHD h33 w100 centradoXY'>";
			datos += "							<div class='acierto2 recuadroIcono centradoXY flexWrap w30 h90 seleccionado' id='botonTiroClasico' onclick=\"tipoTiro('Tiro','Clasico')\" ontouchstart=\"inicioPulsacion('botonTiroClasico')\" ontouchend=\"finPulsacion('botonTiroClasico')\">";
			datos += "								<img src='img/Captura/tiroClasico.png'><label>Clásico</label>";
			datos += "							</div>";
			datos += "							<div class='acierto2 recuadroIcono centradoXY flexWrap w30 h90' id='botonTiroCadera' onclick=\"tipoTiro('Tiro','Cadera')\" ontouchstart=\"inicioPulsacion('botonTiroCadera')\" ontouchend=\"finPulsacion('botonTiroCadera')\">";
			datos += "								<img src='img/Captura/tiroCadera.png'><label>De cadera</label>";
			datos += "							</div>";
			datos += "							<div class='acierto2 recuadroIcono centradoXY flexWrap w30 h90' id='botonTiroApoyo' onclick=\"tipoTiro('Tiro','Apoyo')\" ontouchstart=\"inicioPulsacion('botonTiroApoyo')\" ontouchend=\"finPulsacion('botonTiroApoyo')\">";
			datos += "								<img src='img/Captura/tiroApoyo.png'><label>En apoyo</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div class='opcionesHD h33 w100 centradoXY'>";
			datos += "							<div class='acierto2 recuadroIcono centradoXY flexWrap w30 h90' id='botonTiroRosca' onclick=\"tipoTiro('Tiro','Rosca')\" ontouchstart=\"inicioPulsacion('botonTiroRosca')\" ontouchend=\"finPulsacion('botonTiroRosca')\">";
			datos += "								<img src='img/Captura/tiroRosca.png'><label>De rosca</label>";
			datos += "							</div>";
			datos += "							<div class='acierto2 recuadroIcono centradoXY flexWrap w30 h90' id='botonTiroVaselina' onclick=\"tipoTiro('Tiro','Vaselina')\" ontouchstart=\"inicioPulsacion('botonTiroVaselina')\" ontouchend=\"finPulsacion('botonTiroVaselina')\">";
			datos += "								<img src='img/Captura/tiroVaselina.png'><label>Vaselina</label>";
			datos += "							</div>";
			datos += "							<div class='acierto2 recuadroIcono centradoXY flexWrap w50 h90' id='botonTiroFly' onclick=\"tipoTiro('Tiro','Fly')\" ontouchstart=\"inicioPulsacion('botonTiroFly')\" ontouchend=\"finPulsacion('botonTiroFly')\">";
			datos += "								<img src='img/Captura/tiroFly.png'><label>Fly</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div class='h33 w100 centradoXY'>";
			datos += "							<div class='acierto2 recuadroIcono centradoXY flexWrap w45 h90' id='botonTiroDesvio' onclick=\"tipoTiro('Tiro','Desvio')\" ontouchstart=\"inicioPulsacion('botonTiroDesvio')\" ontouchend=\"finPulsacion('botonTiroDesvio')\">";
			datos += "								<img src='img/Captura/blocaje.png'><label>Tiro Desviado</label>";
			datos += "							</div>";
			datos += "							<div class='error2 recuadroIcono centradoXY flexWrap w45 h90' id='botonTiroBloqueado' onclick=\"tipoTiro('Tiro','Bloqueado')\" ontouchstart=\"inicioPulsacion('botonTiroBloqueado')\" ontouchend=\"finPulsacion('botonTiroBloqueado')\">";
			datos += "								<img src='img/Captura/blocaje.png'><label>Tiro Bloqueado</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "					</div>";
			datos += "					<div id='botonesTipoParada' class='w50 h100 centradoXY flexWrap'>";
			datos += "						<div class='h50 w100 centradoInlineXY'>";
			datos += "							<div class='error2 recuadroIcono centradoXY flexWrap w45 h90 seleccionado' id='botonPorteroDespeje' onclick=\"tipoParada('Parada','Despeje')\">";
			datos += "								<input type='text' name='tipoParada' id='porteroDespeje' style='display: none;'><img src='img/Captura/blocaje.png'><label>Despeje</label>";
			datos += "							</div>";
			datos += "							<div class='error2 recuadroIcono centradoXY flexWrap w45 h90' id='botonPorteroBlocaje' onclick=\"tipoParada('Parada','Blocaje')\">";
			datos += "								<input type='text' name='tipoParada' id='porteroParada' style='display: none;'><img src='img/Captura/parada.png'><label>Blocaje</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div class='opcionesHD h50 w100 centradoInlineXY'>";
			datos += "							<div class='error2 recuadroIcono centradoXY flexWrap w30 h90' id='botonZonaManos' onclick=\"tipoCuerpoParada('ZonaParada','Manos')\">";
			datos += "								<input type='text' name='tipoZonaParada' id='porteroMano' style='display: none;'><img src='img/Captura/paradaMano.png'><label>Manos</label>";
			datos += "							</div>";
			datos += "							<div class='error2 recuadroIcono centradoXY flexWrap w30 h90' id='botonZonaPies' onclick=\"tipoCuerpoParada('ZonaParada','Pies')\">";
			datos += "								<input type='text' name='tipoZonaParada' id='porteroPierna' style='display: none;'><img src='img/Captura/paradaPierna.png'><label>Pies</label>";
			datos += "							</div>";
			datos += "							<div class='error2 recuadroIcono centradoXY flexWrap w30 h90' id='botonZonaCuerpo' onclick=\"tipoCuerpoParada('ZonaParada','Cuerpo')\">";
			datos += "								<input type='text' name='tipoZonaParada' id='porteroOtro' style='display: none;'><img src='img/Captura/paradaOtro.png'><label>Cuerpo</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "				<div id='opcionesPenalti' class='w100 h100 centradoInlineXY' style='display: none;'>";
			datos += "					<div class='botonVolver w10 centradoXY' onclick=\"botonVolver()\"><img class='w80' src='img/Captura/deshacer.png'></div>";
			datos += "					<div id='botonesTipoTiro' class='w40 h100 centradoXY'>";
			datos += "						<div class='opcionesHD h80 w33 centradoXY flexWrap'>";
			datos += "							<div class='h50 w100 centradoXY'>";
			datos += "								<div class='acierto2 recuadroIcono centradoXY flexWrap w100 h90 seleccionado' id='botonTiroPenaltiClasico' onclick=\"tipoTiro('PenaltiTiro','Clasico')\" ontouchstart=\"inicioPulsacion('botonTiroPenaltiClasico')\" ontouchend=\"finPulsacion('botonTiroPenaltiClasico')\">";
			datos += "									<img src='img/Captura/tiroClasico.png'><label>Clásico</label>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "							<div class='h50 w100 centradoXY'>";
			datos += "								<div class='acierto2 recuadroIcono centradoXY flexWrap w100 h90' id='botonTiroPenaltiVaselina' onclick=\"tipoTiro('PenaltiTiro','Vaselina')\" ontouchstart=\"inicioPulsacion('botonTiroPenaltiVaselina')\" ontouchend=\"finPulsacion('botonTiroPenaltiVaselina')\">";
			datos += "									<img src='img/Captura/tiroVaselina.png'><label>Vaselina</label>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div class='h100 w90 centradoXY flexWrap'>";
			datos += "							<div id='botonTiradorPenalti' class='recuadroIcono spaceAroundXY flexWrap h60'>";
			datos += "								<div class='w100 h100 centradoXY flexWrap'>";
			datos += "									<div id='tiradorPenalti' class='h50 circuloPenalti'></div><label>Tirador</label>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "							<div id='botonPorteroPenalti' class='recuadroIcono spaceAroundXY flexWrap h60'>";
			datos += "								<div class='w100 h100 centradoXY flexWrap'>";
			datos += "									<div id='porteroPenalti' class='h50 circuloPenalti'></div><label>Portero</label>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "							<div id='botonSelecTirador' class='recuadroIcono centradoXY flexWrap w45 h30' onclick=\"seleccionarPenalti(1)\" ontouchstart=\"inicioPulsacion('botonSelecTirador')\" ontouchend=\"finPulsacion('botonSelecTirador')\">";
			datos += "								<img src='img/Menu/siguiente.png' style='transform: rotate(-90deg)'><label>Seleccionar</label>";
			datos += "							</div>";
			datos += "							<div id='botonSelecPortero' class='recuadroIcono centradoXY flexWrap w45 h30' onclick=\"seleccionarPenalti(2)\" ontouchstart=\"inicioPulsacion('botonSelecPortero')\" ontouchend=\"finPulsacion('botonSelecPortero')\">";
			datos += "								<img src='img/Menu/siguiente.png' style='transform: rotate(-90deg)'><label>Seleccionar</label>";
			datos += "							</div>";
			datos += "							<div id='botonSelecCancelar' class='recuadroIcono centradoXY flexWrap w90 h30 invisible' onclick=\"seleccionarPenalti(0)\" ontouchstart=\"inicioPulsacion('botonSelecCancelar')\" ontouchend=\"finPulsacion('botonSelecCancelar')\">";
			datos += "								<img src='img/Menu/error.png' style='transform: rotate(-90deg)'><label>Cancelar</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "					</div>";
			datos += "					<div id='botonesTipoParada' class='w50 h100 centradoXY flexWrap'>";
			datos += "						<div class='h50 w100 centradoInlineXY'>";
			datos += "							<div class='error2 recuadroIcono centradoXY flexWrap w45 h90 seleccionado' id='botonParadaPenaltiDespeje' onclick=\"tipoParada('PenaltiParada','Despeje')\">";
			datos += "								<input type='text' name='tipoParada' id='penaltiPorteroDespeje' style='display: none;'><img src='img/Captura/blocaje.png'><label>Despeje</label>";
			datos += "							</div>";
			datos += "							<div class='error2 recuadroIcono centradoXY flexWrap w45 h90' id='botonParadaPenaltiBlocaje' onclick=\"tipoParada('PenaltiParada','Blocaje')\">";
			datos += "								<input type='text' name='tipoParada' id='penaltiPorteroParada' style='display: none;'><img src='img/Captura/parada.png'><label>Blocaje</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div class='opcionesHD h50 w100 centradoInlineXY'>";
			datos += "							<div class='w60 h100 centradoInlineXY'>";
			datos += "								<div class='error2 recuadroIcono centradoXY flexWrap w30 h90' id='botonZonaPenaltiManos' onclick=\"tipoCuerpoParada('ZonaParadaPenalti','Manos')\">";
			datos += "									<input type='text' name='tipoCuerpoParada' id='porteroPenaltiMano' style='display: none;'><img src='img/Captura/paradaMano.png'><label>Manos</label>";
			datos += "								</div>";
			datos += "								<div class='error2 recuadroIcono centradoXY flexWrap w30 h90' id='botonZonaPenaltiPies' onclick=\"tipoCuerpoParada('ZonaParadaPenalti','Pies')\">";
			datos += "									<input type='text' name='tipoCuerpoParada' id='porteroPenaltiPierna' style='display: none;'><img src='img/Captura/paradaPierna.png'><label>Pies</label>";
			datos += "								</div>";
			datos += "								<div class='error2 recuadroIcono centradoXY flexWrap w30 h90' id='botonZonaPenaltiCuerpo' onclick=\"tipoCuerpoParada('ZonaParadaPenalti','Cuerpo')\">";
			datos += "									<input type='text' name='tipoCuerpoParada' id='porteroPenaltiOtro' style='display: none;'><img src='img/Captura/paradaOtro.png'><label>Cuerpo</label>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "							<div class='w40 h100 centradoInlineXY flexWrap'>";
			datos += "								<div class='error2 recuadroIcono centradoXY w90 h45 seleccionado' id='botonDistanciaAdelante' onclick=\"tipoDistanciaParada('DistanciaPenalti','Adelante')\">";
			datos += "									<input type='text' name='distanciaPenalti' id='distanciaAdelante' style='display: none;'><img style='height:90%;width:45%' src='img/Captura/adelantado.png'><label style='width:50%'>Adelante</label>";
			datos += "								</div>";
			datos += "								<div class='error2 recuadroIcono centradoXY w90 h45' id='botonDistanciaAtras' onclick=\"tipoDistanciaParada('DistanciaPenalti','Atras')\">";
			datos += "									<input type='text' name='distanciaPenalti' id='distanciaAtras' style='display: none;'><img style='height:90%;width:45%' src='img/Captura/atrasado.png'><label style='width:50%'>Portería</label>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "				<div id='opcionesAtaque' class='w100 h100 centradoInlineXY' style='display: none;'>";
			datos += "					<div class='botonVolver w10 centradoXY' onclick=\"botonVolver()\"><img class='w80' src='img/Captura/deshacer.png'></div>";
			datos += "					<div id='botonesPases' class='opcionesHD w40 h100'>";
			datos += "						<div class='h50 w100 centradoInlineXY'>";
			datos += "							<div class='recuadroIcono centradoXY flexWrap opciones w30 h80 seleccionado' id='botonPaseClasico' onclick=\"tipoPase('Clasico')\" ontouchstart=\"inicioPulsacion('botonPaseClasico')\" ontouchend=\"finPulsacion('botonPaseClasico')\">";
			datos += "								<img src='img/Captura/tiroClasico.png'>";
			datos += "								<label>Clásico</label>";
			datos += "							</div>";
			datos += "							<div class='recuadroIcono centradoXY flexWrap opciones w30 h80' id='botonPaseLateral' onclick=\"tipoPase('Lateral')\" ontouchstart=\"inicioPulsacion('botonPaseLateral')\" ontouchend=\"finPulsacion('botonPaseLateral')\">";
			datos += "								<img src='img/Captura/paseLateral.png'>";
			datos += "								<label>Lateral</label>";
			datos += "							</div>";
			datos += "							<div class='recuadroIcono centradoXY flexWrap opciones w30 h80' id='botonPaseCadera' onclick=\"tipoPase('Cadera')\" ontouchstart=\"inicioPulsacion('botonPaseCadera')\" ontouchend=\"finPulsacion('botonPaseCadera')\">";
			datos += "								<img src='img/Captura/tiroCadera.png'>";
			datos += "								<label>Cadera</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div class='h50 w100 centradoInlineXY'>";
			datos += "							<div class='recuadroIcono centradoXY flexWrap opciones w30 h75' id='botonPaseRecurso' onclick=\"tipoPase('Recurso')\" ontouchstart=\"inicioPulsacion('botonPaseRecurso')\" ontouchend=\"finPulsacion('botonPaseRecurso')\">";
			datos += "								<img src='img/Captura/recurso.png'>";
			datos += "								<label>Recurso</label>";
			datos += "							</div>";
			datos += "							<div class='recuadroIcono centradoXY flexWrap opciones w30 h75' id='botonPasePicado' onclick=\"tipoPase('Picado')\" ontouchstart=\"inicioPulsacion('botonPasePicado')\" ontouchend=\"finPulsacion('botonPasePicado')\">";
			datos += "								<img src='img/Captura/pasePicado.png'>";
			datos += "								<label>Picado</label>";
			datos += "							</div>";
			datos += "							<div class='recuadroIcono centradoXY flexWrap opciones w30 h75' id='botonPaseSuspension' onclick=\"tipoPase('Suspension')\" ontouchstart=\"inicioPulsacion('botonPaseSuspension')\" ontouchend=\"finPulsacion('botonPaseSuspension')\">";
			datos += "								<img src='img/Captura/tiroFly.png'>";
			datos += "								<label>Suspensión</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "					</div>";
			datos += "					<div id='botonesAccionesPase' class='w50 h100'>";
			datos += "						<div class='h50 w100 centradoInlineXY'>";
			datos += "							<div id='botonPase' class='recuadroIcono centradoXY flexWrap acierto2 w30 h75' onclick=\"accionPase('Pase')\" ontouchstart=\"inicioPulsacion('botonPase')\" ontouchend=\"finPulsacion('botonPase')\">";
			datos += "								<label>Pase</label>";
			datos += "							</div>";
			datos += "							<div id='botonAsistencia' class='recuadroIcono centradoXY flexWrap acierto2 w30 h75' onclick=\"accionPase('Asistencia')\" ontouchstart=\"inicioPulsacion('botonAsistencia')\" ontouchend=\"finPulsacion('botonAsistencia')\">";
			datos += "								<label>Asistencia</label>";
			datos += "							</div>";
			datos += "							<div id='botonRoboPase' class='recuadroIcono centradoXY flexWrap error2 w30 h75' onclick=\"accionRobo('Robo','En el pase')\" ontouchstart=\"inicioPulsacion('botonRoboPase')\" ontouchend=\"finPulsacion('botonRoboPase')\">";
			datos += "								<label>Robo en<br>el pase</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div class='h50 w100 centradoInlineXY'>";
			datos += "							<div class='h100 w50'>";
			datos += "								<div class='h20 w90 cartelesBotones'>";
			datos += "									<label><strong>No Forzado</strong></label>";
			datos += "								</div>";
			datos += "								<div class='h80 spaceAroundXY'>";
			datos += "									<div id='botonErrorPaseForzado' class='recuadroIcono centradoXY flexWrap error2 w45 h90' onclick=\"accionRobo('No Forzado','Error Pase')\" ontouchstart=\"inicioPulsacion('botonErrorPaseForzado')\" ontouchend=\"finPulsacion('botonErrorPaseForzado')\">";
			datos += "										<label><input id='accion' type='text' value='Error Pase Normal' style='display: none;'>Error Pase</label>";
			datos += "									</div>";
			datos += "									<div id='botonErrorRecepcionForzado' class='recuadroIcono centradoXY flexWrap error2 w45 h90' onclick=\"accionRobo('No Forzado','Error Recepcion')\" ontouchstart=\"inicioPulsacion('botonErrorRecepcionForzado')\" ontouchend=\"finPulsacion('botonErrorRecepcionForzado')\">";
			datos += "										<label><input id='accion' type='text' value='Error Recepc. Normal' style='display: none;'>Error Recepción</label>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "							<div class='h100 w50'>";
			datos += "								<div class='h20 w90 cartelesBotones'>";
			datos += "									<label><strong>Por Disuasión</strong></label>";
			datos += "								</div>";
			datos += "								<div class='h80 spaceAroundXY'>";
			datos += "									<div id='botonErrorPaseDisuasion' class='recuadroIcono centradoXY flexWrap error2 w45 h90' onclick=\"accionRobo('Disuasion','Error Pase')\" ontouchstart=\"inicioPulsacion('botonErrorPaseDisuasion')\" ontouchend=\"finPulsacion('botonErrorPaseDisuasion')\">";
			datos += "										<label><input id='accion' type='text' value='Error Pase Disuasión' style='display: none;'>Error Pase</label>";
			datos += "									</div>";
			datos += "									<div id='botonErrorRecepcionDisuasion' class='recuadroIcono centradoXY flexWrap error2 w45 h90' onclick=\"accionRobo('Disuasion','Error Recepcion')\" ontouchstart=\"inicioPulsacion('botonErrorRecepcionDisuasion')\" ontouchend=\"finPulsacion('botonErrorRecepcionDisuasion')\">";
			datos += "										<label><input id='accion' type='text' value='Error Recep. Disuasión' style='display: none;'>Error Recepción</label>";
			datos += "									</div>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "				<div id='opcionesDefensa' class='w100 h100 centradoInlineXY' style='display: none;'>";
			datos += "					<div class='botonVolver w10 centradoXY' onclick=\"botonVolver()\"><img class='w80' src='img/Captura/deshacer.png'></div>";
			datos += "					<div id='opcionesRobo' class='w30 h100'>";
			datos += "						<div class='h50 w100 centradoXY'>";
			datos += "							<div class='recuadroIcono centradoXY flexWrap w75 h75 error2' id='botonRobo' onclick=\"accionDefensa('Robo','Robo')\" ontouchstart=\"inicioPulsacion('botonRobo')\" ontouchend=\"finPulsacion('botonRobo')\">";
			datos += "								<img src='img/Captura/roboOk.png'>";
			datos += "								<label>Defensa Roba Balón</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div class='h50 w100 centradoXY'>";
			datos += "							<div class='recuadroIcono centradoXY flexWrap w75 h75 acierto2' id='botonIntentoRobo' onclick=\"accionDefensa('Robo','Intento')\" ontouchstart=\"inicioPulsacion('botonIntentoRobo')\" ontouchend=\"finPulsacion('botonIntentoRobo')\">";
			datos += "								<img src='img/Captura/roboError.png'>";
			datos += "								<label>Atacante Evita Robo</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "					</div>";
			datos += "					<div id='opcionesFalta' class='w60 h100 centradoInlineXY'>";
			datos += "						<div class='w40 h100 centradoXY flexWrap'>";
			datos += "							<div class='recuadroIcono centradoXY flexWrap w75 h60 error2' id='botonGolpe' onclick=\"accionDefensa('Golpe','Golpe')\" ontouchstart=\"inicioPulsacion('botonGolpe')\" ontouchend=\"finPulsacion('botonGolpe')\">";
			datos += "								<img src='img/Captura/golpe.png'>";
			datos += "								<label>Golpe Franco</label>";
			datos += "							</div>";
			datos += "							<div class='recuadroIcono centradoXY flexWrap w75 h30 error2' id='botonGolpe' onclick=\"accionPenalti()\" ontouchstart=\"inicioPulsacion('botonGolpe')\" ontouchend=\"finPulsacion('botonGolpe')\">";
			datos += "								<img src='img/Menu/partido.png'>";
			datos += "								<label>Penalti</label>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<div class='w60 h100' id='grupoSanciones'>";
			datos += "							<div class='h40 centradoXY'>";
			datos += "								<div class='recuadroIcono centradoXY flexWrap w80 h90 error2' id='boton2minutos' onclick=\"accionDefensa('Golpe','Exclusion')\" ontouchstart=\"inicioPulsacion('boton2minutos')\" ontouchend=\"finPulsacion('boton2minutos')\">";
			datos += "									<img src='img/Captura/dosMinutos.png'>";
			datos += "									<br>";
			datos += "									<label>Exclusión</label>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "							<div class='h60 centradoInlineXY'>";
			datos += "								<div class='recuadroIcono centradoXY flexWrap w30 h75 error2' id='botonTAmarilla' onclick=\"accionDefensa('Golpe','TAmarilla')\" ontouchstart=\"inicioPulsacion('botonTAmarilla')\" ontouchend=\"finPulsacion('botonTAmarilla')\">";
			datos += "									<img src='img/Captura/tarjetaAmarilla.png'>";
			datos += "									<br>";
			datos += "									<label>Tarjeta</label>";
			datos += "								</div>";
			datos += "								<div class='recuadroIcono centradoXY flexWrap w30 h75 error2' id='botonTRoja' onclick=\"accionDefensa('Golpe','TRoja')\" ontouchstart=\"inicioPulsacion('botonTRoja')\" ontouchend=\"finPulsacion('botonTRoja')\">";
			datos += "									<img src='img/Captura/tarjetaRoja.png'>";
			datos += "									<br>";
			datos += "									<label>Tarjeta</label>";
			datos += "								</div>";
			datos += "								<div class='recuadroIcono centradoXY flexWrap w30 h75 error2' id='botonTAzul' onclick=\"accionDefensa('Golpe','TAzul')\" ontouchstart=\"inicioPulsacion('botonTAzul')\" ontouchend=\"finPulsacion('botonTAzul')\">";
			datos += "									<img src='img/Captura/tarjetaAzul.png'>";
			datos += "									<br>";
			datos += "									<label>Tarjeta</label>";
			datos += "								</div>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "			</div>";
			
			// Cuadro Estadísticas
			datos += "			<div id='cuadroEstadisticas' class='h85 w95 centradoXY flexWrap invisible'>";
			datos += "				<div id='marcoEstadisticas' class='h90 w100'>";
			datos += "					<div id='marcoEstGenerales' class='h90 w100 centradoXY flexWrap'>";
			datos += "					</div>";
			datos += "					<div id='marcoEstGraficas' class='h95 w100 centradoXY flexWrap invisible'>";
			datos += "					</div>";
			datos += "					<div id='marcoEstJugadores' class='h95 w100 centradoXY flexWrap invisible'>";
			datos += "					</div>";
			datos += "					<div id='marcoEstPro' class='h100 w90 centradoXY invisible'>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "				<div id='mandoEstadisticas' class='h10 w90 cajaAbatible spaceAroundXY'>";
			datos += "					<div id='mandoEstGenerales' class='h90 w20 centradoXY' onclick=\"mostrarCuadroEstadisticas('Generales')\">Datos Generales";
			datos += "					</div>";
			datos += "					<div id='mandoEstGraficas' class='h90 w20 centradoXY' onclick=\"mostrarCuadroEstadisticas('Graficas')\">Gráficas";
			datos += "					</div>";
			datos += "					<div id='mandoEstJugadores' class='h90 w20 centradoXY' onclick=\"mostrarCuadroEstadisticas('Jugadores')\">Jugadores";
			datos += "					</div>";
			datos += "					<div id='mandoEstPro' class='h90 w20 centradoXY' onclick=\"mostrarCuadroEstadisticas('Pro')\">Estadísticas<strong class='textoPro'>Pro</strong>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "				<img id='publicidadMandoEstIzq' src='img/Publicidad/logoJambitec.png' alt='Publicidad'>"; ////////////// Publicidad
			datos += "				<img id='publicidadMandoEstDer' src='img/Publicidad/logoJambitec.png' alt='Publicidad'>"; ////////////// Publicidad
			datos += "			</div>";
			datos += "		</div>";


			// Lateral derecho
			datos += "		<div id='lateralDerecho' class='w25 h100 centradoXY flexWrap'>";
			datos += "			<div id='reloj' class='h15 centradoXY flexWrap'></div>";
			datos += "			<div id='controlReloj' class='h15 centradoXY'>";
			datos += "				<div id='botonesReloj' class='h90 centradoInlineXY' style='display: none;'>";
			datos += "					<div id='botonRelojTiempoMuerto' class='w50 h100 centradoXY flexWrap' onclick=\"pausaReloj('tiempo')\" ontouchstart=\"inicioPulsacion('botonRelojTiempoMuerto')\" ontouchend=\"finPulsacion('botonRelojTiempoMuerto')\"><img class='h80' src=\"img/Captura/tiempo-muerto.png\"><label>Tiempo Muerto</label></div>";
			datos += "					<div id='botonRelojPausa' class='w50 h100 centradoXY flexWrap' onclick=\"pausaReloj('pausa')\" ontouchstart=\"inicioPulsacion('botonRelojPausa')\" ontouchend=\"finPulsacion('botonRelojPausa')\"><img class='h80' src=\"img/Captura/pausa.png\"><label>Pausa</label></div>";
			datos += "				</div>";
			datos += "				<div id='botonTiempoMuerto' class='w100 spaceAroundXY' style='display: none;'>";
			datos += "					<div class='w40 centradoXY botonTM' id='botonTMLocal' onclick=\"tiempoMuerto('local')\" ontouchstart=\"inicioPulsacion('botonTMLocal')\" ontouchend=\"finPulsacion('botonTMLocal')\">";
			datos += "						<label class='textolocal'>Local</label>";
			datos += "					</div>";
			datos += "					<div class='botonTM botonCancelar' id='botonTMCancelar' onclick=\"tiempoMuerto('cancelar')\" ontouchstart=\"inicioPulsacion('botonTMCancelar')\" ontouchend=\"finPulsacion('botonTMCancelar')\" style=\"display: none;\">";
			datos += "						<label><big>C</big>ancelar</label>";
			datos += "					</div>";
			datos += "					<div class='w40 centradoXY botonTM' id='botonTMVisitante' onclick=\"tiempoMuerto('visitante')\" ontouchstart=\"inicioPulsacion('botonTMVisitante')\" ontouchend=\"finPulsacion('botonTMVisitante')\">";
			datos += "						<label class='textovisitante'>Visitante</label>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "				<div id='botonEstadisticas' class='h90 centradoXY flexWrap' onclick=\"mostrarEstadisticasPartido()\" ontouchstart=\"inicioPulsacion('botonEstadisticas')\" ontouchend=\"finPulsacion('botonEstadisticas')\">";
			datos += "					<img id='imgBotonEstadisticas' class='h50' src='img/Captura/estadisticas.png'><label>Estadísticas</label>";
			datos += "				</div>";
			datos += "				<div id='botonInicioReloj' class='h90 centradoXY flexWrap' onclick=\"inicioReloj()\" ontouchstart=\"inicioPulsacion('botonInicioReloj')\" ontouchend=\"finPulsacion('botonInicioReloj')\">";
			datos += "					<img class='h50' src='img/Captura/reloj.png'><label>Iniciar Reloj</label>";
			datos += "				</div>";
			datos += "			</div>";
			datos += "			<div id='resumen' class='h70 w100 centradoXY flexWrap'>";
			datos += "				<div id='verSeleccion' class='h90 w100'>";
			datos += "					<div id='botonVaciarPartido' class='h0 w90 error centradoXY pulsable' onclick=\"avisoVaciarPartido()\" style='transition:.5s'>Eliminar todos los datos</div>";
			datos += "					<div id='imprimirSeleccion' class='h100'></div>";
			datos += "				</div>";
			datos += "				<div id='recuadroOpciones' class='h10 w100 spaceAroundXY'>";
			if (!('webkitSpeechRecognition' in window)) { // Ver si está disponible la API en este navegador
				datos += "				<img id='logoMicro' src='img/Captura/mudo.png' class='h70' alt='Escuchar'>";
			}else{
				datos += "				<img id='logoMicro' src='img/Captura/microOFF.png' class='h70' alt='Escuchar' onclick=\"escuchar()\">";
			}
			datos += "					<img id='logoHD' src='img/Captura/completo.png' class='h70' alt='HD' onclick=\"cambiarModo()\">";
			datos += "					<span onclick=\"mostrarOpcionesMenu()\" class='h90 w20 centradoXY'><svg id='logoConfiguracion' xmlns='http://www.w3.org/2000/svg' class='h100 noOperativo icon icon-tabler icon-tabler-settings' width='100' height='100' viewBox='0 0 24 24' stroke-width='1.5' style='stroke:#f5f5f5; filter:none' fill='none' stroke-linecap='round' stroke-linejoin='round'>  <path stroke='none' d='M0 0h24v24H0z' fill='none'/>  <path d='M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z' />  <circle cx='12' cy='12' r='3' /></svg></span>";
			datos += "					<img id='botonVolverMenu' class='h80' src='img/Menu/Logo_BigDT.png' onclick=\"transicionPartido('bodyCaptura','bodyMenu')\" ontouchstart=\"inicioPulsacion('botonVolverMenu')\" ontouchend=\"finPulsacion('botonVolverMenu');transicionPartido('bodyCaptura','bodyMenu')\">";
			datos += "				</div>";
			datos += "				<div id='opcionesMenu' class='w95 h15 cajaAbatible spaceAroundXY'>";
			datos += "					<div class='w25 h70 centradoXY flexWrap noOperativo'>";
			datos += "						<div class='w66 centradoXY botonOpcionesPartido'>"; // Mostrar Ayuda
			datos += "							<svg xmlns='http://www.w3.org/2000/svg' class='h90 onclick=\"mostrarOpcionesMenu()\" class='h90 w20 noOperativo icon icon-tabler icon-tabler-question-mark' width='100' height='100' viewBox='0 0 24 24' stroke-width='1.5' stroke='#f5f5f5' fill='none' stroke-linecap='round' stroke-linejoin='round'>  <path stroke='none' d='M0 0h24v24H0z' fill='none'/>  <path d='M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4' />  <line x1='12' y1='19' x2='12' y2='19.01' /></svg>";
			datos += "						</div>";
			datos += "						<label class='w100'>Ayuda</label>";
			datos += "					</div>";
			datos += "					<div class='w25 h70 centradoXY flexWrap'>";
			datos += "						<div id='opcionEditar' class='w66 centradoXY botonOpcionesPartido' onclick=\"editar()\">"; // Poner marcador en cada evento y dar la opción de editarlo
			datos += "							<svg xmlns='http://www.w3.org/2000/svg' class='w70 noOperativo icon icon-tabler icon-tabler-edit' width='100' height='100' viewBox='0 0 24 24' stroke-width='1.5' stroke='#f5f5f5' fill='none' stroke-linecap='round' stroke-linejoin='round'>  <path stroke='none' d='M0 0h24v24H0z' fill='none'/>  <path d='M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' />  <path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' />  <line x1='16' y1='5' x2='19' y2='8' /></svg>";
			datos += "						</div>";
			datos += "						<div id='guardarEditar' class='w66 centradoXY invisible' onclick=\"guardarEditar()\">"; // Poner marcador en cada evento y dar la opción de editarlo
			datos += "							<img class='h65' src='img/Menu/guardar.png' alt=''>";
			datos += "						</div>";
			datos += "						<label class='w100'>Editar</label>";
			datos += "					</div>";
			datos += "					<div class='w25 h70 centradoXY flexWrap'>";
			datos += "						<div id='opcionInfo' class='w66 centradoXY botonOpcionesPartido' onclick=\"mostrarOpcion('info')\">"; // Abrir cuadro con información del partido
			datos += "							<svg xmlns='http://www.w3.org/2000/svg' class='h80 noOperativo icon icon-tabler icon-tabler-info-circle' width='100' height='100' viewBox='0 0 24 24' stroke-width='1.5' stroke='#f5f5f5' fill='none' stroke-linecap='round' stroke-linejoin='round'>  <path stroke='none' d='M0 0h24v24H0z' fill='none'/>  <circle cx='12' cy='12' r='9' />  <line x1='12' y1='8' x2='12.01' y2='8' />  <polyline points='11 12 12 12 12 16 13 16' /></svg>";
			datos += "						</div>";
			datos += "						<label class='w100'>Info</label>";
			datos += "					</div>";
			datos += "					<div class='w25 h70 centradoXY flexWrap'>";
			datos += "						<div class='w66 centradoXY pulsable botonOpcionesPartido' onclick=\"mostrarOpcion('opciones')\">"; // Abrir los cuadros de calibrar opciones
			datos += "							<svg xmlns='http://www.w3.org/2000/svg' class='w70 noOperativo icon icon-tabler icon-tabler-adjustments-horizontal' width='100' height='100' viewBox='0 0 24 24' stroke-width='1.5' stroke='#f5f5f5' fill='none' stroke-linecap='round' stroke-linejoin='round'>  <path stroke='none' d='M0 0h24v24H0z' fill='none'/>  <circle cx='14' cy='6' r='2' />  <line x1='4' y1='6' x2='12' y2='6' />  <line x1='16' y1='6' x2='20' y2='6' />  <circle cx='8' cy='12' r='2' />  <line x1='4' y1='12' x2='6' y2='12' />  <line x1='10' y1='12' x2='20' y2='12' />  <circle cx='17' cy='18' r='2' />  <line x1='4' y1='18' x2='15' y2='18' />  <line x1='19' y1='18' x2='20' y2='18' /></svg>";
			datos += "						</div>";
			datos += "						<label class='w100'>Calibrar</label>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "				<div id='cuadroInformacion' class='centradoXY flexWrap invisible'>";
			datos += "					<h1>Información</h1>";
			datos += "					<span class='w100'><h2>Fecha</h2>"+js.Datos[0].Fecha+"<br>"+js.Datos[0].Hora+"h</span>";
			datos += "					<span class='w100'><h2>Pabellón</h2>"+js.Datos[0].Pabellon+"</span>";
			datos += "					<span class='w100'><h2>Localidad</h2>"+js.Datos[0].Localidad+"<br>"+js.Datos[0].Provincia+"<br><img src='img/Clubes/Clubes/Localidades/"+js.Datos[0].Comunidad+".png' alt='Logo'></span>";
			datos += "					<div class='w100 h10 spaceAroundXY'>";
			datos += "						<img class='h90' src='img/Menu/Logos/"+labelEscudoCampeonato+"' onerror=\"this.src='img/Menu/Logos/c3f28cc739546eb64f35f44214e30555.png'\" alt='Logo'>";
			datos += "						<img class='h90' src='img/Clubes/Organizadoras/9856a0727c42a75b4abdd08282ead053.png' alt='Logo'>";
			datos += "					</div>";
			datos += "					<div class='w100 h20'></div>";
			datos += "				</div>";
			datos += "				<div id='cuadroOpcionesPartido' class='centradoXY flexWrap invisible'>";
			datos += "					<h1>Opciones</h1>";
			datos += "					<div class='w100 h60 spaceAroundXY flexWrap'>";
			datos += "						<h2><small>Modo Captura</small></h2>";
			datos += "						<div class='w90 h15 spaceAroundXY'>";
			datos += "							<div id='modoCapturaVivo' class='h90 w40 centradoXY flexWrap pulsable opcionPartidoPulsada' onclick=\"modoCaptura('Vivo')\">";
			datos += "								<img class='h50 w60' src='img/Captura/vivo.png' alt='Directo'><span class='w100 h30 centradoXY'>Directo</span>";
			datos += "							</div>";
			datos += "							<div id='modoCapturaDiferido' class='h90 w40 centradoXY flexWrap pulsable opcionPartidoNoPulsada' onclick=\"modoCaptura('Diferido')\">";
			datos += "								<img class='h50 w60' src='img/Captura/diferido.png' alt='Diferido'><span class='w100 h30 centradoXY'>Diferido</span>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<h2><small>Calidad de Datos</small></h2>";
			datos += "						<div class='w90 h15 spaceAroundXY'>";
			datos += "							<div id='calidadDatosMinimo' class='h90 w40 centradoXY pulsable opcionPartidoNoPulsada' onclick=\"calidadDatosCaptura('Minimo')\"><strong>MIN</strong></div>";
			datos += "							<div id='calidadDatosMaximo' class='h90 w40 centradoXY pulsable opcionPartidoPulsada' onclick=\"calidadDatosCaptura('Maximo')\"><strong>MAX</strong></div>";
			datos += "						</div>";
			datos += "						<h2><small>Gestionar Cambios</small></h2>";
			datos += "						<div class='w90 h15 spaceAroundXY'>";
			datos += "							<div id='cambiosCapturaLocal' class='h90 w40 centradoXY pulsable opcionPartidoPulsada' onclick=\"verCambiosCaptura(0,'Local')\">";
			datos += "								<img class='h80' src='img/Clubes/Balonmano/Equipos/"+js.Datos[0].EscudoLocal+"' alt='Local'>";
			datos += "							</div>";
			datos += "							<div id='cambiosCapturaVisitante' class='h90 w40 centradoXY pulsable opcionPartidoPulsada' onclick=\"verCambiosCaptura(0,'Visitante')\">";
			datos += "								<img class='h80' src='img/Clubes/Balonmano/Equipos/"+js.Datos[0].EscudoVisitante+"' alt='Visitante'>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "						<h2><small>Mostrar Equipos</small></h2>";
			datos += "						<div class='w90 h15 spaceAroundXY'>";
			datos += "							<div id='equipoCapturaLocal' class='h90 w40 centradoXY pulsable opcionPartidoPulsada' onclick=\"verEquipoCaptura('Local')\">";
			datos += "								<img class='h80' src='img/Clubes/Balonmano/Equipos/"+js.Datos[0].EscudoLocal+"' alt='Local'>";
			datos += "							</div>";
			datos += "							<div id='equipoCapturaVisitante' class='h90 w40 centradoXY pulsable opcionPartidoPulsada' onclick=\"verEquipoCaptura('Visitante')\">";
			datos += "								<img class='h80' src='img/Clubes/Balonmano/Equipos/"+js.Datos[0].EscudoVisitante+"' alt='Visitante'>";
			datos += "							</div>";
			datos += "						</div>";
			datos += "					</div>";
			datos += "					<div class='w100 h25 spaceAroundXY flexWrap'></div>";
			datos += "				</div>";
			datos += "			</div>";
			datos += "		</div>";
			datos += "	</div>";

			// Publicar datos
			$("#bodyCaptura").html(datos);
			$("#bodyCaptura").show(datos);

			// Mostrar datos
			relojInicial(js.Datos[0].Minuto);
			contadorTM();
			relojExclusiones(); //Mostrar los contadores de exclusiones activos
			registroDatos(); //Mostrar los datos de partido que ya están escritos botonTM
			mostrarSanciones();

			/*// Ajustar el tamaño de los textos en los botones
			const buttons = document.querySelectorAll(".textoSombra");
			const screenWidth = window.innerWidth;
			const fontSize = Math.min(20, screenWidth / 70); // máximo 20px, ajustable según tus necesidades

			buttons.forEach((button) => {
			  const textLength = button.textContent.length;
			  const calculatedFontSize = Math.min(fontSize, (fontSize * screenWidth) / (textLength * 12)); // 12 es un factor de ajuste para que la fuente sea legible
			  button.style.fontSize = calculatedFontSize + "px";
			});*/

			// Marcar opciones
			if (js.Local.Jugadores == null || js.Local.Jugadores.length == 0) {
				verEquipoCaptura("Local");
				sessionStorage.setItem("Mostrar L","No");
			}
			const minConvocatoria = JSON.parse(sessionStorage.getItem("convocatoria"));
			const convocatoriaL = sessionStorage.getItem("ConvocatoriaL") ? JSON.parse(sessionStorage.getItem("ConvocatoriaL")) : 0;
			const convocatoriaV = sessionStorage.getItem("ConvocatoriaV") ? JSON.parse(sessionStorage.getItem("ConvocatoriaV")) : 0;
			if (convocatoriaL.length >= minConvocatoria[0] && js.Local.Jugadores !== null && js.Local.Jugadores.length > 0) {
				document.getElementById("localConvocatoria").classList.add("invisible");
			}

			if (js.Visitante.Jugadores == null || js.Visitante.Jugadores.length == 0) {
				verEquipoCaptura("Visitante");
				sessionStorage.setItem("Mostrar V","No");
			}
			if (convocatoriaV.length >= minConvocatoria[0] && js.Visitante.Jugadores !== null && js.Visitante.Jugadores.length > 0) {
				document.getElementById("visitanteConvocatoria").classList.add("invisible");
			}

			if (!localStorage.getItem("Modo Captura")) {
				const verModoCaptura = tipo == 3 ? localStorage.setItem("Modo Captura","Diferido") : localStorage.setItem("Modo Captura","Vivo");
			}
			if (!localStorage.getItem("Calidad Datos")) {
				const verModoCaptura = tipo == 3 ? localStorage.setItem("Calidad Datos","Maximo") : localStorage.setItem("Calidad Datos","Minimo");
			}
			if (!localStorage.getItem("Gestionar Cambios")) {
				localStorage.setItem("Gestionar Cambios","Si");
			}

			verCambiosCaptura(localStorage.getItem("Gestionar Cambios"));
			verEquipoCaptura('Local',1);
			verEquipoCaptura('Visitante',1);
			modoCaptura(localStorage.getItem("Modo Captura"));
			calidadDatosCaptura(localStorage.getItem("Calidad Datos"));

			if (sessionStorage.getItem("totalConvocadosL")) {
				document.getElementById("localConvocatoria").classList.add("invisible");
				cajasArrastre(0,'L');
				mostrarBanquilloInicial('L');
			}
			if (sessionStorage.getItem("totalConvocadosV")) {
				document.getElementById("visitanteConvocatoria").classList.add("invisible");
				cajasArrastre(0,'V');
				mostrarBanquilloInicial('V');
			}
		},
		timeout: 10000,
		error: function() {mostrarPantallaCaptura(tipo,IdPartido, IdLocal, IdVisitante,idioma)}
    });
};
	function accionBasica(accion, tipo, equipo) {
		// Configuración
		let ad = 1,
		    acierto = 0,
		    opcion = 0,
		    equipo1 = "",
		    equipo2 = "",
		    zonaCampo = 0;

		switch(tipo) {
		case "1":
		case "2":
		case "3":
		case "4":
		case "7":
			equipo1 = equipo;
			equipo2 = equipo == "L" ? "V" : "L";
			break;
		case "6":
		case "5":
			equipo1 = equipo == "L" ? "V" : "L";
			equipo2 = equipo;
			break;
		}

		guardarPosesion(equipo);

		switch(accion) {
		case "1":
			// crear Contra
			acierto = tipo == "1" ? "1" : "2";
			contra(equipo,acierto);
			break;
		case "3":
			zonaCampo = 7;
			break;
		}
			/*






Hay que poner bien lo del histórico de acciones
Hay que poner lo de deshacer la última acción metida



			*/

		// Realizar acción
		switch(tipo) {
		case "1":
			// Acción Gol
			let labelGol = "Marcador"+equipo,
			    labelMarcador = "imprimirMarcadorCaptura"+equipo;

			let marcadorNuevo = parseInt(sessionStorage.getItem(labelGol)) + 1;
			sessionStorage.setItem(labelGol, marcadorNuevo);

			document.getElementById(labelMarcador).innerHTML = "<label>"+marcadorNuevo+"</label>";

			guardarTiro(ad,'1',opcion,equipo,0,equipo2,0,equipo2,0,0,zonaCampo,0,0,0);
			guardarGol(equipo);
			break;
		case "2":
			// Acción Parada
			guardarTiro(ad,'2',opcion,equipo1,0,null,0,equipo2,0,0,zonaCampo,0,0,0);
			break;
		case "3":
			// Acción Tiro Fuera
			guardarTiro(ad,'4',opcion,equipo1,0,null,0,equipo2,0,0,zonaCampo,0,0,0);
			break;
		case "4":
			// Acción Tiro Bloqueado
			guardarTiro(ad,'5',opcion,equipo1,0,null,0,equipo2,0,0,zonaCampo,0,0,0);
			break;
		case "5":
			// Acción Robo
			guardarSancion('12',ad,1,equipo1,0,equipo2,0);
			break;
		case "6":
			// Acción Perdida
			guardarPerdida('5',ad,0,equipo1);
			break;
		case "7":
			// Acción Exclusión
			aplicarSancion("Exclusion",ad,equipo1,0,equipo2,0);
			break;
		}
	};

function mostrarOpcionesMenu() {
	document.getElementById("opcionesMenu").classList.toggle("open");
	if (document.getElementById("opcionesMenu").classList.contains('open')) {
		document.getElementById("logoConfiguracion").style.stroke = '#a557d8';
	}else{
		document.getElementById("logoConfiguracion").style.stroke = '#f5f5f5';

		document.getElementById("cuadroOpcionesPartido").classList.add("invisible");
		document.getElementById("cuadroInformacion").classList.add("invisible");
	}
};
	function mostrarOpcion(opcion) {
		switch (opcion) {
			case "info":
				document.getElementById("cuadroOpcionesPartido").classList.add("invisible");
				document.getElementById("cuadroInformacion").classList.toggle("invisible");
				break;
			case "opciones":
				document.getElementById("cuadroInformacion").classList.add("invisible");
				document.getElementById("cuadroOpcionesPartido").classList.toggle("invisible");
				break;
		}
	};

	function modoCaptura(opcion) {
		const labelPulsado = "modoCaptura"+opcion;
		document.getElementById(labelPulsado).classList.remove("opcionPartidoNoPulsada");
		document.getElementById(labelPulsado).classList.add("opcionPartidoPulsada");

		const labelNoPulsado = opcion == "Vivo" ? "modoCapturaDiferido" : "modoCapturaVivo";
		document.getElementById(labelNoPulsado).classList.remove("opcionPartidoPulsada");
		document.getElementById(labelNoPulsado).classList.add("opcionPartidoNoPulsada");

		if(opcion == "Diferido") {
			document.getElementById("equipoCapturaLocal").classList.add("opcionPartidoNoPulsada");
			document.getElementById("equipoCapturaLocal").classList.remove("opcionPartidoPulsada");
			document.getElementById("equipoCapturaVisitante").classList.add("opcionPartidoNoPulsada");
			document.getElementById("equipoCapturaVisitante").classList.remove("opcionPartidoPulsada");
			sessionStorage.setItem("MostrarL", "Si");
			sessionStorage.setItem("MostrarV", "Si");
			verEquipoCaptura("Local");
			verEquipoCaptura("Visitante");
			calidadDatosCaptura("Maximo");
			verCambiosCaptura("Si", "Local");
			verCambiosCaptura("Si", "Visitante");
		}
		if (opcion == "Vivo") {
			calidadDatosCaptura("Minimo");
			sessionStorage.setItem("MostrarL", "No");
			sessionStorage.setItem("MostrarV", "No");
			verCambiosCaptura("No","Local");
			verCambiosCaptura("No","Visitante");
			verEquipoCaptura("Local");
			verEquipoCaptura("Visitante");
		}
	};
	function verEquipoCaptura(equipo,inicio) {
		const labelStorage = "Mostrar "+equipo.charAt(0);
		let accionMostrarEquipo = 1;
		if (!sessionStorage.getItem(labelStorage)) {
			sessionStorage.setItem(labelStorage,"Si");
		}else{
			if (inicio == 1) {
				accionMostrarEquipo = sessionStorage.getItem(labelStorage) == "Si" ? 1 : 0;
			}else{
				accionMostrarEquipo = sessionStorage.getItem(labelStorage) == "Si" ? 0 : 1;
				const nuevoValor = sessionStorage.getItem(labelStorage) == "Si" ? sessionStorage.setItem(labelStorage,"No") : sessionStorage.setItem(labelStorage,"Si");
			}
		}
		mostrarPantallaEquipo(accionMostrarEquipo,equipo);

		function mostrarPantallaEquipo(accion,equipoCompleto) {
			const equipo = equipoCompleto == "Local" ? "L" : "V";

			const labelPulsado = "equipoCaptura"+equipoCompleto;
			const elemento = document.getElementById(labelPulsado);
			const labelConvocatoria = equipoCompleto.toLowerCase()+"Convocatoria";
			const labelPartido = equipoCompleto.toLowerCase()+"Partido";
			const labelSecundario = equipoCompleto.toLowerCase()+"Secundario";
			
			const labelMandoEstJugadores = "cuadroMandosEstJugadores"+equipo;
			if (accion == 1) {
				// Mostrar botones
				elemento.classList.remove("opcionPartidoNoPulsada");
				elemento.classList.add("opcionPartidoPulsada");
				// Acciones
				document.getElementById(labelConvocatoria).classList.remove("invisible");
				document.getElementById(labelPartido).classList.remove("invisible");
				document.getElementById(labelSecundario).classList.add("invisible");
				if (document.getElementById(labelMandoEstJugadores)) {
					document.getElementById(labelMandoEstJugadores).classList.remove("invisible");
				}
			}else if (accion == 0) {
				// Mostrar botones
				elemento.classList.add("opcionPartidoNoPulsada");
				elemento.classList.remove("opcionPartidoPulsada");
				// Acciones
				document.getElementById(labelConvocatoria).classList.add("invisible");
				document.getElementById(labelPartido).classList.add("invisible");
				document.getElementById(labelSecundario).classList.remove("invisible");
				if (document.getElementById(labelMandoEstJugadores)) {
					document.getElementById(labelMandoEstJugadores).classList.add("invisible");
				}
				let labelCaptura = "cambiosCaptura"+equipoCompleto;
				if (document.getElementById(labelCaptura).classList.contains("opcionPartidoPulsada")) {
					verCambiosCaptura(0,equipoCompleto);
				}
			}
			if (sessionStorage.getItem("ConvocatoriaL")) {
				document.getElementById("localConvocatoria").classList.add("invisible");
			}
			if (sessionStorage.getItem("ConvocatoriaV")) {
				document.getElementById("visitanteConvocatoria").classList.add("invisible");
			}

			const calidad = document.getElementById("calidadDatosMaximo").classList.contains("opcionPartidoPulsada") ? "Maximo" : "Minimo";
			calidadDatosCaptura(calidad);
		};
	};
	function calidadDatosCaptura(opcion) {
		// Mostrar botones
		const labelPulsado = "calidadDatos"+opcion;
		document.getElementById(labelPulsado).classList.remove("opcionPartidoNoPulsada");
		document.getElementById(labelPulsado).classList.add("opcionPartidoPulsada");

		const labelNoPulsado = opcion == "Minimo" ? "calidadDatosMaximo" : "calidadDatosMinimo";
		document.getElementById(labelNoPulsado).classList.remove("opcionPartidoPulsada");
		document.getElementById(labelNoPulsado).classList.add("opcionPartidoNoPulsada");

		// Acciones
		if (opcion == "Maximo") {
			// Botones ataque
			document.getElementById("botonesErrores").classList.remove("invisible");
			document.getElementById("botonTarjetaAmarilla").classList.remove("invisible");

			// Botones pase
			document.getElementById("botonesAccionesPase").classList.remove("invisible");
			//////////////////////// Cambiar esto por quitar la opción de pase en los botones de los jugadores

			// Botones tiro
			document.getElementById("botonTiroDesvio").classList.remove("invisible");
			document.getElementById("botonesTipoParada").classList.remove("invisible");

			// Modo con/sin Mostrar Equipos
			const equipo = ["L","V"];
			for (var i = 0; i < equipo.length; i++) {
				labelMostrar = "Mostrar "+equipo[i];
				if (sessionStorage.getItem(labelMostrar) == "No") {
					//const labelTiroFuera = "botonTiroFuera"+equipo[i];
					const labelTiroContraBloqueado = "botonTiroContraBloqueado"+equipo[i];
					const labelTiroCampoBloqueado = "botonTiroCampoBloqueado"+equipo[i];
					const labelFormacionAtq = "botonFormacionAtq"+equipo[i];
					const labelFormacionDef = "botonFormacionDef"+equipo[i];
					//document.getElementById(labelTiroFuera).classList.remove("invisible");
					document.getElementById(labelTiroContraBloqueado).classList.remove("invisible");
					document.getElementById(labelTiroCampoBloqueado).classList.remove("invisible");
					document.getElementById(labelFormacionAtq).classList.remove("invisible");
					document.getElementById(labelFormacionDef).classList.remove("invisible");
				}else{
					const labelSancionBanquillo = "botonSancionBanquillo"+equipo[i];
					const labelAvisoPasivo = "botonAvisoPasivo"+equipo[i];
					const labelCambiarFormacion = "botonGeneralCambiarFormacion"+equipo[i];
					const labelMandoCaptura = "mandoCaptura"+equipo[i];
					const labelPantallaCaptura = "pantallaCaptura"+equipo[i];
					const labelSancionPasivo = "botonSancionPasivo"+equipo[i];
					const labelPorteriaVacia = "botonPorteriaVacia"+equipo[i];

					document.getElementById(labelSancionBanquillo).classList.remove("invisible");
					document.getElementById(labelAvisoPasivo).classList.remove("invisible");
					document.getElementById(labelCambiarFormacion).classList.remove("invisible");

					document.getElementById(labelMandoCaptura).style.height = "33%";
					if (document.getElementById(labelPantallaCaptura)) {document.getElementById(labelPantallaCaptura).style.height = "65%";}
					document.getElementById(labelSancionPasivo).style.height = "70%";
					document.getElementById(labelPorteriaVacia).style.height = "70%";
				}
			}
		}else if (opcion == "Minimo") {
			// Botones ataque
			document.getElementById("botonesErrores").classList.add("invisible");
			document.getElementById("botonTarjetaAmarilla").classList.add("invisible");

			// Botones pase
			document.getElementById("botonesAccionesPase").classList.add("invisible");
			//////////////////////// Cambiar esto por quitar la opción de pase en los botones de los jugadores

			// Botones tiro
			document.getElementById("botonTiroDesvio").classList.add("invisible");
			document.getElementById("botonesTipoParada").classList.add("invisible");

			// Modo con/sin Mostrar Equipos
			const equipo = ["L","V"];
			for (var i = 0; i < equipo.length; i++) {
				labelMostrar = "Mostrar "+equipo[i];
				if (sessionStorage.getItem(labelMostrar) == "No") {
					//const labelTiroFuera = "botonTiroFuera"+equipo[i];
					const labelTiroContraBloqueado = "botonTiroContraBloqueado"+equipo[i];
					const labelTiroCampoBloqueado = "botonTiroCampoBloqueado"+equipo[i];
					const labelFormacionAtq = "botonFormacionAtq"+equipo[i];
					const labelFormacionDef = "botonFormacionDef"+equipo[i];
					//document.getElementById(labelTiroFuera).classList.add("invisible");
					document.getElementById(labelTiroContraBloqueado).classList.add("invisible");
					document.getElementById(labelTiroCampoBloqueado).classList.add("invisible");
					document.getElementById(labelFormacionAtq).classList.add("invisible");
					document.getElementById(labelFormacionDef).classList.add("invisible");
				}else{
					const labelSancionBanquillo = "botonSancionBanquillo"+equipo[i];
					const labelAvisoPasivo = "botonAvisoPasivo"+equipo[i];
					const labelCambiarFormacion = "botonGeneralCambiarFormacion"+equipo[i];
					const labelMandoCaptura = "mandoCaptura"+equipo[i];
					const labelPantallaCaptura = "pantallaCaptura"+equipo[i];
					const labelSancionPasivo = "botonSancionPasivo"+equipo[i];
					const labelPorteriaVacia = "botonPorteriaVacia"+equipo[i];

					document.getElementById(labelSancionBanquillo).classList.add("invisible");
					document.getElementById(labelAvisoPasivo).classList.add("invisible");
					document.getElementById(labelCambiarFormacion).classList.add("invisible");

					document.getElementById(labelMandoCaptura).style.height = "20%";
					if (document.getElementById(labelPantallaCaptura)) {document.getElementById(labelPantallaCaptura).style.height = "75%";}
					document.getElementById(labelSancionPasivo).style.height = "40%";
					document.getElementById(labelPorteriaVacia).style.height = "40%";
				}
			}
		}
	};
	function verCambiosCaptura(opcion, equipo) {
		// Mostrar botones
		const labelPulsado = "cambiosCaptura"+equipo;
		if (document.getElementById(labelPulsado)) {
			switch(opcion) {
			case "Si":
				poner(labelPulsado);
				break;
			case "No":
				quitar(labelPulsado);
				break;
			default:
				if (document.getElementById(labelPulsado).classList.contains("opcionPartidoPulsada")) {
					quitar(labelPulsado);
				}else{
					poner(labelPulsado);
				}
				break;
			}
		}

		function poner(label) {
			document.getElementById(label).classList.remove("opcionPartidoNoPulsada");
			document.getElementById(label).classList.add("opcionPartidoPulsada");
		};
		function quitar(label) {
			document.getElementById(label).classList.remove("opcionPartidoPulsada");
			document.getElementById(label).classList.add("opcionPartidoNoPulsada");
		};

		/*const labelNoPulsado = opcion == "Si" ? "cambiosCapturaNo" : "cambiosCapturaSi";
		document.getElementById(labelNoPulsado).classList.remove("opcionPartidoPulsada");
		document.getElementById(labelNoPulsado).classList.add("opcionPartidoNoPulsada");*/

		// Acciones
		
	};

// PREPARAR JUGADORES Y BANQUILLOS
function crearJugador(opcion,equipo,dorsal,posicion,nombre) {
	var codigo = "";
	switch (opcion) {
		case "convocatoria":
			codigo += "			<div id='jugadorConvocadoL"+js.Local.Jugadores[i].Dorsal+"' class='w90 h10 centradoInlineXY jugadorNoConvocado' onclick=\"convocarJugador("+js.Local.Jugadores[i].Dorsal+",'"+textoPuestos(sessionStorage.getItem("Deporte"),js.Local.Jugadores[i].Posicion)+"','L')\">";
			codigo += "				<div class='dorsalConvocatoria local h80 centradoXY'>"+js.Local.Jugadores[i].Dorsal+"</div>";
			codigo += "				<div class='posicionConvocatoria h80 centradoXY'>"+textoPuestos(sessionStorage.getItem("Deporte"),js.Local.Jugadores[i].Posicion)+"</div>";
			codigo += "				<div class='nombreConvocatoria w70'>"+js.Local.Jugadores[i].NombreCompleto+"</div>";
			codigo += "			</div>";
			break;
		case "juego":
			const equipoCompleto = equipo == "L" ? "local" : "visitante";

			var codigo = "		<div id='jugador"+equipo+dorsal+"' class='centradoXY flexWrap jugador "+equipoCompleto+"' onclick=\"jugadorSeleccionado('"+equipoCompleto+"',"+dorsal+")\" ontouchstart=\"inicioPulsacion('jugador"+equipo+dorsal+"')\" ontouchend=\"finPulsacion('jugador"+equipo+dorsal+"')\">";
			if (posicion == "1") {
				codigo += "			<img class='imgCamiseta' src='img/Captura/camisetaPortero.png' alt='"+dorsal+"'>";
			}else{
				codigo += "			<img class='imgCamiseta' src='img/Captura/camisetaJugador.png' alt='"+dorsal+"'>";
			}
			codigo += "				<div id='sanciones"+equipo+dorsal+"' class='sumaExclusiones'></div>";  ////////////////////////////////// VER SI SE QUITA
			codigo += "				<div id='numeroDorsal"+equipo+dorsal+"' class='numeroDorsal'>";
			codigo += "					<label class='texto"+equipoCompleto+"'>"+dorsal+"</label>";
			codigo += "				</div>";
			codigo += "				<div id='exclusion"+equipo+dorsal+"' class='contadorExclusion'></div>";
			codigo += "			</div>";
	}
	return codigo;
};

function convocarJugador(jugador,posicion,equipo){
	var idJugador = "#"+"jugadorConvocado"+equipo+jugador;

	var labelDataConvocados = "totalConvocados"+equipo; // Número total de convocados
	var labelConvocatoria = "Convocatoria"+equipo; // Listado de jugadores convocados
	var convocatoriaMax = JSON.parse(sessionStorage.getItem("convocatoria")); // Máximo de convocados que puede haber

	var labelData = "Banquillo"+equipo; // Listado de jugadores en el banquillo (en la convocatoria inicial están todos en el banquillo)
	var data = sessionStorage.getItem(labelData);

	if (data) {
		var totalConvocados = parseInt(sessionStorage.getItem(labelDataConvocados));

		var dataArray = JSON.parse(data); // Convertir JSON en Array

		var contar = 0;
		for (var i = 0; i < dataArray.length; i++) {
			if(dataArray[i] == jugador) {	contar = i+1; }
		}

		if (totalConvocados !== parseInt(convocatoriaMax[1])) {
			document.getElementById(labelDataConvocados).style = "color:var(--color-texto)";
			if (contar == 0) {
				$(idJugador).removeClass("jugadorNoConvocado"); // Eliminar color
				$(idJugador).addClass("jugadorConvocado"); // Marcar con color

				dataArray.push(jugador);
				sessionStorage.setItem(labelData, JSON.stringify(dataArray));
				sessionStorage.setItem(labelConvocatoria, JSON.stringify(dataArray));

				totalConvocados++;
				document.getElementById(labelDataConvocados).innerHTML = totalConvocados;
				sessionStorage.setItem(labelDataConvocados,totalConvocados);
			}else{
				$(idJugador).removeClass("jugadorConvocado"); // Eliminar color
				$(idJugador).addClass("jugadorNoConvocado"); // Marcar con color

				dataArray.splice(contar-1,1);
				sessionStorage.setItem(labelData, JSON.stringify(dataArray));
				sessionStorage.setItem(labelConvocatoria, JSON.stringify(dataArray));

				totalConvocados--;
				document.getElementById(labelDataConvocados).innerHTML = totalConvocados;
				sessionStorage.setItem(labelDataConvocados,totalConvocados);
			}
		}else{
			document.getElementById(labelDataConvocados).style = "color:var(--color-corporativo-rosa)";
			if (contar !== 0) {
				document.getElementById(labelDataConvocados).style = "color:var(--color-texto)";
				$(idJugador).removeClass("jugadorConvocado"); // Eliminar color
				$(idJugador).addClass("jugadorNoConvocado"); // Marcar con color

				dataArray.splice(contar-1,1);
				sessionStorage.setItem(labelData, JSON.stringify(dataArray));
				sessionStorage.setItem(labelConvocatoria, JSON.stringify(dataArray));

				totalConvocados--;
				document.getElementById(labelDataConvocados).innerHTML = totalConvocados;
				sessionStorage.setItem(labelDataConvocados,totalConvocados);
			}
		}
	}else{
		document.getElementById(labelDataConvocados).style = "color:var(--color-texto)";
		$(idJugador).removeClass("jugadorNoConvocado"); // Eliminar color
		$(idJugador).addClass("jugadorConvocado"); // Marcar con color
		
		var arrayJugador = [];
		arrayJugador.push(jugador);
		sessionStorage.setItem(labelData, JSON.stringify(arrayJugador));

		document.getElementById(labelDataConvocados).innerHTML = "1";
		sessionStorage.setItem(labelDataConvocados,"1");
	}
};

function convocarTecnico(tecnico,equipo) {
	var idTecnico = "#"+"tecnicoConvocado"+equipo+tecnico;

	var labelData = "BanquilloTec"+equipo;
	var data = sessionStorage.getItem(labelData);

	if (data) {
		var dataArray = JSON.parse(data);

		var contar = 0;
		for (var i = 0; i < dataArray.length; i++) {
			if(dataArray[i] == tecnico) {	contar = i+1; }
		}

		if (contar == 0) {
			dataArray.push(tecnico);
			sessionStorage.setItem(labelData, JSON.stringify(dataArray));
			$(idTecnico).removeClass("jugadorNoConvocado"); // Eliminar color
		$(idTecnico).addClass("jugadorConvocado"); // Marcar con color
		}else{
			dataArray.splice(contar-1,1);
			sessionStorage.setItem(labelData, JSON.stringify(dataArray));
			$(idTecnico).removeClass("jugadorConvocado"); // Eliminar color
			$(idTecnico).addClass("jugadorNoConvocado"); // Marcar con color
		}

	}else{
		$(idTecnico).removeClass("jugadorNoConvocado"); // Eliminar color
		$(idTecnico).addClass("jugadorConvocado"); // Marcar con color

		var arrayTecnico = [];
		arrayTecnico.push(tecnico);
		sessionStorage.setItem(labelData, JSON.stringify(arrayTecnico));
	}
};

function guardarConvocatoria(equipo) {
	switch (equipo) {
		case "L":
			var origen = "localConvocatoria";
			var destino = "localPartido";
			break;
		case "V":
			var origen = "visitanteConvocatoria";
			var destino = "visitantePartido";
			break;
	}

	// Meter jugadores convocados en el partido
	const nombreData = "Banquillo"+equipo.toUpperCase();
	const labelDataConvocados = "totalConvocados"+equipo;
	const data = sessionStorage.getItem(nombreData);

	if (data) {
		document.getElementById(labelDataConvocados).style = "color:var(--color-texto)";

		var convocatoria = JSON.parse(data);
		var reglaConvocatoria = JSON.parse(sessionStorage.getItem("convocatoria"));

		if (convocatoria.length >= reglaConvocatoria[0]) {
			document.getElementById(origen).style = "transition: height 1s; height: 0;";
			document.getElementById(destino).style = "transition: height 1s ease 1s; height: 100%;";

			var idMando = "mandoCaptura"+equipo;
			document.getElementById(idMando).style = "height: 0%;";
			var idPantalla = "pantallacaptura"+equipo;
			document.getElementById(idPantalla).style = "height: 100%;";
			var idBanquillo = "banquillo"+equipo;
			document.getElementById(idBanquillo).style = "height: 35%;";

			guardarConvocatoriaBD(equipo);
			mostrarBanquilloInicial(equipo);
		}else{
			document.getElementById(labelDataConvocados).style = "color:var(--color-corporativo-rosa)";
		}			
	}else{
		document.getElementById(labelDataConvocados).style = "color:var(--color-corporativo-rosa)";
	}
};
	async function guardarConvocatoriaBD(equipo) {
		const equipoConvocado = "Convocatoria"+equipo;
		$.ajax ({
			url: "php/guardarConvocatoria.php",
	        type: 'POST',
	        data: {
	        	idPartido: sessionStorage.getItem("idPartido"),
	        	equipo: equipo,
	        	convocatoria: sessionStorage.getItem(equipoConvocado)
	        },
	        timeout: 10000,
			error: function() {guardarConvocatoriaBD(equipo);}
		});
	};
	function mostrarBanquilloInicial(equipo) {
		var labelBanquillo = "Banquillo"+equipo;
		var labelTitulares = "Titulares"+equipo;
		var labelStorage = "jugadores"+equipo;
		var js = JSON.parse(sessionStorage.getItem(labelStorage));
		var codigoBanquillo = "";
		var codigoTitular = "";

		// Mostrar jugadores en el banquillo
		if (sessionStorage.getItem(labelBanquillo) && sessionStorage.getItem(labelBanquillo).length > 0) {
			var convocatoriaArray = JSON.parse(sessionStorage.getItem(labelBanquillo)); // Convierte JSON en un array
			var listadoSinFiltrar = convocatoriaArray.sort(function(a,b){return a - b}); // Ordena los jugadores por número de dorsal
			var listadoConvocatoria = [...new Set(listadoSinFiltrar)]; // Filtrado para evitar duplicados

			if (equipo == "L") {
				var idBanquillo = "#banquilloL";
				var idTitulares = "#titularL";
				var equipoCompleto = "local";
			}else{
				var idBanquillo = "#banquilloV";
				var idTitulares = "#titularV";
				var equipoCompleto = "visitante";
			}

			for (var i = 0; i < listadoConvocatoria.length; i++) {
				codigoBanquillo += "							<div id='player"+equipo+listadoConvocatoria[i]+"' class='centradoXY flexWrap jugadorBanquillo "+equipoCompleto+"' draggable='true'>";
				for (var j = 0; j < js.length; j++) {
					if (listadoConvocatoria[i] == js[j].Dorsal) { //esto comprueba si está en el array de convocados
						if (js[j].Posicion == "1") {
							codigoBanquillo += "					<img class='imgCamiseta' src='img/Captura/camisetaPortero.png'>";
						}else{
							codigoBanquillo += "					<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
						}
						codigoBanquillo += "						<div id='sanciones"+equipo+listadoConvocatoria[i]+"' class='sumaExclusiones'></div>";
						codigoBanquillo += "						<div class='numeroDorsal' id='numeroDorsal"+equipo+listadoConvocatoria[i]+"'><label class='texto"+equipoCompleto+"'>"+listadoConvocatoria[i]+"</label></div>";
						codigoBanquillo += "						<div id='playerExclusion"+equipo+listadoConvocatoria[i]+"' class='contadorPlayerExclusion'></div>";
					}
				}
				codigoBanquillo += "							</div>";
			}
			$(idBanquillo).html(codigoBanquillo);

			// Mostrar jugadores en equipo titular
			if (sessionStorage.getItem(labelTitulares)) {
				var titularesSinFiltrar = JSON.parse(sessionStorage.getItem(labelTitulares)); // Convierte JSON en un array
				var titularesArray = [...new Set(titularesSinFiltrar)]; // Filtrado para evitar duplicados

				for (var i = 0; i < titularesArray.length; i++) {
					codigoTitular += "							<div id='player"+equipo+titularesArray[i]+"' class='centradoXY flexWrap jugadorTitular "+equipoCompleto+"' draggable='true'>";
					for (var j = 0; j < js.length; j++) {
						if (titularesArray[i] == js[j].Dorsal) { //esto comprueba si está en el array de convocados
							if (js[j].Posicion == "1") {
								codigoTitular += "					<img class='imgCamiseta' src='img/Captura/camisetaPortero.png'>";
							}else{
								codigoTitular += "					<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
							}
							codigoTitular += "						<div id='sanciones"+equipo+titularesArray[i]+"' class='sumaExclusiones'></div>";
							codigoTitular += "						<div class='numeroDorsal' id='numeroDorsal"+equipo+titularesArray[i]+"'><label class='texto"+equipoCompleto+"'>"+titularesArray[i]+"</label></div>";
							codigoTitular += "						<div id='playerExclusion"+equipo+titularesArray[i]+"' class='contadorExclusion'></div>";
						}
					}
					codigoTitular += "							</div>";
				}

				$(idTitulares).html(codigoTitular);
			}
		}
		// Convertir en zona para arrastrar y soltar
		cajasArrastre(1,equipo);
	};

function cajasArrastre(opcion,equipo) {
	//Definir variables
	var labelBanquillo = "banquillo"+equipo;
	var cajaBanquillo = document.getElementById(labelBanquillo);
	
	var labelTitular = "titular"+equipo;
	var cajaTitular = document.getElementById(labelTitular);

	var jugadorB;
	var jugadorT;
	var datoTransferido;

	//Opciones
	switch (opcion) {
		case 1: // Poner zonas para arrastrar
			var jugadoresBanquillo = document.getElementsByClassName("jugadorBanquillo"); //Enumera todos los jugadores que hay en el banquillo
			var jugadoresTitulares = document.getElementsByClassName("jugadorTitular"); //Enumera todos los jugadores que hay Titulares

			// Activar Eventos con mouse
			cajaTitular.addEventListener("dragover", (ev) => permitirSoltar(ev));
			cajaTitular.addEventListener("drop", (ev) => soltarTitular(ev));

			cajaBanquillo.addEventListener("dragover", (ev) => permitirSoltar(ev));
			cajaBanquillo.addEventListener("drop", (ev) => soltarBanquillo(ev));

			// Activar Eventos táctiles
			cajaTitular.addEventListener("touchmove", (ev) => permitirSoltar(ev));
			cajaTitular.addEventListener("touchend", (ev) => soltarBanquillo(ev));

		    cajaBanquillo.addEventListener("touchmove", (ev) => permitirSoltar(ev));
		    cajaBanquillo.addEventListener("touchend", (ev) => soltarTitular(ev));

			for (var i = 0; i < jugadoresBanquillo.length; i++) {
				jugadorB = jugadoresBanquillo[i];
				jugadorB.addEventListener("touchstart", iniciarArrastre, true);
				jugadorB.addEventListener("touchstart", iniciarArrastre, false);
				jugadorB.addEventListener("dragstart", iniciarArrastre, true);
				jugadorB.addEventListener("dragstart", iniciarArrastre, false);
			}
			for (var i = 0; i < jugadoresTitulares.length; i++) {
				jugadorT = jugadoresTitulares[i];
				jugadorT.addEventListener("touchstart", iniciarArrastre, true);
				jugadorT.addEventListener("touchstart", iniciarArrastre, false);
				jugadorT.addEventListener("dragstart", iniciarArrastre, true);
				jugadorT.addEventListener("dragstart", iniciarArrastre, false);
			}
			break;
		case 0: // Quitar zonas para arrastrar
			var labelId = "titular"+equipo;
			var labelId2 = "jugando"+equipo;

			var labelTitulares = "Titulares"+equipo;
			var data = sessionStorage.getItem(labelTitulares);
			if (data) {
				var arrayTitulares = JSON.parse(data);
				var codigo = "";
				var labelStorage = "jugadores"+equipo;
				var js = JSON.parse(sessionStorage.getItem(labelStorage));

				for (var j = 0; j < arrayTitulares.length; j++) {
					for (var i = 0; i < js.length; i++) {
						if (js[i].Dorsal == arrayTitulares[j]) {
							codigo += crearJugador("juego",equipo,arrayTitulares[j],js[i].Posicion);
						}
					}
				}
				$(document.getElementById(labelId2)).html(codigo);

				if (sessionStorage.getItem("minuto") == "00" && sessionStorage.getItem("segundo") == "00") {
					registroDatos("Alineación inicial","",equipo,sessionStorage.getItem(labelTitulares));
				}else{
					registroDatos("Cambio","",equipo,sessionStorage.getItem(labelTitulares));
				}
			}
			document.getElementById(labelId).classList.add("invisible");
			document.getElementById(labelId2).classList.remove("invisible");
			break;
	}
	mostrarSanciones(equipo);


	// Funciones generales
	function iniciarArrastre(ev) {
		if (ev.dataTransfer) {
			ev.dataTransfer.setData("idJugador",ev.target.id);
		}else{
			datoTransferido = ev.target.id;
		}
	};
	function permitirSoltar(ev) {
		ev.preventDefault();
	};
	function soltarTitular(ev) {
		if (cajaTitular.childElementCount < 7) {
			// Mostrar en pantalla el transpaso del jugador
			ev.preventDefault();
			const data = ev.dataTransfer ? ev.dataTransfer.getData("idJugador") : ev.target.id;

			if (data !== "banquilloL" && data !== "banquilloV") {
				cajaTitular.appendChild(document.getElementById(data));

				// Obtener datos del jugador cogido
				const dataSplit = data.split("player");
				const equipo = dataSplit[1][0];
				const jugador = parseInt(dataSplit[1].slice(1,3));

				// Quitar de banquillo
				const labelBanquillo = "Banquillo"+equipo;			
				const banquillo = JSON.parse(sessionStorage.getItem(labelBanquillo)); // Crear array con datos de Storage
				 // Orden para eliminar a jugador
				const index = banquillo.indexOf(jugador);
				if (banquillo !== -1) {
					banquillo.splice(index,1);
				}
				sessionStorage.setItem(labelBanquillo,JSON.stringify(banquillo)); // Volver a crear Storage

				// Poner en titular
				const labelTitulares = "Titulares"+equipo;
				const dataTitulares = sessionStorage.getItem(labelTitulares);
				if (dataTitulares) {
					const titulares = JSON.parse(dataTitulares); // Crear array con datos de JSON
					titulares.push(String(jugador)); // Añadir jugador seleccionado
					const titularesFiltrado = [...new Set(titulares)]; // Filtrado para evitar duplicados
					sessionStorage.setItem(labelTitulares, JSON.stringify(titularesFiltrado)); // Crear nuevo JSON con jugador seleccionado
				}else{
					const arrayJugador = [];
					arrayJugador.push(String(jugador));
					sessionStorage.setItem(labelTitulares, JSON.stringify(arrayJugador));
				}

				//Modificar clase de los jugadores
				document.getElementById(data).classList.remove("jugadorBanquillo");
				document.getElementById(data).classList.add("jugador");
			}

		}
	};
	function soltarBanquillo(ev) {
		ev.preventDefault();
		const data = ev.dataTransfer ? ev.dataTransfer.getData("idJugador") : ev.target.id;
		
		cajaBanquillo.appendChild(document.getElementById(data));
		
		// Obtener datos del jugador cogido
		const dataSplit = data.split("player");
		const equipo = dataSplit[1][0];
		const jugador = String(dataSplit[1].slice(1,3));

		// Quitar de titular
		const labelTitulares = "Titulares"+equipo;
		const titulares = JSON.parse(sessionStorage.getItem(labelTitulares)); // Crear array con datos de Storage
		const titularesNuevo = titulares.filter((player) => player !== jugador); // Orden para eliminar a jugador
		sessionStorage.setItem(labelTitulares,JSON.stringify(titularesNuevo)); // Volver a crear Storage

		// Poner en banquillo
		const labelBanquillo = "Banquillo"+equipo;
		const dataBanquillo = sessionStorage.getItem(labelBanquillo);
		if (dataBanquillo) {
			const banquillo = JSON.parse(dataBanquillo);
			banquillo.push(String(jugador));

			const banquilloFiltrado = [...new Set(banquillo)]; // Filtrado para evitar duplicados

			sessionStorage.setItem(labelBanquillo, JSON.stringify(banquilloFiltrado));
		}else{
			const arrayJugador = [];
			arrayJugador.push(String(jugador));
			sessionStorage.setItem(labelBanquillo, JSON.stringify(arrayJugador));
		}

		//Modificar clase de los jugadores
		document.getElementById(data).classList.remove("jugador");
		document.getElementById(data).classList.remove("jugadorTitular");
		document.getElementById(data).classList.add("jugadorBanquillo");
	};
};
	function mostrarBanquillo(equipo) {
		// Guardar datos del actual equipo titular
		const labelEquipoAnterior = "TitularesAntes"+equipo;
		const labelEquipoActual = "Titulares"+equipo;
		const equipoAnterior = sessionStorage.getItem(labelEquipoActual);
		sessionStorage.setItem(labelEquipoAnterior,equipoAnterior);

		const idMando = "mandoCaptura"+equipo;
		document.getElementById(idMando).style.height = "0";

		const idPantalla = "pantallacaptura"+equipo;
		document.getElementById(idPantalla).style.height = "100%";

		// Cambiar botón de cabecera
		var menu1 = "#botonCambio"+equipo;
		var menu2 = "#botonOKCambio"+equipo;
		$(menu1).addClass("invisible");
		$(menu2).removeClass("invisible");

		// Cambiar cajas de jugadores
		var menu1 = "#banquillo"+equipo;
		var menu2 = "#titular"+equipo;
		var menu3 = "#jugando"+equipo;
		$(menu2).removeClass("invisible");
		$(menu3).addClass("invisible");

		const idBanquillo = "banquillo"+equipo;
		document.getElementById(idBanquillo).style.height = "36%";
		$(menu1).removeClass("invisible");

		const labelId = "titular"+equipo;
		const labelId2 = "jugando"+equipo;
		document.getElementById(labelId2).classList.add("invisible");
		document.getElementById(labelId).classList.remove("invisible");
	};
	function ocultarBanquillo(equipo) {
		const idBanquillo = "banquillo"+equipo;
		document.getElementById(idBanquillo).style = "height: 0;";

		const idPantalla = "pantallacaptura"+equipo;
		const alturaPantallaCaptura = sessionStorage.getItem("Calidad") == "Min" ? "75%" : "65%";
		document.getElementById(idPantalla).style.height = alturaPantallaCaptura;

		const labelTitular = "titular"+equipo;
		document.getElementById(labelTitular).classList.add("invisible");

		// Cambiar botón de cabecera
		var menu1 = "#botonCambio"+equipo;
		var menu2 = "#botonOKCambio"+equipo;		
		$(menu2).addClass("invisible");
		$(menu1).removeClass("invisible");

		// Cambiar cajas de jugadores
		var menu1 = "#banquillo"+equipo;
		var menu2 = "#titular"+equipo;
		var menu3 = "#jugando"+equipo;
		$(menu3).removeClass("invisible");
		$(menu1).addClass("invisible");
		$(menu2).addClass("invisible");

		const idMando = "mandoCaptura"+equipo;
		const alturaModoCaptura = sessionStorage.getItem("Calidad") == "Min" ? "20%" : "33%";
		document.getElementById(idMando).style.height = alturaModoCaptura;

		guardarAlineacion(equipo);
		cajasArrastre(0,equipo);
	};

// ACCIONES DEL PARTIDO
function sancionBanquillo(equipo) {
	// Abrir banquillo
	const idMando = "mandoCaptura"+equipo;
	document.getElementById(idMando).style.hei = "0";

	const idPantalla = "pantallacaptura"+equipo;
	document.getElementById(idPantalla).style.hei = "100%";

	// Cambiar botón de cabecera
	var menu1 = "#botonCambio"+equipo;
	var menu2 = "#botonOKSancionBanquillo"+equipo;
	$(menu1).addClass("invisible");
	$(menu2).removeClass("invisible");

	// Cambiar cajas de jugadores
	var menu1 = "#banquillo"+equipo;
	var menu2 = "#titular"+equipo;
	var menu3 = "#jugando"+equipo;
	var idBanquillo = "banquilloSancion"+equipo;
	var menu4 = "#"+idBanquillo;
	$(menu1).addClass("invisible");
	$(menu2).addClass("invisible");
	$(menu3).addClass("invisible");
	$(menu4).removeClass("invisible");

	document.getElementById(idBanquillo).style = "height: 100%; padding-top: 14%;";

	// Mostrar banquillo y cuerpo técnico
	const labelBanquillo = "Banquillo"+equipo;
	const banquillo = JSON.parse(sessionStorage.getItem(labelBanquillo)).sort(function(a,b){return a-b}); // array ordenado de menor a mayor
	const labelEquipo = "jugadores"+equipo;
	const jugadores = JSON.parse(sessionStorage.getItem(labelEquipo));

	const equipoCompleto = equipo == "L" ? "local" : "visitante";

	var datosHtml = "";
	for (var i = 0; i < banquillo.length; i++) {
		datosHtml += "									<div class='w90 h15 spaceAroundXY'>";
		datosHtml += "										<div id='sancionado"+equipo+banquillo[i]+"' class='centradoXY flexWrap jugadorBanquillo "+equipoCompleto+"'>";
		for (var j = 0; j < jugadores.length; j++) {
			if (banquillo[i] == jugadores[j].Dorsal) {
				if (jugadores[j].Posicion == "1") {
					datosHtml += "								<img class='imgCamiseta' src='img/Captura/camisetaPortero.png'>";
				}else{
					datosHtml += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
				}
				datosHtml += "									<div class='numeroDorsal' id='numeroDorsal"+equipo+banquillo[i]+"'><label class='texto"+equipoCompleto+"'>"+banquillo[i]+"</label></div>";
			}
		}
		datosHtml += "										</div>";
		
		const labelSanciones = "sancionesTotales"+equipo;
		const sancionados = sessionStorage.getItem(labelSanciones) ? JSON.parse(sessionStorage.getItem(labelSanciones)) : {}; // Visualizar sanciones acumuladas

		for (var j = 0; j < jugadores.length; j++) {
			if (jugadores[j].Dorsal == banquillo[i]) {
				var tAmarilla = 0;
				var exclusiones = 0;
				var tRoja = 0;
				var tAzul = 0;
				for (var k = 0; k < sancionados.length; k++) {
					if (sancionados[k][0] == banquillo[i]) {
						var tAmarilla = parseInt(sancionados[k][1]);
						var exclusiones = parseInt(sancionados[k][2]);
						var tRoja = parseInt(sancionados[k][3]);
						var tAzul = parseInt(sancionados[k][4]);
					}
				}
				if (exclusiones > 2 || tRoja > 0 || tAzul > 0) {
					datosHtml += "							<label class='w80 centradoXY'>Expulsión por sanción</label>";
				}else{
					datosHtml += "							<div class='w25 h100 centradoXY'><img class='h80' src='img/Captura/dosMinutos4.png' onclick=\"aplicarSancion('Exclusion','3','"+equipo+"',"+banquillo[i]+"); cerrarBanquillo(1,'"+equipo+"',"+jugadores[j].ID_Jugador+","+banquillo[i]+")\"><span style='font-size: .5em; padding-top: 50%'>"+exclusiones+"</span></div>";
					if (tAmarilla > 0) {
						datosHtml += "						<img class='h80' src='img/Captura/tarjetaAmarilla.png' style='filter: opacity(.4) blur(2px)'>";
					}else{
						datosHtml += "						<img class='h80' src='img/Captura/tarjetaAmarilla.png' onclick=\"aplicarSancion('TAmarilla','3','"+equipo+"',"+banquillo[i]+"); cerrarBanquillo(2,'"+equipo+"',"+jugadores[j].ID_Jugador+","+banquillo[i]+")\">";
					}
					datosHtml += "							<img class='h80' src='img/Captura/tarjetaRoja.png' onclick=\"aplicarSancion('TRoja','3','"+equipo+"',"+banquillo[i]+"); cerrarBanquillo(3,'"+equipo+"',"+jugadores[j].ID_Jugador+","+banquillo[i]+")\">";
					datosHtml += "							<img class='h80' src='img/Captura/tarjetaAzul.png' onclick=\"aplicarSancion('TAzul','3','"+equipo+"',"+banquillo[i]+"); cerrarBanquillo(4,'"+equipo+"',"+jugadores[j].ID_Jugador+","+banquillo[i]+")\">";
				}
			}
		}
		datosHtml += "									</div>";
	}
	document.getElementById(idBanquillo).innerHTML = datosHtml;
};
	function cerrarBanquillo(sancion,equipo,idSancionado,dorsal) {
		// Cerrar banquillo
		const idMando = "mandoCaptura"+equipo;
		document.getElementById(idMando).style = "transition: height .5s; height: 33%;";

		const idPantalla = "pantallacaptura"+equipo;
		document.getElementById(idPantalla).style = "transition: height .5s ease; height: 65%;";

		// Cambiar botón de cabecera
		const menu1 = "#botonCambio"+equipo;
		const menu2 = "#botonOKSancionBanquillo"+equipo;
		$(menu1).removeClass("invisible");
		$(menu2).addClass("invisible");

		// Cambiar cajas de jugadores
		const label1 = "#banquillo"+equipo;
		const label2 = "#titular"+equipo;
		const labelJugando = "jugando"+equipo;
		const label3 = "#"+labelJugando;
		const label4 = "#banquilloSancion"+equipo;
		$(label1).addClass("invisible");
		$(label2).addClass("invisible");
		$(label3).removeClass("invisible");
		$(label4).addClass("invisible");
		document.getElementById(labelJugando).style = "transition: height .5s ease; height: 80%;";

		// Registrar datos
		registroDatos("Sancion Banquillo",dorsal,equipo,sancion);
	};

function avisoPasivo(equipo) {
	const label = "avisoPasivo"+equipo;
	const boton = "botonAvisoPasivo"+equipo;

	if (sessionStorage.getItem(label)) {
		document.getElementById(boton).classList.remove("botonActivo");
		sessionStorage.removeItem(label);
	}else{
		document.getElementById(boton).classList.add("botonActivo");
		sessionStorage.setItem(label,"Si");
		guardarPasivo("Aviso Pasivo", equipo)
		registroDatos("Aviso Pasivo", equipo);
	}
};
	function sancionPasivo(equipo) {
		//Quita el aviso de pasivo si esta activo
		const boton = "botonAvisoPasivo"+equipo;
		document.getElementById(boton).classList.remove("botonActivo");
		const label = "avisoPasivo"+equipo;
		sessionStorage.removeItem(label);
		guardarPasivo("Sancion Pasivo", equipo);
		registroDatos("Sancion Pasivo", equipo);
	};
	function eliminarPasivo(equipo) {
		const label = "avisoPasivo"+equipo;
		const boton = "botonAvisoPasivo"+equipo;

		if (sessionStorage.getItem(label)) {
			document.getElementById(boton).classList.remove("botonActivo");
			sessionStorage.removeItem(label);
			guardarPasivo("Aviso Pasivo Cancelado", equipo);
			registroDatos("Aviso Pasivo Cancelado", equipo);	
		}
	};

function porteriaVacia(equipo) {
	const label = "porteriaVacia"+equipo;
	const boton = "botonPorteriaVacia"+equipo;
	const botonMin = "botonPorteriaVaciaMin"+equipo;
	const labelStorage = "Mostrar "+equipo;

	if (sessionStorage.getItem(label) && sessionStorage.getItem(label) == "Si") {
		document.getElementById(boton).classList.remove("botonActivo");
		document.getElementById(botonMin).classList.remove("botonActivo");
		sessionStorage.setItem(label,"No");
		guardarPorteriaVacia(1,equipo);
		registroDatos("Porteria", equipo);
	}else{
		document.getElementById(boton).classList.add("botonActivo");
		document.getElementById(botonMin).classList.add("botonActivo");
		sessionStorage.setItem(label,"Si");
		guardarPorteriaVacia(2,equipo);
		registroDatos("Porteria Vacia", equipo);
	}

	if (sessionStorage.getItem(labelStorage) == "Si") {
		mostrarBanquillo(equipo);
	}
};

// Función para seleccionar las formaciones en ataque y defensa
function cambiarFormacion(equipo) {
	const labelPosicion = "Posicion"+equipo;

	if (sessionStorage.getItem(labelPosicion)) {
		var posicionFormacion = sessionStorage.getItem(labelPosicion);
		var labelFormacion = "Formacion"+posicionFormacion+equipo;

		if (sessionStorage.getItem(labelFormacion)) {
			if (posicionFormacion == "Def") {
				var arrayFormaciones = 5;
			}else{
				var arrayFormaciones = 2;
			}

			if (parseInt(sessionStorage.getItem(labelFormacion)) < arrayFormaciones) {
				var numero = parseInt(sessionStorage.getItem(labelFormacion)) + 1;
			}else{
				var numero = 0;
			}
			sessionStorage.setItem(labelFormacion,numero);
		}else{
			sessionStorage.setItem(labelFormacion,"0");
		}
		asignarTactica(equipo,posicionFormacion);
	}else{
		var posicionFormacion = 0;
		var numero = 0;
	}

	// Guardar hora de cambio de táctica
	sessionStorage.setItem("minutoComprobacion",sessionStorage.getItem("minuto"));
	sessionStorage.setItem("segundoComprobacion",sessionStorage.getItem("segundo"));	
	setTimeout(function(){guardarTactica(posicionFormacion,equipo,numero,null,null);},3100); // Ejecutar después de 3 segundos
};
	function asignarTactica(equipo,estado) {
		if (estado == "Def") {	var arrayFormaciones = Array("5-1","6-0","4-2","3-3","3-2-1","p-p");
		}else{	var arrayFormaciones = Array("3-3A","3-3B","2-4");	}

		var labelFormacion = "Formacion"+estado+equipo;

		if (sessionStorage.getItem(labelFormacion)) {
			var numero = sessionStorage.getItem(labelFormacion);
		}else{
		 	var numero = 0;
		 	sessionStorage.setItem(labelFormacion,"0");
		}
		var archivo = "img/Captura/"+estado+" "+arrayFormaciones[numero]+".png";
		
		var id = "botonFormacion"+equipo;
		document.getElementById(id).src = archivo;
	};

// Cambiar entre modo de entrada de datos básica y completa
function cambiarModo() {
	if (sessionStorage.getItem("ModoDatos") == "Sencillo") {
		document.getElementById("logoHD").src = "img/Captura/completo.png";
		$(".opcionesHD").show();
		sessionStorage.setItem("ModoDatos","Completo");
	}else {
		document.getElementById("logoHD").src = "img/Captura/simple.png";
		$(".opcionesHD").hide();
		sessionStorage.setItem("ModoDatos","Sencillo");
	}
};

// Pantalla de opciones inicial
function ventanaInicial() {
	// Asignar pantalla inicial
	$('#pantallaTiro').hide();
	$('#opcionesTiro').hide();
	$("#opcionesPenalti").hide();
	$('#opcionesAtaque').hide();
	$('#opcionesDefensa').hide();
	$('#opcionesJugador').hide();
	$('#opcionesDefecto').show();
	$('#pantallaEquipos').show();

	// Eliminar jugador seleccionado
	$('.jugador').removeClass('seleccionado');
	$('.jugador').removeClass('seleccionadoAntiguo');
	
	// Olvidar jugador y equipo seleccionado
	sessionStorage.removeItem("equipoActivo");
	sessionStorage.removeItem("jugadorActivo");
	sessionStorage.removeItem("equipoAntiguo");
	sessionStorage.removeItem("jugadorAntiguo");
};

// Función para mostrar los tiempos muertos restantes a cada equipo
function contadorTM(equipo) {
	if (equipo) {
		// Leer cuántos hay ahora en cada equipo
		var local = sessionStorage.getItem("tiempoMuertoLocal");
		var visitante = sessionStorage.getItem("tiempoMuertoVisitante");

		if (equipo == "local" && local == "0" || equipo == "visitante" && visitante == "0") {
		}else {
			// Restar 
			if (equipo == "local") {
				local = parseInt(local) - 1;
			}else {
				visitante = parseInt(visitante) - 1;
			}
		}
	}else {
		var local = 3; // Contador local
		var visitante = 3; // Contador visitante
	}

	sessionStorage.setItem("tiempoMuertoLocal",local);
	sessionStorage.setItem("tiempoMuertoVisitante",visitante);

	var imprimirL = "";
	var imprimirV = "";

	for (var i = 0; i < local; i++) {
		imprimirL += "<img class='h100' src='img/Captura/TM.png'>";
	}

	for (var i = 0; i < visitante; i++) {
		imprimirV += "<img class='h100' src='img/Captura/TM.png'>";
	}

	$("#tiempoMuertoLocal").html(imprimirL);
	$("#tiempoMuertoVisitante").html(imprimirV);
};

// Función para determinar al jugador activo
function jugadorSeleccionado(equipo,dorsal) {
	if (equipo == "local") {
		var equipo = "L";
		var equipo2 = "V";
	}else {
		var equipo = "V";
		var equipo2 = "L";
	}

	// Asignar equipo y jugador seleccionado
		var jugadorClic = '#jugador'+equipo+dorsal;

	// Asignar jugador defensor
	if (sessionStorage.getItem("Seleccionar defensa") == "Si") {
		if (sessionStorage.getItem("disuasion")) {
			var tipo = "Disuasion";
			var accion = sessionStorage.getItem("disuasion");
			if (accion == "En el pase") {
				var codigoTipo = 2;
				var codigoOpcion = 2;
			}else{
				var codigoTipo = 3;
				var codigoOpcion = 2;
			}
		}else {
			var tipo = "Robo";
			var accion = "En el pase";
			var codigoTipo = 4;
			var codigoOpcion = 0;
		}
		//jugadores que hacen el pase
		const jugadorEnviaPase = sessionStorage.getItem("jugadorEnviaPase");
		const equipoEnviaPase = sessionStorage.getItem("equipoEnviaPase");
		const jugadorRecibePase = sessionStorage.getItem("jugadorRecibePase");

		//guardar nuevo jugador activo
		sessionStorage.setItem("jugadorActivo",dorsal);
		sessionStorage.setItem("equipoActivo",equipo);

		//eliminar datos antiguos			
		sessionStorage.removeItem("equipoAntiguo");
		sessionStorage.removeItem("jugadorAntiguo");
		sessionStorage.removeItem("jugadorEnviaPase");
		sessionStorage.removeItem("jugadorRecibePase");
		sessionStorage.removeItem("equipoEnviaPase");
		sessionStorage.removeItem("Seleccionar defensa");
		sessionStorage.removeItem("disuasion");

		//Cambiar de pantalla
		$('#opcionesDefecto').hide();
		$('#opcionesPenalti').hide();
		$('#opcionesJugador').show();

		//Crear datos
		guardarPase(codigoTipo,codigoOpcion,equipoEnviaPase,jugadorEnviaPase,jugadorRecibePase,sessionStorage.getItem("equipoActivo"),sessionStorage.getItem("jugadorActivo"),sessionStorage.getItem("Tipo pase"));
		registroDatos(tipo,jugadorEnviaPase,equipoEnviaPase,jugadorRecibePase,equipoEnviaPase,dorsal,equipo,accion);
	}else {
		// 2. Tomar decisiones según el jugador seleccionado
			if (sessionStorage.getItem("equipoActivo")) { // No había ningún jugador seleccionado (inicio de jugada)
				if (sessionStorage.getItem("equipoActivo") === equipo) { // Si equipo anterior y equipo actual son iguales ==> pantalla de pases (acciones de ataque)
					$('#opcionesDefecto').hide();
					$('#opcionesJugador').hide();
					$('#opcionesDefensa').hide();
					$('#opcionesAtaque').show();
					// Determinar si está atacando o defendiendo
					var labelEstado = "Posicion"+equipo;
					sessionStorage.setItem(labelEstado,"Atq");
					labelEstado = "Posicion"+equipo2;
					sessionStorage.setItem(labelEstado,"Def");
					asignarTactica(equipo,"Atq");
					asignarTactica(equipo2,"Def");
				}else { // Si equipo anterior y equipo actual son distintos ==> pantalla de acción defensiva
					$('#opcionesDefecto').hide();
					$('#opcionesJugador').hide();
					$('#opcionesAtaque').hide();
					$('#opcionesDefensa').show();
					// Determinar si está atacando o defendiendo
					var labelEstado = "Posicion"+equipo;
					sessionStorage.setItem(labelEstado,"Def");
					labelEstado = "Posicion"+equipo2;
					sessionStorage.setItem(labelEstado,"Atq");
					asignarTactica(equipo,"Def");
					asignarTactica(equipo2,"Atq");
					eliminarPasivo(equipo);
				}
			}else { // Si ya se había seleccionado un jugador anteriormente (continuación de jugada)
				$('#opcionesDefecto').hide();
				$('#opcionesJugador').show();
			}
			
			// Guardar jugador anterior
			sessionStorage.setItem("jugadorAntiguo",sessionStorage.getItem("jugadorActivo"));
			sessionStorage.setItem("equipoAntiguo",sessionStorage.getItem("equipoActivo"));
			// Guardar jugador y equipo seleccionado en sessionStorage
			sessionStorage.setItem("jugadorActivo",dorsal);
			sessionStorage.setItem("equipoActivo",equipo);
	}
	// Cambiar colores de iconos de jugadores seleccionado y ya no seleccionado
	$('.jugador').removeClass('seleccionado');
	$(jugadorClic).addClass('seleccionado');
	// Cambiar color a jugador antes seleccionado
	const jugadorAntiguo = '#jugador'+sessionStorage.getItem("equipoAntiguo")+sessionStorage.getItem("jugadorAntiguo");
	$('.jugador').removeClass('seleccionadoAntiguo');
	$(jugadorAntiguo).addClass('seleccionadoAntiguo');
};

// Funciones de TIRO
// Si se le da al botón de tiro se abre la pantalla de tiro (se guarda dorsal y equipo)
function abrirVentanaTiro() {
	//Establecer valores por defecto
	sessionStorage.setItem("Tipo tiro","Clasico");
	sessionStorage.setItem("Tipo parada","Despeje");
	$("#botonPorteroBlocaje").removeClass("seleccionado");
	$("#botonPorteroDespeje").addClass("seleccionado");
	$("#botonZonaManos").removeClass("seleccionado");
	$("#botonZonaPies").removeClass("seleccionado");
	$("#botonZonaCuerpo").removeClass("seleccionado");
	sessionStorage.removeItem("Zona Parada");

	// Preconfigurar pantallas
	document.getElementById("pantallaTiro").style.height = "60%";
	document.getElementById("tiroDentro").style.left = "28%";
	document.getElementById("tiroDentro").style.right = "28%";
	$("#fondoLateral div").width("50%");

	//Cambiar pantallas
	$('#pantallaEquipos').hide();
	$('#pantallaZonaTiro').show();
	document.getElementById("pantallaTiro").style.height = "60%";
	$('#pantallaTiro').show();
	$('#opcionesDefecto').hide();
	$('#opcionesJugador').hide();
	$('#opcionesTiro').show();

	// Si la portería está vacía
	const equipo = sessionStorage.getItem("equipoActivo") == "L" ? "V" : "L";
	const labelPorteriaVacia = "porteriaVacia"+equipo;
	if (sessionStorage.getItem(labelPorteriaVacia) == "Si") {
		for (var i = 1; i < 4; i++) {
			var array = Array("A","B","C");
			for (var j = 0; j < array.length; j++) {
				var label = "#error"+array[j]+i;
				$(label).hide();
			}
		}
		$("#botonesTipoParada").hide();
	}else{
		for (var i = 1; i < 4; i++) {
			var array = Array("A","B","C");
			for (var j = 0; j < array.length; j++) {
				var label = "#error"+array[j]+i;
				$(label).show();
			}
		}
		$("#botonesTipoParada").show();
	}

	// Quitar botones
	const arrayZonas = ["1","2","3","4","5","6","8","9","10"];
	for (var i = arrayZonas.length - 1; i >= 0; i--) {
		var label = "pantallaZonaTiroZona"+arrayZonas[i];
		document.getElementById(label).style.filter = null;
	}

	// Marcar zona de tiro según demarcacion por defecto del tirador
	const labelJugadores = "jugadores"+sessionStorage.getItem("equipoActivo");
	const arrayJugadores = JSON.parse(sessionStorage.getItem(labelJugadores));
	for (var i = 0; i < arrayJugadores.length; i++) {
		if (arrayJugadores[i].Dorsal === sessionStorage.getItem("jugadorActivo")) {
			var posicion = arrayJugadores[i].Posicion;
		}
	}
	switch(posicion) {
		case "1":
			marcarZonaCampo(10);
			break;
		case "2":
			marcarZonaCampo(5);
			break;
		case "3":
			marcarZonaCampo(1);
			break;
		case "4":
			marcarZonaCampo(9);
			break;
		case "5":
			marcarZonaCampo(6);
			break;
		case "6":
			marcarZonaCampo(8);
			break;
		case "7":
			marcarZonaCampo(3);
			break;
	}
};
	function tipoTiro(evento,tipo) {
		sessionStorage.setItem("Tipo tiro",tipo);
		botonTipoSeleccionado(evento,tipo);
	};
	function botonPoste(evento) {
		switch (evento) {
			case "palo": //1 clic
				sessionStorage.setItem("Tiro al palo", "Si");
				break;

			case "dentro": //doble clic
				// Ver tirador
				const jugador = sessionStorage.getItem("jugadorActivo");
				const equipo = sessionStorage.getItem("equipoActivo");
				registroDatos("Tiro al palo",equipo,jugador)

				// Olvidar jugada anterior
				guardarPosesion(sessionStorage.getItem("equipoAntiguo"));
				sessionStorage.removeItem("jugadorAntiguo");
				sessionStorage.removeItem("jugadorActivo");
				sessionStorage.removeItem("equipoAntiguo");
				sessionStorage.removeItem("equipoActivo");

				// Eliminar storage de palo
				sessionStorage.removeItem("Tiro al palo");

				// Cambiar de pantalla para seleccionar al jugador que recoge la pelota
				$("#pantallaTiro").hide();
				$("#opcionesTiro").hide();
				$("#pantallaEquipos").show();
				$("#opcionesDefecto").show();

				// Deseleccionar a jugadores
				$(".jugador").removeClass("seleccionado");
				$(".jugador").removeClass("seleccionadoAntiguo");
				break;
		}
	};
	function tiroFuera(zonaPorteria,equipoActivo) {
		const equipoAtq = equipoActivo ? equipoActivo : sessionStorage.getItem("equipoActivo");
		const tirador = sessionStorage.getItem("jugadorActivo");
		const pasador = sessionStorage.getItem("jugadorAntiguo");
		const equipoDef = equipoAtq == "L" ? "V" : "L";

		const zonaCampo = sessionStorage.getItem("Zona Tiro");

		const labelPortero = "Portero"+equipoDef;
		const portero = sessionStorage.getItem(labelPortero);
		
		
		// Si es penalti
		if (sessionStorage.getItem("Penalti Portero") && sessionStorage.getItem("Penalti Tirador")) {
			portero = sessionStorage.getItem("Penalti Portero");
			tirador = sessionStorage.getItem("Penalti Tirador");
			pasador = "";
			zonaCampo = 7;
		}

		// Opciones
		const opcion = sessionStorage.getItem("Tiro al palo") ? sessionStorage.getItem("Tiro al palo") : 0;
		const tipoTiro = sessionStorage.getItem("Tipo tiro") ? sessionStorage.getItem("Tipo tiro") : "0";

		guardarTiro(1,4,opcion,tirador,equipoAtq,pasador,equipoDef,portero,tipoTiro,zonaCampo,zonaPorteria);
		registroDatos("Fuera",tirador,equipoAtq,pasador,equipoDef,portero);

		//Eliminar jugador seleccionado
		$(".jugador").removeClass("seleccionado");
		$(".jugador").removeClass("seleccionadoAntiguo");

		eliminarPasivo(equipoAtq);
		guardarPosesion(equipoDef);

		//Cambio de pantalla
		$("#pantallaTiro").hide();
		$("#pantallaEquipos").show();
		$("#opcionesTiro").hide();
		$("#opcionesPenalti").hide();
		if (tipoParada == "Despeje") {
			$("#opcionesDefecto").show();
			sessionStorage.removeItem("jugadorActivo");
			sessionStorage.removeItem("equipoActivo");
			sessionStorage.removeItem("jugadorAntiguo");
			sessionStorage.removeItem("equipoAntiguo");
		}else{
			$("#opcionesJugador").show();
			sessionStorage.setItem("jugadorActivo",portero);
			sessionStorage.setItem("equipoActivo",equipoDef);
			sessionStorage.removeItem("jugadorAntiguo");
			sessionStorage.removeItem("equipoAntiguo");
			const seleccionarPortero = "#jugador"+equipoDef+portero;
			$(seleccionarPortero).addClass("seleccionado");
		}
	};
	function marcarZonaCampo(zona) {
		// Quitar botones
		const array = ["1","2","3","4","5","6","8","9","10"];
		for (var i = array.length - 1; i >= 0; i--) {
			var label = "pantallaZonaTiroZona"+array[i];
			document.getElementById(label).style.filter = null;
		}
		const labelZona = "pantallaZonaTiroZona"+zona;
		// Poner botón seleccionado
		document.getElementById(labelZona).style.filter = "brightness(5)";

		sessionStorage.setItem("Zona Tiro",zona);
	};

// Opciones de parada
function accionParada(zonaPorteria,equipoActivo) {
	const tipoParada = sessionStorage.getItem("Tipo parada"); //despeje, blocaje
	const zonaParada = sessionStorage.getItem("Zona Parada"); //manos, pies, cuerpo

	const equipoAtq = equipoActivo ? equipoActivo : sessionStorage.getItem("equipoActivo");
	let tirador = sessionStorage.getItem("jugadorActivo");
	let pasador = sessionStorage.getItem("jugadorAntiguo");
	const equipoDef = equipoAtq == "L" ? "V" : "L";

	let zonaCampo = sessionStorage.getItem("Zona Tiro");

	const labelPortero = "Portero"+equipoDef;
	let portero = sessionStorage.getItem(labelPortero);
	
	// Si es penalti
	if (sessionStorage.getItem("Penalti Portero") && sessionStorage.getItem("Penalti Tirador")) {
		portero = sessionStorage.getItem("Penalti Portero");
		tirador = sessionStorage.getItem("Penalti Tirador");
		pasador = "";
		zonaCampo = 7;
	}

	// Opciones
	const opcion = sessionStorage.getItem("Tiro al palo") ? sessionStorage.getItem("Tiro al palo") : 0;
	const tipoTiro = sessionStorage.getItem("Tipo tiro") ? sessionStorage.getItem("Tipo tiro") : "0";

	guardarTiro(1,2,opcion,equipoAtq,tirador,equipoDef,pasador,equipoDef,portero,tipoTiro,zonaCampo,zonaPorteria,tipoParada,zonaParada);
	registroDatos("Parada",tirador,equipoAtq,pasador,equipoDef,portero,tipoParada,zonaParada);

	//Eliminar jugador seleccionado
	$(".jugador").removeClass("seleccionado");
	$(".jugador").removeClass("seleccionadoAntiguo");

	eliminarPasivo(equipoAtq);
	guardarPosesion(equipoDef);

	//Cambio de pantalla
	$("#pantallaTiro").hide();
	$("#pantallaEquipos").show();
	$("#opcionesTiro").hide();
	$("#opcionesPenalti").hide();
	if (tipoParada == "Despeje") {
		$("#opcionesDefecto").show();
		sessionStorage.removeItem("jugadorActivo");
		sessionStorage.removeItem("equipoActivo");
		sessionStorage.removeItem("jugadorAntiguo");
		sessionStorage.removeItem("equipoAntiguo");
	}else{
		$("#opcionesJugador").show();
		sessionStorage.setItem("jugadorActivo",portero);
		sessionStorage.setItem("equipoActivo",equipoDef);
		sessionStorage.removeItem("jugadorAntiguo");
		sessionStorage.removeItem("equipoAntiguo");
		var seleccionarPortero = "#jugador"+equipoDef+portero;
		$(seleccionarPortero).addClass("seleccionado");
	}
};
	function tipoParada(evento,tipo) {
		sessionStorage.setItem("Tipo parada",tipo);
		botonTipoSeleccionado(evento,tipo);

		if (evento == "PenaltiParada") {
			tipoCuerpoParada("ZonaParadaPenalti","Manos");
		}else{
			tipoCuerpoParada("ZonaParada","Manos");
		}
	};
	function tipoCuerpoParada(evento,tipo) {
		sessionStorage.setItem("Zona Parada",tipo);
		botonTipoSeleccionado(evento,tipo);
	};
	function tipoDistanciaParada(evento,tipo) {
		sessionStorage.setItem("Distancia Parada",tipo);
		botonTipoSeleccionado(evento,tipo);
	};

// Funciones de PENALTI
function accionPenalti() {
	// Preconfigurar pantallas
	document.getElementById("pantallaTiro").style.height = "100%";
	document.getElementById("tiroDentro").style.left = "20%";
	document.getElementById("tiroDentro").style.right = "20%";
	$("#fondoLateral div").width("110%");

	// Cambiar pantallas
	$('#pantallaZonaTiro').hide();
	$("#pantallaEquipos").hide();
	$("#pantallaTiro").show();

	$("#opcionesDefensa").hide();
	$("#opcionesPenalti").show();

	if (sessionStorage.getItem("equipoAntiguo") == "L") {
		var labelTirador = "local";
		var labelPortero = "visitante";
	}else{
		var labelTirador = "visitante";
		var labelPortero = "local";
	}
	document.getElementById("botonTiradorPenalti").classList.remove("local","visitante");
	document.getElementById("botonPorteroPenalti").classList.remove("local","visitante");
	document.getElementById("botonTiradorPenalti").classList.add(labelTirador);
	document.getElementById("botonPorteroPenalti").classList.add(labelPortero);

	guardarPosesion(sessionStorage.getItem("equipoAntiguo"));
	// Guardar acción
	aplicarSancion("Penalti",2,sessionStorage.getItem("equipoActivo"),sessionStorage.getItem("jugadorActivo"),sessionStorage.getItem("equipoAntiguo"),sessionStorage.getItem("jugadorAntiguo"));
	registroDatos("Penalti",sessionStorage.getItem("jugadorActivo"),sessionStorage.getItem("equipoActivo"),sessionStorage.getItem("jugadorAntiguo"),sessionStorage.getItem("equipoAntiguo"));
};
function seleccionarPenalti(opcion) {
	if (opcion == 0) {
		document.getElementById("botonTiradorPenalti").classList.remove("abrirCajaPenalti");
		document.getElementById("botonPorteroPenalti").classList.remove("abrirCajaPenalti");
		document.getElementById("botonSelecTirador").classList.remove("invisible");
		document.getElementById("botonSelecPortero").classList.remove("invisible");
		document.getElementById("botonSelecCancelar").classList.add("invisible");
		var htmlTirador = "<div class='w100 h100 centradoXY flexWrap'><div id='tiradorPenalti' class='h50 centradoXY circuloPenalti'>"+sessionStorage.getItem("Penalti Tirador")+"</div><label>Tirador</label></div>";
		var htmlPortero = "<div class='w100 h100 centradoXY flexWrap'><div id='porteroPenalti' class='h50 centradoXY circuloPenalti'>"+sessionStorage.getItem("Penalti Portero")+"</div><label>Portero</label></div>";
		document.getElementById("botonTiradorPenalti").innerHTML = htmlTirador;
		document.getElementById("botonPorteroPenalti").innerHTML = htmlPortero;
	}else{
		switch(opcion) {
			case 1:
				var label = "botonTiradorPenalti";
				var label2 = "tiradorPenalti";
				var label3 = "botonPorteroPenalti";
				break;
			case 2:
				var label = "botonPorteroPenalti";
				var label2 = "porteroPenalti";
				var label3 = "botonTiradorPenalti";
				break;
		}
		document.getElementById(label).classList.add("abrirCajaPenalti");
		document.getElementById(label3).classList.remove("abrirCajaPenalti");
		document.getElementById("botonSelecTirador").classList.add("invisible");
		document.getElementById("botonSelecPortero").classList.add("invisible");
		document.getElementById("botonSelecCancelar").classList.remove("invisible");

		const equipo = sessionStorage.getItem("equipoAntiguo");
		const labelConvocatoria = "Convocatoria"+equipo;
		const labelJugadores = "jugadores"+equipo;
		const banquillo = JSON.parse(sessionStorage.getItem(labelConvocatoria));
		const jugadores = JSON.parse(sessionStorage.getItem(labelJugadores));

		var html = "";
		for (var i = 0; i < banquillo.length; i++) {
			for (var j = 0; j < jugadores.length; j++) {
				if (banquillo[i] == jugadores[j].Dorsal) {
					if (opcion == 1) {
						if (jugadores[j].Posicion !== "1") {
							html += "<div class='seleccionadorCirculo w20 h30 centradoXY flexWrap' onclick=\"seleccionarJugadorPenalti(1,'"+equipo+"',"+jugadores[j].Dorsal+")\"><div id='"+label2+jugadores[j].Dorsal+"' class='h90 centradoXY circuloPenalti'>"+jugadores[j].Dorsal+"</div></div>";
						}
					}else{
						if (jugadores[j].Posicion == "1") {
							html += "<div class='seleccionadorCirculo w20 h30 centradoXY flexWrap' onclick=\"seleccionarJugadorPenalti(2,'"+equipo+"',"+jugadores[j].Dorsal+")\"><div id='"+label2+jugadores[j].Dorsal+"' class='h90 centradoXY circuloPenalti'>"+jugadores[j].Dorsal+"</div></div>";
						}
					}
				}
			}
		}
		document.getElementById(label).innerHTML = html;
	}
};
	function seleccionarJugadorPenalti(opcion,equipo,dorsal) {
		if (opcion == 1) {
			sessionStorage.setItem("Penalti Tirador",dorsal);
			var htmlTiradores = "<div class='w100 h100 centradoXY flexWrap'><div id='tiradorPenalti' class='h50 centradoXY circuloPenalti'>"+dorsal+"</div><label>Tirador</label></div>";
			document.getElementById("botonTiradorPenalti").innerHTML = htmlTiradores;
			document.getElementById("botonTiradorPenalti").classList.remove("abrirCajaPenalti");
			document.getElementById("botonSelecTirador").classList.remove("invisible");
			document.getElementById("botonSelecPortero").classList.remove("invisible");
			document.getElementById("botonSelecCancelar").classList.add("invisible");
		}else{
			sessionStorage.setItem("Penalti Portero",dorsal);
			var htmlPorteros = "<div class='w100 h100 centradoXY flexWrap'><div id='porteroPenalti' class='h50 centradoXY circuloPenalti'>"+dorsal+"</div><label>Portero</label></div>";
			document.getElementById("botonPorteroPenalti").innerHTML = htmlPorteros;
			document.getElementById("botonPorteroPenalti").classList.remove("abrirCajaPenalti");
			document.getElementById("botonSelecTirador").classList.remove("invisible");
			document.getElementById("botonSelecPortero").classList.remove("invisible");
			document.getElementById("botonSelecCancelar").classList.add("invisible");
		}
	};


// Funciones pérdidas de balón
function accionPerdida(accion) {
	switch(accion) {
		case "Falta ataque":
			var evento = 4;
			var acierto = 1;
			break;
		case "Balon fuera":
			var evento = 5;
			var acierto = 1;
			break;
		case "Pasos":
			var evento = 5;
			var acierto = 2;
			break;
		case "Dobles":
			var evento = 5;
			var acierto = 3;
			break;
		case "Invasion":
			var evento = 5;
			var acierto = 4;
			break;
		case "TAmarilla":
			var evento = 4;
			var acierto = 3;
			break;
		case "TRoja":
			var evento = 4;
			var acierto = 4;
			break;
		case "TAzul":
			var evento = 4;
			var acierto = 5;
			break;
	};
	aplicarSancion(accion,1,sessionStorage.getItem("equipoActivo"),sessionStorage.getItem("jugadorActivo"));

	var equipoDef = sessionStorage.getItem("equipoActivo") == "L" ? "V" : "L";
	guardarPosesion(equipoDef);
	guardarPerdida(evento,1,acierto,sessionStorage.getItem("equipoActivo"),jugador(sessionStorage.getItem("equipoActivo"),sessionStorage.getItem("jugadorActivo")));
	eliminarPasivo(sessionStorage.getItem("equipoActivo"));
	registroDatos("Perdida",sessionStorage.getItem("jugadorActivo"),sessionStorage.getItem("equipoActivo"),accion);
	ventanaInicial();
};

// Función para cambiar marcador cuando hay un gol
function accionGol(zonaPorteria,equipoActivo) {
	let equipo = equipoActivo ? equipoActivo : sessionStorage.getItem("equipoActivo");

	if (sessionStorage.getItem("Penalti Portero") && sessionStorage.getItem("Penalti Tirador")) {
		equipo = equipo == "L" ? "V" : "L";
	}

	let marcador = equipo === "L" ? sessionStorage.getItem("MarcadorL") : sessionStorage.getItem("MarcadorV"); // Asignar valor actual del marcador

	// Sumar 1 gol al valor del marcador
	var nuevoMarcador = parseInt(marcador) + 1;

	// Imprimir nuevo valor en el marcador
	var marcadorLabel = "<label>"+nuevoMarcador+"</label>";
	if (equipo == "L") {
		sessionStorage.setItem("MarcadorL",nuevoMarcador);
		document.getElementById("imprimirMarcadorCapturaL").innerHTML = marcadorLabel;

		var equipo2 = "V";
		asignarTactica(equipo,"Def");
		asignarTactica(equipo2,"Atq");
	}else {
		sessionStorage.setItem("MarcadorV",nuevoMarcador);
		document.getElementById("imprimirMarcadorCapturaV").innerHTML = marcadorLabel;

		var equipo2 = "L";
		asignarTactica(equipo,"Atq");
		asignarTactica(equipo2,"Def");
	}

	// Guardar datos en BD
	let opcion = sessionStorage.getItem("Tiro al palo") ? sessionStorage.getItem("Tiro al palo") : 0;
	let tipoTiro = sessionStorage.getItem("Tipo tiro") ? sessionStorage.getItem("Tipo tiro") : 0;

	if (sessionStorage.getItem("Penalti Portero") && sessionStorage.getItem("Penalti Tirador")) {
		var zonaCampo = 7;
		var portero = sessionStorage.getItem("Penalti Portero");
		var jugador = sessionStorage.getItem("Penalti Tirador");
	}else{
		var zonaCampo = sessionStorage.getItem("Zona Tiro");

		var labelPortero = "Portero"+equipo2;
		var portero = sessionStorage.getItem(labelPortero);
		var jugador = sessionStorage.getItem("jugadorActivo");
	}
	sessionStorage.removeItem("Zona Tiro");
	guardarTiro(1,1,opcion,equipo,jugador,equipo2,jugadorAsistencia,equipo2,portero,tipoTiro,zonaCampo,zonaPorteria,sessionStorage.getItem("Tipo parada"),sessionStorage.getItem("Zona parada"));
	guardarGol(equipo);
	
	// Imprimir registro en marcador lateral si está ya iniciado el juego
	if (typeof equipoActual == 'undefined') {
		// Ver qué jugador ha marcado
		var jugador = sessionStorage.getItem("jugadorActivo");

		// Ver si es jugada individual o viene de asistencia
		if (sessionStorage.getItem("Asistencia")) {
			var jugadorAsistencia = sessionStorage.getItem("jugadorAntiguo");
			var equipoAsistencia = sessionStorage.getItem("equipoAntiguo");
			registroDatos("Gol",jugador,equipo,zonaPorteria,jugadorAsistencia,equipoAsistencia);
		}else {
			registroDatos("Gol",jugador,equipo,zonaPorteria);
		}
	}

	// Eliminar datos
	guardarPosesion(equipo2);
	eliminarPasivo(equipo);
	document.getElementById("porteroPenalti").innerHTML = "";
	document.getElementById("tiradorPenalti").innerHTML = "";
	sessionStorage.removeItem("Penalti Portero");
	sessionStorage.removeItem("Penalti Tirador");
	sessionStorage.removeItem("jugadorActivo");
	sessionStorage.removeItem("jugadorAntiguo");
	sessionStorage.removeItem("equipoActivo");
	sessionStorage.removeItem("equipoAntiguo");
};

// Funciones para pases
function tipoPase(tipo) {
	sessionStorage.setItem("Tipo pase",tipo);
	botonTipoSeleccionado("Pase",tipo);
};
	function accionPase(tipo) {
		if (tipo === 'Pase') {
			if (sessionStorage.getItem("inicio") == "Si") { // Crear posesión inicial
				guardarPosesion(sessionStorage.getItem("equipoActivo"));
				sessionStorage.removeItem("inicio");
				inicioReloj();
			}
			registroDatos("Pase",sessionStorage.getItem("jugadorActivo"), sessionStorage.getItem("equipoActivo"),sessionStorage.getItem("jugadorAntiguo"), sessionStorage.getItem("equipoAntiguo"), sessionStorage.getItem("Tipo pase"));
			botonVolver();
		}else if (tipo === 'Asistencia') {
			sessionStorage.setItem("Asistencia","Si");
			registroDatos("Asistencia",sessionStorage.getItem("jugadorActivo"), sessionStorage.getItem("equipoActivo"),sessionStorage.getItem("jugadorAntiguo"), sessionStorage.getItem("equipoAntiguo"), sessionStorage.getItem("Tipo pase"));
			abrirVentanaTiro();
		}
		guardarPase(1,0,sessionStorage.getItem("equipoActivo"),sessionStorage.getItem("jugadorAntiguo"),sessionStorage.getItem("jugadorActivo"),0,0,sessionStorage.getItem("Tipo pase"));

		// Asignar pase clásico por defecto para la siguiente jugada
		sessionStorage.setItem("Tipo pase","Clasico");
		botonTipoSeleccionado("Pase","Clasico");
	};

// Devolver las opciones al estado inicial
function botonTipoSeleccionado(tipo,nombre) {
	switch (tipo) {
		case "Pase":
			var array = ['Clasico','Lateral','Cadera','Picado','Recurso','Suspension'];
			var nombreTipo = "#botonPase";
			break;
		// Tiro
		case "Tiro":
			var array = ['Clasico','Cadera','Apoyo','Rosca','Vaselina','Rectificado','Fly','Desvio','Bloqueado'];
			var nombreTipo = "#botonTiro";
			break;
		case "Parada":
			var array = ['Blocaje','Despeje'];
			var nombreTipo = "#botonPortero";
			break;
		case "ZonaParada":
			var array = ['Manos','Pies','Cuerpo'];
			var nombreTipo = "#botonZona";
			break;
		// Penalti
		case "PenaltiTiro":
			var array = ['Clasico','Vaselina'];
			var nombreTipo = "#botonTiroPenalti";
			break;
		case "PenaltiParada":
			var array = ['Blocaje','Despeje'];
			var nombreTipo = "#botonParadaPenalti";
			break;
		case "ZonaParadaPenalti":
			var array = ['Manos','Pies','Cuerpo'];
			var nombreTipo = "#botonZonaPenalti";
			break;
		case "DistanciaPenalti":
			var array = ['Adelante','Atras'];
			var nombreTipo = "#botonDistancia";
			break;
	}

	// Eliminar caracteristica de botón seleccionado
	for (var i = 0; i < array.length; i++) {
		var casilla = nombreTipo+array[i];
		$(casilla).removeClass('seleccionado');
	}

	// Dar caracteristica de botón seleccionado
	var nombreCasilla = nombreTipo+nombre;
	$(nombreCasilla).addClass('seleccionado');		
};

function accionRobo(accion,tipo) {
	//ver jugador que hace el pase
	var jugadorEnviaPase = sessionStorage.getItem("jugadorAntiguo");
	var equipoEnviaPase = sessionStorage.getItem("equipoAntiguo");
	//ver jugador que recibe el pase
	var jugadorRecibePase = sessionStorage.getItem("jugadorActivo");
	var equipoRecibePase = sessionStorage.getItem("equipoActivo");

	const equipoDef = equipoEnviaPase == "L" ? guardarPosesion("V") : guardarPosesion("L");

	eliminarPasivo(sessionStorage.getItem("equipoAntiguo"));

	//Cambiar pantalla para elegir al jugador que hace el robo de balón
	$(".jugador").removeClass("seleccionado");
	$("#opcionesAtaque").hide();
	$("#opcionesDefecto").show();
	switch (accion) {
		case "Robo":
			sessionStorage.setItem("Seleccionar defensa","Si"); // Evento para elegir al jugador que roba
			sessionStorage.setItem("jugadorEnviaPase",jugadorEnviaPase);
			sessionStorage.setItem("jugadorRecibePase",jugadorRecibePase);
			sessionStorage.setItem("equipoEnviaPase",equipoEnviaPase);
			break;
		case "No Forzado":
			switch(tipo) {
				case "Error Pase":
					var acierto = 2;
					break;
				case "Error Recepcion":
					var acierto = 3;
					break;
			}
			registroDatos("No Forzado",jugadorEnviaPase,equipoEnviaPase,jugadorRecibePase,equipoRecibePase,tipo);
 ///////////////////////// DUPLICA EL REGISTRO AL HACER CLIC ==> ¿DÓNDE ESTÁ LA DUPLICIDAD DE ORDEN?
			guardarPase(acierto,1,equipoEnviaPase,jugadorEnviaPase,jugadorRecibePase,0,0,sessionStorage.getItem("Tipo pase"));













 /////////////////////////
			break;
		case "Disuasion":
			sessionStorage.setItem("Seleccionar defensa","Si"); // Evento para elegir al jugador que roba
			sessionStorage.setItem("jugadorEnviaPase",jugadorEnviaPase);
			sessionStorage.setItem("jugadorRecibePase",jugadorRecibePase);
			sessionStorage.setItem("equipoEnviaPase",equipoEnviaPase);
			sessionStorage.setItem("disuasion",tipo);
			break;
	}
};

// Función de defensa
// Se determina a qué botones se le ha dado y se envía al servidor
function accionDefensa(categoria,tipo) {
	var jugadorDef = sessionStorage.getItem("jugadorActivo");
	var equipoDef = sessionStorage.getItem("equipoActivo");
	var jugadorAtq = sessionStorage.getItem("jugadorAntiguo");
	var equipoAtq = sessionStorage.getItem("equipoAntiguo");
	
	switch (categoria) {
		case "Robo":
			switch (tipo) {
				case "Robo":
					$('#opcionesDefensa').hide();
					$('#opcionesJugador').show();
					guardarPosesion(equipoDef);
					eliminarPasivo(equipoAtq);
					break;
				case "Intento":
					sessionStorage.setItem("jugadorActivo", jugadorAtq);
					sessionStorage.setItem("equipoActivo", equipoAtq);

					jugadorSeleccionado(equipoAtq,jugadorAtq);
					$('#opcionesAtaque').hide();
					$('#opcionesJugador').show();
					break;
			}
			const jugadorAntiguo = "#jugador"+sessionStorage.getItem("equipoAntiguo")+sessionStorage.getItem("jugadorAntiguo");
			$(jugadorAntiguo).removeClass("seleccionadoAntiguo");
			sessionStorage.removeItem("jugadorAntiguo");
			sessionStorage.removeItem("equipoAntiguo");
			break;
		case "Golpe":
			sessionStorage.removeItem("jugadorActivo");
			sessionStorage.removeItem("equipoActivo");
			sessionStorage.removeItem("jugadorAntiguo");
			sessionStorage.removeItem("equipoAntiguo");
			$('.jugador').removeClass('seleccionado');
			$('#opcionesDefensa').hide();
			$('#opcionesDefecto').show();
			break;
	}

	aplicarSancion(tipo,2,equipoDef,jugadorDef,equipoAtq,jugadorAtq);
	registroDatos(tipo,jugadorDef,equipoDef,jugadorAtq,equipoAtq);
};

// Función deshacer (al darle al botón deshacer, se vuelve al estado básico del último jugador seleccionado)
function botonVolver() {
	$('#pantallaTiro').hide();
	$('#opcionesTiro').hide();
	$('#opcionesDefensa').hide();
	$('#opcionesAtaque').hide();
	$("#opcionesPenalti").hide();
	$('#pantallaEquipos').show();
	$('#opcionesJugador').show();
};

function contra(equipo,acierto) {
	registroDatos("Contraataque",0,equipo);
	guardarContra(equipo,acierto);
};


// Función de mostrar listado de acciones en el lateral
async function registroDatos(accion, dorsal, equipo, dorsalAnt, equipoAnt, opcion1,opcion2,opcion3) {
	if (accion) {
		// Obtener datos de Local Storage
		var arrayAccion = sessionStorage.getItem('arrayRegistros') ? JSON.parse(sessionStorage.getItem('arrayRegistros')) : Array();
		var minuto = sessionStorage.getItem("minuto") ? sessionStorage.getItem("minuto") : "--";
		var segundo = sessionStorage.getItem("segundo") ? sessionStorage.getItem("segundo") : "--";
		
		if (accion == "Parada") {
			const opcion3 = typeof sessionStorage.getItem("Zona Parada") !== 'undefined' ? sessionStorage.getItem("Zona Parada") : "";
		}

		// Convertir acción en texto, según el idioma


		
		// Meter registro en array
		var arrayLectura = [minuto, segundo, accion, dorsal, equipo, dorsalAnt, equipoAnt, opcion1,opcion2,opcion3];
		arrayAccion.push(arrayLectura);

		var imprimir = "";

		for (var i = arrayAccion.length - 1; i >= 0; i--) {
			if (arrayAccion[i][4] == "L") {
				var clase = "local";
				var clase2 = "visitante";
			}else {
				var clase = "visitante";
				var clase2 = "local";
			}

			// Crear evento según la acción seleccionada
			if (arrayAccion[i][2]) {
				imprimir += "<label class='centradoInlineXY'><strong>"+arrayAccion[i][0]+":"+arrayAccion[i][1]+"</strong>&nbsp";
			}
			switch (arrayAccion[i][2]) {
				case "Inicio1":
					imprimir += '</label>';
					imprimir += '<label>==== 1ª PARTE ====</label><br>';
					imprimir += '';
					break;
				case "Mitad":
					imprimir += '</label>';
					imprimir += '<label>==== DESCANSO ====</label><br>';
					imprimir += '';
					break;
				case "Inicio2":
					imprimir += '</label>';
					imprimir += '<label>==== 2ª PARTE ====</label><br>';
					imprimir += '';
					break;
				case "Final":
					imprimir += '===== FINAL =====</label><br>';
					imprimir += '';
					break;
				case "Contraataque":
					imprimir += arrayAccion[i][2]+'<sup>'+arrayAccion[i][4]+'</sup><br>';
					imprimir += '';
					break;
				case "Pase":
					imprimir += arrayAccion[i][2]+' <small><small><small>'+arrayAccion[i][7]+'</small></small></small>&nbspde&nbsp<span class="texto'+clase+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span>a&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
					break;
				case "Parada":
					if (sessionStorage.getItem("Tiro al palo") == "Si") {
						imprimir += 'Palo y '+arrayAccion[i][8]+'</label> <small><small><small>'+arrayAccion[i][9]+'</small></small></small> <label>de</label>&nbsp<span class="texto'+clase+'">'+arrayAccion[i][7]+'<sup>'+arrayAccion[i][6]+'</sup></span> <label>a</label>&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
					}else {
						imprimir += arrayAccion[i][8]+'</label> <small><small><small>'+arrayAccion[i][9]+'</small></small></small> <label>de</label>&nbsp<span class="texto'+clase+'">'+arrayAccion[i][7]+'<sup>'+arrayAccion[i][6]+'</sup></span> <label>a</label>&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
					}
					break;
				case "Gol":
					if (sessionStorage.getItem("Tiro al palo") == "Si") {
						imprimir += 'Tiro al palo y&nbsp<label class="textoGol">Gol</label>&nbspde&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
						sessionStorage.removeItem("Tiro al palo");
					}else {
						imprimir += ' <label class="textoGol">'+arrayAccion[i][2]+'</label>&nbspde&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
					}
					sessionStorage.removeItem("Asistencia");
					break;
				case "Fuera":
					if (sessionStorage.getItem("Tiro al palo") == "Si") {
						imprimir += 'Palo y '+arrayAccion[i][8]+'</label> <small><small><small>'+arrayAccion[i][9]+'</small></small></small> <label>de</label>&nbsp<span class="texto'+clase+'">'+arrayAccion[i][7]+'<sup>'+arrayAccion[i][6]+'</sup></span> <label>a</label>&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
						sessionStorage.removeItem("Tiro al palo");
					}else {
						imprimir += 'Tiro Fuera</label> <label>de</label>&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'</span><sup>'+arrayAccion[i][4]+'</sup></label><br>';
					}
					sessionStorage.removeItem("Asistencia");
					break;
				case "Asistencia":
					imprimir += arrayAccion[i][2]+'&nbspde&nbsp<span class="texto'+clase+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][4]+'</sup></span>&nbspa&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
					break;
				case "Perdida":
					if (arrayAccion[i][5][0] === "T") {
						switch (arrayAccion[i][5]) {
							case "Tarjeta Amarilla":
								imprimir += '<span class="tarjeta" id="amarilla"></span> '+arrayAccion[i][5]+' a&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
								break;
							case "Tarjeta Roja":
								imprimir += '<span class="tarjeta" id="roja"></span> '+arrayAccion[i][5]+' a&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
								break;
							case "Tarjeta Azul":
								imprimir += '<span class="tarjeta" id="azul"></span> '+arrayAccion[i][5]+' a&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
								break;
						}
					}else {
						imprimir += arrayAccion[i][5]+' de&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
					}
					break;
				case "Robo":
					if (arrayAccion[i][9] == "En el pase") {
						imprimir += '<span class="texto'+clase+'">'+arrayAccion[i][7]+'<sup>'+arrayAccion[i][8]+'</sup></span>Roba Pase de&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
					}else {
						imprimir += '<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>Roba Balón a&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
					}
					break;
				case "No Forzado":
					if (arrayAccion[i][7] == "Error Pase") {
						imprimir += '<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span> Error de Pase a&nbsp<span class="texto'+clase+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
					}else {
						imprimir += '<span class="texto'+clase+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span>No Recep Pase de&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
					}
					break;
				case "Disuasion":
					if (arrayAccion[i][9] == "Error Pase") {
						imprimir += '<span class="texto'+clase+'">'+arrayAccion[i][7]+'<sup>'+arrayAccion[i][8]+'</sup></span>Disuade Pase de&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
					}else {
						imprimir += '<span class="texto'+clase+'">'+arrayAccion[i][7]+'<sup>'+arrayAccion[i][8]+'</sup></span>Disuade Recep de&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
					}
					break;
				case "Intento":
					imprimir += '<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>Falla Robo a&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
					break;
				case "Penalti":
					imprimir += arrayAccion[i][2]+' de&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>&nbspa&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
					break;
				case "Golpe":
					imprimir += arrayAccion[i][2]+' de&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>&nbspa&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
					break;
				case "Exclusion":
					imprimir += '<label style="color:red">2min</label>&nbspa&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>&nbsp(Golpe a&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span>)</label><br>';
					break;
				case "TAmarilla":
					imprimir += '<span class="tarjeta" id="amarilla"></span> a&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>por Golpe a&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
					break;
				case "TRoja":
					var jugadorSacado = "#jugador"+arrayAccion[i][4]+arrayAccion[i][3];
					$(jugadorSacado).removeClass('seleccionado');
					$(jugadorSacado).addClass('jugadorFuera');
					$(jugadorSacado).attr("user-select","none");
					imprimir += '<span class="tarjeta" id="roja"></span> a&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>por Golpe a&nbsp<span class="texto'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
					break;
				case "TAzul":
					var jugadorSacado = "#jugador"+arrayAccion[i][4]+arrayAccion[i][3];
					$(jugadorSacado).removeClass('seleccionado');
					$(jugadorSacado).addClass('jugadorFuera');
					$(jugadorSacado).attr("user-select","none");
					imprimir += '<span class="tarjeta" id="azul"></span> a <span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>por Golpe a <span class="texto'+clase+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
					break;
				case "Tiempo Muerto":
					imprimir += 'Tiempo Muerto&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3].charAt(0).toUpperCase() + arrayAccion[i][3].slice(1)+'</span></label><br>';
					break;
				case "Tiro al palo":
					imprimir += 'Tiro al palo de<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
					break;
				case "Fuera Porteria":
					imprimir += 'Tiro fuera portería de<span class="texto'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
					break;
				case "Tactica":
					if (arrayAccion[i][3] == "Def") {	var arrayFormaciones = Array("6:0","5:1","4:2","3:3","3:2:1","P:P");
					}else{	var arrayFormaciones = Array("3:3a","3:3b","2:4");	}
					imprimir += 'Táctica&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+' '+arrayFormaciones[arrayAccion[i][5]]+'</span></label><br>';
					break;
				case "Sancion Banquillo":
					switch(arrayAccion[i][5]) {
						case 1:
							var sancion = "2M";
							break;
						case 2:
							var sancion = "<span class='tarjeta' id='amarilla'></span>";
							break;
						case 3:
							var sancion = "<span class='tarjeta' id='roja'></span>";
							break;
						case 4:
							var sancion = "<span class='tarjeta' id='azul'></span>";
							break;
					}
					imprimir += 'Sanción Banquillo&nbsp<span class="texto'+clase+'">'+arrayAccion[i][4]+'</span>: '+arrayAccion[i][3]+' '+sancion+'</label><br>';
					break;
				case "Porteria Vacia":
					imprimir += 'Portería Vacía&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'</span></label><br>';
					break;
				case "Porteria":
					imprimir += 'Portería Restaurada&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'</span></label><br>';
					break;
				case "Aviso Pasivo":
					imprimir += 'Aviso de pasivo&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'</span></label><br>';
					break;
				case "Sancion Pasivo":
					imprimir += 'Pasivo&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'</span></label><br>';
					break;
				case "Aviso Pasivo Cancelado":
					imprimir += 'Fin Aviso Pasivo&nbsp<span class="texto'+clase+'">'+arrayAccion[i][3]+'</span></label><br>';
					break;
				case "Cambio":
					imprimir += 'Cambio de jugadores en&nbsp<span class="texto'+clase+'">'+arrayAccion[i][4]+'</span></label><br>';
					break;
				case "Alineación inicial":
					imprimir += 'Alineación inicial&nbsp<span class="texto'+clase+'">'+arrayAccion[i][4]+'</span>&nbspOK</label><br>';
					break;
			}
		}
		$('#imprimirSeleccion').html(imprimir);
		$('#imprimirSeleccion').show();

		// Guardar datos en Local Storage
		sessionStorage.setItem('arrayRegistros', JSON.stringify(arrayAccion));
	}
};
	// Eventos para otras tablas
	async function guardarGol(equipo) {
		let label = "Marcador"+equipo;
		$.ajax ({
			url: "php/guardarGolBM.php",
	        type: 'POST',
	        data: {
	        	idPartido: sessionStorage.getItem("idPartido"),
	        	equipo: equipo,
	        	goles: sessionStorage.getItem(label)
	        },
	        timeout: 10000,
			error: function() {guardarGol(equipo);}
		});
	};

	async function guardarEstado() {
		$.ajax ({
			url: "php/guardarEstadoBM.php",
	        type: 'POST',
	        data: {
	        	idPartido: sessionStorage.getItem("idPartido"),
	        	estado: sessionStorage.getItem("periodo")
	        },
	        timeout: 10000,
			error: function() {guardarEstado();}
		});
	};

	async function guardarIncidencia(evento,equipo,AD,minuto) {
		if (!minuto || minuto !== undefined) {
			var minuto = "00:"+sessionStorage.getItem("minuto")+":"+sessionStorage.getItem("segundo");
		}
		$.ajax ({
			url: "php/guardarIncidenciaBM.php",
	        type: 'POST',
	        data: {
	        	evento: evento,
	        	idPartido: sessionStorage.getItem("idPartido"),
	        	periodo: sessionStorage.getItem("periodo"),
	        	minuto: minuto,
	        	equipo: equipo,
	        	AD: AD
	        },
	        timeout: 10000,
			error: function() {guardarIncidencia(evento,equipo,AD,minuto);}
		});
	};

	async function guardarAlineacion(equipo,minuto) {
		if (!minuto || minuto !== undefined) {
			const min = sessionStorage.getItem("minuto") ? sessionStorage.getItem("minuto") : "00";
			const sec = sessionStorage.getItem("segundo") ? sessionStorage.getItem("segundo") : "00";
			var minuto = "00:"+min+":"+sec;
		}

		const periodo = sessionStorage.getItem("periodo") ? sessionStorage.getItem("periodo") : "1";
		
		const labelEquipoAnterior = "TitularesAntes"+equipo;
		const labelEquipoActual = "Titulares"+equipo;
		const equipoActual = JSON.parse(sessionStorage.getItem(labelEquipoActual));

		const labelJugadores = "jugadores"+equipo;
		const listaJugadores = JSON.parse(sessionStorage.getItem(labelJugadores));

		const labelPortero = "Portero"+equipo;
		sessionStorage.removeItem(labelPortero);

		var equipoSale = new Array();
		var equipoEntra = new Array();

		if (sessionStorage.getItem(labelEquipoAnterior)) { // Confirmar que es un cambio durante el partido
			const equipoAnteriorSinFiltrar = JSON.parse(sessionStorage.getItem(labelEquipoAnterior)); // Filtrado para evitar duplicados
			equipoAnterior = [...new Set(equipoAnteriorSinFiltrar)];

			// Comprobar qué jugadores salen del campo
			for (var i = 0; i < equipoAnterior.length; i++) {
				var suma = 0;
				for (var j = 0; j < equipoActual.length; j++) {
					if (equipoAnterior[i] == equipoActual[j]) {	suma += 1;	}
				}
				if (suma == 0) {
					for (var k = listaJugadores.length - 1; k >= 0; k--) {
						if (equipoAnterior[i] == listaJugadores[k].Dorsal) {
							equipoSale.push(String(listaJugadores[k].ID_Jugador));
						}
					}
				}
			}
			sessionStorage.setItem("equipoSale",JSON.stringify(equipoSale));

			// Comprobar qué jugadores entran al campo
			for (var i = 0; i < equipoActual.length; i++) {
				var suma = 0;
				for (var j = 0; j < equipoAnterior.length; j++) {
					if (equipoActual[i] == equipoAnterior[j]) {	suma += 1;	}
				}
				if (suma == 0) {
					for (var k = listaJugadores.length - 1; k >= 0; k--) {
						if (equipoActual[i] == listaJugadores[k].Dorsal) {
							equipoEntra.push(String(listaJugadores[k].ID_Jugador));
							if (listaJugadores[k].Posicion == "1") {
								sessionStorage.setItem(labelPortero,equipoActual[i]);
							}
						}
					}
				}
			}
		}else{
			// Dar ID de jugadores que inician el partido
			for (var i = 0; i < equipoActual.length; i++) {
				for (var k = listaJugadores.length - 1; k >= 0; k--) {
					if (equipoActual[i] == listaJugadores[k].Dorsal) {
						equipoEntra.push(String(listaJugadores[k].ID_Jugador));
						if (listaJugadores[k].Posicion == "1") {
							sessionStorage.setItem(labelPortero,equipoActual[i]);
						}
					}
				}
			}
		}

		// Eliminar datos anteriores
		sessionStorage.removeItem(labelEquipoAnterior);

		$.ajax ({
			url: "php/guardarCambiosBM.php",
	        type: 'POST',
	        data: {
	        	idPartido: sessionStorage.getItem("idPartido"),
	        	periodo: periodo,
	        	minuto: minuto,
	        	equipo: equipo,
	        	dentro: equipoEntra,
	        	fuera: JSON.parse(sessionStorage.getItem("equipoSale"))
	        },
	        success: function() {sessionStorage.removeItem("equipoSale")},
	        timeout: 10000,
			error: function() {guardarAlineacion(equipo,minuto);}
		});
	};

	// Eventos para MinaMin
	async function guardarTiro(ad,acierto,opcion,equipo1,idJugador1,equipo3,idJugador3,equipo2,idJugador2,tipoTiro,zonaCampo,zonaPorteria,tipoParada,zonaParada,minuto) {
		const periodo = sessionStorage.getItem("periodo") ? sessionStorage.getItem("periodo") : "1";

		if (!minuto || minuto !== undefined) {
			const min = sessionStorage.getItem("minuto") ? sessionStorage.getItem("minuto") : "00";
			const sec = sessionStorage.getItem("segundo") ? sessionStorage.getItem("segundo") : "00";
			var minuto = "00:"+min+":"+sec;
		}

		const evento = "1";
		const id1 = idJugador1 && idJugador1 !== 0 ? jugador(equipo1,idJugador1) : 0;
		const id2 = idJugador2 && idJugador2 !== 0 ? jugador(equipo2,idJugador2) : 0;
		const id3 = idJugador3 && idJugador3 !== 0 ? jugador(equipo1,idJugador3) : 0;

		switch(tipoTiro) {
			case "Clasico":
				var labelTipoTiro = '1';
				break;
			case "Cadera":
				var labelTipoTiro = '2';
				break;
			case "Apoyo":
				var labelTipoTiro = '3';
				break;
			case "Rosca":
				var labelTipoTiro = '4';
				break;
			case "Vaselina":
				var labelTipoTiro = '5';
				break;
			case "Fly":
				var labelTipoTiro = '6';
				break;
			default:
				var labelTipoTiro = '0';
				break;
		};

		switch(tipoParada) {
			case "Blocaje":
				var labelTipoParada = '1';
				break;
			case "Despeje":
				var labelTipoParada = '2';
				break;
			default:
				var labelTipoParada = '0';
				break;
		};

		switch(zonaParada) {
			case "Manos":
				var labelZonaParada = '1';
				break;
			case "Pies":
				var labelZonaParada = '2';
				break;
			case "Cuerpo":
				var labelZonaParada = '3';
				break;
			default:
				var labelZonaParada = '0';
				break;
		};
		
		$.ajax ({
			url: "php/guardarTiroBM.php",
	        type: 'POST',
	        data: {
	        	idPartido: sessionStorage.getItem("idPartido"),
	        	periodo: sessionStorage.getItem("periodo"),
	        	minuto: minuto,
	        	evento: evento,
	        	AD: ad,
	        	acierto: acierto,
	        	opcion: opcion,
	        	superioridad: superioridad(),
	        	equipo: equipo1,
	        	idJugador1: id1,
	        	idJugador2: id2,
	        	idJugador3: id3,
	        	tipoTiro: labelTipoTiro,
	        	zonaCampo: zonaCampo,
	        	zonaPorteria: zonaPorteria,
	        	tipoParada: labelTipoParada,
	        	zonaParada: labelZonaParada
	        },
	        timeout: 10000,
			error: function() {guardarTiro(ad,acierto,opcion,idJugador1,equipo1,idJugador3,equipo2,idJugador2,tipoTiro,zonaCampo,zonaPorteria,tipoParada,zonaParada,minuto);}
		});
	};

	async function guardarTactica(estado, equipo,numero,min,sec) {
		// Comprobar si han pasado más de 3 segundos en sessionStorage
		if (min == null || sec == null) {
			min = sessionStorage.getItem("minuto") ? sessionStorage.getItem("minuto") : "00";
			sec = sessionStorage.getItem("segundo") ? sessionStorage.getItem("segundo") : "00";
		}

		let tiempo = parseInt(sec) + (parseInt(min)*60);

		let minComprobacion = sessionStorage.getItem("minutoComprobacion");
		let secComprobacion = sessionStorage.getItem("segundoComprobacion");
		let comprobacion = parseInt(secComprobacion) + (parseInt(minComprobacion)*60);

		if ((tiempo - comprobacion) == 3) {
			let periodo = sessionStorage.getItem("periodo") ? sessionStorage.getItem("periodo") : "1";
			
			let segundosAhora = parseInt(sec) - 3;
			if (segundosAhora < 0) { // Evitar error si al restar pasa al minuto anterior
				var minOK = parseInt(min) - 1;
				var secOK = 60 + segundosAhora;
			}else{
				var minOK = min;
				var secOK = segundosAhora;
			}
			let minuto = "00:"+minOK+":"+secOK;

			let evento = "9";
			let AD = estado == "Atq" ? "1" : "2";

			// Limpiar datos
			sessionStorage.removeItem("minutoComprobacion");
			sessionStorage.removeItem("segundoComprobacion");

			// Guardar datos
			registroDatos("Tactica", estado, equipo, numero);

			$.ajax ({
				url: "php/guardarTacticaBM.php",
		        type: 'POST',
		        data: {
		        	idPartido: sessionStorage.getItem("idPartido"),
		        	periodo: periodo,
		        	minuto: minuto,
		        	evento: evento,
		        	AD: AD,
		        	acierto: numero,
	        		superioridad: superioridad(),
		        	equipo: equipo
		        },
		        timeout: 10000,
				error: function() {guardarTactica(estado, equipo,numero,min,sec);}
			});
		}
	};

	async function guardarPasivo(opcion,equipo,minuto) {
		const periodo = sessionStorage.getItem("periodo") ? sessionStorage.getItem("periodo") : "1";

		if (!minuto || minuto !== undefined) {
			const min = sessionStorage.getItem("minuto") ? sessionStorage.getItem("minuto") : "00";
			const sec = sessionStorage.getItem("segundo") ? sessionStorage.getItem("segundo") : "00";
			var minuto = "00:"+min+":"+sec;
		}

		switch(opcion) {
			case "Aviso Pasivo":
				var acierto = "1";
				break;
			case "Aviso Pasivo Cancelado":
				var acierto = "2";
				break;
			case "Sancion Pasivo":
				var acierto = "3";
				break;
		}

		$.ajax ({
			url: "php/guardarPasivoBM.php",
	        type: 'POST',
	        data: {
	        	idPartido: sessionStorage.getItem("idPartido"),
	        	periodo: periodo,
	        	minuto: minuto,
				equipo: equipo,
	        	superioridad: superioridad(),
	        	acierto: acierto
	        },
	        timeout: 10000,
			error: function() {guardarPasivo(opcion,equipo,minuto);}
		});
	};

	async function guardarPase(acierto,opcion,equipo1,jugador1,jugador2,equipo2,jugador3,tipo,minuto) {
		let periodo = sessionStorage.getItem("periodo") ? sessionStorage.getItem("periodo") : "1";

		if (!minuto || minuto !== undefined) {
			let min = sessionStorage.getItem("minuto") ? sessionStorage.getItem("minuto") : "00";
			let sec = sessionStorage.getItem("segundo") ? sessionStorage.getItem("segundo") : "00";
			var minuto = "00:"+min+":"+sec;
		}

		let evento = sessionStorage.getItem("Asistencia") == "Si" ? "3" : "2";
		let AD = "1";
		let id1 = jugador(equipo1,jugador1);
		let id2 = jugador(equipo1,jugador2);
		let id3 = jugador3 !== 0 ? jugador(equipo2,jugador3) : "0";

		switch(tipoPase) {
			case "Clasico":
				var labelTipoPase = '1';
				break;
			case "Lateral":
				var labelTipoPase = '2';
				break;
			case "Cadera":
				var labelTipoPase = '3';
				break;
			case "Recurso":
				var labelTipoPase = '4';
				break;
			case "Picado":
				var labelTipoPase = '5';
				break;
			case "Suspension":
				var labelTipoPase = '6';
				break;
			default:
				var labelTipoPase = '1';
				break;
		};

		$.ajax ({
			url: "php/guardarPaseBM.php",
	        type: 'POST',
	        data: {
	        	idPartido: sessionStorage.getItem("idPartido"),
	        	periodo: periodo,
	        	minuto: minuto,
	        	evento: evento,
	        	AD: AD,
	        	acierto: acierto,
	        	opcion: opcion,
	        	superioridad: superioridad(),
				equipo: equipo1,
				idJugador1: id1,
				idJugador2: id2,
				idJugador3: id3,
				tipoPase: labelTipoPase
	        },
	        timeout: 10000,
			error: function() {guardarPase(acierto,opcion,equipo1,jugador1,jugador2,equipo2,jugador3,tipo,minuto);}
		});
	};

	async function guardarPerdida(evento,AD,acierto,equipo,jugador,minuto) {
		let periodo = sessionStorage.getItem("periodo") ? sessionStorage.getItem("periodo") : "1";

		if (!minuto || minuto !== undefined) {
			let min = sessionStorage.getItem("minuto") ? sessionStorage.getItem("minuto") : "00";
			let sec = sessionStorage.getItem("segundo") ? sessionStorage.getItem("segundo") : "00";
			var minuto = "00:"+min+":"+sec;
		}

		$.ajax ({
			url: "php/guardarPerdidaBM.php",
			type: 'POST',
			data: {
				idPartido: sessionStorage.getItem("idPartido"),
				periodo: periodo,
				minuto: minuto,
				evento: evento,
				AD: AD,
				acierto: acierto,
	        	superioridad: superioridad(),
				equipo: equipo,
				jugador: jugador
			},
			timeout: 10000,
			error: function() {guardarPerdida(evento,AD,acierto,equipo,jugador,minuto);}
		});
	};

	async function guardarPorteriaVacia(acierto,equipo,minuto) {
		let periodo = sessionStorage.getItem("periodo") ? sessionStorage.getItem("periodo") : "1";

		if(!minuto){
			let min = sessionStorage.getItem("minuto") ? sessionStorage.getItem("minuto") : "00";
			let sec = sessionStorage.getItem("segundo") ? sessionStorage.getItem("segundo") : "00";
			var minuto = "00:"+min+":"+sec;
		}

		const evento = 8;
		const AD = 1;
		$.ajax ({
			url: "php/guardarPorteriaVaciaBM.php",
			type: 'POST',
			data: {
				idPartido: sessionStorage.getItem("idPartido"),
				periodo: periodo,
				minuto: minuto,
				evento: evento,
				AD: AD,
				acierto: acierto,
	        	superioridad: superioridad(),
				equipo: equipo
			},
			timeout: 10000,
			error: function() {guardarPorteriaVacia(acierto,equipo,minuto);}
		});
	};

	async function guardarPosesion(equipo,minuto) {
		let periodo = sessionStorage.getItem("periodo") ? sessionStorage.getItem("periodo") : "1";

		if (!minuto || minuto !== undefined) {
			let min = sessionStorage.getItem("minuto") ? sessionStorage.getItem("minuto") : "00";
			let sec = sessionStorage.getItem("segundo") ? sessionStorage.getItem("segundo") : "00";
			var minuto = "00:"+min+":"+sec;
		}

		const evento = 11;
		const AD = 1;

		$.ajax ({
			url: "php/guardarPosesionBM.php",
			type: 'POST',
			data: {
				idPartido: sessionStorage.getItem("idPartido"),
				periodo: periodo,
				minuto: minuto,
				evento: evento,
				AD: AD,
	        	superioridad: superioridad(),
				equipo: equipo
			},
			timeout: 10000,
			error: function() {guardarPosesion(equipo,minuto);}
		});
	};
/////// No está bien puesto, creo, el tema de robar el pase (no lo pone como pase fallado en als estadísticas)
// No están puestas las asistencias ni los robos en las estadísticas
// Falta identificar los contraataques de forma automática
	async function guardarContra(equipo,acierto) {
		let periodo = sessionStorage.getItem("periodo") ? sessionStorage.getItem("periodo") : "1";

		if (!minuto || minuto !== undefined) {
			let min = sessionStorage.getItem("minuto") ? sessionStorage.getItem("minuto") : "00";
			let sec = sessionStorage.getItem("segundo") ? sessionStorage.getItem("segundo") : "00";
			var minuto = "00:"+min+":"+sec;
		}

		const evento = 6;
		const AD = 1;
		const aciertoOk = acierto ? acierto : '0';

		$.ajax ({
			url: "php/guardarContraBM.php",
			type: 'POST',
			data: {
				idPartido: sessionStorage.getItem("idPartido"),
				periodo: periodo,
				minuto: minuto,
				evento: evento,
				acierto: aciertoOk,
				AD: AD,
	        	superioridad: superioridad(),
				equipo: equipo
			},
			timeout: 10000,
			error: function() {guardarContra(equipo);}
		});
	};


function aplicarSancion(sancion,ad,equipo,dorsal,equipo2,dorsal2) {
	switch (sancion) {
		case "Robo":
			guardarSancion(5,ad,5,equipo,dorsal,equipo2,dorsal2);
			break;
		case "Intento":
			guardarSancion(5,ad,6,equipo,dorsal,equipo2,dorsal2);
			break;
		case "Golpe":
			guardarSancion(4,ad,1,equipo,dorsal,equipo2,dorsal2);
			break;
		case "Exclusion":
			// 1. Incluir en jugadores con sanción en vigor
			var labelActuales = "sancionadosActuales"+equipo;
			var sancionadosActuales = sessionStorage.getItem(labelActuales);
			if (sancionadosActuales) {
				var arrayActuales = JSON.parse(sancionadosActuales);
				arrayActuales.push(dorsal);
				var arrayFiltrado = [...new Set(arrayActuales)]; // Filtrado para evitar duplicados
				sessionStorage.setItem(labelActuales, JSON.stringify(arrayFiltrado));
			}else{
				var array = [];
				array.push(dorsal);
				sessionStorage.setItem(labelActuales, JSON.stringify(array));
			}
			// 2. Total de las sanciones de los jugadores
			var dato = 2;
			var datos = Array(dorsal,0,1,0,0); // (dorsal, amarilla, exclusiones, roja, azul)
			guardarSancion(4,ad,2,equipo,dorsal,equipo2,dorsal2);
			// 3. Temporizadores de las exclusiones actuales
			var jugador = equipo+dorsal;
			var array = Array(2,0);
			sessionStorage.setItem('sancion'+jugador,JSON.stringify(array));
			break;
		case "TAmarilla":
			// 2. Total de las sanciones de los jugadores
			var dato = 1;
			var datos = Array(dorsal,1,0,0,0); // (dorsal, amarilla, exclusiones, roja, azul)
			guardarSancion(4,ad,3,equipo,dorsal,equipo2,dorsal2);
			break;
		case "TRoja":
			// 2. Total de las sanciones de los jugadores
			var dato = 3;
			var datos = Array(dorsal,0,0,1,0); // (dorsal, amarilla, exclusiones, roja, azul)
			guardarSancion(4,ad,4,equipo,dorsal,equipo2,dorsal2);
			// 3. Temporizadores de las exclusiones actuales
			var jugador = equipo+dorsal;
			var array = Array(2,0);
			sessionStorage.setItem('sancion'+jugador,JSON.stringify(array));
			break;
		case "TAzul":
			// 2. Total de las sanciones de los jugadores
			var dato = 4;
			var datos = Array(dorsal,0,0,0,1); // (dorsal, amarilla, exclusiones, roja, azul)
			guardarSancion(4,ad,5,equipo,dorsal,equipo2,dorsal2);
			// 3. Temporizadores de las exclusiones actuales
			var jugador = equipo+dorsal;
			var array = Array(2,0);
			sessionStorage.setItem('sancion'+jugador,JSON.stringify(array));
			break;
		case "Penalti":
			// 2. Total de las sanciones de los jugadores
			guardarSancion(4,ad,7,equipo,dorsal,equipo2,dorsal2);
			break;
	}
	// Incluir en storage (punto 2)
	var labelTotales = "sancionesTotales"+equipo;
	if (sessionStorage.getItem(labelTotales)) {
		if (JSON.parse(sessionStorage.getItem(labelTotales)).length > 0) {
			var arrayTotales = JSON.parse(sessionStorage.getItem(labelTotales));
			var contador = 0;
			for (var i = 0; i < arrayTotales.length; i++) {
				if (arrayTotales[i][0] == dorsal) {
					contador ++;
					arrayTotales[i][dato] = arrayTotales[i][dato]+1;
				}
			}
			if (contador == 0) {
				arrayTotales.push(datos);
			}
		}else{
			var arrayTotales = [];
			arrayTotales.push(datos);
		}

		var arrayFiltrado = [...new Set(arrayTotales)]; // Filtrado para evitar duplicados
		sessionStorage.setItem(labelTotales, JSON.stringify(arrayFiltrado));
	}

	mostrarSanciones(equipo);
};
	async function guardarSancion(evento,AD,acierto,equipo,dorsal,equipo2,dorsal2,minuto) {
		if (!minuto || minuto !== undefined) {
			let min = sessionStorage.getItem("minuto") ? sessionStorage.getItem("minuto") : "00";
			let sec = sessionStorage.getItem("segundo") ? sessionStorage.getItem("segundo") : "00";
			var minuto = "00:"+min+":"+sec;
		}

		var id1 = jugador(equipo,dorsal);
		var id2 = equipo2 ? jugador(equipo2,dorsal2) : "";

		$.ajax ({
			url: "php/guardarSancionBM.php",
	        type: 'POST',
	        data: {
	        	idPartido: sessionStorage.getItem("idPartido"),
	        	periodo: sessionStorage.getItem("periodo"),
	        	minuto: minuto,
	        	evento: evento,
	        	AD: AD,
	        	acierto: acierto,
	        	superioridad: superioridad(),
	        	equipo: equipo,
	        	idJugador1: id1,
	        	idJugador2: id2
	        },
	        timeout: 10000,
	        error: function() {guardarSancion(evento,AD,acierto,equipo,dorsal,equipo2,dorsal2,minuto);}
		});
	};


/* Aplicar temporizador por Exclusión */
///////////////////////////////////////////////////////////// ARREGLAR ESTA PARTE: Falta mejorarlo visualmente y cuando son rojas y azules (son 2 minutos y hay que quitar a alguien del campo)
function mostrarSanciones(equipo) {
	var equipo = equipo ? Array(equipo) : Array("L","V");

	for (var j = 0; j < equipo.length; j++) {
		// Coger storage		
		var labelActuales = "sancionadosActuales"+equipo[j];
		var sancionadosActuales = sessionStorage.getItem(labelActuales);

		if (sancionadosActuales) {
			var arrayActuales = JSON.parse(sancionadosActuales);
			
			// Mostrar sanciones en camiseta
			var labelTotales = "sancionesTotales"+equipo[j];
			var totalesSanciones = sessionStorage.getItem(labelTotales);

			if (totalesSanciones) {
				var arrayTotales = JSON.parse(totalesSanciones);
				for (var k = 0; k < arrayTotales.length; k++) { // Bucle para buscar en datos totales de sancionados
					if (arrayTotales[k][4] !== 0) {		// 1. Comprobar si tiene tarjeta azul
 						var codigo = "<img class='h80 contadorTarjeta' src='img/Captura/tarjetaAzul.png'>";
					}else if (arrayTotales[k][3] !== 0) {	// 2. Comprobar si tiene tarjeta roja
 						var codigo = "<img class='h80 contadorTarjeta' src='img/Captura/tarjetaRoja.png'>";
					}else if (arrayTotales[k][2] !== 0) {	// 3. Comprobar si tiene exclusiones
						var codigo = "";
						for (var l = 1; l <= arrayTotales[k][2]; l++) {
							codigo += "<img class='contador"+l+"' src='img/Captura/exclusion"+l+".png' alt='exclusion'>";
						}
					}else if (arrayTotales[k][1] !== 0) {	// 4. Comprobar si tiene tarjeta amarilla
 						var codigo = "<img class='h80 contadorTarjeta' src='img/Captura/tarjetaAmarilla.png'>";
					}
					var labelId1 = "playerExclusion"+equipo[j]+arrayTotales[k][0];
					var labelId2 = "exclusion"+equipo[j]+arrayTotales[k][0];
					if (document.getElementById(labelId1)) {
						document.getElementById(labelId1).innerHTML = codigo;
					}
					if (document.getElementById(labelId2)) {
						document.getElementById(labelId2).innerHTML = codigo;
					}
				}
			}
			// Mostrar contadores de sanciones
			var codigo = "";
			for (var i = 0; i < arrayActuales.length; i++) { // Bucle entre los sancionados actuales
				var labelTiempo = "sancion"+equipo[j]+arrayActuales[i];
				var tiempo = sessionStorage.getItem(labelTiempo);
				if (tiempo) {
					var arrayTiempo = JSON.parse(tiempo);
					if (arrayTiempo[1] == 0) {
						var segundos = "00";
					}else{
						var segundos = arrayTiempo[1];
					}
					if (equipo[j] == "L") {
						var nombreCompleto = "local";
					}else{
						var nombreCompleto = "visitante";
					}
					codigo += "	<span id='contadorSancion"+arrayActuales[i]+equipo[j]+"'><label id='sancion"+arrayActuales[i]+equipo[j]+"'>"+arrayTiempo[0]+":"+segundos+"</label><label id='labelSancion"+arrayActuales[i]+equipo[j]+"'>(<strong class='texto"+nombreCompleto+"'>"+arrayActuales[i]+"</strong>) </label></span>";
				}
			}
			var labelContadores = "#sanciones"+equipo[j];
			$(labelContadores).html(codigo);
		}
	}


			// visual
			// no poder elegir (ver el tema de si es sanción al banquillo)


};


// USO DEL RELOJ
function relojInicial(inicial) {
	if (inicial) {
		var minutoSplit = inicial.split(":");
		var minutos = minutoSplit[0];
		var segundos = minutoSplit[1];
		if (minutos == "00" && segundos == "00") {sessionStorage.setItem("inicio","Si");}
	}else{
		var minutos = sessionStorage.getItem("minuto");
		var segundos = sessionStorage.getItem("segundo");
	}

	if (minutos && segundos) {
		sessionStorage.setItem("minuto",minutos);
		sessionStorage.setItem("segundo",segundos);
		imprimirReloj(minutos, segundos);
	}else {
		sessionStorage.setItem("minuto","00");
		sessionStorage.setItem("segundo","00");
		imprimirReloj("00","00");
		sessionStorage.setItem("inicio","Si");
	}
};
	function inicioReloj() {
		/* Cambiar botones */
		$('#botonInicioReloj').fadeOut('slow');
		$('#botonEstadisticas').fadeOut('slow');
		$('#botonesReloj').delay(500).fadeIn('slow');

		// Asegurarse que no está la pantalla de estadísticas
		document.getElementById("marcadorCentral").classList.remove('invisible');
		document.getElementById("marcadorInferior").classList.remove('invisible');
		document.getElementById("cuadroEstadisticas").classList.add('invisible');

		if (sessionStorage.getItem("minuto")) {
			var minutos = sessionStorage.getItem("minuto");
			var segundos = sessionStorage.getItem("segundo");
		}else {
			var minutos = '00';
			var segundos = '00';
			sessionStorage.setItem("minuto","00");
			sessionStorage.setItem("segundo","00");
		}

		if (!sessionStorage.getItem("periodo")) {
			sessionStorage.setItem("periodo","1");
		}

		imprimirReloj(minutos,segundos);

		sessionStorage.setItem("tiempo","Si");
		sessionStorage.removeItem("tiempoParado");

		setTimeout(updateClock(),1000);
	};
	function pausaReloj(tipoPausa) {
		$("#botonesReloj").hide();
		if (tipoPausa === "tiempo"){
			// Mostrar pantalla de elección de equipo
			$("#botonInicioReloj").hide();
			$('#botonEstadisticas').hide();
			$("#botonTiempoMuerto").show();
				if (sessionStorage.getItem("tiempoMuertoLocal") == "0") {
					$("#botonTMLocal").hide();
					$("#botonTMCancelar").show();
				}
				if (sessionStorage.getItem("tiempoMuertoVisitante") == "0") {
					$("#botonTMVisitante").hide();
					$("#botonTMCancelar").show();
				}
			// Registrar pausa
			sessionStorage.setItem("tiempoParado","Tiempo Muerto");
		}else if (tipoPausa === "pausa") {
			sessionStorage.setItem("tiempoParado","Pausa juego");
			$('#botonInicioReloj').show();
			$('#botonEstadisticas').show();
			document.getElementById("mandoEstadisticas").classList.remove("open");
			document.getElementById("imgBotonEstadisticas").src = "img/Captura/estadisticas.png";
		}

		if (sessionStorage.getItem("tiempo") === "Si") {
			sessionStorage.setItem("tiempo","No");
		}else if (sessionStorage.getItem("tiempo") === "No"){
			sessionStorage.setItem("tiempo","Si");
			setTimeout(updateClock(),1000);
		}
	};
	function tiempoMuerto(equipo) {
		if (equipo != "cancelar") {
			guardarIncidencia(10,equipo,1);
			registroDatos("Tiempo Muerto",equipo,equipo.charAt(0).toUpperCase());
			// Marcar en contadores de tiempos muertos
			contadorTM(equipo);
		}
		$("#botonTiempoMuerto").hide();
		$("#botonInicioReloj").show();
		$('#botonEstadisticas').show();
	};
	function updateClock() {
		//Convertir valores a Int
		var minutosInt = parseInt(sessionStorage.getItem("minuto"));
		var segundosInt = parseInt(sessionStorage.getItem("segundo"));

		if (minutosInt === 0 && segundosInt === 1) {
			switch(sessionStorage.getItem("periodo")) {
				case "1":
					guardarEstado();
					registroDatos("Inicio1");
					break;
				case "2":
					guardarEstado();
					registroDatos("Inicio2");
					break;
			}
		} // Inicio de partido => cambiar estado

		if (sessionStorage.getItem("tiempo") === "Si") {
			if (segundosInt === 59) {
				minutosInt += 1;
				segundosInt = 0;
			}else{
				segundosInt += 1;
			}

			var minutosOk = convertirString(minutosInt);
			var segundosOk = convertirString(segundosInt);
			
			imprimirReloj(minutosOk,segundosOk);

			sumarSegundo(sessionStorage.getItem("idPartido"),"00:"+minutosOk+":"+segundosOk);

			sessionStorage.setItem("minuto",convertirString(minutosInt));
			sessionStorage.setItem("segundo",convertirString(segundosInt));

			relojExclusiones(); // Hacer funcionar reloj de exclusiones

			if (minutosInt === 30 && segundosInt === 0) {
				var minutosOk = convertirString(minutosInt);
				var segundosOk = convertirString(segundosInt);
				imprimirReloj(minutosOk,segundosOk);
				sessionStorage.setItem("minuto","00");
				sessionStorage.setItem("segundo","00");
				if (sessionStorage.getItem("periodo") == "1") {
					sessionStorage.setItem("periodo","2");
					var mensajeReloj = "Final 1ª parte";
					guardarEstado();
					registroDatos("Mitad");
				}else {
					sessionStorage.setItem("periodo","3");
					var mensajeReloj = "Final del partido";
					guardarEstado();
					registroDatos("Final");
				}
				$("#periodoReloj").html(mensajeReloj); //Impresión en reloj
				$('#botonesReloj').hide();
				$('#botonInicioReloj').show();
			} else {
				setTimeout(updateClock,1000);
			}
		} else if (sessionStorage.getItem("tiempo") === "No") {
			var minutos = convertirString(minutosInt);
			var segundos = convertirString(segundosInt);
			imprimirReloj(minutos,segundos);

			// Ver si es pausa o tiempo muerto
			if (sessionStorage.getItem("tiempoParado") === "Tiempo Muerto") {
				$('#botonesReloj').hide();
				$('#botonTiempoMuerto').show();
			} else if (sessionStorage.getItem("tiempoParado") === "Pausa juego") {
				$('#botonesReloj').hide();
				$('#botonTiempoMuerto').hide();
				$('#botonInicioReloj').show();
			}
		} else {
			var minutos = convertirString(minutosInt);
			var segundos = convertirString(segundosInt);
			imprimirReloj(minutos,segundos);
			$('#botonesReloj').hide();
		}

		function convertirString(numero) {
			const numeroString = numero < 10 ? '0' + numero.toString() : numero.toString();
			return numeroString;
		}
	};
		async function sumarSegundo(idPartido,minuto) {
			$.ajax({
				url: "php/sumarSegundo.php",
				type: 'POST',
				data: {
					idPartido: idPartido,
					minuto: minuto
				}
			});
		};
	function relojExclusiones() {
		var equipo = ["L","V"];

		for (var i = 0; i < 2; i++) {
			var labelJugadores = "sancionadosActuales"+equipo[i];
			var jugadoresSancionados = sessionStorage.getItem(labelJugadores);

			if (jugadoresSancionados) {
				var jugadores = JSON.parse(jugadoresSancionados);
				
				for (var j = 0; j < jugadores.length; j++) {
					var jugador = "sancion"+equipo[i]+jugadores[j];
					var tiempo = JSON.parse(sessionStorage.getItem(jugador));
					var minuto = tiempo[0];
					var segundo = tiempo[1];
					
					var spanTiempoJugador = "contadorSancion"+jugadores[j]+equipo[i];

					if (tiempo) {
						if (segundo == "00" || segundo == 0) {
							if (minuto == 0) {
								// Final de la cuenta
								//var finalizarContador = "."+jugador;
								//$(etiquetaJugador).addClass("invisible");
								if (document.getElementById(spanTiempoJugador)) {
									document.getElementById(spanTiempoJugador).remove();
								}
								var jugadorInactivo = "#jugador"+jugador;
								$(jugadorInactivo).removeClass("jugadorFuera");
								sessionStorage.removeItem(jugador);
								//sessionStorage.removeItem(jugador+"min");
								//sessionStorage.removeItem(jugador+"sec");
								var jugadoresNuevo = jugadores.filter((player) => player !== jugadores[j]); // Orden para eliminar a jugador
								sessionStorage.setItem(labelJugadores,JSON.stringify(jugadoresNuevo));
							}else {
								segundo = 59;
								minuto = parseInt(minuto) - 1;
								imprimirContador();
							}
						}else {
							segundo = parseInt(segundo) - 1;
							if (segundo < 10) {
								segundo = "0"+segundo;
							}
							imprimirContador();
						}

						function imprimirContador() {
							//Actualizar el valor guardado
							var array = Array(minuto,segundo);
							sessionStorage.setItem(jugador,JSON.stringify(array));

							//Imprimir contador actualizado
							var labelTiempoJugador = "sancion"+jugadores[j]+equipo[i];
							if (document.getElementById(labelTiempoJugador)) {
								var imprimir = minuto.toString()+":"+segundo.toString();
								document.getElementById(labelTiempoJugador).innerHTML = imprimir;
							}
						}
					}
				}
			}
		}
		return;
	};
	function imprimirReloj(minutos,segundos) {
		const data = sessionStorage.getItem("periodo");
		const periodo = data ? data+"ª parte" : "Partido sin iniciar";

		var reloj = "	<div id='periodoReloj' class='w100 h20'>"+periodo+"</div>";
		reloj += "		<input type='text' id='valorReloj' value='"+minutos+":"+segundos+"'' style='display: none;''>";
		reloj += "		<div id='pantallaReloj' class='pantallaReloj w90 h70 centradoXY'>"+minutos+":"+segundos+"</div>";
		$("#reloj").html(reloj);
		$("#reloj").show();
	};


// PANTALLA ESTADÍSTICAS
function mostrarEstadisticasPartido() {
	// Cambiar de pantallas
	document.getElementById("marcadorCentral").classList.toggle('invisible');
	document.getElementById("marcadorInferior").classList.toggle('invisible');
	document.getElementById("cuadroEstadisticas").classList.toggle('invisible');

	mostrarMandoEstadisticas();
};
	function mostrarMandoEstadisticas() {
		document.getElementById("mandoEstGenerales").style.color = "var(--color-corporativo-rosa)";
		document.getElementById("mandoEstGraficas").style.color = "var(--color-texto)";
		document.getElementById("mandoEstJugadores").style.color = "var(--color-texto)";
		document.getElementById("mandoEstPro").style.color = "var(--color-texto)";
		
		document.getElementById("marcoEstGenerales").classList.remove("invisible");
		document.getElementById("mandoEstadisticas").classList.remove('invisible');


		document.getElementById("mandoEstadisticas").classList.toggle("open");
		if (document.getElementById("mandoEstadisticas").classList.contains('open')) {
			document.getElementById("imgBotonEstadisticas").src = "img/Captura/error.png";
		}else{
			document.getElementById("imgBotonEstadisticas").src = "img/Captura/estadisticas.png";
		}

		mostrarResultadoEstadisticas("Generales");
	};
	function mostrarCuadroEstadisticas(opcion) {
		document.getElementById("marcoEstGenerales").classList.add("invisible");
		document.getElementById("marcoEstGraficas").classList.add("invisible");
		document.getElementById("marcoEstJugadores").classList.add("invisible");
		document.getElementById("marcoEstPro").classList.add("invisible");
		document.getElementById("mandoEstGenerales").style.color = "var(--color-texto)";
		document.getElementById("mandoEstGraficas").style.color = "var(--color-texto)";
		document.getElementById("mandoEstJugadores").style.color = "var(--color-texto)";
		document.getElementById("mandoEstPro").style.color = "var(--color-texto)";


		var label = "marcoEst"+opcion;
		var label2 = "mandoEst"+opcion;
		document.getElementById(label).classList.remove("invisible");
		document.getElementById(label2).style.color = "var(--color-corporativo-rosa)";

		mostrarResultadoEstadisticas(opcion);
	};

	function mostrarResultadoEstadisticas(opcion) {
		var label = "marcoEst"+opcion;
		var IdPartido = sessionStorage.getItem("idPartido");
		switch (opcion) {
			case "Generales":
				$.ajax({
			        url: "php/datosPartidoGenerales.php",
			        type: 'POST',
			        data: {
			        	IdPartido: IdPartido,
			        },

			        success: function(res){
			        	var js= JSON.parse(res);

						var codigo = "";

						var listadoCategorias = Array("Posesiones","Tiros","Penaltis","Pases","Asistencias","Robos","Contraataques","Superioridades");

						for (var i = 0; i < listadoCategorias.length; i++) {
							var datoL = eval("js.Local[0]."+listadoCategorias[i]) == null ? 0 : eval("js.Local[0]."+listadoCategorias[i]);
							var datoOKL = eval("js.Local[0]."+listadoCategorias[i]+"OK") == null ? 0 : eval("js.Local[0]."+listadoCategorias[i]+"OK");

							var datoV = eval("js.Visitante[0]."+listadoCategorias[i]) == null ? 0 : eval("js.Visitante[0]."+listadoCategorias[i]);
							var datoOKV = eval("js.Visitante[0]."+listadoCategorias[i]+"OK") == null ? 0 : eval("js.Visitante[0]."+listadoCategorias[i]+"OK");
							
							if (listadoCategorias[i] == "Superioridades") {
								var porcentajeOKL = eval("js.Local[0]."+listadoCategorias[i]+"OK");
								var porcentajeOKV = eval("js.Visitante[0]."+listadoCategorias[i]+"OK");
							}else{
								var porcentajeOKL = datoOKL == 0 ? 0 : Math.round(10*(100*datoOKL/datoL))/10+"%";
								var porcentajeOKV = datoOKV == 0 ? 0 : Math.round(10*(100*datoOKV/datoV))/10+"%";
							}

							codigo += "		<div class='filaEstGeneral w80 h10 centradoInlineXY'>";
							codigo += "			<div class='bordeIzq estDatoA w15 h90 centradoXY'><big>"+datoL+"</big></div>";
							codigo += "			<div class='bordeIzq estDatoB w15 h70 centradoXY'>"+porcentajeOKL+"</div>";
							codigo += "			<div class='bordeIzq bordeDer estaCategoria w40 centradoXY'><strong>"+listadoCategorias[i]+"</strong></div>";
							codigo += "			<div class='bordeDer estDatoB w15 h70 centradoXY'>"+porcentajeOKV+"</div>";
							codigo += "			<div class='bordeDer estDatoA w15 h90 centradoXY'><big>"+datoV+"</big></div>";
							codigo += "		</div>";
						}

						document.getElementById(label).innerHTML = codigo;
					}
				});
				break;
			case "Graficas":
				var codigo = "";
				codigo += "			<div id='datosEstGraficas' class='w95 h70 centradoXY'>";
				codigo += "		 		<div class='h90 w100 centradoXY flexWrap'>";
				codigo += "				 	<div class='h100 w100 centradoXY flexWrap cajaGrafica'>";
				codigo += "					 	<div class='h90 w100 evolucionGrafica'>";
				codigo += "							<div class='verticalGrafica w50 h100'></div>";
				codigo += "							<div class='verticalGrafica w51 h100'></div>";
				for (var i = 1; i <= 4; i++) {
					codigo += "						<div class='lineaGrafica w100 h"+(25*i)+"'></div>";
				}
				for (var i = 0; i < 2; i++) {
					var arrayEq = Array("Local","Visitante");
					var arrayDatos = Array("optPosesiones","optTiroTotal","optTiroGol","optTiroParado","optTiroFuera","optTiroBloqueado","optPerdidaFor","optPerdidaNoFor","optPasivoAviso","optPasivoSancion","optRoboIntento","optRoboRobado","optSancionGolpe","optSancionTExcl","optSancionTAm","optSancionTRj","optSancionTAz");
					for (var j = 0; j < arrayDatos.length; j++) {
						codigo += "					<canvas id='linea"+arrayDatos[j]+arrayEq[i]+"' class='w100 h100' width='684' height='329'>Tu navegador no soporta HTML5 Canvas</canvas>";
					}
				}
				codigo += "						</div>";
				codigo += "					 	<div class='h10 w100 centradoInlineXY evolucionLabel'>";
				for (var i = 0; i < 31; i++) {
					codigo += "						<div class='h100 centradoXY' style='width:"+(100/62).toFixed(2)+"%'>"+i+"</div>";
				}
				for (var i = 0; i < 31; i++) {
					codigo += "						<div class='h100 centradoXY' style='width:"+(100/62).toFixed(2)+"%'>"+i+"</div>";
				}
				codigo += "						</div>";
				codigo += "					</div>";
				codigo += "				</div>";
				codigo += "			</div> ";
				codigo += "			<div id='submandoEstGraficas' class='w80 h30 cajaAbatible centradoXY flexWrap'>";
				codigo += "				<div class='w100 h15 spaceAroundXY'>";
				codigo += "					<div class='w30 centradoXY'><input id='optLocal' type='checkbox' name='optLocal'><label class='textolocal' for='optLocal'>&nbspEquipo Local</label></div>";
				codigo += "					<div class='w30 centradoXY'><input id='optPosesiones' type='checkbox' name='optPosesiones' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",11,0)\"><label class='textoPosesiones' for='optPosesiones'>&nbspPosesiones</label></div>";
				codigo += "					<div class='w30 centradoXY'><input id='optVisitante' type='checkbox' name='optVisitante'><label class='textovisitante' for='optVisitante'>&nbspEquipo Visitante</label></div>";
				codigo += "				</div> ";
				codigo += "				<div class='w100 h85 centradoInlineXY'>";
				codigo += "					<div class='w50 h100 centradoInlineXY'>";
				codigo += "						<div class='w50 h90 centradoXY flexWrap'>";
				codigo += "							<h3>TIROS</h3>";
				codigo += "							<div class='w90'><input id='optTiroTotal' type='checkbox' name='optTiroTotal' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",1,0)\"><label class='' for='optTiroTotal'>&nbspTotales</label></div>";
				codigo += "							<div class='w90'><input id='optTiroGol' type='checkbox' name='optTiroGol' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",1,1)\"><label class='' for='optTiroGol'>&nbspGoles</label></div>";
				codigo += "							<div class='w90'><input id='optTiroParado' type='checkbox' name='optTiroParado' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",1,2)\"><label class='' for='optTiroParado'>&nbspParados</label></div>";
				codigo += "							<div class='w90'><input id='optTiroFuera' type='checkbox' name='optTiroFuera' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",1,4)\"><label class='' for='optTiroFuera'>&nbspFuera</label></div>";
				codigo += "							<div class='w90'><input id='optTiroBloqueado' type='checkbox' name='optTiroBloqueado' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",1,5)\"><label class='' for='optTiroBloqueado'>&nbspBloqueados</label></div>";
				codigo += "						</div> ";
				codigo += "						<div class='w50 h90 centradoXY flexWrap'>";
				codigo += "							<h3>PÉRDIDAS</h3>";
				codigo += "							<div class='w90'><input id='optPerdidaFor' type='checkbox' name='optPerdidaFor' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",5,1)\"><label class='' for='optPerdidaFor'>&nbspForzadas</label></div>";
				codigo += "							<div class='w90'><input id='optPerdidaNoFor' type='checkbox' name='optPerdidaNoFor' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",5,2)\"><label class='' for='optPerdidaNoFor'>&nbspNo Forzadas</label></div>";
				codigo += "							<h3>PASIVOS</h3>";
				codigo += "							<div class='w90'><input id='optPasivoAviso' type='checkbox' name='optPasivoAviso' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",7,1)\"><label class='' for='optPasivoAviso'>&nbspAvisos</label></div>";
				codigo += "							<div class='w90'><input id='optPasivoSancion' type='checkbox' name='optPasivoSancion' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",7,3)\"><label class='' for='optPasivoSancion'>&nbspSancionados</label></div>";
				codigo += "						</div> ";
				codigo += "					</div> ";
				codigo += "					<div class='w50 h100 centradoInlineXY'>";
				codigo += "						<div class='w50 h90 centradoXY flexWrap'>";
				codigo += "							<h3>ROBOS</h3>";
				codigo += "							<div class='w90'><input id='optRoboIntento' type='checkbox' name='optRoboIntento' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",5,5)\"><label class='' for='optRoboIntento'>&nbspIntentos</label></div>";
				codigo += "							<div class='w90'><input id='optRoboRobado' type='checkbox' name='optRoboRobado' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",5,6)\"><label class='' for='optRoboRobado'>&nbspRobados</label></div>";
				codigo += "							<div class='w90 h80'></div>";
				codigo += "						</div> ";
				codigo += "						<div class='w50 h90 centradoXY flexWrap'>";
				codigo += "							<h3>SANCIONES</h3>";
				codigo += "							<div class='w90'><input id='optSancionGolpe' type='checkbox' name='optSancionGolpe' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",4,1)\"><label class='' for='optSancionGolpe'>&nbspGolpes Francos</label></div>";
				codigo += "							<div class='w90'><input id='optSancionTExcl' type='checkbox' name='optSancionTExcl' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",4,2)\"><label class='' for='optSancionTExcl'>&nbspExclusiones</label></div>";
				codigo += "							<div class='w90'><input id='optSancionTAm' type='checkbox' name='optSancionTAm' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",4,3)\"><label class='' for='optSancionTAm'>&nbspT.Amarillas</label></div>";
				codigo += "							<div class='w90'><input id='optSancionTRj' type='checkbox' name='optSancionTRj' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",4,4)\"><label class='' for='optSancionTRj'>&nbspT.Rojas</label></div>";
				codigo += "							<div class='w90'><input id='optSancionTAz' type='checkbox' name='optSancionTAz' onchange=\"seleccionarDatoGrafica(this.id,"+IdPartido+",4,5)\"><label class='' for='optSancionTAz'>&nbspT.Azules</label></div>";
				codigo += "						</div> ";
				codigo += "					</div> ";
				codigo += "				</div> ";
				codigo += "			</div> ";
				document.getElementById(label).innerHTML = codigo;

				document.getElementById("submandoEstGraficas").classList.remove("open");
				setTimeout(document.getElementById("submandoEstGraficas").classList.add("open"),500);
				break;
			case "Jugadores":
				var codigo = "";
				codigo += "			<div id='datosEstJugadores' class='w90 h70 centradoInlineXY'>";
				codigo += "				<div class='w60 h100'>";
				codigo += "					<div id='jugadorFicha' class='w100 h25 centradoInlineXY'>";
				
				codigo += "					</div>";
				codigo += "					<div id='jugadorDatos' class='w100 h75 centradoXY flexWrap' style='text-align:center; font-size:1.8em'>";
				
				codigo += "					</div>";
				codigo += "				</div>";
				codigo += "				<div class='w40 h100 centradoXY'>";
				codigo += "					<img id='jugadorCampo' class='h95' src='img/Menu/campo10.png' alt='campo'>";
				codigo += "				</div>";
				codigo += "			</div>";
				codigo += "			<div id='submandoEstJugadores' class='w80 h30 cajaAbatible spaceAroundXY filas invisible'>";

				const convocatoriaL = sessionStorage.getItem("Mostrar L") == "Si" ? JSON.parse(sessionStorage.getItem("ConvocatoriaL")) : 0;
				const convocatoriaV = sessionStorage.getItem("Mostrar V") == "Si" ? JSON.parse(sessionStorage.getItem("ConvocatoriaV")) : 0;
				const datosEquipoL = sessionStorage.getItem("Mostrar L") == "Si" ? JSON.parse(sessionStorage.getItem("jugadoresL")) : 0;
				const datosEquipoV = sessionStorage.getItem("Mostrar V") == "Si" ? JSON.parse(sessionStorage.getItem("jugadoresV")) : 0;

				const convocatorias = Array(convocatoriaL,convocatoriaV);
				const datosEquipo = Array(datosEquipoL,datosEquipoV);

				for (var i = 0; i < 2; i++) {
					if (i == 0) {
						var equipo = "L";
						var clase = "local";
					}else if (i == 1) {
						var equipo = "V";
						var clase = "visitante";
					}
					const longitud = convocatorias[i] ? convocatorias[i].length : 0;

					const labelInvisible = "Mostrar "+equipo;
					const opcionInvisible = sessionStorage.getItem(labelInvisible) == "Si" ? "" : " invisible";
					codigo += "			<div id='cuadroMandosEstJugadores"+equipo+"' class='w49 h100 spaceAroundXY flexWrap filas"+opcionInvisible+"'>";
					if (longitud > 0) {
						if (longitud < 9) {
							for (var j = 0; j < 8; j++) {
								for (var l = 0; l < datosEquipo[i].length; l++) {
									if (convocatorias[i][j] == datosEquipo[i][l].Dorsal) {
										codigo += "	<div id='"+datosEquipo[i][l].Dorsal+equipo+"' class='centradoXY pulsable fichaJugadores "+clase+"' onclick=\"verDatosJugador("+sessionStorage.getItem('idPartido')+",'"+clase+"',"+datosEquipo[i][j].ID_Jugador+","+datosEquipo[i][l].Dorsal+")\"><span class='noOperativo'>"+datosEquipo[i][j].Dorsal+"</span></div>";
									}
								}
							}
						}else{
							codigo += "		<div class='w100 h50 spaceAroundXY filas'>";
							for (var j = 0; j < longitud/2; j++) {
								for (var l = 0; l < datosEquipo[i].length; l++) {
									if (convocatorias[i][j] == datosEquipo[i][l].Dorsal) {
										codigo += "	<div id='"+datosEquipo[i][l].Dorsal+equipo+"' class='centradoXY pulsable fichaJugadores "+clase+"' onclick=\"verDatosJugador("+sessionStorage.getItem('idPartido')+",'"+clase+"',"+datosEquipo[i][j].ID_Jugador+","+datosEquipo[i][l].Dorsal+")\"><span class='noOperativo'>"+datosEquipo[i][j].Dorsal+"</span></div>";
									}
								}
							}
							codigo += "		</div>";
							codigo += "		<div class='w100 h50 spaceAroundXY filas'>";
							for (var k = Math.round(longitud/2); k < longitud; k++) {
								for (var l = 0; l < datosEquipo[i].length; l++) {
									if (convocatorias[i][k] == datosEquipo[i][l].Dorsal) {
										codigo += "	<div id='"+datosEquipo[i][l].Dorsal+equipo+"' class='centradoXY pulsable fichaJugadores "+clase+"' onclick=\"verDatosJugador("+sessionStorage.getItem('idPartido')+",'"+clase+"',"+datosEquipo[i][k].ID_Jugador+","+datosEquipo[i][l].Dorsal+")\"><span class='noOperativo'>"+datosEquipo[i][k].Dorsal+"</span></div>";
									}
								}
							}
							codigo += "		</div>";
						}
					}else{
						codigo += "			<div>No existen datos de los jugadores</div>";
					}
					codigo += "			</div>";
				}
				codigo += "			</div>";

				document.getElementById(label).innerHTML = codigo;

				document.getElementById("submandoEstJugadores").classList.remove("open");
				document.getElementById("submandoEstJugadores").classList.remove("invisible");
				setTimeout(document.getElementById("submandoEstJugadores").classList.add("open"),500);

				break;
			case "Pro":
				////////////////////// Incluir ajax
				var codigo = "";
				codigo += "Más adelante tendrás a tu disposición estadísticas y análisis más avanzados gracias a la versión <strong style='color:var(--color-pro)'>Pro</strong>";

				document.getElementById(label).innerHTML = codigo;
				break;
		}
	};
		function seleccionarDatoGrafica(idOpcion,idPartido,evento,acierto) {
			// Ver el estado del botón presionado
			if (document.getElementById(idOpcion).checked == true) {
				if (document.getElementById("optLocal").checked == true) {
					publicarGrafica("Local");
				}
				if (document.getElementById("optVisitante").checked == true) {
					publicarGrafica("Visitante");
				}

				function publicarGrafica(equipo) {
					$.ajax({
						url: "php/datosGraficaMaM.php",
						type: 'POST',
						data: {
							IdPartido: idPartido,
							Evento: evento,
							Acierto: acierto,
							equipo: equipo
						},
						success: function(res){
							var js= JSON.parse(res);

							if (js !== 0) {
								dibujarGrafica(equipo);

								// Dibujar gráfica
								function dibujarGrafica(nombre) {
									var label = "linea"+idOpcion+nombre;
									var canvas = document.getElementById(label).getContext("2d");

									canvas.beginPath();
									canvas.lineWidth = 2;
									canvas.miterLimit = 35;
									canvas.lineCap = "square";
									switch (nombre) {
										case "Local":
											var color = "#a557d8";
											break;
										case "Visitante":
											var color = "#c52bb4";
											break;
									}

									canvas.strokeStyle = color;
									canvas.lineJoin = "round";

									const ancho = 684; // Ancho de canvas: 684px
									const alto = 329; // Alto de canvas: 329px
									
									var minutos = 30; // 30 minutos por parte
									var periodos = 2; // número de periodos del partido
									var valorMaximoX = minutos * periodos;  // Min: 0; Max: 60
									const partesX = ancho / valorMaximoX; // dividir en px el ancho en partes iguales

									const valorMaximoY = 50; // se divide en 4 partes de 12.5
									const partesY = alto / valorMaximoY; // dividir en px el alto en partes iguales
									
									var xInicial = 0;
									if (js[0].Periodo == 1 && js[0].Minuto == 0) {
										var yInicial = alto - (partesY * 1);
									}else{
										var yInicial = alto;
									}
									canvas.moveTo(xInicial,yInicial);

									for (var i = 0; i < js.length; i++) {
										var x = (30*(js[i].Periodo-1) + parseInt(js[i].Minuto)) * partesX;
										var y = alto - (partesY * i);

										canvas.lineTo(x,y);
										canvas.lineTo(x,y);
									}
									canvas.stroke();
									canvas.stroke();
								};
							}
						}
					});
				}
			}else{
				// Quitar grafica local
				if (document.getElementById("optLocal").checked == false) {
					borrarGrafica("Local");
				}
				if (document.getElementById("optVisitante").checked == false) {
					borrarGrafica("Visitante");
				}

				function borrarGrafica(nombre){
					var label = "linea"+idOpcion+nombre;
					var canvas = document.getElementById(label).getContext("2d");
					canvas.clearRect(0,0,document.getElementById(label).width,document.getElementById(label).height);
				}
			}
		};
		function verDatosJugador(IdPartido,equipo,idJugador,dorsal) {
			$.ajax({
			    url: "php/datosDirectoJugador.php",
			    type: 'POST',
			    data: {
			    	idPartido: IdPartido,
			    	equipo: equipo,
			    	idJugador: idJugador
			    },
			    success: function(res){
			    	var js= JSON.parse(res);

					// Datos personales
			    	var codigoFicha = "";
			    	codigoFicha += " 						<div class='w20 h100 centradoXY'>";
					codigoFicha += "							<img class='w95' style='border-radius:50%' src='img/Clubes/Balonmano/Plantillas/"+js.IdEquipo[0].ID_Equipo+"/"+js.Jugador[0].Foto+"' alt='foto' onerror=\"this.src='img/Clubes/usuario.png'\">";
			    	codigoFicha += "						</div>";
			    	codigoFicha += " 						<div class='w80 h100 centradoXY flexWrap'>";
			    	codigoFicha += " 							<div class='h50'>";
					codigoFicha += "								<label>"+js.Jugador[0].Nombre+"</label>";
					codigoFicha += "								<label>"+js.Jugador[0].Apellido+"</label>";
					codigoFicha += "							</div>";
					codigoFicha += "							<div class='w100 h50 spaceAroundXY'>";
					codigoFicha += "								<div class='fichaDorsal h80 centradoXY'>"+js.Jugador[0].Dorsal+"</div>";
					codigoFicha += "								<div class='fichaPosicion h80 centradoXY'>"+textoPuestos(sessionStorage.getItem("Deporte"),js.Jugador[0].Posicion)+"</div>";
					var valoracion = Math.floor((Math.random() * (100-1)) + 1); //Aleatorio entre 1 y 100

					codigoFicha += "									<div class='fichaValoracion h80 centradoXY "+colorValoracion(valoracion)+"'>"+valoracion+"</div>";
					codigoFicha += "							</div>";
			    	codigoFicha += "						</div>";

					document.getElementById("jugadorFicha").innerHTML = codigoFicha;

					const direccionCampo = js.Jugador[0].Posicion ? "img/Menu/campo1"+js.Jugador[0].Posicion+".png" : "img/Menu/campo10.png";
					document.getElementById("jugadorCampo").src = direccionCampo;

					// Datos partido
					var codigoDatos = "";
					codigoDatos += " 						<div class='h30 w50 centradoXY flexWrap' onclick=\"mostrarActividadJugador('Tiros')\">";
					codigoDatos += "							<input id='inputTiros' name='inputTiros' type='checkbox' style='display:none'>";
					codigoDatos += "							<div class='w100 h40 centradoInlineXY'><label>Tiros</label><img id='imgInputTiros' class='h80' src='img/Captura/botonOFF.png' alt='boton'></div>";
					codigoDatos += "							<label class='w100 h50'><span style='color:var(--color-acierto)'>"+js.Datos[0].Goles+"</span>&nbsp/&nbsp<span>"+js.Datos[0].Tiros+"</span></label>";
					codigoDatos += "						</div>";
					codigoDatos += "						<div class='h30 w50 centradoXY flexWrap' onclick=\"mostrarActividadJugador('Pases')\">";
					codigoDatos += "							<input id='inputPases' name='inputPases' type='checkbox' style='display:none'>";
					codigoDatos += "							<div class='w100 h40 centradoInlineXY'><label>Pases</label><img id='imgInputPases' class='h80' src='img/Captura/botonOFF.png' alt='boton'></div>";
					codigoDatos += "							<label class='w100 h50'><span style='color:var(--color-acierto)'>"+js.Datos[0].PAcertados+"</span>&nbsp/&nbsp<span>"+js.Datos[0].Pases+"</span></label>";
					codigoDatos += "						</div>";
					codigoDatos += "						<div class='h30 w50 centradoXY flexWrap' onclick=\"mostrarActividadJugador('Robos')\">";
					codigoDatos += "							<input id='inputRobos' name='inputRobos' type='checkbox' style='display:none'>";
					codigoDatos += "							<div class='w100 h40 centradoInlineXY'><label>Robos</label><img id='imgInputRobos' class='h80' src='img/Captura/botonOFF.png' alt='boton'></div>";
					codigoDatos += "							<label class='w100 h50'><span style='color:var(--color-acierto)'>"+js.Datos[0].Robos+"</span>&nbsp/&nbsp<span>"+js.Datos[0].RAcertados+"</span></label>";
					codigoDatos += "						</div>";
					codigoDatos += "						<div class='h30 w50 centradoXY flexWrap' onclick=\"mostrarActividadJugador('Golpes')\">";
					codigoDatos += "							<input id='inputGolpes' name='inputGolpes' type='checkbox' style='display:none'>";
					codigoDatos += "							<div class='w100 h40 centradoInlineXY'><label>Golpes/2Min</label><img id='imgInputGolpes' class='h80' src='img/Captura/botonOFF.png' alt='boton'></div>";
					codigoDatos += "							<label class='w100 h50'>"+js.Datos[0].Golpes+"&nbsp/&nbsp<span style='color:var(--color-corporativo-rosa)'>"+js.Datos[0].Exclusiones+"</span></label>";
					codigoDatos += "						</div>";
					codigoDatos += "						<div class='h30 w50 centradoXY flexWrap' style='text-align:center'>";
					codigoDatos += "							<label class='w100 h40'>Tiempo jugado</label>";
					var minutos = js.Datos[0].Minutos !== null ? js.Datos[0].Minutos : "00:00";
					codigoDatos += "							<div class='w100 h50 centradoXY'><strong>"+minutos+"</strong></div>";
					codigoDatos += "						</div>";
					codigoDatos += "						<div class='h30 w50 centradoXY flexWrap'>";
					codigoDatos += "							<div class='w100 h40 centradoInlineXY'><label>Tarjetas</label></div>";
					codigoDatos += "							<label class='w100 h50'><span style='color:var(--color-oro2)'>"+js.Datos[0].TAmarilla+"</span>&nbsp/&nbsp<span style='color:var(--color-error)'>"+js.Datos[0].TRoja+"</span>&nbsp/&nbsp<span style='color:var(--color-visitante)'>"+js.Datos[0].TAzul+"</span></label>";
					codigoDatos += "						</div>";

					document.getElementById("jugadorDatos").innerHTML = codigoDatos;
			    }
			});
		};
		function mostrarActividadJugador(tipo) {
			var nombreEstado = "input"+tipo;
			var nombreImg = "imgInput"+tipo;
			if(document.getElementById(nombreEstado).checked) {
				document.getElementById(nombreImg).src="img/Captura/botonOFF.png";
				document.getElementById(nombreEstado).checked = false;
				// Esconder los datos
			}else{
				document.getElementById(nombreImg).src="img/Captura/botonON.png";
				document.getElementById(nombreEstado).checked = true;
				//Mostrar los datos
			}
		};

// EDITAR
function editar() {
	// Cambiar icono editar
	document.getElementById("opcionEditar").classList.add("invisible");
	document.getElementById("guardarEditar").classList.remove("invisible");

	// Editar reloj
	var datos = "	<div class='h100 w100 centradoInlineXY'>";
	datos += "			<div class='h100 w45 centradoXY flexWrap'>";
	datos += "				<input type='number' id='editarMinuto' class='editarReloj' min='0' max='30' value='"+sessionStorage.getItem('minuto')+"'>";
	datos += "			</div>";
	datos += "			<div style='margin-top:-10%'>:</div>";
	datos += "			<div class='h100 w45 centradoXY flexWrap'>";
	datos += "				<input type='number' id='editarSegundo' class='editarReloj' min='0' max='59' value='"+sessionStorage.getItem('segundo')+"'>";
	datos += "			</div>";
	datos += "		</div>";
	document.getElementById("pantallaReloj").innerHTML = datos;


	datos = "		<div id='imprimirMarcadorCapturaL' class='w45 h100 centradoXY'>";
	datos += "			<input type='number' id='editarResultadoL' class='w60' style='height:90% !important; font-size:3em' min='0' max='99' value='"+sessionStorage.getItem('MarcadorL')+"'>";
	datos += "		</div>";
	datos += "		<div id='guion' class='w10 h100 centradoXY'>";
	datos += "			<img src='img/Captura/guion.png'>";
	datos += "		</div>";
	datos += "		<div id='imprimirMarcadorCapturaV' class='w45 h100 centradoXY'>";
	datos += "			<input type='number' id='editarResultadoV' class='w60' style='height:90% !important; font-size:3em' min='0' max='99' value='"+sessionStorage.getItem('MarcadorV')+"'>";
	datos += "		</div>";
	document.getElementById("cajaNumeros").innerHTML = datos;

	// Mostrar botón vaciar partido
	document.getElementById("imprimirSeleccion").classList.remove("h100");
	document.getElementById("imprimirSeleccion").classList.add("h95");
	document.getElementById("botonVaciarPartido").classList.remove("h0");
	document.getElementById("botonVaciarPartido").classList.add("h5");
};
	function avisoVaciarPartido() {
		let text = "¡ADVERTENCIA!\nEsta acción NO SE PUEDE DESHACER.\n¿Seguro que quieres eliminar todos los datos del partido?";
		if (confirm(text) == true) {
			$.ajax({
				url: "php/vaciarDatosPartido.php",
				type: 'POST',
				data: {
					idPartido: sessionStorage.getItem("idPartido")
				},
				success: function() {
					capturaPartidoBalonmano(1,sessionStorage.getItem("idPartido"), sessionStorage.getItem("idLocal"), sessionStorage.getItem("idVisitante"));
				}
			});
		}
	};
function guardarEditar() {
	// Cambiar icono editar
	document.getElementById("guardarEditar").classList.add("invisible");
	document.getElementById("opcionEditar").classList.remove("invisible");

	// Reloj
	sessionStorage.setItem('minuto',document.getElementById('editarMinuto').value);
	sessionStorage.setItem('segundo',document.getElementById('editarSegundo').value);
	if(sessionStorage.getItem('minuto')[0] == "0") {
		var minuto = sessionStorage.getItem('minuto');
	}else{
		var minuto = parseInt(sessionStorage.getItem('minuto')) < 10 ? "0"+sessionStorage.getItem('minuto') : sessionStorage.getItem('minuto');
	}
	if(sessionStorage.getItem('segundo')[0] == "0") {
		var segundo = sessionStorage.getItem('segundo');
	}else{
		var segundo = parseInt(sessionStorage.getItem('segundo')) < 10 ? "0"+sessionStorage.getItem('segundo') : sessionStorage.getItem('segundo');
	}
	var datos = minuto+":"+segundo;
	document.getElementById("pantallaReloj").innerHTML = datos;

	// Resultado
	sessionStorage.setItem('MarcadorL',document.getElementById('editarResultadoL').value);
	sessionStorage.setItem('MarcadorV',document.getElementById('editarResultadoV').value);

	var datos = "	<div id='imprimirMarcadorCapturaL' class='w45 h100 centradoXY'>";
	datos += "			<label>"+sessionStorage.getItem('MarcadorL')+"</label>";
	datos += "		</div>";
	datos += "		<div id='guion' class='w10 h100 centradoXY'>";
	datos += "			<img src='img/Captura/guion.png'>";
	datos += "		</div>";
	datos += "		<div id='imprimirMarcadorCapturaV' class='w45 h100 centradoXY'>";
	datos += "			<label>"+sessionStorage.getItem('MarcadorV')+"</label>";
	datos += "		</div>";
	document.getElementById("cajaNumeros").innerHTML = datos;

	// Mostrar botón vaciar partido
	document.getElementById("botonVaciarPartido").classList.remove("h10");
	document.getElementById("botonVaciarPartido").classList.add("h0");
	document.getElementById("imprimirSeleccion").classList.remove("h90");
	document.getElementById("imprimirSeleccion").classList.add("h100");

	guardarGol("L");
	guardarGol("V");
};