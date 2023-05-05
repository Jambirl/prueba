// Funciones para menú competiciones labelResultado
function prepararPantallaCompeticiones() {
	// Tomar Idioma
	const textoMSuperior = textoMenuSuperior();
	const textoIdioma = textoCompeticiones();

	const deporte = sessionStorage.getItem("Deporte");

	// Preparar código cuadro superior
	var superior = versionBeta();		
	superior += "	<img class='h15 botonVolverMenuSuperior' src='img/Menu/anterior.png' alt='Volver'>";
	superior += "	<label onclick=\"pasarPantalla('menuCompeticiones','menuIndex')\">"+textoMSuperior[0]+"</label>";
	superior += "	<label class='botonMenuSuperior'>"+textoIdioma[0]+" · "+ textoDeportes(deporte) +"</label>";
	superior += "	<img class='botonMenuSuperior logoBigDT' src='img/Menu/Logo_BigDT.png' onclick=\"pasarPantalla('menuCompeticiones','menuIndex')\">";

	$("#cajaMenuSuperiorCompeticiones").html(superior);

	// Preparar código cuadro para seleccionar
	const hoy = new Date();
	const mesActual = hoy.getMonth() + 1;
	const temporada = mesActual > 7 ? hoy.getFullYear() : hoy.getFullYear() - 1;

	document.getElementById("loaderCompeticiones").classList.add("loader");
	$.ajax({
		url: "php/menuCompeticiones.php",
		type: 'POST',
		data: {
			deporte: deporte
		},
		success: function(res){
			document.getElementById("loaderCompeticiones").classList.remove("loader");
			const js= JSON.parse(res);

			var central = "";
			if (js[0] !== null) {
				// Menú elección temporada y competiciones
				central += "<div id='cajaSeleccionarCompeticiones' class='w100 h20 spaceAroundXY flexWrap scrollbar'>";
				central += "	<div id='filaTemporadasCompeticiones' class='w100 h50 cajonTemporada'>";
				if (js.Temporadas !== "0") {
					for (var i = js.Temporadas.length - 1; i >= 0; i--) {
						central += "<div class='h60 w10 cuadroTemporadaCompeticiones centradoXY'>";
						central += "	<input id='botonTemporada"+js.Temporadas[i].Temporada+"' type='radio' name='botonTemporada' value='"+js.Temporadas[i].Temporada+"' onchange=\"mostrarCompeticiones('"+deporte+"')\">";
						central += "	<label class='pulsable' for='botonTemporada"+js.Temporadas[i].Temporada+"'>"+textoIdioma[1]+"<br>"+js.Temporadas[i].Temporada+"-"+(parseInt(js.Temporadas[i].Temporada)+1)+"</label>";
						central += "</div>";
					}
				}
				central += "	</div>";
				central += "	<div id='filaCategoriasCompeticiones' class='w70 h50 spaceAroundXY'>";
				central += "	<div id='botonCompeticionesBigDT' class='w20 h90 centradoXY parpadeo pulsable' onclick=\"mostrarCompeticionesBigDT('"+deporte+"')\">";
				central += "		<div class='w75 h100 centradoXY flexWrap'>Competiciones<br>Big DT</div>";
				central += "		<img class='w20 h90' src='img/Menu/Logo_BigDT.png' alt='Personalizadas'>";
				central += "	</div>";
				if (js.Ambitos !== "0") {
					for (var j = 0; j < js.Ambitos.length; j++) {
						if (js.Ambitos[j].Ambito !== "6") {
							central += "<div class='w20 cuadroCategoriasCompeticiones centradoXY'>";
							central += "	<input id='botonCompeticion"+js.Ambitos[j].Ambito+"' type='radio' name='botonCompeticion' value='"+js.Ambitos[j].Ambito+"' onchange=\"mostrarCompeticiones('"+deporte+"')\">";
							central += "	<label class='pulsable' for='botonCompeticion"+js.Ambitos[j].Ambito+"'>"+textoIdioma[2]+"<br>"+textoIdioma[3+parseInt(js.Ambitos[j].Ambito)]+"</label>";
							central += "</div>";
						}
					}
				}
				central += "	</div>";
				central += "	<div id='botonCompeticionesPersonalizadas' class='w15 h40 centradoXY pulsable' onclick=\"mostrarCompeticionesPersonalizadas('"+deporte+"')\">";
				central += "		<div class='w90 h100 centradoXY flexWrap'>Competiciones<br>Personalizadas</div>";
				central += "	</div>";
				central += "</div>";

				// Imagen de fondo
				central += "<img id='imagenFondoCompeticiones' src='img/Menu/Brumafondo.png' alt='Fondo'>";

				// Cuadro para mostrar datos
				central += "<div id='cuadroMostrarCompeticiones' class='w90 h80 centradoXY flexWrap'>";
				central += "</div>";

				// Publicar códigos
				$("#cajaMenuCentralCompeticiones").html(central);

				// Marcar botones por defecto
				if (js.Temporadas !== "0") {
					var botonTemporada = "#botonTemporada"+temporada;
					document.querySelector(botonTemporada).checked = true; // Marcar temporada actual
				}
				if (js.Ambitos !== "0") {
					document.querySelector("#botonCompeticion2").checked = true; // Marcar Nacional por defecto
				}

				mostrarCompeticiones(deporte);
			}else{
				central += "No se encontraron competiciones para este deporte";

				// Publicar códigos
				$("#cajaMenuCentralCompeticiones").html(central);
			}
		},
		timeout: 10000,
		error: function() {prepararPantallaCompeticiones(deporte);}
	});
};
	function mostrarCompeticiones(deporte) {
		var temporada = document.querySelector('input[name="botonTemporada"]:checked') ? document.querySelector('input[name="botonTemporada"]:checked').value : 'undefined';
		var competicion = document.querySelector('input[name="botonCompeticion"]:checked') ? document.querySelector('input[name="botonCompeticion"]:checked').value : 'undefined';

		if ((typeof temporada !== 'undefined' && temporada !== 'undefined') && (typeof competicion !== 'undefined' && competicion !== 'undefined')) {
			document.getElementById("loaderCompeticiones").classList.add("loader");
			$.ajax({
				url: "php/listadoCompeticiones.php",
				type: 'POST',
				data: {
					deporte: deporte,
					temporada: temporada,
					ambito: competicion
				},
				success: function(res){
					const js= JSON.parse(res);

					document.getElementById("loaderCompeticiones").classList.remove("loader");

					// Tomar Idioma
					var textoIdioma = textoCompeticiones();

					var codigo ="";
					if (js.length !== 0) {
						codigo += "	<div id='cuadroCompeticiones' class='w90 h100 centradoXY flexWrap'>";
						for (var i = 0; i < js[0].length; i++) {
							codigo += "		<div class='filaCategoria w90 centradoXY flexWrap'>";
							codigo += "			<div class='datosCompeticion w100 h50 centradoInlineXY'>";
							codigo += "				<div class='w15 h10'>";
							if (js[0][i].Masculino[0].Nombre) {
								codigo += "				<label>"+js[0][i].Masculino[0].Tipo+"</label>";
								codigo += "			</div>";
								codigo += "			<div class='w15 h10'>";
								codigo += "				<label>"+js[0][i].Masculino[0].Nivel+"ª Categoría</label>";
								codigo += "			</div>";
								codigo += "			<div class='w25 h10 submenusCentrados'>";
								codigo += "				<label>"+textoIdioma[8]+"</label>";
								codigo += "			</div>";
								codigo += "			<div class='w25 h10 submenusCentrados'>";
								codigo += "				<label>"+textoIdioma[9]+"</label>";
								codigo += "			</div>";
								codigo += "			<div class='w20 h10 submenusCentrados'>";
								codigo += "				<label>"+textoIdioma[10]+"</label>";
								codigo += "			</div>";
							}else if (js[0][i].Femenino[0].Nombre) {
								codigo += "				<label>"+js[0][i].Femenino[0].Tipo+"</label>";
								codigo += "			</div>";
								codigo += "			<div class='w15 h10'>";
								codigo += "				<label>"+js[0][i].Femenino[0].Nivel+"ª Categoría</label>";
								codigo += "			</div>";
								codigo += "			<div class='w25 h10 submenusCentrados'>";
								codigo += "				<label>"+textoIdioma[8]+"</label>";
								codigo += "			</div>";
								codigo += "			<div class='w25 h10 submenusCentrados'>";
								codigo += "				<label>"+textoIdioma[9]+"</label>";
								codigo += "			</div>";
								codigo += "			<div class='w20 h10 submenusCentrados'>";
								codigo += "				<label>"+textoIdioma[10]+"</label>";
								codigo += "			</div>";
							}
							codigo += "			</div>";
							codigo += "			<div class='w100 h50 centradoInlineXY alineacionSuperior'>";
							codigo += "				<div class='w30 h10'>";
							codigo += "				</div>";
							codigo += "				<div class='w25 h10 centradoInlineXY flexWrap pulsable'>";
							if (js[0][i].Masculino[0].Nombre) {
								for (var j = 0; j < js[0][i].Masculino.length; j++) {
									var escudoMasculino = js[0][i].Masculino[0].Escudo ? js[0][i].Masculino[0].Escudo : "x.png";
									codigo += "			<button class='botonCompeticiones centradoInlineXY flexWrap division"+js[0][i].Masculino[j].Nivel+"Fondo' onclick=\"pasarPantalla('menuCompeticiones','menuCompeticiones2','"+js[0][i].Masculino[j].Nombre+"',"+js[0][i].Masculino[j].ID_Campeonato+",1,'"+js[0][i].Masculino[0].Escudo+"','"+js[0][i].Masculino[j].Escudo_Organizadora+"')\"><div class='w75 centradoXY'><strong>"+js[0][i].Masculino[j].Nombre+"</strong></div><img class='w20' src='img/Menu/Logos/"+escudoMasculino+"' onerror=\"this.src='img/Clubes/Organizadoras/"+js[0][i].Masculino[j].Escudo_Organizadora+"'\" alt='Escudo'></button>";
								}
							}
							codigo += "				</div>";
							codigo += "				<div class='w25 h10 centradoInlineXY flexWrap pulsable'>";
							if (js[0][i].Femenino[0].Nombre) {
								for (var j = 0; j < js[0][i].Femenino.length; j++) {
									var escudoFemenino = js[0][i].Femenino[0].Escudo ? js[0][i].Femenino[0].Escudo : "x.png";
									codigo += "			<button class='botonCompeticiones centradoInlineXY flexWrap division"+js[0][i].Femenino[j].Nivel+"Fondo' onclick=\"pasarPantalla('menuCompeticiones','menuCompeticiones2','"+js[0][i].Femenino[j].Nombre+"',"+js[0][i].Femenino[j].ID_Campeonato+",2,'"+js[0][i].Femenino[j].Escudo+"','"+js[0][i].Femenino[j].Escudo_Organizadora+"')\"><div class='w75 centradoXY'><strong>"+js[0][i].Femenino[j].Nombre+"</strong></div><img class='w20' src='img/Menu/Logos/"+escudoFemenino+"' onerror=\"this.src='img/Clubes/Organizadoras/"+js[0][i].Femenino[j].Escudo_Organizadora+"'\" alt='Escudo'></button>";
								}
							}
							codigo += "				</div>";
							codigo += "				<div class='w20 h10 centradoInlineXY flexWrap pulsable'>";
							if (js[0][i].Mixto[0].Nombre) {
								for (var j = 0; j < js[0][i].Mixto.length; j++) {
									var escudoMixto = js[0][i].Mixto[0].Escudo ? js[0][i].Mixto[0].Escudo : "x.png";
									codigo += "			<button class='botonCompeticiones centradoInlineXY flexWrap division"+js[0][i].Mixto[j].Nivel+"Fondo' onclick=\"pasarPantalla('menuCompeticiones','menuCompeticiones2','"+js[0][i].Mixto[j].Nombre+"',"+js[0][i].Mixto[j].ID_Campeonato+",3,'"+js[0][i].Mixto[j].Escudo+"','"+js[0][i].Mixto[j].Escudo_Organizadora+"')\"><div class='w75 centradoXY'><strong>"+js[0][i].Mixto[j].Nombre+"</strong></div><img class='w20' src='img/Menu/Logos/"+escudoMixto+"' onerror=\"this.src='img/Clubes/Organizadoras/"+js[0][i].Mixto[j].Escudo_Organizadora+"'\" alt='Escudo'></button>";
								}
							}
							codigo += "				</div>";		
							codigo += "			</div>";
							codigo += "		</div>";
						}
						codigo += "	</div>";
					}else{
						codigo += "Imposible encontrar competiciones";
					}

					$("#cuadroMostrarCompeticiones").html(codigo);
				},
				timeout: 10000,
				error: function() {mostrarCompeticiones(deporte);}
			});
		}else{
			central = "No se encontraron competiciones para este deporte";

			// Publicar códigos
			$("#cajaMenuCentralCompeticiones").html(central);
		}
	};
	function mostrarCompeticionesPersonalizadas(deporte) {
		const temporada = document.querySelector('input[name="botonTemporada"]:checked').value;

		for (var i = 0; i < 5; i++) {
			var label = "botonCompeticion"+i;
			if (document.getElementById(label)) {
				document.getElementById(label).checked = false;
			}
		}

		let codigo = "";
		codigo += "					<div class='w50 h10 centradoXY'>";
		codigo += "						<input class='w70' type='text' oninput='mostrarListadoCompeticionesPersonalizadas(this.value)' placeholder='Buscar por nombre...' style='background:none; border-radius: 20px; border: none; border-bottom: 2px solid var(--color-corporativo-morado); padding-left: 4%;'>";
		codigo += "					</div>";
		codigo += "					<div id='resultadosCompeticionesPersonalizadas' class='w90 h80 spaceAroundXY flexWrap'></div>";

		$("#cuadroMostrarCompeticiones").html(codigo);
	};
		function mostrarListadoCompeticionesPersonalizadas(texto) {
			document.getElementById("resultadosCompeticionesPersonalizadas").innerHTML = "Buscando: "+texto;
		};
	function mostrarCompeticionesBigDT(deporte) {
		const temporada = document.querySelector('input[name="botonTemporada"]:checked').value;

		for (var i = 0; i < 5; i++) {
			var label = "botonCompeticion"+i;
			if (document.getElementById(label)) {
				document.getElementById(label).checked = false;
			}
		}

		let codigo = "";
		codigo += "					<div class='w50 h10 centradoXY'>";
		codigo += "						<input class='w70' type='text' oninput='mostrarListadoCompeticionesBigDT(this.value)' placeholder='Buscar por nombre...' style='background:none; border-radius: 20px; border: none; border-bottom: 2px solid var(--color-corporativo-morado); padding-left: 4%;'>";
		codigo += "					</div>";
		codigo += "					<div id='resultadosCompeticionesBigDT' class='w90 h80 spaceAroundXY flexWrap'></div>";

		$("#cuadroMostrarCompeticiones").html(codigo);

		mostrarListadoCompeticionesBigDT();

/*
Continuar por aquí


Crear poder inscribirse y guardarlo en BD

Comprobar que creo un equipo personalizado y lo puedo meter.

NOTA: Poner en algún sitio si quiero que se apunten equipos Oficiales o sólo personalizados (habrá torneos en los que haya equipos oficiales también)


Falta poder guardar los cambios en las plantillas y añadir a los jugadores de los equipos personalizados

NOTA: ¿Si creas una cuenta básica pongo un mensaje para que se apunten al torneo? ¿Sólo cuando creen un equipo personalizado?

*/









































	};
		function mostrarListadoCompeticionesBigDT(texto) {
			let temporada = document.querySelector('input[name="botonTemporada"]:checked') ? document.querySelector('input[name="botonTemporada"]:checked').value : 'undefined';

			document.getElementById("loaderCompeticiones").classList.add("loader");
			$.ajax({
				url: "php/listadoCompeticionesPersonalizadas.php",
				type: 'POST',
				data: {
					deporte: sessionStorage.getItem("Deporte"),
					temporada: temporada,
					ambito: 6,
					nombre: texto
				},
				success: function(res){
					document.getElementById("loaderCompeticiones").classList.remove("loader");
					const js= JSON.parse(res);

					let codigo = "";
					if (js == "0") {
						codigo = " No se encontraron Competiciones con ese nombre";
					}else{
						for (var i = 0; i < js.length; i++) {
							let colorEstado = "",
								parpadeo = "",
								labelBoton = "",
								pulsable = "pulsable";
							if (js[i] !== "0") {
								switch (js[i].Estado) {
								case "1":
									colorEstado = "parpadeo";
									parpadeo = "parpadeo";
									labelBoton = "Inscríbete";
									accionBoton = "onclick=\"sessionStorage.setItem('Campeonato_ID','"+js[i].ID_Campeonato+"'); sessionStorage.setItem('Campeonato_Nombre','"+js[i].Nombre+"'); sessionStorage.setItem('Campeonato_Participantes','"+js[i].Participantes+"'); sessionStorage.setItem('Campeonato_MaxParticipantes','"+js[i].MaxParticipantes+"'); sessionStorage.setItem('Campeonato_Estado','"+js[i].Estado+"'); sessionStorage.setItem('Campeonato_Escudo','"+js[i].Escudo_Organizadora+"'); sessionStorage.setItem('Campeonato_Seccion','"+js[i].Seccion+"'); ventanaDatos('torneo')\"";
									break;
								case "2":
									colorEstado = "acierto";
									labelBoton = "Accede";
									break;
								case "3":
									colorEstado = "error";
									labelBoton = "Finalizado";
									pulsable = "noOperativo";
									break;
								}
								codigo += " <div class='w100 h20 spaceAroundXY' style='background: var(--color-fondoIndex);margin-bottom: 1%;border-radius: 10px;'>";
								codigo += " 	<div class='h20 circuloImagenFoto "+colorEstado+"' style='aspect-ratio: 1 / 1'></div>";
								codigo += " 	<img class='w10 h70' src='img/Clubes/Clubes/"+js[i].Escudo+"' onerror=\"src='img/Clubes/Clubes/"+js[i].Escudo_Organizadora+"'\" alt='Escudo'/>";
								codigo += " 	<div class='w45 h60 centradoXY flexWrap'>";
								codigo += " 		<div class='w90'><strong>"+js[i].Nombre+"</strong></div>";
								codigo += " 		<div class='w90'><small class='color1'>"+js[i].Tipo+"</small></div>";
								codigo += "		</div>";
								codigo += " 	<img class='w5 h30' src='img/Menu/"+js[i].Seccion+".png' alt='Sección'>";
								codigo += " 	<div class='w10 centradoXY flexWrap'>";
								codigo += "			<small class='w100 centradoXY' style='color: var(--color-contraste)'>Participantes</small>";
								let participantes = js[i].Participantes == null ? "0" : js[i].Participantes;
								let maxParticipantes = js[i].MaxParticipantes == null ? "0" : js[i].MaxParticipantes;
								if (participantes == maxParticipantes) {
									if (js[i].Estado == "1") {
										parpadeo = "";
										labelBoton = "Completo";
										pulsable = "";
									}
								}else{
									codigo += "		<small>"+participantes+"</small>";
								}
								codigo += "			<strong class='w100 centradoXY color1'>"+maxParticipantes+"</strong>";
								codigo += "		</div>";
								codigo += " 	<div id='botonAccesoCompeticionBigDT"+js[i].ID_Campeonato+"' class='w12 h50 centradoXY flexWrap "+parpadeo+" "+pulsable+"' "+accionBoton+" ontouchstart=\"inicioPulsacion('botonAccesoCompeticionBigDT"+js[i].ID_Campeonato+"')\" ontouchend=\"finPulsacion('botonAccesoCompeticionBigDT"+js[i].ID_Campeonato+"')\" style='border: 2px solid var(--color-corporativo-rosa);border-radius: 15px;'>"+labelBoton+"</div>";
								codigo += " </div>";
							}
						}
					}
					document.getElementById("resultadosCompeticionesBigDT").innerHTML = codigo;
				},
				setTimeout: 10000,
				error: function() { mostrarListadoCompeticionesBigDT(texto) }
			});
		};

function prepararPantallaCompeticiones2(competicion,idCompeticion,seccion,escudo,escudoOrganizadora) {
	const deporte = sessionStorage.getItem("Deporte");
	// Tomar Idioma
	var textoIdioma = textoCompeticiones();
	var deporteLabel = textoDeportes(deporte);

	// Preparar código cuadro superior
	var codigoSuperior = versionBeta();		
	codigoSuperior += "	<img class='h20 w2' src='img/Menu/anterior.png' alt='Volver'>";
	codigoSuperior += "	<label onclick=\"pasarPantalla('menuCompeticiones2','menuCompeticiones')\">"+textoIdioma[0]+"</label>";
	codigoSuperior += "	<label class='botonMenuSuperior'>"+competicion+" · "+deporteLabel+"</label>";
	codigoSuperior += "	<img class='botonMenuSuperior logoBigDT' src='img/Menu/Logo_BigDT.png' onclick=\"pasarPantalla('menuCompeticiones2','menuIndex')\">";

	$("#cajaMenuSuperiorCompeticiones2").html(codigoSuperior);

	document.getElementById("loaderCompeticiones2").classList.add("loader");

	$.ajax({
		url: "php/datosCompeticion.php",
		type: 'POST',
		data: {
			idCompeticion: idCompeticion
		},
		success: function(res){
			const js= JSON.parse(res);

			document.getElementById("loaderCompeticiones2").classList.remove("loader");

			if (js.Fases !== "0") {
				var codigoCentral = "";
				codigoCentral += "		<div class='spaceAroundXY w100 h10'>";
				const escudoImg = escudo ? escudo : "x.png";
				codigoCentral += "			<img class='h100' src='img/Menu/Logos/"+escudoImg+"' onerror=\"this.src='img/Clubes/Organizadoras/"+escudoOrganizadora+"'\" alt='Logo Campeonato'>";
				codigoCentral += "			<select id='selectFase'>";
				for (var i = 0; i < js.Fases.length; i++) {
					codigoCentral += "			<option value='"+js.Fases[i].ID_Fase_Camp+"'>Fase:"+js.Fases[i].Fase+" Grupo:"+js.Fases[i].Grupo+"</option>";
				}
				codigoCentral += "			</select>";

				codigoCentral += "			<select id='selectJornada'>";
				codigoCentral += "			</select>";
				codigoCentral += "		</div>";

				codigoCentral += "		<div id='cuadroResultados' class='centradoXY flexWrap w100 h80'>";
				codigoCentral += "		</div>";
				
				$("#cajaMenuCentralCompeticiones2").html(codigoCentral);

				document.getElementById("selectFase").onchange = function() {mostrarJornadas(js, 1)};
				document.getElementById("selectJornada").onchange = function() {mostrarJornadas(js, document.getElementById("selectJornada").value)};
				mostrarNumJornadas(js);

				mostrarJornadas(js,1);
			}else{
				codigoCentral = "<div class='w100 h10 centradoXY'>Jornadas no disponibles para esta Competición</div>";
				$("#cajaMenuCentralCompeticiones2").html(codigoCentral);
			}
		},
		timeout: 10000,
		error: function() {prepararPantallaCompeticiones2(competicion,idCompeticion,seccion,escudo,escudoOrganizadora);}
	});
};
function mostrarNumJornadas(js) {
	var seleccionado = document.getElementById("selectFase").selectedIndex;
	var opciones = document.getElementById("selectFase").options;
	var numero = opciones[seleccionado].index;

	var codigoCentral = "";
	if (js.NumJornadas[numero][0] == "0") {
		codigoCentral += "					<option selected>Sin datos</option>";
	}else{
		for (var i = 0; i < js.NumJornadas[numero].length; i++) {
			codigoCentral += "				<option value='"+js.NumJornadas[numero][i].Jornada+"'>Jornada "+js.NumJornadas[numero][i].Jornada+"</option>";
		}
	}
	$("#selectJornada").html(codigoCentral);
};


function mostrarJornadas(jsJornadas,jornada) {
	var opciones = document.getElementById("selectFase").options;
	var seleccionado = document.getElementById("selectFase").selectedIndex;
	var idFaseCamp = jsJornadas.Fases[opciones[seleccionado].index].ID_Fase_Camp;

	mostrarNumJornadas(jsJornadas);
	
	document.getElementById("selectJornada").value = jornada; // Asegurar que está marcada la jornada correcta
	document.getElementById("loaderCompeticiones2").classList.add("loader");
	$.ajax({
		url: "php/jornadasCompeticion.php",
		type: 'POST',
		data: {
			idFaseCamp: idFaseCamp,
			jornada: jornada,
			temporada: jsJornadas.Temporadas[0].Temporada,
			idioma: localStorage.getItem("idioma")
		},
		success: function(res){
			const js= JSON.parse(res);

			document.getElementById("loaderCompeticiones2").classList.remove("loader");
			
			var codigoCentral = "";
			if (js !== "0") {
				for (var i = 0; i < js.length; i++) {
					codigoCentral += "		<div class='lineaCajaMenuCompeticiones h20 w100 centradoInlineXY'>";
					codigoCentral += "			<div class='h100 w15 centradoXY flexWrap'>";
					codigoCentral += "				<div class='h20 w100'></div>";
					codigoCentral += "				<label class='w100 h40 centradoXY'>"+js[i].Fecha+"</label>";
					codigoCentral += "				<label class='w100 h20 centradoXY'>"+js[i].Hora+"</label>";
					codigoCentral += "				<div class='h20 w100'></div>";
					codigoCentral += " 			</div>";
					codigoCentral += "			<div class='h100 w70 centradoInlineXY'>";
					codigoCentral += "				<div class='spaceAroundXY flexWrap w35 h100'>";
					codigoCentral += "					<img class='h95 w25 escudos' src='img/Clubes/Balonmano/Equipos/"+js[i].EscudoLocal+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
					codigoCentral += "					<div class='w70 nombreEquipo' style='text-align: right'>"+js[i].NombreLocal+"</div>";
					codigoCentral += "				</div>";
					codigoCentral += "				<div class='labelResultado centradoInlineXY w25'>";
					let claseParpadeo = js[i].Estado == "1" || js[i].Estado == "2" ? " parpadeo" : "";
					codigoCentral += "					<img class='w35 logoDirectoTV pulsable"+claseParpadeo+"' onclick=\"sessionStorage.setItem('escudoL', '"+js[i].EscudoLocal+"'); sessionStorage.setItem('escudoV', '"+js[i].EscudoVisitante+"'); sessionStorage.setItem('idFaseCamp', "+idFaseCamp+"); sessionStorage.setItem('jornada', "+jornada+"); pasarPantalla('menuCompeticiones2','menuDirectoTV', "+js[i].ID_Partido+")\" src='img/Captura/vivo.png' alt='Live'>";
					codigoCentral += "					<div id='labelResultadoLocal' class='centradoXY w40 textolocal'>"+js[i].GolesLocal+"</div>";
					codigoCentral += "					<div id='versus' class='centradoXY w20' style='color: var(--color-corporativo-morado)'>vs</div>";
					codigoCentral += "					<div id='labelResultadoVisitante' class='centradoXY w40 textovisitante'>"+js[i].GolesVisitante+"</div>";
					codigoCentral += "				</div>";
					codigoCentral += "				<div class='spaceAroundXY flexWrap w35 h100'>";
					codigoCentral += "					<div class='w70 nombreEquipo'>"+js[i].NombreVisitante+"</div>";
					codigoCentral += "					<img class='h95 w25 escudos' src='img/Clubes/Balonmano/Equipos/"+js[i].EscudoVisitante+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
					codigoCentral += "				</div>";
					codigoCentral += "			</div>";
					codigoCentral += "			<div class='h100 w15 centradoInlineXY flexWrap'>";
					codigoCentral += "				<button class='w40 h70 botonPartido' onclick=\"pasarPantalla('menuCompeticiones2','menuPartido', "+js[i].ID_Partido+")\" ontouchstart=\"inicioPulsacion('botonPartido')\" ontouchend=\"finPulsacion('botonPartido')\">Previa</button>";
					switch (js[i].Estado) {
						case "0":
							codigoCentral += "		<button class='w40 h70 botonPartido centradoXY flexWrap' onclick=\"\" ontouchstart=\"inicioPulsacion('botonPartido')\" ontouchend=\"finPulsacion('botonPartido')\">Sin<br>Empezar</button>";
							break;
						case "1":
						case "2":
							codigoCentral += "		<button class='w40 h70 botonPartido parpadeo' onclick=\"\" ontouchstart=\"inicioPulsacion('botonPartido')\" ontouchend=\"finPulsacion('botonPartido')\">Directo</button>";
							break;
						case "3":
							codigoCentral += "		<button class='w40 h70 botonPartido centradoXY flexWrap' onclick=\"\" ontouchstart=\"inicioPulsacion('botonPartido')\" ontouchend=\"finPulsacion('botonPartido')\"><img class='h90' src='img/Menu/informe.png' alt='Informe'></button>";
							break;
					}
					codigoCentral += "			</div>";
					codigoCentral += "		</div>";
				}
			}else{
				codigoCentral += "			<div class='h20 w100 centradoXY'>Listado de partidos no disponible</div>";
			}
			$("#cuadroResultados").html(codigoCentral);
		},
		timeout: 10000,
		error: function() {mostrarJornadas(jsJornadas,jornada);}
	});
};