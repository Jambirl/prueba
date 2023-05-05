// Funciones para menú Edición
function prepararPantallaEdicion() {
	const textoIdioma = textoEdicion(); // Tomar Idioma

	// Preparar código cuadro superior
	var superior = 		versionBeta();
	superior += "		<img class='h15 botonVolverMenuSuperior' src='img/Menu/anterior.png' alt='Volver'>";
	superior += "		<label onclick=\"pasarPantalla('menuEdicion','menuIndex')\">"+textoMenuSuperior()+"</label>";
	superior += "		<label class='botonMenuSuperior'>"+textoIdioma[1]+"</label>";
	superior += "		<img class='botonMenuSuperior logoBigDT' src='img/Menu/Logo_BigDT.png' onclick=\"pasarPantalla('menuEdicion','menuIndex')\">";

	// Abrir menu general por defecto
	$("#menuEdicionGeneral").removeClass("invisible");
	$("#menuEdicionNuevoClub").addClass("invisible");
	$("#menuEdicionNuevoEquipo").addClass("invisible");
	$("#menuEdicionNuevoTorneo").addClass("invisible");
	$("#menuEdicionNuevoJugador").addClass("invisible");

	// Preparar código cuadro central
	publicarValoresBusqueda("Clubes");

	// Publicar códigos
	$("#cajaMenuSuperiorEdicion").html(superior);

	// Mostrar botones operativos por suscripcion
	if (estadoUsuarioPro() == "pro") {
		document.getElementById("botonNuevoClub").classList.remove("noOperativo");
		document.getElementById("botonNuevoEquipo").classList.remove("noOperativo");
		/*

Meter aquí el tema del idioma para el texto dentro de los botones

		*/
	}else{
		document.getElementById("botonNuevoClub").classList.add("noOperativo");
		document.getElementById("botonNuevoEquipo").classList.add("noOperativo");
		/*

Meter aquí el tema del idioma para el texto dentro de los botones

		*/
	}
};

function publicarValoresBusqueda(parametro) {
	document.getElementById("loaderMenuGeneralDatos").classList.add("loader");
	switch(parametro) {
		case "Clubes":
			$.ajax({
				url: "php/listadosEdicionClubes.php",
				type: "POST",

				success: function(res){
					document.getElementById("loaderMenuGeneralDatos").classList.remove("loader");
					var js = JSON.parse(res);

					var datos = "";
					datos += "	<div class='w100 h50 spaceAroundXY'>";
					datos += "		<input id='nombreInputClub' class='w30' type='text' oninput=\"listadoClubes()\" placeholder='Buscar por nombre...' style='background:none; border:none; border-bottom: 2px solid var(--color-corporativo-morado); border-radius: 10px; padding-left: 2%;'>";
					datos += "		<select name='fundacionClub' id='fundacionClub' class='w20' onchange='listadoClubes()'>";
					datos += "			<option default>Todos</option>";
					for (var i = js.Fundacion.length - 1; i >= 0; i--) {
						datos += "		<option value='"+js.Fundacion[i].Fundacion+"'>"+js.Fundacion[i].Fundacion+"</option>";
					}
					datos += "		</select>";
					datos += "		<select name='paisClub' id='paisClub' class='w20' onchange='listadoClubes()'>";
					datos += "			<option default>Todos</option>";
					for (var i = 0; i < js.Paises.length; i++) {
						datos += "		<option value='"+js.Paises[i].Pais+"'>"+nombrePais(js.Paises[i].Pais)+"</option>";
					}
					datos += "		</select>";
					datos += "	</div>";

					datos += "	<div class='w100 h50 spaceAroundXY'>";
					datos += "		<select name='comunidadClub' id='comunidadClub' class='w25' onchange='listadoClubes()'>";
					datos += "			<option default>Todas</option>";
					for (var i = 0; i < js.Comunidades.length; i++) {
						datos += "		<option value='"+js.Comunidades[i].Comunidad+"'>"+js.Comunidades[i].Comunidad+"</option>";
					}
					datos += "		</select>";

					datos += "		<select name='provinciaClub' id='provinciaClub' class='w25' onchange='listadoClubes()'>";
					datos += "			<option default>Todas</option>";
					for (var i = 0; i < js.Provincias.length; i++) {
						datos += "		<option value='"+js.Provincias[i].Provincia+"'>"+js.Provincias[i].Provincia+"</option>";
					}
					datos += "		</select>";

					datos += "		<select name='localidadClub' id='localidadClub' class='w25' onchange='listadoClubes()'>";
					datos += "			<option default>Todas</option>";
					for (var i = 0; i < js.Localidades.length; i++) {
						datos += "		<option value='"+js.Localidades[i].Localidad+"'>"+js.Localidades[i].Localidad+"</option>";
					}
					datos += "		</select>";
					datos += "	</div>";
					document.getElementById("cuadroBotonesSuperiorClubes").innerHTML = datos;

					listadoClubes("Todos"); // Publicar resultados de búsquedas
					eliminarZoom();
				},
				timeout: 10000,
				error: function() {publicarValoresBusqueda(parametro);}
			});
			break;

		case "Equipos":
			$.ajax({
				url: "php/listadosEdicionEquipos.php",
				type: "POST",

				success: function(res){
					document.getElementById("loaderMenuGeneralDatos").classList.remove("loader");
					var js = JSON.parse(res);

					var datos = "";
					datos += "	<div class='w100 h20 spaceAroundXY'>";
					datos += "	</div>";
					datos += "	<div class='w100 h30 spaceAroundXY'>";
					datos += "		<input id='nombreInputEquipo' class='w25' type='text' oninput=\"datosParticulares('0')\" placeholder='Buscar por nombre...' style='background:none; border:none; border-bottom: 2px solid var(--color-corporativo-morado); border-radius: 10px; padding-left: 2%;'>";
					datos += "		<select name='clubEquipo' id='clubEquipo' class='w35 h100' onchange=\"datosParticulares('0')\">>";
					datos += "			<option value='0' default>Club...</option>";
					for (var i = 0; i < js.Clubes.length; i++) {
							datos += "	<option value='"+js.Clubes[i].ID_Club+"'>"+js.Clubes[i].Nombre+"</option>";
					}
					datos += "		</select>";
					datos += "		<select name='paisEquipo' id='paisEquipo' class='w20 h100' onchange=\"datosParticulares('0')\">>";
					datos += "			<option value='0' default>Pais...</option>";
					for (var i = 0; i < js.Paises.length; i++) {
							datos += "	<option value='"+js.Paises[i].Pais+"'>"+nombrePais(js.Paises[i].Pais)+"</option>";
					}
					datos += "		</select>";
					datos += "		<select name='seccionEquipo' id='seccionEquipo' class='w15 h100' onchange=\"datosParticulares('0')\">";
					datos += "			<option value='0' default>Sección...</option>";
					datos += "			<option value='1'>Masculina</option>";
					datos += "			<option value='2'>Femenina</option>";
					datos += "			<option value='3'>Mixta</option>";
					datos += "		</select>";
					datos += "	</div>";

					datos += "	<div class='w100 h30 spaceAroundXY'>";
					datos += "		<select name='deporteEquipo' id='deporteEquipo' class='w25 h100' onchange=\"datosParticulares('0')\">";
					datos += "			<option value='0' default>Deporte...</option>";
					datos += "			<option value='1'>Balonmano</option>";
					datos += "			<option value='2'>Baloncesto</option>";
					datos += "			<option value='3'>Futsal</option>";
					datos += "		</select>";

					datos += "		<select name='temporadaEquipo' id='temporadaEquipo' class='w25 h100' onchange=\"datosParticulares()\">";
					datos += "		</select>";

					datos += "		<select name='categoriaEquipo' id='categoriaEquipo' class='w25 h100' onchange=\"datosParticulares()\">";
					datos += "		</select>";

					datos += "		<select name='competicionEquipo' id='competicionEquipo' class='w20 h100' onchange=\"datosParticulares()\">";
					datos += "		</select>";
					datos += "	</div>";

					document.getElementById("cuadroBotonesSuperiorEquipos").innerHTML = datos;

					listadoEquipos("Todos"); // Publicar resultados de búsquedas
					eliminarZoom();
				},
				timeout: 10000,
				error: function() {publicarValoresBusqueda(parametro);}
			});
			break;

		case "Torneos":
			$.ajax({
				url: "php/listadosEdicionEquipos.php",
				type: "POST",

				success: function(res){
					document.getElementById("loaderMenuGeneralDatos").classList.remove("loader");
					var js = JSON.parse(res);

					var datos = "";
					datos += "	<select name='edicionTorneoNombre' id='edicionTorneoNombre' class='w25 h30' onchange=\"datosParticulares()\">";
					datos += "		<option value='0' default>Deporte</option>";
					datos += "		<option value='1'>Balonmano</option>";
					datos += "		<option value='2'>Baloncesto</option>";
					datos += "		<option value='3'>Futsal</option>";
					datos += "	</select>";
					datos += "	<select name='edicionTorneoAmbito' id='edicionTorneoAmbito' class='w65 h30' onchange=\"datosParticulares()\">>";
					datos += "		<option value='0' default>Ámbito</option>";
					datos += "		<option value='1'>Internacional</option>";
					datos += "		<option value='2'>Nacional</option>";
					datos += "		<option value='3'>Autonómico</option>";
					datos += "		<option value='4'>Local</option>";
					datos += "	</select>";

					datos += "	<select name='edicionTorneoTipo' id='edicionTorneoTipo' class='w30 h30' onchange=\"datosParticulares()\">";
					datos += "		<option value='0' default>Tipo</option>";
					datos += "		<option value='1'>Liga</option>";
					datos += "		<option value='2'>Eliminatoria</option>";
					datos += "		<option value='3'>Liga + Ascensos&Descensos</option>";
					datos += "		<option value='4'>Liga + Playoff</option>";
					datos += "		<option value='5'>Liga + Eliminatoria</option>";
					datos += "	</select>";

					datos += "	<select name='edicionTorneoSeccion' id='edicionTorneoSeccion' class='w30 h30' onchange=\"datosParticulares()\">";
					datos += "		<option value='0' default>Sección</option>";
					datos += "		<option value='1'>Masculina</option>";
					datos += "		<option value='2'>Femenina</option>";
					datos += "		<option value='3'>Mixta</option>";
					datos += "	</select>";


					datos += "	<select name='edicionTorneoCategoria' id='edicionTorneoCategoria' class='w25 h30' onchange=\"datosParticulares()\">";
					datos += "	</select>";

					datos += "	<select name='edicionTorneoTemporada' id='edicionTorneoTemporada' class='w20 h30' onchange=\"datosParticulares()\">";
					datos += "	</select>";

					$("#cuadroBotonesSuperiorTorneos").html(datos);
					$("#cuadroBotonesSuperiorTorneos").show(datos);

					listadoTorneos("Todos"); // Publicar resultados de búsquedas
				},
				timeout: 10000,
				error: function() {publicarValoresBusqueda(parametro);}
			});
			break;

		case "Jugadores":
			$.ajax({
				url: "php/listadosEdicionJugadores.php",
				type: "POST",

				success: function(res){
					document.getElementById("loaderMenuGeneralDatos").classList.remove("loader");
					var js = JSON.parse(res);

					var datos = "";
					datos += "	<input id='nombreInputJugador' class='w30' type='text' oninput=\"listadoJugadores()\" placeholder='Buscar por nombre...' style='background:none; border:none; border-bottom: 2px solid var(--color-corporativo-morado); border-radius: 10px; padding-left: 2%;'>";
					datos += "	<select name='paisJugador' id='paisJugador' class='w20 h30' onchange='listadoJugadores()'>";
					datos += "		<option default>Todos</option>";
					for (var i = 0; i < js.Paises.length; i++) {
						if (js.Paises[i].Pais !== "") {
							datos += "	<option value='"+js.Paises[i].Pais+"'>"+nombrePais(js.Paises[i].Pais)+"</option>";
						}
					}
					datos += "	</select>";

					datos += "	<select name='seccionJugador' id='seccionJugador' class='w15 h30' onchange='listadoJugadores()'>";
					datos += "		<option default>Todas</option>";
					datos += "		<option value='1'>Masculina</option>";
					datos += "		<option value='2'>Femenina</option>";
					datos += "		<option value='3'>Mixta</option>";
					datos += "	</select>";

					datos += "	<select name='estadoJugador' id='estadoJugador' class='w15 h30' onchange='listadoJugadores()'>";
					datos += "		<option default>Todas</option>";
					datos += "		<option value='1'>En Activo</option>";
					datos += "		<option value='2'>Retirado</option>";
					datos += "	</select>";

					datos += "	<select name='edadJugador' id='edadJugador' class='w10 h30' onchange='listadoJugadores()'>";
					datos += "		<option default>Todas</option>";
					for (var i = 0; i < js.Edades.length; i++) {
						datos += "	<option value='"+js.Edades[i].Edad+"'>"+js.Edades[i].Edad+"</option>";
					}
					datos += "	</select>";

					document.getElementById("cuadroBotonesSuperiorJugadores").innerHTML = datos;

					listadoJugadores("Todos"); // Publicar resultados de búsquedas
					eliminarZoom();
				},
				timeout: 10000,
				error: function() {publicarValoresBusqueda(parametro);}
			});
			break;
		case "Tecnicos":
			$.ajax({
				url: "php/listadosEdicionTecnicos.php",
				type: "POST",

				success: function(res){
					document.getElementById("loaderMenuGeneralDatos").classList.remove("loader");
					var js = JSON.parse(res);

					var datos = "";
					datos += "	<input id='nombreInputTecnico' class='w30' type='text' oninput=\"listadoTecnicos()\" placeholder='Buscar por nombre...' style='background:none; border:none; border-bottom: 2px solid var(--color-corporativo-morado); border-radius: 10px; padding-left: 2%;'>";
					datos += "	<select name='paisTecnico' id='paisTecnico' class='w20 h30' onchange='listadoTecnicos()'>";
					datos += "		<option default>Todos</option>";
					for (var i = 0; i < js.Paises.length; i++) {
						if (js.Paises[i].Pais !== "") {
							datos += "	<option value='"+js.Paises[i].Pais+"'>"+nombrePais(js.Paises[i].Pais)+"</option>";
						}
					}
					datos += "	</select>";

					datos += "	<select name='puestoTecnico' id='puestoTecnico' class='w15 h30' onchange='listadoTecnicos()'>";
					datos += "		<option default>Todos</option>";
					datos += "		<option value='1'>1er Entrenador</option>";
					datos += "		<option value='2'>Ayudante</option>";
					datos += "		<option value='3'>Staff Médico</option>";
					datos += "		<option value='4'>Oficial</option>";
					datos += "		<option value='5'>Staff Adicional</option>";
					datos += "	</select>";

					datos += "	<select name='estadoTecnico' id='estadoTecnico' class='w15 h30' onchange='listadoTecnicos()'>";
					datos += "		<option default>Todas</option>";
					datos += "		<option value='1'>En Activo</option>";
					datos += "		<option value='2'>Retirado</option>";
					datos += "	</select>";

					datos += "	<select name='edadTecnico' id='edadTecnico' class='w10 h30' onchange='listadoTecnicos()'>";
					datos += "		<option default>Todas</option>";
					for (var i = 0; i < js.Edades.length; i++) {
						datos += "	<option value='"+js.Edades[i].Edad+"'>"+js.Edades[i].Edad+"</option>";
					}
					datos += "	</select>";

					document.getElementById("cuadroBotonesSuperiorTecnicos").innerHTML = datos;

					listadoTecnicos("Todos"); // Publicar resultados de búsquedas
					eliminarZoom();
				},
				timeout: 10000,
				error: function() {publicarValoresBusqueda(parametro);}
			});
			break;
	}
};
function seleccionarEdicion(boton) {
	var selector = "#botonBuscar"+boton;
	var buscar = "#menuBuscar"+boton;
	var datos = "#menuDatos"+boton;
	// Ocultar
	$("#botonBuscarClubes").removeClass("botonPulsado");
	$("#botonBuscarEquipos").removeClass("botonPulsado");
	$("#botonBuscarTorneos").removeClass("botonPulsado");
	$("#botonBuscarJugadores").removeClass("botonPulsado");
	$("#botonBuscarTecnicos").removeClass("botonPulsado");
	$("#menuBuscarClubes").addClass("invisible");
	$("#menuBuscarEquipos").addClass("invisible");
	$("#menuBuscarTorneos").addClass("invisible");
	$("#menuBuscarJugadores").addClass("invisible");
	$("#menuBuscarTecnicos").addClass("invisible");
	$("#menuDatosClubes").addClass("invisible");
	$("#menuDatosEquipos").addClass("invisible");
	$("#menuDatosTorneos").addClass("invisible");
	$("#menuDatosJugadores").addClass("invisible");
	$("#menuDatosTecnicos").addClass("invisible");

	publicarValoresBusqueda(boton);

	// Mostrar
	$(selector).addClass("botonPulsado");
	$(buscar).removeClass("invisible");
	$(datos).removeClass("invisible");
};
function nuevoElemento(elemento) {
	// Quitar página actual
	$("#menuEdicionGeneral").addClass("invisible");

	// Poner pantallas por defecto
	var arrayPantallas = ["#pantallaInicio", "#pantallaCompeticion", "#pantallaEquipos", "#pantallaResumen"];
	for (var i = 0; i < arrayPantallas.length; i++) {
		$(arrayPantallas[i]).removeClass("pantallaIzquierda");
		$(arrayPantallas[i]).removeClass("pantallaCentroIzq");
		$(arrayPantallas[i]).removeClass("pantallaCentroDer");
		$(arrayPantallas[i]).removeClass("pantallaDerecha");
	}

	// Crear página nueva
	crearPaginaNuevoElemento(elemento);

	// Mostrar página de nuevo
	var nuevo = "#menuEdicionNuevo"+elemento;
	$(nuevo).removeClass("invisible");
};
function crearPaginaNuevoElemento(elemento) {
	switch(elemento){
		case "Club":
			var datos = "";
			datos += "	<div id='pantallaInicio' class='marcoEdicion pantalla1 w100 h100'>";
			datos += "		<div id='anteriorNivel' class='w10 h100' onclick=\"cancelarEdicion('Club')\" ontouchstart=\"inicioPulsacion('anteriorNivel')\" ontouchend=\"finPulsacion('anteriorNivel')\">";
			datos += "			<img class='w70' src='img/Menu/boton_salir.png'>";
			datos += "		</div>";
			datos += "		<div class='w80 h95 pantallaEdicion'>";
			datos += "			<div class='w100 h80'>";
			datos += "				<img class='logoEdicion' src='img/Menu/sede.png'>";
			datos += "				<div class='w100 h30'>";
			datos += "				</div>";
			datos += "				<div class='w100 h70 centradoXY flexWrap'>";
			datos += "					<div class='w80 h20 centradoInlineXY'>";
			datos += "						<label class='w20' for='nombre'>Nombre: </label> <input id='nombreClub' class='w80 inputNombre' type='text' name='nombre' required>";
			datos += "					</div>";
			datos += "					<div class='w80 h20 centradoInlineXY'>";
			datos += "						<label class='w20' for='presidente'>Presidente: </label> <input id='presidenteClub' class='w40 inputNombre' type='text' name='presidente' value=''>";
			datos += "						<label class='w28 centradoXY' for='fechaFundacionClub'>Fundación:</label>";
			datos += "						<select class='w12' name='fechaFundacionClub' id='fechaFundacionClub'>";
				// Obtener listado de años desde 1850 hasta hoy
				var hoy = new Date();
				var año = hoy.getFullYear();
				for (var i = año; i >= 1850; i--) {
					datos += "					<option value='"+i+"'>"+i+"</option>";
				}
			datos += "						</select>";
			datos += "					</div>";
			datos += "					<div class='w80 h20 spaceAroundXY flexWrap'>";
			datos += "						<select class='w40' name='pais' id='paisNuevoClub' onchange=\"mostrarListado('Comunidad')\">";
			datos += "							<option value='es'>España</option>";
			datos += "						</select>";
			datos += "						<select class='w50' name='comunidad' id='comunidad' onchange=\"mostrarListado('Provincia',this.value)\">";
			datos += "						</select>";
			datos += "						<select class='w40' name='provincia' id='provincia' onchange=\"mostrarListado('Localidad',this.value)\">";
			datos += "							<option>Espera...</option>";
			datos += "						</select>";
			datos += "						<select class='w50' name='localidad' id='localidad'>";
			datos += "							<option>Espera...</option>";
			datos += "						</select>";
			datos += "					</div>";
			datos += "					<div class='w80 h20 spaceAroundXY'>";
			datos += "						<img id='logoPais' class='h90' src='img/Idiomas/idioma.png' onerror=\"this.src='img/Idiomas/idioma.png'\" alt='Pais'>";
			datos += "						<label class='w20 centradoXY' for='escudo'>Escudo: </label>";
			datos += "						<input id='archivoEscudo' class='w60' type='file' name='escudo' accept='image/x-png,image/jpeg'>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "			</div>";
			datos += "			<div class='w100 h20 cuadroInfo centradoXY'>";
			datos += "				<p class='w90'> <img src='img/Menu/MVP.png'> Para crear un nuevo Club sólo debes indicar aspectos básicos tales como el nombre, la fecha de fundación, la localidad a la que pertenece o el presidente actual. Si añades el escudo, la ficha se verá mucho más completa.</p>";
			datos += "			</div>";
			datos += "		</div>";
			datos += "		<div id='siguienteNivel' class='w10 h100' onclick=\"guardarNuevoClub()\" ontouchstart=\"inicioPulsacion('siguienteNivel')\" ontouchend=\"finPulsacion('siguienteNivel')\">";
			datos += "			<div id='botonClub' class='w100 botonEditar'></div>";
			datos += "		</div>";
			datos += "	</div>";
			// Publicar
			$("#menuEdicionNuevoClub").html(datos);

			mostrarListado("Pais");
			eliminarZoom();

			if (document.getElementById("paisNuevoClub").value == "es") {
				mostrarListado('Comunidad');
			}else{
				document.getElementById("comunidad").innerHTML = "<option>Espera...</option>";
			}
			break;

		case "Equipo":
			$.ajax({
				url: "php/listadoClubes.php",
				type: 'POST',
				data: {
					fundacion: "Todos",
					pais : "Todos",
					comunidad: "Todas",
					provincia: "Todas",
					localidad: "Todas"
				},
				success: function(res){
					var js = JSON.parse(res);

					// Crear datos
					//Página 1
					var datos = "";
					datos += "		<div id='pantallaInicio' class='marcoEdicion pantalla1 w100 h100 flexWrap'>";
					datos += "			<div id='anteriorNivel' class='w10 h100' onclick=\"cancelarEdicion('Equipo')\" ontouchstart=\"inicioPulsacion('anteriorNivel')\" ontouchend=\"finPulsacion('anteriorNivel')\">";
					datos += "				<img class='w70' src='img/Menu/boton_salir.png'>";
					datos += "			</div>";
					datos += "			<div class='w80 h95 pantallaEdicion'>";
					datos += "				<div class='w100 h80 centradoXY flexWrap'>";
					datos += "					<img class='logoEdicion' src='img/Menu/edicionClub.png'>";
					datos += "					<div class='h25 w100'></div>";
					datos += "					<div class='w70 h15 spaceAroundXY'>";
					datos += "						<label for='clubEq' class='w30'>Club: </label>";
					datos += "						<select class='w60 h60' name='clubEq' id='clubEq' required>";
					datos += "							<option value='0' default>Club</option>";
					for (var i = 0; i < js[0].length; i++) {
						var desaparecido = js[0][i].Desaparicion !== "0" ? "(Desaparecido)" : "";
						datos += "						<option value='"+js[0][i].ID_Club+"' label='"+js[0][i].Nombre+" ("+nombrePais(js[0][i].Pais)+") "+desaparecido+"'></option>";
					}
					datos += "						</select>";
					datos += "					</div>";
					datos += "					<div class='w70 h15 spaceAroundXY'>";
					datos += "						<label for='deporteEq' class='w30'>Deporte: </label>";
					datos += "						<select class='w60 h60' name='deporteEq' id='deporteEq' required>";
					datos += "							<option value='0' default>Deporte</option>";
					datos += "							<option value='1'>Balonmano</option>";
					datos += "							<option value='2'>Baloncesto</option>";
					datos += "							<option value='3'>Fútbol Sala</option>";
					datos += "						</select>";
					datos += "					</div>";
					datos += "					<div class='w70 h15 spaceAroundXY'>";
					datos += "						<label for='seccionEq' class='w30'>Sección: </label>";
					datos += "						<select class='w60 h60' name='seccionEq' id='seccionEq' required>";
					datos += "							<option value='0' default>Sección</option>";
					datos += "							<option value='1'>Masculina</option>";
					datos += "							<option value='2'>Femenina</option>";
					datos += "							<option value='3'>Mixta</option>";
					datos += "						</select>";
					datos += "					</div>";
					datos += "					<div class='w70 h15 spaceAroundXY'>";
					datos += "						<label for='categoriaEq' class='w30'>Categoría: </label>";
					datos += "						<select class='w60 h60' name='categoriaEq' id='categoriaEq' required>";
					datos += "							<option value='0' default>Categoría</option>";
					datos += "							<optgroup label='Categorías Principales'>";
					datos += "								<option value='1'>Primer Equipo</option>";
					datos += "								<option value='2'>Segundo Equipo</option>";
					datos += "							</optgroup>";
					datos += "							<optgroup label='Categorías Especiales'>";
					datos += "								<option value='3'>Equipo Senior</option>";
					datos += "								<option value='4'>Deporte Adaptado</option>";
					datos += "							</optgroup>";
					datos += "							<optgroup label='Categorías Inferiores'>";
					datos += "								<option value='5'>Juvenil</option>";
					datos += "								<option value='6'>Cadete</option>";
					datos += "								<option value='7'>Infantil</option>";
					datos += "								<option value='8'>Alevín</option>";
					datos += "								<option value='9'>Benjamín</option>";
					datos += "								<option value='10'>Pre Benjamín</option>";
					datos += "							</optgroup>";
					datos += "						</select>";
					datos += "					</div>";
					datos += "					<div class='h15 w100'></div>";
					datos += "				</div>";
					datos += "				<div id='mensajePantallaInicio' class='w100 h20 cuadroInfo centradoXY'><p class='w90'> <img src='img/Menu/MVP.png'> Empieza la creación de un nuevo Equipo eligiendo aspectos básicos como el deporte, la sección y la categoría a la que pertenece.</p></div>";
					datos += "			</div>";

					datos += "			<div id='siguienteNivel' class='w10 h100'  ontouchstart=\"inicioPulsacion('siguienteNivel')\" ontouchend=\"finPulsacion('siguienteNivel')\">";
					datos += "				<img class='w70' src='img/Menu/siguiente.png'>";
					datos += "			</div>";
					datos += "		</div>";

					//Página 2
					datos += "		<div id='pantallaEquipos' class='marcoEdicion pantalla2 w100 h100 invisible'>";
					datos += "		</div>";

					// Publicar
					$("#menuEdicionNuevoEquipo").html(datos);

					document.getElementById("siguienteNivel").onclick = function() {comprobarDatos('equipo',document.getElementById('clubEq').value, document.getElementById('deporteEq').value, document.getElementById('seccionEq').value, document.getElementById('categoriaEq').value)};
				}
			});
			break;

		case "EquipoPersonalizado":
			//Página 1
			var datos = "";
			datos += "		<div id='pantallaInicio' class='marcoEdicion pantalla1 w100 h100 flexWrap'>";
			datos += "			<div id='anteriorNivel' class='w10 h100' onclick=\"cancelarEdicion('Equipo')\" ontouchstart=\"inicioPulsacion('anteriorNivel')\" ontouchend=\"finPulsacion('anteriorNivel')\">";
			datos += "				<img id='imgMenuAnterior' class='w70' src='img/Menu/boton_salir.png'>";
			datos += "			</div>";
			datos += "			<div class='w80 h95 pantallaEdicion'>";
			datos += "				<div class='w100 h80 centradoXY flexWrap'>";
			datos += "					<img class='logoEdicion' src='img/Menu/edicionClub.png'>";
			datos += "					<div id='filaVaciaEdicion' class='w100 h40'></div>";
			datos += "					<form id='formularioEscudoEdicion' class='w15 h60 spaceAroundXY flexWrap'>";
			datos += "						<img id='imgEscudoEdicion' class='h50 w65' src='img/Clubes/Clubes/defecto.png' alt='escudo' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
			datos += "						<label for='archivoEscudoEdicion' class='h30 w40 labelEscudo pulsable'></label>";
			datos += "						<input id='archivoEscudoEdicion' type='file' name='archivoEscudoEdicion' class='h50 w7 inputFile' accept='image/x-png,image/jpeg' onchange=\"cambiarEscudo(event,0);\">";
			datos += "						<div class='w100 h20'></div>";
			datos += "					</form>";
			datos += "					<div id='cajaDatosEdicionEqP' class='w80 h60 spaceAroundXY flexWrap'>";
			datos += "						<div class='w80 h15 spaceAroundXY'>";
			datos += "							<label for='nombreEq' class='w30'>Nombre: </label>";
			datos += "							<input id='nombreEq' type='text' class='w60' maxlength='50' placeholder='Introducir nombre...'>";
			datos += "						</div>";
			datos += "						<div class='w80 h15 spaceAroundXY'>";
			datos += "							<label for='deporteEq' class='w30'>Deporte: </label>";
			datos += "							<select class='w60 h60' name='deporteEq' id='deporteEq' required>";
			datos += "								<option value='0' default>Deporte</option>";
			datos += "								<option value='1'>Balonmano</option>";
			datos += "								<option value='2'>Baloncesto</option>";
			datos += "								<option value='3'>Fútbol Sala</option>";
			datos += "							</select>";
			datos += "						</div>";
			datos += "						<div class='w80 h15 spaceAroundXY'>";
			datos += "							<label for='seccionEq' class='w30'>Sección: </label>";
			datos += "							<select class='w60 h60' name='seccionEq' id='seccionEq' required>";
			datos += "								<option value='0' default>Sección</option>";
			datos += "								<option value='1'>Masculina</option>";
			datos += "								<option value='2'>Femenina</option>";
			datos += "								<option value='3'>Mixta</option>";
			datos += "							</select>";
			datos += "						</div>";
			datos += "						<div class='w80 h15 spaceAroundXY'>";
			datos += "							<label for='categoriaEq' class='w30'>Categoría: </label>";
			datos += "							<select class='w60 h60' name='categoriaEq' id='categoriaEq' required>";
			datos += "								<option value='0' default>Categoría</option>";
			datos += "								<optgroup label='Categorías Principales'>";
			datos += "									<option value='1'>Primer Equipo</option>";
			datos += "									<option value='2'>Segundo Equipo</option>";
			datos += "								</optgroup>";
			datos += "								<optgroup label='Categorías Especiales'>";
			datos += "									<option value='3'>Equipo Senior</option>";
			datos += "									<option value='4'>Deporte Adaptado</option>";
			datos += "								</optgroup>";
			datos += "								<optgroup label='Categorías Inferiores'>";
			datos += "									<option value='5'>Juvenil</option>";
			datos += "									<option value='6'>Cadete</option>";
			datos += "									<option value='7'>Infantil</option>";
			datos += "									<option value='8'>Alevín</option>";
			datos += "									<option value='9'>Benjamín</option>";
			datos += "									<option value='10'>Pre Benjamín</option>";
			datos += "								</optgroup>";
			datos += "							</select>";
			datos += "						</div>";
			datos += "						<div class='w80 h15 spaceAroundXY'>";
			datos += "							<label for='pabellonEq' class='w30'>Pabellón: </label>";
			datos += "							<input id='pabellonEq' type='text' class='w60' maxlength='50' placeholder='Introducir nombre pabellón...'>";
			datos += "						</div>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "				<div id='mensajePantallaInicio' class='w100 h20 cuadroInfo centradoXY'><p class='w90'> <img src='img/Menu/MVP.png'> Para crear un nuevo Equipo Personalizado indica simplemente el nombre, el escudo, el deporte, la sección o la categoría a la que pertenece.</p></div>";
			datos += "			</div>";

			datos += "			<div id='guardarNuevoEqPersonalizado' class='w10 h100 centradoXY' ontouchstart=\"inicioPulsacion('guardarNuevoEqPersonalizado')\" ontouchend=\"finPulsacion('guardarNuevoEqPersonalizado')\">";
			datos += "				<img id='imgGuardarEqPersonalizado' class='w60' src='img/Menu/guardar.png'>";
			datos += "			</div>";
			datos += "		</div>";

			//Página 2
			datos += "		<div id='pantallaEquipos' class='marcoEdicion pantalla2 w100 h100 invisible'>";
			datos += "		</div>";

			// Publicar
			$("#menuEdicionNuevoEquipo").html(datos);
			document.getElementById("menuEdicionNuevoEquipo").classList.remove("invisible");

			document.getElementById("guardarNuevoEqPersonalizado").onclick = function() {comprobarDatos('equipoBasico',document.getElementById('nombreEq').value, document.getElementById('deporteEq').value, document.getElementById('seccionEq').value, document.getElementById('categoriaEq').value, document.getElementById('pabellonEq').value)};
			eliminarZoom();
			break;

		case "Torneo":
			// Pagina 1
			var datos1 = "";
			datos1 += "		<div id='pantallaNuevoTorneo1' class='marcoEdicion pantalla1 w100 h100'>";
			datos1 += "			<div id='anteriorNivel' class='w10 h100' onclick=\"cancelarEdicion('Torneo')\" ontouchstart=\"inicioPulsacion('anteriorNivel')\" ontouchend=\"finPulsacion('anteriorNivel')\">";
			datos1 += "				<img class='w70' src='img/Menu/boton_salir.png'>";
			datos1 += "			</div>";
			datos1 += "			<div class='w80 h95 pantallaEdicion'>";
			datos1 += "				<div class='w100 h80 spaceAroundXY'>";
			datos1 += "					<img class='logoEdicion' src='img/Menu/Clasificaciones.png'>";
			datos1 += "					<div class='w100 h80 centradoXY flexWrap'>";
			datos1 += "						<div class='w80 h80 spaceAroundXY'>";
			datos1 += "							<div id='botonNCampeonato' class='botonTorneo centradoXY flexWrap w40 h60' onclick=\"cookiesDefecto(); desplazamientoEdicion(1,'pantalla1', 'pantalla2A')\" ontouchstart=\"inicioPulsacion('botonNCampeonato')\" ontouchend=\"finPulsacion('botonNCampeonato')\">Crear/Editar<br>Nueva Competicion<br><img class='h50' src='img/Publicidad/Jambitec.png' alt='publicidad'></div>"; //////////////////////////// PUBLICIDAD
			datos1 += "							<div id='botonNTemporada' class='botonTorneo centradoXY flexWrap w40 h60' onclick=\"desplazamientoEdicion(1,'pantalla1', 'pantalla2B')\" ontouchstart=\"inicioPulsacion('botonNTemporada')\" ontouchend=\"finPulsacion('botonNTemporada')\">Añadir<br>Nueva Temporada<br><img class='h50' src='img/Publicidad/Laura Deldom.png' alt='publicidad'></div>"; //////////////////////////// PUBLICIDAD
			datos1 += "						</div>";
			datos1 += "						<div class='w100 h20 centradoXY'>";
			datos1 += "							<div id='botonNAmistoso' class='spaceAroundXY flexWrap w40 h100' onclick=\"desplazamientoEdicion(1,'pantalla1', 'pantalla2C')\" ontouchstart=\"inicioPulsacion('botonNAmistoso')\" ontouchend=\"finPulsacion('botonNAmistoso')\"><img class='h80' src='img/Menu/Clasificaciones.png'> Crear Partido Amistoso</div>";
			datos1 += "						</div>";
			datos1 += "					</div>";
			datos1 += " 			</div>";
			datos1 += "				<div class='w100 h20 cuadroInfo centradoXY'><p class='w90'> <img src='img/Menu/MVP.png'> A través de esta guía podrás crear un nuevo torneo o editarlo.<br> Primer paso: <span style='font-family:calibri'>¿</span>quieres crear/editar un torneo totalmente nuevo desde cero o quieres añadir una nueva temporada a un torneo ya creado anteriormente<span style='font-family:calibri'>?</span></p></div>";
			datos1 += "			</div>";
			datos1 += "		</div>";

			//Ruta A: nuevo campeonato
				//Pagina 2A
			datos1 += "	<div id='pantallaNuevoTorneo2A' class='marcoEdicion pantalla2A w100 h100 invisible'>";
			datos1 += "		<div id='anteriorNivel' class='w10 h100' onclick=\"desplazamientoEdicion(0,'pantalla2A','pantalla1')\" ontouchstart=\"inicioPulsacion('anteriorNivel')\" ontouchend=\"finPulsacion('anteriorNivel')\">";
			datos1 += "			<img class='w70' src='img/Menu/anterior.png'>";
			datos1 += "		</div>";
			datos1 += "		<div class='w80 h95 pantallaEdicion'>";
			datos1 += "			<div class='w100 h80'>";
			datos1 += "				<img class='logoEdicion' src='img/Menu/Clasificaciones.png'>";
			datos1 += "				<div class='barraProgreso'><div class='progresoBarra w10'></div></div>";
			datos1 += "				<div class='recuadroEdicionTorneo centradoXY flexWrap'>";
			datos1 += "					<div class='cuadroElegir centradoInlineXY radio'>";
			datos1 += "						<input type='radio' name='botonElegir' id='botonElegir1' onclick=\"mostrarEleccion('1')\">";
            datos1 += "						<label for='botonElegir1' class='w50 centradoXY'>Crear Nueva Competicion</label>";
            datos1 += "						<input type='radio' name='botonElegir' id='botonElegir2' onclick=\"mostrarEleccion('2')\">";
            datos1 += "						<label for='botonElegir2' class='w50 centradoXY'>Editar Competicion</label>";
            datos1 += "					</div>";
            datos1 += "					<div id='cuadroEleccion' class='w100 h80 centradoXY flexWrap'>";
            datos1 += "					</div>";
			datos1 += "				</div>";
			datos1 += "			</div>";
			datos1 += "			<div class='w100 h20 cuadroInfo centradoXY'>";
			datos1 += "				<p id='info2A-0' class='w90'> <img src='img/Menu/MVP.png'>  Antes de seguir, indica si quieres crear un torneo desde cero o si deseas editar un torneo ya existente.</p>";
			datos1 += "				<p id='info2A-1' class='w90 invisible'> <img src='img/Menu/MVP.png'>  ¡Fantástico!, comencemos a crear un nuevo torneo desde cero. Para ello, comencemos indicando datos básicos. Recuerda que debes rellenar todos los apartados para continuar.</p>";
			datos1 += "				<p id='info2A-2' class='w90 invisible'> <img src='img/Menu/MVP.png'>  Utiliza el buscador para seleccionar el torneo que deseas editar y poder continuar con el siguiente paso.<br>Si no encuentras el torneo deseado puede ser que no dispongas de autorización para modificarlo o que no está creado</p>";
			datos1 += "			</div>";
			datos1 += "		</div>";
			datos1 += "		<div id='siguienteNivel' class='w10 h100' onclick=\"comprobarDatos('torneo2',leerCookie('edicionTorneoNombre'),leerCookie('edicionTorneoDeporte'),leerCookie('edicionTorneoSeccion'))\" ontouchstart=\"inicioPulsacion('siguienteNivel')\" ontouchend=\"finPulsacion('siguienteNivel')\">";
			//datos1 += "		<div id='siguienteNivel' class='w10 h100' onclick=\"comprobarDatos('torneo2',leerCookie('edicionTorneoNombre'),leerCookie('edicionTorneoOrganizadora'),leerCookie('edicionTorneoDeporte'),leerCookie('edicionTorneoSeccion'),leerCookie('edicionTorneoAmbito'))\" ontouchstart=\"inicioPulsacion('siguienteNivel')\" ontouchend=\"finPulsacion('siguienteNivel')\">";
			datos1 += "			<img class='w70' src='img/Menu/siguiente.png'>";
			datos1 += "		</div>";
			datos1 += "	</div>";

				//Pagina 3A
			datos1 += "	<div id='pantallaNuevoTorneo3A' class='marcoEdicion pantalla3A w100 h100 invisible'>";
			datos1 += "	</div>";

				//Pagina 4A
			datos1 += "	<div id='pantallaNuevoTorneo4A' class='marcoEdicion pantalla4A w100 h100 invisible'>";
			datos1 += "	</div>";

				//Pagina 5A
			datos1 += "	<div id='pantallaNuevoTorneo5A' class='marcoEdicion pantalla5A w100 h100 invisible'>";
			datos1 += "	</div>";

				//Pagina 6A
			datos1 += "	<div id='pantallaNuevoTorneo6A' class='marcoEdicion pantalla6A w100 h100 invisible'>";
			datos1 += "	</div>";


			//Ruta B: nueva temporada
			datos1 += "	<div id='pantallaNuevoTorneo2B' class='marcoEdicion pantalla2B w100 h100 invisible'>";
			datos1 += "		<div id='anteriorNivel' class='w10 h100' onclick=\"desplazamientoEdicion(0,'pantalla2B','pantalla1')\" ontouchstart=\"inicioPulsacion('anteriorNivel')\" ontouchend=\"finPulsacion('anteriorNivel')\">";
			datos1 += "			<img class='w70' src='img/Menu/anterior.png'>";
			datos1 += "		</div>";
			datos1 += "		<div class='w80 h95 pantallaEdicion'>";
			datos1 += "			<div class='w100 h80'>";
			datos1 += "				<img class='logoEdicion' src='img/Menu/Clasificaciones.png'>";
			datos1 += "				<div class='recuadroEdicionTorneo'>";


			datos1 += "				</div>";
			datos1 += "			</div>";
			datos1 += "			<div class='w100 h20 cuadroInfo centradoXY'><p class='w90'> <img src='img/Menu/MVP.png'> Para crear un nuevo torneo, lo primero es indicar ciertos datos básicos del mismo, tales como el deporte o la sección a la que pertenece, el tipo y el ámbito de la competición o la categoría de la misma (sirve para indicar la importancia o para definir los ascensos y descensos entre distintas categorías).</p></div>";
			datos1 += "		</div>";
			datos1 += "		<div id='siguienteNivel' class='w10 h100' onclick=\"comprobarDatos('torneo',leerCookie('edicionTorneoNombre'),leerCookie('edicionTorneoSeccion'),leerCookie('edicionTorneoTipo'),leerCookie('edicionTorneoAmbito'),leerCookie('edicionTorneoCategoria'))\" ontouchstart=\"inicioPulsacion('siguienteNivel')\" ontouchend=\"finPulsacion('siguienteNivel')\">";
			datos1 += "			<img class='w70' src='img/Menu/siguiente.png'>";
			datos1 += "		</div>";
			datos1 += "	</div>";


			//Ruta C: partido amistoso
			datos1 += "	<div id='pantallaNuevoTorneo2C' class='marcoEdicion pantalla6A w100 h100 invisible'>";
			datos1 += "		<div></div>";
			datos1 += "	</div>";


			// Publicar
			$("#menuEdicionNuevoTorneo").html(datos1);
			break;
		case "Evento":
			// Pagina 1
			var datos1 = "";
			datos1 += "		<div id='pantallaNuevoEvento1' class='marcoEdicion pantalla1 w100 h100'>";
			datos1 += "			<div id='volverNuevoEvento' class='w10 h100 centradoXY pulsable' onclick=\"sessionStorage.removeItem('nuevoEventoNombre'); sessionStorage.removeItem('nuevoEventoEspiritu'); sessionStorage.removeItem('nuevoEventoFomento'); sessionStorage.removeItem('nuevoEventoCaracter'); cancelarEdicion('Evento')\" ontouchstart=\"inicioPulsacion('volverNuevoEvento')\" ontouchend=\"finPulsacion('volverNuevoEvento')\">";
			datos1 += "				<img class='w70' src='img/Menu/boton_salir.png'>";
			datos1 += "			</div>";
			datos1 += "			<div class='w80 h95 pantallaEdicion'>";
			datos1 += "				<div class='w100 h80 spaceAroundXY'>";
			datos1 += "					<img class='logoEdicion' src='img/Menu/Clasificaciones.png'>";
			datos1 += "					<div class='w100 h95 centradoXY flexWrap'>";
			datos1 += "						<div class='w85 h15'>";
			datos1 += "							<div class='h30 w90'></div>";
			datos1 += "							<input id='nuevoEventoNombre' class='w45' type='text' placeholder='Nombre del evento...' onchange=\"sessionStorage.setItem('nuevoEventoNombre',this.value)\">";
			datos1 += "						</div>";
			datos1 += "						<div class='w100 h85 centradoXY'>";
			datos1 += "							<div class='w30 h90 centradoXY flexWrap'>";
			datos1 += "								<div class='h5 w90'></div>";
			datos1 += "								<strong class='w100 h5 centradoXY'><span style='font-family:calibri'>¿</span>Cuál es el Espíritu<span style='font-family:calibri'>?</span></strong>";
			datos1 += "								<div class='w100 h90 centradoXY flexWrap'>";
			datos1 += "									<p id='respuesta1Pregunta1' class='w90 h30 cajaPreguntaEvento pulsable' onclick=\"sessionStorage.setItem('nuevoEventoEspiritu',1); preguntaEventoPulsada(1,1)\"><strong class='color1'>Lucrativo</strong><br><small>Uno de los objetivos del evento es obtener beneficio económico.</small></p>";
			datos1 += "									<p id='respuesta2Pregunta1' class='w90 h30 cajaPreguntaEvento pulsable' onclick=\"sessionStorage.setItem('nuevoEventoEspiritu',2); preguntaEventoPulsada(1,2)\"><strong class='color1'>Benéfico</strong><br><small>Los beneficios del evento van destinados a una acción benéfica.</small></p>";
			datos1 += "									<p id='respuesta3Pregunta1' class='w90 h30 cajaPreguntaEvento pulsable' onclick=\"sessionStorage.setItem('nuevoEventoEspiritu',3); preguntaEventoPulsada(1,3)\"><strong class='color1'>Lúdico</strong><br><small>Evento sin ningún tipo de relación con la gestión económica.</small></p>";
			datos1 += "								</div>";
			datos1 += "							</div>";
			datos1 += "							<div class='w30 h90 centradoXY flexWrap'>";
			datos1 += "								<div class='h5 w90'></div>";
			datos1 += "								<strong class='w100 h5 centradoXY'><span style='font-family:calibri'>¿</span>Qué quieres Fomentar<span style='font-family:calibri'>?</span></strong>";
			datos1 += "								<div class='w100 h90 centradoXY flexWrap'>";
			datos1 += "									<p id='respuesta1Pregunta2' class='w90 h45 cajaPreguntaEvento pulsable' onclick=\"sessionStorage.setItem('nuevoEventoFomento',1); preguntaEventoPulsada(2,1)\"><strong class='color1'>Competitividad</strong><br><small>En este evento, cada equipo participante busca llegar a estar en lo más alto del ranking del campeonato.</small></p>";
			datos1 += "									<p id='respuesta2Pregunta2' class='w90 h45 cajaPreguntaEvento pulsable' onclick=\"sessionStorage.setItem('nuevoEventoFomento',2); preguntaEventoPulsada(2,2)\"><strong class='color1'>Participación</strong><br><small>Se busca que todos los equipos y jugadores participantes difruten de este evento amistoso.</small></p>";
			datos1 += "								</div>";
			datos1 += "							</div>";
			datos1 += "							<div class='w30 h90 centradoXY flexWrap'>";
			datos1 += "								<div class='h5 w90'></div>";
			datos1 += "								<strong class='w100 h5 centradoXY'><span style='font-family:calibri'>¿</span>Qué Carácter tiene<span style='font-family:calibri'>?</span></strong>";
			datos1 += "								<div class='w100 h90 centradoXY flexWrap'>";
			datos1 += "									<p id='respuesta1Pregunta3' class='w90 h45 cajaPreguntaEvento pulsable' onclick=\"sessionStorage.setItem('nuevoEventoCaracter',1); preguntaEventoPulsada(3,1)\"><strong class='color1'>Profesional</strong><br><small>Evento organizado para entidades profesionales.</small></p>";
			datos1 += "									<p id='respuesta2Pregunta3' class='w90 h45 cajaPreguntaEvento pulsable' onclick=\"sessionStorage.setItem('nuevoEventoCaracter',2); preguntaEventoPulsada(3,2)\"><strong class='color1'>Amateur</strong><br><small>Evento organizado para participantes no profesionales.</small></p>";
			datos1 += "								</div>";
			datos1 += "							</div>";
			datos1 += "						</div>";
			datos1 += "					</div>";
			datos1 += " 			</div>";
			datos1 += "				<div class='w100 h20 cuadroInfo centradoXY'><p class='w90'> <img src='img/Menu/MVP.png'> Para crear un nuevo Evento sólo debes escribir su nombre y contestar a estas 3 preguntas.<br>Gracias a tus respuestas, las opciones de los menús, su apariencia y el contenido que obtendrás estarán totalmente adaptados y personalizados para ayudarte en las necesidades de gestión de tu Evento.</p></div>";
			datos1 += "			</div>";
			datos1 += "			<div class='w10 h90 centradoXY flexWrap pulsable' onclick=\"guardarNuevoEvento()\">";
			datos1 += "				<div class='w90 centradoXY'><img src='img/Menu/guardar.png' alt='Guardar' style='max-height: 55px'></div>";
			datos1 += "			</div>";
			datos1 += "		</div>";

			// Publicar
			$("#menuEdicionNuevoEvento").html(datos1);
			break;
	}
};
	function preguntaEventoPulsada(pregunta, respuesta) {
		let largo = pregunta == 1 ? 4 : 3;

		for (var i = 1; i < largo; i++) {
			let label = "respuesta"+i+"Pregunta"+pregunta;
			document.getElementById(label).classList.remove("cajaEventoSeleccionada");
		}

		label = "respuesta"+respuesta+"Pregunta"+pregunta;
		document.getElementById(label).classList.add("cajaEventoSeleccionada");
	};
	function guardarNuevoEvento() {
		// Comprobar que se han introducido todos los datos

		if (sessionStorage.getItem("nuevoEventoNombre")) {
			if (sessionStorage.getItem("nuevoEventoEspiritu")) {
				if (sessionStorage.getItem("nuevoEventoFomento")) {
					if (sessionStorage.getItem("nuevoEventoCaracter")) {
						let text = "¡Enhorabuena, ya has creado tu nuevo Evento!\n¿Quieres seguir ahora mismo con la configuranción completa del Evento?";
						if (confirm(text) == true) {
							// Guardar y seguir configurando
							guardarDatosEvento();
							abrirMiEvento();
						} else {
							// Guardar y Salir
							guardarDatosEvento();
						}
					}else{
						document.getElementById("respuesta1Pregunta3").classList.add("shake");
						document.getElementById("respuesta2Pregunta3").classList.add("shake");
					}
				}else{
					document.getElementById("respuesta1Pregunta2").classList.add("shake");
					document.getElementById("respuesta2Pregunta2").classList.add("shake");
				}
			}else{
				document.getElementById("respuesta1Pregunta1").classList.add("shake");
				document.getElementById("respuesta2Pregunta1").classList.add("shake");
				document.getElementById("respuesta3Pregunta1").classList.add("shake");
			}
		}else{
			document.getElementById("nuevoEventoNombre").classList.add("shake");
		}

		setTimeout(function() {
			let array = ["nuevoEventoNombre", 'respuesta1Pregunta1', 'respuesta2Pregunta1', 'respuesta3Pregunta1', 'respuesta1Pregunta2', 'respuesta2Pregunta2', 'respuesta1Pregunta3', 'respuesta2Pregunta3'];
			for (var i = 0; i < array.length; i++) {
				document.getElementById(array[i]).classList.remove("shake");
			}
		},1000);
	};
		async function guardarDatosEvento() {
			$.ajax({
				type: "POST",
				url: "php/guardarNuevoEvento.php",
				data: {
					nombre: sessionStorage.getItem("nuevoEventoNombre"),
					espiritu: sessionStorage.getItem("nuevoEventoEspiritu"),
					fomento: sessionStorage.getItem("nuevoEventoFomento"),
					caracter: sessionStorage.getItem("nuevoEventoCaracter")
				},
				success: function() {
					sessionStorage.removeItem('nuevoEventoNombre');
					sessionStorage.removeItem('nuevoEventoEspiritu');
					sessionStorage.removeItem('nuevoEventoFomento');
					sessionStorage.removeItem('nuevoEventoCaracter');
					cancelarEdicion('Evento');
				},
				timeout: 10000,
				error: function() { guardarDatosEvento(); }
			});
		};

	function mostrarListado(tipo,dato,pagina) {
		switch (tipo) {
			case "Pais":
				$.ajax({
					url: "php/listadosPaises.php",
					type: "POST",

					success: function(res){
						var js = JSON.parse(res);
						const paisDefecto = "es";
						datosPais = "					<option value='"+paisDefecto+"'>"+nombrePais(paisDefecto)+"</option>";
						for (var i = 0; i < js[0].length; i++) {
							datosPais += "				<option value='"+js[0][i].Pais+"'>"+nombrePais(js[0][i].Pais)+"</option>";
						}
						$("#paisNuevoClub").html(datosPais);

						var direccion = "img/Idiomas/"+paisDefecto+".png";
						document.getElementById("logoPais").src = direccion;
					},
					error: function(){
						mostrarListado("Pais");
					}
				});
				break;
			case "Comunidad":
				if (document.getElementById("paisNuevoClub").value == "es") {
					$.ajax({
						url: "php/listadosComunidades.php",
						type: "POST",

						success: function(res){
							var js = JSON.parse(res);
							datosComunidad = "					<option>Seleccionar Comunidad...</option>";
							for (var i = 0; i < js[0].length; i++) {
								datosComunidad += "				<option value='"+js[0][i].Comunidad+"'>"+js[0][i].Comunidad+"</option>";
							}
							$("#comunidad").html(datosComunidad);
						},
						error: function() {
							mostrarListado("Comunidad");
						}
					});
				}else{
					document.getElementById("comunidad").innerHTML = "<option>Espera...</option>";
				}
				
				var direccion = "img/Idiomas/"+document.getElementById("paisNuevoClub").value+".png";
				document.getElementById("logoPais").src = direccion;
				break;
			case "Provincia":
				var direccion = "php/listado"+tipo+"s.php";
				var html = "				<option>Espera...</option>";
				var label = pagina == "suscripcion" ? "#facturacionLocalidad" : "#localidad";
				$(label).html(html);
				break;
			case "Localidad":
				var direccion = "php/listado"+tipo+"es.php";
				break;
		}

		if (tipo == "Provincia" || tipo == "Localidad") {
			$.ajax({
				url: direccion,
				type: "POST",
				data: {dato: dato},

				success: function(res){
					var js = JSON.parse(res);
					var datosListado = "	<option>Seleccionar "+tipo+"...</option>";
					for (var i = 0; i < js[0].length; i++) {
						datosListado += "	<option value='"+eval('js[0][i].'+tipo)+"'>"+eval('js[0][i].'+tipo)+"</option>";
					}
					var id = pagina == "suscripcion" ? "#facturacion"+tipo : "#"+tipo.toLowerCase();
					$(id).html(datosListado);
				},
				error: function() {
					mostrarListado(tipo,dato,pagina);
				}
			});
		}
	};

	function guardarNuevoClub() {
		let fichero = $('#archivoEscudo')[0].files[0];
		let datos = new FormData();
		datos.append('escudo', fichero);
		datos.append('nombre', document.getElementById("nombreClub").value);
		datos.append('presidente', document.getElementById("presidenteClub").value);
		datos.append('fundacion', document.getElementById("fechaFundacionClub").value);
		datos.append('pais', document.getElementById("paisNuevoClub").value);
		datos.append('comunidad', document.getElementById("comunidad").value);
		datos.append('provincia', document.getElementById("provincia").value);
		datos.append('localidad', document.getElementById("localidad").value);

		$.ajax({
			type: "POST",
			url: "php/nuevoClub.php",
			data: datos,
			contentType: false,
			processData: false,
			success: function() {
				cancelarEdicion('Club');
			},
			error: function() {
				document.getElementById("botonClub").classList.add("shake");
			}
		});
	};

function mostrarEleccion(valor) {
	// Cambiar cuadro de información
	var casillaInfo = "#info2A-"+valor;
	$("#info2A-0").addClass('invisible');
	$("#info2A-1").addClass('invisible');
	$("#info2A-2").addClass('invisible');
	$(casillaInfo).removeClass('invisible');

	// Mostrar elección
	var datos = "";
	switch (valor) {
		case "1":
			//CREAR COOKIE DE OPCION 1
			crearCookie("Crear nuevo","Campeonato");
			crearCookie('edicionTorneoOrganizadora',"0"); //Valor por defecto
			//BORRAR LAS COOKIES DE LA OPCION 2
			datos += "				<div class='w100 h20 spaceAroundXY'>";
			datos += "					<div class='w45 centradoXY'>";
			datos += "	 					<input id='inputNombre' class='w100 inputNombre' type='text' name='nombre' maxlength='30' placeholder='Introducir Nombre Campeonato' onchange=\"edicionTorneoNombre(); crearCookie('edicionTorneoNombre',this.value)\">";
			datos += "					</div>";
			datos += "				</div>";
			/*$.ajax({
				url: "php/listadoOrganizadoras.php",
				type: "POST",
				success: function(res){
					var js = JSON.parse(res);

					datos += "				<div class='w100 h20 spaceAroundXY'>";
					datos += "					<div class='w45 centradoXY'>";
					datos += "	 					<input id='inputNombre' class='w100 inputNombre' type='text' name='nombre' maxlength='30' placeholder='Introducir Nombre Campeonato' onchange=\"edicionTorneoNombre(); crearCookie('edicionTorneoNombre',this.value)\">";
					datos += "					</div>";
					datos += "	 				<div class='w45 centradoXY'>";
					datos += "	 					<select class='w30' name='organizadora' id='organizadora' onchange=\"crearCookie('edicionTorneoOrganizadora',this.value)\">";
					datos += "							<option value='0'>Sin Organizadora Oficial</option>";
					
					if (js.Internacional[0] !== "0") {
						datos += "						<optgroup label='Federaciones Internacionales'>";
						for (var i = 0; i < js.Internacional.length; i++) {
								datos += "					<option value='"+js.Internacional[i].ID_Organizadora+"'>"+js.Internacional[i].Siglas+" (<small>"+js.Internacional[i].Nombre+"</small>)</option>";
							}
						datos += "						</optgroup> ";
					}

					if (js.Nacional[0] !== "0") {
								datos += "				<optgroup label='Federaciones Nacionales'>";
						for (var i = 0; i < js.Nacional.length; i++) {
								datos += "					<option value='"+js.Nacional[i].ID_Organizadora+"'>"+js.Nacional[i].Siglas+" (<small>"+js.Nacional[i].Nombre+"</small>)</option>";
							}
								datos += "				</optgroup> ";
					}

					if (js.Territorial[0] !== "0") {
								datos += "				<optgroup label='Federaciones Territoriales'>";
						for (var i = 0; i < js.Territorial.length; i++) {
								datos += "					<option value='"+js.Territorial[i].ID_Organizadora+"'>"+js.Territorial[i].Siglas+" (<small>"+js.Territorial[i].Nombre+"</small>)</option>";
							}
								datos += "				</optgroup> ";
					}
			datos += "								</select>";
			datos += "							</div>";
			datos += "						</div>";*/
			datos += "						<div class='w100 h20 spaceAroundXY'>";
			datos += "							<div class='w45 h100'>";
			datos += "		 						<label>Deporte</label>";
			datos += "		 						<div class='centradoInlineXY radio'>";
			datos += "		 							<input type='radio' name='deporte' id='deporte1' onclick=\"crearCookie('edicionTorneoDeporte','1')\">";
			datos += "									<label class='w40 h100 centradoXY' for='deporte1'>Balonmano</label>";
			datos += "			 						<input type='radio' name='deporte' id='deporte2' onclick=\"crearCookie('edicionTorneoDeporte','2')\">";
			datos += "									<label class='w40 h100 centradoXY' for='deporte2'>Baloncesto</label>";
			datos += "		 							<input type='radio' name='deporte' id='deporte3' onclick=\"crearCookie('edicionTorneoDeporte','3')\">";
			datos += "									<label class='w40 h100 centradoXY' for='deporte3'>Futsal</label>";
			datos += "		 						</div>";
			datos += "							</div>";
			datos += "							<div class='w45 h100'>";
			datos += "			 					<label>Sección</label>";
			datos += "			 					<div class='centradoInlineXY radio'>";
			datos += "		 							<input type='radio' name='seccion' id='seccion1' onclick=\"crearCookie('edicionTorneoSeccion','1')\">";
			datos += "		 							<label class='w40 h100 centradoXY' for='seccion1'>Masculina</label>";
			datos += "		 							<input type='radio' name='seccion' id='seccion2' onclick=\"crearCookie('edicionTorneoSeccion','2')\">";
			datos += "		 							<label class='w40 h100 centradoXY' for='seccion2'>Femenina</label>";
			datos += "		 							<input type='radio' name='seccion' id='seccion3' onclick=\"crearCookie('edicionTorneoSeccion','3')\">";
			datos += "			 						<label class='w40 h100 centradoXY' for='seccion3'>Mixta</label>";
			datos += "			 					</div>";
			datos += "							</div>";
			datos += "						</div>";
			/*datos += "						<div class='w100 h20'>";
			datos += "		 					<label>Ámbito de la competición</label>";
			datos += "		 					<div class='radio'>";
			datos += "		 						<input type='radio' name='ambito' id='ambito0' onclick=\"crearCookie('edicionTorneoAmbito','0')\">";
			datos += "		 						<label for='ambito0'>Selecciones</label>";
			datos += "		 						<input type='radio' name='ambito' id='ambito1' onclick=\"crearCookie('edicionTorneoAmbito','1')\">";
			datos += "		 						<label for='ambito1'>Internacional</label>";
			datos += "		 						<input type='radio' name='ambito' id='ambito2' onclick=\"crearCookie('edicionTorneoAmbito','2')\">";
			datos += "		 						<label for='ambito2'>Nacional</label>";
			datos += "		 						<input type='radio' name='ambito' id='ambito3' onclick=\"crearCookie('edicionTorneoAmbito','3')\">";
			datos += "		 						<label for='ambito3'>Interterritorial</label>";
			datos += "		 						<input type='radio' name='ambito' id='ambito4' onclick=\"crearCookie('edicionTorneoAmbito','4')\">";
			datos += "		 						<label for='ambito4'>Territorial</label>";
			datos += "		 					</div>";
			datos += "						</div>";*/

			$("#cuadroEleccion").html(datos);
			eliminarZoom();
			/*	}
			});*/
			break;
		case "2":
			//CREAR COOKIE DE OPCION 2
			crearCookie("Crear nuevo","Categoria");
			//BORRAR LAS COOKIES DE LA OPCION 1
			eliminarCookie("edicionTorneoNombre");
			eliminarCookie("edicionTorneoOrganizadora");
			eliminarCookie("edicionTorneoDeporte");
			eliminarCookie("edicionTorneoSeccion");
			eliminarCookie("edicionTorneoAmbito");
			eliminarCookie("edicionTorneoCategorias");

			datos += "Estamos en el cuadro 2";
			// Seleccionar:
				//Deporte
				//Seccion
				//Ambito
				//Organizadora


			// Mostrar listado de competiciones según las opciones

			// Seleccionar competición existente ==> guardar cookie con el codigo de la competición 
			
			$("#cuadroEleccion").html(datos);
			break;
	}
};


function cancelarEdicion(elemento) {
	// Quitar página actual
	var antiguo = "#menuEdicionNuevo"+elemento;
	$(antiguo).addClass("invisible");

	// Mostrar página de nuevo
	$("#menuEdicionGeneral").removeClass("invisible");
};
function desplazamientoEdicion(direccion,origen,destino) {
	var primero = "."+origen;
	var segundo = "."+destino;

	$(segundo).removeClass("invisible"); //Hacer visible la nueva pantalla
	switch (direccion) {
		case 0:
			$(segundo).removeClass("pantallaIzquierda");
			$(primero).removeClass("pantallaCentroIzq");
			$(primero).removeClass("pantallaCentroDer");
			$(segundo).addClass("pantallaCentroIzq");
			$(primero).addClass("pantallaDerecha");
			break;
		case 1:
			$(segundo).removeClass("pantallaDerecha");
			$(primero).removeClass("pantallaCentroDer");
			$(primero).removeClass("pantallaCentroIzq");
			$(primero).addClass("pantallaIzquierda");
			$(segundo).addClass("pantallaCentroDer");
			break;
	}
	setTimeout(function() {
		$(primero).addClass("invisible"); //Esconder la pantalla que ya no se usa
	},600);
};

function listadoClubes(valor) {
	if (valor == "Todos") {
		var nombre = "";
		var fundacion = "Todos";
		var pais = "Todos";
		var comunidad = "Todas";
		var provincia = "Todas";
		var localidad = "Todas";
	}else {
		var nombre = document.getElementById('nombreInputClub').value;
		var fundacion = document.getElementById('fundacionClub').value;
		var pais = document.getElementById('paisClub').value;
		var comunidad = document.getElementById('comunidadClub').value;
		var provincia = document.getElementById('provinciaClub').value;
		var localidad = document.getElementById('localidadClub').value;
	}
	document.getElementById("loaderMenuGeneralDatos").classList.add("loader");
	$.ajax({
		url: "php/listadoClubes.php",
		type: 'POST',
		data: {
			nombre: nombre,
			fundacion: fundacion,
			pais: pais,
			comunidad: comunidad,
			provincia: provincia,
			localidad: localidad
		},

		success: function(res){
			document.getElementById("loaderMenuGeneralDatos").classList.remove("loader");
			var js = JSON.parse(res);

			//construir html
			var datos = "";
			for (var i = 0; i < js[0].length; i++) {
				let tipo = js[0][i].TipoClub == "2" ? " style='background:var(--color-corporativo-morado3)'" : "";
				datos += "	<div class='w100 h10 cajaMenu spaceBetweenXY'"+tipo+">";
				datos += "		<div class='w5 h90 centradoXY'>";
				datos += "			<img src='img/Clubes/Clubes/"+js[0][i].Escudo+"' class='w80' loading='lazy' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
				datos += " 		</div>";
				datos += "		<div class='w40 h90'><small>"+js[0][i].Nombre+"</small></div>";
				if (js[0][i].Fundacion == null) {
					datos += "	<div class='w10 h90'></div>";
				}else {
					const desaparicion = js[0][i].Desaparicion != "0" ? " "+js[0][i].Desaparicion : "";
					datos += "	<div class='w10 h90 centradoXY' style='text-align:center'>"+js[0][i].Fundacion+desaparicion+"</div>";
				}
				datos += "		<div class='w25 h90 spaceAroundXY'>";
				datos += "			<span class='w20 h100 centradoXY'><img class='w60' src='img/Idiomas/"+js[0][i].Pais+".png' alt='Pais'></span>";
				const escudoComunidad = js[0][i].Comunidad == "" ? "" : "<img src='img/Clubes/Clubes/Localidades/"+js[0][i].Comunidad+".png' class='iconoComunidad' loading='lazy'>";
				datos += "			<p class='w80'>"+js[0][i].Localidad+"<br><small>"+js[0][i].Provincia+escudoComunidad+"</small></p>";
				datos += "		</div>";
				datos += "		<div class='w15 h90'><small>"+js[0][i].Presidente+"</small></div>";
				datos += "		<div class='w5 botonInfo centradoXY' onclick=\"ventanaDatos('club',"+js[0][i].ID_Club+")\"><img src='img/Menu/buscar.png'></div>";
				datos += "	</div>";
			}

			//publicar código
			$("#menuDatosClubes").html(datos);
			$("#menuDatosClubes").show(datos);
		},
		timeout: 10000,
		error: function() {listadoClubes(valor);}
	});
};

function datosParticulares(opcion) {
	if (opcion === "0") {
		var deporte = document.getElementById('deporteEquipo').value;
		var seccion = document.getElementById('seccionEquipo').value;
		var temporada = document.getElementById('temporadaEquipo').value;

		$.ajax({
			url: "php/listadosParticularesEquipos.php",
			type: "POST",
			data: {
				deporte: deporte,
				seccion: seccion,
				temporada: temporada,
			},
			success: function(res){
				var js = JSON.parse(res);
			
				// Listado de temporadas
				var temporadas = "	<option value='0' default>Temporada</option>";
				if (js.Temporadas[0] !== "0") {
					for (var i = 0; i < js.Temporadas[0].length; i++) {
						var valor = parseInt(js.Temporadas[0][i].Temporada) + 1;
						temporadas += "	<option value='"+js.Temporadas[0][i].Temporada+"'>"+js.Temporadas[0][i].Temporada+"/"+valor+"</option>";
					}
				}else{
					temporadas += "<option value='0'>Sin valores</option>";
				}


				// Listado de categorías
				var categorias = "";
				categorias += "			<option value='0' default>Categoría</option>";
				if ((typeof js.Listado_Cat[0]!=='undefined' && js.Listado_Cat[0] !== "0") || (typeof js.Listado_Cat[1]!=='undefined' && js.Listado_Cat[1] !== "0") || (typeof js.Listado_Cat[2]!=='undefined' && js.Listado_Cat[2] !== "0")) {
					if (typeof js.Listado_Cat[0]!=='undefined' && js.Listado_Cat[0] !== "0") {
						categorias += "		<optgroup label='Categorías Principales'>";
						for (var i = 0; i < js.Listado_Cat[0].length; i++) {
							categorias += "			<option value='"+js.Listado_Cat[0][i].Nivel+"'>"+js.Listado_Cat[0][i].Nombre+"</option>";
						}
						categorias += "		</optgroup>";
					}
					if (typeof js.Listado_Cat[1]!=='undefined' && js.Listado_Cat[1] !== "0") {
						categorias += "		<optgroup label='Categorías Especiales'>";
						for (var i = 0; i < js.Listado_Cat[1].length; i++) {
							categorias += "			<option value='"+js.Listado_Cat[1][i].Nivel+"'>"+js.Listado_Cat[1][i].Nombre+"</option>";
						}
						categorias += "		</optgroup>";
					}
					if (typeof js.Listado_Cat[2]!=='undefined' && js.Listado_Cat[2] !== "0") {
						categorias += "		<optgroup label='Categorías Inferiores'>";
						for (var i = 0; i < js.Listado_Cat[2].length; i++) {
							categorias += "			<option value='"+js.Listado_Cat[2][i].Nivel+"'>"+js.Listado_Cat[2][i].Nombre+"</option>";
						}
						categorias += "		</optgroup>";
					}
				}else {
					categorias += "	<option value='0'>Sin valores</option>";
				}

				// Listado de competiciones
				var competiciones = "	<option value='0' default>Competición</option>";
				if (js.Internacional[0] !== "0" || js.Nacional[0] !== "0" || js.Autonomica[0] !== "0" || js.Local[0] !== "0") {
					if (js.Internacional[0] !== "0") {
						competiciones += "	<optgroup label='Competiciones Europeas'>";
						for (var i = 0; i < js.Internacional[0].length; i++) {
							competiciones += "	<option value='"+js.Internacional[0][i].ID_Campeonato+"'>"+js.Internacional[0][i].Nombre+"</option>";
						}
						competiciones += "	</optgroup>";
					}

					if (js.Nacional[0] !== "0") {
						competiciones += "	<optgroup label='Competiciones Nacionales'>";
						for (var i = 0; i < js.Nacional[0].length; i++) {
							competiciones += "	<option value='"+js.Nacional[0][i].ID_Campeonato+"'>"+js.Nacional[0][i].Nombre+"</option>";
						}
						competiciones += "	</optgroup>";
					}

					if (js.Autonomica[0] !== "0") {
						competiciones += "	<optgroup label='Competiciones Autonómicas'>";
						for (var i = 0; i < js.Autonomica[0].length; i++) {
							competiciones += "	<option value='"+js.Autonomica[0][i].ID_Campeonato+"'>"+js.Autonomica[0][i].Nombre+"</option>";
						}
						competiciones += "	</optgroup>";
					}

					if (js.Local[0] !== "0") {
						competiciones += "	<optgroup label='Competiciones Locales'>";
						for (var i = 0; i < js.Local[0].length; i++) {
							competiciones += "	<option value='"+js.Local[0][i].ID_Campeonato+"'>"+js.Local[0][i].Nombre+"</option>";
						}
						competiciones += "	</optgroup>";
					}

				}else {
					competiciones += "	<option value='0'>Sin valores</option>";
				}

				$("#temporadaEquipo").html(temporadas);
				$("#temporadaEquipo").show();
				$("#categoriaEquipo").html(categorias);
				$("#categoriaEquipo").show();
				$("#competicionEquipo").html(competiciones);
				$("#competicionEquipo").show();

				// Listar resultados
				listadoEquipos();
			},
			timeout: 10000,
			error: function() {datosParticulares(opcion);}
		});
	}else{
		// Listar resultados
		listadoEquipos();
	}
};
function listadoEquipos(valor) {
	if (valor == "Todos") {
		var club = "0";
		var pais = "0";
		var seccion = "0";
		var deporte = "0";
		var temporada = "0";
		var categoria = "0";
		var competicion = "0";
	}else {
		var nombre = document.getElementById('nombreInputEquipo').value;
		var club = document.getElementById('clubEquipo').value;
		var pais = document.getElementById('paisEquipo').value;
		var seccion = document.getElementById('seccionEquipo').value;
		var deporte = document.getElementById('deporteEquipo').value;
		var temporada = document.getElementById('temporadaEquipo').value;
		var categoria = document.getElementById('categoriaEquipo').value;
		var competicion = document.getElementById('competicionEquipo').value;
	}

	$.ajax({
		url: "php/listadoEquipos.php",
		type: 'POST',
		data: {
			nombre: nombre,
			club: club,
			pais: pais,
			seccion: seccion,
			deporte: deporte,
			temporada: temporada,
			categoria: categoria,
			competicion: competicion
		},
		success: function(res){
			var js = JSON.parse(res);

			var datos = "";
			if (js[0] !== "0") {
				for (var i = 0; i < js[0].length; i++) {
					let tipo = js[0][i].Tipo == "2" ? " style='background:var(--color-corporativo-morado3)'" : "";
					datos += "	<div class='w100 h10 cajaMenu spaceBetweenXY'"+tipo+">";
					datos += "			<div class='w5 h90 centradoXY'>";
					if (js[0][i].Escudo && js[0][i].Escudo !== "defecto.png") {
						datos += "			<img src='img/Clubes/"+valorDeporte(js[0][i].Deporte)+"/Equipos/"+js[0][i].Escudo+"' class='w80' loading='lazy' alt='"+js[0][i].Nombre+"'>";
					}else {
						datos += " 			<img src='img/Clubes/Clubes/defecto.png' class='w80'>";
					}
					datos += " 			</div>";
					datos += "			<div class='w45 h90'><p>"+js[0][i].Nombre+"<br><small class='textoSecundario'>"+js[0][i].Club+"</small></p></div>";
					datos += "			<div class='w10 h90'>"+js[0][i].Temporada+"</div>";
					datos += "			<div class='w5 centradoXY'><img class='w60' src='img/Idiomas/"+js[0][i].Pais+".png' alt='Pais'></div>";
					datos += "			<div class='w30 h90'><p><img src='img/Menu/"+js[0][i].Seccion+".png' class='iconoGenero'><small> "+valorCategoria(js[0][i].Categoria)+"</small></p></div>";
					datos += "			<div class='w5 h90 botonInfo centradoXY' onclick=\"ventanaDatos('equipo',"+js[0][i].ID_Equipo+","+js[0][i].Temporada+")\"><img src='img/Menu/buscar.png'></button></div>";
					datos += "		</div>";
				}
			}else{
				datos += "		<div class='w100 h10 cajaMenu'><p class='centradoXY'>No existen datos para la selección</p></div>";
			}
			$("#menuDatosEquipos").html(datos);
			$("#menuDatosEquipos").show(datos);
		},
		timeout: 10000,
		error: function() {listadoEquipos(valor);}
	});
};

function listadoJugadores(valor,letra) {
	if (valor == "Todos") {
		var pais = "Todos";
		var seccion = "Todas";
		var edad = "Todas";
		var estado = "Todas";
	}else {
		var nombre = document.getElementById('nombreInputJugador').value;
		var pais = document.getElementById('paisJugador').value;
		var seccion = document.getElementById('seccionJugador').value;
		var edad = document.getElementById('edadJugador').value;
		var estado = document.getElementById('estadoJugador').value;
	}
	if (letra) {
		sessionStorage.setItem("letraSeleccionada",letra);
	}
	const letraSeleccionada = letra ? letra : sessionStorage.getItem("letraSeleccionada");

	document.getElementById("loaderMenuGeneralDatos").classList.add("loader");
	$.ajax({
		url: "php/listadoJugadores.php",
		type: 'POST',
		data: {
			nombre: nombre,
			pais: pais,
			seccion: seccion,
			edad: edad,
			letra: letraSeleccionada
		},
		success: function(res){
			document.getElementById("loaderMenuGeneralDatos").classList.remove("loader");
			var js = JSON.parse(res);

			var datosIniciales = "";
			const arrayLetras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
			for (var j = 0; j < arrayLetras.length; j++) {
				var letraExiste = 0;
				for (var k = 0; k < js.Iniciales.length; k++) {
					if (arrayLetras[j] == js.Iniciales[k].Inicial) {
						letraExiste = 1;
					}
				}
				if (letraExiste == 0) {
					datosIniciales += "	<div id='botonLetraJugador"+arrayLetras[j]+"' class='h10 centradoXY botonLetra botonLetraNoOperativo'>"+arrayLetras[j]+"</div>";
				}else{
					datosIniciales += "	<div id='botonLetraJugador"+arrayLetras[j]+"' class='h10 centradoXY botonLetra pulsable' onclick=\"listadoJugadores('','"+arrayLetras[j]+"')\" ontouchstart=\"inicioPulsacion('botonLetraJugador"+arrayLetras[j]+"')\" ontouchend=\"finPulsacion('botonLetraJugador"+arrayLetras[j]+"')\">"+arrayLetras[j]+"</div>";
				}
			}
			document.getElementById("menuInicialesJugadores").innerHTML = datosIniciales;

			const botonesLetras = document.getElementsByClassName("botonLetra");
			for (var l = 0; l < botonesLetras.length; l++) {
				document.getElementById(botonesLetras[l].id).classList.remove("botonLetraSeleccionado");
			}

			const letraSeleccionada = sessionStorage.getItem("letraSeleccionada") ? "botonLetraJugador"+sessionStorage.getItem("letraSeleccionada") : "botonLetraJugadorA";
			document.getElementById(letraSeleccionada).classList.add("botonLetraSeleccionado");
			var datos = "";
			if (js.Jugadores == "0") {
				datos += "	<div>No se encuentran jugadores con esos parámetros</div>";
			}else{

				for (var i = 0; i < js.Jugadores.length; i++) {
					const colorFila = js.Jugadores[i].Tipo == "2" || js.Jugadores[i].Tipo == "3" ? " style='background:var(--color-fondo-principal)'" : "";
					datos += "<div class='w95 h15 cajaListadoEdicion spaceAroundXY'"+colorFila+">";
					const fotografia = js.Jugadores[i].Foto ? js.Jugadores[i].Foto : "x.png";
					datos += "		<div class='w10 h90 centradoXY' style='position: relative'>";
					if (js.Jugadores[i].Tipo == "2") {
						datos += "		<div class='h100 w100 centradoXY fichaJugadorEspecial'>";
						datos += "			<div class='h100 w50 centradoXY fondoFichaJugadorEspecial'>";
						datos += "				<img class='h100 fotoFichaJugadorEspecial' src='img/Clubes/Balonmano/Plantillas/"+js.Jugadores[i].Equipo+"/"+fotografia+"' loading='lazy' onerror=\"this.src='img/Clubes/usuario.png'\" alt='Foto'>";
						datos += "			</div>";
						datos += "		</div>";
					}else if (js.Jugadores[i].Tipo == "3") {
						datos += "		<div class='h100 centradoXY fichaJugadorEspecialBigDT'>";
						datos += "			<div class='h100 w50 centradoXY fondoFichaJugadorEspecialBigDT'>";
						datos += "				<img class='h100 fotoFichaJugadorEspecialBigDT' src='img/Clubes/Balonmano/Plantillas/"+js.Jugadores[i].Equipo+"/"+fotografia+"' loading='lazy' onerror=\"this.src='img/Clubes/usuario.png'\" alt='Foto'>";
						datos += "			</div>";
						datos += "		</div>";
					}else{
						datos += "		<img class='h90 circuloImagenFoto' src='img/Clubes/Balonmano/Plantillas/"+js.Jugadores[i].Equipo+"/"+fotografia+"' loading='lazy' onerror=\"this.src='img/Clubes/usuario.png'\" alt='Foto'>";
					}
					datos += "		</div>";
					datos += "		<div class='w40'>"+js.Jugadores[i].Nombre+" "+js.Jugadores[i].Apellido+"</div>";
					datos += "		<div class='w5 centradoXY'><strong>"+js.Jugadores[i].Edad+"</strong></div>";
					if (js.Jugadores[i].Seccion) {
						datos += "	<div class='w5 h90 centradoXY'>";
						datos += "		<img src='img/Menu/"+js.Jugadores[i].Seccion+".png' class='w40' loading='lazy'>";
						datos += "	</div>";
					}else{
						datos += "	<div class='w5 h90'></div>";
					}
					if (js.Jugadores[i].Nacionalidad) {
						datos += "	<div class='w5 h90 centradoXY'>";
						datos += "		<img src='img/Idiomas/"+js.Jugadores[i].Nacionalidad+".png' class='w70' loading='lazy'>";
						datos += "	</div>";
					}else{
						datos += "	<div class='w5 h90'></div>";
					}
					if (js.Jugadores[i].Nacionalidad2) {
						datos += "	<div class='w5 h90 centradoXY'>";
						datos += "		<img src='img/Idiomas/"+js.Jugadores[i].Nacionalidad2+".png' class='w70' loading='lazy'>";
						datos += "	</div>";
					}else{
						datos += "	<div class='w5 h90'></div>";
					}
					datos += "		<div class='w5 botonInfo centradoXY' onclick=\"ventanaDatos('jugador',"+js.Jugadores[i].ID_Jugador+")\"><img src='img/Menu/buscar.png'></div>";
					datos += "</div>";
				}
			}
			document.getElementById("cajaMenuDatosJugadores").innerHTML = datos;
		},
		timeout: 10000,
		error: function() {listadoJugadores(valor,letra);}
	});
};

function listadoTecnicos(valor,letra) {
	if (valor == "Todos") {
		var pais = "Todos";
		var puesto = "Todos";
		var edad = "Todas";
		var estado = "Todas";
	}else {
		var nombre = document.getElementById('nombreInputTecnico').value;
		var pais = document.getElementById('paisTecnico').value;
		var puesto = document.getElementById('puestoTecnico').value;
		var edad = document.getElementById('edadTecnico').value;
		var estado = document.getElementById('estadoTecnico').value;
	}
	if (letra) {
		sessionStorage.setItem("letraSeleccionada",letra);
	}
	const letraSeleccionada = letra ? letra : sessionStorage.getItem("letraSeleccionada");

	document.getElementById("loaderMenuGeneralDatos").classList.add("loader");
	$.ajax({
		url: "php/listadoTecnicos.php",
		type: 'POST',
		data: {
			nombre: nombre,
			pais: pais,
			puesto: puesto,
			edad: edad,
			letra: letraSeleccionada
		},
		success: function(res){
			document.getElementById("loaderMenuGeneralDatos").classList.remove("loader");
			var js = JSON.parse(res);

			var datosIniciales = "";
			const arrayLetras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
			for (var j = 0; j < arrayLetras.length; j++) {
				var letraExiste = 0;
				for (var k = 0; k < js.Iniciales.length; k++) {
					if (arrayLetras[j] == js.Iniciales[k].Inicial) {
						letraExiste = 1;
					}
				}
				if (letraExiste == 0) {
					datosIniciales += "	<div id='botonLetraTecnico"+arrayLetras[j]+"' class='h10 centradoXY botonLetra botonLetraNoOperativo'>"+arrayLetras[j]+"</div>";
				}else{
					datosIniciales += "	<div id='botonLetraTecnico"+arrayLetras[j]+"' class='h10 centradoXY botonLetra pulsable' onclick=\"listadoTecnicos('','"+arrayLetras[j]+"')\" ontouchstart=\"inicioPulsacion('botonLetraTecnico"+arrayLetras[j]+"')\" ontouchend=\"finPulsacion('botonLetraTecnico"+arrayLetras[j]+"')\">"+arrayLetras[j]+"</div>";
				}
			}
			document.getElementById("menuInicialesTecnicos").innerHTML = datosIniciales;

			const botonesLetras = document.getElementsByClassName("botonLetra");
			for (var l = 0; l < botonesLetras.length; l++) {
				document.getElementById(botonesLetras[l].id).classList.remove("botonLetraSeleccionado");
			}

			const letraSeleccionada = sessionStorage.getItem("letraSeleccionada") ? "botonLetraTecnico"+sessionStorage.getItem("letraSeleccionada") : "botonLetraTecnicoA";
			document.getElementById(letraSeleccionada).classList.add("botonLetraSeleccionado");
			var datos = "";
			if (js.Tecnicos == "0") {
				datos += "	<div>No se encuentran técnicos con esos parámetros</div>";
			}else{

				for (var i = 0; i < js.Tecnicos.length; i++) {
					/*const colorFila = js.Tecnicos[i].Tipo == "2" ? " style='background:var(--color-fondo-principal)'" : "";
					datos += "<div class='w95 h15 cajaMenu spaceAroundXY'"+colorFila+">";*/
					datos += "<div class='w95 h15 cajaMenu spaceAroundXY'>";
					const fotografia = js.Tecnicos[i].Foto ? js.Tecnicos[i].Foto : "x.png";
					datos += "	<div class='w10 h90 centradoXY'>";
					datos += "		<img src='img/Clubes/Balonmano/Plantillas/"+js.Tecnicos[i].Equipo+"/"+fotografia+"' class='h90 circuloImagenFoto' loading='lazy' onerror=\"this.src='img/Clubes/usuario.png'\" alt='Foto'>";
					datos += "	</div>";
					datos += "		<div class='w40'>"+js.Tecnicos[i].Nombre+"</div>";
					let labelEdad = js.Tecnicos[i].Edad == null ? "--" : js.Tecnicos[i].Edad;
					datos += "		<div class='w5 centradoXY'><strong>"+labelEdad+"</strong></div>";
					datos += "	<div class='w5 h90 centradoXY'>";
					let arrayPuestos = ["","edicionTecnicos","ayudante","medico","oficial","staff"];
					datos += "		<img class='h90' src='img/Menu/"+arrayPuestos[js.Tecnicos[i].Puesto]+".png' alt='"+arrayPuestos[js.Tecnicos[i].Puesto]+"' title='"+textoTecnicos(js.Tecnicos[i].Puesto)+"'>";
					datos += "	</div>";
					if (js.Tecnicos[i].Nacionalidad) {
						datos += "	<div class='w5 h90 centradoXY'>";
						datos += "		<img src='img/Idiomas/"+js.Tecnicos[i].Nacionalidad+".png' class='w70' loading='lazy'>";
						datos += "	</div>";
					}else{
						datos += "	<div class='w5 h90'></div>";
					}
					if (js.Tecnicos[i].Nacionalidad2) {
						datos += "	<div class='w5 h90 centradoXY'>";
						datos += "		<img src='img/Idiomas/"+js.Tecnicos[i].Nacionalidad2+".png' class='w70' loading='lazy'>";
						datos += "	</div>";
					}else{
						datos += "	<div class='w5 h90'></div>";
					}
					datos += "		<div class='w5 botonInfo centradoXY' onclick=\"ventanaDatos('entrenador',"+js.Tecnicos[i].ID_tecnico+")\"><img src='img/Menu/buscar.png'></div>";
					datos += "</div>";
				}
			}
			document.getElementById("cajaMenuDatosTecnicos").innerHTML = datos;
		},
		timeout: 10000,
		error: function() {listadoTecnicos(valor,letra);}
	});
};

function listadoTorneos(valor) {
	if (valor == "Todos") {
		var club = "0";
		var seccion = "0";
		var deporte = "0";
		var temporada = "0";
		var categoria = "0";
		var competicion = "0";
	}else {
		var club = document.getElementById('edicionTorneoNombre').value;
		var seccion = document.getElementById('edicionTorneoAmbito').value;
		var deporte = document.getElementById('edicionTorneoTipo').value;
		var temporada = document.getElementById('edicionTorneoSeccion').value;
		var categoria = document.getElementById('edicionTorneoCategoria').value;
		var competicion = document.getElementById('edicionTorneoTemporada').value;
	}

	$.ajax({
		url: "php/listadoEquipos.php",
		type: 'POST',
		data: {
			club: club,
			seccion: seccion,
			deporte: deporte,
			temporada: temporada,
			categoria: categoria,
			competicion: competicion
		},

		success: function(res){
			var js = JSON.parse(res);

			//construir html
			var datos = "";
			if (js[0] !== "0") {
				for (var i = 0; i < js[0].length; i++) {
					datos += "	<div class='w100 h10 cajaMenu'>";
					datos += "			<div class='w5 h90'>";
					if (js[0][i].Escudo && js[0][i].Escudo !== "defecto.png") {
						datos += "			<img src='img/Clubes/"+valorDeporte(js[0][i].Deporte)+"/Equipos/"+js[0][i].Escudo+"' class='h90' loading='lazy' alt='"+js[0][i].Nombre+"'>";
					}else {
						datos += " 			<img src='img/Clubes/Clubes/defecto.png' class='h90'>";
					}
					datos += " 			</div>";
					datos += "			<div class='w45 h90'><p>"+js[0][i].Nombre+"<br><small class='textoSecundario'>"+js[0][i].Club+"</small></p></div>";
					datos += "			<div class='w10 h90'>"+js[0][i].Temporada+"</div>";

					switch(js[0][i].Competicion){
						case "1":
						case "2":
							var color = "oro";
							break;
						case "3":
						case "4":
						case "5":
						case "6":
						case "7":
						case "8":
							var color = "plata";
							break;
						default:
							var color = "bronce";
							break;
					}
					datos += "			<div class='w30 h90'><p><span style='color:var(--color-"+color+"1);'>"+valorCompeticion(js[0][i].Deporte,js[0][i].Competicion)+"</span><br><!--<img src='img/Menu/Balon "+valorDeporte(js[0][i].Deporte)+".png' class='iconoGenero'>--><img src='img/Menu/"+js[0][i].Seccion+".png' class='iconoGenero'><small>"+valorCategoria(js[0][i].Categoria)+"</small></p></div>";
					datos += "			<div class='w5 h90'>";
					datos += "				<button class='w80 h90 botonInfo centradoXY'><img src='img/Menu/buscar.png'></button>";
					datos += "			</div>";
					datos += "		</div>";
				}
			}else{
				datos += "		<div class='w100 h10 cajaMenu'><p class='centradoXY'>No existen datos para la selección</p></div>";
			}
			//publicar código
			$("#menuDatosEquipos").html(datos);
			$("#menuDatosEquipos").show(datos);
		},
			timeout: 10000,
			error: function() {listadoTorneos(valor);}
	});
};

function cambiarEscudo(event,numero) {
	if (event.target.files.length > 0) {
		var src = URL.createObjectURL(event.target.files[0]);
		var elemento = numero == 0 ? "imgEscudoEdicion" : "imgEscudo"+numero;
		var preview = document.getElementById(elemento);
		preview.src = src;
		preview.style.display = "block";
	}
};

function comprobarDatos(pagina,valor1,valor2,valor3,valor4,valor5) {
	switch (pagina) {
		case "equipo":
			if (valor1 !== "0") {
				if (valor2 !== "0") {
					if (valor3 !== "0") {
						if (valor4 !== "0") {
							//Meter datos en pagina 2
							document.getElementById("loaderMenuGeneralDatos").classList.add("loader");
							$.ajax({
								url: "php/listadoCreacionEquipos.php",
								type: "POST",
								data: {
									club: valor1,
									deporte: valor2,
									seccion: valor3,
									categoria: valor4
								},
								success: function(res){
									document.getElementById("loaderMenuGeneralDatos").classList.remove("loader");
									var js = JSON.parse(res);
									
									datos = "";
									datos += "			<div id='anteriorNivel' class='w10 h100' onclick=\"desplazamientoEdicion(0,'pantalla2','pantalla1')\" ontouchstart=\"inicioPulsacion('anteriorNivel')\" ontouchend=\"finPulsacion('anteriorNivel')\">";
									datos += "				<img class='w70' src='img/Menu/anterior.png'>";
									datos += "			</div>";
									datos += "			<div class='w80 h95 pantallaEdicion centradoXY flexWrap'>";
									datos += "				<div class='w100 h15 cuadroResaltado centradoInlineXY'>";
									datos += "					<div id='logoClub' class='h100 w20 centradoXY'><img id='imgEqClub' class='w80' src='img/Clubes/Clubes/"+js.Club[0].Escudo+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\"></div>";
									datos += "					<div class='w80 h90'>";
									datos += "						<div id='labelEqClub' class='w100 h50'>"+js.Club[0].Nombre+"</div>";
									datos += "						<div class='w100 h50 tituloClub'>";
									datos += "							<div id='labelEqDep' class='w30'>"+valorDeporte(valor2)+"</div>";
									var arraySeccion = Array("","Sección Masculina","Sección Femenina","Sección Mixta");
									datos += "							<div id='labelEqSec' class='w30'><img src='img/Menu/"+valor3+".png' style='height:20px;'>"+arraySeccion[valor3]+"</div>";
									var arrayCategoria = Array("","Primer Equipo","Segundo Equipo","Equipo Senior","Deporte Adaptado","Juvenil","Cadete","Infantil","Alevín","Benjamín","Prebenjamín");
									datos += "							<div id='labelEqCat' class='w40'>"+arrayCategoria[valor4]+"</div>";
									datos += "						</div>";
									datos += "					</div>";
									datos += "				</div>";
									datos += "				<div id='recuadroDatosEquipos' class='w100 h65'>";
									var hoy = new Date();
									var inicio = js.Club[0].Desaparicion !== "0" ? parseInt(js.Club[0].Desaparicion) : hoy.getFullYear() + 1;
									var fundacion = js.Club[0].Fundacion === null ? hoy.getFullYear() - 10 : js.Club[0].Fundacion;

									for (var i = inicio; i >= fundacion; i--) {
										datos += "				<div class='w100 h20 filaLista centradoInlineXY'>";
										datos += "			<form id='formularioEscudo"+i+"' class='w100 h100 centradoInlineXY'>";
										datos += "				<div class='w10 h100 inputTemporada centradoXY'>"+i+"/"+(i+1)+"</div>";
										datos += "				<img id='imgEscudo"+i+"' class='h80 w7' src='img/Clubes/Clubes/defecto.png' alt='escudo' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
										datos += "				<div class='w55 h100 centradoXY flexWrap'>";
										datos += "					<input id='nombreEquipo"+i+"' type='text' name='nombreEquipo"+i+"' maxlength='30' class='h30 inputNombre' value='' placeholder='Nombre Equipo' style='width:92%'>";
										datos += "					<input id='nombreResponsable"+i+"' type='text' name='nombreResponsable"+i+"' maxlength='30' class='w45 h30 inputNombre' value='' placeholder='Responsable Equipo'>";
										datos += "					<input id='nombrePabellon"+i+"' type='text' name='nombrePabellon"+i+"' maxlength='30' class='w45 h30 inputNombre' value='' placeholder='Pabellón Local'>";
										datos += "				</div>";
										datos += "				<label for='archivoEscudo"+i+"' class='h50 w7 labelEscudo pulsable'></label>";
										datos += "					<input id='archivoEscudo"+i+"' type='file' name='archivoEscudo"+i+"' class='h50 w7 inputFile' accept='image/x-png,image/jpeg' onchange=\"cambiarEscudo(event,"+i+");\">";
										datos += "				<div id='copiarA"+i+"' class='h100 w7 centradoXY flexWrap pulsable' onclick=\"copiarFila(0,"+i+")\" ontouchstart=\"inicioPulsacion('copiarA"+i+"')\" ontouchend=\"finPulsacion('copiarA"+i+"')\">";
										datos += "					<img class='h20' src='img/Menu/anterior.png' alt='' style='transform:rotate(-90deg);margin-bottom:-50%'>";
										datos += "					<img class='h60' src='img/Menu/duplicar.png' alt='Copiar Año anterior'>";
										datos += "				</div>";
										datos += "				<div id='copiarS"+i+"' class='h100 w7 centradoXY flexWrap pulsable' onclick=\"copiarFila(1,"+i+")\" ontouchstart=\"inicioPulsacion('copiarS"+i+"')\" ontouchend=\"finPulsacion('copiarS"+i+"')\">";
										datos += "					<img class='h60' src='img/Menu/duplicar.png' alt='Copiar Año Siguiente' style='transform: rotate(180deg)'>";
										datos += "					<img class='h20' src='img/Menu/anterior.png' alt='' style='transform:rotate(90deg); margin-top:-50%'>";
										datos += "				</div>";
										datos += "				<img id='vaciar"+i+"' class='h50 w7 pulsable' src='img/Menu/borrar.png' alt='Vaciar' onclick=\"vaciarFila("+i+")\" ontouchstart=\"inicioPulsacion('vaciar"+i+"')\" ontouchend=\"finPulsacion('vaciar"+i+"')\">";
										datos += "				<img id='guardar"+i+"' class='h50 w7 pulsable' src='img/Menu/guardar.png' alt='Guardar' onclick=\"guardarFila("+i+","+js.Equipo[0].ID_Equipo+","+valor1+","+valor2+","+valor3+","+valor4+")\" ontouchstart=\"inicioPulsacion('guardar"+i+"')\" ontouchend=\"finPulsacion('guardar"+i+"')\">";
										datos += "			</form>";
										datos += "				</div>";
									}
									datos += "				</div>";
									datos += "				<div class='w100 h20 cuadroInfo centradoXY'><p class='w90'> <img src='img/Menu/MVP.png'> Crea o edita temporadas para el equipo de tu selección anterior.<br><strong>Iconografía</strong>: <img class='h90' src='img/Menu/imagen.png' alt='Escudo'>: Subir imagen de escudo, <img class='h90' src='img/Menu/duplicar.png' alt='Copiar' style='transform:rotate(180deg)'>: copiar datos del año anterior, <img class='h90' src='img/Menu/duplicar.png' alt='Copiar'>: copiar datos del año posterior y <img class='h90' src='img/Menu/borrar.png' alt='Vaciar'>: borrar los datos introducidos del año.<br><strong>RECUERDA:</strong> Presiona <img class='h90' src='img/Menu/guardar.png' alt='Guardar'> para que tus cambios queden guardados.</p></div>";
									datos += "			</div>";
									datos += "			<div id='siguienteNivel' class='w10 h100'>";
									datos += "			</div>";
									document.getElementById("pantallaEquipos").innerHTML = datos;

									// Rellenar datos
									for (var i = hoy.getFullYear() + 1; i >= fundacion; i--) {
										for (var j = 0; j < js.Equipo.length; j++) {
											if(js.Equipo[j].Temporada == i){
												var labelEscudo = "imgEscudo"+i;
													document.getElementById(labelEscudo).src = "img/Clubes/"+valorDeporte(valor2)+"/Equipos"+"/"+js.Equipo[j].Escudo;
												var labelNombreEquipo = "nombreEquipo"+i;
													document.getElementById(labelNombreEquipo).value = js.Equipo[j].Nombre;
												var labelNombreResponsable = "nombreResponsable"+i;
													document.getElementById(labelNombreResponsable).value = js.Equipo[j].Responsable;
												var labelNombrePabellon = "nombrePabellon"+i;
													document.getElementById(labelNombrePabellon).value = js.Equipo[j].Pabellon;
											}
										}
									}

									//Ir a página 2
									desplazamientoEdicion(1,'pantalla1','pantalla2');
									eliminarZoom();
								},
								timeout: 10000,
								error: function() {comprobarDatos(pagina,valor1,valor2,valor3,valor4,valor5);}
							});
						}else{
							alert("ERROR: Debes seleccionar una CATEGORÍA");
						}
					}else{
						alert("ERROR: Debes seleccionar una SECCIÓN");
					}
				}else{
					alert("ERROR: Debes seleccionar un DEPORTE");
				}
			}else{
				alert("ERROR: Debes seleccionar un CLUB");
			}
			break;
		case "equipoBasico":
			if (valor1 !== "0") {
				if (valor2 !== "0") {
					if (valor3 !== "0") {
						if (valor4 !== "0") {
							// cambiar icono a guardando
							document.getElementById("imgGuardarEqPersonalizado").src = "img/Menu/grabando.png";

							var dato = document.getElementById("formularioEscudoEdicion");

							var formulario = new FormData(dato);
							formulario.append("nombre",valor1);
							formulario.append("deporte",valor2);
							formulario.append("seccion",valor3);
							formulario.append("categoria",valor4);
							formulario.append("pabellon",valor5);
							formulario.append("archivo",dato[0]);

							$.ajax({
								url: "php/nuevoEquipoPersonalizado.php",
								type: "POST",
								processData: false,
								contentType: false,
								data: formulario,
								success: function(res){
									let js = JSON.parse(res);
									if (js.codigo == "0" || js.codigo == "1") {
										if (js.codigo == "1") { alert(mensajeError(js.codigo)); }
										document.getElementById("imgGuardarEqPersonalizado").src = "img/Menu/ok.png";
										setTimeout(function() {document.getElementById("imgGuardarEqPersonalizado").src = "img/Menu/guardar.png";}, 3000);
										document.getElementById("imgMenuAnterior").src = "img/Menu/siguiente.png";
										document.getElementById("imgMenuAnterior").style.transform = "rotate(180deg)";
										document.getElementById("imgMenuAnterior").style.webkitTransform = "rotate(180deg)"; /* Para navegadores WebKit */
										document.getElementById("imgMenuAnterior").style.msTransform = "rotate(180deg)"; /* Para navegadores de Microsoft */
										document.getElementById("imgMenuAnterior").style.MozTransform = "rotate(180deg)"; /* Para navegadores Firefox */
										document.getElementById("imgMenuAnterior").style.OTransform = "rotate(180deg)"; /* Para navegadores Opera */
									}else{
										alert(mensajeError(js.codigo));
										document.getElementById("imgGuardarEqPersonalizado").src = "img/Menu/guardar.png";
										document.getElementById("imgGuardarEqPersonalizado").classList.add("shake");
									}
								},
								error: function(){
									alert("Sucedió un error y no se han podido guardar los datos. Vuelve a intentarlo más tarde.");
									document.getElementById("imgGuardarEqPersonalizado").src = "img/Menu/guardar.png";
									document.getElementById("imgGuardarEqPersonalizado").classList.add("shake");
								}
							});
						}else{
							alert("ERROR: Debes seleccionar una CATEGORÍA");
						}
					}else{
						alert("ERROR: Debes seleccionar una SECCIÓN");
					}
				}else{
					alert("ERROR: Debes seleccionar un DEPORTE");
				}
			}else{
				alert("ERROR: Debes introducir un NOMBRE para el equipo");
			}
		break;
		case "torneo2":
			/*if (typeof valor1 !== 'undefined') {
				if (typeof valor2 !== 'undefined') {
					if (typeof valor3 !== 'undefined') {
						if (typeof valor4 !== 'undefined') {
							if (typeof valor5 !== 'undefined') {
								mostrarCuadroEdicion("3A");
								desplazamientoEdicion(1,'pantalla2A','pantalla3A');
							}else{
								alert("ERROR: Debes seleccionar el ÁMBITO de la competición");
							}
						}else{
							alert("ERROR: Debes seleccionar una SECCIÓN");
						}
					}else{
						alert("ERROR: Debes seleccionar un DEPORTE");
					}
				}else{
					alert("ERROR: Debes seleccionar la ORGANIZADORA");
				}
			}else{
				alert("ERROR: Debes introducir el NOMBRE de la competición");
			}*/
			if (typeof valor1 !== 'undefined') {
				if (typeof valor2 !== 'undefined') {
					if (typeof valor3 !== 'undefined') {
						mostrarCuadroEdicion("3A");
						desplazamientoEdicion(1,'pantalla2A','pantalla3A');
					}else{ alert("ERROR: Debes seleccionar una SECCIÓN");}
				}else{ alert("ERROR: Debes seleccionar un DEPORTE");}
			}else{ alert("ERROR: Debes introducir el NOMBRE de la competición");}
			break;
		case "torneo3":
			mostrarCuadroEdicion("4A");
			desplazamientoEdicion(1,'pantalla3A','pantalla4A');
			break;
		case "torneo4":
			// Comprobar que están metidos todos los datos
			var sumaCat = sumaPar = sumaPos = 0;
			var sumaCatFases = sumaParFases = sumaPosFases = 0;

			for (var i = 1; i <= leerCookie("edicionTorneoCategorias"); i++) {
				var numeroCategoria = "edicionTorneoNumFases"+i;

				for (var j = 1; j <= leerCookie(numeroCategoria); j++) {
					if (leerCookie("estadoCookiesReglasCat"+i+"Fase"+j) == "2") { sumaCatFases += 1;}
					if (leerCookie("estadoCookiesReglasPar"+i+"Fase"+j) == "2") { sumaParFases += 1;}
					if (leerCookie("estadoCookiesReglasPos"+i+"Fase"+j) == "2") { sumaPosFases += 1;}
				}
				if (leerCookie(numeroCategoria) == sumaCatFases) { sumaCat += 1;}
				if (leerCookie(numeroCategoria) == sumaParFases) { sumaPar += 1;}
				if (leerCookie(numeroCategoria) == sumaPosFases) { sumaPos += 1;}
			}

			var numCategorias = leerCookie("edicionTorneoCategorias");
			//console.log(numCategorias,sumaCat,sumaPar,sumaPos);
			if (sumaCat == numCategorias && sumaPar == numCategorias && sumaPos == numCategorias) {
				mostrarCuadroEdicion('5A');
				desplazamientoEdicion(1,'pantalla4A','pantalla5A');
			}else{
				alert('Debes obtener las 3 validaciones para continuar al siguiente paso');
			}
			break;
	}
};
	function guardarFila(temporada,idEquipo,idClub,deporte,seccion,categoria) {
		// cambiar icono a guardando listadoCreacionEquipos
		document.getElementById("guardar"+temporada).src = "img/Menu/grabando.png";

		// comprobar que están metidos todos los datos
		if (document.getElementById("nombreEquipo"+temporada).value == "") {
			alert("ERROR: Debe incluir un nombre para el Equipo antes de guardar los datos");
			document.getElementById("guardar"+temporada).src = "img/Menu/guardar.png";
		}else {
			var escudoSplit = document.getElementById("imgEscudo"+temporada).src.split("/");
			var escudo = escudoSplit[escudoSplit.length-1];
			var tempEscudo = escudoSplit[escudoSplit.length-2];

			var dato = document.getElementById("formularioEscudo"+temporada);

			var formulario = new FormData(dato);
			formulario.append("club",idClub);
			formulario.append("deporte",deporte);
			formulario.append("seccion",seccion);
			formulario.append("categoria",categoria);
			formulario.append("temporada",temporada);
			formulario.append("idEquipo",idEquipo);
			formulario.append("tempEscudo",tempEscudo);
			formulario.append("escudo",escudo);
			formulario.append("equipo",dato[0].value);
			formulario.append("responsable",dato[1].value);
			formulario.append("pabellon",dato[2].value);
			formulario.append("archivo",dato[3]);

			$.ajax({
				url: "php/nuevoEquipo.php",
				type: "POST",
				processData: false,
				contentType: false,
				data: formulario,

				error: function(){
					alert("Sucedió un error y no se han podido guardar los datos");
					document.getElementById("guardar"+temporada).src = "img/Menu/guardar.png";
					document.getElementById("guardar"+temporada).classList.add("shake");
				},
				success: function(res){
					if (res) {
						alert(res);
						document.getElementById("guardar"+temporada).src = "img/Menu/guardar.png";
						document.getElementById("guardar"+temporada).classList.add("shake");
					}else{
						document.getElementById("guardar"+temporada).src = "img/Menu/ok.png";
						setTimeout(function() {document.getElementById("guardar"+temporada).src = "img/Menu/guardar.png";}, 3000);
						const labelSRC = "imgEscudo"+temporada;
						document.getElementById(labelSRC).src = "img/Clubes/"+textoDeportes(deporte)+"/Equipos/"+tempEscudo+"/"+escudo;
					}
				}
			});
		}
	};
	function vaciarFila(temporada) {
		var array = Array("Equipo","Responsable","Pabellon");

		for (var i = 0; i < array.length; i++) {
			document.getElementById("nombre"+array[i]+temporada).value = "";
		}
		document.getElementById("imgEscudo"+temporada).src = "img/Clubes/Clubes/defecto.png";
	};
	function copiarFila(direccion,temporada) {
		switch (direccion){
			case 0:
				var temporadaAnt = temporada + 1; // Coger datos del año siguiente
				break;
			case 1:
				var temporadaAnt = temporada - 1; // Coger datos del año pasado
				break;
		}
		var array = Array("Equipo","Responsable","Pabellon");

		for (var i = 0; i < array.length; i++) {
			document.getElementById("nombre"+array[i]+temporada).value = document.getElementById("nombre"+array[i]+temporadaAnt).value;
		}
		document.getElementById("imgEscudo"+temporada).src = document.getElementById("imgEscudo"+temporadaAnt).src;

	}

function mostrarCuadroEdicion(pagina) {
	switch (pagina) {
		case "3A":
			datos = "";
			datos += "		<div id='anteriorNivel' class='w10 h100' onclick=\"desplazamientoEdicion(0,'pantalla3A','pantalla2A')\" ontouchstart=\"inicioPulsacion('anteriorNivel')\" ontouchend=\"finPulsacion('anteriorNivel')\">";
			datos += "			<img class='w70' src='img/Menu/anterior.png'>";
			datos += "		</div>";
			datos += "		<div class='w80 h95 pantallaEdicion'>";
			datos += "			<div class='w100 h80'>";
			datos += "				<img class='logoEdicion' src='img/Menu/Clasificaciones.png'>";
			datos += "				<div class='barraProgreso'><div class='progresoBarra w30'></div></div>";
			datos += "				<div class='recuadroEdicionTorneo'>";
			switch (leerCookie("Crear nuevo")) {
				case "Campeonato":
					datos += " 		<div id='indicadorCategorias' class='w50 centradoInlineXY'>";
					datos += "			<div class='w50 h100 centradoInlineXY'>";
					datos += "				<select id='temporadaCategoria' value='"+fechaActual+"' onchange=\"crearCookie('edicionTorneoTemporada',this.value)\">";
					var fechaActual = new Date().getFullYear();
					var fechaLabel = Array (fechaActual+2,fechaActual+1, fechaActual-1, fechaActual-2, fechaActual-3, fechaActual-4, fechaActual-5);
					datos += "					<option value='"+fechaLabel[1]+"'>"+fechaLabel[1]+"/"+fechaLabel[0]+"</option>";
					datos += "					<option value='"+fechaActual+"'>"+fechaActual+"/"+fechaLabel[1]+"</option>";
					datos += "					<option value='"+fechaLabel[2]+"'>"+fechaLabel[2]+"/"+fechaActual+"</option>";
					datos += "					<option value='"+fechaLabel[3]+"'>"+fechaLabel[3]+"/"+fechaLabel[2]+"</option>";
					datos += "					<option value='"+fechaLabel[4]+"'>"+fechaLabel[4]+"/"+fechaLabel[3]+"</option>";
					datos += "					<option value='"+fechaLabel[5]+"'>"+fechaLabel[5]+"/"+fechaLabel[4]+"</option>";
					datos += "				</select>"
					datos += "			</div>";
					datos += "			<div class='w50 h100 centradoInlineXY'>";
					datos += "				<input id='numeroCategorias' type='number' min='0' value='0' onchange=\"mostrarCategorias(this.value)\">";
					datos += "				<label for='numeroCategorias'> Categorías</label>";
					datos += "			</div>";
					datos += "		</div>";
					datos += "		<div id='cuadro3A' class='w100 h100 centradoXY flexWrap'></div>"
					break;
				case "Categoria":
					//Buscar con Ajax los datos de categorías según el ID del campeonato
					datos += "Estoy en la construcción de Categorías";
					break;
				default:
					datos += "Estamos en modo default: "+leerCookie("Crear nuevo");
					break;
			}
			datos += "				</div>";
			datos += "			</div>";
			datos += "			<div class='w100 h20 cuadroInfo centradoXY'><p class='w90'> <img src='img/Menu/MVP.png'> Indica la temporada base del torneo (luego podrás añadir nuevas temporadas).<br>Selecciona también el número total de categorías/divisiones que va a tener la competición y añádele el nombre y logotipo oficial de cada una para identificarlas mejor.<br><small><em>IMPORTANTE: No confundas las CATEGORÍAS o DIVISIONES del torneo con las distintas FASES que pueda tener cada categoría o división (que serán configuradas en el siguiente paso).</em></small></p></div>";
			datos += "		</div>";
			datos += "		<div id='siguienteNivel' class='w10 h100' onclick=\"comprobarDatos('torneo3',leerCookie('edicionTorneoNombre'))\" ontouchstart=\"inicioPulsacion('siguienteNivel')\" ontouchend=\"finPulsacion('siguienteNivel')\">";
			datos += "			<img class='w70' src='img/Menu/siguiente.png'>";
			datos += "		</div>";

			$("#pantallaNuevoTorneo3A").html(datos);
			
			// Mostrar datos utilizados o por defecto
			if (leerCookie('edicionTorneoTemporada')) {
				var valorLabel = leerCookie('edicionTorneoTemporada');
				$("#temporadaCategoria").val(valorLabel);
			}else{
				crearCookie('edicionTorneoTemporada',fechaActual);
				$("#temporadaCategoria").val(fechaActual);
			}
			if (leerCookie('edicionTorneoCategorias')) {
				$("#numeroCategorias").val(leerCookie('edicionTorneoCategorias'));
				mostrarCategorias(leerCookie('edicionTorneoCategorias'));
			}else{
				crearCookie("edicionTorneoCategorias","0");
				mostrarCategorias("0");
			}
			
			break;

		case "4A":
			datos = "";
			datos += "		<div id='anteriorNivel' class='w10 h100' onclick=\"desplazamientoEdicion(0,'pantalla4A','pantalla3A')\" ontouchstart=\"inicioPulsacion('anteriorNivel')\" ontouchend=\"finPulsacion('anteriorNivel')\">";
			datos += "			<img class='w70' src='img/Menu/anterior.png'>";
			datos += "		</div>";
			datos += "		<div id='pantallaEdicion4A' class='w80 h95 pantallaEdicion'>";
			datos += "			<div class='w100 h80'>";
			datos += "				<img class='logoEdicion' src='img/Menu/Clasificaciones.png'>";
			datos += "				<div class='barraProgreso'><div class='progresoBarra w60'></div></div>";
			datos += "				<div class='recuadroEdicionTorneo centradoXY flexWrap'>";
			datos += "					<div id='cuadroCategorias' class='spaceAroundXY w80 h15'>";
			for (var i = 1; i <= leerCookie("edicionTorneoCategorias"); i++) {
				var nombre = "edicionTorneoNombreCat"+i;
				datos += "					<div id='cuadroCategoria"+i+"' class='h100 cuadroDeCategorias centradoXY flexWrap' onclick=\"mostrarCuadroFases("+i+")\" ontouchstart=\"inicioPulsacion('cuadroCategoria"+i+"')\" ontouchend=\"finPulsacion('cuadroCategoria"+i+"')\">";
				datos += "						<label id='cartelCategoria"+i+"' class='h60 centradoXY'>"+leerCookie(nombre)+"</label>";
				datos += "						<div class='w100 h40 centradoInlineXY'>";
				var numeroCategoria = "edicionTorneoNumFases"+i;
				if (leerCookie(numeroCategoria)) {
					var valor = leerCookie(numeroCategoria);
				}else{
					var valor = "0";
				}
				datos += "							<label id='labelcartelCategoria"+i+"' class='labelFases w20'>"+valor+"</label>";
				datos += "							<img id='testerReglas"+i+"' class='w15 h70' src='img/Menu/error.png' alt='Estado Reglas Fase'>";
				datos += "							<img id='testerPartido"+i+"' class='w15 h70' src='img/Menu/error.png' alt='Estado Reglas Partido'>";
				datos += "							<img id='testerEquipos"+i+"' class='w15 h70' src='img/Menu/error.png' alt='Estado Listado Equipos'>";
				datos += "						</div>";
				datos += "					</div>";
			}
			datos += "					</div>";
			datos += " 					<div id='cuadroDatosFases' class='w100 h80 centradoXY flexWrap'>";
			datos += "					</div>";
			datos += "				</div>";
			datos += "			</div>";
			datos += "			<div class='w100 h20 cuadroInfo centradoXY'><p class='w90'> <img src='img/Menu/MVP.png'> Es el momento de configurar todas las reglas de cada CATEGORIA y sus FASES. Hasta que no tengas validadas todas las CATEGORIAS no podrás avanzar al siguiente paso. Cada CATEGORIA empieza por la FASE 1, pero continúa por la FASE o CATEGORIA que indiques en las opciones.<br><br><small><em>CUIDADO: Esta es una parte delicada del proceso. Debes tener mucho cuidado para que todas las opciones sean correctas.</em></small></p></div>";
			datos += "		</div>";
			datos += "	<div id='siguienteNivel' class='w10 h100' onclick=\"comprobarDatos('torneo4')\" ontouchstart=\"inicioPulsacion('siguienteNivel')\" ontouchend=\"finPulsacion('siguienteNivel')\">";
			datos += "			<img class='w70' src='img/Menu/siguiente.png'>";
			datos += "		</div>";
			datos += "		<div id='fondoReglas' class='fondoReglas w100 h100'>";
			datos += "			<div class='ventanaReglas w90 h90'>";
			datos += "			</div>";
			datos += "		</div>";

			$("#pantallaNuevoTorneo4A").html(datos);

			for (var i = 1; i <= leerCookie("edicionTorneoCategorias"); i++) {
				comprobarTodasCookies(i);
			}
			break;
		case "5A":
			datos = "";
			datos += "		<div id='anteriorNivel' class='w10 h100' onclick=\"desplazamientoEdicion(0,'pantalla5A','pantalla4A')\" ontouchstart=\"inicioPulsacion('anteriorNivel')\" ontouchend=\"finPulsacion('anteriorNivel')\">";
			datos += "			<img class='w70' src='img/Menu/anterior.png'>";
			datos += "		</div>";
			datos += "		<div id='pantallaEdicion5A' class='w80 h95 pantallaEdicion'>";
			datos += "			<img class='logoEdicion' src='img/Menu/Clasificaciones.png'>";
			datos += "			<div class='barraProgreso'><div class='progresoBarra w80'></div></div>";
			datos += "			<div>Seleccionar categoria</div>";
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		///////////////////////////////////// METER cuadros para seleccionar la categoría
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
			var categoria = "1"; // Categoria seleccionada
			datos += "			<div class='w100 h80 centradoXY flexWrap'>";
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		///////////////////////////////////// METER LA OPCIÓN DE GENERAR LA 1ª JORNADA DE FORMA MANUAL O DE FORMA ALEATORIA
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
			switch (leerCookie("edicionTorneoTipo"+categoria+"Fase1")) {
				case "1":
					datos += "		<div class='w100 h10 centradoInlineXY'>Configuración de la Jornada 1 de la categoría "+categoria+"</div>";
					datos += "		<div class='menuPrimeraJornada w100 h80 centradoXY flexWrap'>";
					var numParticipantes = leerCookie("edicionTorneoParticipantes"+categoria+"Fase1");
					for (var i = 1; i <= Math.round(numParticipantes/2); i++) {
						datos += "		<div class='w90 h30 centradoInlineXY' style='border-top: 3px solid var(--color-corporativo-morado); border-bottom: 3px solid var(--color-corporativo-rosa); border-radius: 20px; padding: 1%;background: rgba(0,0,0,.2);'>";
						datos += "			<div class='w40 h100 centradoXY flexWrap'>";
						datos += "				<img id='img"+((2*i)-1)+"' src='' alt='' class='w30 h75'>";
						datos += "				<select name='edicionTorneoCalendario"+((2*i)-1)+"Cat"+categoria+"Fase1' id='edicionTorneoCalendario"+((2*i)-1)+"Cat"+categoria+"Fase1' class='w75' onchange=\"mostrarEscudo(this.value,"+((2*i)-1)+","+categoria+")\">";
						datos += "					<option value='0'>Elegir equipo...</option>";
						for (var j = 1; j <= numParticipantes; j++) {
							datos += "				<option value='"+j+"'>"+leerCookie('edicionTorneoEquipo'+j+'NombreCat'+categoria+'Fase1')+"</option>";
						}
						datos += "				</select>";
						datos += "			</div>";
						datos += "			<div class='w20 h100 centradoXY flexWrap'>";
						datos += "				<input id='edicionTorneoJornada1Partido"+i+"Fecha' type='date' onchange=\"crearCookie('edicionTorneoJornada1Partido"+i+"Fecha',this.value)\">";
						datos += "				<input id='edicionTorneoJornada1Partido"+i+"Hora' type='time' onchange=\"crearCookie('edicionTorneoJornada1Partido"+i+"Hora',this.value)\">";
						datos += "			</div>";
						datos += "			<div class='w40 h100 centradoXY flexWrap'>";
						datos += "				<img id='img"+(2*i)+"' src='' alt='' class='w30 h75'>";
						datos += "				<select name='edicionTorneoCalendario"+(2*i)+"Cat"+categoria+"Fase1' id='edicionTorneoCalendario"+(2*i)+"Cat"+categoria+"Fase1' class='w75' onchange=\"mostrarEscudo(this.value,"+(2*i)+","+categoria+")\">";
						datos += "					<option value='0'>Elegir equipo...</option>";
						for (var j = 1; j <= numParticipantes; j++) {
							datos += "				<option value='"+j+"'>"+leerCookie('edicionTorneoEquipo'+j+'NombreCat'+categoria+'Fase1')+"</option>";
						}
						datos += "				</select>";
						datos += "			</div>";
						datos += "		</div>";
					}
					datos += "		</div>";
					break;
				case "2":
					datos += "		<div class='w100 h10 centradoInlineXY'>Configuración de la 1ª Ronda</div>";
					datos += "		<div class='w100 h80 centradoXY flexWrap'>";
					datos += "			<div class='w90 h10'>";
					switch (leerCookie("edicionTorneoParticipantes"+categoria+"Fase1")) {
						case 1:
						case 2:
							break;
						case 3:
						case 4:
							break;

					}
					datos += "		<div class='w90 h30 centradoInlineXY' style='border-top: 3px solid var(--color-corporativo-morado); border-bottom: 3px solid var(--color-corporativo-rosa); border-radius: 20px; padding: 1%;background: rgba(0,0,0,.2);'>";
					datos += "			<div class='w40 h100 centradoXY flexWrap'>";
					datos += "				<img id='imgA1' src='' alt='' class='w30 h75'>";
					datos += "				<select name='edicionTorneoCalendarioA1Cat"+categoria+"Fase1' id='edicionTorneoCalendarioA1Cat"+categoria+"Fase1' class='w75' onchange=\"mostrarEscudo(this.value,"+((2*i)-1)+","+categoria+")\">";
					datos += "					<option value='0'>Elegir equipo...</option>";
					for (var j = 1; j <= numParticipantes; j++) {
						datos += "				<option value='"+j+"'>"+leerCookie('edicionTorneoEquipo'+j+'NombreCat'+categoria+'Fase1')+"</option>";
					}
					datos += "				</select>";
					datos += "			</div>";
					datos += "			<div class='w20 h100 centradoXY flexWrap'>";
					datos += "				<input id='edicionTorneoJornada1PartidoA1Fecha' type='date' onchange=\"crearCookie('edicionTorneoJornada1PartidoA1Fecha',this.value)\">";
					datos += "				<input id='edicionTorneoJornada1PartidoA1Hora' type='time' onchange=\"crearCookie('edicionTorneoJornada1PartidoA1Hora',this.value)\">";
					datos += "			</div>";
					datos += "			<div class='w40 h100 centradoXY flexWrap'>";
					datos += "				<img id='imgA2' src='' alt='' class='w30 h75'>";
					datos += "				<select name='edicionTorneoCalendarioA2Cat"+categoria+"Fase1' id='edicionTorneoCalendarioA2Cat"+categoria+"Fase1' class='w75' onchange=\"mostrarEscudo(this.value,"+(2*i)+","+categoria+")\">";
					datos += "					<option value='0'>Elegir equipo...</option>";
					for (var j = 1; j <= numParticipantes; j++) {
						datos += "				<option value='"+j+"'>"+leerCookie('edicionTorneoEquipo'+j+'NombreCat'+categoria+'Fase1')+"</option>";
					}
					datos += "				</select>";
					datos += "			</div>";
					datos += "		</div>";
					datos += "				Estás en la opción de torneo eliminatorio";
					datos += "			</div>";
					datos += "		</div>";
					break;
			}
			//datos += "				Bienvenido al paso 5 <br>Aquí vas a meter la primera jornada con los equipos que ya has introducido<br>Hay que mirar el tema de las fechas y horarios<br><br><br>HAY QUE PONER EN LA BÚSQUEDA DE EQUIPOS DEL PASO ANTERIOR EL DEPORTE POR DEFECTO (EL QUE SE PUSO AL PRINCIPIO: COOKIE: edicionTorneoDeporte)";
			datos += "			</div>";
			datos += "			<div class='w100 h20 cuadroInfo centradoXY'><p class='w90'> <img src='img/Menu/MVP.png'> Es el momento de configurar todas las reglas de cada CATEGORIA y sus FASES. Hasta que no tengas validadas todas las CATEGORIAS no podrás avanzar al siguiente paso. Cada CATEGORIA empieza por la FASE 1, pero continúa por la FASE o CATEGORIA que indiques en las opciones.<br><br><small><em>CUIDADO: Esta es una parte delicada del proceso. Debes tener mucho cuidado para que todas las opciones sean correctas.</em></small></p></div>";
			datos += "		</div>";
			datos += "		<div id='siguienteNivel' class='w10 h100' onclick=\"alert('Debes terminar esta página para continuar al siguiente paso')\" ontouchstart=\"inicioPulsacion('siguienteNivel')\" ontouchend=\"finPulsacion('siguienteNivel')\">";
			datos += "			<img class='w70' src='img/Menu/siguiente.png'>";
			datos += "		</div>";
			
			$("#pantallaNuevoTorneo5A").html(datos);

			// Mostrar datos ya introducidos
			var numParticipantes = leerCookie("edicionTorneoParticipantes"+categoria+"Fase1");
			for (var i = numParticipantes; i > 0; i--) {
				for (var j = numParticipantes; j > 0; j--) {
					if (leerCookie("edicionTorneoEquipo"+i+"IDCat"+categoria+"Fase1") == leerCookie("edicionTorneoJornada1Equipo"+j)) {
						mostrarEscudo(i,j,categoria);
						if (leerCookie("edicionTorneoTipo"+categoria+"Fase1") == "1") {
							document.getElementById("edicionTorneoCalendario"+i+"Cat"+categoria+"Fase1").value = j;
						}else{
							document.getElementById("edicionTorneoCalendarioA"+i+"Cat"+categoria+"Fase1").value = j;
						}
					}
				}
			}
			for (var i = 1; i <= Math.round(numParticipantes/2); i++) {
				if (leerCookie("edicionTorneoTipo"+categoria+"Fase1") == "1") {
					document.getElementById("edicionTorneoJornada1Partido"+i+"Fecha").value = leerCookie("edicionTorneoJornada1Partido"+i+"Fecha");
					document.getElementById("edicionTorneoJornada1Partido"+i+"Hora").value = leerCookie("edicionTorneoJornada1Partido"+i+"Hora");
				}else if (leerCookie("edicionTorneoTipo"+categoria+"Fase1") == "1") {
////////////////////////// Aquí no coge bien el id porque no lo he definido bien el tema de las categorias, el número de partido....`
					document.getElementById("edicionTorneoJornada1PartidoA"+i+"Fecha").value = leerCookie("edicionTorneoJornada1PartidoA"+i+"Fecha");
					document.getElementById("edicionTorneoJornada1PartidoA"+i+"Hora").value = leerCookie("edicionTorneoJornada1PartidoA"+i+"Hora");
				}
			}

			break;
	}
};
	function mostrarEscudo(posicion,posicionEquipo,categoria) {
		var archivo = leerCookie("edicionTorneoEquipo"+posicion+"EscudoCat"+categoria+"Fase1");
		switch (leerCookie("edicionTorneoDeporte")) {
			case "1":
				var deporte = "Balonmano";
				break;
			case "2":
				var deporte = "Baloncesto";
				break;
			case "3":
				var deporte = "Futsal";
				break;
		}
		var imagen = "img/Clubes/"+deporte+"/Equipos/"+leerCookie("edicionTorneoTemporada")+"/"+archivo;
		var id = "img"+posicionEquipo;

		document.getElementById(id).src = imagen;

		// Guardar cookie de la elección
		crearCookie("edicionTorneoJornada1Equipo"+posicionEquipo,leerCookie("edicionTorneoEquipo"+posicion+"IDCat"+categoria+"Fase1"));
	};

	function mostrarCategorias(numero) {
		crearCookie("edicionTorneoCategorias",numero);
		datosCat = "";
		for (var i = 1; i <= numero; i++) {
			datosCat += "<div class='w80 h20 centradoInlineXY'>";
			datosCat += " 	<label>"+i+"ª</label>";
			datosCat += " 	<div class='w60 h100 cuadros'>";
			var categoria = "edicionTorneoNombreCat"+i;
			if (leerCookie(categoria)) {
				var valor = leerCookie(categoria);
			}else{
				var valor = "";
			}
			datosCat += "		<input id='inputNombre"+i+"' class='w100 inputNombre' type='text' name='nombre"+i+"' value='"+valor+"' maxlength='30' placeholder='Introduce nombre de categoría' onchange=\"edicionTorneoNombre(); crearCookie('edicionTorneoNombreCat"+i+"',this.value)\">";
			datosCat += "	</div>";
			datosCat += "	<div class='w30 h100 cuadroLogo centradoInlineXY'>";
			var logo = "edicionTorneoLogoCat"+i;
			if (leerCookie(logo)) {
				var valor = leerCookie(logo);
			}else{
				var valor = "img/Menu/Logos/campeonato.png";
			}
			datosCat += "		<img id='imgEscudo"+i+"' class='w35 imgEscudo' src='"+valor+"'>";
			datosCat += "		<label for='edicionTorneoLogo"+i+"'>Añadir Logo...</label>";
			datosCat += "		<input id='edicionTorneoLogo"+i+"' class='inputFile' type='file' name='edicionTorneoLogo"+i+"' accept='image/x-png,image/jpeg' onchange=\"cambiarEscudo(event,"+i+"); crearCookie('edicionTorneoLogoCat"+i+"',this.files[0].name)\">";
			datosCat += "	</div>";
			datosCat += "</div>";
		}
		$("#cuadro3A").html(datosCat);
		eliminarZoom();
	};

	function mostrarCuadroFases(categoria) {
		for (var i = 1; i <= leerCookie("edicionTorneoCategorias"); i++) {
			var id = "cuadroCategoria"+i;
			document.getElementById(id).style.background = "none";
			document.getElementById(id).style.border = "2px solid var(--color-corporativo-morado)";

			var cartel = "cartelCategoria"+i;
			var labelcartel = "labelcartelCategoria"+i;
			document.getElementById(cartel).style.color = "var(--color-corporativo-morado)";
			document.getElementById(labelcartel).style.color = "var(--color-corporativo-morado)";
		}

		var id = "cuadroCategoria"+categoria;
		document.getElementById(id).style.background = "var(--color-corporativo-rosa)";
		document.getElementById(id).style.border = "2px solid var(--color-corporativo-rosa)";

		var cartel = "cartelCategoria"+categoria;
		var labelcartel = "labelcartelCategoria"+categoria;
		document.getElementById(cartel).style.color = "var(--color-texto)";
		document.getElementById(labelcartel).style.color = "var(--color-texto)";

		var nombreCookie = "edicionTorneoNumFases"+categoria;
		if (leerCookie(nombreCookie)) {
			var fases = leerCookie(nombreCookie);
		}else{
			var fases = "0";
		}

		datosFase = "";
		datosFase += " 						<div class='w30 h15 centradoInlineXY'>";
		datosFase += "							<input id='inputNumeroFases"+categoria+"' name='fasesTorneo"+categoria+"' type='number' min='0' max='20' value='"+fases+"' onchange=\"mostrarFases("+categoria+", this.value); crearCookie('edicionTorneoNumFases"+categoria+"', this.value)\">";
		datosFase += "							<label>Fases</label>";
		datosFase += "						</div>";
		datosFase += " 						<div id='cuadroFases' class='w90 h70'>";
		datosFase += "						</div>";

		$("#cuadroDatosFases").html(datosFase);

		// Mostrar valores ya incluidos
		document.getElementById('inputNumeroFases'+categoria).value = fases;
		if (fases !== "0") {
			mostrarFases(categoria, fases);
		}
	};

		function edicionTorneoNombre() {
			if (!document.getElementById("inputNombre")) {
				var nombre = "";	
			}else{
				var nombre = document.getElementById("inputNombre").value;
			}
			crearCookie('edicionTorneoNombre',nombre);
		};

		function mostrarFases(categoria,fases) {
			// Mostrar cambio de valor en cuadro superior
			var labelcartel = "#labelcartelCategoria"+categoria;
			var valorLabel = fases;
			$(labelcartel).html(valorLabel);

			// Crear filas
			var arrayFases = [];
			for (var j = 1; j < fases+1; j++) {
				arrayFases.push(j);
			}
			var datos = "";
			for (var i = 0; i < fases; i++) {
				datos += "<div class='w100 h20 fase spaceBetweenXY'>";
				datos += "	<div class='numFase w10 h100 centradoXY'>FASE "+arrayFases[i]+"</div>";
				datos += "	<select id='nom"+categoria+"Fase"+arrayFases[i]+"' class='w20 h90' onchange=\"crearCookie('edicionTorneoNombre"+categoria+"Fase"+arrayFases[i]+"',this.value)\">";
				datos += "		<option value='' default>Nombre de Fase</option>";
				datos += "		<option value='1' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",1)\">Fase regular</option>";
				datos += "		<option value='2' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2)\">Fase previa</option>";
				datos += "		<option value='3'>Playoff</option>";
				datos += "		<option value='4'>Fase ascenso</option>";
				datos += "		<option value='5'>Fase descenso</option>";
				datos += "		<option value='6' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2)\">Eliminatoria</option>";
				datos += "		<option value='7' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2)\">Fase final</option>";
				datos += "		<option value='8' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2,4)\">Final Four</option>";
				datos += "		<option value='9' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2)\">1ª Ronda</option>";
				datos += "		<option value='10' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2)\">2ª Ronda</option>";
				datos += "		<option value='11' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2)\">3ª Ronda</option>";
				datos += "		<option value='12' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2,128)\">1/64</option>";
				datos += "		<option value='13' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2,64)\">1/32</option>";
				datos += "		<option value='14' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2,32)\">1/16</option>";
				datos += "		<option value='15' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2,16)\">1/8</option>";
				datos += "		<option value='16' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2,8)\">1/4</option>";
				datos += "		<option value='17' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2,4)\">Semifinal</option>";
				datos += "		<option value='18' onclick=\"rellenarFases("+categoria+","+arrayFases[i]+",2,2)\">Final</option>";
				datos += "	</select>";
				datos += "	<select id='tip"+categoria+"Fase"+arrayFases[i]+"' class='w15 h90' onchange=\"crearCookie('edicionTorneoTipo"+categoria+"Fase"+arrayFases[i]+"',this.value)\">";
				datos += "		<option value=''>Tipo de Fase</option>";
				datos += "		<option value='1'>Liga</option>";
				datos += "		<option value='2'>Eliminatoria</option>";
				datos += "	</select>";
				//datos += "	<div id='num"+categoria+"Fase"+arrayFases[i]+"' class='w20 centradoInlineXY'>";
				//datos += "		<input id='edicionTorneoParticipantes"+categoria+"Fase"+arrayFases[i]+"' name='edicionTorneoParticipantes"+categoria+"Fase"+arrayFases[i]+"' type='number' min='1' onchange=\"crearCookie('edicionTorneoParticipantes"+categoria+"Fase"+arrayFases[i]+"',this.value)\"><label> Grupos</label>";
				//datos += "	</div>";
				var cookie = "edicionTorneoNombreCat"+categoria;
				datos += "	<div id='tor"+categoria+"Fase"+arrayFases[i]+"' class='w10 h90 cuadroReglas' onclick=\"mostrarReglas("+categoria+",'"+leerCookie(cookie)+"','Fase',"+arrayFases[i]+")\">Reglas<br>fase</div>";
				datos += "	<div id='par"+categoria+"Fase"+arrayFases[i]+"' class='w10 h90 cuadroReglas' onclick=\"mostrarReglas("+categoria+",'"+leerCookie(cookie)+"','Partido',"+arrayFases[i]+")\">Reglas<br>partidos</div>";
				datos += "	<div id='pos"+categoria+"Fase"+arrayFases[i]+"' class='w10 h90 cuadroReglas' onclick=\"mostrarReglas("+categoria+",'"+leerCookie(cookie)+"','Participantes',"+arrayFases[i]+")\">Lista<br>Equipos</div>";
				datos += "</div>";
			}

			// Publicar
			$("#cuadroFases").html(datos);

			// Mostrar datos ya metidos
			for (var i = 1; i <= fases; i++) {
				if (leerCookie("edicionTorneoNombre"+categoria+"Fase"+i)) {
					var nombreFase = "#nom"+categoria+"Fase"+i;
					$(nombreFase).val(leerCookie("edicionTorneoNombre"+categoria+"Fase"+i));
				}
				if (leerCookie("edicionTorneoTipo"+categoria+"Fase"+i)) {
					var tipoFase = "#tip"+categoria+"Fase"+i;
					$(tipoFase).val(leerCookie("edicionTorneoTipo"+categoria+"Fase"+i));
				}
				/*if (leerCookie("edicionTorneoParticipantes"+categoria+"Fase"+i)) {
					var fase = "#edicionTorneoParticipantes"+categoria+"Fase"+i;
					$(fase).val(leerCookie("edicionTorneoParticipantes"+categoria+"Fase"+i));
				}*/

				switch (leerCookie("estadoCookiesReglasCat"+categoria+"Fase"+i)) {
					case "1":
						document.getElementById("tor"+categoria+"Fase"+i).style.color = "var(--color-corporativo-rosa)";
						break;
					case "2":
						document.getElementById("tor"+categoria+"Fase"+i).style.color = "var(--color-texto)";
						break;
				}
				switch (leerCookie("estadoCookiesReglasPar"+categoria+"Fase"+i)) {
					case "1":
						document.getElementById("par"+categoria+"Fase"+i).style.color = "var(--color-corporativo-rosa)";
						break;
					case "2":
						document.getElementById("par"+categoria+"Fase"+i).style.color = "var(--color-texto)";
						break;
				}
				switch (leerCookie("estadoCookiesReglasPos"+categoria+"Fase"+i)) {
					case "1":
						document.getElementById("pos"+categoria+"Fase"+i).style.color = "var(--color-corporativo-rosa)";
						break;
					case "2":
						document.getElementById("pos"+categoria+"Fase"+i).style.color = "var(--color-texto)";
						break;
				}

				comprobarCadaCookie("0","0",categoria,i);
				comprobarTodasCookies(i);
			}

			$("#cuadroFases").show(datos);
		};
			function rellenarFases(categoria,fase,tipo,participantes) {
				var tip = "tip"+categoria+"Fase"+fase;
				document.getElementById(tip).value = tipo;
				crearCookie("edicionTorneoTipo"+categoria+"Fase"+fase,tipo);

				var particip = "edicionTorneoParticipantes"+categoria+"Fase"+fase;
				document.getElementById(particip).value = participantes;
				crearCookie("edicionTorneoParticipantes"+categoria+"Fase"+fase,participantes);
			};

			function mostrarReglas(categoria,nombreCategoria,tipo,fase) {				
				// Abrir ventana modal
				document.getElementById("pantallaEdicion4A").style.pointerEvents = "none";
				document.getElementById("fondoReglas").style.opacity = 1;
				document.getElementById("fondoReglas").style.pointerEvents = "auto";

				// Ver datos
				var datos = "";
				switch(tipo){
					case 'Fase':
						datos += "		<div class='w100 h20 centradoXY'><h1>Configurar Reglas de '"+nombreCategoria+"': "+tipo+" "+fase+"</h1></div>";
						datos += "		<div class='w100 h70 cuerpoCentral centradoXY flexWrap'>";
						var tipoFase = leerCookie("edicionTorneoTipo"+categoria+"Fase"+fase);
						switch(tipoFase){
							case "1"://liga
								datos += "	<div class='w100 h60 centradoInlineXY'>";
								datos += "		<div class='w40 h100 spaceAroundXY flexWrap'>";
								datos += "			<div class='h23 w100 spaceAroundXY'>";
								datos += "				<label class='w55'>Vueltas: </label>";
								datos += "				<div class='radio'>";
								datos += "					<input id='edicionTorneoVueltas1"+categoria+"Fase"+fase+"' type='radio' name='vueltasCat"+categoria+"Fase"+fase+"' onclick=\"crearCookie('edicionTorneoVueltas"+categoria+"Fase"+fase+"','1')\">";
								datos += "					<label id='labeledicionTorneoVueltas1"+categoria+"Fase"+fase+"' for='edicionTorneoVueltas1"+categoria+"Fase"+fase+"'>1</label>";
								datos += "					<input id='edicionTorneoVueltas2"+categoria+"Fase"+fase+"' type='radio' name='vueltasCat"+categoria+"Fase"+fase+"' onclick=\"crearCookie('edicionTorneoVueltas"+categoria+"Fase"+fase+"','2')\">";
								datos += "					<label id='labelvueltas2Cat"+categoria+"Fase"+fase+"' for='edicionTorneoVueltas2"+categoria+"Fase"+fase+"'>2</label>";
								datos += "				</div>";
								datos += "			</div>";
								datos += "			<div class='h23 w100 spaceAroundXY'>";
								datos += "				<label class='w55'>Reglas desempate: </label>";
								datos += "				<div class='radio'>";
								datos += "					<input id='edicionTorneoDesempate1"+categoria+"Fase"+fase+"' type='radio' name='desempate"+categoria+"Fase"+fase+"' onclick=\"crearCookie('edicionTorneoDesempate"+categoria+"Fase"+fase+"','1')\">";
								datos += "					<label id='labeldesempate1"+categoria+"Fase"+fase+"' for='edicionTorneoDesempate1"+categoria+"Fase"+fase+"'><small>Oficiales</small></label>";
								datos += "					<input id='edicionTorneoDesempate2"+categoria+"Fase"+fase+"' type='radio' name='desempate"+categoria+"Fase"+fase+"' onclick=\"crearCookie('edicionTorneoDesempate"+categoria+"Fase"+fase+"','2')\">";
								datos += "					<label id='labeldesempate2"+categoria+"Fase"+fase+"' for='edicionTorneoDesempate2"+categoria+"Fase"+fase+"'><small>Personalizadas</small></label>";
								datos += "				</div>";
								datos += "			</div>";
								datos += "			<div class='h23 w100 centradoXY'>";
								datos += "				<button onclick=\"mostrarCuadroPosiciones('cajaEventos')\">Añadir Eventos antes de finalizar la liga</button>";
								datos += "			</div>";
								/*datos += "			<div class='h23 w100 centradoXY'>";
								datos += "				<button onclick=\"mostrarCuadroPosiciones('cajaPosiciones')\">Clasificaciones Finales</button>";
								datos += "			</div>";*/
								datos += "		</div>";
								datos += "		<div class='w60 h100 spaceAroundXY'>";
								datos += "			<div id='cajaPosiciones' class='cajaPuestos centradoXY flexWrap h100 w90 invisible'>";
								for (var i = 1; i < parseInt(leerCookie("edicionTorneoParticipantes"+categoria+"Fase"+fase))+1; i++) {
									datos += "			<div class='centradoXY w95'>";
									datos += "				<div class='w20'><label for='edicionTorneo"+categoria+"Fase"+fase+"Puesto"+i+"'>Puesto "+i+": </label></div>";
									datos += "				<select name='edicionTorneo"+categoria+"Fase"+fase+"Puesto"+i+"' id='edicionTorneo"+categoria+"Fase"+fase+"Puesto"+i+"' class='w75' onclick=\"crearCookie('edicionTorneo"+categoria+"Fase"+fase+"Puesto"+i+"',this.value)\">";
									datos += "					<option>Elegir opción</option>";
									var fases = leerCookie("edicionTorneoNumFases"+categoria);
									for (var j = 1; j <= fases; j++) {
										if (j == fases-1 || j == 1) {
											datos += "			<option value='1'>Equipo Campeón</option>";
											datos += "			<option value='2'>Equipo Campeón y Clasificado para XX (siguiente temporada)</option>";
											datos += "			<option value='3'>Equipo Campeón y Clasificado para XX (temporada actual)</option>";
										}
										if (j > fase) {
											datos += "			<option value='4fase"+j+"'>Equipo Campeón y Pasa a "+cogerNombreRonda(categoria,j)+"</option>";
											datos += "			<option value='fase"+j+"'>Pasa a "+cogerNombreRonda(categoria,j)+"</option>";
											datos += "			<option value='8fase"+j+"'>Pasa a "+cogerNombreRonda(categoria,j)+" y Clasificado para XX (siguiente temporada)</option>";
											datos += "			<option value='9fase"+j+"'>Pasa a "+cogerNombreRonda(categoria,j)+" y Clasificado para XX (temporada actual)</option>";
										}
										if (j == fases-1 || j == 1) {
											datos += "			<option value='6'>Clasificado para XX (siguiente temporada)</option>";
											datos += "			<option value='7'>Clasificado para XX (temporada actual)</option>";
											datos += "			<option value='10'>Se mantiene en esta categoría</option>";
											datos += "			<option value='11'>Baja a la Categoría XXX</option>";
											datos += "			<option value='12'>Equipo eliminado</option>";
										}
									}
									datos += "				</select>";
									datos += "			</div>";
								}
								datos += "			</div>"
								datos += "			<div id='cajaEventos' class='h100 w100 centradoXY invisible'>";
								datos += "				En proceso...";
								datos += "			</div>"
								datos += "		</div>";
								break;
							case "2"://eliminatoria
								datos += "	<div class='w100 h60 centradoXY flexWrap'>";
								datos += "		<div class='w90 h40 centradoXY'>";
								datos += "			<label>Las eliminatorias se deciden al mejor de &nbsp;</label>";
								datos += "			<input id='edicionTorneoPartidos"+categoria+"Fase"+fase+"' name='edicionTorneoPartidos"+categoria+"Fase"+fase+"' type='number' min='1' onchange=\"crearCookie('edicionTorneoPartidos"+categoria+"Fase"+fase+"',this.value)\">";
								datos += "			<label>&nbsp; partido(s)</label>";
								datos += "		</div>";

								datos += "		<div class='w90 h60 centradoXY flexWrap'>";
								datos += "			<div class='w100 centradoInlineXY'>";
								datos += "				<label>Equipo <strong style='color:var(--color-corporativo-rosa);'> Ganador </strong> de cada eliminatoria: &nbsp;</label>";
								datos += "				<select name='edicionTorneoGanador"+categoria+"Fase"+fase+"' id='edicionTorneoGanador"+categoria+"Fase"+fase+"' class='w25' onchange=\"crearCookie('edicionTorneoGanador"+categoria+"Fase"+fase+"',this.value)\">";
								datos += "					<option>Elegir opción</option>";
								var fases = leerCookie("edicionTorneoNumFases"+categoria);
								for (var i = 1; i <= fases; i++) {
									if (i > fase) {
										datos += "			<option value='fase"+i+"'>Pasa a "+cogerNombreRonda(categoria,i)+"</option>";
									}
									if (i == fases-1 || i == 1) {
										datos += "			<option value='1'>Equipo Campeón</option>";
										datos += "			<option value='2'>Pasa a otra competición</option>"; ////////////////// Si se elige esto hay que poner otra opción para elegir esa competición a la que pasa
										datos += "			<option value='3'>Campeón y Pasa a otra competición</option>";
									}
								}
								datos += "				</select>";
								datos += "			</div>";

								datos += "			<div class='w100 centradoInlineXY'>";
								datos += "				<label>Equipo <strong style='color:var(--color-plata1)'> Perdedor </strong> de cada eliminatoria: &nbsp;</label>";
								datos += "				<select name='edicionTorneoPerdedor"+categoria+"Fase"+fase+"' id='edicionTorneoPerdedor"+categoria+"Fase"+fase+"' class='w25' onchange=\"crearCookie('edicionTorneoPerdedor"+categoria+"Fase"+fase+"',this.value)\">";
								datos += "					<option>Elegir opción</option>";
								datos += "					<option value='1'>Eliminado de la Competición</option>";
								datos += "					<option value='2'>Pasa a otra competición</option>"; ////////////////// Si se elige esto hay que poner otra opción para elegir esa competición a la que pasa
								for (var i = 1; i <= fases; i++) {
									if (i > fase) {
										datos += "			<option value='fase"+i+"'>Pasa a "+cogerNombreRonda(categoria,i)+"</option>";
									}
								}
								datos += "				</select>";
								datos += "			</div>";
								datos += "		</div>";
								break;
						}
						datos += "			</div>";
						datos += "			<div class='w100 h40 centradoXY flexWrap'>";
						datos += "			<div class='w100 centradoInlineXY'></div>";
						datos += "				<div class='w100 centradoInlineXY'><span style='font-family:calibri'>¿</span>Las sanciones se acumulan para la siguiente fase<span style='font-family:calibri'>?</span> &nbsp;";
						datos += "					<select name='edicionTorneoAcumulacion"+categoria+"Fase"+fase+"' id='edicionTorneoAcumulacion"+categoria+"Fase"+fase+"' onchange=\"crearCookie('edicionTorneoAcumulacion"+categoria+"Fase"+fase+"',this.value)\">";
						datos += "						<option value='0'>Elegir opción</option>";
						datos += "						<option value='1'>Sí</option>";
						datos += "						<option value='2'>No</option>";
						datos += "					</select>";
						datos += "				</div>";
						datos += "				<div class='w100 centradoInlineXY'>Si se expulsa a un equipo de la competición: &nbsp;";
						datos += "					<select name='edicionTorneoExpulsion"+categoria+"Fase"+fase+"' id='edicionTorneoExpulsion"+categoria+"Fase"+fase+"' onchange=\"crearCookie('edicionTorneoExpulsion"+categoria+"Fase"+fase+"',this.value)\">";
						datos += "						<option value='0'>Elegir opción</option>";
						datos += "						<option value='1'>Sigue la competición con 1 equipo menos</option>";
						datos += "						<option value='2'>Se sustituye al eliminado por otro equipo</option>"; // Poner opción para poner al otro equipo
						datos += "						<option value='3'>Se suspende la competición</option>";
						datos += "					</select>";
						datos += "				</div>";
						datos += "				<div class='w100 centradoInlineXY' style='color: var(--color-corporativo-rosa)'>Para el resto de opciones se seguirán las Reglas Oficiales</div>";
						datos += "			</div>";
						datos += "		</div>";
						datos += "		<div class='w100 h10 centradoInlineXY botoneraInferior'>";
						datos += "			<button class='w10 h100 centradoXY' onclick=\"cerrarVentana(1,'Fase',"+tipoFase+","+categoria+","+fase+")\">Guardar</button>"; // COMPROBAR QUE ESTÉN TODAS LAS COOKIES DE REGLAS (PARA OK O NO)
						datos += "		<div class='w20'></div>";
						datos += "			<button class='botonCancelar w10 h100 centradoXY' onclick=\"cerrarVentana(0,'Fase',"+tipoFase+","+categoria+","+fase+")\">Borrar Todo</button>"; //ELIMINAR TODAS LAS COOKIES HECHAS
						datos += "		</div>";
						break;
					case 'Partido':
						datos += "	<div class='w100 h20 centradoXY'><h1>Configurar Reglas de "+tipo+" <small>('"+categoria+"': Fase "+fase+")</small></h1></div>";
						datos += "	<div class='w100 h70 cuerpoCentral centradoXY flexWrap'>";
						datos += "		<div class='w90 h40 centradoInlineXY' style='text-align: center'>";
						datos += "			<div class='w50 h100 centradoXY flexWrap'>";
						datos += "				<div class='w90 h20 labelReglasPartido'>Reglas sobre Puntuaciones</div>";
						datos += "				<div class='w100 h40 centradoInlineXY'>";
						datos += "					<div class='w50'>Unidad</div>";
						datos += "					<div class='radio h80'>";
						datos += "						<input id='edicionTorneoUnidad"+categoria+"Fase"+fase+"1' type='radio' name='edicionTorneoUnidad"+categoria+"Fase"+fase+"' onclick=\"crearCookie('edicionTorneoUnidad"+categoria+"Fase"+fase+"','1')\">";
						datos += "						<label for='edicionTorneoUnidad"+categoria+"Fase"+fase+"1'>Puntos</label>";
						datos += "						<input id='edicionTorneoUnidad"+categoria+"Fase"+fase+"2' type='radio' name='edicionTorneoUnidad"+categoria+"Fase"+fase+"' onclick=\"crearCookie('edicionTorneoUnidad"+categoria+"Fase"+fase+"','2')\">";
						datos += "						<label for='edicionTorneoUnidad"+categoria+"Fase"+fase+"2'>Victorias</label>";
						datos += "					</div>";
						datos += "				</div>";
						datos += "				<div class='w100 h40 spaceAroundXY'>";
						datos += "					<div class='w33 h100 centradoXY flexWrap'>";
						datos += "						<label class='w100' for='edicionTorneoValorVictoria"+categoria+"Fase"+fase+"'>Valor Victoria</label>";
						datos += "						<select id='edicionTorneoValorVictoria"+categoria+"Fase"+fase+"' class='w90' onchange=\"crearCookie('edicionTorneoValorVictoria"+categoria+"Fase"+fase+"',this.value)\">";
						datos += "							<option>Seleccionar...</option>";
						datos += "							<option value='1'>1</option>";
						datos += "							<option value='2'>2</option>";
						datos += "							<option value='3'>3</option>";
						datos += "						</select>";
						datos += "					</div> ";
						datos += "					<div class='w33 h100 centradoXY flexWrap'>";
						datos += "						<label class='w100' for='edicionTorneoValorEmpate"+categoria+"Fase"+fase+"'>Valor Empate</label>";
						datos += "						<select id='edicionTorneoValorEmpate"+categoria+"Fase"+fase+"' class='w90' onchange=\"crearCookie('edicionTorneoValorEmpate"+categoria+"Fase"+fase+"',this.value)\">";
						datos += "							<option>Seleccionar...</option>";
						datos += "							<option value='0'>0</option>";
						datos += "							<option value='1'>1</option>";
						datos += "							<option value='2'>2</option>";
						datos += "					</select>";
						datos += "					</div> ";
						datos += "					<div class='w33 h100 centradoXY flexWrap'>";
						datos += "						<label class='w100' for='edicionTorneoIncomparecencia"+categoria+"Fase"+fase+"'>Incomparecencia</label>";
						datos += "						<select id='edicionTorneoIncomparecencia"+categoria+"Fase"+fase+"' class='w90' onchange=\"crearCookie('edicionTorneoIncomparecencia"+categoria+"Fase"+fase+"',this.value)\">";
						datos += "							<option>Seleccionar...</option>";
						datos += "							<option value='1'>Sin sanción al equipo</option>";
						datos += "							<option value='2'>Equipo pierde partido 3-0</option>";
						datos += "							<option value='3'>Equipo expulsado del campeonato</option>";
						datos += "						</select>";
						datos += "					</div> ";
						datos += "				</div>";
						datos += "			</div>";
						datos += "			<div class='w50 h100 centradoXY flexWrap'>";
						datos += "				<div class='w90 h20 labelReglasPartido'>Número de Jugadores</div>";
						datos += "				<div class='w90 h40 centradoInlineXY'>";
						datos += "					<div class='w30'>Convocatoria</div>";
						datos += "					<input id='edicionTorneoMinConvocatoria"+categoria+"Fase"+fase+"' type='number' min='0' max='60' value='0' name='edicionTorneoMinConvocatoria"+categoria+"Fase"+fase+"' onclick=\"crearCookie('edicionTorneoMinConvocatoria"+categoria+"Fase"+fase+"',this.value)\">";
						datos += "					<label class='w10' for='edicionTorneoMinConvocatoria"+categoria+"Fase"+fase+"'>Min</label>";
						datos += "					<input id='edicionTorneoMaxConvocatoria"+categoria+"Fase"+fase+"' type='number' min='0' max='60' value='0' name='edicionTorneoMaxConvocatoria"+categoria+"Fase"+fase+"' onclick=\"crearCookie('edicionTorneoMaxConvocatoria"+categoria+"Fase"+fase+"',this.value)\">";
						datos += "					<label class='w10' for='edicionTorneoMaxConvocatoria"+categoria+"Fase"+fase+"'>Max</label>";
						datos += "				</div>";
						datos += "				<div class='w90 h40 centradoInlineXY'>";
						datos += "					<div class='w30'>En pista</div>";
						datos += "					<input id='edicionTorneoMinPista"+categoria+"Fase"+fase+"' type='number' min='0' max='60' value='0' name='edicionTorneoMinPista"+categoria+"Fase"+fase+"' onclick=\"crearCookie('edicionTorneoMinPista"+categoria+"Fase"+fase+"',this.value)\">";
						datos += "					<label class='w10' for='edicionTorneoMinPista"+categoria+"Fase"+fase+"'>Min</label>";
						datos += "					<input id='edicionTorneoMaxPista"+categoria+"Fase"+fase+"' type='number' min='0' max='60' value='0' name='edicionTorneoMaxPista"+categoria+"Fase"+fase+"' onclick=\"crearCookie('edicionTorneoMaxPista"+categoria+"Fase"+fase+"',this.value)\">";
						datos += "					<label class='w10' for='edicionTorneoMaxPista"+categoria+"Fase"+fase+"'>Max</label>";
						datos += "				</div>";
						datos += "			</div>";
						datos += "		</div>";
						datos += "		<div class='w90 h45 centradoXY flexWrap'>";
						datos += "			<div class='w90 h20 labelReglasPartido'>Reglas sobre Periodos del Partido</div>";
						datos += "			<div class='w90 h15 centradoInlineXY'>";
						datos += "				<label class='w30'></label>";
						datos += "				<div class='w20 centradoInlineXY'>Partido</div>";
						datos += "				<div class='w20 centradoInlineXY'>Prórroga</div>";
						datos += "				<div class='w20 centradoInlineXY'>Penalties</div>";
						datos += "			</div>";
						datos += "			<div class='w90 h15 centradoInlineXY'>";
						datos += "				<label class='w30'>Nº Periodos/Rondas</label>";
						datos += "				<select name='edicionTorneoNPeriodosPartido"+categoria+"Fase"+fase+"' id='edicionTorneoNPeriodosPartido"+categoria+"Fase"+fase+"' class='w20' onchange=\"crearCookie('edicionTorneoNPeriodosPartido"+categoria+"Fase"+fase+"',this.value)\">";
						datos += "					<option>Seleccionar...</option>";
						datos += "					<option value='1'>1</option>";
						datos += "					<option value='2'>2</option>";
						datos += "					<option value='3'>3</option>";
						datos += "					<option value='4'>4</option>";
						datos += "				</select>";
						datos += "				<select name='edicionTorneoNPeridodosProrroga"+categoria+"Fase"+fase+"' id='edicionTorneoNPeridodosProrroga"+categoria+"Fase"+fase+"' class='w20' onchange=\"crearCookie('edicionTorneoNPeridodosProrroga"+categoria+"Fase"+fase+"',this.value)\">";
						datos += "					<option>Seleccionar...</option>";
						datos += "					<option value='0'>Sin Prórroga</option>";
						datos += "					<option value='1'>1</option>";
						datos += "					<option value='2'>2</option>";
						datos += "					<option value='3'>3</option>";
						datos += "					<option value='4'>4</option>";
						datos += "					<option value='5'>Sin límite</option>";
						datos += "				</select>";
						datos += "				<select name='edicionTorneoNPeriodosPenalties"+categoria+"Fase"+fase+"' id='edicionTorneoNPeriodosPenalties"+categoria+"Fase"+fase+"' class='w20' onchange=\"crearCookie('edicionTorneoNPeriodosPenalties"+categoria+"Fase"+fase+"',this.value)\">";
						datos += "					<option>Seleccionar...</option>";
						datos += "					<option value='0'>Sin Penalties</option>";
						datos += "					<option value='1'>1</option>";
						datos += "					<option value='2'>2</option>";
						datos += "					<option value='3'>3</option>";
						datos += "					<option value='4'>4</option>";
						datos += "					<option value='5'>5</option>";
						datos += "					<option value='6'>Sin límite</option>";
						datos += "				</select>";
						datos += "			</div>";
						datos += "			<div class='w90 h15 centradoInlineXY'>";
						datos += "				<label class='w30'>Minutos por periodo</label>";
						datos += "				<div class='w20 centradoInlineXY'><input id='edicionTorneoMinutosPeriodosPartido"+categoria+"Fase"+fase+"' type='number' min='0' max='60' value='0' name='' onclick=\"crearCookie('edicionTorneoMinutosPeriodosPartido"+categoria+"Fase"+fase+"',this.value)\"></div>";
						datos += "				<div class='w20 centradoInlineXY'><input id='edicionTorneoMinutosPeriodosProrroga"+categoria+"Fase"+fase+"' type='number' min='0' max='60' value='0' name='' onclick=\"crearCookie('edicionTorneoMinutosPeriodosProrroga"+categoria+"Fase"+fase+"',this.value)\"></div>";
						datos += "				<div class='w20 centradoInlineXY'>--</div>";
						datos += "			</div>";
						datos += "			<div class='w90 h15 centradoInlineXY'>";
						datos += "				<label class='w30'>Tiempos Muertos Totales</label>";
						datos += "				<div class='w20 centradoInlineXY'><input id='edicionTorneoTMTotalesPartido"+categoria+"Fase"+fase+"' type='number' min='0' max='10' value='0' name='' onclick=\"crearCookie('edicionTorneoTMTotalesPartido"+categoria+"Fase"+fase+"',this.value)\"></div>";
						datos += "				<div class='w20 centradoInlineXY'><input id='edicionTorneoTMTotalesProrroga"+categoria+"Fase"+fase+"' type='number' min='0' max='10' value='0' name='' onclick=\"crearCookie('edicionTorneoTMTotalesProrroga"+categoria+"Fase"+fase+"',this.value)\"></div>";
						datos += "				<div class='w20 centradoInlineXY'>--</div>";
						datos += "			</div>";
						datos += "			<div class='w90 h15 centradoInlineXY'>";
						datos += "				<label class='w30'>TM Máximos por periodo</label>";
						datos += "				<div class='w20 centradoInlineXY'><input id='edicionTorneoTMMaxPeriodoPartido"+categoria+"Fase"+fase+"' type='number' min='0' max='10' value='0' name='' onclick=\"crearCookie('edicionTorneoTMMaxPeriodoPartido"+categoria+"Fase"+fase+"',this.value)\"></div>";
						datos += "				<div class='w20 centradoInlineXY'><input id='edicionTorneoTMMaxPeriodoProrroga"+categoria+"Fase"+fase+"' type='number' min='0' max='10' value='0' name='' onclick=\"crearCookie('edicionTorneoTMMaxPeriodoProrroga"+categoria+"Fase"+fase+"',this.value)\"></div>";
						datos += "				<div class='w20 centradoInlineXY'>--</div>";
						datos += "			</div>";
						datos += "		</div>";
						datos += "		<div class='w100 h10 centradoInlineXY' style='color: var(--color-corporativo-rosa)'>Para el resto de opciones se seguirán las Reglas Oficiales</div>";
						datos += "	</div>";
						datos += "	<div class='w100 h10 centradoInlineXY botoneraInferior'>";
						datos += "		<button class='w10 h100 centradoXY' onclick=\"cerrarVentana(1,'Partido',"+tipoFase+","+categoria+","+fase+")\">Guardar</button>"; // COMPROBAR QUE ESTÉN TODAS LAS COOKIES DE PARTIDOS (PARA OK O NO)
						datos += "		<div class='w20'></div>";
						datos += "		<button class='botonCancelar w10 h100 centradoXY' onclick=\"cerrarVentana(0,'Partido',"+tipoFase+","+categoria+","+fase+")\">Borrar Todo</button>"; //ELIMINAR TODAS LAS COOKIES HECHAS
						datos += "	</div>";
						break;
					case 'Participantes':
						datos += "	<div class='w100 h20 centradoXY'>";
						datos += "		<h1>Equipos participantes en '"+categoria+"': Fase "+fase+"</h1>";
						datos += "	</div>";
						datos += " 	<div class='w100 h10'>";
						datos += "	 	<div class='radio'>";
						datos += "			<input type='radio' name='botonParticipantes' id='botonParticipantes1Cat"+categoria+"' onclick=\"mostrarOpcion('A'); crearCookie('edicionTorneoTipoParticipantes"+categoria+"Fase"+fase+"','heredado')\">";
          			  	datos += "			<label for='botonParticipantes1Cat"+categoria+"' class='w50'>Selección Heredada</label>";
     			       	datos += "			<input type='radio' name='botonParticipantes' id='botonParticipantes2Cat"+categoria+"' onclick=\"mostrarOpcion('B'); crearCookie('edicionTorneoTipoParticipantes"+categoria+"Fase"+fase+"','manual')\">";
            			datos += "			<label for='botonParticipantes2Cat"+categoria+"' class='w50'>Selección Manual</label>";
						datos += "		</div>";
						datos += "	</div>";
						datos += "	<div id='cuadroParticipantes0' class='w100 h60'>";
						datos += "	</div>";
						datos += "	<div id='cuadroParticipantesA' class='w100 h60 centradoXY flexWrap cuerpoCentral invisible'>";
						datos += "		<p class='w80'>Selecciona esta opción si el <strong style='color: var(--color-corporativo-rosa)'>listado de equipos</strong> que van a jugar esta fase <strong style='color: var(--color-corporativo-rosa)'>depende de los resultados de fases anteriores</strong>.<br><br>";
						datos += "		Ten en cuenta que el cuadro de participantes <strong style='color: var(--color-corporativo-rosa)'>se creará de forma automática</strong> según los parámetros introducidos en las reglas de Fase y Partido, por lo que <strong style='color: var(--color-corporativo-rosa)'>revisa las reglas</strong> que has indicado en el resto de fases para un correcto funcionamiento.<br><br>";
						datos +="		Si esta es la FASE 1 o si deseas elegir por tu cuenta el listado completo de equipos que jugarán esta fase debes seleccionar la opción <strong style='color: var(--color-corporativo-rosa)'>Selección Manual</strong>.</p>";
						datos += "	</div>";
						datos += "	<div id='cuadroParticipantesB' class='w100 h60 cuerpoCentral invisible'>";
						datos += "		<div id='cuadroParticipantesB1' class='w100 centradoXY flexWrap'>";
						var participantes = parseInt(leerCookie("edicionTorneoParticipantes"+categoria+"Fase"+fase))+1;
						for (var i = 1; i < participantes; i++) {
							datos += "		<div class='w25 h40 centradoXY flexWrap'>";
							datos += "			<button class='w100 h15 botonElegirEquipo' onclick=\"mostrarElegirEquipo("+i+","+categoria+","+fase+")\">Seleccionar equipo "+i+"...</button>";
							datos += "			<img id='escudoParticipante"+i+"Cat"+categoria+"Fase"+fase+"' class='escudoParticipante' src='img/Clubes/Clubes/defecto.png' alt='Escudo Participante "+i+"'>";
							datos += "			<label id='nombreParticipante"+i+"Cat"+categoria+"Fase"+fase+"' class='h15'>Nombre del equipo "+i+"</label>";
							datos += "		</div>";
						}
						datos += "		</div>";
						datos += "		<div id='cuadroParticipantesB2' class='w90 cajaPuestos centradoXY invisible'>";
						datos += "		</div>";
						datos += "	</div>";
						datos += "	<div class='w100 h10 centradoInlineXY botoneraInferior'>";
						datos += "		<button class='w10 h100 centradoXY' onclick=\"cerrarVentana(1,'Participantes',"+tipoFase+","+categoria+","+fase+")\">Guardar</button>"; // COMPROBAR QUE ESTÉN TODAS LAS COOKIES DE ParticipantesS (PARA OK O NO)
						datos += "		<div class='w20'></div>";
						datos += "		<button class='botonCancelar w10 h100 centradoXY' onclick=\"cerrarVentana(0,'Participantes',"+tipoFase+","+categoria+","+fase+")\">Borrar Todo</button>"; //ELIMINAR TODAS LAS COOKIES HECHAS
						datos += "	</div>";
						break;
				}

				// Publicar datos
				$(".ventanaReglas").html(datos);

				// Mostrar datos utilizados o por defecto
				var resto = categoria+"Fase"+fase;
				switch(tipo){
					case 'Fase':
						switch(tipoFase){
							case "1"://liga
								// Valores tipo radio
								var arrayNombresRadio = Array('edicionTorneoVueltas','edicionTorneoDesempate');
								for (var i = 0; i < arrayNombresRadio.length; i++) {
									var etiqueta = arrayNombresRadio[i]+leerCookie(arrayNombresRadio[i]+resto)+resto;
									document.getElementById(etiqueta).checked = true;
								}

					//////////////////////////// Falta añadir lo de los enventos en medio de la temporada			

								for (var j = 1; j < parseInt(leerCookie("edicionTorneoParticipantes"+categoria+"Fase"+fase))+1; j++) {
									var cookiePuesto = 'edicionTorneo'+categoria+'Fase'+fase+'Puesto'+j;
									var etiqueta = "edicionTorneo"+categoria+"Fase"+fase+"Puesto"+j;
									document.getElementById(etiqueta).value = leerCookie(cookiePuesto); //Reglas según Puesto
								}
								break;
							case "2"://eliminatoria
								var arrayNombres = Array("edicionTorneoPartidos","edicionTorneoGanador","edicionTorneoPerdedor");
								for (var i = 0; i < arrayNombres.length; i++) {
									var etiqueta = arrayNombres[i]+resto;
									document.getElementById(etiqueta).value = leerCookie(etiqueta);
								}
								break;
						}
						// Valores generales
						var arrayGenerales = Array('edicionTorneoAcumulacion','edicionTorneoExpulsion');
						for (var i = 0; i < arrayGenerales.length; i++) {
							var etiqueta = arrayGenerales[i]+resto;
							document.getElementById(etiqueta).value = leerCookie(etiqueta);
						}
						break;
					case 'Partido':						
						// Valores tipo radio
						var arrayNombres1 = ('edicionTorneoUnidad');
						var etiqueta = arrayNombres1+resto+leerCookie(arrayNombres1+resto);
						document.getElementById(etiqueta).checked = true;

						// Valores tipo select y tipo input number
						var arrayNombres2 = Array('edicionTorneoValorVictoria','edicionTorneoValorEmpate','edicionTorneoIncomparecencia','edicionTorneoNPeriodosPartido','edicionTorneoNPeridodosProrroga','edicionTorneoNPeriodosPenalties',
											'edicionTorneoMinConvocatoria','edicionTorneoMaxConvocatoria','edicionTorneoMinPista','edicionTorneoMaxPista','edicionTorneoMinutosPeriodosPartido','edicionTorneoMinutosPeriodosProrroga','edicionTorneoTMTotalesPartido','edicionTorneoTMTotalesProrroga','edicionTorneoTMMaxPeriodoPartido','edicionTorneoTMMaxPeriodoProrroga');
						for (var i = 0; i < arrayNombres2.length; i++) {
							var etiqueta = arrayNombres2[i]+resto;
							document.getElementById(etiqueta).value = leerCookie(etiqueta);
						}
						break;
					case 'Participantes':
						mostrarEscudosParticipantes(resto);
						break;
				}
			};
				function mostrarOpcion(opcion) {
					$("#cuadroParticipantes0").addClass("invisible");
					$("#cuadroParticipantesA").addClass("invisible");
					$("#cuadroParticipantesB").addClass("invisible");

					var id = "#cuadroParticipantes"+opcion;
					$(id).removeClass("invisible");
				};
				function mostrarElegirEquipo(equipo,categoria,fase) {
					$("#cuadroParticipantesB2").removeClass("invisible");

					const deporte =	comunidad = seccion = provincia = competencia = localidad = "0";

					$.ajax({
						url: "php/listadosComunidadesyEquipos.php",
						type: "POST",
						data: {
							deporte: deporte,
							seccion: seccion,
							categoria: competencia,
							comunidad: comunidad,
							provincia: provincia,
							localidad: localidad
						},
						success: function(res){
							var js = JSON.parse(res);
							
							datos = "	<div class='w70 h80 centradoXY flexWrap'>";
							datos += "		<div class='w100 h10 centradoXY'>";
							datos += "			Equipo Participante Nº "+equipo;
							datos += "		</div>";
							datos += "		<div class='w100 h70 spaceAroundXY flexWrap'>";
							datos += "			<div class='w100 h80 spaceAroundXY flexWrap'>";
							datos += "				<select name='' id='selectDeporte' class='w40 h15' onchange=\"mostrarListadoEquipos()\">";
							datos += "					<option value='0'>Todos los Deportes</option>";
							datos += "					<option value='1'>Balonmano</option>";
							datos += "					<option value='2'>Baloncesto</option>";
							datos += "					<option value='3'>Futsal</option>";
							datos += "				</select>";
							datos += "				<select name='' id='selectComunidad' class='w40 h15' onchange=\"mostrarListadoEquipos()\">";
							datos += "					<option value='0'>Todas las Comunidades</option>";
							for (var i = 0; i < js.Comunidades.length; i++) {
								datos += "				<option value='"+js.Comunidades[i].Comunidad+"'>"+js.Comunidades[i].Comunidad+"</option>";
							}
							datos += "				</select>";
							datos += "				<select name='' id='selectSeccion' class='w40 h15' onchange=\"mostrarListadoEquipos()\">";
							datos += "					<option value='0'>Todas las Secciones</option>";
							datos += "					<option value='1'>Masculina</option>";
							datos += "					<option value='2'>Femenina</option>";
							datos += "					<option value='3'>Mixta</option>";
							datos += "				</select>";
							datos += "				<select name='' id='selectProvincia' class='w40 h15' onchange=\"mostrarListadoEquipos()\">";
							datos += "					<option value='0'>Todas las Provincias</option>";
							if (js.Provincias != "0") {
								for (var i = 0; i < js.Provincias.length; i++) {
									datos += "				<option value='"+js.Provincias[i].Provincia+"'>"+js.Provincias[i].Provincia+"</option>";
								}
							}
							datos += "				</select>";
							datos += "				<select name='' id='selectCategoria' class='w40 h15' onchange=\"mostrarListadoEquipos()\">";
							datos += "					<option value='0'>Todas las Competiciones</option>";
							if (js.Internacional[0] != "0") {
								datos += "				<optgroup label='Internacionales'></optgroup>";	
								for (var i = 0; i < js.Internacional[0].length; i++) {
									datos += "				<option value='"+js.Internacional[0][i].ID_Competicion+"'>"+js.Internacional[0][i].Competicion+"</option>";
								}
							}
							if (js.Nacional[0] != "0") {
								datos += "				<optgroup label='Nacionales'></optgroup>";	
								for (var i = 0; i < js.Nacional[0].length; i++) {
									datos += "				<option value='"+js.Nacional[0][i].ID_Competicion+"'>"+js.Nacional[0][i].Competicion+"</option>";
								}
							}
							if (js.Autonomica[0] != "0") {
								datos += "				<optgroup label='Autonomica'></optgroup>";	
								for (var i = 0; i < js.Autonomica[0].length; i++) {
									datos += "				<option value='"+js.Autonomica[0][i].ID_Competicion+"'>"+js.Autonomica[0][i].Competicion+"</option>";
								}
							}
							if (js.Local[0] != "0") {
								datos += "				<optgroup label='Local'></optgroup>";	
								for (var i = 0; i < js.Local[0].length; i++) {
									datos += "				<option value='"+js.Local[0][i].ID_Competicion+"'>"+js.Local[0][i].Competicion+"</option>";
								}
							}
							datos += "				</select>";
							datos += "				<select name='' id='selectLocalidad' class='w40 h15' onchange=\"mostrarListadoEquipos()\">";
							datos += "					<option value='0'>Todas las Localidades</option>";
							if (js.Localidades != "0") {
								for (var i = 0; i < js.Localidades.length; i++) {
									datos += "				<option value='"+js.Localidades[i].Localidad+"'>"+js.Localidades[i].Localidad+"</option>";
								}
							}
							datos += "				</select>";
							datos += "			</div>";
							datos += "			<div class='w100 h15 spaceAroundXY'>";
							datos += "				<button class='w10' style='color:red' onclick=\"cerrarVentana(0,'listaEquipos','"+equipo+"',"+categoria+","+fase+")\">Cancelar</button>";
							datos += "				<input id='inputElegirEquipo' list='equipoSeleccionado' class='w60 h80' placeholder='Selecciona o Escribe nombre del Equipo...'>";
							datos += "					<datalist id='equipoSeleccionado'>";
							if (js.Equipos !== "0") {
								for (var i = 0; i < js.Equipos.length; i++) {
									if (js.Equipos[i].ID_Equipo) {}
									datos += "				<option value='"+js.Equipos[i].Nombre+"' data-identificacion='"+js.Equipos[i].ID_Equipo+"' data-escudo='"+js.Equipos[i].Escudo+"' data-orden='"+equipo+"'></option>";
								}
							}else{
								datos += "					<option value='No existen equipos con esas características'></option>";
							}
							datos += "					</datalist>";
							datos += "				<button class='w10' onclick=\"cerrarVentana(1,'listaEquipos','"+i+"',"+categoria+","+fase+")\">Aceptar</button>";
							datos += "			</div>";
							datos += "		</div>";
							datos += "		<p class='w100 h20'>";
							datos += "			Aquí va el texto de ayuda";
							datos += "		</p>";
							datos += "	</div>";

							$("#cuadroParticipantesB2").html(datos);

							var resto = categoria+"Fase"+fase;
							$("#inputElegirEquipo").on('input', function() {
								var value = $(this).val();
								var identificacion = $('#equipoSeleccionado [value="' +value+ '"]').data('identificacion');
								var escudo = $('#equipoSeleccionado [value="' +value+ '"]').data('escudo');
								var orden = $('#equipoSeleccionado [value="' +value+ '"]').data('orden');
		
								crearCookie("edicionTorneoEquipo"+orden+"IDCat"+resto,identificacion);
								crearCookie("edicionTorneoEquipo"+orden+"NombreCat"+resto,value);
								crearCookie("edicionTorneoEquipo"+orden+"EscudoCat"+resto,escudo);
							});

							//Mostrar datos ya introducidos
							mostrarEscudosParticipantes(resto);
						},
						timeout: 10000,
						error: function() {mostrarElegirEquipo(equipo,categoria,fase);}
					});

				};
					function mostrarListadoEquipos() {
						var deporte = document.getElementById('selectDeporte').value;
						var comunidad = document.getElementById('selectComunidad').value;
						var seccion = document.getElementById('selectSeccion').value;
						var provincia = document.getElementById('selectProvincia').value;
						var categoria = document.getElementById('selectCategoria').value;
						var localidad = document.getElementById('selectLocalidad').value;

						$.ajax({
							url: "php/listadosComunidadesyEquipos.php",
							type: "POST",
							data: {
								deporte: deporte,
								seccion: seccion,
								categoria: categoria,
								comunidad: comunidad,
								provincia: provincia,
								localidad: localidad
							},
							success: function(res){
								var js = JSON.parse(res);

								// Listado de competiciones
								var competiciones = "	<option value='0'>Todas las Competiciones</option>";
								if (js.Internacional[0] !== "0" || js.Nacional[0] !== "0" || js.Autonomica[0] !== "0" || js.Local[0] !== "0") {
									if (js.Internacional[0] !== "0") {
										competiciones += "	<optgroup label='Competiciones Europeas'>";
										for (var i = 0; i < js.Internacional[0].length; i++) {
											competiciones += "	<option value='"+js.Internacional[0][i].ID_Competicion+"'>"+js.Internacional[0][i].Competicion+"</option>";
										}
										competiciones += "	</optgroup>";
									}

									if (js.Nacional[0] !== "0") {
										competiciones += "	<optgroup label='Competiciones Nacionales'>";
										for (var i = 0; i < js.Nacional[0].length; i++) {
											competiciones += "	<option value='"+js.Nacional[0][i].ID_Competicion+"'>"+js.Nacional[0][i].Competicion+"</option>";
										}
										competiciones += "	</optgroup>";
									}

									if (js.Autonomica[0] !== "0") {
										competiciones += "	<optgroup label='Competiciones Autonómicas'>";
										for (var i = 0; i < js.Autonomica[0].length; i++) {
											competiciones += "	<option value='"+js.Autonomica[0][i].ID_Competicion+"'>"+js.Autonomica[0][i].Competicion+"</option>";
										}
										competiciones += "	</optgroup>";
									}

									if (js.Local[0] !== "0") {
										competiciones += "	<optgroup label='Competiciones Locales'>";
										for (var i = 0; i < js.Local[0].length; i++) {
											competiciones += "	<option value='"+js.Local[0][i].ID_Competicion+"'>"+js.Local[0][i].Competicion+"</option>";
										}
										competiciones += "	</optgroup>";
									}

								}else {
									competiciones += "	<option value='0'>Sin valores</option>";
								}

								$("#selectCategoria").html(competiciones);


								//Listado Provincias
								if (js.Comunidades[0] !== "0") {
									var provincias = "	<option value='0'>Todas las Provincias</option>";
									for (var i = 0; i < js.Provincias.length; i++) {
										provincias += "	<option value='"+js.Provincias[i].Provincia+"'>"+js.Provincias[i].Provincia+"</option>";
									}
								}
								$("#selectProvincia").html(provincias);


								//Listado Localidades
								if (js.Provincias[0] !== "0") {
									var localidades = "	<option value='0'>Todas las Localidades</option>";
									for (var i = 0; i < js.Localidades.length; i++) {
										localidades += "<option value='"+js.Localidades[i].Localidad+"'>"+js.Localidades[i].Localidad+"</option>";
									}
								}
								$("#selectLocalidad").html(localidades);

								// Mostrar datos ya seleccionados
								document.getElementById("selectDeporte").value = deporte;
								document.getElementById("selectSeccion").value = seccion;
								document.getElementById("selectCategoria").value = categoria;
								document.getElementById("selectComunidad").value = comunidad;
								document.getElementById("selectProvincia").value = provincia;
								document.getElementById("selectLocalidad").value = localidad;

								// Listar resultados
								if (js.Equipos !== "0") {
									var resultados = "";
									for (var i = 0; i < js.Equipos.length; i++) {
										resultados += "		<option value='"+js.Equipos[i].ID_Equipo+"'>"+js.Equipos[i].Nombre+"</option>";
									}
									$("#equipoSeleccionado").html(resultados);
								}else{
									resultados += "			<option value='No existen equipos con esas características'></option>";
									$("#equipoSeleccionado").html(resultados);
								}
							},
							timeout: 10000,
							error: function() {mostrarListadoEquipos();}
						});
					};

			function mostrarCuadroPosiciones(opcion) {
				var etiqueta = "#"+opcion;

				// Eliminar cuadros
				$('#cajaEventos').addClass('invisible');
				$('#cajaPosiciones').addClass('invisible');

				// Mostrar cuadro elegido
				$(etiqueta).removeClass('invisible');
			};

			function cogerNombreRonda(categoria,fase) {
				const arrayNombres = ["", "Fase regular", "Fase previa", "Playoff", "Fase ascenso", "Fase descenso", "Eliminatoria", "Fase final", "Final Four", "1ª Ronda", "2ª Ronda", "3ª Ronda", "1/64", "1/32", "1/16", "1/8", "1/4", "Semifinal", "Final"];
				let nombre = arrayNombres[parseInt(leerCookie("edicionTorneoNombre"+categoria+"Fase"+fase))];
				/*switch (leerCookie("edicionTorneoNombre"+categoria+"Fase"+fase)) {
					case "1":
						var nombre = "Fase regular";
						break;
					case "2":
						var nombre = "Fase previa";
						break;
					case "3":
						var nombre = "Playoff";
						break;
					case "4":
						var nombre = "Fase ascenso";
						break;
					case "5":
						var nombre = "Fase descenso";
						break;
					case "6":
						var nombre = "Eliminatoria";
						break;
					case "7":
						var nombre = "Fase final";
						break;
					case "8":
						var nombre = "Final Four";
						break;
					case "9":
						var nombre = "1ª Ronda";
						break;
					case "10":
						var nombre = "2ª Ronda";
						break;
					case "11":
						var nombre = "3ª Ronda";
						break;
					case "12":
						var nombre = "1/64";
						break;
					case "13":
						var nombre = "1/32";
						break;
					case "14":
						var nombre = "1/16";
						break;
					case "15":
						var nombre = "1/8";
						break;
					case "16":
						var nombre = "1/4";
						break;
					case "17":
						var nombre = "Semifinal";
						break;
					case "18":
						var nombre = "Final";
						break;
				}*/
				return nombre;
			};

			function cerrarVentana(orden,tipo,tipoFase,categoria,fase) {
				var resto = categoria+"Fase"+fase;
				switch(orden) {
					case 0:
						// Dejar todo como estaba antes de entrar a la ventana edicionTorneoEquipo1IDCat1Fase1 edicionTorneoEquipo1IDCat1Fase1
						switch(tipo){
							case "Fase":
								switch(tipoFase){
									case 1: //Liga
										var arrayNombres = Array('edicionTorneoVueltas','edicionTorneoDesempate','edicionTorneoAcumulacion','edicionTorneoExpulsion');

								//////////////////////////// Falta añadir lo de los eventos en medio de la temporada			

										for (var j = 1; j < parseInt(leerCookie("edicionTorneoParticipantes"+resto))+1; j++) {
											//eliminarCookie('edicionTorneo'+categoria+'Fase'+fase+'Puesto'+j);
											arrayNombres.push('edicionTorneo'+resto+'Puesto'+j);
										}

										for (var i = 0; i < arrayNombres.length; i++) {
											eliminarCookie(arrayNombres[i]+resto);
										}

										comprobarCadaCookie(tipo,tipoFase,categoria,fase);
										crearCookie("estadoCookiesReglasCat"+resto,"0");
										comprobarTodasCookies(categoria);
										break;
									case 2: //Eliminatoria
										var arrayNombres = Array("edicionTorneoPartidos","edicionTorneoGanador","edicionTorneoPerdedor",'edicionTorneoAcumulacion','edicionTorneoExpulsion');
										for (var i = 0; i < arrayNombres.length; i++) {
											eliminarCookie(arrayNombres[i]+resto);
										}

										comprobarCadaCookie(tipo,tipoFase,categoria,fase);
										crearCookie("estadoCookiesReglasCat"+resto,"0");
										comprobarTodasCookies(categoria);
										break;
								}
								break;
							case "Partido":
								var arrayNombres = Array('edicionTorneoUnidad','edicionTorneoValorVictoria','edicionTorneoValorEmpate','edicionTorneoIncomparecencia','edicionTorneoNPeriodosPartido','edicionTorneoNPeridodosProrroga','edicionTorneoNPeriodosPenalties',
											'edicionTorneoMinConvocatoria','edicionTorneoMaxConvocatoria','edicionTorneoMinPista','edicionTorneoMaxPista','edicionTorneoMinutosPeriodosPartido','edicionTorneoMinutosPeriodosProrroga','edicionTorneoTMTotalesPartido','edicionTorneoTMTotalesProrroga','edicionTorneoTMMaxPeriodoPartido','edicionTorneoTMMaxPeriodoProrroga');
								for (var i = 0; i < arrayNombres.length; i++) {
									eliminarCookie(arrayNombres[i]+resto);
								}
								comprobarCadaCookie(tipo,tipoFase,categoria,fase);
								crearCookie("estadoCookiesReglasCat"+resto,"0");
								comprobarTodasCookies(categoria);
								break;
							case "Participantes":
								for (var i = 0; i < leerCookie("edicionTorneoParticipantes"+resto); i++) {
									eliminarCookie("edicionTorneoEquipo"+i+"Cat"+resto);
								}
								break;
							case "listaEquipos":
								var id = "edicionTorneoEquipo"+tipoFase+"IDCat";
								var nombre = "edicionTorneoEquipo"+tipoFase+"NombreCat";
								var escudo = "edicionTorneoEquipo"+tipoFase+"EscudoCat";

								eliminarCookie(id+resto);
								eliminarCookie(nombre+resto);
								eliminarCookie(escudo+resto);

								var estado = "estadoCookiesListaEquiposEq"+tipoFase+"Cat"+resto;
								crearCookie(estado,"0");
								break;
						}
					case 1:
						// Dejar guardadas las cookies y comprobar si están todas
						comprobarCadaCookie(tipo,tipoFase,categoria,fase);
						if (tipo !== "listaEquipos") {
							comprobarTodasCookies(categoria);
						}
						break;
				}
				if (tipo == "listaEquipos") {
					$("#cuadroParticipantesB2").addClass("invisible");
				}else{
					document.getElementById("fondoReglas").style.opacity = 0;
					document.getElementById("fondoReglas").style.pointerEvents = "none";
					document.getElementById("pantallaEdicion4A").style.pointerEvents = "auto";
				}
			};
			
			function comprobarCadaCookie(tipo,tipoFase,categoria,fase) {
				var resto = categoria+'Fase'+fase;
				// Comprobar cada una de las cookies
				switch(tipo){
					case "Fase":
						var sumaTotal = 0;
						if (tipoFase == "0" || tipoFase == "1") {
							if (leerCookie('edicionTorneoVueltas'+resto) && leerCookie('edicionTorneoDesempate'+resto) && leerCookie('edicionTorneoAcumulacion'+resto) && leerCookie('edicionTorneoExpulsion'+resto)) {
								sumaTotal += 1;
							}
							var suma = 0;
							for (var j = 1; j <= leerCookie("edicionTorneoParticipantes"+categoria+"Fase"+fase); j++) {
								if (leerCookie('edicionTorneo'+resto+'Puesto'+j)) {
									suma += 1;
								}
							}
							if (leerCookie("edicionTorneoParticipantes"+resto) == suma) {
								sumaTotal += 1;
							}	
						}
						if (tipoFase == "0" || tipoFase == "2") {
							if (leerCookie("edicionTorneoPartidos"+resto) && leerCookie("edicionTorneoGanador"+resto) && leerCookie("edicionTorneoPerdedor"+resto) && leerCookie('edicionTorneoAcumulacion'+categoria+'Fase'+fase) && leerCookie('edicionTorneoExpulsion'+categoria+'Fase'+fase)) {
								sumaTotal += 2;
							}	
						}
						
						// Comprobar si están todas las cookies necesarias
						switch (sumaTotal) {
							case 0:
								document.getElementById("tor"+resto).style.color = "var(--color-corporativo-morado)";
								break;
							case 1:
								document.getElementById("tor"+resto).style.color = "var(--color-corporativo-rosa)";
								break;
							case 2:
								document.getElementById("tor"+resto).style.color = "var(--color-texto)";
								break;
						}
						crearCookie("estadoCookiesReglasCat"+resto,sumaTotal);
						break;
					case "Partido":
						var sumaTotal = 0;
						if (leerCookie("edicionTorneoUnidad"+resto) && leerCookie("edicionTorneoValorVictoria"+resto) && leerCookie("edicionTorneoValorEmpate"+resto) && leerCookie("edicionTorneoIncomparecencia"+resto)) {
							sumaTotal += 1;
						}
						if (leerCookie("edicionTorneoMinConvocatoria"+resto) && leerCookie("edicionTorneoMaxConvocatoria"+resto) && leerCookie("edicionTorneoMinPista"+resto) && leerCookie("edicionTorneoMaxPista"+resto)) {
							sumaTotal += 1;
						}
						if (leerCookie("edicionTorneoNPeriodosPartido"+resto) && leerCookie("edicionTorneoMinutosPeriodosPartido"+resto) && leerCookie("edicionTorneoTMTotalesPartido"+resto) && leerCookie("edicionTorneoTMMaxPeriodoPartido"+resto)) {
							if (leerCookie("edicionTorneoUnidad"+resto) && leerCookie("edicionTorneoUnidad"+resto) == "0") {
								if (leerCookie("edicionTorneoNPeriodosPenalties"+resto)) {
									sumaTotal += 1;
								}
							}else{
								if (leerCookie("edicionTorneoUnidad"+resto) && leerCookie("edicionTorneoMinutosPeriodosProrroga"+resto) && leerCookie("edicionTorneoTMTotalesProrroga"+resto) && leerCookie("edicionTorneoTMMaxPeriodoProrroga"+resto)) {
									if (leerCookie("edicionTorneoNPeriodosPenalties"+resto)) {
										sumaTotal += 1;
									}
								}
							}
						}

						// Comprobar si están todas las cookies necesarias
						switch (sumaTotal) {
							case 0:
								document.getElementById("par"+resto).style.color = "var(--color-corporativo-morado)";
								crearCookie("estadoCookiesReglasPar"+resto,"0");
								break;
							case 1:
								document.getElementById("par"+resto).style.color = "var(--color-corporativo-rosa)";
								crearCookie("estadoCookiesReglasPar"+resto,"1");
								break;
							case 2:
							case 3:
								document.getElementById("par"+resto).style.color = "var(--color-texto)";
								crearCookie("estadoCookiesReglasPar"+resto,"2");
								break;
						}
						break;
					case "Participantes":
						if (leerCookie("edicionTorneoTipoParticipantes"+categoria+"Fase"+fase) == "heredado") {
							document.getElementById("pos"+resto).style.color = "var(--color-texto)";
							crearCookie("estadoCookiesReglasPar"+resto,"2");
							comprobarTodasCookies(categoria);
						}else if (leerCookie("edicionTorneoTipoParticipantes"+categoria+"Fase"+fase) == "manual") {
							var sumaTotal = 0;
							var cookie = leerCookie("edicionTorneoParticipantes"+resto);
							for (var i = 1; i <= cookie; i++) {
								if (leerCookie("edicionTorneoEquipo"+i+"IDCat"+resto)) {
									sumaTotal += 1;
								}
							}
							//console.log(cookie,sumaTotal);
							if (cookie == 0) {
								document.getElementById("pos"+resto).style.color = "var(--color-corporativo-morado)";
								crearCookie("estadoCookiesReglasPos"+resto,"0");
							}else if (cookie > sumaTotal) {
								document.getElementById("pos"+resto).style.color = "var(--color-corporativo-rosa)";
								crearCookie("estadoCookiesReglasPos"+resto,"1");
							}else if (cookie == sumaTotal) {
								document.getElementById("pos"+resto).style.color = "var(--color-texto)";
								crearCookie("estadoCookiesReglasPos"+resto,"2");
							}
							// Dejar guardadas las cookies y comprobar si están todas
							comprobarTodasCookies(categoria);
						}
						break;
					case "listaEquipos":
						// Mostrar escudo y nombre nuevo
						mostrarEscudosParticipantes(resto);
					
						for (var i = 1; i <= leerCookie("edicionTorneoParticipantes"+categoria+"Fase"+fase); i++) {
							if (leerCookie("edicionTorneoEquipo"+i+"Cat"+categoria+"Fase"+fase)) {
								var label = leerCookie("edicionTorneoEquipo"+i+"Cat"+categoria+"Fase"+fase);
								var id = "#nombreParticipantes"+i+"Cat"+categoria+"Fase"+fase;
								document.querySelector(id).innerHTML = label;
							}
						}
						break;
				}
			};

			function comprobarTodasCookies(categoria) {
				// Apartado Reglas Fase
				var sumaCat = 0;
				for (var i = 1; i <= leerCookie("edicionTorneoNumFases"+categoria); i++) {
					if (leerCookie("estadoCookiesReglasCat"+categoria+"Fase"+i) == "2") {
						sumaCat += 1;
					}
				}
				if (leerCookie("edicionTorneoNumFases"+categoria) == sumaCat) {
					document.getElementById("testerReglas"+categoria).src="img/Menu/ok.png";
				}else{
					document.getElementById("testerReglas"+categoria).src="img/Menu/error.png";
				}

				// Apartado Reglas Partidos
				var sumaPar = 0;
				for (var i = 1; i <= leerCookie("edicionTorneoNumFases"+categoria); i++) {
					if (leerCookie("estadoCookiesReglasPar"+categoria+"Fase"+i) == "2") {
						sumaPar += 1;
					}
				}
				if (leerCookie("edicionTorneoNumFases"+categoria) == sumaPar) {
					document.getElementById("testerPartido"+categoria).src="img/Menu/ok.png";
				}else{
					document.getElementById("testerPartido"+categoria).src="img/Menu/error.png";
				}

				// Apartado Participantes
				var sumaPart = 0;
				for (var i = 1; i <= leerCookie("edicionTorneoNumFases"+categoria); i++) {
					if (leerCookie("estadoCookiesReglasPos"+categoria+"Fase"+i) == "2") {
						sumaPart += 1;
					}
				}
				if (leerCookie("edicionTorneoNumFases"+categoria) == sumaPart) {
					document.getElementById("testerEquipos"+categoria).src="img/Menu/ok.png";
				}else{
					document.getElementById("testerEquipos"+categoria).src="img/Menu/error.png";
				}
			};

			function mostrarEscudosParticipantes(resto) {
				switch (leerCookie("edicionTorneoDeporte")) {
					case "1":
						var deporte = "Balonmano";
						break;
					case "2":
						var deporte = "Baloncesto";
						break;
					case "3":
						var deporte = "Futsal";
						break;
				}
				var temporada = leerCookie("edicionTorneoTemporada");

				var participantes = parseInt(leerCookie("edicionTorneoParticipantes"+resto))+1;
				for (var i = 1; i < participantes; i++) {
					if (leerCookie("edicionTorneoEquipo"+i+"EscudoCat"+resto)) {
						var direccionCookie = leerCookie("edicionTorneoEquipo"+i+"EscudoCat"+resto);
						var direccion = "img/Clubes/"+deporte+"/Equipos/"+temporada+"/"+direccionCookie;
					}else{
						var direccion = "img/Clubes/Clubes/defecto.png";
					}
					if (leerCookie("edicionTorneoEquipo"+i+"NombreCat"+resto)) {
						var nombre = leerCookie("edicionTorneoEquipo"+i+"NombreCat"+resto);
					}else{
						var nombre = "Nombre del equipo "+i;
					}

					document.getElementById("escudoParticipante"+i+"Cat"+resto).src = direccion;
					document.getElementById("nombreParticipante"+i+"Cat"+resto).innerHTML = nombre;
				}
			};