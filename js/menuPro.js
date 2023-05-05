function prepararPantallaPro() {
	const textoIdioma = textoPro(); // Tomar Idioma
	let deporte = sessionStorage.getItem("Deporte");
	const deporteLabel = textoDeportes(deporte);
	const textoMSuperior = textoMenuSuperior();

	document.getElementById("loaderProEntrenamiento").classList.add("loader");
	// Preparar código cuadro superior
	var superior = versionBeta();		
	superior += "	<img class='h15 botonVolverMenuSuperior' src='img/Menu/anterior.png' alt='Volver'>";
	superior += "	<label onclick=\"pasarPantalla('menuPro','menuIndex')\">"+textoMSuperior[0]+"</label>";
	superior += "	<label class='botonMenuSuperior'>"+textoIdioma[0]+" · "+ deporteLabel +"</label>";
	superior += "	<img class='botonMenuSuperior logoBigDT' src='img/Menu/Logo_BigDT.png' onclick=\"pasarPantalla('menuPro','menuIndex')\">";
	$("#cajaMenuSuperiorPro").html(superior);

	// Preparar código central
	$.ajax({
		url: "php/datosPro.php",
		type: 'POST',
		data: {
			deporte: deporte
		},
		success: function(res){
			var js= JSON.parse(res);

			document.getElementById("loaderProEntrenamiento").classList.remove("loader");

			sessionStorage.setItem("deportePro",deporte);
			sessionStorage.setItem("IdClub",js[0].IdClub);
			sessionStorage.setItem("EscudoClub",js[0].Escudo);
			
			var central = "";
			central += "	<div id='menuProEntrenamiento' class='h33 w45 centradoXY flexWrap pulsable' onclick=\"menuEntrenamiento()\" ontouchstart=\"inicioPulsacion('menuProEntrenamiento')\" ontouchend=\"finPulsacion('menuProEntrenamiento')\">";
			central += "		<div class='w100 h100 cuadroMenuPro'></div>";
			central += "		<div class='w60 h70 centradoXY flexWrap'>";
			central += "			<h2 class='w90'>Entrenamientos</h2>";
			central += "			<p class='w95 h70'>Herramienta profesional para la gestión total de los entrenamientos: evolución, planificación y seguimiento.</p>";
			central += "		</div>";
			central += "		<div class='w33'>";
			central += "			<img class='w20' src='img/Menu/entrenamiento.png' alt='icono'>";
			central += "		</div>";
			central += "	</div>";
			central += "	<div id='menuProPizarra' class='h33 w45 centradoXY noOperativo' ontouchstart=\"inicioPulsacion('menuProPizarra')\" ontouchend=\"finPulsacion('menuProPizarra')\">";
			central += "		<div class='w100 h100 cuadroMenuPro'></div>";
			central += "		<div class='w33'>";
			central += "			<img class='w20' src='img/Menu/pizarra.png' alt='icono'>";
			central += "		</div>";
			central += "		<div class='w60 h70 centradoXY flexWrap'>";
			central += "			<h2 class='w90'>Pizarra Táctica</h2>";
			central += "			<p class='w95 h70'>Herramienta profesional avanzada.<br><br>Disponible próximamente.</p>";
			central += "		</div>";
			central += "	</div>";
			central += "	<div id='menuProInformes' class='h33 w45 centradoXY noOperativo' ontouchstart=\"inicioPulsacion('menuProInformes')\" ontouchend=\"finPulsacion('menuProInformes')\">";
			central += "		<div class='w100 h100 cuadroMenuPro'></div>";
			central += "		<div class='w60 h70 centradoXY flexWrap'>";
			central += "			<h2 class='w90'>Informes</h2>";
			central += "			<p class='w95 h70'>Herramienta profesional avanzada.<br><br>Disponible próximamente.</p>";
			central += "		</div>";
			central += "		<div class='w33'>";
			central += "			<img class='w20' src='img/Menu/EntrenadorPro.png' alt='icono'>";
			central += "		</div>";
			central += "	</div>";
			central += "	<div id='menuProConfiguracion' class='h33 w45 centradoXY pulsable' onclick=\"menuConfiguracionPro()\" ontouchstart=\"inicioPulsacion('menuProConfiguracion')\" ontouchend=\"finPulsacion('menuProConfiguracion')\">";
			central += "		<div class='w100 h100 cuadroMenuPro'></div>";
			central += "		<div class='w33'>";
			central += "			<img class='w20' src='img/Menu/configuracion.png' alt='icono'>";
			central += "		</div>";
			central += "		<div class='w60 h70 centradoXY flexWrap'>";
			central += "			<h2 class='w90'>Configuración</h2>";
			central += "			<p class='w95 h70'>Ajusta la app a lo que tus necesidades profesionales reclaman.</p>";
			central += "		</div>";
			central += "	</div>";
			central += "	<div id='menuProCentro' class='h50 centradoXY'>";
			central += "		<div id='textoMenuProCentro' class='w100 h100 centradoXY'>PRO-PRO-PRO-PRO-PRO-PRO-PRO-PRO-PRO-</div>";
			central += "		<div id='fondoMenuProCentro' class='w90 h90 centradoXY'></div>";
			central += "		<img class='w70' src='img/Clubes/Clubes/"+js[0].Escudo+"' alt='Escudo'>";
			central += "	</div>";

			$("#cajaMenuCentralPro").html(central);
			
			circle = document.getElementById("textoMenuProCentro");
			circlearray = circle.textContent.split('');
			circle.textContent = '';
			for(var i = 0; i< circlearray.length; i++){
				circle.innerHTML += '<span style="transform:rotate('+((i+1)*10)+'deg)">'+ circlearray[i]+'</span>';
			}
			
			// Colores personalizados
			if (sessionStorage.getItem("Color")) {
				const colores = JSON.parse(sessionStorage.getItem("Color"));

				document.getElementById("menuProEntrenamiento").style.background = colores[2];
				document.getElementById("menuProEntrenamiento").style.color = colores[3];
				document.getElementById("menuProPizarra").style.background = colores[2];
				document.getElementById("menuProPizarra").style.color = colores[3];
				document.getElementById("menuProInformes").style.background = colores[2];
				document.getElementById("menuProInformes").style.color = colores[3];
				document.getElementById("menuProConfiguracion").style.background = colores[2];
				document.getElementById("menuProConfiguracion").style.color = colores[3];

				document.getElementById("fondoMenuProCentro").style.background = colores[2];
			}
		},
		timeout: 10000,
		error: function() {prepararPantallaPro(deporte);}
	});
};
	function volverMenuPro(opcion) {
		const label = "cajaMenuPro"+opcion;
		document.getElementById("cajaMenuCentralPro").classList.remove("invisible");
		document.getElementById(label).classList.add("invisible");
	};

// Funciones Menú Entrenamiento
function menuEntrenamiento() {
	// Cambio de pantalla
	document.getElementById("cajaMenuCentralPro").classList.add("invisible");
	document.getElementById("cajaMenuProEntrenamiento").classList.remove("invisible");

	document.getElementById("loaderProEntrenamiento").classList.add("loader");
	$.ajax({
		url: "php/listaEquipos.php",
		type: 'POST',
		data: {
			deporte: sessionStorage.getItem("deportePro"),
			estado: "1"
		},
		success: function(res){
			const js = JSON.parse(res);
			const jsLength = js[0].length;

			document.getElementById("loaderProEntrenamiento").classList.remove("loader");

			codigo = "";
			codigo += "					<div id='volverEntPro' class='w5 h100 centradoXY pulsable' onclick=\"volverMenuPro('Entrenamiento')\" ontouchstart=\"inicioPulsacion('volverEntPro')\" ontouchend=\"finPulsacion('volverEntPro')\">";
			codigo += "						<img class='w90' src='img/Menu/anterior.png' alt='Volver'>";
			codigo += "					</div>";
			codigo += "					<div class='w85 h100 centradoXY flexWrap'>";
			codigo += "						<div id='cajaSubmenuPro' class='w100 h50 spaceAroundXY'>";
			codigo += "							<h1>Entrenamiento Pro</h1>";
			codigo += "							<select id='selectJugadoresEntrenamiento' class='w20 h50'>";
			codigo += "								<option value=''>Jugadores...</option>";
			codigo += "							</select>";
			codigo += "							<select id='selectEquiposEntrenamiento' class='w20 h50' onchange=\"confirmarEquipoPro()\">";
			codigo += "								<option value=''>Equipos Club...</option>";
			for (var i = 0; i < jsLength; i++) {
				codigo += "							<option value='"+js[0][i].ID_Equipo+"'>"+js[0][i].Nombre+"<small>("+valorCategoria(js[0][i].Categoria)+")</small></option>";
			}			
			codigo += "							</select>";
			codigo += "						</div>";
			codigo += "						<div id='ayudaEntrenamientoPro' class='w100 h50 spaceAroundXY'>";
			codigo += "						</div>";
			codigo += "					</div>";
			codigo += "					<div id='botonSwitchEntrenamientoResumen' class='w10 h100 centradoXY pulsable' onclick=\"switchBotonEntrenamiento(1)\">";
			codigo += "						<img id='imgBotonSwitchEntrenamientoResumen' class='w60 noOperativo' src='img/Menu/tablon.png' alt='Tablon'>";
			codigo += "						<img class='w30 noOperativo' src='img/Menu/switch.png' alt=''>";
			codigo += "						<div id='notificacionBotonSwitchResumen' class='notificaciones notificacionBotonSwitchEntrenamiento invisible'></div>";
			codigo += "					</div>";
			codigo += "					<div id='botonSwitchEntrenamientoTablon' class='w10 h100 centradoXY pulsable invisible' onclick=\"switchBotonEntrenamiento(2)\">";
			codigo += "						<img id='imgBotonSwitchEntrenamientoTablon' class='w60 noOperativo' src='img/Menu/Agenda.png' alt='Agenda'>";
			codigo += "						<img class='w30 noOperativo' src='img/Menu/switch.png' alt=''>";
			codigo += "						<div id='notificacionBotonSwitchTablon' class='notificaciones notificacionBotonSwitchEntrenamiento invisible'></div>";
			codigo += "					</div>";
			codigo += "					<div id='botonSwitchEntrenamientoAgenda' class='w10 h100 centradoXY pulsable invisible' onclick=\"switchBotonEntrenamiento(0)\">";
			codigo += "						<img id='imgBotonSwitchEntrenamientoAgenda' class='w60 noOperativo' src='img/Menu/entrenamiento.png' alt='Resumen'>";
			codigo += "						<img class='w30 noOperativo' src='img/Menu/switch.png' alt=''>";
			codigo += "						<div id='notificacionBotonSwitchAgenda' class='notificaciones notificacionBotonSwitchEntrenamiento invisible'></div>";
			codigo += "					</div>";
			document.getElementById("cajaSuperiorEntrenamientoPro").innerHTML = codigo;

			document.getElementById("agendaEntrenamiento").innerHTML = "Selecciona un equipo para visualizar su Agenda de Entrenamientos";

			document.getElementById("selectJugadoresEntrenamiento").classList.add("noOperativo");
			document.getElementById("selectJugadoresEntrenamiento").style.opacity = 0;

			// Colores personalizados
			if (sessionStorage.getItem("Color")) {
				const colores = JSON.parse(sessionStorage.getItem("Color"));
				document.getElementById("cajaSuperiorEntrenamientoPro").style.borderColor = colores[0];
				document.getElementById("agendaEntrenamiento").style.borderColor = colores[0];
				document.getElementById("selectJugadoresEntrenamiento").style.borderColor = colores[0];
				document.getElementById("selectEquiposEntrenamiento").style.borderColor = colores[0];
				document.getElementById("cajaMenuProEntrenamiento").style.background = colores[2];
			}

			verResumen();
			

			// Comprobar si hay notificaciones
		},
		timeout: 10000,
		error: function() {menuEntrenamiento();}
	});
};
	function switchBotonEntrenamiento(opcion) {
		const nombreOpcion = ["Resumen","Tablon","Agenda"];
		/*




Cada vez que le de a este botón hay que mirar en ajax si hay mensajes nuevos en el tablon para poner el globo de las notificaciones




		*/
		// Cambiar botón
		for (var i = 0; i < nombreOpcion.length; i++) {
			var labelDiv = "botonSwitchEntrenamiento"+nombreOpcion[i];
			document.getElementById(labelDiv).classList.add("invisible");

			var labelCaja = nombreOpcion[i].toLowerCase()+"Entrenamiento";
			document.getElementById(labelCaja).classList.add("invisible");
		}

		const labelFuera = "botonSwitchEntrenamiento"+nombreOpcion[opcion];
		document.getElementById(labelFuera).classList.remove("invisible");

		const labelVerCaja = nombreOpcion[opcion].toLowerCase()+"Entrenamiento";
		document.getElementById(labelVerCaja).classList.remove("invisible");

		if (opcion == 2) {
			codigo = "";
			codigo += "							<h2>Recuerda: </h2>";
			codigo += "							<span class='centradoXY'><img src='img/Menu/fuerza.png' alt='Fuerza'><label>:Fuerza </label></span>";
			codigo += "							<span class='centradoXY'><img src='img/Menu/flexibilidad.png' alt='Flexibilidad'><label>:Flexibilidad </label></span>";
			codigo += "							<span class='centradoXY'><img src='img/Menu/resistencia.png' alt='Resistencia'><label>:Resistencia </label></span>";
			codigo += "							<span class='centradoXY'><img src='img/Menu/velocidad.png' alt='Velocidad'><label>:Velocidad </label></span>";
			codigo += "							<span class='centradoXY'><img src='img/Menu/tactica.png' alt='Táctica'><label>:Táctica</label></span>";
			codigo += "							<span class='centradoXY'><img src='img/Menu/medidas.png' alt='Medidas'><label>:Medidas</label></span>";
			codigo += "							<span class='centradoXY'><img src='img/Menu/diaLibre.png' alt='Día'><label>:Día Descanso</label></span>";
			document.getElementById("selectJugadoresEntrenamiento").classList.remove("noOperativo");
			document.getElementById("selectJugadoresEntrenamiento").style.opacity = 1;
		}else{
			codigo = "";
			document.getElementById("selectJugadoresEntrenamiento").classList.add("noOperativo");
			document.getElementById("selectJugadoresEntrenamiento").style.opacity = 0;
		}
		document.getElementById("ayudaEntrenamientoPro").innerHTML = codigo;

		confirmarEquipoPro();
	};

	function confirmarEquipoPro() {
		if (!document.getElementById("resumenEntrenamiento").classList.contains("invisible")) {
			verResumen();
		}
		if (!document.getElementById("agendaEntrenamiento").classList.contains("invisible")) {
			verCalendario();
		}
		if (!document.getElementById("tablonEntrenamiento").classList.contains("invisible")) {
			verTablon();
		}
	};

	function verResumen() {
		codigo = "";
		codigo += " <div class='w90 h10 centradoXY'>";
		codigo += "		<div class='w50 h70 centradoInlineXY' style='border-radius:10px'>";
		codigo += "			<div id='botonCambiarResumenResumen' class='w33 h100 centradoXY pulsable' onclick=\"cambiarResumen('Resumen')\">Resumen</div>";
		codigo += "			<div id='botonCambiarEntrenamientosResumen' class='w33 h100 centradoXY pulsable' onclick=\"cambiarResumen('Entrenamientos')\">Entrenamientos</div>";
		codigo += "			<div id='botonCambiarPlantillaResumen' class='w33 h100 centradoXY pulsable' onclick=\"cambiarResumen('Plantilla')\">Plantilla</div>";
		codigo += "		</div>";
		codigo += " </div>";
		codigo += " <div class='w100 h90 centradoXY'>";
		codigo += "		<div id='cajaResumenResumen' class='w95 h95 centradoXY invisible'></div>";
		codigo += "		<div id='cajaEntrenamientosResumen' class='w95 h95 centradoXY flexWrap invisible'></div>";
		codigo += "		<div id='cajaPlantillaResumen' class='w95 h95 centradoXY flexWrap invisible'></div>";
		codigo += "	</div>";

		document.getElementById("resumenEntrenamiento").innerHTML = codigo;

		cambiarResumen('Resumen');
	};
		function cambiarResumen(opcion) {
			document.getElementById("cajaResumenResumen").classList.add("invisible");
			document.getElementById("cajaEntrenamientosResumen").classList.add("invisible");
			document.getElementById("cajaPlantillaResumen").classList.add("invisible");
			document.getElementById("botonCambiarResumenResumen").style.backgroundColor = "var(--color-contraste)";
			document.getElementById("botonCambiarEntrenamientosResumen").style.backgroundColor = "var(--color-contraste)";
			document.getElementById("botonCambiarPlantillaResumen").style.backgroundColor = "var(--color-contraste)";

			const label = "caja"+opcion+"Resumen";
			document.getElementById(label).classList.remove("invisible");
			const labelBoton = "botonCambiar"+opcion+"Resumen";
			document.getElementById(labelBoton).style.backgroundColor = "var(--color-corporativo-rosa)";

			if (parseInt(document.getElementById("selectEquiposEntrenamiento").value) > 0) {
				switch(opcion) {
					case "Resumen":
						mostrarResumenResumen();
						break;
					case "Entrenamientos":
						mostrarResumenEntrenamientos();
						break;
					case "Plantilla":
						mostrarResumenPlantilla();
						break;
				}
			}else{
				document.getElementById(label).innerHTML = "Selecciona un equipo para mostrar el Resumen de sus datos";
			}
		};
			function mostrarResumenResumen() {
				document.getElementById("loaderProEntrenamiento").classList.add("loader");
				$.ajax({
					url: "php/datosResumenEntrenamiento.php",
					type: 'POST',
					data: {
						idEquipo: document.getElementById("selectEquiposEntrenamiento").value
					},
					success: function(res){
						document.getElementById("loaderProEntrenamiento").classList.remove("loader");
						let js = JSON.parse(res);

						let codigo = "";
						codigo += " <div class='w50 h100 centradoXY flexWrap'>";
						codigo += "		<div class='w100 h10 centradoXY'>";
						codigo += "			<h1>Entrenamientos</h1>";
						codigo += "		</div>";
						codigo += "		<div class='w100 h80 centradoXY flexWrap'>";
						codigo += "			<div class='w95 h10 spaceBetweenXY'>";
						codigo += "				<div class='w25'></div>";
						codigo += "				<div class='w15 h95 centradoXY'>";
						codigo += "					<img class='h90 w90' src='img/Menu/fuerza.png' alt='icono'>";
						codigo += "				</div>";
						codigo += "				<div class='w15 h95 centradoXY'>";
						codigo += "					<img class='h90 w90' src='img/Menu/flexibilidad.png' alt='icono'>";
						codigo += "				</div>";
						codigo += "				<div class='w15 h95 centradoXY'>";
						codigo += "					<img class='h90 w90' src='img/Menu/resistencia.png' alt='icono'>";
						codigo += "				</div>";
						codigo += "				<div class='w15 h95 centradoXY'>";
						codigo += "					<img class='h90 w90' src='img/Menu/velocidad.png' alt='icono'>";
						codigo += "				</div>";
						codigo += "				<div class='w15 h95 centradoXY'>";
						codigo += "					<img class='h90 w90' src='img/Menu/tactica.png' alt='icono'>";
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<div id='cuadroMesesResumenEntrenamientos' class='w100 h85 centradoXY flexWrap'>";
						const arrayMeses = [7,8,9,10,11,12,1,2,3,4,5,6];
						const sumaMeses = {
							Fuerza: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Flexibilidad: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Resistencia: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Velocidad: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Tactica: [0,0,0,0,0,0,0,0,0,0,0,0]
						};
						const sumasPorTurno = {
						  turno1: {
						    Fuerza: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Flexibilidad: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Resistencia: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Velocidad: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Tactica: [0,0,0,0,0,0,0,0,0,0,0,0]
						  },
						  turno2: {
						    Fuerza: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Flexibilidad: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Resistencia: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Velocidad: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Tactica: [0,0,0,0,0,0,0,0,0,0,0,0]
						  },
						  turno3: {
						    Fuerza: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Flexibilidad: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Resistencia: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Velocidad: [0,0,0,0,0,0,0,0,0,0,0,0],
						    Tactica: [0,0,0,0,0,0,0,0,0,0,0,0]
						  }
						};
						const categoriaNombre = ["","Fuerza","Flexibilidad","Resistencia","Velocidad","Tactica"];
						// Rellenar arrays con los datos de js
						for (var j = 0; j < js.Entrenamientos.length; j++) {
							for (var i = 0; i < arrayMeses.length; i++) {
								if (js.Entrenamientos[j].Mes == arrayMeses[i]) {
								    const categoria = categoriaNombre[js.Entrenamientos[j].Categoria];
								    const cantidad = parseInt(js.Entrenamientos[j].Cantidad);
								    const turno = `turno${js.Entrenamientos[j].Turno}`;
								    sumasPorTurno[turno][categoria][i] += cantidad;

									switch(js.Entrenamientos[j].Categoria) {
									case "1":
										sumaMeses.Fuerza[i] += parseInt(js.Entrenamientos[j].Cantidad);										
										break;
									case "2":
										sumaMeses.Flexibilidad[i] += parseInt(js.Entrenamientos[j].Cantidad);
										break;
									case "3":
										sumaMeses.Resistencia[i] += parseInt(js.Entrenamientos[j].Cantidad);
										break;
									case "4":
										sumaMeses.Velocidad[i] += parseInt(js.Entrenamientos[j].Cantidad);
										break;
									case "5":
										sumaMeses.Tactica[i] += parseInt(js.Entrenamientos[j].Cantidad);
										break;
									}
								}
							}
						}

						for (var i = 0; i < arrayMeses.length; i++) {
							codigo += "			<details id='mes_"+i+"' class='w95 cajaDiario pulsable' style='min-height:12%; margin-bottom: 2%;'>";
							codigo += "				<summary id='sumMes_"+i+"' class='spaceBetweenXY' style='background: var(--color-fondo-principal);border-radius: 20px;padding: 1% 0;'>";
							codigo += "					<div class='w25 centradoXY'>"+textoMeses(arrayMeses[i])+"</div>";
							codigo += "					<div class='w15 centradoXY'>"+sumaMeses.Fuerza[i]+"</div>";
							codigo += "					<div class='w15 centradoXY'>"+sumaMeses.Flexibilidad[i]+"</div>";
							codigo += "					<div class='w15 centradoXY'>"+sumaMeses.Resistencia[i]+"</div>";
							codigo += "					<div class='w15 centradoXY'>"+sumaMeses.Velocidad[i]+"</div>";
							codigo += "					<div class='w15 centradoXY'>"+sumaMeses.Tactica[i]+"</div>";
							codigo += "				</summary>";
							codigo += "				<div class='w100 centradoXY flexWrap' style='background: var(--color-corporativo-morado3);border-radius: 15px;'>";

							for (var j = 0; j < 3; j++) {
								const turnoLabel = `turno${j+1}`;
								codigo += "				<div class='w100 centradoXY flexWrap' style='height:20px'>";
								codigo += "					<div class='w5 centradoXY'></div>";
								codigo += "					<div class='w20 centradoXY'>"+textoTurnos(j)+"</div>";
								codigo += "					<div class='w15 centradoXY'>"+sumasPorTurno[turnoLabel]['Fuerza'][i]+"</div>";
								codigo += "					<div class='w15 centradoXY'>"+sumasPorTurno[turnoLabel]['Flexibilidad'][i]+"</div>";
								codigo += "					<div class='w15 centradoXY'>"+sumasPorTurno[turnoLabel]['Resistencia'][i]+"</div>";
								codigo += "					<div class='w15 centradoXY'>"+sumasPorTurno[turnoLabel]['Velocidad'][i]+"</div>";
								codigo += "					<div class='w15 centradoXY'>"+sumasPorTurno[turnoLabel]['Tactica'][i]+"</div>";
								codigo += "				</div>";								
							}
							codigo += "				</div>";
							codigo += "			</details>";
						}
						codigo += "			</div>";

						codigo += "		</div>";
						codigo += "	</div>";
						codigo += " <div class='w50 h100 centradoXY flexWrap'>";
						codigo += "		<div class='w90 h10 centradoXY'>";
						codigo += "			<h1>Plantilla</h1>";
						codigo += "		</div>";
						codigo += "		<div class='w95 h60 centradoXY flexWrap'>";
						codigo += "			<div class='h60 w100 centradoXY' style='position: relative'>";
						codigo += "				<div id='graficaPlantilla' class='h100 centradoXY graficaCircular'></div>";
						codigo += "			</div>";

						let datosOk = 0;
						let datosPrecaucion = 0;
						let datosAlerta = 0;
						if (js.Asistencia !== "0") {
							for (var i = 0; i < js.Asistencia.length; i++) {
								let numero = parseFloat(js.Asistencia[i]);
								if(numero <= .1 ) {
									datosOk++;
								}else if(numero <= .2 && numero > .1) {
									datosPrecaucion++;
								}else {
									datosAlerta++;
								}
							}
						}

						codigo += "			<div id='cajaLeyendaResumen' class='w60 h30 centradoXY flexWrap' style='font-size:.8em; border-radius: 10px'>";
						codigo += "				<div class='w100 h33 centradoXY acierto'>Jugadores en perfectas condiciones: <strong>"+datosOk+"</strong></div>";
						codigo += "				<div class='w100 h33 centradoXY precaucion'>Más del 10% de faltas o lesiones: <strong>"+datosPrecaucion+"</strong></div>";
						codigo += "				<div class='w100 h33 centradoXY error'>Más del 20% de faltas o lesiones: <strong>"+datosAlerta+"</strong></div>";
						codigo += "			</div>";
						codigo += "		</div>";
						codigo += "		<div class='w95 h20 centradoXY flexWrap' style='font-size:.8em'>";
						codigo += "			<div class='w100 h45 spaceAroundXY' style='background: var(--color-fondo-principal); border-radius:8px'>";
						codigo += "				<div class='w15 centradoXY'>PRUEBA</div>";
						codigo += "				<div class='w30 spaceAroundXY'>";
						codigo += "					<div class='w40 centradoXY' style='text-align:right'>Última:&nbsp;</div>";
						const prueba = js.Prueba == "0" ? "-" : js.Prueba;
						codigo += "					<div class='w60 centradoXY'>"+prueba+"</div>";
						codigo += "				</div>";
						codigo += "				<div class='w45 spaceAroundXY'>";
						codigo += "					<div class='w40 centradoXY' style='text-align:right'>Siguiente:&nbsp;</div>";
						codigo += "					<div class='w60 centradoXY'><input id='inputProxPrueba' type='date' onchange=\"guardarProx('Prueba',this.value)\"></div>";
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "			<div class='w100 h45 spaceAroundXY' style='background: var(--color-fondo-principal); border-radius:8px'>";
						codigo += "				<div class='w15 centradoXY'>MEDIDAS</div>";
						codigo += "				<div class='w30 spaceAroundXY'>";
						codigo += "					<div class='w40 centradoXY' style='text-align:right'>Última:&nbsp;</div>";
						const medidas = js.Medidas == "0" ? "-" : js.Medidas;
						codigo += "					<div class='w60 centradoXY'>"+medidas+"</div>";
						codigo += "				</div>";
						codigo += "				<div class='w45 spaceAroundXY'>";
						codigo += "					<div class='w40 centradoXY' style='text-align:right'>Siguiente:&nbsp;</div>";
						codigo += "					<div class='w60 centradoXY'><input id='inputProxMedida' type='date' onchange=\"guardarProx('Medida',this.value)\"></div>";
						codigo += "				</div>";
						codigo += "			</div>";
						codigo += "		</div>";
						codigo += "";
						codigo += "	</div>";

						document.getElementById("cajaResumenResumen").innerHTML = codigo;

						const ProxPrueba = js.ProxPrueba == "0" ? "" : js.ProxPrueba;
						document.getElementById("inputProxPrueba").value = ProxPrueba;
						const ProxMedida = js.ProxMedida == "0" ? "" : js.ProxMedida;
						document.getElementById("inputProxMedida").value = ProxMedida;

						// Marcar Mes Actual para Resumen
						const hoy = new Date();
						const mes = hoy.getMonth();
						if (mes < 6) {
							mesIndex = mes + 6;
						}else{
							mesIndex = mes - 6;
						}
						const mesIndexAnt = mesIndex - 2;
						const labelIndex = "mes_"+mesIndexAnt;
						document.getElementById(labelIndex).scrollIntoView();
						const labelColor = "sumMes_"+mesIndex;
						document.getElementById(labelColor).style.backgroundColor = "var(--color-corporativo-morado)";

						// Crear gráfica circular
						if (js.Asistencia !== "0") {
							const arrayGrafica = [datosOk,datosPrecaucion,datosAlerta];
							const total = arrayGrafica[0] + arrayGrafica[1] + arrayGrafica[2];
							const valorOk = arrayGrafica[0] * 100 / total;
							const gradosOk = 3.6 * valorOk;
							const valorPrecaucion = arrayGrafica[1] * 100 / total;
							const gradosPrecaucion = (3.6 * valorPrecaucion) + gradosOk;
							const valorAlerta = arrayGrafica[2] * 100 / total;
							const gradosAlerta = (3.6 * valorAlerta) + gradosPrecaucion;
							document.getElementById("graficaPlantilla").style.backgroundImage = "conic-gradient(var(--color-acierto) "+gradosOk+"deg, var(--color-oro2) 0 "+gradosPrecaucion+"deg, var(--color-error) 0 "+gradosAlerta+"deg)";
						}else{
							document.getElementById("graficaPlantilla").innerHTML = "Sin datos";
							document.getElementById("graficaPlantilla").style.backgroundColor = "var(--color-fondoIndex)";
						}						
					},
					timeout: 10000,
					error: function(){ mostrarResumenResumen(); }
				});	
			};
				async function guardarProx(opcion,valor) {
					$.ajax({
						url: "php/guardarProx.php",
						type: 'POST',
						data: {
							equipo: document.getElementById("selectEquiposEntrenamiento").value,
							opcion: opcion,
							fecha: valor
						},
						timeout: 10000,
						error: function(){guardarProx(opcion,valor);}
					});
				};
			function mostrarResumenEntrenamientos() {
				let codigo = "";
				codigo += "	<div class='w95 h5 centradoXY flexWrap'>";
				codigo += "		<div class='w95 h95 spaceAroundXY'>";
				codigo += "			<div class='w40'></div>";
				codigo += "			<div class='w2'></div>";
				codigo += "			<div class='w55 h95 spaceAroundXY'>";
				codigo += "				<small class='w7 centradoXY'>07</small>";
				codigo += "				<small class='w7 centradoXY'>08</small>";
				codigo += "				<small class='w7 centradoXY'>09</small>";
				codigo += "				<small class='w7 centradoXY'>10</small>";
				codigo += "				<small class='w7 centradoXY'>11</small>";
				codigo += "				<small class='w7 centradoXY'>12</small>";
				codigo += "				<small class='w7 centradoXY'>01</small>";
				codigo += "				<small class='w7 centradoXY'>02</small>";
				codigo += "				<small class='w7 centradoXY'>03</small>";
				codigo += "				<small class='w7 centradoXY'>04</small>";
				codigo += "				<small class='w7 centradoXY'>05</small>";
				codigo += "				<small class='w7 centradoXY'>06</small>";
				codigo += "			</div>";
				codigo += "		</div>";
				codigo += "	</div>";
				codigo += "	<div class='w95 h80 centradoXY flexWrap overflowY'>";
				for (var i = 0; i < 10; i++) {
					codigo += "	<div class='w95 h30 spaceAroundXY'>";
					codigo += "		<div id='"+i+"Logo' class='w5 centradoXY'></div>";
					codigo += "		<div id='"+i+"Nombre' class='w35'></div>";
					codigo += "		<div class='w55 h90 spaceAroundXY'>";
					codigo += "			<div id='"+i+"Entrenamiento1' class='w7 h100' style='position:relative'></div>";
					codigo += "			<div id='"+i+"Entrenamiento2' class='w7 h100' style='position:relative'></div>";
					codigo += "			<div id='"+i+"Entrenamiento3' class='w7 h100' style='position:relative'></div>";
					codigo += "			<div id='"+i+"Entrenamiento4' class='w7 h100' style='position:relative'></div>";
					codigo += "			<div id='"+i+"Entrenamiento5' class='w7 h100' style='position:relative'></div>";
					codigo += "			<div id='"+i+"Entrenamiento6' class='w7 h100' style='position:relative'></div>";
					codigo += "			<div id='"+i+"Entrenamiento7' class='w7 h100' style='position:relative'></div>";
					codigo += "			<div id='"+i+"Entrenamiento8' class='w7 h100' style='position:relative'></div>";
					codigo += "			<div id='"+i+"Entrenamiento9' class='w7 h100' style='position:relative'></div>";
					codigo += "			<div id='"+i+"Entrenamiento10' class='w7 h100' style='position:relative'></div>";
					codigo += "			<div id='"+i+"Entrenamiento11' class='w7 h100' style='position:relative'></div>";
					codigo += "			<div id='"+i+"Entrenamiento12' class='w7 h100' style='position:relative'></div>";
					codigo += "		</div>";
					codigo += "	</div>";
				}
				codigo += "	</div>";
				codigo += "	<div class='w95 h15 spaceAroundXY'>";
				codigo += "		<div class='w15 h40 centradoXY' style='background: var(--color-corporativo-morado)'>FUERZA</div>";
				codigo += "		<div class='w15 h40 centradoXY' style='background: var(--color-pro)'>FLEXIBILIDAD</div>";
				codigo += "		<div class='w15 h40 centradoXY' style='background: var(--color-contraste)'>RESISTENCIA</div>";
				codigo += "		<div class='w15 h40 centradoXY' style='background: var(--color-corporativo-rosa)'>VELOCIDAD</div>";
				codigo += "		<div class='w15 h40 centradoXY' style='background: var(--color-local)'>TÁCTICA</div>";
				codigo += "	</div>";
				document.getElementById("cajaEntrenamientosResumen").innerHTML = codigo;

				// Crear datos aleatorios
				const arrayTipos = ["Fuerza","Flexibilidad","Resistencia","Velocidad","Tactica"];
				const arrayColores = ["--color-corporativo-morado", "--color-pro", "--color-contraste", "--color-corporativo-rosa", "--color-local"];
				for (var i = 0; i < 10; i++) {
						const tipo = Math.floor(Math.random() * arrayTipos.length);
					for (var j = 1; j < 13; j++) {
						// Texto
						let codigoNombreTipo = "Nombre Entrenamiento<br><span class='color1'>Entrenamiento de "+arrayTipos[tipo]+"</span>";
						let labelNombre = i+"Nombre";
						document.getElementById(labelNombre).innerHTML = codigoNombreTipo;
						// Icono
						let codigoImagenTipo = "<img src='img/Menu/"+arrayTipos[tipo].toLowerCase()+".png' alt='Icono'>";
						let labelIcono = i+"Logo";
						document.getElementById(labelIcono).innerHTML = codigoImagenTipo;

						// Gráfica
						let entre = Math.floor(Math.random() * (31 - 0 + 1)) + 0;
						let codigo = "";
						codigo += "			<div class='w100' style='height:"+(100 - (100*entre/31))+"%'></div>";
						codigo += "			<div class='w100' style='background: var("+arrayColores[tipo]+"); height:"+(100*entre/31)+"%'><span class='w100 centradoXY' style='position:absolute; bottom:0'>"+entre+"</span></div>";
						document.getElementById(i+"Entrenamiento"+j).innerHTML = codigo;
					}
				}
			};
			function mostrarResumenPlantilla() {
				let codigo = "";
				codigo += "	<div class='w95 h5 centradoXY flexWrap'>";
				codigo += "		<div class='w95 h95 spaceAroundXY'>";
				codigo += "			<div class='w40'></div>";
				codigo += "			<div class='w2'></div>";
				codigo += "			<div class='w55 h95 spaceAroundXY'>";
				codigo += "				<small class='w7 centradoXY'>07</small>";
				codigo += "				<small class='w7 centradoXY'>08</small>";
				codigo += "				<small class='w7 centradoXY'>09</small>";
				codigo += "				<small class='w7 centradoXY'>10</small>";
				codigo += "				<small class='w7 centradoXY'>11</small>";
				codigo += "				<small class='w7 centradoXY'>12</small>";
				codigo += "				<small class='w7 centradoXY'>01</small>";
				codigo += "				<small class='w7 centradoXY'>02</small>";
				codigo += "				<small class='w7 centradoXY'>03</small>";
				codigo += "				<small class='w7 centradoXY'>04</small>";
				codigo += "				<small class='w7 centradoXY'>05</small>";
				codigo += "				<small class='w7 centradoXY'>06</small>";
				codigo += "			</div>";
				codigo += "		</div>";
				codigo += "	</div>";
				codigo += "	<div class='w95 h80 centradoXY flexWrap overflowY'>";
				for (var i = 0; i < 10; i++) {
					codigo += "	<div class='w95 h30 spaceAroundXY'>";
					codigo += "		<div id='jugador"+i+"Foto' class='w10 centradoXY fotoFichaJugador'><img src='img/Clubes/usuario.png' alt='Foto'></div>";
					codigo += "		<div id='jugador"+i+"Dorsal' class='w5 centradoXY'>"+(i+1)+"</div>";
					codigo += "		<div id='jugador"+i+"Nombre' class='w25'>Nombre<br>Apellido Apellido</div>";
					codigo += "		<div class='w55 h90 spaceAroundXY'>";
					codigo += "			<div id='jugador"+i+"Entrenamiento1' class='w7 h100'></div>";
					codigo += "			<div id='jugador"+i+"Entrenamiento2' class='w7 h100'></div>";
					codigo += "			<div id='jugador"+i+"Entrenamiento3' class='w7 h100'></div>";
					codigo += "			<div id='jugador"+i+"Entrenamiento4' class='w7 h100'></div>";
					codigo += "			<div id='jugador"+i+"Entrenamiento5' class='w7 h100'></div>";
					codigo += "			<div id='jugador"+i+"Entrenamiento6' class='w7 h100'></div>";
					codigo += "			<div id='jugador"+i+"Entrenamiento7' class='w7 h100'></div>";
					codigo += "			<div id='jugador"+i+"Entrenamiento8' class='w7 h100'></div>";
					codigo += "			<div id='jugador"+i+"Entrenamiento9' class='w7 h100'></div>";
					codigo += "			<div id='jugador"+i+"Entrenamiento10' class='w7 h100'></div>";
					codigo += "			<div id='jugador"+i+"Entrenamiento11' class='w7 h100'></div>";
					codigo += "			<div id='jugador"+i+"Entrenamiento12' class='w7 h100'></div>";
					codigo += "		</div>";
					codigo += "	</div>";
				}
				codigo += "	</div>";
				codigo += "	<div class='w95 h15 spaceAroundXY'>";
				codigo += "		<div class='w15 h40 centradoInlineXY' style='background: var(--color-corporativo-morado)'><img class='h90' style='margin: 1%' src='img/Menu/fuerza.png' alt='FUERZA'>FUERZA</div>";
				codigo += "		<div class='w15 h40 centradoInlineXY' style='background: var(--color-pro)'><img class='h90' style='margin: 1%' src='img/Menu/flexibilidad.png' alt='FLEXIBILIDAD'>FLEXIBILIDAD</div>";
				codigo += "		<div class='w15 h40 centradoInlineXY' style='background: var(--color-contraste)'><img class='h90' style='margin: 1%' src='img/Menu/resistencia.png' alt='RESISTENCIA'>RESISTENCIA</div>";
				codigo += "		<div class='w15 h40 centradoInlineXY' style='background: var(--color-corporativo-rosa)'><img class='h90' style='margin: 1%' src='img/Menu/velocidad.png' alt='VELOCIDAD'>VELOCIDAD</div>";
				codigo += "		<div class='w15 h40 centradoInlineXY' style='background: var(--color-local)'><img class='h90' style='margin: 1%' src='img/Menu/tactica.png' alt='TÁCTICA'>TÁCTICA</div>";
				codigo += "	</div>";
				document.getElementById("cajaPlantillaResumen").innerHTML = codigo;

				// Crear datos aleatorios
				for (var i = 0; i < 10; i++) {
					for (var j = 1; j < 13; j++) {
						let entre1 = Math.floor(Math.random() * (80 - 0 + 1)) + 0;
						let entre2 = Math.floor(Math.random() * ((80 - entre1) - 0 + 1)) + 0;
						let entre3 = Math.floor(Math.random() * ((80 - entre2 - entre1) - 0 + 1)) + 0;
						let entre4 = Math.floor(Math.random() * ((80 - entre3 - entre1 - entre2) - 0 + 1)) + 0;
						let entre5 = Math.floor(Math.random() * ((80 - entre4 - entre1 - entre2 - entre3) - 0 + 1)) + 0;

						let codigo = "";
						codigo += "			<div class='w100' style='height:"+(100 - entre4 - entre1 - entre2 - entre3 - entre5)+"%'></div>";
						codigo += "			<div class='w100' style='background: var(--color-corporativo-morado); height:"+entre1+"%'></div>";
						codigo += "			<div class='w100' style='background: var(--color-pro); height:"+entre2+"%'></div>";
						codigo += "			<div class='w100' style='background: var(--color-contraste); height:"+entre3+"%'></div>";
						codigo += "			<div class='w100' style='background: var(--color-corporativo-rosa); height:"+entre4+"%'></div>";
						codigo += "			<div class='w100' style='background: var(--color-local); height:"+entre5+"%'></div>";
						document.getElementById("jugador"+i+"Entrenamiento"+j).innerHTML = codigo;
					}
				}
			};

	function verTablon() {		
		codigo = "";
		codigo += "		<div id='cajaMensajeDestacado' class='w90 h10 centradoInlineXY'>";
		codigo += "			<div class='w90 h90 centradoXY' style='position:relative;border: 2px solid var(--color-corporativo-rosa);border-radius: 10px;'>";
		codigo += "				<input id='inputChatDestacado' class='w100 h100 invisible' type='text' value='' style='background:var(--color-fondo-principal);border:none;font-size: 1.6em;padding:0 1%''>";
		codigo += "				<strong id='mensajeChatDestacado' style='font-size: 1.6em;'></strong>";
		if (document.getElementById("selectEquiposEntrenamiento").value) {
			codigo += "			<img id='botonEditarDestacadoChat' class='h80 pulsable' src='img/Menu/editar.png' alt='Editar' style='position:absolute;right:2%' onclick=\"editarMensajeDestacadoChat()\">";
			codigo += "			<div id='botonGuardarDestacadoChat' class='h100 centradoXY pulsable invisible' style='position:absolute;right:2%' onclick=\"guardarMensajeDestacadoChat()\">";
			codigo += "				<img class='h80' src='img/Menu/guardar.png' alt='Guardar'>";
			codigo += "			</div>";
		}
		codigo += "			</div>";
		codigo += "		</div>";
		codigo += "		<div id='cuadroMensajesChat' class='w80 h70 centradoXY flexWrap' style='overflow-y:auto;'>";
		codigo += "		</div>";
		codigo += "		<div id='cajaEnviarMensaje' class='w90 h10 centradoInlineXY'>";
		codigo += "			<div class='w80 h90 centradoXY'>";
		codigo += "				<input id='inputMensajeChat' type='text' class='w90 h90' placeholder='Escribir mensaje...' onkeyup=\"enter(event)\" style='background:var(--color-fondo-principal);border:none;border-radius:10px;padding-left:2%'>";
		codigo += "			</div>";
		const estadoEnviar = document.getElementById("selectEquiposEntrenamiento").value ? "" : " noOperativo";
		codigo += "			<div id='botonEnviarMensajeChat' class='w10 h90 centradoXY pulsable"+estadoEnviar+"' onclick=\"enviarMensaje()\" style='background: var(--color-corporativo-rosa);border-radius: 20px;'>Enviar";
		codigo += "			</div>";
		codigo += "		</div>";
		document.getElementById("tablonEntrenamiento").innerHTML = codigo;

		if (document.getElementById("selectEquiposEntrenamiento").value) {
			actualizarDestacadoChat();
			actualizarMensajesChat();
		}
	};
		function actualizarDestacadoChat() {
			document.getElementById("mensajeChatDestacado").innerHTML = "...";
			$.ajax({
				url: "php/mensajeDestacado.php",
				type: 'POST',
				data: {
					idEquipo: document.getElementById("selectEquiposEntrenamiento").value
				},
				success: function(res){
					var js = JSON.parse(res);
					
					document.getElementById("mensajeChatDestacado").innerHTML = js[0].Mensaje;
				},
				timeout: 10000,
				error: function(){ actualizarDestacadoChat(); }
			});			
		};
		function enter(e){
			if(e.keyCode == 13){
				enviarMensaje();
			}
		}
		function actualizarMensajesChat() {
			document.getElementById("loaderProEntrenamiento").classList.add("loader");
			$.ajax({
				url: "php/listadoMensajesChat.php",
				type: 'POST',
				data: {
					idEquipo: document.getElementById("selectEquiposEntrenamiento").value
				},
				success: function(res){
					document.getElementById("loaderProEntrenamiento").classList.remove("loader");
					const js = JSON.parse(res);
					
					if (js[0] !== "0") {
						let codigo = "";
						for (var i = 0; i < js.length; i++) {
							codigo += "		<div id='mensaje"+i+"' class='w90 spaceAroundXY flexWrap' style='justify-content:end;margin: 1% 0;'>";
							codigo += "			<div class='centradoXY flexWrap' style='text-align:right; background:var(--color-corporativo-rosa);border-top-right-radius:10px;border-top-left-radius:10px;border-bottom-left-radius:10px;padding:0 2%;'>";
							codigo += js[i].Mensaje;
							codigo += "			</div>";
							codigo += "			<div class='w100'></div>";
							codigo += "			<div class='h40 w100 centradoXY' style='justify-content:end;'>";
							codigo += "				<div class='h100 centradoXY' style='padding:0 2%;'>";
							codigo += "					<strong style='font-size:.9em;color:var(--color-corporativo-rosa);'>"+js[i].Usuario+"</strong>";
							codigo += "				</div>";
							codigo += "				<div class='h100 centradoXY' style='font-size:.6em;padding:0 1%;'>";
							var fechaOK = new Date(js[i].Fecha);
							codigo += fechaOK.toLocaleString(localStorage.getItem('idioma'));
							codigo += "				</div>";
							codigo += "			</div>";
							codigo += "		</div>";
						}
						document.getElementById("cuadroMensajesChat").innerHTML = codigo;

						const labelUltimo = "mensaje"+(js.length-1);
						document.getElementById(labelUltimo).scrollIntoView();
					}else{
						document.getElementById("cuadroMensajesChat").innerHTML = "No se encontraron mensajes";
					}
				},
				timeout: 10000,
				error: function(){ actualizarMensajesChat(); }
			});
		};
		function editarMensajeDestacadoChat() {
			document.getElementById("mensajeChatDestacado").classList.add("invisible");
			document.getElementById("inputChatDestacado").classList.remove("invisible");
			document.getElementById("botonEditarDestacadoChat").classList.add("invisible");
			document.getElementById("botonGuardarDestacadoChat").classList.remove("invisible");
		};
		function guardarMensajeDestacadoChat() {
			document.getElementById("mensajeChatDestacado").classList.remove("invisible");
			document.getElementById("inputChatDestacado").classList.add("invisible");

			$.ajax({
				url: "php/guardarMensajeDestacado.php",
				type: 'POST',
				data: {
					idEquipo: document.getElementById("selectEquiposEntrenamiento").value,
					texto: document.getElementById("inputChatDestacado").value
				},
				success: function(res){
					const js = JSON.parse(res);
					document.getElementById("mensajeChatDestacado").innerHTML = js.Mensaje;

					document.getElementById("botonEditarDestacadoChat").classList.remove("invisible");
					document.getElementById("botonGuardarDestacadoChat").classList.add("invisible");
				},
				timeout: 10000,
				error: function(){ guardarMensajeDestacadoChat(); }
			});
		};
		function enviarMensaje() {
			document.getElementById("botonEnviarMensajeChat").innerHTML = "...";
			$.ajax({
				url: "php/guardarMensajeChat.php",
				type: 'POST',
				data: {
					idEquipo: document.getElementById("selectEquiposEntrenamiento").value,
					texto: document.getElementById("inputMensajeChat").value
				},
				success: function(){
					document.getElementById("botonEnviarMensajeChat").innerHTML = "Enviar";
					document.getElementById("inputMensajeChat").value = null;
					actualizarMensajesChat();
				},
				timeout: 10000,
				error: function(){ enviarMensaje(); }
			});
		};

	function verCalendario() {
		if (document.getElementById("selectEquiposEntrenamiento").value) {
			document.getElementById("loaderProEntrenamiento").classList.add("loader");
			$.ajax({
				url: "php/datosEntrenamientos.php",
				type: 'POST',
				data: {
					equipo: document.getElementById("selectEquiposEntrenamiento").value
				},
				success: function(res){
					document.getElementById("loaderProEntrenamiento").classList.remove("loader");
					const js = JSON.parse(res);
					const jsLength = js.length;
					sessionStorage.removeItem("Plantilla");
					codigo = "";
					if (js !== "0") {
						sessionStorage.setItem("EquipoPro",document.getElementById("selectEquiposEntrenamiento").value);
						//////// Aquí hay que poner el botón (o automático) para que cargue temporada anterior
						let arrayFechas = Array();
						for (var i = 0; i < jsLength; i++) {
							let diaHoy = "";
							if (js[i].Tipo == "3") {
								diaHoy = "marcadoFondo";
							}else{
								let dia = js[i].Fecha;
								let fechaSplit = dia.split("-");
								if (fechaSplit[0] == "01") {
									codigo += "			<div class='w70 h7 cajaMes centradoXY'>"+textoMeses(parseInt(fechaSplit[1]))+" "+fechaSplit[2]+"</div>";
								}
								let fechaBarras = dia.replaceAll("-","/");
								let fechaOk = fechaBarras.replace(/^(0+)/g, '');
								diaHoy = new Date().toLocaleDateString() === fechaOk ? "marcadoFondo" : "";
							}
							codigo += "					<div id='diaEntrenamiento_"+js[i].Fecha+"' class='w90 h10 spaceAroundXY flexWrap cajaDiario "+diaHoy+"'>";
							switch(js[i].Tipo) {
								case "1":
									const labelTotal = "presentes_"+js[i].Fecha;
									const valor = js[i].Asistentes ? js[i].Asistentes : (sessionStorage.getItem(labelTotal) ? sessionStorage.getItem(labelTotal) : 0);
									codigo += "				<div class='w15 h80 centradoXY'>"+js[i].Fecha+"</div>";
									codigo += "				<div id='asistencia_"+js[i].Fecha+"' class='w10 centradoXY flexWrap pulsable' onclick=\"verAsistenciaEntrenamiento('"+js[i].Fecha+"')\">Asistentes<br>"+valor+"</div>";
									const estadoFuerza = js[i].Fuerza > 0 ? "cajaDiarioSeleccionada" : "";
									codigo += "				<div id='fuerza_"+js[i].Fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro "+estadoFuerza+"' onclick=\"verEntrenamiento(0,'"+js[i].Fecha+"')\">";
									codigo += "					<img class='h90' src='img/Menu/fuerza.png' alt='fuerza' loading='lazy'>";
									codigo += "				</div>";
									const estadoFlexibilidad = js[i].Flexibilidad > 0 ? "cajaDiarioSeleccionada" : "";
									codigo += "				<div id='flexibilidad_"+js[i].Fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro "+estadoFlexibilidad+"' onclick=\"verEntrenamiento(0,'"+js[i].Fecha+"')\">";
									codigo += "					<img class='h90' src='img/Menu/flexibilidad.png' alt='flexibilidad' loading='lazy'>";
									codigo += "				</div>";
									const estadoResistencia = js[i].Resistencia > 0 ? "cajaDiarioSeleccionada" : "";
									codigo += "				<div id='resistencia_"+js[i].Fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro "+estadoResistencia+"' onclick=\"verEntrenamiento(0,'"+js[i].Fecha+"')\">";
									codigo += "					<img class='h90' src='img/Menu/resistencia.png' alt='resistencia' loading='lazy'>";
									codigo += "				</div>";
									const estadoVelocidad = js[i].Velocidad > 0 ? "cajaDiarioSeleccionada" : "";
									codigo += "				<div id='velocidad_"+js[i].Fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro "+estadoVelocidad+"' onclick=\"verEntrenamiento(0,'"+js[i].Fecha+"')\">";
									codigo += "					<img class='h90' src='img/Menu/velocidad.png' alt='velocidad' loading='lazy'>";
									codigo += "				</div>";
									const estadoTactica = js[i].Tactica > 0 ? "cajaDiarioSeleccionada" : "";
									codigo += "				<div id='tactica_"+js[i].Fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro "+estadoTactica+"' onclick=\"verEntrenamiento(0,'"+js[i].Fecha+"')\">";
									codigo += "					<img class='h90' src='img/Menu/tactica.png' alt='tactica' loading='lazy'>";
									codigo += "				</div>";
									const estadoMedidas = js[i].Medidas > 0 ? "cajaDiarioSeleccionada" : "";
									codigo += "				<div id='medidas_"+js[i].Fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro "+estadoMedidas+"' onclick=\"verEntrenamiento(1,'"+js[i].Fecha+"')\">";
									codigo += "					<img class='h90' src='img/Menu/medidas.png' alt='medidas' loading='lazy'>";
									codigo += "				</div>";
									codigo += "				<div id='diaLibre_"+js[i].Fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro' onclick=\"diaLibre(2,'"+js[i].Fecha+"')\">";
									codigo += "					<img class='h90' src='img/Menu/diaLibre.png' alt='' loading='lazy'>";
									codigo += "				</div>";
									break;
								case "2":
									// Día de descanso
									codigo += "			<div class='w15 h80 centradoXY'>"+js[i].Fecha+"</div>";
									codigo += "			<div class='divHueco w0'></div>";
									codigo += "			<div class='w66 centradoXY'>DÍA DE DESCANSO</div>";
									codigo += "			<div class='w5 h80 centradoXY flexWrap botonEntrenamientoPro' onclick=\"diaLibre(1,'"+js[i].Fecha+"')\">";
									codigo += "				<img class='h90' src='img/Menu/boton_salir.png' alt='Cancelar' loading='lazy'>";
									codigo += "			</div>";
									break;
								case "3":
									// Día de partido
									codigo += "			<div class='w15 h80 centradoXY flexWrap'>";
									codigo += "				<label>"+js[i].Fecha+"</label>";
									codigo += "				<small>"+js[i].Hora+"h</small>";
									codigo += "			</div>";
									codigo += "			<div class='divHueco w0'></div>";
									codigo += "			<div class='w75 h95 centradoXY'>";
									codigo += "				<div class='h90 w40 centradoInlineXY'>";
									codigo += "					<img class='h95 w25' src='img/Clubes/"+textoDeportes(sessionStorage.getItem("deportePro"))+"/Equipos/"+js[i].escudoLocal+"' alt='Escudo' loading='lazy'>";
									codigo += "					<div class='w70' style='text-align: right'>"+js[i].nombreLocal+"</div>";
									codigo += "				</div>";
									codigo += "				<div class='h90 w20 centradoInlineXY labelResultado'>";
									codigo += "					<div class='w40 centradoXY textoLocal'>"+js[i].GolesLocal+"</div>";
									codigo += "					<div class='w20 centradoXY color1'>vs</div>";
									codigo += "					<div class='w40 centradoXY textoVisitante'>"+js[i].GolesVisitante+"</div>";
									codigo += "				</div>";
									codigo += "				<div class='h90 w40 centradoInlineXY'>";
									codigo += "					<div class='w70'>"+js[i].nombreVisitante+"</div>";
									codigo += "					<img class='h95 w25' src='img/Clubes/"+textoDeportes(sessionStorage.getItem("deportePro"))+"/Equipos/"+js[i].escudoVisitante+"' alt='Escudo' loading='lazy'>";
									codigo += "				</div>";
									codigo += "			</div>";
									codigo += "			<div class='w5 h80 centradoXY flexWrap botonEntrenamientoPro' onclick=\"pasarPantalla('menuPro','menuPartido', "+js[i].ID_Partido+")\">";
									codigo += "				<img class='h90' src='img/Menu/partido.png' alt='Partido'>";
									codigo += "			</div>";
									break;
							}
							codigo += "				</div>";
						}
						document.getElementById("agendaEntrenamiento").innerHTML = codigo;

						// Desplazar calendario a Hoy
						const hoy = new Date();
						
						const hoyDia = hoy.getDate() < 10 ? "0"+hoy.getDate() : hoy.getDate();
						const hoyMes = (hoy.getMonth()+1) < 10 ? "0"+(hoy.getMonth()+1) : (hoy.getMonth()+1);
						const hoyAño = hoy.getFullYear();
						
						const ultimoDiaMesAnt = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
						const ayerD = hoy.getDate() == 1 ? ultimoDiaMesAnt.getDate() : hoy.getDate()-1;
						const ayerDia = ayerD < 10 ? "0"+ayerD : ayerD;
						if (hoy.getDate() == 1) {
							var ayerMes = hoy.getMonth() == 0 ? 12 : (hoy.getMonth() < 10 ? "0"+(hoy.getMonth()) : (hoy.getMonth()));
						}else{
							var ayerMes = hoyMes;
						}
						const ayerAño = hoy.getMonth() == 0 ? hoy.getFullYear() - 1 : hoy.getFullYear();

						const labelScroll = "diaEntrenamiento_"+ayerDia+"-"+ayerMes+"-"+ayerAño;
						document.getElementById(labelScroll).scrollIntoView();
						const labelFechaHoy = "diaEntrenamiento_"+(hoyDia)+"-"+hoyMes+"-"+hoyAño;
						document.getElementById(labelFechaHoy).classList.add("cajaHoy");

						/*$.ajax({
							url: "php/listaJugadores.php",
							type: 'POST',
							data: {
								equipo: document.getElementById("selectEquiposEntrenamiento").value
							},
							success: function(res){
								const js = JSON.parse(res);
								const jsLength = js[0].length;

								codigo = "				<option value=''>Equipos Club...</option>";
								for (var i = 0; i < jsLength; i++) {
									const dorsal = js[0][i].Dorsal == "0" ? "0" : js[0][i].Dorsal;
									codigo += "			<option value='"+js[0][i].ID_Jugador+"'>("+dorsal+") "+js[0][i].NombreCompleto+"</option>";
								}
								document.getElementById("selectJugadoresEntrenamiento").innerHTML = codigo;
							}
						});*/
					}else{
						codigo += "				<div class='w90 h20'></div>";
						codigo += "				<div class='w90 h20 centradoXY'>No puedes visualizar el calendario de Entrenamientos Pro, porque todavía no has creado el de esta temporada</div>";
						codigo += "				<div class='w90 h20 centradoXY'>Debes ir a Configuración Pro para crearlo</div>";
						codigo += "				<div class='w90 h40'></div>";
						document.getElementById("agendaEntrenamiento").innerHTML = codigo;
					}
				},
				timeout: 10000,
				error: function() {verCalendario();}
			});
		}
	};
		function verAsistenciaEntrenamiento(fecha) {
			document.getElementById("cajaMenuProEntrenamiento1").classList.add("invisible");
			document.getElementById("cajaMenuProEntrenamiento2").classList.remove("invisible");
			document.getElementById("loaderProEntrenamiento").classList.add("loader");
			$.ajax({
				url: "php/datosAsistenciaJugadores.php",
				type: 'POST',
				data: {
					equipo: sessionStorage.getItem("EquipoPro"),
					fecha: fecha
				},
				success: function(res){
					document.getElementById("loaderProEntrenamiento").classList.remove("loader");
					const js = JSON.parse(res);
					const jsLength = js.length;
					codigoSuperior = "";
					codigoSuperior += "				<div class='w40 h90 spaceAroundXY'>";
					codigoSuperior += "					<div id='volverdeAsistencia' class='w15 h100 centradoXY' onclick=\"volverEntrenamiento('asistencia','"+fecha+"')\">";
					codigoSuperior += "						<img class='h90' src='img/Menu/volver.png' alt='volver'>";
					codigoSuperior += "					</div>";
					codigoSuperior += "					<h1>Entrenamiento Pro</h1>";
					codigoSuperior += "				</div>";
					codigoSuperior += "				<div class='w30 h90 centradoXY flexWrap'>";
					codigoSuperior += "					<h3>Repaso de Asistencia</h3>";
					codigoSuperior += "					<strong class='w100 centradoXY'>"+fecha+"</strong>";
					codigoSuperior += "				</div>";
					codigoSuperior += "				<div class='w10 h90 centradoXY'><img class='w100 h90' src='img/Menu/Agenda.png' alt='Agenda'></div>";
					document.getElementById("superiorEntrenamiento").innerHTML = codigoSuperior;

					codigoDatos = "";
					codigoDatos += "				<div id='cajaTitulosAsistenciaPro' class='w90 h10 spaceAroundXY'>";
					codigoDatos += "					<div class='w10 h90'></div>";
					codigoDatos += "					<div class='w10 h90 centradoXY'>Dorsal</div>";
					codigoDatos += "					<div class='w35 h90 centradoXY'>Nombre</div>";
					codigoDatos += "					<div class='w10 h90 centradoXY'>Presente</div>";
					codigoDatos += "					<div class='w10 h90 centradoXY'>Falta</div>";
					codigoDatos += "					<div class='w10 h90 centradoXY'>Lesión</div>";
					codigoDatos += "					<div class='w10 h90 centradoXY'>Activación</div>";
					codigoDatos += "				</div>";
					codigoDatos += "				<div id='datosListadoAsistencia' class='w90 h90 spaceAroundXY flexWrap'>";
					const array = [];
					for (var i = 0; i < jsLength; i++) {
						array.push(js[i].ID_Jugador);
						codigoDatos += "				<div class='w100 h20 spaceAroundXY cajaDatosAsistenciaPro'>";
						const direccion = js[i].Foto !== "" ? js[i].Foto : "x.png";
						labelEspecial = js[i].Tipo == "2" ? " fotoFichaJugadorEspecial" : "";
						codigoDatos += "					<div class='w10 h100 centradoXY'><img class='h90 fotoFichaJugador"+labelEspecial+"' src='img/Clubes/"+textoDeportes(sessionStorage.getItem("deportePro"))+"/Plantillas/"+sessionStorage.getItem("EquipoPro")+"/"+direccion+"' alt='foto' onerror=\"this.src='img/Clubes/usuario.png'\"></div>";
						const dorsal = js[i].Dorsal !== '0' ? js[i].Dorsal : "--";
						codigoDatos += "					<div class='w10 h90 centradoXY dorsalAsistenciaPro'>"+dorsal+"</div>";
						codigoDatos += "					<div class='w35'>"+js[i].Nombre+"</div>";
						codigoDatos += "					<div id='presente"+js[i].ID_Jugador+"' class='w10 h60 centradoXY pulsable marcado' onclick=\"marcarAsistencia(this.id,'"+fecha+"',"+js[i].ID_Jugador+",1)\"><img class='w90 h90' src='img/Menu/ok.png' alt='presente'></div>";
						codigoDatos += "					<div id='falta"+js[i].ID_Jugador+"' class='w10 h60 centradoXY pulsable marcado' onclick=\"marcarAsistencia(this.id,'"+fecha+"',"+js[i].ID_Jugador+",2)\"><img class='w90 h90' src='img/Menu/error.png' alt='falta'></div>";
						codigoDatos += "					<div id='lesion"+js[i].ID_Jugador+"' class='w10 h60 centradoXY pulsable marcado' onclick=\"marcarAsistencia(this.id,'"+fecha+"',"+js[i].ID_Jugador+",3)\"><img class='w90 h90' src='img/Menu/lesion.png' alt='lesión'></div>";
						codigoDatos += "					<div id='recuperacion"+js[i].ID_Jugador+"' class='w10 h60 centradoXY pulsable marcado' onclick=\"marcarAsistencia(this.id,'"+fecha+"',"+js[i].ID_Jugador+",4)\"><img class='w90 h100' src='img/Menu/recuperacion.png' alt='lesión'></div>";
						codigoDatos += "				</div>";
					}
					sessionStorage.setItem("Plantilla", JSON.stringify(array));
					codigoDatos += "				</div>";
					document.getElementById("datosEntrenamiento").innerHTML = codigoDatos;

					const arrayNombres = Array("","presente","falta","lesion","recuperacion");
					for (var j = 0; j < jsLength; j++) {
						if (js[j].Asistencia !== "") {
							let label = arrayNombres[js[j].Asistencia]+js[j].ID_Jugador;
							document.getElementById(label).classList.remove("marcado");
							sessionStorage.setItem(js[j].ID_Jugador,js[j].Asistencia);
						}else{
							const plantilla = JSON.parse(sessionStorage.getItem("Plantilla"));
							for (var l = 0; l < plantilla.length; l++) {
								if (sessionStorage.getItem(plantilla[l])) {
									let valorJugador = sessionStorage.getItem(plantilla[l]);
									let labelValor = arrayNombres[valorJugador]+plantilla[l];
									document.getElementById(labelValor).classList.remove("marcado");
								}
							}
						}
					}
				},
				timeout: 10000,
				error: function() {verAsistenciaEntrenamiento(fecha);}
			});
		};
			function marcarAsistencia(label,fecha,idJugador,opcion) {
				// Guardar dato en SessionStorage
				const valor = sessionStorage.getItem(idJugador) == "1" ? "0" : "1";
				sessionStorage.setItem(idJugador,opcion);
				
				// Marcar botón pulsado
				const arrayNombres = Array("","presente","falta","lesion","recuperacion");
				for (var i = 1; i < arrayNombres.length; i++) {
					let label = arrayNombres[i]+idJugador;
					document.getElementById(label).classList.add("marcado");
				}
				label = arrayNombres[opcion]+idJugador;
				document.getElementById(label).classList.remove("marcado");

				// Mostrar total asistentes
				const plantilla = JSON.parse(sessionStorage.getItem("Plantilla"));
				let valorTotal = 0;
				for (var i = 0; i < plantilla.length; i++) {
					if (sessionStorage.getItem(plantilla[i]) == "1") {
						valorTotal += 1;
					}				
				}
				const labelPresentes = "asistencia_"+fecha;
				document.getElementById(labelPresentes).innerHTML = "Asistentes<br>"+valorTotal;
			};
		function verEntrenamiento(opcion,fecha) {
			document.getElementById("cajaMenuProEntrenamiento1").classList.add("invisible");
			document.getElementById("cajaMenuProEntrenamiento2").classList.remove("invisible");

			switch(opcion) {
				case 0: entrenarEspecifico(fecha,"Entrenamiento");	break;
				case 1: entrenarMedidas(fecha,"Medición de Jugadores","medidas");	break;
			}
		};
			function entrenarEspecifico(fecha,nombre) {
				let codigoSuperior = "";
				codigoSuperior += "				<div id='cajaTituloEntrenamientoPro' class='w40 h90 spaceAroundXY'>";
				codigoSuperior += "					<div id='volverdeMedidas' class='w15 h100 centradoXY pulsable' onclick=\"volverEntrenamiento('entrenamiento','"+fecha+"')\">";
				codigoSuperior += "						<img class='h90' src='img/Menu/volver.png' alt='volver'>";
				codigoSuperior += "					</div>";
				codigoSuperior += "					<h1>Entrenamiento Pro</h1>";
				codigoSuperior += "				</div>";
				codigoSuperior += "				<div id='cajaNombreEntrenamientoPro' class='w30 h90 centradoXY flexWrap'>";
				codigoSuperior += "					<h3>"+nombre+"</h3>";
				codigoSuperior += "					<strong class='w100 centradoXY'>"+fecha+"</strong>";
				codigoSuperior += "				</div>";
				codigoSuperior += "				<div id='cajaIconoEntrenamientoPro' class='w10 h90 centradoXY'><img class='w100 h90' src='img/Menu/entrenamiento.png' alt='Entrenamiento'></div>";
				document.getElementById("superiorEntrenamiento").innerHTML = codigoSuperior;

				let codigoDatos = "";
				codigoDatos += "				<div id='cajaSubmenuAgendaPro' class='w80 h10 spaceAroundXY flexWrap'>";
				codigoDatos += "					<input id='cuadroHora' type='time' class='h10 centradoXY'>";
				codigoDatos += "					<div id='cuadroBotonesTurno' class='w60 h100 spaceAroundXY'>";
				codigoDatos += "						<img id='imgTurno' class='h90' src='' alt='Turno'>";
				codigoDatos += "						<div id='botonTurno1' class='w25 centradoXY pulsable' onclick=\"cambiarTurno(1,'"+fecha+"')\">Turno Mañana</div>";
				codigoDatos += "						<div id='botonTurno2' class='w25 centradoXY pulsable' onclick=\"cambiarTurno(2,'"+fecha+"')\">Turno Tarde</div>";
				codigoDatos += "						<div id='botonTurno3' class='w25 centradoXY pulsable' onclick=\"cambiarTurno(3,'"+fecha+"')\">Turno Noche</div>";
				codigoDatos += "					</div>";
				codigoDatos += "					<div id='cuadroImgGuardar' class='h70 w7 centradoXY'></div>";
				codigoDatos += "				</div>";
				codigoDatos += "				<div id='loaderCuadroTurnos' class='centradoXY'></div>";
				codigoDatos += "				<div id='cuadroTurnos' class='w90 h90 centradoXY flexWrap'>";
				codigoDatos += "				</div>";
				document.getElementById("datosEntrenamiento").innerHTML = codigoDatos;

				// Colores personalizados
				if (sessionStorage.getItem("Color")) {
					const colores = JSON.parse(sessionStorage.getItem("Color"));
					document.getElementById("superiorEntrenamiento").style.borderColor = colores[0];
					document.getElementById("datosEntrenamiento").style.borderColor = colores[0];
				}
				cambiarTurno(1, fecha);
			};
				function cambiarTurno(opcion,fecha) {
					// Cambiar colores
					const color = sessionStorage.getItem("Color") ? JSON.parse(sessionStorage.getItem("Color")) : "";
					for (var i = 1; i <= 3; i++) {
						let labelGeneral = "botonTurno"+i;
						const colorGeneral = sessionStorage.getItem("Color") ? color[3] : "var(--color-texto)";
						document.getElementById(labelGeneral).style.color = colorGeneral;
					}
					let labelSeleccionado = "botonTurno"+opcion;
					const colorSeleccionado = sessionStorage.getItem("Color") ? color[1] : "var(--color-corporativo-rosa)";
					document.getElementById(labelSeleccionado).style.color = colorSeleccionado;

					const srcImgSeleccionado = "img/Menu/turno"+opcion+".png";
					document.getElementById("imgTurno").src = srcImgSeleccionado;

					mostrarEjerciciosTurno(opcion,fecha);
				};
					function mostrarEjerciciosTurno(turno,fecha) {
						document.getElementById("loaderCuadroTurnos").classList.add("loader");
						$.ajax({
							url: "php/listadoEjerciciosTurno.php",
							type: 'POST',
							data: {
								equipo: sessionStorage.getItem("EquipoPro"),
								fecha: fecha,
								turno: turno
							},
							success: function(res){
								document.getElementById("loaderCuadroTurnos").classList.remove("loader");
								var js = JSON.parse(res);

								$("#cuadroTurnos").hide();

								const valorHora = js.Hora !== "0" ? js.Hora.Hora : "";
								document.getElementById("cuadroHora").value = valorHora;

								let codigo = "";
								for (var i = 1; i < 11; i++) {
									codigo += "<div class='w90 cajaEjercicios spaceAroundXY flexWrap'>";
									codigo += "	<div class='w12 labelEjercicio'>Ejercicio "+i+":</div>";
									codigo += "	<div class='w40 cajaOpcionesEjercicios spaceAroundXY flexWrap'>";
									codigo += "		<select id='entrenamiento"+i+"_tipo' class='w45 selectOpcionesEntrenamiento' onchange=\"mostrarListadoEntrenamiento(this.value,"+i+")\">";
									codigo += "			<option value='0'>Tipo de ejercicio...</option>";
									codigo += "			<option value='1'>Calentamiento</option>";
									codigo += "			<option value='2'>Fuerza</option>";
									codigo += "			<option value='3'>Flexibilidad</option>";
									codigo += "			<option value='4'>Resistencia</option>";
									codigo += "			<option value='5'>Velocidad</option>";
									codigo += "			<option value='6'>Táctico</option>";
									codigo += "		</select>";
									codigo += "		<select id='entrenamiento"+i+"_opcion' class='w45 selectOpcionesEntrenamiento'>";
									codigo += "			<option></option>";
									codigo += "		</select>";
									codigo += "	</div>";
									codigo += "	<input id='entrenamiento"+i+"_cantidad' type='number' class='w10 h70 cajaEntrenamientoCantidad' value='' placeholder='0'>";
									codigo += "	<select id='entrenamiento"+i+"_unidad' class='w15 cajaEntrenamientoUnidad' value='0'>";
									codigo += "		<option value='0'>Unidad...</option>";
									codigo += "		<option value='1'>Metros</option>";
									codigo += "		<option value='2'>Minutos</option>";
									codigo += "		<option value='3'>Kilogramos</option>";
									codigo += "		<option value='4'>Repeticiones</option>";
									codigo += "	</select>";
									codigo += "	<div class='w10 centradoXY pulsable botonPrueba' onclick=\"iniciarPrueba("+turno+","+i+",'"+fecha+"')\" style='background: var(--color-corporativo-rosa);border-radius: 10px;'>Prueba</div>";
									codigo += "</div>";

								}
								document.getElementById("cuadroTurnos").innerHTML = codigo;

								$("#cuadroTurnos").fadeIn();

								if (js.Ejercicios !== "0") {
									for (var i = 0; i < js.Ejercicios.length; i++) {
										mostrarListadoEntrenamiento(js.Ejercicios[i].Categoria,js.Ejercicios[i].Orden,js.Ejercicios[i].ID_Ejercicio);
									}
									for (var i = 0; i < js.Ejercicios.length; i++) {
										var orden = js.Ejercicios[i].Orden;
										var labelTipo = "entrenamiento"+orden+"_tipo";
										document.getElementById(labelTipo).value = js.Ejercicios[i].Categoria;
										var labelCantidad = "entrenamiento"+orden+"_cantidad";
										document.getElementById(labelCantidad).value = js.Ejercicios[i].Cantidad;
										var labelUnidad = "entrenamiento"+orden+"_unidad";
										document.getElementById(labelUnidad).value = js.Ejercicios[i].Unidad;
									}
								}

								document.getElementById("cuadroImgGuardar").innerHTML = "<img id='imgGuardar' class='h100 pulsable' src='img/Menu/guardar.png' alt='Guardar' onclick=\"guardarTurnoEntrenamiento("+turno+",'"+fecha+"')\">";
								
								// Colores personalizados
								if (sessionStorage.getItem("Color")) {
									const colores = JSON.parse(sessionStorage.getItem("Color"));
									const botones = document.getElementsByClassName("botonPrueba");
									for (var i = 0; i < botones.length; i++) {
										botones[i].style.backgroundColor = colores[0];
									}
									const inputs = document.getElementsByTagName("input");
									for (var i = 0; i < inputs.length; i++) {
										inputs[i].style.borderColor = colores[1];
									}
									const select = document.getElementsByTagName("select");
									for (var i = 0; i < select.length; i++) {
										select[i].style.borderColor = colores[1];
									}
									document.getElementById("cuadroHora").style.backgroundColor = colores[0];
								}
							},
							timeout: 10000,
							error: function () { mostrarEjerciciosTurno(turno,fecha); }
						});
					};
						function mostrarListadoEntrenamiento(opcion,dia,idEjercicio) {
							const labelBuscando = "entrenamiento"+dia+"_opcion";
							document.getElementById(labelBuscando).innerHTML = "<option>Buscando...</option>";

							$.ajax({
								url: "php/listadoEjercicios.php",
								type: 'POST',
								data: {
									categoria: opcion
								},
								success: function(res){
									var js = JSON.parse(res);

									var codigo = "		<option>Elegir...</option>";
									for (var i = 0; i < js[0].length; i++) {
										codigo += "		<option value='"+js[0][i].ID_Ejercicio+"'>"+js[0][i].Nombre+"</option>";
									}
									document.getElementById(labelBuscando).innerHTML = codigo;

									if (idEjercicio) {
										var labelOpcion = "entrenamiento"+dia+"_opcion";
										document.getElementById(labelOpcion).value = idEjercicio;
									}
								},
								timeout: 10000,
								error: function () { mostrarListadoEntrenamiento(opcion,dia); }
							});
						};
						function guardarTurnoEntrenamiento(turno,fecha) {
							document.getElementById("loaderCuadroTurnos").classList.add("loader");
							let arrayTipo = []; let arrayOpcion = []; let arrayCantidad = []; let arrayUnidad = [];
							for (var i = 1; i < 11; i++) {
								var labelTipo = "entrenamiento"+i+"_tipo";
								var valorTipo = document.getElementById(labelTipo).value ? document.getElementById(labelTipo).value : 0;
								arrayTipo.push(valorTipo);
								var labelOpcion = "entrenamiento"+i+"_opcion";
								var valorOpcion = document.getElementById(labelOpcion).value ? document.getElementById(labelOpcion).value : 0;
								arrayOpcion.push(valorOpcion);
								var labelCantidad = "entrenamiento"+i+"_cantidad";
								var valorCantidad =document.getElementById(labelCantidad).value ? document.getElementById(labelCantidad).value : 0; 
								arrayCantidad.push(valorCantidad);
								var labelUnidad = "entrenamiento"+i+"_unidad";
								var valorUnidad = document.getElementById(labelUnidad).value ? document.getElementById(labelUnidad).value : 0;
								arrayUnidad.push(valorUnidad);
							}
							$.ajax({
								url: "php/guardarEjerciciosTurno.php",
								type: 'POST',
								data: {
									equipo: sessionStorage.getItem("EquipoPro"),
									fecha: fecha,
									turno: turno,
									hora: document.getElementById("cuadroHora").value,
									tipo: JSON.stringify(arrayTipo),
									idEjercicio: JSON.stringify(arrayOpcion),
									cantidad: JSON.stringify(arrayCantidad),
									unidad: JSON.stringify(arrayUnidad)
								},
								success: function(res){
									document.getElementById("loaderCuadroTurnos").classList.remove("loader");

								},
								timeout: 10000,
								error: function () { guardarTurnoEntrenamiento(turno,fecha); }
						});
						};
						function iniciarPrueba(turno,dia,fecha) {
							document.getElementById("loaderCuadroTurnos").classList.add("loader");

							$.ajax({
								url: "php/listaJugadores.php",
								type: 'POST',
								data: {
									equipo: sessionStorage.getItem("EquipoPro")
								},
								success: function(res){
									document.getElementById("loaderCuadroTurnos").classList.remove("loader");
									document.getElementById("datosEntrenamiento").classList.add("invisible");
									document.getElementById("pruebaEntrenamiento").classList.remove("invisible");
									const js = JSON.parse(res);

									let codigo = "";
									codigo += "	 <div id='cajaTitulosPruebaPro' class='w90 h10 spaceAroundXY'>";
									codigo += "			<div class='w10 h90 centradoXY'><img class='w90 h80' src='img/Menu/boton_salir.png' alt='Atras' onclick=\"cerrarPrueba("+turno+",'"+fecha+"')\"></div>";
									codigo += "			<div class='w10 centradoXY'>Dorsal</div>";
									codigo += "			<div class='w35 centradoXY'>Nombre</div>";
									codigo += "			<div class='w40 h90 centradoXY textoCentrado'>Calentamiento: Carrera Continua<br>(10 minutos)</div>";
									codigo += "	</div>";
									codigo += "	<div id='loaderCuadroTurnos' class='centradoXY'></div>";
									codigo += "	<div id='datosListadoPrueba' class='w90 h90 spaceAroundXY flexWrap'>";
									for (var i = 0; i < js[0].length; i++) {
										codigo += "		<div class='w100 h15 spaceAroundXY cajaDatosPruebaPro'>";
										labelEspecial = js[0][i].Tipo == "2" ? " fotoFichaJugadorEspecial" : "";
										codigo += "			<div class='w10 h100 fotoPruebaPro centradoXY'>";
										codigo += "				<img class='h90 fotoFichaJugador"+labelEspecial+"' src='img/Clubes/"+textoDeportes(sessionStorage.getItem("deportePro"))+"/Plantillas/"+sessionStorage.getItem("EquipoPro")+"/"+js[0][i].Foto+"' alt='img'>";
										codigo += "			</div>";
										codigo += "			<div class='w10 h90 dorsalPruebaPro centradoXY'>"+js[0][i].Dorsal+"</div>";
										codigo += "			<div class='w35'>"+js[0][i].NombreCompleto+"</div>";
										codigo += "			<div class='w40 h90 spaceAroundXY flexWrap cajaMeterDatosPrueba'>";
										codigo += "				<input id='datoPrueba_"+js[0][i].Dorsal+"' class='w40' type='number' value='0' placeholder='0' onchange=\"verBotonGuardar("+js[0][i].Dorsal+")\">";
										codigo += "				<select id='unidadPrueba_"+js[0][i].Dorsal+"' class='w30 cajaEntrenamientoUnidad' value='0' onchange=\"verBotonGuardar("+js[0][i].Dorsal+")\">";
										codigo += "					<option value='0'>Unidad...</option>";
										codigo += "					<option value='1'>Metros</option>";
										codigo += "					<option value='2'>Minutos</option>";
										codigo += "					<option value='3'>Kilogramos</option>";
										codigo += "					<option value='4'>Repeticiones</option>";
										codigo += "				</select>";
										codigo += "				<div class='w10 h100 centradoXY'>";
										codigo += "					<img id='botonGuardarPrueba_"+js[0][i].Dorsal+"' class='w100 invisible' src='img/Menu/guardar.png' alt='guardar' style='border-radius:0'>";
										codigo += "				</div>";
										codigo += "			</div>";
										codigo += "		</div>";
									}
									codigo += "	</div>";
									
									document.getElementById("pruebaEntrenamiento").innerHTML = codigo;

									// Colores personalizados
									if (sessionStorage.getItem("Color")) {
										const colores = JSON.parse(sessionStorage.getItem("Color"));
										document.getElementById("superiorEntrenamiento").style.borderColor = colores[0];
										document.getElementById("datosEntrenamiento").style.borderColor = colores[0];
									}
								},
								timeout: 10000,
								error: function() {iniciarPrueba(turno,dia,fecha);}
							});
						};
							function verBotonGuardar(dorsal) {
								const labelValorDato = "datoPrueba_"+dorsal;
								const valorDato = document.getElementById(labelValorDato).value;
								const labelUnidadDato = "unidadPrueba_"+dorsal;
								const unidadDato = document.getElementById(labelUnidadDato).value;
								const labelImg = "botonGuardarPrueba_"+dorsal;
								if (valorDato == "0" || unidadDato == "0") {
									document.getElementById(labelImg).classList.add("invisible");
								}else{
									document.getElementById(labelImg).classList.remove("invisible");
								}
							};
							function cerrarPrueba(turno,fecha) {
							document.getElementById("pruebaEntrenamiento").classList.add("invisible");
							document.getElementById("datosEntrenamiento").classList.remove("invisible");
							mostrarEjerciciosTurno(turno,fecha);
						};

		function entrenarMedidas(fecha,nombre,imagen) {
			document.getElementById("loaderProEntrenamiento").classList.add("loader");
			$.ajax({
				url: "php/datosMedidasJugadores.php",
				type: 'POST',
				data: {
					equipo: sessionStorage.getItem("EquipoPro"),
					fecha: fecha
				},
				success: function(res){
					document.getElementById("loaderProEntrenamiento").classList.remove("loader");
					const js = JSON.parse(res);
					const jsLength = js.length;

					let codigoSuperior = "";
					codigoSuperior += "				<div class='w40 h90 spaceAroundXY'>";
					codigoSuperior += "					<div id='volverdeMedidas' class='w15 h100 centradoXY pulsable' onclick=\"volverEntrenamiento('"+imagen+"','"+fecha+"')\">";
					codigoSuperior += "						<img class='h90' src='img/Menu/volver.png' alt='volver'>";
					codigoSuperior += "					</div>";
					codigoSuperior += "					<h1>Entrenamiento Pro</h1>";
					codigoSuperior += "				</div>";
					codigoSuperior += "				<div class='w30 h90 centradoXY flexWrap'>";
					codigoSuperior += "					<h3>"+nombre+"</h3>";
					codigoSuperior += "					<strong class='w100 centradoXY'>"+fecha+"</strong>";
					codigoSuperior += "				</div>";
					codigoSuperior += "				<div class='w10 h90 centradoXY'><img class='w100 h90' src='img/Menu/"+imagen+".png' alt='"+imagen+"'></div>";
					document.getElementById("superiorEntrenamiento").innerHTML = codigoSuperior;

					let codigoDatos = "";
					codigoDatos += "				<div id='cajaTitulosMedidasPro' class='w90 h10 spaceAroundXY'>";
					codigoDatos += "					<div class='w10 h90'></div>";
					codigoDatos += "					<div class='w10 h90 centradoXY'>Dorsal</div>";
					codigoDatos += "					<div class='w35 h90 centradoXY'>Nombre</div>";
					codigoDatos += "					<div class='w40 h100 spaceAroundXY flexWrap cajaInputsMedidasPro'>";
					codigoDatos += "						<div class='w30 h90 centradoXY'>Peso<br>(kgs)</div>";
					codigoDatos += "						<div class='w30 h90 centradoXY'>Altura<br>(cms)</div>";
					codigoDatos += "						<div class='w30 h90 centradoXY'>Envergadura<br>(cms)</div>";
					codigoDatos += "					</div>";
					codigoDatos += "				</div>";
					codigoDatos += "				<div id='datosListadoMedidas' class='w90 h90 spaceAroundXY flexWrap'>";
					const array = [];
					for (var i = 0; i < jsLength; i++) {
						array.push(js[i].ID_Jugador);
						codigoDatos += "				<div class='w100 h20 spaceAroundXY flexWrap cajaDatosMedidasPro'>";
						const direccion = js[i].Foto !== "" ? js[i].Foto : "x.png";
						labelEspecial = js[i].Tipo == "2" ? " fotoFichaJugadorEspecial" : "";
						codigoDatos += "					<div class='w10 h90 centradoXY'><img class='h90 fotoFichaJugador"+labelEspecial+"' src='img/Clubes/"+textoDeportes(sessionStorage.getItem("deportePro"))+"/Plantillas/"+sessionStorage.getItem("EquipoPro")+"/"+direccion+"' alt='foto' onerror=\"this.src='img/Clubes/usuario.png'\"></div>";
						const dorsal = js[i].Dorsal !== '0' ? js[i].Dorsal : "--";
						codigoDatos += "					<div class='w10 centradoXY dorsalMedidasPro'>"+dorsal+"</div>";
						codigoDatos += "					<div class='w35'>"+js[i].Nombre+"</div>";
						codigoDatos += "					<div class='w40 h100 spaceAroundXY flexWrap cajaInputsMedidasPro'>";
						let peso = js[i].Peso !== "" ? js[i].Peso : "";
						codigoDatos += "						<input id='peso"+js[i].ID_Jugador+"' class='w30 centradoXY pulsable' type='number' min='20' max='200' step='.100' value='"+peso+"' onchange=\"guardarMedida("+js[i].ID_Jugador+",1,this.value,'"+fecha+"')\">";
						let altura = js[i].Altura !== "" ? js[i].Altura : "";
						codigoDatos += "						<input id='altura"+js[i].ID_Jugador+"' class='w30 centradoXY pulsable' type='number' min='90' max='230' value='"+altura+"' onchange=\"guardarMedida("+js[i].ID_Jugador+",2,this.value,'"+fecha+"')\">";
						let envergadura = js[i].Envergadura !== "" ? js[i].Envergadura : "";
						codigoDatos += "						<input id='envergadura"+js[i].ID_Jugador+"' class='w30 centradoXY pulsable' type='number' min='50' max='250' value='"+envergadura+"' onchange=\"guardarMedida("+js[i].ID_Jugador+",3,this.value,'"+fecha+"')\">";
						codigoDatos += "					</div>";
						codigoDatos += "				</div>";
					}
					sessionStorage.setItem("Plantilla", JSON.stringify(array));
					codigoDatos += "				</div>";
					document.getElementById("datosEntrenamiento").innerHTML = codigoDatos;

					// Colores personalizados
					if (sessionStorage.getItem("Color")) {
						const colores = JSON.parse(sessionStorage.getItem("Color"));
						document.getElementById("superiorEntrenamiento").style.borderColor = colores[0];
						document.getElementById("datosEntrenamiento").style.borderColor = colores[0];
					}
				},
				timeout: 10000,
				error: function() {entrenarMedidas(fecha,nombre,imagen);}
			});
		};
			function guardarMedida(idJugador,tipo,dato,fecha) {
				// Guardar el dato en sessionStorage
				const array = Array("","peso","altura","envergadura");
				const label = array[tipo]+idJugador+"_"+fecha;
				sessionStorage.setItem(label,dato);
			};
	function volverEntrenamiento(opcion,fecha) {
		let plantilla = JSON.parse(sessionStorage.getItem("Plantilla"));
		let datos = [];
		switch(opcion) {
			case "asistencia":
				for (var i = plantilla.length - 1; i >= 0; i--) {
					if (sessionStorage.getItem(plantilla[i])) {
						datos.push(Array(plantilla[i],sessionStorage.getItem(plantilla[i])));
					}
					//let valor = sessionStorage.getItem(plantilla[i]) ? sessionStorage.getItem(plantilla[i]) : "0";
				}
				if (datos.length > 0) {
					document.getElementById("loaderProEntrenamiento").classList.add("loader");
					$.ajax({
						url: "php/guardarAsistencia.php",
						type: 'POST',
						data: {
							fecha: fecha,
							equipo: sessionStorage.getItem("EquipoPro"),
							datos: JSON.stringify(datos)
						},
						success: function(){
							document.getElementById("loaderProEntrenamiento").classList.remove("loader");

							// Eliminar sessionStorage de la plantilla
							for (var i = plantilla.length - 1; i >= 0; i--) {
								sessionStorage.removeItem(plantilla[i]);
							}
							
							// Cambiar de pantalla
							document.getElementById("cajaMenuProEntrenamiento2").classList.add("invisible");
							document.getElementById("cajaMenuProEntrenamiento1").classList.remove("invisible");
						},
						error: function() {
							document.getElementById("volverdeAsistencia").classList.add("shake");
						}
					});
				}else{
					// Cambiar de pantalla
					document.getElementById("cajaMenuProEntrenamiento2").classList.add("invisible");
					document.getElementById("cajaMenuProEntrenamiento1").classList.remove("invisible");
				}

				break;
			case "entrenamiento":
				// Cambiar de pantalla
				document.getElementById("cajaMenuProEntrenamiento2").classList.add("invisible");
				document.getElementById("cajaMenuProEntrenamiento1").classList.remove("invisible");
				break;
			case "medidas":
				for (var i = plantilla.length - 1; i >= 0; i--) {
					let labelAltura = "altura"+plantilla[i];
					let altura = document.getElementById(labelAltura).value ? document.getElementById(labelAltura).value : "0";
					let labelPeso = "peso"+plantilla[i];
					let peso = document.getElementById(labelPeso).value ? document.getElementById(labelPeso).value : "0";
					let labelEnvergadura = "envergadura"+plantilla[i];
					let envergadura = document.getElementById(labelEnvergadura).value ? document.getElementById(labelEnvergadura).value : "0";
					datos.push(Array(plantilla[i],altura,peso,envergadura));
				}
				document.getElementById("loaderProEntrenamiento").classList.add("loader");
				$.ajax({
					url: "php/guardarMedidas.php",
					type: 'POST',
					data: {
						fecha: fecha,
						equipo: sessionStorage.getItem("EquipoPro"),
						datos: JSON.stringify(datos)
					},
					success: function(){
						document.getElementById("loaderProEntrenamiento").classList.remove("loader");
						// Eliminar sessionStorage de la plantilla
						for (var i = plantilla.length - 1; i >= 0; i--) {
							sessionStorage.removeItem(plantilla[i]);
						}
						const labelNuevo = "medidas_"+fecha;
						document.getElementById(labelNuevo).classList.add("cajaDiarioSeleccionada");
						// Cambiar de pantalla
						document.getElementById("cajaMenuProEntrenamiento2").classList.add("invisible");
						document.getElementById("cajaMenuProEntrenamiento1").classList.remove("invisible");
					},
					error: function() {
						document.getElementById("volverdeMedidas").classList.add("shake");
					}
				});
				break;
		}

	};
	function diaLibre(opcion,fecha) {
		document.getElementById("loaderProEntrenamiento").classList.add("loader");
		const labelIcono = "#diaLibre_"+fecha;
		$.ajax({
			url: "php/guardarDiaLibre.php",
			type: 'POST',
			data: {
				equipo: sessionStorage.getItem("EquipoPro"),
				fecha: fecha,
				tipo: opcion
			},
			success: function(){
				document.getElementById("loaderProEntrenamiento").classList.remove("loader");
				codigo = "";
				if (opcion == "2") {
					codigo += "			<div class='w15 h80 centradoXY'>"+fecha+"</div>";
					codigo += "			<div class='divHueco w0'></div>";
					codigo += "			<div class='w66 centradoXY flexWrap'>DÍA DE DESCANSO</div>";
					codigo += "			<div class='w5 h80 centradoXY flexWrap botonEntrenamientoPro' onclick=\"diaLibre(1,'"+fecha+"')\">";
					codigo += "				<img class='h90' src='img/Menu/boton_salir.png' alt=''>";
					codigo += "			</div>";
				}else{
					const labelTotal = "presentes_"+fecha;
					const valor = sessionStorage.getItem(labelTotal) ? sessionStorage.getItem(labelTotal) : 0;
					codigo += "				<div class='w15 h80 centradoXY'>"+fecha+"</div>";
					codigo += "				<div id='asistencia_"+fecha+"' class='w10 centradoXY flexWrap pulsable' onclick=\"verAsistenciaEntrenamiento('"+fecha+"')\">Asistentes<br>"+valor+"</div>";
					codigo += "				<div id='fuerza"+fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro' onclick=\"verEntrenamiento(0,'"+fecha+"')\">";
					codigo += "					<img class='h90' src='img/Menu/fuerza.png' alt=''>";
					codigo += "				</div>";
					codigo += "				<div id='flexibilidad_"+fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro' onclick=\"verEntrenamiento(1,'"+fecha+"')\">";
					codigo += "					<img class='h90' src='img/Menu/flexibilidad.png' alt=''>";
					codigo += "				</div>";
					codigo += "				<div id='resistencia_"+fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro' onclick=\"verEntrenamiento(2,'"+fecha+"')\">";
					codigo += "					<img class='h90' src='img/Menu/resistencia.png' alt=''>";
					codigo += "				</div>";
					codigo += "				<div id='velocidad_"+fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro' onclick=\"verEntrenamiento(3,'"+fecha+"')\">";
					codigo += "					<img class='h90' src='img/Menu/velocidad.png' alt=''>";
					codigo += "				</div>";
					codigo += "				<div id='tactica_"+fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro' onclick=\"verEntrenamiento(4,'"+fecha+"')\">";
					codigo += "					<img class='h90' src='img/Menu/tactica.png' alt=''>";
					codigo += "				</div>";
					codigo += "				<div id='medidas_"+fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro' onclick=\"verEntrenamiento(5,'"+fecha+"')\">";
					codigo += "					<img class='h90' src='img/Menu/medidas.png' alt=''>";
					codigo += "				</div>";
					codigo += "				<div id='diaLibre_"+fecha+"' class='w5 h80 centradoXY flexWrap botonEntrenamientoPro' onclick=\"diaLibre(2,'"+fecha+"')\">";
					codigo += "					<img class='h90' src='img/Menu/diaLibre.png' alt=''>";
					codigo += "				</div>";
				}
				const label = "diaEntrenamiento_"+fecha;
				document.getElementById(label).innerHTML = codigo;
			},
			timeout: 10000,
			error: function() {diaLibre(opcion,fecha);}
		});
	};


// Funciones Menú Pizarra Táctica


// Funciones Menú Informes


// Funciones Menú Configuración
function menuConfiguracionPro() {
	// Cambio de pantalla
	document.getElementById("cajaMenuCentralPro").classList.add("invisible");
	document.getElementById("cajaMenuProConfiguracion").classList.remove("invisible");

	document.getElementById("loaderProEntrenamiento").classList.add("loader");

	codigo = "";
	codigo += "				<div class='w95 h15 bordesCaja centradoInlineXY'>";
	codigo += "					<div id='volverConfPro' class='w5 h100 centradoXY pulsable' onclick=\"volverMenuPro('Configuracion')\" ontouchstart=\"inicioPulsacion('volverConfPro')\" ontouchend=\"finPulsacion('volverConfPro')\">";
	codigo += "						<img class='w90' src='img/Menu/anterior.png' alt='Volver'>";
	codigo += "					</div>";
	codigo += "					<div class='w95 h100 centradoXY flexWrap'>";
	codigo += "						<div class='w100 h90 spaceAroundXY'>";
	codigo += "							<h1>Configuraciones Pro</h1>";
	codigo += "							<img class='h90' src='img/Clubes/Clubes/"+sessionStorage.getItem("EscudoClub")+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\" alt='Escudo'>";
	codigo += "						</div>";
	codigo += "					</div>";
	codigo += "				</div>";
	codigo += "				<div id='menuConfiguracionPro' class='w90 h80 spaceAroundXY'>";
	codigo += "					<div id='cajaSuperiorConfiguracionPro' class='w30 h90 centradoXY flexWrap'>";
	codigo += "						<h2 class='w95 h15 centradoXY bordesCaja'>Entrenamiento Pro</h2>";
	codigo += "						<div class='w95 h35 spaceAroundXY flexWrap bordesCaja' style='position:relative'>";
	codigo += "							<select id='selectConfigurarCalendario'>";
	codigo += "								<option>Buscando...</option>";
	codigo += "							</select>";
	codigo += "							<span id='loaderCearAgendaEntrenamientoPro' class='centradoXY'></span>";
	codigo += "							<div id='respuestaEntrenamientoPro' class='w90 h15 centradoXY'></div>";
	codigo += "							<div id='botonCrearCalendario' class='w40 h30 centradoXY flexWrap pulsable' onclick=\"configurarEntrenamientoPro(1)\" ontouchstart=\"inicioPulsacion('botonCrearCalendario')\" ontouchend=\"finPulsacion('botonCrearCalendario')\" style='background: var(--color-corporativo-morado);border-radius: 15px;text-align: center;font-size:.8em'>";
	codigo += "								<label class='w100 centradoXY noOperativo'>Crear/Actualizar</label><label class='centradoXY noOperativo'>Calendario</label>";
	codigo += "							</div>";
	codigo += "							<div id='botonBorrarCalendario' class='w40 h30 centradoXY flexWrap pulsable' onclick=\"configurarEntrenamientoPro(2)\" ontouchstart=\"inicioPulsacion('botonBorrarCalendario')\" ontouchend=\"finPulsacion('botonBorrarCalendario')\" style='background: var(--color-pro);border-radius: 15px;text-align: center;font-size:.8em'>";
	codigo += "								<label class='w100 centradoXY noOperativo'>Borrar</label><label class='centradoXY noOperativo'>Calendario</label>";
	codigo += "							</div>";
	codigo += "						</div>";
	codigo += "						<div class='w95 h35 spaceAroundXY flexWrap bordesCaja' style='position:relative'>";
	codigo += "							<select id='selectTipoEjercicioEntrenamiento' class='w90'>";
	codigo += "								<option>Seleccionar categoría...</option>";
	codigo += "								<option value='1'>Calentamiento</option>";
	codigo += "								<option value='2'>Fuerza</option>";
	codigo += "								<option value='3'>Flexibilidad</option>";
	codigo += "								<option value='4'>Resistencia</option>";
	codigo += "								<option value='5'>Velocidad</option>";
	codigo += "								<option value='6'>Táctico</option>";
	codigo += "							</select>";
	codigo += "							<input id='inputNombreEjercicio' type='text' class='w80'>";
	codigo += "							<span id='loaderCrearEjercicioEntrenamientoPro' class='centradoXY'></span>";
	codigo += "							<div id='botonCrearEjercicio' class='w40 h30 centradoXY flexWrap pulsable' onclick=\"crearEjercicioPro(1)\" ontouchstart=\"inicioPulsacion('botonCrearEjercicio')\" ontouchend=\"finPulsacion('botonCrearEjercicio')\" style='background: var(--color-corporativo-morado);border-radius: 15px;text-align: center;font-size:.8em'>";
	codigo += "								<label class='w100 centradoXY noOperativo'>Crear</label><label class='centradoXY noOperativo'>Ejercicio</label>";
	codigo += "							</div>";
	codigo += "							<div id='botonBorrarEjercicio' class='w40 h30 centradoXY flexWrap pulsable' onclick=\"crearEjercicioPro(2)\" ontouchstart=\"inicioPulsacion('botonBorrarEjercicio')\" ontouchend=\"finPulsacion('botonBorrarEjercicio')\" style='background: var(--color-pro);border-radius: 15px;text-align: center;font-size:.8em'>";
	codigo += "								<label class='w100 centradoXY noOperativo'>Borrar</label><label class='centradoXY noOperativo'>Ejercicio</label>";
	codigo += "							</div>";
	codigo += "						</div>";
	codigo += "					</div>";
	codigo += "					<div class='w30 h90 centradoXY flexWrap'>";
	codigo += "						<h2 class='w95 h15 centradoXY bordesCaja'>Pizarra Táctica</h2>";
	codigo += "						<div class='w95 h80 centradoXY flexWrap'>";
	codigo += "						</div>";
	codigo += "					</div>";
	codigo += "					<div class='w30 h90 centradoXY flexWrap'>";
	codigo += "						<h2 class='w95 h15 centradoXY bordesCaja'>Informes</h2>";
	codigo += "						<div class='w95 h80 centradoXY flexWrap'>";
	codigo += "						</div>";
	codigo += "					</div>";
	codigo += "				</div>";

	document.getElementById("cajaMenuProConfiguracion").innerHTML = codigo;

	// Colores personalizados
	if (sessionStorage.getItem("Color")) {
		const colores = JSON.parse(sessionStorage.getItem("Color"));
		document.getElementById("cajaSuperiorConfiguracionPro").style.borderColor = colores[0];
		document.getElementById("selectConfigurarCalendario").style.borderColor = colores[0];
		document.getElementById("selectTipoEjercicioEntrenamiento").style.borderColor = colores[0];
		document.getElementById("inputNombreEjercicio").style.borderColor = colores[0];
		var label = document.getElementsByClassName("bordesCaja");
			for (var i = 0; i < label.length; i++) {	label[i].style.borderColor = colores[0];	}
		document.getElementById("cajaMenuProConfiguracion").style.background = colores[2];
	}
	
	document.getElementById("loaderCearAgendaEntrenamientoPro").classList.add("loader");
	$.ajax({
		url: "php/listaEquipos.php",
		type: 'POST',
		data: {
			deporte: sessionStorage.getItem("deportePro"),
			estado: "1"
		},
		success: function(res){
			document.getElementById("loaderCearAgendaEntrenamientoPro").classList.remove("loader");
			var js= JSON.parse(res);
			codigo = "						<option>Seleccionar equipo...</option>";
			for (var i = 0; i < js[0].length; i++) {
				codigo += "					<option value='"+js[0][i].ID_Equipo+"'>"+js[0][i].Nombre+"</option>";
			}			
			document.getElementById("selectConfigurarCalendario").innerHTML = codigo;
		},
		timeout: 10000,
		error: function() {menuConfiguracionPro();}
	});
};
	function configurarEntrenamientoPro(opcion) {
		switch(opcion) {
			case 1:
				document.getElementById("loaderCearAgendaEntrenamientoPro").classList.add("loader");
				$.ajax({
					url: "php/crearCalendario.php",
					type: 'POST',
					data: {
						equipo: document.getElementById("selectConfigurarCalendario").value
					},
					success: function(res){
						document.getElementById("loaderCearAgendaEntrenamientoPro").classList.remove("loader");
						var js= JSON.parse(res);
						if (js.Resultado == "Nuevo") {
							document.getElementById("respuestaEntrenamientoPro").innerHTML = "Creado nuevo Calendario";
						}else if (js.Resultado == "Actualizado") {
							document.getElementById("respuestaEntrenamientoPro").innerHTML = "Calendario Actualizado";
						}
					},
					error: function () {
						document.getElementById("respuestaEntrenamientoPro").innerHTML = "Ocurrió un error. Vuelve a intentarlo";
					}
				});
				break;
			case 2:
				alert("Lamentamos las molestias. Función no disponible todavía.");
				break;
		}
	};
	function crearEjercicioPro(opcion) {
		switch(opcion) {
			case 1:
				document.getElementById("loaderCrearEjercicioEntrenamientoPro").classList.add("loader");
				$.ajax({
					url: "php/nuevoEjercicio.php",
					type: 'POST',
					data: {
						tipo: document.getElementById("selectTipoEjercicioEntrenamiento").value,
						nombre: document.getElementById("inputNombreEjercicio").value
					},
					success: function(res){
						document.getElementById("loaderCrearEjercicioEntrenamientoPro").classList.remove("loader");
						if (res == "1") {
							alert("Ejercicio creado");
						}else {
							alert("Ocurrió un error. Ejercicio no guardado");
						}
					},
					error: function () {
						document.getElementById("respuestaEntrenamientoPro").innerHTML = "Ocurrió un error. Vuelve a intentarlo";
					}
				});
				break;
			case 2:
				alert("Lamentamos las molestias. Función no disponible todavía.");
				break;
		}
	};