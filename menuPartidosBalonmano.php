<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="js/jquery.js"></script>
	<link rel="stylesheet" type="text/css" href="css/estilo.css">

	<title>Menú inicial</title>
</head>
<body>
	<div id="bodyMenu">
		<div id="bannerPubliIzq" class="w10"></div>
		<div class="recuadroBody">
			<div id="cajaMenuSuperior">
				<div class="cajaMenu w33" onclick="location.href='menu.php'"><img src="img/Menu/volver.png"><label>Volver</label></div>
				<div class="cajaMenu w33">
					<label>Competiciones</label>
				</div>
				<div class="cajaMenu w33"><img src="img/Menu/Balon Balonmano.png"><label>Balonmano</label></div>
			</div>
			<div id="cajaMenuCentral">
				<div class="lineaCajaMenuCentral">
					<div id="cajaLiga" class="w66"> <!--onclick="location.href='menuPartidosLigaBalonmano.php'">-->
						<div id="ligaMasculina" class="cajaMenu w49 h99">
							<div id="botonDivHonorM" class="h30 w100 divisionHonorFondo" onclick="seleccionarCompeticion('División HonorM')" ontouchstart="inicioPulsacion('botonDivHonorM')" ontouchend="finPulsacion('botonDivHonorM')">
								<label class="labelSeccionLiga">Liga Masculina</label>
								<label class="labelLiga">División Honor</label>
								<img src="img/Menu/logoLigaSacyrAsobal.png">
							</div>
							<div id="botonDivHonorPlataM" class="h30 w100 divisionHonorPlataFondo">
								<label class="labelSeccionLiga">Liga Masculina</label>
								<label class="labelLiga">División Honor Plata</label>
								<div class="h40 w90 cajaGrupos">
									<div id="botonDHPMcajaGrupoA" class="w45 h100 cajaBoton" onclick="seleccionarCompeticion('DH Plata Gr. AM')" ontouchstart="inicioPulsacion('botonDHPMcajaGrupoA')" ontouchend="finPulsacion('botonDHPMcajaGrupoA')">
										<label>Grupo A</label>
									</div>
									<div id="botonDHPMcajaGrupoB" class="w45 h100 cajaBoton" onclick="seleccionarCompeticion('DH Plata Gr. BM')" ontouchstart="inicioPulsacion('botonDHPMcajaGrupoB')" ontouchend="finPulsacion('botonDHPMcajaGrupoB')">
										<label>Grupo B</label>
									</div>
								</div>
							</div>
							<div id="botonPrimeraNacionalM" class="h30 w100 primeraNacionalFondo">
								<label class="labelSeccionLiga">Liga Masculina</label>
								<label class="labelLiga">Primera Nacional</label>
								<div class="h60 w90 cajaGrupos">
									<div class="h48 w100 fila">
										<div id="botonPNMcajaGrupoA" class="w30 h100 cajaBoton" onclick="seleccionarCompeticion('1ª Nacional Gr. AM')" ontouchstart="inicioPulsacion('botonPNMcajaGrupoA')" ontouchend="finPulsacion('botonPNMcajaGrupoA')">
											<label>Grupo A</label>
										</div>
										<div id="botonPNMcajaGrupoB" class="w30 h100 cajaBoton" onclick="seleccionarCompeticion('1ª Nacional Gr. BM')" ontouchstart="inicioPulsacion('botonPNMcajaGrupoB')" ontouchend="finPulsacion('botonPNMcajaGrupoB')">
											<label>Grupo B</label>
										</div>
										<div id="botonPNMcajaGrupoC" class="w30 h100 cajaBoton" onclick="seleccionarCompeticion('1ª Nacional Gr. CM')" ontouchstart="inicioPulsacion('botonPNMcajaGrupoC')" ontouchend="finPulsacion('botonPNMcajaGrupoC')">
											<label>Grupo C</label>
										</div>
									</div>
									<div class="h48 w100 fila">
										<div id="botonPNMcajaGrupoD" class="w30 h100 cajaBoton" onclick="seleccionarCompeticion('1ª Nacional Gr. DM')" ontouchstart="inicioPulsacion('botonPNMcajaGrupoD')" ontouchend="finPulsacion('botonPNMcajaGrupoD')">
											<label>Grupo D</label>
										</div>
										<div id="botonPNMcajaGrupoE" class="w30 h100 cajaBoton" onclick="seleccionarCompeticion('1ª Nacional Gr. EM')" ontouchstart="inicioPulsacion('botonPNMcajaGrupoE')" ontouchend="finPulsacion('botonPNMcajaGrupoE')">
											<label>Grupo E</label>
										</div>
										<div id="botonPNMcajaGrupoF" class="w30 h100 cajaBoton" onclick="seleccionarCompeticion('1ª Nacional Gr. FM')" ontouchstart="inicioPulsacion('botonPNMcajaGrupoF')" ontouchend="finPulsacion('botonPNMcajaGrupoF')">
											<label>Grupo F</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div id="ligaFemenina" class="cajaMenu w49 h99">
							<div id="botonDivHonorF" class="h30 w100 divisionHonorFondo" onclick="seleccionarCompeticion('División HonorF')" ontouchstart="inicioPulsacion('botonDivHonorF')" ontouchend="finPulsacion('botonDivHonorF')">
								<label class="labelSeccionLiga">Liga Femenina</label>
								<label class="labelLiga">División Honor</label>
								<img src="img/Menu/logoLigaGuerrerasIberdrola.png">
							</div>
							<div id="botonDivHonorPlataF" class="h30 w100 divisionHonorPlataFondo">
								<label class="labelSeccionLiga">Liga Femenina</label>
								<label class="labelLiga">División Honor Plata</label>
								<div class="h40 w90 cajaGrupos">
									<div id="botonDHPFcajaGrupoA" class="w20 h100 cajaBoton" onclick="seleccionarCompeticion('DH Plata Gr. AF')" ontouchstart="inicioPulsacion('botonDHPFcajaGrupoA')" ontouchend="finPulsacion('botonDHPFcajaGrupoA')">
										<label>Grupo A</label>
									</div>
									<div id="botonDHPFcajaGrupoB" class="w20 h100 cajaBoton" onclick="seleccionarCompeticion('DH Plata Gr. BF')" ontouchstart="inicioPulsacion('botonDHPFcajaGrupoB')" ontouchend="finPulsacion('botonDHPFcajaGrupoB')">
										<label>Grupo B</label>
									</div>
									<div id="botonDHPFcajaGrupoC" class="w20 h100 cajaBoton" onclick="seleccionarCompeticion('DH Plata Gr. CF')" ontouchstart="inicioPulsacion('botonDHPFcajaGrupoC')" ontouchend="finPulsacion('botonDHPFcajaGrupoC')">
										<label>Grupo C</label>
									</div>
									<div id="botonDHPFcajaGrupoD" class="w20 h100 cajaBoton" onclick="seleccionarCompeticion('DH Plata Gr. DF')" ontouchstart="inicioPulsacion('botonDHPFcajaGrupoD')" ontouchend="finPulsacion('botonDHPFcajaGrupoD')">
										<label>Grupo D</label>
									</div>
								</div>
							</div>
							<div id="botonPrimeraNacionalF" class="h30 w100 primeraNacionalFondo"> <!--ontouchstart="inicioPulsacion('botonPrimeraNacionalF')" ontouchend="finPulsacion('botonPrimeraNacionalF')">-->
							</div>
						</div>
					</div>
					<div id="cajaCopas" class="w33">
						<div class="cajaMenu w100">
							<label>Copa</label>
							<label class="sombraTextoPartidos">Copa</label>
							<div id="cajaBotones" class="w20 h20">
								<div id="botonCopaMasculino" onclick="seleccionarCompeticion('Copa del ReyM')" ontouchstart="inicioPulsacion('botonCopaMasculino')" ontouchend="finPulsacion('botonCopaMasculino')"></div>
								<div id="botonCopaFemenino" onclick="seleccionarCompeticion('Copa del ReyF')" ontouchstart="inicioPulsacion('botonCopaFemenino')" ontouchend="finPulsacion('botonCopaFemenino')"></div>
							</div>
						</div>
						<div class="cajaMenu w100">
							<label>Supercopa</label>
							<label class="sombraTextoPartidos">Supercopa</label>
							<div id="cajaBotones" class="w20 h20">
								<div id="botonSuperCopaMasculino" onclick="seleccionarCompeticion('Supercopa EspañaM')" ontouchstart="inicioPulsacion('botonSuperCopaMasculino')" ontouchend="finPulsacion('botonSuperCopaMasculino')"></div>
								<div id="botonSuperCopaFemenino" onclick="seleccionarCompeticion('Supercopa EspañaF')" ontouchstart="inicioPulsacion('botonSuperCopaFemenino')" ontouchend="finPulsacion('botonSuperCopaFemenino')"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="lineaCajaMenuCentral">
					<div class="cajaMenu w49 h43" id="cajaOtrasCompeticiones">
						<label>Otras competiciones</label>
						<label class="sombraTextoPartidos">Otras competiciones</label>
					</div>
					<div class="cajaMenu w49 h43" id="cajaMisCompeticiones">
						<label>Competiciones Personalizadas</label>
						<label class="sombraTextoPartidos">Competiciones Personalizadas</label>
					</div>
				</div>
			</div>
		</div>
		<div id="bannerPubliDer" class="w10"></div>
	</div>
</body>

<script type="text/javascript">
	function inicioPulsacion(idBoton) {
		var idTag = "#"+idBoton;
		$(idTag).addClass('seleccionable');
	};

	function finPulsacion(idBoton) {
		var idTag = "#"+idBoton;
		setTimeout(function() {
			$(idTag).removeClass('seleccionable');
		}, 125);
	};

	function seleccionarCompeticion(competicion) {
		var seccion = competicion.charAt(competicion.length-1);
		var comp = competicion.substring(0, competicion.length-1);
		/*Crear cookie*/
		crearCookie("competicion",comp);
		crearCookie("seccionCompeticion",seccion);
		/*Ir a la siguiente página*/
		window.location.href = "menuPartidosBalonmano2.php";
	}

	/* Funciones con cookies */
	function crearCookie(nombreCookie, valorCookie) {
	  var expires = "max-age=3000"; //Segundos para que se destruya la cookie
	  var path = "path=/;domain=mijonsu.com;secure"; //Ruta en la que se puede utilizar la cookie de modo seguro
	  //document.cookie = nombreCookie + "=" + valorCookie + "; " + expires + "; " + path;
	  document.cookie = nombreCookie + "=" + valorCookie + "; " + expires;
	};

	
</script>
</html>