function mostrarDirectoTV(idPartido) {
	// Tomar Idioma
	const textoMSuperior = textoMenuSuperior();
	const textoIdioma = textoDirectoTV();

	const deporte = sessionStorage.getItem("Deporte");


	// Preparar código cuadro superior
	let superior = versionBeta();		
	superior += "	<img class='h15 botonVolverMenuSuperior' src='img/Menu/anterior.png' alt='Volver'>";
	superior += "	<label onclick=\"pasarPantalla('menuDirectoTV', 'menuCompeticiones')\">"+textoMSuperior[0]+"</label>";
	superior += "	<label class='botonMenuSuperior'>"+textoIdioma[0]+" · "+ textoDeportes(deporte) +"</label>";
	superior += "	<img class='botonMenuSuperior logoBigDT' src='img/Menu/Logo_BigDT.png' onclick=\"pasarPantalla('menuDirectoTV', 'menuCompeticiones')\">";

	$("#cajaMenuSuperiorDirectoTV").html(superior);

	let central = "";
	central += " <div class='w60 h15 centradoXY'>";
	central += " 	<div class='w50 h100 spaceAroundXY'>";
	central += " 		<img class='h90' src='img/Clubes/Balonmano/Equipos/"+sessionStorage.getItem("escudoL")+"' alt='Escudo'>";
	central += " 		<strong>Vs</strong>";
	central += " 		<img class='h90' src='img/Clubes/Balonmano/Equipos/"+sessionStorage.getItem("escudoV")+"' alt='Escudo'>";
	central += "	 </div>";
	central += " </div>";
	central += " <div class='w45 h60 centradoXY flexWrap'>";
	central += "	<h1>"+textoIdioma[1]+"</h1>";
	central += "	<div class='w90 h80 centradoXY' style='border-top: 3px solid var(--color-corporativo-morado); border-bottom: 3px solid var(--color-corporativo-morado); border-radius: 30px'>";
	central += "	</div>";
	central += " </div>";
	central += " <div class='w45 h60 centradoXY flexWrap'>";
	central += "	<h1>"+textoIdioma[2]+"</h1>";
	central += "	<div class='w90 h80 spaceAroundXY flexWrap' style='border-top: 3px solid var(--color-corporativo-morado); border-bottom: 3px solid var(--color-corporativo-morado); border-radius: 30px'>";
	central += "		<div class='w60 h20 centradoXY pulsable' onclick=\"sessionStorage.setItem('idPartido',"+idPartido+");mostrarInfografia(1)\" style='border: 3px solid var(--color-corporativo-rosa); border-radius: 20px'>Estadísticas Generales</div>";
	central += "		<div class='w60 h20 centradoXY pulsable' onclick=\"sessionStorage.setItem('idPartido',"+idPartido+");mostrarInfografia(2)\" style='border: 3px solid var(--color-corporativo-rosa); border-radius: 20px'>Marcador</div>";
	central += "	</div>";
	central += " </div>";
	central += " <div class='w60 h15 centradoInlineXY'>";
	central += " </div>";

	$("#cajaMenuCentralDirectoTV").html(central);
	
	document.getElementById("menuDirectoTV").classList.remove("invisible");
};

function mostrarInfografia(opcion, idPartido) {
	document.getElementById("bodyMenu").classList.add("invisible");
	document.getElementById("bodyDirecto").classList.remove("invisible");

	let central = "";

	switch(opcion) {
	case 1:
		// Estadísticas Generales
		central += "	<div class='w100 h20 centradoXY' style='background: rgba(13,0,46,.8)'>";
		central += "		<div class='h100 w30 centradoXY flexWrap' style='font-size: 1.4em;'>";
		central += "			<span class='w20 h20'></span>";
		central += "			<span class='w100 h12 centradoXY'>Jornada "+sessionStorage.getItem("jornada")+"</span>";
		central += "			<span class='w100 h12 centradoXY'>Primera Nacional</span>";
		central += "			<span class='w100 h12 centradoXY'>Grupo F</span>";
		central += "			<span class='w20 h20'></span>";
		central += "		</div>";
		central += "		<label class='w40' style='font-size: 4em; margin-top:3%;'></label>";
		central += "		<span class='w20'></span>";
		central += "		<div class='w10 h100 centradoXY'>";
		central += "			<img class='w60' src='img/Menu/Logo_BigDT_Blanco.png' alt='BigDT'>";
		central += "		</div>";
		central += "	</div>";
		central += "	<div class='w100 h70 centradoXY'>";
		central += "		<div class='w70 h90 centradoXY flexWrap' style='background: rgba(13,0,46,.8); border-radius: 20px; font-size:2.5em'>";
		central += "			<div class='w100 h80 centradoXY'>";
		central += "				<span class='w15 h10'></span>";
		central += "				<div class='w20 h95 centradoXY flexWrap'>";
		central += "					<div class='w90 h12 centradoXY'><span id='directoPosesionesAL' class='w50 centradoXY'>0/0</span><span id='directoPosesionesBL' class='w50 centradoXY'>0%</span></div>";
		central += "					<div class='w90 h12 centradoXY'><span id='directoTirosAL' class='w50 centradoXY'>0/0</span><span id='directoTirosBL' class='w50 centradoXY'>0%</span></div>";
		central += "					<div class='w90 h12 centradoXY'><span id='directoContrasAL' class='w50 centradoXY'>0/0</span><span id='directoContrasBL' class='w50 centradoXY'>0%</span></div>";
		central += "					<div class='w90 h12 centradoXY'><span id='directoTiros7mAL' class='w50 centradoXY'>0/0</span><span id='directoTiros7mBL' class='w50 centradoXY'>0%</span></div>";
		central += "					<div class='w90 h12 centradoXY'><span id='directoRobosPerdidasAL' class='w50 centradoXY'>0</span><span id='directoRobosPerdidasBL' class='w50 centradoXY'>0</span></div>";
		central += "					<div id='directoPasivosL' class='w90 h12 centradoXY'>0</div>";
		central += "					<div id='directoPVaciaL' class='w90 h12 centradoXY'>0</div>";
		central += "					<div id='directoParadasL' class='w90 h12 centradoXY'>0</div>";
		central += "				</div>";
		central += "				<div class='w30 h95 centradoXY flexWrap'>";
		central += "					<div class='w90 h12 centradoXY'>Posesiones</div>";
		central += "					<div class='w90 h12 centradoXY'>Tiros de Campo</div>";
		central += "					<div class='w90 h12 centradoXY'>Contraataques</div>";
		central += "					<div class='w90 h12 centradoXY'>Tiros de 7M</div>";
		central += "					<div class='w90 h12 centradoXY'>Robos/Pérdidas</div>";
		central += "					<div class='w90 h12 centradoXY'>Pasivos</div>";
		central += "					<div class='w90 h12 centradoXY'>Portería Vacía</div>";
		central += "					<div class='w90 h12 centradoXY'>Paradas</div>";
		central += "				</div>";
		central += "				<div class='w20 h95 centradoXY flexWrap'>";
		central += "					<div class='w90 h12 centradoXY'><span id='directoPosesionesBV' class='w50 centradoXY'>0%</span><span id='directoPosesionesAV' class='w50 centradoXY'>0/0</span></div>";
		central += "					<div class='w90 h12 centradoXY'><span id='directoTirosBV' class='w50 centradoXY'>0%</span><span id='directoTirosAV' class='w50 centradoXY'>0/0</span></div>";
		central += "					<div class='w90 h12 centradoXY'><span id='directoContrasBV' class='w50 centradoXY'>0%</span><span id='directoContrasAV' class='w50 centradoXY'>0/0</span></div>";
		central += "					<div class='w90 h12 centradoXY'><span id='directoTiros7mBV' class='w50 centradoXY'>0%</span><span id='directoTiros7mAV' class='w50 centradoXY'>0/0</span></div>";
		central += "					<div class='w90 h12 centradoXY'><span id='directoRobosPerdidasBV' class='w50 centradoXY'>0</span><span id='directoRobosPerdidasAV' class='w50 centradoXY'>0</span></div>";
		central += "					<div id='directoPasivosV' class='w90 h12 centradoXY'>0</div>";
		central += "					<div id='directoPVaciaV' class='w90 h12 centradoXY'>0</div>";
		central += "					<div id='directoParadasV' class='w90 h12 centradoXY'>0</div>";
		central += "				</div>";
		central += "				<span class='w15 h10'></span>";
		central += "			</div>";
		/*central += "			<div class='w100 h40 centradoXY'>";
		central += "				<div class='w30 h95 centradoXY flexWrap'>";
		central += "					<div class='w100 h45 spaceAroundXY' style='position:relative'>";
		central += "						<div class='w30 h100 centradoXY'><img id='maxGoleador0L' class='w90 circuloImagenFoto escudoSombra' src='img/Clubes/usuario.png' alt='Jugador'></div>";
		central += "						<div class='w30 h100 centradoXY'><img id='maxGoleador1L' class='w90 circuloImagenFoto escudoSombra' src='img/Clubes/usuario.png' alt='Jugador'></div>";
		central += "						<div class='w30 h100 centradoXY'><img id='maxGoleador2L' class='w90 circuloImagenFoto escudoSombra' src='img/Clubes/usuario.png' alt='Jugador'></div>";
		central += "						<label id='labelMaxGoleador0L' class='datoJugadorDirecto escudoSombra' style='font-size:.5em; position: absolute;background: var(--color-corporativo-rosa);border-radius: 50px;left: 10.5%;bottom: 2%;width:50px;text-align:center'>--</label>";
		central += "						<label id='labelMaxGoleador1L' class='datoJugadorDirecto escudoSombra' style='font-size:.5em; position: absolute;background: var(--color-corporativo-rosa);border-radius: 50px;right: 43.5%;bottom: 2%;width:50px;text-align:center'>--</label>";
		central += "						<label id='labelMaxGoleador2L' class='datoJugadorDirecto escudoSombra' style='font-size:.5em; position: absolute;background: var(--color-corporativo-rosa);border-radius: 50px;right: 10.5%;bottom: 2%;width:50px;text-align:center'>--</label>";
		central += "					</div>";
		central += "					<div class='w100 h45 centradoXY' style='position:relative'>";
		central += "						<div class='w30 h100 centradoXY'><img id='directoPortero0L' class='w90 circuloImagenFoto escudoSombra' src='img/Clubes/usuario.png' alt='Jugador'></div>";
		central += "						<div style='width: 5%;'></div>";
		central += "						<div class='w30 h100 centradoXY'><img id='directoPortero1L' class='w90 circuloImagenFoto escudoSombra' src='img/Clubes/usuario.png' alt='Jugador'></div>";
		central += "						<label id='labelPortero0L' class='datoPorteroDirecto escudoSombra' style='font-size:.5em; position: absolute;background: var(--color-corporativo-rosa);border-radius: 50px;left: 23%;bottom: 5%;width:77px; text-align:center'>--<small>(--%)</small></label>";
		central += "						<label id='labelPortero1L' class='datoPorteroDirecto escudoSombra' style='font-size:.5em; position: absolute;background: var(--color-corporativo-rosa);border-radius: 50px;right: 23%;bottom: 5%;width:77px; text-align:center'>--<small>(--%)</small></label>";
		central += "					</div>";
		central += "				</div>";

		central += "				<div class='w30 h95 centradoXY flexWrap'>";
		central += "					<small class='w90 h45 centradoXY' style='text-align:center'>Máximos<br>Goleadores</small>";
		central += "					<small class='w90 h45 centradoXY' style='text-align:center'>Porteros<br>Tiros(%paradas)</small>";
		central += "				</div>";

		central += "				<div class='w30 h95 centradoXY flexWrap'>";
		central += "					<div class='w100 h45 spaceAroundXY' style='position:relative'>";
		central += "						<div class='w30 h100 centradoXY'><img id='maxGoleador0V' class='w90 circuloImagenFoto escudoSombra' src='img/Clubes/usuario.png' alt='Jugador'></div>";
		central += "						<div class='w30 h100 centradoXY'><img id='maxGoleador1V' class='w90 circuloImagenFoto escudoSombra' src='img/Clubes/usuario.png' alt='Jugador'></div>";
		central += "						<div class='w30 h100 centradoXY'><img id='maxGoleador2V' class='w90 circuloImagenFoto escudoSombra' src='img/Clubes/usuario.png' alt='Jugador'></div>";
		central += "						<label id='labelMaxGoleador0V' class='datoJugadorDirecto escudoSombra' style='font-size:.5em; position: absolute;background: var(--color-corporativo-rosa);border-radius: 50px;left: 10.5%;bottom: 2%;width:50px;text-align:center'>--</label>";
		central += "						<label id='labelMaxGoleador1V' class='datoJugadorDirecto escudoSombra' style='font-size:.5em; position: absolute;background: var(--color-corporativo-rosa);border-radius: 50px;right: 43.5%;bottom: 2%;width:50px;text-align:center'>--</label>";
		central += "						<label id='labelMaxGoleador2V' class='datoJugadorDirecto escudoSombra' style='font-size:.5em; position: absolute;background: var(--color-corporativo-rosa);border-radius: 50px;right: 10.5%;bottom: 2%;width:50px;text-align:center'>--</label>";
		central += "					</div>";
		central += "					<div class='w100 h45 centradoXY' style='position:relative'>";
		central += "						<div class='w30 h100 centradoXY'><img id='directoPortero0V' class='w90 circuloImagenFoto escudoSombra' src='img/Clubes/usuario.png' alt='Jugador'></div>";
		central += "						<div style='width: 5%;'></div>";
		central += "						<div class='w30 h100 centradoXY'><img id='directoPortero1V' class='w90 circuloImagenFoto escudoSombra' src='img/Clubes/usuario.png' alt='Jugador'></div>";
		central += "						<label id='labelPortero0V' class='datoPorteroDirecto escudoSombra' style='font-size:.5em; position: absolute;background: var(--color-corporativo-rosa);border-radius: 50px;left: 23%;bottom: 5%;width:77px; text-align:center'>--<small>(--%)</small></label>";
		central += "						<label id='labelPortero1V' class='datoPorteroDirecto escudoSombra' style='font-size:.5em; position: absolute;background: var(--color-corporativo-rosa);border-radius: 50px;right: 23%;bottom: 5%;width:77px; text-align:center'>--<small>(--%)</small></label>";
		central += "					</div>";
		central += "				</div>";
		central += "			</div>";*/
		central += "		</div>";
		central += "	</div>";
		central += "	<span class='w20 h10'></span>";

		setInterval(function() {actualizarEstadisticasGeneralesTV();}, 1000);

		function actualizarEstadisticasGeneralesTV() {
			$.ajax({
		        url: "php/estadisticasVivoTV.php",
		        type: 'POST',
		        data: {
		        	IdPartido: sessionStorage.getItem("idPartido")
		        },
		        success: function(res){
		        	var js= JSON.parse(res);

		        	// Marcador
		        	if (js.Local !== 0) {
		        		let codigoPosesionBL = js.Local[0].Posesiones == 0 ? "0%" : (100*js.Local[0].Goles/js.Local[0].Posesiones).toFixed(0)+"%";
		        		document.getElementById("directoPosesionesAL").innerHTML = js.Local[0].Goles+"/"+js.Local[0].Posesiones;
		        		document.getElementById("directoPosesionesBL").innerHTML = codigoPosesionBL;

		        		document.getElementById("directoTirosAL").innerHTML = js.Local[0].TirosCampo_OK+"/"+js.Local[0].TirosCampo;
		        		let codigoTirosCampoL = js.Local[0].TirosCampo == 0 ? "0%" : (100*js.Local[0].TirosCampo_OK/js.Local[0].TirosCampo).toFixed(0)+"%";
		        		document.getElementById("directoTirosBL").innerHTML = codigoTirosCampoL;

		        		document.getElementById("directoTiros7mAL").innerHTML = js.Local[0].Goles_7M+"/"+js.Local[0].Tiros_7M;
		        		let codigoTiros7MBL = js.Local[0].Tiros_7M == 0 ? "0%" : (100*js.Local[0].Goles_7M/js.Local[0].Tiros_7M).toFixed(0)+"%";
		        		document.getElementById("directoTiros7mBL").innerHTML = codigoTiros7MBL;

		        		document.getElementById("directoRobosPerdidasAL").innerHTML = js.Local[0].Robos_OK;
		        		document.getElementById("directoRobosPerdidasBL").innerHTML = js.Local[0].Perdidas;

		        		document.getElementById("directoContrasAL").innerHTML = js.Local[0].Goles_Contraataques+"/"+js.Local[0].Contraataques;
		        		let porcentajeContrasL = js.Local[0].Contraataques == 0 ? "0%" : (100*js.Local[0].Goles_Contraataques/js.Local[0].Contraataques).toFixed(0)+"%";
		        		document.getElementById("directoContrasBL").innerHTML = porcentajeContrasL;

		        		document.getElementById("directoPasivosL").innerHTML = js.Local[0].Pasivos;

		        		document.getElementById("directoPVaciaL").innerHTML = js.Local[0].PVacia;
		        	}else{
		        		document.getElementById("directoPosesionesAL").innerHTML = "0/0";
		        		document.getElementById("directoPosesionesBL").innerHTML = "0%";

		        		document.getElementById("directoTirosAL").innerHTML = "0/0";
		        		document.getElementById("directoTirosBL").innerHTML = "0%";

		        		document.getElementById("directoTiros7mAL").innerHTML = "0/0";
		        		document.getElementById("directoTiros7mBL").innerHTML = "0%";

		        		document.getElementById("directoRobosPerdidasAL").innerHTML = "0";
		        		document.getElementById("directoRobosPerdidasBL").innerHTML = "0";

		        		document.getElementById("directoContrasAL").innerHTML = "0/0";
		        		document.getElementById("directoContrasBL").innerHTML = "0%";

		        		document.getElementById("directoPasivosL").innerHTML = "0";

		        		document.getElementById("directoPVaciaL").innerHTML = "0";
		        	}

		        	if (js.Visitante !== 0) {
		        		/*

						Meter:
							· 7m: ahora están los tiros totales. Hay que poner los tiros que han sido gol


						Gráficas:
							· Evolución de goles por minutos


		        		*/
		        		document.getElementById("directoPosesionesAV").innerHTML = js.Visitante[0].Goles+"/"+js.Visitante[0].Posesiones;
		        		let codigoPosesionBV = js.Visitante[0].Posesiones == 0 ? "0%" : (100*js.Visitante[0].Goles/js.Visitante[0].Posesiones).toFixed(0)+"%";
		        		document.getElementById("directoPosesionesBV").innerHTML = codigoPosesionBV;

		        		document.getElementById("directoTirosAV").innerHTML = js.Visitante[0].TirosCampo_OK+"/"+js.Visitante[0].TirosCampo;
		        		let codigoTirosCampoV = js.Visitante[0].TirosCampo == 0 ? "0%" : (100*js.Visitante[0].TirosCampo_OK/js.Visitante[0].TirosCampo).toFixed(0)+"%";
		        		document.getElementById("directoTirosBV").innerHTML = codigoTirosCampoV;

		        		document.getElementById("directoTiros7mAV").innerHTML = js.Visitante[0].Goles_7M+"/"+js.Visitante[0].Tiros_7M;
		        		let codigoTiros7MBV = js.Visitante[0].Tiros_7M == 0 ? "0%" : (100*js.Visitante[0].Goles_7M/js.Visitante[0].Tiros_7M).toFixed(0)+"%";
		        		document.getElementById("directoTiros7mBV").innerHTML = codigoTiros7MBV;

		        		document.getElementById("directoRobosPerdidasAV").innerHTML = js.Visitante[0].Robos_OK;
		        		document.getElementById("directoRobosPerdidasBV").innerHTML = js.Visitante[0].Perdidas;

		        		document.getElementById("directoContrasAV").innerHTML = js.Visitante[0].Goles_Contraataques+"/"+js.Visitante[0].Contraataques;
		        		let porcentajeContrasV = js.Visitante[0].Contraataques == 0 ? "0%" : (100*js.Visitante[0].Goles_Contraataques/js.Visitante[0].Contraataques).toFixed(0)+"%";
		        		document.getElementById("directoContrasBV").innerHTML = porcentajeContrasV;

		        		document.getElementById("directoPasivosV").innerHTML = js.Visitante[0].Pasivos;

		        		document.getElementById("directoPVaciaV").innerHTML = js.Visitante[0].PVacia;
		        		/*









faltan las paradas y ver si falla la actualización de datos en la vista de la BD





























		        		*/
		        	}else{
		        		document.getElementById("directoPosesionesAV").innerHTML = "0/0";
		        		document.getElementById("directoPosesionesBV").innerHTML = "0%";

		        		document.getElementById("directoTirosAV").innerHTML = "0/0";
		        		document.getElementById("directoTirosBV").innerHTML = "0%";

		        		document.getElementById("directoTiros7mAV").innerHTML = "0/0";
		        		document.getElementById("directoTiros7mBV").innerHTML = "0%";

		        		document.getElementById("directoRobosPerdidasAV").innerHTML = "0";
		        		document.getElementById("directoRobosPerdidasBV").innerHTML = "0";

		        		document.getElementById("directoContrasAV").innerHTML = "0/0";
		        		document.getElementById("directoContrasBV").innerHTML = "0%";

		        		document.getElementById("directoPasivosV").innerHTML = "0";

		        		document.getElementById("directoPVaciaV").innerHTML = "0";
		        	}
		        	
		        	if (js.GoleadoresL !== 0 && js.GoleadoresL !== null) {
		        		for (var i = js.GoleadoresL.length - 1; i >= 0; i--) {
		        			let labelSrc = "maxGoleador"+i+"L";
		        			document.getElementById(labelSrc).src = "img/Clubes/Balonmano/Plantillas/"+js.GoleadoresL[i].IdEquipo+"/"+js.GoleadoresL[i].Foto;
		        			
		        			let labelGoles = "labelMaxGoleador"+i+"L";
		        			let goles = js.GoleadoresL[i].Suma == 0 ? "--" : js.GoleadoresL[i].Suma;
		        			document.getElementById(labelGoles).innerHTML = goles;
		        		}
		        	}
		        	if (js.GoleadoresV !== 0 && js.GoleadoresV !== null) {
		        		for (var i = js.GoleadoresV.length - 1; i >= 0; i--) {
		        			let labelSrc = "maxGoleador"+i+"V";
		        			document.getElementById(labelSrc).src = "img/Clubes/Balonmano/Plantillas/"+js.GoleadoresV[i].IdEquipo+"/"+js.GoleadoresV[i].Foto;
		        			
		        			let labelGoles = "labelMaxGoleador"+i+"V";
		        			let goles = js.GoleadoresV[i].Suma == 0 ? "--" : js.GoleadoresV[i].Suma;
		        			document.getElementById(labelGoles).innerHTML = goles;
		        		}
		        	}

		        	if (js.PorterosL !== 0 && js.PorterosL !== null) {
		        		for (var i = js.PorterosL.length - 1; i >= 0; i--) {
		        			let labelSrc = "directoPortero"+i+"L";
		        			document.getElementById(labelSrc).src = "img/Clubes/Balonmano/Plantillas/"+js.PorterosL[i].IdEquipo+"/"+js.PorterosL[i].Foto;


		        			let label = "labelPortero"+i+"L";
		        			let porcentaje = (js.PorterosL[i].Suma / js.PorterosL[i].TirosTotal) * 100;
		        			let codigo = js.PorterosL[i].TirosTotal+"<small>("+porcentaje.toFixed(1)+"%)</small>";
		        			document.getElementById(label).innerHTML = codigo;
		        		}
		        	}
		        	if (js.PorterosV !== 0 && js.PorterosV !== null) {
		        		for (var i = js.PorterosV.length - 1; i >= 0; i--) {
		        			let labelSrc = "directoPortero"+i+"V";
		        			document.getElementById(labelSrc).src = "img/Clubes/Balonmano/Plantillas/"+js.PorterosV[i].IdEquipo+"/"+js.PorterosV[i].Foto;


		        			let label = "labelPortero"+i+"V";
		        			let porcentaje = (js.PorterosV[i].Suma / js.PorterosV[i].TirosTotal) * 100;
		        			let codigo = js.PorterosV[i].TirosTotal+"<small>("+porcentaje.toFixed(1)+"%)</small>";
		        			document.getElementById(label).innerHTML = codigo;
		        		}
		        	}
		        }
		    });
		};
		break;
	case 2:
		// Marcador		
		central += "	<div class='w100 h15 centradoXY'>";
		central += "		<div class='w40 h100 centradoXY flexWrap'>";
		central += "			<span class='h10 w100'></span>";
		central += "			<div class='h60 w100 centradoInlineXY'>";
		central += "				<div id='exclusionesL' class='h100 w10 centradoXY flexWrap'>";
		central += "				</div>";
		central += "				<div class='h100 w70 centradoInlineXY' style='background: rgba(13,0,46)'>";
		central += "					<div class='h100 w20 centradoXY'>";
		central += "						<img class='h80 w90' src='img/Clubes/Balonmano/Equipos/"+sessionStorage.getItem("escudoL")+"' alt='BigDT'>";
		central += "					</div>";
		central += "					<div class='h100 w25 centradoXY'>";
		central += "						<label id='directoGolesL' class='centradoXY' style='font-size: 3.5em;'>0</label>";
		central += "					</div>";
		central += "					<div class='h100 w10 centradoXY'>";
		central += "						<img class='h50 w80' src='img/Menu/Logo_BigDT_Blanco.png' alt='BigDT'>";
		central += "					</div>";
		central += "					<div class='h100 w25 centradoXY'>";
		central += "						<label id='directoGolesV' class='centradoXY' style='font-size: 3.5em;'>0</label>";
		central += "					</div>";
		central += "					<div class='h100 w20 centradoXY'>";
		central += "						<img class='h80 w90' src='img/Clubes/Balonmano/Equipos/"+sessionStorage.getItem("escudoV")+"' alt='BigDT'>";
		central += "					</div>";
		central += "				</div>";
		central += "				<div id='exclusionesV' class='h100 w10 centradoXY flexWrap'>";
		central += "				</div>";
		central += "			</div>";
		central += "			<div class='h30 w30 centradoInlineXY'>";
		central += "				<strong id='directoReloj' class='w90 h100 centradoXY' style='background: var(--color-texto); color:rgba(13,0,46); font-size: 2.5em;'>0T 00:00</strong>";
		central += "			</div>";
		central += "		</div>";
		central += "	</div>";
		central += "	<span class='h80 w100'></span>";

		setInterval(function() {actualizarMarcadorTV();}, 1000);

		function actualizarMarcadorTV() {
			$.ajax({
		        url: "php/marcadorVivoTV.php",
		        type: 'POST',
		        data: {
		        	IdPartido: sessionStorage.getItem("idPartido"),

		        },
		        success: function(res){
		        	let js= JSON.parse(res);

		        	let periodo = js.Datos[0].Estado < 2 ? "1T" : "2T";
		        	let reloj = (js.Datos[0].Minuto).split(':');
		        	document.getElementById("directoReloj").innerHTML = periodo+" "+reloj[1]+":"+reloj[2];

		        	document.getElementById("directoGolesL").innerHTML = js.Datos[0].GolesLocal;
		        	document.getElementById("directoGolesV").innerHTML = js.Datos[0].GolesVisitante;

		        	const tiempoActual = new Date(`1970-01-01T${js.Datos[0].Minuto}`);
		        	const minutoActual = tiempoActual.getMinutes();
		        	const segundoActual = tiempoActual.getSeconds();
	        		let codigoL = "",
	        		    codigoV = "";
		        	if (js.Exclusiones.Local[0] !== "0") {
		        		for (var i = 0; i < js.Exclusiones.Local.length; i++) {
		        		//for (var i = js.Exclusiones.Local.length - 1; i >= 0; i--) {
		        			let tiempoExclusion = new Date(`1970-01-01T${js.Exclusiones.Local[i].Minuto}`);;
		        			let minutoExclusion = tiempoExclusion.getMinutes();
		        			let segundoExclusion = tiempoExclusion.getSeconds();
		        			let diferencia = 120 - (minutoActual * 60 + segundoActual) + (minutoExclusion * 60 + segundoExclusion);
		        			let minutosRestantes = Math.floor(diferencia / 60);
		        			let segundosRestantes = (diferencia % 60).toString().padStart(2,'0');
		        			codigoL += "<label class='h30 w100 textoExclusiones centradoXY debajo'>"+minutosRestantes+":"+segundosRestantes+"</label>";
		        		}
		        	}
		        	document.getElementById("exclusionesL").innerHTML = codigoL;
		        	if (js.Exclusiones.Visitante[0] !== "0") {
		        		for (var i = 0; i < js.Exclusiones.Visitante.length; i++) {
		        		//for (var i = js.Exclusiones.Visitante.length - 1; i >= 0; i--) {
		        			let tiempoExclusion = new Date(`1970-01-01T${js.Exclusiones.Visitante[i].Minuto}`);;
		        			let minutoExclusion = tiempoExclusion.getMinutes();
		        			let segundoExclusion = tiempoExclusion.getSeconds();
		        			let diferencia = 120 - (minutoActual * 60 + segundoActual) + (minutoExclusion * 60 + segundoExclusion);
		        			let minutosRestantes = Math.floor(diferencia / 60);
		        			let segundosRestantes = (diferencia % 60).toString().padStart(2,'0');
		        			codigoV += "<label class='h30 w100 textoExclusiones centradoXY debajo'>"+minutosRestantes+":"+segundosRestantes+"</label>";
		        		}
		        	}
		        	document.getElementById("exclusionesV").innerHTML = codigoV;
		        }
		    });
		};
		break;
	case 3:
		// Datos estadísticos en gráficas
		central += "	<div class='w100 h20 centradoXY' style='background: rgba(13,0,46,.8)'>";
		central += "		<div class='w10 h100 centradoXY'>";
		central += "			<img class='w60' src='img/Menu/Logo_BigDT.png' alt='BigDT'>";
		central += "		</div>";
		central += "		<label class='w50' style='font-size: 5em; margin-top:3%'>Estadísticas en vivo</label>";
		central += "		<div class='w40 h100 centradoXY'>";
		central += "			<img class='h80 w30 escudoSombra' src='img/Clubes/Balonmano/Equipos/"+sessionStorage.getItem("escudoL")+"' alt='BigDT'>";
		central += "			<label class='centradoXY' style='font-size: 3em;'>15</label>";
		central += "			<label class='w5 centradoXY' style='font-size: 3em;'>:</label>";
		central += "			<label class='centradoXY' style='font-size: 3em;'>12</label>";
		central += "			<img class='h80 w30 escudoSombra' src='img/Clubes/Balonmano/Equipos/"+sessionStorage.getItem("escudoV")+"' alt='BigDT'>";
		central += "		</div>";
		central += "	</div>";
		central += "	<div class='w100 h80 centradoXY'>";
		central += "		<div class='w70 h90 centradoXY flexWrap' style='background: rgba(13,0,46,.8); border-radius: 20px; font-size:2.5em'>";
		central += "		</div>";
		central += "	</div>";
		break;
	case 4:
		// Datos estadísticos durante el partido
		break;
	case 5:
		// ¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿Ya que no hay narrador, meter en texto alguna acción??????????????????????????????
		break;
	}
	$("#bodyDirecto").html(central);
};
