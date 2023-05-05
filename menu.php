<?php
	require 'php/control.php';
	$respuesta = validarToken();

	if ($respuesta == 303) {
		header("Location: index.php?error=fuera");
		die();
	}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="author" content="Jambitec">
	<meta name="description" content="La mejor manera de aplicar el Big Data a los deporte de sala">
	<meta name="theme-color" content="#a557d8">

	<script src="js/main.js"></script>
	<script src="js/jquery.js"></script>
	<script src="js/world.js"></script>
	<script src="js/publicidad.js"></script>
	<script src="js/menuConfiguracion.js"></script>
	<script src="js/menuCompeticiones.js"></script>
	<script src="js/menuClasificaciones.js"></script>
	<script src="js/menuEdicion.js"></script>
	<script src="js/menuPro.js"></script>
	<script src="js/menuBestDT.js"></script>
	<script src="js/menuMisDatos.js"></script>
	<script src="js/menuMiEvento.js"></script>
	<script src="js/menuPrevia.js"></script>
	<script src="js/capturaBalonmano.js"></script>
	<script src="js/directoPartido.js"></script>
	<link rel="stylesheet" type="text/css" href="css/estilo.css">

	<link rel="manifest" href="manifest.json">
	<link rel="apple-touch-icon" href="img/Menu/apple-touch-icon.png">

	<title>BigDT&#169; - Menu</title>
</head>

<body>
	<div id="bodyMenu" class="centradoXY">
		<div id="transicion1" class="cuadroTransicion"></div>
		<div id="transicion2" class="cuadroTransicion">
			<img id="PTransicion" alt='Publi'> <!--  PUBLICIDAD  -->
		</div>

		<div id="menuIndex" class="recuadroBody spaceAroundXY flexWrap">
			<nav id="cajaMenuSuperior" class="spaceBetweenXY">
			</nav>
			<div id="cajaMenuCentral" class="w95 h70 spaceAroundXY flexWrap">
				<div class="spaceAroundXY lineaCajaMenuCentral h20 w55" id="cajaSecciones">
				</div>

				<div class="elementoY w50 h50" id="cajaFavorito">
				</div>

				<div id="barraInferior" class="spaceAroundXY lineaCajaMenuCentral w100 h20">
				</div>
			</div>
			<div id="cajaMenuUsuario" class="spaceAroundXY flexWrap h100 w100 invisible">
				<div id="cajaAyuda" class="w100 h100 centradoXY invisible">
					<div class="h100 fondoAyudaIzq"></div>
					<div class="h100 fondoAyudaDer"></div>
					<div id="ayudaConfiguracion" class="w100 h100 centradoXY flexWrap">
						<div id="cuerpoAyudaConfiguracion" class="w90 h90">
							<div id='ayudaMenuSuperior' class='w100 h40 taparFondoAyuda'></div>
							<div id='ayudaMenuMedio' class='w100 h50 taparFondoAyuda'></div>
							<div id='ayudaMenuInferior' class='w100 h10 taparFondoAyuda'></div>
						</div>
						<div id="mandosAyudaConfiguracion" class="w90 h10 spaceAroundXY">
							<div id="textoAyudaConfiguracion" class="w60 h90"></div>
							<div id="botonAntAyuda" class="w5 h40 centradoXY pulsable" onclick="cambiarPasoAyuda(-1)" ontouchstart="inicioPulsacion('botonAntAyuda')" ontouchend="finPulsacion('botonAntAyuda')"><img class="w40" src="img/Menu/anterior.png" alt="anterior"></div>
							<div id="indicadorAyudaConfiguracion" class="w10 h90 spaceAroundXY">
								<div id="pasoAyudaConfiguracion1" class="centradoXY w10 pasoAyuda"></div>
								<div id="pasoAyudaConfiguracion2" class="centradoXY w10 pasoAyuda"></div>
								<div id="pasoAyudaConfiguracion3" class="centradoXY w10 pasoAyuda"></div>
								<div id="pasoAyudaConfiguracion4" class="centradoXY w10 pasoAyuda"></div>
								<div id="pasoAyudaConfiguracion5" class="centradoXY w10 pasoAyuda"></div>
								<div id="pasoAyudaConfiguracion6" class="centradoXY w10 pasoAyuda"></div>
							</div>
							<div id="botonSigAyuda" class="w5 h40 centradoXY pulsable" onclick="cambiarPasoAyuda(1)" ontouchstart="inicioPulsacion('botonSigAyuda')" ontouchend="finPulsacion('botonSigAyuda')"><img class="w40" src="img/Menu/anterior.png"  alt="anterior" style="transform: rotate(180deg);"></div>
							<div id="botonFinalizarAyuda" class="w10 h60 centradoXY pulsable" onclick="cerrarAyudaConfiguracion('configuracion')" ontouchstart="inicioPulsacion('botonFinalizarAyuda')" ontouchend="finPulsacion('botonFinalizarAyuda')"></div>
						</div>
					</div>
				</div>
				<div id="fondoMenuUsuario" class="h100 w100"></div>
				<div id="cajaBotonCerrar">
					<div id="botonCerrarUsuario" onclick="cerrarMenuUsuario()" ontouchstart="inicioPulsacion('botonCerrarUsuario')" ontouchend="finPulsacion('botonCerrarUsuario')">
						<img class="w100 h100" src="img/Menu/boton_salir.png" alt='Salir'>
					</div>
				</div>
				<div id="cajaAjustes" class="centradoXY">
					<span id="loaderAjustes"></span>
					<div id="cajaAjustesUsuario" class="centradoXY flexWrap">
						<div id="ajustesLabel" class="w100 h10">
						</div>
						<div id="cuadroIdiomas" class="centradoInlineXY">
							<div id="idiomaActual" class="centradoXY">
							</div>
							<div id="cajaIdiomas" class="spaceAroundXY invisible">
								<img class="logoIdioma" src="img/Idiomas/es.png" onclick="elegirIdioma('menu','es-ES')" alt="Español" onerror="this.src='img/Idiomas/idioma.png'">
								<img class="logoIdioma" src="img/Idiomas/en.png" onclick="elegirIdioma('menu','en')" alt="English" onerror="this.src='img/Idiomas/idioma.png'">
								<img class="logoIdioma" src="img/Idiomas/fr.png" onclick="elegirIdioma('menu','fr')" alt="Français" onerror="this.src='img/Idiomas/idioma.png'">
								<img class="logoIdioma" src="img/Idiomas/de.png" onclick="elegirIdioma('menu','de')" alt="Deutsch" onerror="this.src='img/Idiomas/idioma.png'">
							</div>
						</div>
						<div id="ajustesUsuario" class="w90 h15 spaceBetweenXY">
						</div>
						<div id="ajustesCompras" class="w95 h60 spaceAroundXY flexWrap">
						</div>
						<div id="ajustesCopy" class="w95 h15 bordeCaja spaceAroundXY">
						</div>
					</div>
					<div id="cajaSuscripcion" class="invisible">
						<div id="elegirUsuarioSuscripcion" class="w100 h100 centradoXY flexWrap invisible"></div>
						<div id="noSuscripcion" class="w100 h100 centradoXY flexWrap invisible"></div>
						<div id="compraSuscripcion" class="w100 h100 centradoXY flexWrap invisible"></div>
						<div id="suscripcion" class="w100 h100 centradoXY flexWrap invisible">
							<div id="suscripcionTitulo" class="suscripcionLabel w100 h15 centradoInlineXY"></div>
							<div id="suscripcionCuadro" class="w100 h80 centradoXY flexWrap"></div>
							<div id="suscripcionAutorizados" class="w100 h80 centradoXY flexWrap invisible"></div>
							<div id="suscripcionPanelControl" class="w100 h80 centradoXY flexWrap invisible"></div>
						</div>
						<div id="autorizado" class="w100 h100 centradoXY flexWrap invisible">
							<div id="autorizadosTitulo" class="suscripcionLabel w100 h15 centradoInlineXY"></div>
							<div id="autorizadosCuadro" class="w100 h80 centradoXY flexWrap"></div>
						</div>
					</div>
				</div>
			</div>
			<div id="cajaModalMenu" class="centradoXY h100 w100 invisible">
				<div id="ventanaModalMenu" class="centradoXY flexWrap h90 w90"></div>
			</div>
			<footer class="PFooter centradoXY h10"> <!--  PUBLICIDAD    -->
			</footer>
		</div>

		<div id="menuCompeticiones" class="recuadroBody spaceAroundXY flexWrap invisible">
			<nav id="cajaMenuSuperiorCompeticiones" class="spaceBetweenXY">
			</nav>
			<span id="loaderCompeticiones"></span>
			<div id="cajaMenuCentralCompeticiones" class="w95 h70 centradoXY flexWrap">
			</div>
			<footer class="PFooter centradoXY h10"> <!--  PUBLICIDAD    -->
			</footer>
		</div>
		<div id="menuCompeticiones2" class="recuadroBody spaceAroundXY flexWrap invisible">
			<nav id="cajaMenuSuperiorCompeticiones2" class="spaceBetweenXY">
			</nav>
			<span id="loaderCompeticiones2"></span>
			<div id="cajaMenuCentralCompeticiones2" class="w90 h65 centradoXY flexWrap">
			</div>
			<footer class="PFooter centradoXY h10"> <!--  PUBLICIDAD    -->
			</footer>
		</div>

		<div id="menuClasificaciones" class="recuadroBody spaceAroundXY flexWrap invisible">
			<nav id="cajaMenuSuperiorClasificaciones" class="spaceBetweenXY">
			</nav>
			<div id="cajaMenuCentralClasificaciones" class="w95 h70 centradoXY flexWrap">
			</div>
			<footer class="PFooter centradoXY h10"> <!--  PUBLICIDAD    -->
			</footer>
		</div>

		<div id="menuMiClasificacion" class="recuadroBody spaceAroundXY flexWrap invisible">
			<nav id="cajaMenuSuperiorMiClasificacion" class="spaceBetweenXY">
			</nav>
			<div id="cajaMenuCentralMiClasificacion" class="w95 h70 centradoXY flexWrap">
			</div>
			<footer class="PFooter centradoXY h10"> <!--  PUBLICIDAD    -->
			</footer>
		</div>

		<div id="menuMiPlantilla" class="recuadroBody spaceAroundXY flexWrap invisible">
			<nav id="cajaMenuSuperiorMiPlantilla" class="spaceBetweenXY">
			</nav>
			<div id="cajaMenuCentralMiPlantilla" class="w95 h70 centradoXY flexWrap">
			</div>
			<footer class="PFooter centradoXY h10"> <!--  PUBLICIDAD    -->
			</footer>
		</div>

		<div id="menuPro" class="recuadroBody spaceAroundXY flexWrap invisible">
			<nav id="cajaMenuSuperiorPro" class="spaceBetweenXY">
			</nav>
			<div id="cajaMenuCentralPro" class="w70 h70 centradoXY">
			</div>
			<div id="cajaMenuProEntrenamiento" class="w90 h70 invisible">
				<div id="cajaMenuProEntrenamiento1" class="w100 h100 centradoXY flexWrap">
					<div id='cajaSuperiorEntrenamientoPro' class='w95 h15 bordesCaja centradoInlineXY'></div>
					<span id="loaderProEntrenamiento"></span>
					<div id='resumenEntrenamiento' class='w90 h80 centradoXY flexWrap bordesCaja'>
					</div>
					<div id='agendaEntrenamiento' class='w90 h80 centradoXY flexWrap bordesCaja invisible'>
					</div>
					<div id='tablonEntrenamiento' class='w90 h80 centradoXY flexWrap bordesCaja invisible'>
					</div>
				</div>
				<div id="cajaMenuProEntrenamiento2" class="w100 h100 centradoXY flexWrap invisible">
					<div id='superiorEntrenamiento' class='w95 h15 bordesCaja spaceAroundXY flexWrap'></div>
					<div id='datosEntrenamiento' class='w90 h80 centradoXY flexWrap bordesCaja'></div>
					<div id='pruebaEntrenamiento' class='w90 h80 centradoXY flexWrap bordesCaja invisible'></div>
				</div>
			</div>
			<div id="cajaMenuProPizarra" class="w90 h70 centradoXY invisible">
			</div>
			<div id="cajaMenuProInformes" class="w90 h70 centradoXY invisible">
			</div>
			<div id="cajaMenuProConfiguracion" class="w90 h70 centradoXY flexWrap invisible">
			</div>
			<footer class="PFooter centradoXY h10"> <!--  PUBLICIDAD    -->
			</footer>
		</div>

		<div id="menuEdicion" class="recuadroBody spaceAroundXY flexWrap invisible">
			<nav id="cajaMenuSuperiorEdicion" class="spaceBetweenXY">
			</nav>
			<div id="cajaMenuCentralEdicion" class="w90 h70 spaceAroundXY">
				<div id="menuEdicionGeneral" class="w100 h100 spaceAroundXY flexWrap">
					<div id="menuGeneralBuscar" class="w100 h20 centradoInlineXY">
						<div class="w20 h100 spaceAroundXY flexWrap">
							<div id="botonBuscarClubes" class="w100 h20 centradoXY botonPulsado" onclick="seleccionarEdicion('Clubes')" ontouchstart="inicioPulsacion('botonBuscarClubes')" ontouchend="finPulsacion('botonBuscarClubes')">Clubes</div>
							<div id="botonBuscarEquipos" class="w100 h20 centradoXY" onclick="seleccionarEdicion('Equipos')" ontouchstart="inicioPulsacion('botonBuscarEquipos')" ontouchend="finPulsacion('botonBuscarEquipos')">Equipos</div>
							<div id="botonBuscarTorneos" class="w100 h20 centradoXY" onclick="seleccionarEdicion('Torneos')" ontouchstart="inicioPulsacion('botonBuscarTorneos')" ontouchend="finPulsacion('botonBuscarTorneos')">Torneos</div>
							<div id="botonBuscarJugadores" class="w100 h20 centradoXY" onclick="seleccionarEdicion('Jugadores')" ontouchstart="inicioPulsacion('botonBuscarJugadores')" ontouchend="finPulsacion('botonBuscarJugadores')">Jugadores</div>
							<div id="botonBuscarTecnicos" class="w100 h20 centradoXY" onclick="seleccionarEdicion('Tecnicos')" ontouchstart="inicioPulsacion('botonBuscarTecnicos')" ontouchend="finPulsacion('botonBuscarTecnicos')">Tecnicos</div>
						</div>
						<div class="w80 h100">
							<div id="menuBuscarClubes" class="w100 h100 centradoInlineXY">
								<div class="w90 h100">
									<div id="cuadroBotonesSuperiorClubes" class="w100 h60 centradoXY flexWrap">
										
									</div>
									<div class="w100 h40 spaceAroundXY cuadroBotonesInferior">
										<button id="botonNuevoClub" class="w30 h50" onclick="nuevoElemento('Club')" ontouchstart="inicioPulsacion('botonNuevoClub')" ontouchend="finPulsacion('botonNuevoClub')">Crear Nuevo Club</button>
									</div>
								</div>
								<div class="w10 h100 centradoXY">
									<img class="w80" src="img/Menu/sede.png" alt="Club">
								</div>
							</div>
							<div id="menuBuscarEquipos" class="w100 h100 centradoInlineXY invisible">
								<div class="w90 h100">
									<div id="cuadroBotonesSuperiorEquipos" class="w100 h60 spaceAroundXY flexWrap">
											
									</div>
									<div class="w100 h40 spaceAroundXY cuadroBotonesInferior">
										<button id="botonNuevoEquipo" class="w30 h50" onclick="nuevoElemento('Equipo')" ontouchstart="inicioPulsacion('botonNuevoEquipo')" ontouchend="finPulsacion('botonNuevoEquipo')">Nuevo Equipo Oficial</button>
										<button id="botonNuevoEquipoPersonalizado" class="w30 h50" onclick="nuevoElemento('EquipoPersonalizado')" ontouchstart="inicioPulsacion('botonNuevoEquipoPersonalizado')" ontouchend="finPulsacion('botonNuevoEquipoPersonalizado')">Nuevo Equipo Personalizado</button>
									</div>
								</div>
								<div class="w10 h100 centradoXY">
									<img class="w80" src="img/Menu/edicionClub.png" alt="Club">
								</div>
							</div>
							<div id="menuBuscarTorneos" class="w100 h100 centradoInlineXY invisible">
								<div class="w90 h100">
									<div id="cuadroBotonesSuperiorTorneos" class="w100 h60 spaceAroundXY flexWrap">
										
									</div>
									<div class="w100 h40 spaceAroundXY cuadroBotonesInferior">
										<button id="botonNuevoTorneo" class="w30 h50" onclick="nuevoElemento('Torneo')" ontouchstart="inicioPulsacion('botonNuevoTorneo')" ontouchend="finPulsacion('botonNuevoTorneo')">Crear Nuevo Torneo</button>
										<button id="botonNuevoEvento" class="w30 h50 centradoXY" onclick="nuevoElemento('Evento')" ontouchstart="inicioPulsacion('botonNuevoEvento')" ontouchend="finPulsacion('botonNuevoEvento')"><label>Crear Nuevo Evento</label><img class="h90" src="img/Menu/edicionLiga.png" alt='Evento'></button>
									</div>
								</div>
								<div class="w10 h100 centradoXY">
									<img class="w80" src="img/Menu/Clasificaciones.png" alt="Torneos">
								</div>
							</div>
							<div id="menuBuscarJugadores" class="w100 h100 centradoInlineXY invisible">
								<div class="w90 h100">
									<div id="cuadroBotonesSuperiorJugadores" class="w100 h60 spaceAroundXY flexWrap">
											
									</div>
									<div class="w100 h40 spaceAroundXY cuadroBotonesInferior">
										<!--<button id="botonNuevoJugador" class="w30 h50" onclick="nuevoElemento('Jugador')" ontouchstart="inicioPulsacion('botonNuevoJugador')" ontouchend="finPulsacion('botonNuevoJugador')">Crear Nuevo Jugador</button>-->
										<button id="botonNuevoJugador" class="w30 h50" ontouchstart="inicioPulsacion('botonNuevoJugador')" ontouchend="finPulsacion('botonNuevoJugador')">Crear Nuevo Jugador</button>
									</div>
								</div>
								<div class="w10 h100 centradoXY">
									<img class="w80" src="img/Menu/edicionJugadores.png" alt="Jugadores">
								</div>
							</div>
							<div id="menuBuscarTecnicos" class="w100 h100 centradoInlineXY invisible">
								<div class="w90 h100">
									<div id="cuadroBotonesSuperiorTecnicos" class="w100 h60 spaceAroundXY flexWrap">
											
									</div>
									<div class="w100 h40 spaceAroundXY cuadroBotonesInferior">
										<!--<button id="botonNuevoJugador" class="w30 h50" onclick="nuevoElemento('Jugador')" ontouchstart="inicioPulsacion('botonNuevoJugador')" ontouchend="finPulsacion('botonNuevoJugador')">Crear Nuevo Jugador</button>-->
										<button id="botonNuevoTecnico" class="w30 h50" ontouchstart="inicioPulsacion('botonNuevoTecnico')" ontouchend="finPulsacion('botonNuevoTecnico')">Crear Nuevo Técnico</button>
									</div>
								</div>
								<div class="w10 h100 centradoXY">
									<img class="w80" src="img/Menu/edicionTecnicos.png" alt="Tecnicos">
								</div>
							</div>
						</div>
					</div>
					<div id="menuGeneralDatos" class="w100 h75">
						<span id="loaderMenuGeneralDatos"></span>
						<div id="menuDatosClubes" class="centradoXY flexWrap">
						</div>
						<div id="menuDatosEquipos" class="centradoXY flexWrap invisible">
						</div>
						<div id="menuDatosTorneos" class="centradoXY flexWrap invisible">
							<p style="font-size: 2em;">A través de esta opción, <u class="color1">podrás buscar cualquier torneo, liga o competición</u> que haya en nuestra base de datos.<br><br>
							<u class="color1">También podrás crear un nuevo torneo</u>, por ejemplo... <strong class="color1">para competir junto a tus amigos</strong> o para tu escuela deportiva. Recuerda que BIGDT no está sólo pensado para equipos profesionales.
							<br><br>Esta característica está todavía en construcción. Deberás esperar a la versión final para verla en acción</p>
						</div>
						<div id="menuDatosJugadores" class="h100 centradoInlineXY invisible">
							<div id="menuInicialesJugadores" class="w15 h100 spaceAroundXY flexWrap"></div>
							<div id="cajaMenuDatosJugadores" class="w85 h100 centradoXY flexWrap"></div>
						</div>
						<div id="menuDatosTecnicos" class="h100 centradoInlineXY invisible">
							<div id="menuInicialesTecnicos" class="w15 h100 spaceAroundXY flexWrap"></div>
							<div id="cajaMenuDatosTecnicos" class="w85 h100 centradoXY flexWrap"></div>
						</div>
					</div>
				</div>

				<span id="loaderMenuEdicion"></span>
				<div id="menuEdicionNuevoClub" class="w100 h100 invisible"></div>

				<div id="menuEdicionNuevoEquipo" class="w100 h100 invisible"></div>

				<div id="menuEdicionNuevoTorneo" class="w100 h100 invisible"></div>

				<div id="menuEdicionNuevoEvento" class="w100 h100 invisible"></div>

				<div id="menuEdicionNuevoJugador" class="w100 h100 invisible"></div>

				<div id="menuEdicionNuevoEntrenador" class="w100 h100 invisible"></div>
			</div>
			<footer class="PFooter h10 centradoXY"> <!--  PUBLICIDAD    -->
			</footer>
		</div>

		<div id="menuBestDT" class="recuadroBody spaceAroundXY flexWrap invisible">
			<nav id="cajaMenuSuperiorBestDT" class="spaceBetweenXY">
			</nav>
			<div id="cajaMenuCentralBestDT" class="w95 h70 centradoXY flexWrap">
			</div>
			<footer class="PFooter h10"> <!--  PUBLICIDAD    -->
			</footer>
		</div>

		<div id="menuMiEvento" class="recuadroBody spaceAroundXY flexWrap invisible">
			<div id="cajaMenuSuperiorMiEvento" class="w100 h15 spaceAroundXY">
			</div>
			<div id="cajaMenuCentralMiEvento" class="w100 h75 centradoXY flexWrap">
			</div>
			<footer id="publiMiEvento" class="PFooter h10"> <!--  PUBLICIDAD    -->
			</footer>
		</div>

		<div id="menuDirectoTV" class="recuadroBody spaceAroundXY flexWrap invisible">
			<nav id="cajaMenuSuperiorDirectoTV" class="spaceBetweenXY">
			</nav>
			<div id="cajaMenuCentralDirectoTV" class="w95 h70 centradoXY flexWrap">
			</div>
			<footer class="PFooter h10"> <!--  PUBLICIDAD    -->
			</footer>
		</div>

		<div id="menuPartido" class="recuadroBody centradoXY flexWrap invisible">
			<nav id="cajaMenuSuperiormenuPartido" class="spaceBetweenXY w80">
			</nav>
			<div id="menuPartidoCentral" class="w90 h65">
				<div id="menuFicha" class="w100 h100 spaceAroundXY flexWrap">
					<img id="PPrevia0" class='h15' alt="Publi"> <!--   PUBLICIDAD    -->
					<div class="w100 h80 centradoXY flexWrap">
						<div id="fichaLoader"></div>
						<div id="fichaLocal" class="w49 h100 centradoXY flexWrap waiting">
							
						</div>
						<div id="fichaVisitante" class="w49 h100 centradoXY flexWrap">
							
						</div>
					</div>
				</div>

				<div id="menuVs" class="h100 w100 centradoInlineXY flexWrap invisible">
					
				</div>

				<div id="menuEstGenerales" class="h100 w100 spaceAroundXY flexWrap invisible">
					
				</div>

				<div id="menuEstIndividuales" class="h100 w100 centradoXY flexWrap invisible">
					<div id="cajaEstadisticasIndividuales" class="w100 h80 centradoInlineXY">
						<div id="figurasIndividuales" class="w40 h100">
							<img id='figuraDefectoIndividuales' class='w90 h80' src='img/Menu/equipoSilueta.png' alt="Jugador">
							<img id="PPreviaInd" class='h15 w90' alt="Publi"> <!--   PUBLICIDAD    -->

						</div>
						<div id="fichaIndividual" class="w60 h100">
							<div id="cuadroFichaIndividual" class="w100 h40 centradoXY">
								<div id="cuadroFicha" class="w90 h90 centradoInlineXY">
									<div class="w75 h100">
										<div id="fichaNombre" class="w100 h40 centradoXY flexWrap">
											
										</div>
										<div id="cuadroDatos" class="w100 h60 spaceAroundXY">
											<div id="fichaDorsal" class="w20 h100 centradoXY flexWrap">

											</div>
											<div id="fichaDatos" class="w60 h100 spaceAroundXY">
												
											</div>
											<div id="fichaNacionalidad" class="w15 h100 centradoXY" style="border-radius: 5px;aspect-ratio: auto 1 / 1;position: relative;">
												
											</div>
										</div>
									</div>
									<div id="cuadroFoto" class="w25 h100 centradoXY">
										
									</div>
								</div>
							</div>
							<div class="w100 h60 centradoXY" style='position:relative;'>
								<div id='graficaFicha' class='graficaFicha h70'></div>
								<div id='graficaLabel' class='graficaLabel w100 h100 centradoXY flexWrap'>
								</div>
							</div>
						</div>
					</div>
					<div id="cajaDorsales" class="w100 h20 spaceAroundXY">
						
					</div>
				</div>

				<div id="menuFichaPro" class="w100 h100 spaceAroundXY invisible">
					<div id="tituloMenuFichaPro" class="w90 h10 cajaMenu">
						
					</div>
					<div id="datosMenuFichaPro" class="w90 h90">
						
					</div>
				</div>

				<div id="menuVsPro" class="h100 w100 spaceAroundXY invisible">
					<div id="tituloMenuVsPro" class="w90 h10 cajaMenu">
						
					</div>
					<div id="datosMenuVsPro" class="w90 h90">
						
					</div>
				</div>

				<div id="menuEstGeneralesPro" class="h100 w100 spaceAroundXY invisible">
					<div id="tituloMenuEstGenPro" class="w90 h10 cajaMenu">
						
					</div>
					<div id="datosMenuEstGenPro" class="w90 h90">
						
					</div>
				</div>

				<div id="menuEstIndividualesPro" class="h100 w100 invisible">
					PRO
					<div id="cajaEstadisticasPro" class="w100 h80">
						<div id="figurasPro" class="w40 h100">
							<img id='figuraDefectoPro' class='w90 h80' src='img/Menu/equipoSilueta.png' alt="Equipo">
							<img id='PPreviaIndPro' class='h15 w90' alt="Publi"> <!-- PUBLICIDAD  -->

						</div>
						<div id="fichaIndividualPro" class="w60 h100">
							<div id="cuadroFichaIndividualPro" class="w100 h40">
								<div id="cuadroFichaPro" class="w90 h90">
									<div id="fichaNombrePro" class="w100 h40">
										
									</div>
									<div id="cuadroDatosPro" class="w100 h60">
										<div class="w2 h100"></div>
										<div id="fichaDatosPro" class="w85 h100">
											
										</div>
										<div id="fichaDorsalPro" class="w10 h100">

										</div>
									</div>
								</div>
							</div>
							<div class="w100 h60">
								<div id='graficaLabelPro'>

								</div>
								<div id="graficaFichaPro">
									
								</div>
							</div>
						</div>
					</div>
					<div id="cajaDorsalesPro" class="w100 h20 spaceAroundXY">
						
					</div>
				</div>


			</div>
			<div id="menuPartidoInferior" class="w90 h10">
				
			</div>
		</div>



		<span id="loaderCajaFichas"></span>
		<div id="cajaClub" class="w90 h90 centradoXY flexWrap invisible">
		</div>
		<div id="cajaEquipo" class="w90 h90 centradoXY flexWrap invisible">
		</div>
		<div id="cajaJugador" class="w90 h90 centradoXY flexWrap invisible">
		</div>
		<div id="cajaEntrenador" class="w90 h90 centradoXY flexWrap invisible">
		</div>
		<div id="cajaTorneo" class="w90 h90 centradoXY flexWrap invisible">
		</div>
	</div>
	<div id="bodyCaptura" class="centradoXY invisible">

	</div>
	<div id="bodyDirecto" class="spaceAroundXY flexWrap invisible">
	</div>

<script>
	$(function(){
		// Hacer eventos pasivos
		jQuery.event.special.touchstart = {
		  setup: function( _, ns, handle ){
		    if ( ns.includes("noPreventDefault") ) {
		      this.addEventListener("touchstart", handle, { passive: false });
		    } else {
		      this.addEventListener("touchstart", handle, { passive: true });
		    }
		  }
		};
		jQuery.event.special.touchmove = {
            setup: function (_, ns, handle) {
                this.addEventListener('touchmove', handle, { passive: !ns.includes('noPreventDefault') });
            }
        };
        jQuery.event.special.mouseover = {
            setup: function (_, ns, handle) {
                this.addEventListener('mouseover', handle, { passive: !ns.includes('noPreventDefault') });
            }
        };
        jQuery.event.special.mouseout = {
            setup: function (_, ns, handle) {
                this.addEventListener('mouseout', handle, { passive: !ns.includes('noPreventDefault') });
            }
        };
        detectarEstado();
	});

	function detectarEstado() {
		if(navigator.onLine) {
			idiomaActual("menu");
			cookiesDefecto();
			mostrarPubli();
			comprobarEstadoUsuario();
        	marcarUso(sessionStorage.getItem("Deporte"),'1','0');
			if (leerCookie("Contador")) {	abrirMenuUsuario("ayuda");	}
		}else{
			alert("La aplicación no está online");
		}
	};

	function cookiesDefecto() {
		//Menú Competiciones
		eliminarCookie("botonCompeticion");
		eliminarCookie("botonTemporada");
		//Nuevo Torneo
		eliminarCookie("edicionTorneoAmbito");
		eliminarCookie("edicionTorneoCategoria");
		eliminarCookie("edicionTorneoDeporte");
		eliminarCookie("edicionTorneoSeccion");
		eliminarCookie("edicionTorneoTipo");
		eliminarCookie("edicionTorneoNombre");
		eliminarCookie("edicionTorneoLogo");
		eliminarCookie("edicionTorneoOrganizadora");
		eliminarCookie("edicionTorneoNumFases");
		for (var i = 1; i < 21; i++) {
			eliminarCookie("edicionTorneoNombreFase"+i);
			eliminarCookie("edicionTorneoParticipantesFase"+i);
			eliminarCookie("edicionTorneoTipoFase"+i);
			eliminarCookie("edicionTorneoPartidosFase"+i);
			eliminarCookie("edicionTorneoGanadorFase"+i);
			eliminarCookie("edicionTorneoPerdedorFase"+i);
			eliminarCookie("edicionTorneoAcumulacionFase"+i);
			eliminarCookie("edicionTorneoExpulsionFase"+i);
		}
		$(".radio").removeProp('checked');
		const deporteActual = sessionStorage.getItem("Deporte") ? sessionStorage.getItem("Deporte") : "1";
		sessionStorage.setItem("Deporte",deporteActual);
	};

	function comprobarEstadoUsuario() {
		const arrayDeportes = ["BM","BL","FS"];

		for (var i = 0; i < arrayDeportes.length; i++) {
			var labelNombreDeporte = "Estado"+arrayDeportes[i];
			var estado = leerDatosUsuario(labelNombreDeporte);

			if (i == (sessionStorage.getItem("Deporte")-1)) {
				if (estado == 9) {
					//Ventana
					document.getElementById("cajaModalMenu").classList.remove("invisible");
					// efecto de apertura y todos los valores => document.getElementById("cajaModalIndex").classList.remove("invisible");

					$.ajax({
						url: "php/clubFav.php",
						type: 'POST',
						data: {
							deporte: sessionStorage.getItem("Deporte")
						},
						success: function(res){
							const js= JSON.parse(res);
							let codigo = "";
							codigo += "	<div class='h90 w100 centradoXY flexWrap'>";
							codigo += "		<div class='h10 w100'></div>";
							codigo += "		<div class='h80 w80 centradoXY' style='border: 10px solid var(--color-corporativo-morado);border-radius: 10px;background:var(--color-fondoIndex);'>";

							codigo += "			<div id='modalNuevoProPagina1' class='h100 w100 centradoXY flexWrap' style='position:relative'>";
							codigo += "				<h1 class='w100 centradoXY' style='letter-spacing: 0.2em;z-index: 1;'>ENHORABUENA</h1>";
							codigo += "				<h2 style='z-index: 1;'>Acabas de unirte a la <span style='color:var(--color-pro)'>sucripción Pro</span> de</h2>";
							codigo += "				<div class='w90 h50 centradoXY flexWrap' style='z-index: 1;'>";
							codigo += "					<img class='w100 h60' src='img/Clubes/Clubes/"+js[0].Escudo+"' alt='Escudo'>";
							codigo += "					<h2>"+js[0].Nombre+"</h2>";
							codigo += "				</div>";
							codigo += "				<img class='w95' src='img/Menu/Logo_BigDT.png' alt='BigDT' style='position: absolute;top: 5%;left: 5%;transform: rotate(-20deg);opacity: .4;'>";
							codigo += "			</div>";

							codigo += "			<div id='modalNuevoProPagina2' class='h100 w100 centradoXY flexWrap invisible' style='position:relative'>";
							codigo += "				<img src='img/Clubes/Clubes/"+js[0].Escudo+"' alt='Escudo' style='position: absolute;top: 5%;left: 5%;height: 15%;'>";
							codigo += "				<img src='img/Menu/Logo_BigDT.png' alt='BigDT' style='position: absolute;top: 5%;right: 5%;height: 15%;'>";
							codigo += "				<h1 class='w100 centradoXY' style='letter-spacing: 0.2em;'>VENTAJAS <span style='color:var(--color-pro)'>PRO</span></h1>";
							codigo += "				<h2>Herramientas profesionales desbloqueadas</h2>";
							codigo += "				<div class='w45 h60' style='position:relative'>";
							codigo += "					<img src='img/Menu/Captura1.png' alt='captura1' style='position: absolute;top: 5%;right: 32%;height: 18%;'>";
							codigo += "					<img src='img/Menu/Captura2.png' alt='captura2' style='position: absolute;top: 55%;left: 5%;height: 19%;transform:rotate(-15deg)'>";
							codigo += "					<img src='img/Menu/Captura3.png' alt='captura3' style='position: absolute;top: 69%;right: 13%;height: 25%;transform:rotate(6deg)'>";
							codigo += "					<img src='img/Menu/Captura4.png' alt='captura4' style='position: absolute;top: 37%;left: 35%;height: 15%;transform:rotate(12deg)'>";
							codigo += "				</div>";
							codigo += "				<div class='w45 h50 centradoXY flexWrap'>";
							codigo += "					<p>Si ya has usado la versión gratuita de <strong style='color:var(--color-corporativo-morado)'>BigDT</strong>, habrás observado varios botones y pestañas a los que no tenías acceso.</p>";
							codigo += "					<p>A partir de ahora tendrás <strong style='color:var(--color-pro)'>acceso ilimitado</strong> a estadísticas y herramientas diseñadas para que tu equipo logre alcanzar su máximo potencial.</p>";
							codigo += "					<p>La profesionalización del deporte de la manera más sencilla e intuitiva.</p>";
							codigo += "				</div>";
							codigo += "			</div>";

							codigo += "			<div id='modalNuevoProPagina3' class='h100 w100 spaceAroundXY flexWrap invisible' style='position:relative'>";
							codigo += "				<img src='img/Clubes/Clubes/"+js[0].Escudo+"' alt='Escudo' style='position: absolute;top: 5%;left: 5%;height: 15%;'>";
							codigo += "				<img src='img/Menu/Logo_BigDT.png' alt='BigDT' style='position: absolute;top: 5%;right: 5%;height: 15%;'>";
							codigo += "				<h1 class='w100 centradoXY' style='letter-spacing: 0.2em;'>VENTAJAS <span style='color:var(--color-pro)'>PRO</span></h1>";
							codigo += "				<h2>Herramienta Pro: Gestión de Entrenamientos</h2>";
							codigo += "				<div id='imagenModalNuevoProPagina3' class='w45 h60'></div>";
							codigo += "				<div class='w45 h60 centradoXY flexWrap'>";
							codigo += "					<p>La primera herramienta que hemos desarrollado es <strong style='color:var(--color-pro)'>Entrenamientos</strong>, un avanzado sistema para gestionar numerosos aspectos en el día a día del trabajo físico y táctico de la plantilla.</p>";
							codigo += "					<p>Planificación de calendarios de entrenamiento, gestión de asistencia de la plantilla, lesiones, pruebas de control, medidas, chat de equipo,...</p>";
							codigo += "					<p>El sencillo diseño de <strong style='color:var(--color-pro)'>Entrenamientos</strong> está pensado para facilitar su uso. Sin embargo, cualquier pequeño dato que introduzcas generará una sorprendente corriente de información totalmente útil y práctica.</p>";
							codigo += "				</div>";
							codigo += "			</div>";

							codigo += "			<div id='modalNuevoProPagina4' class='h100 w100 spaceAroundXY flexWrap invisible' style='position:relative'>";
							codigo += "				<img src='img/Clubes/Clubes/"+js[0].Escudo+"' alt='Escudo' style='position: absolute;top: 5%;left: 5%;height: 15%;'>";
							codigo += "				<img src='img/Menu/Logo_BigDT.png' alt='BigDT' style='position: absolute;top: 5%;right: 5%;height: 15%;'>";
							codigo += "				<h1 class='w100 centradoXY' style='letter-spacing: 0.2em;'>VENTAJAS <span style='color:var(--color-pro)'>PRO</span></h1>";
							codigo += "				<h2>Herramientas Pro: Disponible proximamente...</h2>";
							codigo += "				<div class='w45 h60 centradoXY flexWrap'>";
							codigo += "					<h2 style='color:var(--color-pro)'>Pizarra Táctica</h2>";
							codigo += "					<p>Podrás llevar la <strong style='color:var(--color-pro)'>gestión táctica</strong> de tu equipo al máximo nivel gracias a esta completísima herramienta que estamos desarrollando junto a entrenadores de primer nivel.</p>";
							codigo += "					<p>Análisis pormenorizado jugada a jugada, análisis automático de puntos fuertes y puntos débiles de tu equipo y del contrario, crear y memorizar jugadas para mostrar a tu plantilla,...</p>";
							codigo += "					<img class='h10' src='img/Menu/pizarra.png' alt='icono'>";
							codigo += "				</div>";
							codigo += "				<div class='w45 h60 centradoXY flexWrap'>";
							codigo += "					<h2 style='color:var(--color-pro)'>Informes</h2>";
							codigo += "					<p>Herramienta especializada en <strong style='color:var(--color-pro)'>scouting deportivo</strong>. No necesitas introducir ningún dato, sólo selecciona qué quieres obtener.</p>";
							codigo += "					<p>Podrás obtener exhaustivos informes desarrollados por la IA del sistema: global del equipos, individual de jugadores de tu plantilla o de jugadores de otros equipos, informes personalizados enviados automáticamente a tus jugadores,...</p>";
							codigo += "					<img class='h15' src='img/Menu/EntrenadorPro.png' alt='icono'>";
							codigo += "				</div>";
							codigo += "			</div>";

							codigo += "			<div id='modalNuevoProPagina5' class='h100 w100 centradoXY flexWrap invisible' style='position:relative'>";
							codigo += "				<img src='img/Clubes/Clubes/"+js[0].Escudo+"' alt='Escudo' style='position: absolute;top: 5%;left: 5%;height: 15%;'>";
							codigo += "				<img src='img/Menu/Logo_BigDT.png' alt='BigDT' style='position: absolute;top: 5%;right: 5%;height: 15%;'>";
							codigo += "				<h1 class='w100 centradoXY' style='letter-spacing: 0.2em;'>VENTAJAS <span style='color:var(--color-pro)'>PRO</span></h1>";
							codigo += "				<div class='w90 h60 centradoXY flexWrap'>";
							codigo += "					<p>¡¡Aquí no acaba todo!! Pertenecer a una Suscripción <strong style='color:var(--color-pro)'>Pro</strong> tiene muchas más ventajas:</p>";
							codigo += "					<p>· <strong style='color:var(--color-pro)'>Edición</strong>: Permiso desbloqueado para crear y editar nuevas secciones del club. Gestión de fichajes</p>";
							codigo += "					<p>· <strong style='color:var(--color-pro)'>Eficacia en el trabajo</strong>: Cualquier persona del club tiene acceso inmediato y puede aprovechar las incontables horas de trabajo previo hechas por sus colegas.</p>";
							codigo += "					<p>· <strong style='color:var(--color-pro)'>Seguridad</strong>: Todo el trabajo queda guardado en un sólo lugar propiedad del club. Ya no son necesarias múltiples aplicaciones externas con riesgo a perder datos.</p>";
							codigo += "					<h2 style='color:var(--color-pro)'>Empieza a disfrutar del universo <strong>BigDT</strong></h2>";
							codigo += "				</div>";
							codigo += "			</div>";
							codigo += "		</div>";

							codigo += "		<div class='h10 w25 spaceAroundXY'>";
							codigo += "			<div id='botonModalNuevoProPagina1' class='w7 pulsable' style='border-radius:50%;border: 2px solid var(--color-texto);aspect-ratio:1/1' onclick=\"pasarPaginaModal(1)\"></div>";
							codigo += "			<div id='botonModalNuevoProPagina2' class='w7 pulsable' style='border-radius:50%;border: 9px solid var(--color-texto);aspect-ratio:1/1' onclick=\"pasarPaginaModal(2)\"></div>";
							codigo += "			<div id='botonModalNuevoProPagina3' class='w7 pulsable' style='border-radius:50%;border: 9px solid var(--color-texto);aspect-ratio:1/1' onclick=\"pasarPaginaModal(3)\"></div>";
							codigo += "			<div id='botonModalNuevoProPagina4' class='w7 pulsable' style='border-radius:50%;border: 9px solid var(--color-texto);aspect-ratio:1/1' onclick=\"pasarPaginaModal(4)\"></div>";
							codigo += "			<div id='botonModalNuevoProPagina5' class='w7 pulsable' style='border-radius:50%;border: 9px solid var(--color-texto);aspect-ratio:1/1' onclick=\"pasarPaginaModal(5)\"></div>";
							codigo += "		</div>";
							codigo += "	</div>";
							codigo += "	<div class='h10 w100 centradoXY'>";
							codigo += "		<div class='w70'></div>";
							codigo += "		<div id='botonModalNuevoPro' class='h70 w10 centradoXY pulsable invisible' style='background:var(--color-corporativo-rosa); border-radius:10px;' onclick=\"finalizarModalNuevoPro()\" ontouchstart=\"inicioPulsacion('botonModalNuevoPro')\" ontouchend=\"finPulsacion('botonModalNuevoPro')\">Finalizar</div>";
							codigo += "	</div>";
							document.getElementById("ventanaModalMenu").innerHTML = codigo;

						},
						timeout: 10000,
						error: function() { comprobarEstadoUsuario(); }
					});

				}
			}else{
				//Notificación
				if (estado == 9) {
					let labelDiv = "notificacionDeporte"+arrayDeportes[i];
					document.getElementById(labelDiv).classList.add("notificaciones");
					document.getElementById(labelDiv).classList.add("notificacionDeporte");
				}
			}
		}

		var labelNombreDeporte = "Estado"+arrayDeportes[(sessionStorage.getItem("Deporte")-1)];
		var estadoActual = leerDatosUsuario(labelNombreDeporte);
		if (estadoActual == "0") {
			document.getElementById("notificacionUsuario").classList.add("notificaciones");
			document.getElementById("notificacionUsuario").classList.add("notificacionDeporte");
		}else{
			document.getElementById("notificacionUsuario").classList.remove("notificaciones");
			document.getElementById("notificacionUsuario").classList.remove("notificacionDeporte");
		}		
	};
		function pasarPaginaModal(pagina) {
			// Modificar botones
			for (var i = 1; i < 6; i++) {
				var labelBotones = "botonModalNuevoProPagina"+i;
				document.getElementById(labelBotones).style.border = "9px solid var(--color-texto)";

				var labelPaginas = "modalNuevoProPagina"+i;
				document.getElementById(labelPaginas).classList.add("invisible");
			}
			const labelBoton = "botonModalNuevoProPagina"+pagina;
			document.getElementById(labelBoton).style.border = "2px solid var(--color-texto)";

			const labelPagina = "modalNuevoProPagina"+pagina;
			document.getElementById(labelPagina).classList.remove("invisible");

			if (pagina == 5) {
				document.getElementById("botonModalNuevoPro").classList.remove("invisible");
			}else{
				document.getElementById("botonModalNuevoPro").classList.add("invisible");
			}
		};
		function finalizarModalNuevoPro() {
			$.ajax({
				url: "php/confirmarAutorizadoSuscripcion.php",
				type: 'POST',
				data: {
					deporte: sessionStorage.getItem("Deporte")
				},
				success: function(res){
					// Cerrar Modal
					document.getElementById("cajaModalMenu").classList.add("invisible");

					// Abrir Configuración
					abrirMenuUsuario();
				}
			});
		};

	// Funciones del menú principal
	function mostrarFavoritos(deporte) {
		const textoIdioma = textoMenu(); // Tomar idioma

		$.ajax({
	        url: "php/favoritos.php",
	        type: 'POST',
	        success: function(res){
	        	const js= JSON.parse(res);

				if (js == 303) {
					window.location.href = "index.php?error=fuera";
				}else{
					let deporteActual = sessionStorage.getItem("Deporte") ? sessionStorage.getItem("Deporte") : js.DeporteFav;
					var deporte = !deporte ? textoDeportes(deporteActual,1) : deporte; // Establecer deporte por defecto
					localStorage.setItem("DeporteFav",js.DeporteFav);

		        	// Guardar colores personalizados
		        	for (var i = 1; i < 4; i++) {
						let color1 = js.Colores[i][0] !== null ? js.Colores[i][0] : '#c52bb4';
						let color2 = js.Colores[i][1] !== null ? js.Colores[i][1] : '#a557d8';
						let colorFondo = js.Colores[i][2] !== null ? js.Colores[i][2] : '#222222';
						let colorTexto = js.Colores[i][3] !== null ? js.Colores[i][3] : '#f5f5f5';
						sessionStorage.setItem("Color"+i,JSON.stringify(Array(color1,color2,colorFondo,colorTexto)));
		        	}

		        	const IDFav = eval("js."+deporte+".IDFav");
		        	let escudoOkFav = eval("js."+deporte+".EscudoFav") == "" ? "x.png" : eval("js."+deporte+".EscudoFav");
		        	const escudoFav = escudoOkFav;
					const datosFav = eval("js."+deporte+".DatosFav");
					const rachaFav = eval("js."+deporte+".RachaFav");
					let escudoOkRival = eval("js."+deporte+".EscudoRiv") == "" ? "x.png" : eval("js."+deporte+".EscudoRiv");
					const escudoRival = escudoOkRival;
					const datosRival = eval("js."+deporte+".DatosRival");
					const rachaRival = eval("js."+deporte+".RachaRiv");
					const datosPartido = eval("js."+deporte+".DatosPartido");

					// Establecer abreviatura numero ordinal correcto
					function establecerOrdinal(numero){
						switch (numero) {
							case "1":
								var valor = textoIdioma[0];
								break;
							case "2":
								var valor = textoIdioma[1];
								break;
							case "3":
								var valor = textoIdioma[2];
								break;
							default:
								var valor = textoIdioma[3];
								break;
						}
						var ordinal = numero +"<sup>"+ valor + "</sup>";
						return ordinal;
					};

					// Establecer unidades de puntuación
					function establecerUnidadesPuntuacion(deporte){
						switch (deporte) {
							case "Balonmano":
								var respuesta = textoIdioma[9];
								break;
							case "Baloncesto":
								var respuesta = textoIdioma[8];
								break;
							case "Futsal":
								var respuesta = textoIdioma[9];
								break;
						}
						return respuesta;
					};

					// Establecer abreviatura victoria/derrota correcto
					function establecerVictoriaDerrota(estado,dato){
						let respuesta = "<div class='w20 h80 centradoXY'>-</div>";
						if (estado !== "0") {
							if (dato > 0) {
								respuesta = "<div class='w20 h80 centradoXY acierto'>"+textoIdioma[5]+"</div>";
							}else if (dato < 0) {
								respuesta = "<div class='w20 h80 centradoXY error'>"+textoIdioma[4]+"</div>";
							}else if (dato == 0) {
								respuesta = "<div class='w20 h80 centradoXY empate'>"+textoIdioma[6]+"</div>";
							}
						}
						return respuesta;
					};				

					var codigo = "<div class='h80 w100 centradoInlineXY'>";
					codigo += "		<div class='w30 h90 centradoXY flexWrap <!--division"+datosPartido[0]+"Fondo-->' id='cajaFavoritoEquipo'>";
					codigo += "			<img id='equipoFavorito' class='h70 escudoSombra' src='img/Clubes/"+deporte+"/Equipos/"+escudoFav+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\" alt='Favorito'>";
					codigo += "			<label class='h10 w100'>"+establecerOrdinal(datosFav[0])+"</label>";
					codigo += "			<label id='cartelPuntuacion' class='h10'>"+datosFav[1]+" "+establecerUnidadesPuntuacion(deporte)+"</label>";
					codigo += "			<div class='w100 h10 cajaRacha centradoInlineXY'>";
					for (var i = rachaFav.length - 1; i >= 0; i--) {
						codigo += 			establecerVictoriaDerrota(rachaFav[i].Estado,rachaFav[i].Dato);
					}
					codigo += "			</div>";
					codigo += "		</div>";

					codigo += "		<div class='w30 h90 centradoXY flexWrap' id='cajaBotonPartido'>";
					if (datosPartido[1] != "0") {
						codigo += "		<button class='botonPrevia division"+datosPartido[0]+"Fondo centradoXY' onclick=\"pasarPantalla('menuIndex', 'menuPartido', "+datosPartido[1]+")\" ontouchstart=\"inicioPulsacion('botonPartido')\" ontouchend=\"finPulsacion('botonPartido')\"><img class='h80 w80' src='img/Menu/partido.png' alt='Botón Partido'></button>";
					}
					codigo += "		</div>";

					codigo += "		<div class='w30 h90 centradoXY flexWrap' id='cajaProximoRival'>";
					if (datosPartido[1] != "0") {
						codigo += "		<label class='h10 labelRival'>"+textoIdioma[7]+"</label>";
						codigo += "		<img id='proximoRival' class='h60 escudoSombra' src='img/Clubes/"+deporte+"/Equipos/"+escudoRival+"' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\" alt='Rival'>";
						codigo += "		<label class='h10 w100'>"+establecerOrdinal(datosRival[0])+"</label>";
						codigo += "		<label id='puntuacionRival' class='h10'>"+datosRival[1]+" "+establecerUnidadesPuntuacion(deporte)+"</label>";
						codigo += "		<div class='w100 h10 cajaRacha centradoInlineXY'>";
						for (var i = rachaFav.length - 1; i >= 0; i--) {
							codigo += 		establecerVictoriaDerrota(rachaRival[i].Estado,rachaRival[i].Dato);
						}
						codigo += "		</div>";
					}else{
						codigo += "		<label style='text-align:center'>No hay próximo partido</label>";
					}
					codigo += "		</div>";
					codigo += "	</div>";

					let opcionMostrar = "";
					switch(deporte) {
					case "Balonmano":
						opcionMostrar = js.Balonmano.IDFav == "0" ? " noOperativo" : "";
						break;
					case "Baloncesto":
						opcionMostrar = js.Baloncesto.IDFav == "0" ? " noOperativo" : "";
						break;
					case "Futsal":
						opcionMostrar = js.Futsal.IDFav == "0" ? " noOperativo" : "";
						break;
					}
					codigo += "		<div class='h20 w100 spaceAroundXY' id='cajaEnlacesFavoritos'>";
					codigo += "			<button id='botonMisClasificaciones' class='w30 h80 botonMenuFavoritos"+opcionMostrar+"' onclick=\"pasarPantalla('menuIndex', 'menuMiClasificacion', "+IDFav+")\" ontouchstart=\"inicioPulsacion('botonMisClasificaciones')\" ontouchend=\"finPulsacion('botonMisClasificaciones')\">"+textoIdioma[10]+"</button>";
					codigo += "			<button class='w30 h80 botonMenuFavoritos"+opcionMostrar+"'>"+textoIdioma[11]+"</button>";
					codigo += "			<button id='botonMiPlantilla' class='w30 h80 botonMenuFavoritos"+opcionMostrar+"' onclick=\"pasarPantalla('menuIndex', 'menuMiPlantilla', "+IDFav+")\" ontouchstart=\"inicioPulsacion('botonMiPlantilla')\" ontouchend=\"finPulsacion('botonMiPlantilla')\">"+textoIdioma[12]+"</button>";
					codigo += "		</div>";

					$("#cajaFavorito").html(codigo);
					$("#cajaFavorito").show();
	        	}

			},
			error: function() {
				mostrarFavoritos(deporte);
			}
      	});
	};

	function cerrarSesion() {
		$.ajax({
			url: "php/cerrarSesion.php",
			type: 'POST',
			success: function() {
				window.location.href = "../index.php";
			}
		});
	};

	function mostrarMenuSuperior() {
		var codigo = versionBeta();		
		codigo += "		<label id=\"botonDeporteBalonmano\" class='botonMenuSuperior' onclick=\"botonDeporte('Balonmano')\" ontouchstart=\"inicioPulsacion('botonDeporteBalonmano')\" ontouchend=\"finPulsacion('botonDeporteBalonmano')\">"+textoDeportes(1)+"</label>";
		codigo += "		<div id='notificacionDeporteBM'></div>";
		codigo += "		<label id=\"botonDeporteBaloncesto\" class='botonMenuSuperior' onclick=\"botonDeporte('Baloncesto')\" ontouchstart=\"inicioPulsacion('botonDeporteBaloncesto')\" ontouchend=\"finPulsacion('botonDeporteBaloncesto')\">"+textoDeportes(2)+"</label>";
		codigo += "		<div id='notificacionDeporteBL'></div>";
		codigo += "		<label id=\"botonDeporteFutsal\" class='botonMenuSuperior' onclick=\"botonDeporte('Futsal')\" ontouchstart=\"inicioPulsacion('botonDeporteFutsal')\" ontouchend=\"finPulsacion('botonDeporteFutsal')\">"+textoDeportes(3)+"</label>";
		codigo += "		<div id='notificacionDeporteFS'></div>";
		codigo += "		<img id=\"botonUsuario\" class='botonMenuSuperior' onclick=\"abrirMenuUsuario()\" ontouchstart=\"inicioPulsacion('botonUsuario')\" ontouchend=\"finPulsacion('botonUsuario')\" src=\"img/Menu/configuracion.png\" alt='Botón Ajustes Usuario'>";
		codigo += "		<div id='notificacionUsuario'></div>";
		codigo += "		<img class='logoBigDT' src='img/Menu/Logo_BigDT.png' alt='Logo BigDT'>";

		$("#cajaMenuSuperior").html(codigo);
		$("#cajaMenuSuperior").show();

		comprobarEstadoUsuario();
	};

	function mostrarMenuSecciones() {
		var textoIdioma = textoMenuSecciones(); // Tomar idioma

		var codigo = "";
		// Botón Partido Rápido
		codigo += "		<div id='botonPartidoRapidoBalonmano' class=\"w25 cajones centradoXY flexWrap elementoX\" onclick=\"pasarPantalla('menuIndex', 'menuPartido', 0)\" ontouchstart=\"inicioPulsacion('botonPartidoRapidoBalonmano')\" ontouchend=\"finPulsacion('botonPartidoRapidoBalonmano')\">";
		codigo += "			<img src='img/Menu/partidoRapido.png' alt='Partido Rápido' onmouseover=\"mouseOver('labelPartidoRapidoBalonmano')\" onmouseout=\"mouseOut('labelPartidoRapidoBalonmano')\">";
		codigo += "			<label id='labelPartidoRapidoBalonmano' class='textoOculto'>"+textoIdioma[0]+"</label>";
		codigo += "		</div>";

		// Botón Competiciones
		codigo += "		<div id='botonCompeticiones' class=\"w25 cajones centradoXY flexWrap elementoX\" onclick=\"pasarPantalla('menuIndex', 'menuCompeticiones')\" ontouchstart=\"inicioPulsacion('botonCompeticiones')\" ontouchend=\"finPulsacion('botonCompeticiones')\">";
		codigo += "			<img src='img/Menu/Agenda.png' alt='Icono Agenda' onmouseover=\"mouseOver('labelCompeticiones')\" onmouseout=\"mouseOut('labelCompeticiones')\">";
		codigo += "			<label id='labelCompeticiones' class='textoOculto'>"+textoIdioma[1]+"</label>";
		codigo += "		</div>";
		codigo += "		<img id='avatar' class='avatarDeporte' alt='Avatar Deporte'>";

		// Botón Clasificaciones
		codigo += "		<div id='botonClasificaciones' class=\"w25 cajones centradoXY flexWrap elementoX\" onclick=\"pasarPantalla('menuIndex', 'menuClasificaciones')\" ontouchstart=\"inicioPulsacion('botonClasificaciones')\" ontouchend=\"finPulsacion('botonClasificaciones')\">";
		codigo += "			<img src='img/Menu/Clasificaciones.png' alt='Icono Clasificaciones' onmouseover=\"mouseOver('labelClasificaciones')\" onmouseout=\"mouseOut('labelClasificaciones')\">";
		codigo += "			<label id='labelClasificaciones' class='textoOculto'>"+textoIdioma[2]+"</label>";
		codigo += "		</div>";

		// Botón Entrenador Pro
		codigo += "		<div id=\"botonEntrenadorPro\" class=\"w25 cajones centradoXY flexWrap elementoX\" onclick=\"pasarPantalla('menuIndex', 'menuPro')\" ontouchstart=\"inicioPulsacion('botonEntrenadorPro')\" ontouchend=\"finPulsacion('botonEntrenadorPro')\" onmouseover=\"mouseOver('labelEntrenadorPro')\" onmouseout=\"mouseOut('labelEntrenadorPro')\">";
		codigo += "			<img id='iconoEntrenadorPro' src='img/Menu/EntrenadorPro.png' alt='Icono EntrenadorPro'>";
		codigo += "			<label id='labelEntrenadorPro' class='textoOculto'>"+textoIdioma[3]+"</label>";
		codigo += "			<label class=\"elementosPro invisible\">"+textoIdioma[4]+" <button>"+textoIdioma[3]+"</button></label>";
		codigo += "		</div>";

		// Botón Modo Edición
		codigo += "		<div id='botonEdicion' class='w25 cajones centradoXY flexWrap' onclick=\"pasarPantalla('menuIndex','menuEdicion')\" ontouchstart=\"inicioPulsacion('botonEdicion')\" ontouchend=\"finPulsacion('botonEdicion')\" onmouseover=\"mouseOver('labelEdicion')\" onmouseout=\"mouseOut('labelEdicion')\">";
		codigo += "			<img src='img/Menu/Modo Edicion.png' alt='Icono Edicion'>";
		codigo += "			<label id='labelEdicion' class='textoOculto'>"+textoIdioma[5]+"</label>";
		codigo += "		</div>";

		// Botón Best DT
		codigo += "		<div id='botonBigDT' class='w25 cajones centradoXY flexWrap' onclick=\"pasarPantalla('menuIndex','menuBestDT')\" ontouchstart=\"inicioPulsacion('botonBigDT')\" ontouchend=\"finPulsacion('botonBigDT')\" onmouseover=\"mouseOver('labelBestDT')\" onmouseout=\"mouseOut('labelBestDT')\">";
		codigo += "			<img src='img/Menu/BestDT.png' alt='Icono Edicion'>";
		codigo += "			<label id='labelBestDT' class='textoOculto'>"+textoIdioma[6]+"</label>";
		codigo += "		</div>";

		$("#cajaSecciones").html(codigo);
		$("#cajaSecciones").show();

		let deporteAvatar = sessionStorage.getItem("Deporte") ? textoDeportes(sessionStorage.getItem("Deporte"),1) : "Balonmano";
		let srcAvatar = "img/Menu/"+deporteAvatar+".png";
		document.getElementById("avatar").src = srcAvatar;

		if (permisoEstado(sessionStorage.getItem("Deporte")) == "") {
			document.getElementById("botonEntrenadorPro").classList.remove("noOperativo");
		}else{
			document.getElementById("botonEntrenadorPro").classList.add("noOperativo");
		}
	};
		function mouseOver(elemento) {
			document.getElementById(elemento).style.setProperty("font-size",".9em");
		};
		function mouseOut(elemento) {
			if (document.getElementById(elemento)) {
				document.getElementById(elemento).style.setProperty("font-size","0em");
			}
		};
		function presentarPro(deporte) {
			if (leerDatosUsuario(sessionStorage.getItem("Deporte")) == "0") {
				// Iniciar efecto rotar
				$("#botonEntrenadorPro").addClass("rotacionX");

				// Eliminar contenido
				setTimeout(function() {
					$(".elementosEntrenador").addClass("invisible");
					$("#labelEntrenadorPro").addClass("invisible");
					$("#iconoEntrenadorPro").addClass("invisible");
					}, 225);

				// Incluir contenido
				setTimeout(function() {
					$(".elementosPro").removeClass("invisible");
					$("#labelEntrenadorPro").removeClass("invisible");
					}, 550);

				// Finalizar efecto rotar
				setTimeout(function() {
					$("#botonEntrenadorPro").removeClass("rotacionX");
				},2000);
			}else{
				mostrarPro();
			}
		};

	let funcionRedundante; // variable global definida para parar refresco de datos al cambiar de deporte
	function mostrarBarraInferior(deporte) {
		clearTimeout(funcionRedundante);// Finalizar barra inferior para volver a iniciarla
		let deporteDefecto = sessionStorage.getItem("Deporte") ? textoDeportes(sessionStorage.getItem("Deporte")) : "Balonmano";
		var deporte = !deporte ? deporteDefecto : deporte; // Deporte por defecto
		
		var datosAlmacenados;
		$.ajax({
			url: "php/datosAleatorios.php",
			type: 'POST',
			data: {
				deporte: deporte
			},
			success: function(res){
				datosAlmacenados = JSON.parse(res);

				if (datosAlmacenados == 303) {
					window.location.href = "index.php?error=fuera";
				}else{
					mostrarDatos();
					funcionRedundante = setInterval(function() {mostrarDatos()}, 5000);
				}
			}
		});

		function mostrarDatos() {
			var textoIdioma = textoMenu(); // Tomar idioma

			var aleatorio = Math.floor((Math.random()*(3-0+1))+0); // Fórmula: Math.floor((Math.random()*(max-min+1))+min)

			if (datosAlmacenados[aleatorio].Titulo === "0") {
				var titulo = textoIdioma[13];
			}else if (datosAlmacenados[aleatorio].Titulo === "1") {
				var titulo = textoIdioma[14];
			}

			if (datosAlmacenados[aleatorio].categoria === "0") {
				if (deporte == "Balonmano" || deporte == "Futsal") {
					var unidad = textoIdioma[15];
				}else if (deporte == "Baloncesto") {
					var unidad = textoIdioma[16];
				}
			}else if (datosAlmacenados[aleatorio].categoria === "1") {
				var unidad = textoIdioma[17];
			}else if (datosAlmacenados[aleatorio].categoria === "2") {
				var unidad = textoIdioma[18];
			}else if (datosAlmacenados[aleatorio].categoria === "3") {
				var unidad = textoIdioma[19];
			}

			var codigo = '	<div id="cajaLabelDatos" class="w20 h100 centradoXY"><p>'+unidad+'<br><small>'+titulo+'</small></p></div>';
			codigo += '		<div class="h100 cajaDatos centrado flexWrap">';
			codigo += '			<div class="cajaDatosDatos h50 w100">'+datosAlmacenados[aleatorio].Dato1+'</div>';
			codigo += '			<div class="cajaDatosDatosNombre h50 w100 spaceAroundXY">';
			codigo += '				<div class="cajaDatosNombre w70"><div>'+datosAlmacenados[aleatorio].Nombre1+'</div><strong>'+datosAlmacenados[aleatorio].Apellido1+'</strong></div>';
			codigo += '				<div class="cajaDorsal centradoXY">'+datosAlmacenados[aleatorio].Dorsal1+'</div>';
			codigo += '			</div>';
			codigo += '		</div>';
			codigo += '		<div class="h100 cajaDatos centrado flexWrap">';
			codigo += '			<div class="cajaDatosDatos h50 w100">'+datosAlmacenados[aleatorio].Dato2+'</div>';
			codigo += '			<div class="cajaDatosDatosNombre h50 w100 spaceAroundXY">';
			codigo += '				<div class="cajaDatosNombre w70"><div>'+datosAlmacenados[aleatorio].Nombre2+'</div><strong>'+datosAlmacenados[aleatorio].Apellido2+'</strong></div>';
			codigo += '				<div class="cajaDorsal centradoXY">'+datosAlmacenados[aleatorio].Dorsal2+'</div>';
			codigo += '			</div>';
			codigo += '		</div>';
			codigo += '		<div class="h100 cajaDatos centrado flexWrap">';
			codigo += '			<div class="cajaDatosDatos h50 w100">'+datosAlmacenados[aleatorio].Dato3+'</div>';
			codigo += '			<div class="cajaDatosDatosNombre h50 w100 spaceAroundXY">';
			codigo += '				<div class="cajaDatosNombre w70"><div>'+datosAlmacenados[aleatorio].Nombre3+'</div><strong>'+datosAlmacenados[aleatorio].Apellido3+'</strong></div>';
			codigo += '				<div class="cajaDorsal centradoXY">'+datosAlmacenados[aleatorio].Dorsal3+'</div>';
			codigo += '			</div>';
			codigo += '		</div>';
			codigo += '		<div class="h100 cajaDatos centrado flexWrap">';
			codigo += '			<div class="cajaDatosDatos h50 w100">'+datosAlmacenados[aleatorio].Dato4+'</div>';
			codigo += '			<div class="cajaDatosDatosNombre h50 w100 spaceAroundXY">';
			codigo += '				<div class="cajaDatosNombre w70"><div>'+datosAlmacenados[aleatorio].Nombre4+'</div><strong>'+datosAlmacenados[aleatorio].Apellido4+'</strong></div>';
			codigo += '				<div class="cajaDorsal centradoXY">'+datosAlmacenados[aleatorio].Dorsal4+'</div>';
			codigo += '			</div>';
			codigo += '		</div>';
			codigo += '		<div class="h100 cajaDatos centrado flexWrap">';
			codigo += '			<div class="cajaDatosDatos h50 w100">'+datosAlmacenados[aleatorio].Dato4+'</div>';
			codigo += '			<div class="cajaDatosDatosNombre h50 w100 spaceAroundXY">';
			codigo += '				<div class="cajaDatosNombre w70"><div>'+datosAlmacenados[aleatorio].Nombre4+'</div><strong>'+datosAlmacenados[aleatorio].Apellido4+'</strong></div>';
			codigo += '				<div class="cajaDorsal centradoXY">'+datosAlmacenados[aleatorio].Dorsal4+'</div>';
			codigo += '			</div>';
			codigo += '		</div>';

			$('#barraInferior').html(codigo);
		};
	};

	function botonDeporte(deporte) {
		clearTimeout(funcionRedundante); // Finalizar barra inferior para volver a iniciarla
		idiomaActual("menu", deporte); // Reiniciar con datos del nuevo deporte

		// Guardar deporte actual
		sessionStorage.setItem("Deporte",numeroDeporte(deporte));

		// Iniciar efecto flash
		$(".lineaCajaMenuCentral").addClass("flashed");
		$(".elementoY").addClass("rotacionY");

		// Cambiar contenido
		// Menu deporte
		let srcAvatarActual = "img/Menu/"+textoDeportes(sessionStorage.getItem('Deporte'))+".png";
		document.getElementById("avatar").src = srcAvatarActual;

		// Resetear mensaje Pro
		$(".elementosPro").addClass("invisible");
		$(".elementosEntrenador").removeClass("invisible");

		if (permisoEstado(sessionStorage.getItem("Deporte")) == "") {
			document.getElementById("botonEntrenadorPro").classList.remove("noOperativo");
		}else{
			document.getElementById("botonEntrenadorPro").classList.add("noOperativo");
		}
		
		setTimeout(function() {
			mostrarFavoritos("", deporte);
			// Equipo favorito
			$("#equipoFavorito").addClass("invisible");

			// Proximo rival
			$("#proximoRival").addClass("invisible");
			$("#clasificacionRival").addClass("invisible");
			$("#puntuacionRival").addClass("invisible");
			$("#botonPartido").addClass("invisible");

			// Datos inferiores
			$("#datosBalonmano").addClass("invisible");

			// Incluir datos nuevos
			$("#equipoFavorito").removeClass("invisible");
			//$("#cartelPosicion").removeClass("invisible");
			$("#cartelPuntuacion").removeClass("invisible");

			// Incluir datos nuevos
			$("#proximoRival").removeClass("invisible");
			$("#clasificacionRival").removeClass("invisible");
			$("#puntuacionRival").removeClass("invisible");
			$("#botonPartido").removeClass("invisible");

			$("#datos").removeClass("invisible");
		}, 1100);

		// Finalizar efecto flash
		setTimeout(function() {
			// Datos inferiores
			$(".lineaCajaMenuCentral").removeClass("flashed");
		}, 1500);

		// Finalizar efecto ROTAR
		setTimeout(function() {
			$(".elementoY").removeClass("rotacionY");
		}, 2000);
		comprobarEstadoUsuario();
	};

///////////////////////////////////////////////////////
	// Marco Jugadores
	function marcoJugador(tamaño,idJugador,nombre,apellido,posicion,dorsal,equipo,escudo,foto,especial) {
		let deporte = sessionStorage.getItem("Deporte");
		let deporteTexto= textoDeportes(deporte);
		var datos = "";
		switch (tamaño) {
			case "P":
				var tamañoPosicion = "minFontPosicion";
				var tamañoDorsal = "minFontValoracion";
				var tamañoNombre = "minFontNombre";
				break;
			case "G":
				var tamañoPosicion = "maxFontPosicion";
				var tamañoDorsal = "maxFontValoracion";
				var tamañoNombre = "maxFontNombre";
				break;
		}
		let fotoOK = foto ? foto : "x.png";
		switch (especial) {
			case "1":
				datos += "			<div class='h100 centradoXY flexWrap fichaJugador pulsable' onclick=\"ventanaDatos('jugador',"+idJugador+")\">";
				datos += "				<div class='fichaJugadorTop'>";
				datos += "					<img class='w75 fotoJugador' src='img/Clubes/"+deporteTexto+"/Plantillas/"+equipo+"/"+fotoOK+"' alt='Foto Jugador' onerror=\"this.src='img/Clubes/usuario.png'\">";
				datos += "					<label class='labelPosicionJugador "+tamañoPosicion+"'>"+textoPuestos(deporte,posicion,"1")+"</label>";
				datos += "					<label class='labelValoracionJugador "+tamañoDorsal+" centradoXY'>"+dorsal+"</label>";
				datos += "					<img class='escudo' src='img/Clubes/"+deporteTexto+"/Equipos/"+escudo+"' alt='Escudo jugador' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
				datos += "				</div>";
				datos += "				<div class='w100 h30 fichaJugadorBottom centradoInlineXY flexWrap'>";
				datos += "					<label class='fichaNombre "+tamañoNombre+"'>"+nombre+"</label>";
				datos += "					<label class='fichaApellido "+tamañoNombre+"'>"+apellido+"</label>";
				datos += "					<label class='estrellas "+tamañoNombre+"'>&#9733; &#9733; &#9733; &#9733; &#9734;</label>"; /// Programar con progress
				datos += "				</div>";
				datos += "			</div>";
				break;
			case "2":
			case "3":
				let colorFondo = especial == "2" ? "fichaJugadorEspecial" : "fichaJugadorUnico";
				datos += "			<div class='h100 centradoXY flexWrap fichaJugador "+colorFondo+"' onclick=\"ventanaDatos('jugador',"+idJugador+")\">";
				//datos += "				<img class='h100 fondoFichaJugadorEspecial' src='img/Menu/glitter.jfif' alt='Fondo Foto Jugador'>";
				datos += "				<div class='fichaJugadorTop'>";
				datos += "					<img class='w90 fotoJugador fondoFotoJugador' src='img/Clubes/"+deporteTexto+"/Plantillas/"+equipo+"/"+fotoOK+"' alt='Foto Jugador' loading='lazy' onerror=\"this.src='img/Clubes/usuario especial.png'\">";
				datos += "					<img class='w90 fotoJugador principalFotoJugador' src='img/Clubes/"+deporteTexto+"/Plantillas/"+equipo+"/"+fotoOK+"' alt='Foto Jugador' loading='lazy' onerror=\"this.src='img/Clubes/usuario especial.png'\">";
				datos += "					<label class='labelPosicionJugador "+tamañoPosicion+"'>"+textoPuestos(deporte,posicion,1)+"</label>";
				datos += "					<label class='labelValoracionJugador "+tamañoDorsal+" centradoXY'>"+dorsal+"</label>";
				datos += "					<img class='escudo' src='img/Clubes/"+deporteTexto+"/Equipos/"+escudo+"' loading='lazy' alt='Escudo jugador' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
				datos += "				</div>";
				datos += "				<div class='w100 h30 fichaJugadorBottom centradoInlineXY flexWrap'>";
				datos += "					<label class='fichaNombre "+tamañoNombre+"'>"+nombre+"</label>";
				datos += "					<label class='fichaApellido "+tamañoNombre+"'>"+apellido+"</label>";
				datos += "					<label class='estrellas "+tamañoNombre+"'>&#9733; &#9733; &#9733; &#9733; &#9734;</label>"; /// Programar con progress
				datos += "				</div>";
				datos += "			</div>";
				break;
		}
		return datos;
	};

	// Marco Técnicos
	function marcoTecnico(tamaño,idTecnico,nombre,puesto,equipo,escudo,foto,especial) {
		var deporte = textoDeportes(sessionStorage.getItem("Deporte"));
		var datos = "";
		switch (tamaño) {
			case "P":
				var tamañoPosicion = "minFontPosicion";
				var tamañoDorsal = "minFontValoracion";
				var tamañoNombre = "minFontNombre";
				break;
			case "G":
				var tamañoPosicion = "maxFontPosicion";
				var tamañoDorsal = "maxFontValoracion";
				var tamañoNombre = "maxFontNombre";
				break;
		}
		let fotoOK = foto ? foto : "x.png";
		switch (especial) {
			case "1":
				datos += "			<div class='h100 centradoXY flexWrap fichaTecnico pulsable' onclick=\"ventanaDatos('entrenador',"+idTecnico+")\">";
				datos += "				<div class='fichaTecnicoTop'>";
				datos += "					<img class='w75 fotoTecnico' src='img/Clubes/"+deporte+"/Plantillas/"+equipo+"/"+fotoOK+"' alt='Foto Tecnico' onerror=\"this.src='img/Clubes/usuario.png'\">";
				datos += "					<img class='escudo' src='img/Clubes/"+deporte+"/Equipos/"+escudo+"' alt='Escudo Tecnico' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
				datos += "				</div>";
				datos += "				<div class='w100 h30 fichaTecnicoBottom centradoInlineXY flexWrap'>";
				datos += "					<label class='fichaNombre "+tamañoNombre+"'>"+nombre+"</label>";
				datos += "					<label class='w100 centradoXY labelPuestoTecnico "+tamañoPosicion+"'>"+textoTecnicos(puesto)+"</label>";
				datos += "					<label class='estrellas "+tamañoNombre+"'>&#9733; &#9733; &#9733; &#9733; &#9734;</label>"; /// Programar con progress
				datos += "				</div>";
				datos += "			</div>";
				break;
			case "2":
			case "3":
				let colorFondo = especial == "2" ? "fichaTecnicoEspecial" : "fichaTecnicoUnico";
				datos += "			<div class='h100 centradoXY flexWrap fichaTecnico "+colorFondo+"' onclick=\"ventanaDatos('Tecnico',"+idTecnico+")\">";
				datos += "				<img class='h100 fondoFichaTecnicoEspecial' src='img/Menu/glitter.jfif' alt='Fondo Foto Tecnico'>";
				datos += "				<div class='fichaTecnicoTop'>";
				datos += "					<img class='w90 fotoTecnico fondoFotoTecnico' src='img/Clubes/"+deporte+"/Plantillas/"+equipo+"/"+fotoOK+"' alt='Foto Tecnico' loading='lazy' onerror=\"this.src='img/Clubes/usuario especial.png'\">";
				datos += "					<img class='w90 fotoTecnico principalFotoTecnico' src='img/Clubes/"+deporte+"/Plantillas/"+equipo+"/"+fotoOK+"' alt='Foto Tecnico' loading='lazy' onerror=\"this.src='img/Clubes/usuario especial.png'\">";
				datos += "					<img class='escudo' src='img/Clubes/"+deporte+"/Equipos/"+escudo+"' loading='lazy' alt='Escudo Tecnico' onerror=\"this.src='img/Clubes/Clubes/defecto.png'\">";
				datos += "				</div>";
				datos += "				<div class='w100 h30 fichaTecnicoBottom centradoInlineXY flexWrap'>";
				datos += "					<label class='fichaNombre "+tamañoNombre+"'>"+nombre+"</label>";
				datos += "					<label class='w100 centradoXY labelPuestoTecnico "+tamañoPosicion+"'>"+textoTecnicos(puesto)+"</label>";
				datos += "					<label class='estrellas "+tamañoNombre+"'>&#9733; &#9733; &#9733; &#9733; &#9734;</label>"; /// Programar con progress
				datos += "				</div>";
				datos += "			</div>";
				break;
		}
		return datos;
	};
///////////////////////////////////////////////////////


	// Funciones de transición
	function pasarPantalla(pagOrigen, pagDestino, Id,temporada,opcion1,opcion2,opcion3) {
		if (pagOrigen == "menuIndex") {
			clearTimeout(funcionRedundante); // Finalizar barra inferior para no consumir recursos
		}else if (pagDestino == "menuIndex"){
			idiomaActual("menu"); // Volver a iniciar barra inferior
			if (pagOrigen == "menuPartido") {
				borrarDatos("partido");
			}
		}

		// Activar efecto de transición
		$("#transicion1").addClass("efecto-transicion1");
		$("#transicion2").addClass("efecto-transicion2");

		// Emitir efecto de sonido a la transición
		const sonido = new Audio('mp3/sonidoTransicion.mp3');
		sonido.play();

		// Preparar la página de competiciones
		if (pagDestino == "menuCompeticiones") {
			marcarUso(sessionStorage.getItem('Deporte'),'4','0');
			prepararPantallaCompeticiones();
		}
		if (pagDestino == "menuCompeticiones2") {
			prepararPantallaCompeticiones2(Id,temporada,opcion1,opcion2,opcion3);
		}
		// Preparar la página de clasificaciones
		if (pagDestino == "menuClasificaciones") {
			marcarUso(sessionStorage.getItem('Deporte'),'5','0');
			prepararPantallaClasificaciones();
		}
		// Preparar la página de menuPro
		if (pagDestino == "menuPro") {
			marcarUso(sessionStorage.getItem('Deporte'),'6','0');
			prepararPantallaPro();
		}
		// Preparar la página de edición
		if (pagDestino == "menuEdicion") {
			marcarUso(sessionStorage.getItem('Deporte'),'7','0');
			prepararPantallaEdicion();
		}
		// Preparar la página de BestDT
		if (pagDestino == "menuBestDT") {
			marcarUso(sessionStorage.getItem('Deporte'),'8','0');
			prepararPantallaBestDT();
		}
		// Preparar la página de Mi Clasificación
		if (pagDestino == "menuMiClasificacion") {
			marcarUso(sessionStorage.getItem('Deporte'),'10','0');
			prepararPantallaMiClasificacion(Id); // El parámetro es el de IdEquipo
		}
		// Preparar la página de Mi Plantilla
		if (pagDestino == "menuMiPlantilla") {
			marcarUso(sessionStorage.getItem('Deporte'),'12','0');
			prepararPantallaMiPlantilla(Id); // El parámetro es el de IdEquipo
		}
		// Preparar la página de Directo BigDT
		if (pagDestino == "menuDirectoTV") {
			marcarUso(sessionStorage.getItem('Deporte'),'13','0');
			mostrarDirectoTV(Id);
		}
		// Preparar la página de previa del partdo
		if (pagDestino == "menuPartido") {
			marcarUso(sessionStorage.getItem('Deporte'),'9','0');
			prepararPantallaPreviaPartido(Id);
		}

		// Cambio de pantalla
		var origen = "#" + pagOrigen;
		var destino = "#" + pagDestino;

		setTimeout(function() {
			$(origen).addClass("invisible");
			$(destino).removeClass("invisible");
		}, 1000);

		// Volver pantalla transición a modo espera
		setTimeout(function() {
			$("#transicion1").removeClass("efecto-transicion1");
			$("#transicion2").removeClass("efecto-transicion2");
		},2100);
	};

	// Funciones Partido
	function transicionPartido(pagOrigen,pagDestino) {
		if (pagOrigen == "menuIndex") {
			// Finalizar barra inferior para no consumir recursos
			clearTimeout(funcionRedundante);
		}else if (pagDestino == "menuIndex"){
			// Volver a iniciar barra inferior
			idiomaActual("menu");
		}

		var origen = "#" + pagOrigen;
		var destino = "#" + pagDestino;

		// Activar efecto de transición
		$("#transicion1").addClass("efecto-transicion1");
		$("#transicion2").addClass("efecto-transicion2");

		// Emitir efecto de sonido a la transición
		const sonido = new Audio('mp3/sonidoTransicion.mp3');
		sonido.play();

		// Cambio de pantalla
		setTimeout(function() {
			$(origen).addClass("invisible");
			$(destino).removeClass("invisible");
		}, 1000);

		// Volver pantalla transición a modo espera
		setTimeout(function() {
			$("#transicion1").removeClass("efecto-transicion1");
			$("#transicion2").removeClass("efecto-transicion2");
		},2100);
	};
//Menciones:
//Abhishek Chandra
//https://unsplash.com/es/fotos/kXJksx1kdJ0?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
</script>
</body>
</html>
