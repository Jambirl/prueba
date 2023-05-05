function capturaPartidoBalonmano(IdPartido, IdLocal, IdVisitante) {
	mostrarPantallaCaptura(IdPartido, IdLocal, IdVisitante);
	eliminarCookie("jugadorActivo");
	eliminarCookie("equipoActivo");
	crearCookie("Tipo pase","Clasico"); //Poner este valor como pase predeterminado
	crearCookie("Tipo parada","Despeje"); //Poner este valor como pase predeterminado
	accionGol("L",0);
	accionGol("V",0);
		////////////////////////////// hay que poner una funcion para que imprima todo lo que ya está en memoria (ahora mismo no lo hace hasta que no se le da a algun botón)
	relojInicial();
	contadorTM();
	relojExclusiones(); //Mostrar los contadores de exclusiones activos
	registroDatos(); //Mostrar los datos de partido que ya están escritos
}

function mostrarPantallaCaptura(IdPartido, IdLocal, IdVisitante) {
	/*$.ajax({
        url: "php/datosInicialesPartido.php",
        type: 'POST',
        data: {
        	IdPartido: IdPartido,
        	IdLocal: IdLocal,
        	IdVisitante: IdVisitante
        },

        success: function(res){
        	var js= JSON.parse(res);
        }
    });*/
    // En BD del usuario hay que poner si prefiere datos simples o complejos
    // También hay que poner al meter los datos qué usuario es el que los hace (para poner tener un seguimiento de quién hace los cambios y mete los datos)

	// Hay que poner opciones para indicar el partido que es y así poder buscar los datos en la BD

	// Una vez cogidos los datos del partido, ya se puede empezar a meter las lecturas
	var marcadorL = "0";
	var marcadorV = "0";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hay que poner lo primero la opción de elegir la convocatoria
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$("#bodyMenu").addClass("invisible");
	$("#bodyCaptura").removeClass("invisible");

	var datos = "";
	datos += "	<div id='transicion1' class='cuadroTransicion'></div>";
	datos += "	<div id='transicion2' class='cuadroTransicion'>";
	datos += "		<img src='img/Publicidad/logoAdidas.png'>";
	datos += "	</div>";
	datos += "	<div class='recuadroBody centradoInlineXY'>";
	datos += "		<div id='lateralIzquierdo' class='w75 h100 centradoXY flexWrap'>";
	datos += "			<div id='marcadorSuperior' class='h15 w100 centradoInlineXY'>";
	datos += "				<div class='zonaLateral w10 centradoXY'>";
	datos += "					<div id='botonSancionBanquillo' class='centradoXY flexWrap error w80'>";
	datos += "						<img class='w100' src='img/Captura/sancionBanquillo.png'>";
	datos += "						<label>Sanción Banquillo</label>";
	datos += "					</div>";
	datos += "				</div>";
	datos += "				<div id='zonaCentral' class='w80 h100 centradoInlineXY'>";
	datos += "					<div class='escudo w30 h100 centradoXY flexWrap'>";
	datos += "						<img class='h60' src='img/Clubes/Balonmano/Equipos/2021/"+leerCookie('EscudoLocal')+"'>";
	datos += "						<label>"+leerCookie('NombreLocal')+"</label>";
	datos += "					</div>";
	datos += "					<div class='datosMarcador w40 h100'>";
	datos += "						<div id='cajaPabellon' class='h35 centradoXY flexWrap'>";
	datos += 							leerCookie('Pabellon')+"<br>";
	datos += 							leerCookie('Fecha')+" "+leerCookie('Hora');
	datos += "						</div>";
	datos += "						<div id='cajaMarcador' class='h65 centradoXY flexWrap'>";
	datos += "							<div id='cajaNumeros' class='h85 w100 spaceBetweenXY'>";
	datos += "								<div id='imprimirMarcadorCapturaL' class='w45 h100 centradoXY'><label>"+marcadorL+"</label></div><input type='text' id='marcadorL' value='0' style='display: none;'>";
	datos += "								<div id='guion' class='w10 h100 centradoXY'><img src='img/Captura/guion.png'></div>";
	datos += "								<div id='imprimirMarcadorCapturaV' class='w45 h100 centradoXY'><label>"+marcadorV+"</label></div><input type='text' id='marcadorV' value='0' style='display: none;'>";
	datos += "							</div>";
	datos += "							<div class='cajaTM h15 w100 spaceBetweenXY'>";
	datos += "								<div id='tiempoMuertoLocal' class='spaceAroundXY w45 h100'></div>";
	datos += "								<div id='tiempoMuertoVisitante' class='spaceAroundXY w45 h100'></div>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "					</div>";
	datos += "					<div class='escudo w30 h100 centradoXY flexWrap'>";
	datos += "						<img class='h60' src='img/Clubes/Balonmano/Equipos/2021/"+leerCookie('EscudoVisitante')+"'>";
	datos += "						<label>"+leerCookie('NombreVisitante')+"</label>";
	datos += "					</div>";
	datos += "				</div>";
	datos += "				<div class='zonaLateral w10 centradoXY'>";
	datos += "					<div id='botonSancionBanquillo' class='centradoXY flexWrap error w80'>";
	datos += "						<img class='w100' src='img/Captura/sancionBanquillo.png'>";
	datos += "						<label>Sanción Banquillo</label>";
	datos += "					</div>";
	datos += "				</div>";
	datos += "			</div>";

	datos += "			<div id='marcadorCentral' class='h55 w100 centradoXY'> <!-- MODIFICAR QUE SE PUEDAN CAMBIAR POR LOS REALES-->";
	datos += "				<div id='pantallaEquipos' class='h100 w100 spaceAroundXY'>";
	datos += "					<div class='w49 h100 equipo' id='local'>";
	datos += "						<div class='w100 h25 spaceAroundXY'>";
	datos += "							<div id='jugadorL1' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',1)\" ontouchstart=\"inicioPulsacion('jugadorL1')\" ontouchend=\"finPulsacion('jugadorL1')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaPortero.png'>";
	datos += "								<div id='sancionesL1' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL1'><label class='textoLocal'>1</label></div>";
	datos += "								<div id='exclusionL1' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorL2' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',2)\" ontouchstart=\"inicioPulsacion('jugadorL2')\" ontouchend=\"finPulsacion('jugadorL2')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL2' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL2'><label class='textoLocal'>2</label></div>";
	datos += "								<div id='exclusionL2' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorL4' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',4)\" ontouchstart=\"inicioPulsacion('jugadorL4')\" ontouchend=\"finPulsacion('jugadorL4')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL4' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL4'><label class='textoLocal'>4</label></div>";
	datos += "								<div id='exclusionL4' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorL5' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',5)\" ontouchstart=\"inicioPulsacion('jugadorL5')\" ontouchend=\"finPulsacion('jugadorL5')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL5' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL5'><label class='textoLocal'>5</label></div>";
	datos += "								<div id='exclusionL5' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "						</div>";

	datos += "						<div class='w100 h25 spaceAroundXY'>";
	datos += "							<div id='jugadorL6' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',6)\" ontouchstart=\"inicioPulsacion('jugadorL6')\" ontouchend=\"finPulsacion('jugadorL6')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL6' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL6'><label class='textoLocal'>6</label></div>";
	datos += "								<div id='exclusionL6' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorL7' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',7)\" ontouchstart=\"inicioPulsacion('jugadorL7')\" ontouchend=\"finPulsacion('jugadorL7')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL7' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL7'><label class='textoLocal'>7</label></div>";
	datos += "								<div id='exclusionL7' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorL8' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',8)\" ontouchstart=\"inicioPulsacion('jugadorL8')\" ontouchend=\"finPulsacion('jugadorL8')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL8' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL8'><label class='textoLocal'>8</label></div>";
	datos += "								<div id='exclusionL8' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorL10' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',10)\" ontouchstart=\"inicioPulsacion('jugadorL10')\" ontouchend=\"finPulsacion('jugadorL10')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL10' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL10'><label class='textoLocal'>10</label></div>";
	datos += "								<div id='exclusionL10' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "						</div>";

	datos += "						<div class='w100 h25 spaceAroundXY'>";
	datos += "							<div id='jugadorL12' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',12)\" ontouchstart=\"inicioPulsacion('jugadorL12')\" ontouchend=\"finPulsacion('jugadorL12')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaPortero.png'>";
	datos += "								<div id='sancionesL12' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL12'><label class='textoLocal'>12</label></div>";
	datos += "								<div id='exclusionL12' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorL16' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',16)\" ontouchstart=\"inicioPulsacion('jugadorL16')\" ontouchend=\"finPulsacion('jugadorL16')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaPortero.png'>";
	datos += "								<div id='sancionesL16' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL16'><label class='textoLocal'>16</label></div>";
	datos += "								<div id='exclusionL16' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorL23' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',23)\" ontouchstart=\"inicioPulsacion('jugadorL23')\" ontouchend=\"finPulsacion('jugadorL23')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL23' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL23'><label class='textoLocal'>23</label></div>";
	datos += "								<div id='exclusionL23' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorL24' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',24)\" ontouchstart=\"inicioPulsacion('jugadorL24')\" ontouchend=\"finPulsacion('jugadorL24')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL24' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL24'><label class='textoLocal'>24</label></div>";
	datos += "								<div id='exclusionL24' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "						</div>";

	datos += "						<div class='w100 h25 spaceAroundXY'>";
	datos += "							<div id='jugadorL30' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',30)\" ontouchstart=\"inicioPulsacion('jugadorL30')\" ontouchend=\"finPulsacion('jugadorL30')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL30' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL30'><label class='textoLocal'>30</label></div>";
	datos += "								<div id='exclusionL30' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorL33' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',33)\" ontouchstart=\"inicioPulsacion('jugadorL33')\" ontouchend=\"finPulsacion('jugadorL33')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL33' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL33'><label class='textoLocal'>33</label></div>";
	datos += "								<div id='exclusionL33' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorL66' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',66)\" ontouchstart=\"inicioPulsacion('jugadorL66')\" ontouchend=\"finPulsacion('jugadorL66')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL66' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL66'><label class='textoLocal'>66</label></div>";
	datos += "								<div id='exclusionL66' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorL77' class='centradoXY flexWrap jugador jugadorL' onclick=\"jugadorSeleccionado('local',77)\" ontouchstart=\"inicioPulsacion('jugadorL77')\" ontouchend=\"finPulsacion('jugadorL77')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesL77' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalL77'><label class='textoLocal'>77</label></div>";
	datos += "								<div id='exclusionL77' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "					</div>";
	datos += "					<div class='w49 h100 equipo' id='visitante'>";
	datos += "						<div class='w100 h25 spaceAroundXY'>";
	datos += "							<div id='jugadorV3' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',3)\" ontouchstart=\"inicioPulsacion('jugadorV3')\" ontouchend=\"finPulsacion('jugadorV3')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV3' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV3'><label class='textoVisitante'>3</label></div>";
	datos += "								<div id='exclusionV3' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorV4' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',4)\" ontouchstart=\"inicioPulsacion('jugadorV4')\" ontouchend=\"finPulsacion('jugadorV4')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV4' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV4'><label class='textoVisitante'>4</label></div>";
	datos += "								<div id='exclusionV4' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorV5' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',5)\" ontouchstart=\"inicioPulsacion('jugadorV5')\" ontouchend=\"finPulsacion('jugadorV5')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV5' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV5'><label class='textoVisitante'>5</label></div>";
	datos += "								<div id='exclusionV5' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorV6' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',6)\" ontouchstart=\"inicioPulsacion('jugadorV6')\" ontouchend=\"finPulsacion('jugadorV6')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV6' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV6'><label class='textoVisitante'>6</label></div>";
	datos += "								<div id='exclusionV6' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "						</div>";

	datos += "						<div class='w100 h25 spaceAroundXY'>";
	datos += "							<div id='jugadorV7' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',7)\" ontouchstart=\"inicioPulsacion('jugadorV7')\" ontouchend=\"finPulsacion('jugadorV7')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV7' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV7'><label class='textoVisitante'>7</label></div>";
	datos += "								<div id='exclusionV7' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorV8' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',8)\" ontouchstart=\"inicioPulsacion('jugadorV8')\" ontouchend=\"finPulsacion('jugadorV8')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV8' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV8'><label class='textoVisitante'>8</label></div>";
	datos += "								<div id='exclusionV8' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorV9' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',9)\" ontouchstart=\"inicioPulsacion('jugadorV9')\" ontouchend=\"finPulsacion('jugadorV9')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV9' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV9'><label class='textoVisitante'>9</label></div>";
	datos += "								<div id='exclusionV9' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorV10' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',10)\" ontouchstart=\"inicioPulsacion('jugadorV10')\" ontouchend=\"finPulsacion('jugadorV10')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV10' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV10'><label class='textoVisitante'>10</label></div>";
	datos += "								<div id='exclusionV10' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "						</div>";

	datos += "						<div class='w100 h25 spaceAroundXY'>";
	datos += "							<div id='jugadorV11' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',11)\" ontouchstart=\"inicioPulsacion('jugadorV11')\" ontouchend=\"finPulsacion('jugadorV11')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV11' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV11'><label class='textoVisitante'>11</label></div>";
	datos += "								<div id='exclusionV11' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorV14' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',14)\" ontouchstart=\"inicioPulsacion('jugadorV14')\" ontouchend=\"finPulsacion('jugadorV14')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV14' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV14'><label class='textoVisitante'>14</label></div>";
	datos += "								<div id='exclusionV14' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorV16' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',16)\" ontouchstart=\"inicioPulsacion('jugadorV16')\" ontouchend=\"finPulsacion('jugadorV16')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaPortero.png'>";
	datos += "								<div id='sancionesV16' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV16'><label class='textoVisitante'>16</label></div>";
	datos += "								<div id='exclusionV16' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorV17' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',17)\" ontouchstart=\"inicioPulsacion('jugadorV17')\" ontouchend=\"finPulsacion('jugadorV17')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV17' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV17'><label class='textoVisitante'>17</label></div>";
	datos += "								<div id='exclusionV17' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "						</div>";

	datos += "						<div class='w100 h25 spaceAroundXY'>";
	datos += "							<div id='jugadorV18' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',18)\" ontouchstart=\"inicioPulsacion('jugadorV18')\" ontouchend=\"finPulsacion('jugadorV18')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV18' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV18'><label class='textoVisitante'>18</label></div>";
	datos += "								<div id='exclusionV18' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorV21' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',21)\" ontouchstart=\"inicioPulsacion('jugadorV21')\" ontouchend=\"finPulsacion('jugadorV21')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaJugador.png'>";
	datos += "								<div id='sancionesV21' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV21'><label class='textoVisitante'>21</label></div>";
	datos += "								<div id='exclusionV21' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorV23' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',23)\" ontouchstart=\"inicioPulsacion('jugadorV23')\" ontouchend=\"finPulsacion('jugadorV23')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaPortero.png'>";
	datos += "								<div id='sancionesV23' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV23'><label class='textoVisitante'>23</label></div>";
	datos += "								<div id='exclusionV23' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "							<div id='jugadorV37' class='centradoXY flexWrap jugador jugadorV' onclick=\"jugadorSeleccionado('visitante',37)\" ontouchstart=\"inicioPulsacion('jugadorV37')\" ontouchend=\"finPulsacion('jugadorV37')\">";
	datos += "								<img class='imgCamiseta' src='img/Captura/camisetaPortero.png'>";
	datos += "								<div id='sancionesV37' class='sumaExclusiones'></div>";
	datos += "								<div class='numeroDorsal' id='numeroDorsalV37'><label class='textoVisitante'>37</label></div>";
	datos += "								<div id='exclusionV37' class='contadorExclusion'></div>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "					</div>";
	datos += "				</div>";
	datos += "				<div id='pantallaTiro' class='w100 h100' style='display: none;'>";
	datos += "					<div id='tiroFuera' class='w100 h100 centradoInlineXY'>";
	datos += "						<div class='fueraBanda centradoXY'><label>Fuera<br>de<br>Banda</label></div>";
	datos += "						<div class='fueraFondo w85 h100 centradoXY flexWrap'>";
	datos += "							<div id='fondoSuperior' class='centradoXY'><label>Fuera de portería</label></div>";
	datos += "							<div id='fondoLateral' class='centradoInlineXY'>";
	datos += "								<label class='w15'>Fuera<br>de<br>Fondo<br>Lateral</label>";
	datos += "								<div class='w70'></div>";
	datos += "								<label class='w15'>Fuera<br>de<br>Fondo<br>Lateral</label>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "						<div class='fueraBanda centradoXY'><label>Fuera<br>de<br>Banda</label></div>";
	datos += "					</div>";
	datos += "					<div id='tiroDentro'>";
	datos += "						<div id='tiroPoste' onclick=\"botonPoste('palo')\" ondblclick=\"botonPoste('dentro')\" ontouchstart=\"inicioPulsacion('tiroPoste')\" ontouchend=\"finPulsacion('tiroPoste')\">";
	datos += "						</div>";
	datos += "						<div id='tiroPorteria' class='spaceBetweenXY flexWrap'>";
	datos += "							<div class='w33 h33 spaceAroundXY'>";
	datos += "								<div id='aciertoA1' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoA1')\" ontouchend=\"finPulsacion('aciertoA1')\"><img class='w80' src='img/Captura/acierto.png'><label>Gol</label></div>";
	datos += "								<div id='errorA1' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada();\" ontouchstart=\"inicioPulsacion('errorA1')\" ontouchend=\"finPulsacion('errorA1')\"><img class='w80' src='img/Captura/error.png'><label>Parada</label></div>";
	datos += "							</div>";
	datos += "							<div class='w33 h33 spaceAroundXY'>";
	datos += "								<div id='aciertoA2' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoA2')\" ontouchend=\"finPulsacion('aciertoA2')\"><img class='w80' src='img/Captura/acierto.png'><label>Gol</label></div>";
	datos += "								<div id='errorA2' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada();\" ontouchstart=\"inicioPulsacion('errorA2')\" ontouchend=\"finPulsacion('errorA2')\"><img class='w80' src='img/Captura/error.png'><label>Parada</label></div>";
	datos += "							</div>";
	datos += "							<div class='w33 h33 spaceAroundXY'>";
	datos += "								<div id='aciertoA3' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoA3')\" ontouchend=\"finPulsacion('aciertoA3')\"><img class='w80' src='img/Captura/acierto.png'><label>Gol</label></div>";
	datos += "								<div id='errorA3' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada();\" ontouchstart=\"inicioPulsacion('errorA3')\" ontouchend=\"finPulsacion('errorA3')\"><img class='w80' src='img/Captura/error.png'><label>Parada</label></div>";
	datos += "							</div>";
	datos += "							<div class='w33 h33 spaceAroundXY'>";
	datos += "								<div id='aciertoB1' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoB1')\" ontouchend=\"finPulsacion('aciertoB1')\"><img class='w80' src='img/Captura/acierto.png'><label>Gol</label></div>";
	datos += "								<div id='errorB1' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada();\" ontouchstart=\"inicioPulsacion('errorB1')\" ontouchend=\"finPulsacion('errorB1')\"><img class='w80' src='img/Captura/error.png'><label>Parada</label></div>";
	datos += "							</div>";
	datos += "							<div class='w33 h33 spaceAroundXY'>";
	datos += "								<div id='aciertoB2' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoB2')\" ontouchend=\"finPulsacion('aciertoB2')\"><img class='w80' src='img/Captura/acierto.png'><label>Gol</label></div>";
	datos += "								<div id='errorB2' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada();\" ontouchstart=\"inicioPulsacion('errorB2')\" ontouchend=\"finPulsacion('errorB2')\"><img class='w80' src='img/Captura/error.png'><label>Parada</label></div>";
	datos += "							</div>";
	datos += "							<div class='w33 h33 spaceAroundXY'>";
	datos += "								<div id='aciertoB3' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoB3')\" ontouchend=\"finPulsacion('aciertoB3')\"><img class='w80' src='img/Captura/acierto.png'><label>Gol</label></div>";
	datos += "								<div id='errorB3' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada();\" ontouchstart=\"inicioPulsacion('errorB3')\" ontouchend=\"finPulsacion('errorB3')\"><img class='w80' src='img/Captura/error.png'><label>Parada</label></div>";
	datos += "							</div>";
	datos += "							<div class='w33 h33 spaceAroundXY'>";
	datos += "								<div id='aciertoC1' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoC1')\" ontouchend=\"finPulsacion('aciertoC1')\"><img class='w80' src='img/Captura/acierto.png'><label>Gol</label></div>";
	datos += "								<div id='errorC1' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada();\" ontouchstart=\"inicioPulsacion('errorC1')\" ontouchend=\"finPulsacion('errorC1')\"><img class='w80' src='img/Captura/error.png'><label>Parada</label></div>";
	datos += "							</div>";
	datos += "							<div class='w33 h33 spaceAroundXY'>";
	datos += "								<div id='aciertoC2' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoC2')\" ontouchend=\"finPulsacion('aciertoC2')\"><img class='w80' src='img/Captura/acierto.png'><label>Gol</label></div>";
	datos += "								<div id='errorC2' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada();\" ontouchstart=\"inicioPulsacion('errorC2')\" ontouchend=\"finPulsacion('errorC2')\"><img class='w80' src='img/Captura/error.png'><label>Parada</label></div>";
	datos += "							</div>";
	datos += "							<div class='w33 h33 spaceAroundXY'>";
	datos += "								<div id='aciertoC3' class='acierto w40 h70 centradoXY flexWrap' onclick=\"accionGol(); ventanaInicial();\" ontouchstart=\"inicioPulsacion('aciertoC3')\" ontouchend=\"finPulsacion('aciertoC3')\"><img class='w80' src='img/Captura/acierto.png'><label>Gol</label></div>";
	datos += "								<div id='errorC3' class='error w40 h70 centradoXY flexWrap' onclick=\"accionParada();\" ontouchstart=\"inicioPulsacion('errorC3')\" ontouchend=\"finPulsacion('errorC3')\"><img class='w80' src='img/Captura/error.png'><label>Parada</label></div>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "					</div>";
	datos += "				</div>";
	datos += "			</div>";

	datos += "			<div id='marcadorInferior' class='h25 w100'>";
	datos += "				<div id='opcionesDefecto' class='centradoXY h100'>";
	datos += "					<label>Para iniciar jugada, selecciona al jugador que posee la pelota</label>";
	datos += "				</div>";
	datos += "				<div id='opcionesJugador' class='centradoInlineXY w100 h100' style='display: none;'>";
	datos += "					<div class='botonVolver w10 centradoXY' onclick=\"botonVolver()\"><img class='w80' src='img/Captura/deshacer.png'></div>";
	datos += "					<div id='botonesTiro' class='w30 h100 centradoXY flexWrap'>";
	datos += "						<div class='w100 h50 centradoXY'>";
	datos += "							<div class='recuadroIcono centradoXY flexWrap acierto h75 w80' id='botonTiro' onclick=\"abrirVentanaTiro()\" ontouchstart=\"inicioPulsacion('botonTiro')\" ontouchend=\"finPulsacion('botonTiro')\">";
	datos += "								<img class='logoIcono' src='img/Captura/tiro.png'>";
	datos += "								<label class='labelIcono'>Tiro</label>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "						<div class='w100 h50 centradoInlineXY'>";
	datos += "								<div class='recuadroIcono centradoXY flexWrap w30 h75 error' id='botonTarjetaAmarilla' onclick=\"accionPerdida('Tarjeta Amarilla')\" ontouchstart=\"inicioPulsacion('botonTarjetaAmarilla')\" ontouchend=\"finPulsacion('botonTarjetaAmarilla')\">";
	datos += "									<img src='img/Captura/tarjetaAmarilla.png'>";
	datos += "									<br>";
	datos += "									<label>Tarjeta</label>";
	datos += "								</div>";
	datos += "								<div class='recuadroIcono centradoXY flexWrap w30 h75 error' id='botonTarjetaRoja' onclick=\"accionPerdida('Tarjeta Roja')\" ontouchstart=\"inicioPulsacion('botonTarjetaRoja')\" ontouchend=\"finPulsacion('botonTarjetaRoja')\">";
	datos += "									<img src='img/Captura/tarjetaRoja.png'>";
	datos += "									<br>";
	datos += "									<label>Tarjeta</label>";
	datos += "								</div>";
	datos += "								<div class='recuadroIcono centradoXY flexWrap w30 h75 error' id='botonTarjetaAzul' onclick=\"accionPerdida('Tarjeta Azul')\" ontouchstart=\"inicioPulsacion('botonTarjetaAzul')\" ontouchend=\"finPulsacion('botonTarjetaAzul')\">";
	datos += "									<img src='img/Captura/tarjetaAzul.png'>";
	datos += "									<br>";
	datos += "									<label>Tarjeta</label>";
	datos += "								</div>";
	datos += "							</div>";
	datos += "					</div>";
	datos += "					<div id='botonesErrores' class='w60 h100 centradoXY flexWrap'>";
	datos += "							<div class='w100 h50 spaceAroundXY'>";
	datos += "								<div id='botonFaltaAtaque' class='recuadroIcono centradoXY flexWrap error w45 h75' onclick=\"accionPerdida('Falta ataque')\" ontouchstart=\"inicioPulsacion('botonFaltaAtaque')\" ontouchend=\"finPulsacion('botonFaltaAtaque')\">";
	datos += "									<img class='logoIcono' src='img/Captura/faltaAtaque.png'>";
	datos += "									<br>";
	datos += "									<label class='labelIcono'>Falta en ataque</label>";
	datos += "								</div>";
	datos += "								<div id='botonBalonFuera' class='recuadroIcono centradoXY flexWrap error w45 h75' onclick=\"accionPerdida('Balon fuera')\" ontouchstart=\"inicioPulsacion('botonBalonFuera')\" ontouchend=\"finPulsacion('botonBalonFuera')\">";
	datos += "									<img class='logoIcono' src='img/Captura/fueraBanda.png'>";
	datos += "									<br>";
	datos += "									<label class='labelIcono'>Balón fuera</label>";
	datos += "								</div>";
	datos += "							</div>";
	datos += "							<div class='w100 h50 spaceAroundXY'>";
	datos += "								<div id='botonPasos' class='recuadroIcono centradoXY flexWrap error w30 h75' onclick=\"accionPerdida('Pasos')\" ontouchstart=\"inicioPulsacion('botonPasos')\" ontouchend=\"finPulsacion('botonPasos')\">";
	datos += "									<img class='logoIcono' src='img/Captura/pasos.png'>";
	datos += "									<br>";
	datos += "									<label class='labelIcono'>Pasos</label>";
	datos += "								</div>";
	datos += "								<div id='botonDobles' class='recuadroIcono centradoXY flexWrap error w30 h75' onclick=\"accionPerdida('Dobles')\" ontouchstart=\"inicioPulsacion('botonDobles')\" ontouchend=\"finPulsacion('botonDobles')\">";
	datos += "									<img class='logoIcono' src='img/Captura/dobles.png'>";
	datos += "									<br>";
	datos += "									<label class='labelIcono'>Dobles</label>";
	datos += "								</div>";
	datos += "								<div id='botonInvasion' class='recuadroIcono centradoXY flexWrap error w30 h75' onclick=\"accionPerdida('Invasion')\" ontouchstart=\"inicioPulsacion('botonInvasion')\" ontouchend=\"finPulsacion('botonInvasion')\">";
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
	datos += "							<div class='acierto recuadroIcono centradoXY flexWrap w30 h90 seleccionado' id='botonTiroClasico' onclick=\"tipoTiro('Clasico')\" ontouchstart=\"inicioPulsacion('botonTiroClasico')\" ontouchend=\"finPulsacion('botonTiroClasico')\">";
	datos += "								<img src='img/Captura/tiroClasico.png'><label>Clásico</label>";
	datos += "							</div>";
	datos += "							<div class='acierto recuadroIcono centradoXY flexWrap w30 h90' id='botonTiroCadera' onclick=\"tipoTiro('Cadera')\" ontouchstart=\"inicioPulsacion('botonTiroCadera')\" ontouchend=\"finPulsacion('botonTiroCadera')\">";
	datos += "								<img src='img/Captura/tiroCadera.png'><label>De cadera</label>";
	datos += "							</div>";
	datos += "							<div class='acierto recuadroIcono centradoXY flexWrap w30 h90' id='botonTiroApoyo' onclick=\"tipoTiro('Apoyo')\" ontouchstart=\"inicioPulsacion('botonTiroApoyo')\" ontouchend=\"finPulsacion('botonTiroApoyo')\">";
	datos += "								<img src='img/Captura/tiroApoyo.png'><label>En apoyo</label>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "						<div class='opcionesHD h33 w100 centradoXY'>";
	datos += "							<div class='acierto recuadroIcono centradoXY flexWrap w30 h90' id='botonTiroRosca' onclick=\"tipoTiro('Rosca')\" ontouchstart=\"inicioPulsacion('botonTiroRosca')\" ontouchend=\"finPulsacion('botonTiroRosca')\">";
	datos += "								<img src='img/Captura/tiroRosca.png'><label>De rosca</label>";
	datos += "							</div>";
	datos += "							<div class='acierto recuadroIcono centradoXY flexWrap w30 h90' id='botonTiroVaselina' onclick=\"tipoTiro('Vaselina')\" ontouchstart=\"inicioPulsacion('botonTiroVaselina')\" ontouchend=\"finPulsacion('botonTiroVaselina')\">";
	datos += "								<img src='img/Captura/tiroVaselina.png'><label>Vaselina</label>";
	datos += "							</div>";
	datos += "							<div class='acierto recuadroIcono centradoXY flexWrap w50 h90' id='botonTiroFly' onclick=\"tipoTiro('Fly')\" ontouchstart=\"inicioPulsacion('botonTiroFly')\" ontouchend=\"finPulsacion('botonTiroFly')\">";
	datos += "								<img src='img/Captura/tiroFly.png'><label>Fly</label>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "						<div class='h33 w100 centradoXY'>";
	datos += "							<div class='acierto recuadroIcono centradoXY flexWrap w45 h90' id='botonTiroDesvio' onclick=\"tipoTiro('Desvio')\" ontouchstart=\"inicioPulsacion('botonTiroDesvio')\" ontouchend=\"finPulsacion('botonTiroDesvio')\">";
	datos += "								<img src='img/Captura/blocaje.png'><label>Tiro Desviado</label>";
	datos += "							</div>";
	datos += "							<div class='error recuadroIcono centradoXY flexWrap w45 h90' id='botonTiroBloqueado' onclick=\"tipoTiro('Bloqueado')\" ontouchstart=\"inicioPulsacion('botonTiroBloqueado')\" ontouchend=\"finPulsacion('botonTiroBloqueado')\">";
	datos += "								<img src='img/Captura/blocaje.png'><label>Tiro Bloqueado</label>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "					</div>";
	datos += "					<div id='botonesTipoParada' class='w50 h100 centradoXY flexWrap'>";
	datos += "						<div class='h50 w100 centradoInlineXY'>";
	datos += "							<div class='error recuadroIcono centradoXY flexWrap w45 h90 seleccionado' id='botonPorteroDespeje' onclick=\"tipoParada('Despeje')\">";
	datos += "								<input type='text' name='tipoParada' id='porteroDespeje' style='display: none;'><img src='img/Captura/blocaje.png'><label>Despeje</label>";
	datos += "							</div>";
	datos += "							<div class='error recuadroIcono centradoXY flexWrap w45 h90' id='botonPorteroBlocaje' onclick=\"tipoParada('Blocaje')\">";
	datos += "								<input type='text' name='tipoParada' id='porteroParada' style='display: none;'><img src='img/Captura/parada.png'><label>Blocaje</label>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "						<div class='opcionesHD h50 w100 centradoInlineXY'>";
	datos += "							<div class='error recuadroIcono centradoXY flexWrap w30 h90' id='botonZonaManos' onclick=\"tipoCuerpoParada('Manos')\">";
	datos += "								<input type='text' name='tipoParada' id='porteroMano' style='display: none;'><img src='img/Captura/paradaMano.png'><label>Manos</label>";
	datos += "							</div>";
	datos += "							<div class='error recuadroIcono centradoXY flexWrap w30 h90' id='botonZonaPies' onclick=\"tipoCuerpoParada('Pies')\">";
	datos += "								<input type='text' name='tipoParada' id='porteroPierna' style='display: none;'><img src='img/Captura/paradaPierna.png'><label>Pies</label>";
	datos += "							</div>";
	datos += "							<div class='error recuadroIcono centradoXY flexWrap w30 h90' id='botonZonaCuerpo' onclick=\"tipoCuerpoParada('Cuerpo')\">";
	datos += "								<input type='text' name='tipoParada' id='porteroOtro' style='display: none;'><img src='img/Captura/paradaOtro.png'><label>Cuerpo</label>";
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
	datos += "							<div id='botonPase' class='recuadroIcono centradoXY flexWrap acierto w30 h75' onclick=\"accionPase('Pase')\" ontouchstart=\"inicioPulsacion('botonPase')\" ontouchend=\"finPulsacion('botonPase')\">";
	datos += "								<label>Pase</label>";
	datos += "							</div>";
	datos += "							<div id='botonAsistencia' class='recuadroIcono centradoXY flexWrap acierto w30 h75' onclick=\"accionPase('Asistencia')\" ontouchstart=\"inicioPulsacion('botonAsistencia')\" ontouchend=\"finPulsacion('botonAsistencia')\">";
	datos += "								<label>Asistencia</label>";
	datos += "							</div>";
	datos += "							<div id='botonRoboPase' class='recuadroIcono centradoXY flexWrap error w30 h75' onclick=\"accionRobo('Robo','En el pase')\" ontouchstart=\"inicioPulsacion('botonRoboPase')\" ontouchend=\"finPulsacion('botonRoboPase')\">";
	datos += "								<label>Robo en<br>el pase</label>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "						<div class='h50 w100 centradoInlineXY'>";
	datos += "							<div class='h100 w50'>";
	datos += "								<div class='h20 w90 cartelesBotones'>";
	datos += "									<label><strong>No Forzado</strong></label>";
	datos += "								</div>";
	datos += "								<div class='h80 spaceAroundXY'>";
	datos += "									<div id='botonErrorPaseForzado' class='recuadroIcono centradoXY flexWrap error w45 h90' onclick=\"accionRobo('No Forzado','Error Pase')\" ontouchstart=\"inicioPulsacion('botonErrorPaseForzado')\" ontouchend=\"finPulsacion('botonErrorPaseForzado')\">";
	datos += "										<label><input id='accion' type='text' value='Error Pase Normal' style='display: none;'>Error Pase</label>";
	datos += "									</div>";
	datos += "									<div id='botonErrorRecepcionForzado' class='recuadroIcono centradoXY flexWrap error w45 h90' onclick=\"accionRobo('No Forzado','Error Recepcion')\" ontouchstart=\"inicioPulsacion('botonErrorRecepcionForzado')\" ontouchend=\"finPulsacion('botonErrorRecepcionForzado')\">";
	datos += "										<label><input id='accion' type='text' value='Error Recepc. Normal' style='display: none;'>Error Recepción</label>";
	datos += "									</div>";
	datos += "								</div>";
	datos += "							</div>";
	datos += "							<div class='h100 w50'>";
	datos += "								<div class='h20 w90 cartelesBotones'>";
	datos += "									<label><strong>Por Disuasión</strong></label>";
	datos += "								</div>";
	datos += "								<div class='h80 spaceAroundXY'>";
	datos += "									<div id='botonErrorPaseDisuasion' class='recuadroIcono centradoXY flexWrap error w45 h90' onclick=\"accionRobo('Disuasion','Error Pase')\" ontouchstart=\"inicioPulsacion('botonErrorPaseDisuasion')\" ontouchend=\"finPulsacion('botonErrorPaseDisuasion')\">";
	datos += "										<label><input id='accion' type='text' value='Error Pase Disuasión' style='display: none;'>Error Pase</label>";
	datos += "									</div>";
	datos += "									<div id='botonErrorRecepcionDisuasion' class='recuadroIcono centradoXY flexWrap error w45 h90' onclick=\"accionRobo('Disuasion','Error Recepcion')\" ontouchstart=\"inicioPulsacion('botonErrorRecepcionDisuasion')\" ontouchend=\"finPulsacion('botonErrorRecepcionDisuasion')\">";
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
	datos += "							<div class='recuadroIcono centradoXY flexWrap w75 h75 error' id='botonRobo' onclick=\"accionDefensa('Robo','Robo')\" ontouchstart=\"inicioPulsacion('botonRobo')\" ontouchend=\"finPulsacion('botonRobo')\">";
	datos += "								<img src='img/Captura/roboOk.png'>";
	datos += "								<label>Defensa Roba Balón</label>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "						<div class='h50 w100 centradoXY'>";
	datos += "							<div class='recuadroIcono centradoXY flexWrap w75 h75 acierto' id='botonIntentoRobo' onclick=\"accionDefensa('Robo','Intento')\" ontouchstart=\"inicioPulsacion('botonIntentoRobo')\" ontouchend=\"finPulsacion('botonIntentoRobo')\">";
	datos += "								<img src='img/Captura/roboError.png'>";
	datos += "								<label>Atacante Evita Robo</label>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "					</div>";
	datos += "					<div id='opcionesFalta' class='w60 h100 centradoInlineXY'>";
	datos += "						<div class='w40 h100 centradoXY'>";
	datos += "							<div class='recuadroIcono centradoXY flexWrap w75 h60 error' id='botonGolpe' onclick=\"accionDefensa('Golpe','Golpe')\" ontouchstart=\"inicioPulsacion('botonGolpe')\" ontouchend=\"finPulsacion('botonGolpe')\">";
	datos += "								<img src='img/Captura/golpe.png'>";
	datos += "								<label>Golpe<br>Franco</label>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "						<div class='w60 h100' id='grupoSanciones'>";
	datos += "							<div class='h40 centradoXY'>";
	datos += "								<div class='recuadroIcono centradoXY flexWrap w80 h90 error' id='boton2minutos' onclick=\"accionDefensa('Golpe','Exclusion')\" ontouchstart=\"inicioPulsacion('boton2minutos')\" ontouchend=\"finPulsacion('boton2minutos')\">";
	datos += "									<img src='img/Captura/dosMinutos.png'>";
	datos += "									<br>";
	datos += "									<label>Exclusión</label>";
	datos += "								</div>";
	datos += "							</div>";
	datos += "							<div class='h60 centradoInlineXY'>";
	datos += "								<div class='recuadroIcono centradoXY flexWrap w30 h75 error' id='botonTAmarilla' onclick=\"accionDefensa('Golpe','TAmarilla')\" ontouchstart=\"inicioPulsacion('botonTAmarilla')\" ontouchend=\"finPulsacion('botonTAmarilla')\">";
	datos += "									<img src='img/Captura/tarjetaAmarilla.png'>";
	datos += "									<br>";
	datos += "									<label>Tarjeta</label>";
	datos += "								</div>";
	datos += "								<div class='recuadroIcono centradoXY flexWrap w30 h75 error' id='botonTRoja' onclick=\"accionDefensa('Golpe','TRoja')\" ontouchstart=\"inicioPulsacion('botonTRoja')\" ontouchend=\"finPulsacion('botonTRoja')\">";
	datos += "									<img src='img/Captura/tarjetaRoja.png'>";
	datos += "									<br>";
	datos += "									<label>Tarjeta</label>";
	datos += "								</div>";
	datos += "								<div class='recuadroIcono centradoXY flexWrap w30 h75 error' id='botonTAzul' onclick=\"accionDefensa('Golpe','TAzul')\" ontouchstart=\"inicioPulsacion('botonTAzul')\" ontouchend=\"finPulsacion('botonTAzul')\">";
	datos += "									<img src='img/Captura/tarjetaAzul.png'>";
	datos += "									<br>";
	datos += "									<label>Tarjeta</label>";
	datos += "								</div>";
	datos += "							</div>";
	datos += "						</div>";
	datos += "					</div>";
	datos += "				</div>";
	datos += "			</div>";
	datos += "		</div>";

	datos += "		<div id='lateralDerecho' class='w25 h100'>";
	datos += "			<div id='reloj' class='centradoXY flexWrap'></div>";
	datos += "			<div id='controlReloj' class='centradoXY'>";
	datos += "				<div id='botonesReloj' class='h90 centradoInlineXY' style='display: none;'>";
	datos += "					<div id='botonRelojTiempoMuerto' class='w50 h100 centradoXY flexWrap' onclick=\"pausaReloj('tiempo')\" ontouchstart=\"inicioPulsacion('botonRelojTiempoMuerto')\" ontouchend=\"finPulsacion('botonRelojTiempoMuerto')\"><img class='h80' src=\"img/Captura/tiempo-muerto.png\"><label>Tiempo Muerto</label></div>";
	datos += "					<div id='botonRelojPausa' class='w50 h100 centradoXY flexWrap' onclick=\"pausaReloj('pausa')\" ontouchstart=\"inicioPulsacion('botonRelojPausa')\" ontouchend=\"finPulsacion('botonRelojPausa')\"><img class='h80' src=\"img/Captura/pausa.png\"><label>Pausa</label></div>";
	datos += "				</div>";
	datos += "				<div id='botonTiempoMuerto' class='w100 spaceAroundXY' style='display: none;'>";
	datos += "					<div class='w40 centradoXY botonTM' id='botonTMLocal' onclick=\"tiempoMuerto('local')\" ontouchstart=\"inicioPulsacion('botonTMLocal')\" ontouchend=\"finPulsacion('botonTMLocal')\">";
	datos += "						<label class='textoLocal'><big>L</big>ocal</label>";
	datos += "					</div>";
	datos += "		<div class='botonTM botonCancelar' id='botonTMCancelar' onclick=\"tiempoMuerto('cancelar')\" ontouchstart=\"inicioPulsacion('botonTMCancelar')\" ontouchend=\"finPulsacion('botonTMCancelar')\" style=\"display: none;\">";
	datos += "						<label><big>C</big>ancelar</label>";
	datos += "					</div>";
	datos += "					<div class='w40 centradoXY botonTM' id='botonTMVisitante' onclick=\"tiempoMuerto('visitante')\" ontouchstart=\"inicioPulsacion('botonTMVisitante')\" ontouchend=\"finPulsacion('botonTMVisitante')\">";
	datos += "						<label class='textoVisitante'><big>V</big>isitante</label>";
	datos += "					</div>";
	datos += "				</div>";
	datos += "				<div id='botonInicioReloj' class='h90 centradoXY flexWrap' onclick=\"inicioReloj()\" ontouchstart=\"inicioPulsacion('botonInicioReloj')\" ontouchend=\"finPulsacion('botonInicioReloj')\">";
	datos += "					<img class='h80' src='img/Captura/silbato.png'><label>Iniciar Reloj</label>";
	datos += "				</div>";
	datos += "			</div>";
	datos += "			<div id='resumen' class='h70 w100 centradoXY flexWrap'>";
	datos += "				<div id='verSeleccion' class='h90 w100'><div id='imprimirSeleccion' class='h100' style='display: none;'></div></div>";
	datos += "				<div id='recuadroOpciones' class='h10 w100 spaceAroundXY'>";
	datos += "					<img id='logoConfiguracion' src='img/Menu/completo.png' class='h70' alt='HD' onclick=\"cambiarModo()\">";
	datos += "					<img id='logoConfiguracion' src='img/Menu/configuracion.png' class='h70' alt='Opciones'>";
	datos += "					<img id='botonVolverMenu' class='h80' src='img/Menu/Logo BigDT.png' onclick=\"transicionPartido('bodyCaptura','bodyMenu')\" ontouchstart=\"inicioPulsacion('botonVolverMenu')\" ontouchend=\"finPulsacion('botonVolverMenu');transicionPartido('bodyCaptura','bodyMenu')\">";
	datos += "				</div>";
	datos += "			</div>";
	datos += "		</div>";
	datos += "	</div>";

	// Publicar datos
	$("#bodyCaptura").html(datos);
	$("#bodyCaptura").show(datos);

	/////////// Código para que publique la actualización del marcador ////////////////////////////////////
	// Cada x tiempo, mientras se está en juego, hace una llamada a la BD para comproabr que todos los datos están ok
	// Ajax inicial con los datos

	// Se crea una variable que guarda el tiempo de juego
	//Comprueba que el tiempo de juego no se ha acabado
		// Si se ha acabado, no hace nada
		// Si no se ha acabado ==> ajax para comprobar el resultado y publicarlo
	//Hacer esto cada ¿30 segundos? ¿más? ¿menos?
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	//var prueba = "";
	//$("#cajaNumeros").html(prueba);
}

	function cambiarModo() {
		if (leerCookie("ModoDatos") == "Sencillo") {
			document.getElementById("logoConfiguracion").src = "img/Menu/completo.png";
			$(".opcionesHD").show();
			crearCookie("ModoDatos","Completo");
		}else {
			document.getElementById("logoConfiguracion").src = "img/Menu/simple.png";
			$(".opcionesHD").hide();
			crearCookie("ModoDatos","Sencillo");
		}
	};


/* Pantalla de opciones inicial */
function ventanaInicial() {
	/* Asignar pantalla inicial*/
	$('#pantallaTiro').hide();
	$('#opcionesTiro').hide();
	$('#opcionesAtaque').hide();
	$('#opcionesDefensa').hide();
	$('#opcionesJugador').hide();
	$('#opcionesDefecto').show();
	$('#pantallaEquipos').show();

	/* Eliminar jugador seleccionado */
	$('.jugador').removeClass('seleccionado');
	$('.jugador').removeClass('seleccionadoAntiguo');
	
	/* Olvidar jugador y equipo seleccionado */
	eliminarCookie("equipoActivo");
	eliminarCookie("jugadorActivo");
	eliminarCookie("equipoAntiguo");
	eliminarCookie("jugadorAntiguo");
};

/* Función para mostrar los tiempos muertos restantes a cada equipo */
function contadorTM(equipo) {
	/* Ver en el servidor la información actualizada */

	if (equipo) {
		// Leer cuántos hay ahora en cada equipo
		var local = leerCookie("tiempoMuertoLocal");
		var visitante = leerCookie("tiempoMuertoVisitante");

		if (equipo == "local" && local == "0" || equipo == "visitante" && visitante == "0") {
			alert("AVISO: El equipo "+equipo+" no puede solicitar más tiempos muertos");
		}else {
			// Restar 
			if (equipo == "local") {
				local = parseInt(local) - 1;
			}else {
				visitante = parseInt(visitante) - 1;
			}
		}
	}else {
		// Contador local
		var local = 3;
		// Contador visitante
		var visitante = 3;
	}

	crearCookie("tiempoMuertoLocal",local);
	crearCookie("tiempoMuertoVisitante",visitante);

	var imprimirL = "";
	var imprimirV = "";

	for (var i = 0; i < local; i++) {
		imprimirL += "<img class='h100' src='img/Captura/contadorTM.png'>";
	}

	for (var i = 0; i < visitante; i++) {
		imprimirV += "<img class='h100' src='img/Captura/contadorTM.png'>";
	}

	$("#tiempoMuertoLocal").html(imprimirL);
	$("#tiempoMuertoVisitante").html(imprimirV);
};

/* Función para determinar al jugador activo */
function jugadorSeleccionado(equipo,dorsal) {
	if (equipo == "local") {
		var equipo = "L";
	}else {
		var equipo = "V";
	}

	/* 1. Asignar equipo y jugador seleccionado */
		var jugadorClic = '#jugador'+equipo+dorsal;

	/* 0. Asignar jugador defensor */
	if (leerCookie("Seleccionar defensa") == "Si") {
		if (leerCookie("disuasion")) {
			var tipo = "Disuasion";
			var accion = leerCookie("disuasion");
		}else {
			var tipo = "Robo";
			var accion = "En el pase";
		}
		//jugadores que hacen el pase
		var jugadorEnviaPase = leerCookie("jugadorEnviaPase");
		var equipoEnviaPase = leerCookie("equipoEnviaPase");
		var jugadorRecibePase = leerCookie("jugadorRecibePase");

		//guardar nuevo jugador activo
		crearCookie("jugadorActivo",dorsal);
		crearCookie("equipoActivo",equipo);

		//eliminar datos antiguos			
		eliminarCookie("equipoAntiguo");
		eliminarCookie("jugadorAntiguo");
		eliminarCookie("jugadorEnviaPase");
		eliminarCookie("jugadorRecibePase");
		eliminarCookie("equipoEnviaPase");
		eliminarCookie("Seleccionar defensa");
		eliminarCookie("disuasion");

		//Cambiar de pantalla
		$('#opcionesDefecto').hide();
		$('#opcionesJugador').show();

		//Crear datos
		registroDatos(tipo,jugadorEnviaPase,equipoEnviaPase,jugadorRecibePase,equipoEnviaPase,dorsal,equipo,accion);
	}else {
		/* 2. Tomar decisiones según el jugador seleccionado */
			if (leerCookie("equipoActivo")) { // No había ningún jugador seleccionado (inicio de jugada)
				if (leerCookie("equipoActivo") === equipo) { // Si equipo anterior y equipo actual son iguales ==> pantalla de pases (acciones de ataque)
					$('#opcionesDefecto').hide();
					$('#opcionesJugador').hide();
					$('#opcionesDefensa').hide();
					$('#opcionesAtaque').show();
				}else { // Si equipo anterior y equipo actual son distintos ==> pantalla de acción defensiva
					$('#opcionesDefecto').hide();
					$('#opcionesJugador').hide();
					$('#opcionesAtaque').hide();
					$('#opcionesDefensa').show();
				}
			}else { // Si ya se había seleccionado un jugador anteriormente (continuación de jugada)
				$('#opcionesDefecto').hide();
				$('#opcionesJugador').show();
			}
			
			/* Guardar jugador anterior */
			crearCookie("jugadorAntiguo",leerCookie("jugadorActivo"));
			crearCookie("equipoAntiguo",leerCookie("equipoActivo"));
			/* Guardar jugador y equipo seleccionado en cookie */
			crearCookie("jugadorActivo",dorsal);
			crearCookie("equipoActivo",equipo);
	}
	// Cambiar colores de iconos de jugadores seleccionado y ya no seleccionado
	$('.jugador').removeClass('seleccionado');
	$(jugadorClic).addClass('seleccionado');
	// Cambiar color a jugador antes seleccionado
	var jugadorAntiguo = '#jugador'+leerCookie("equipoAntiguo")+leerCookie("jugadorAntiguo");
	$('.jugador').removeClass('seleccionadoAntiguo');
	$(jugadorAntiguo).addClass('seleccionadoAntiguo');
};

/* Funciones de TIRO */
/* Si se le da al botón de tiro se abre la pantalla de tiro (se guarda dorsal y equipo)*/
function abrirVentanaTiro() {
	//Establecer valores por defecto
	crearCookie("Tipo tiro","Clasico");
	crearCookie("Tipo parada","Despeje");
	$("#botonPorteroBlocaje").removeClass("seleccionado");
	$("#botonPorteroDespeje").addClass("seleccionado");
	$("#botonZonaManos").removeClass("seleccionado");
	$("#botonZonaPies").removeClass("seleccionado");
	$("#botonZonaCuerpo").removeClass("seleccionado");
	eliminarCookie("Zona Parada");

	//Cambiar pantallas
	$('#pantallaEquipos').hide();
	$('#pantallaTiro').show();
	$('#opcionesDefecto').hide();
	$('#opcionesJugador').hide();
	$('#opcionesTiro').show();
};

function tipoTiro(tipo) {
	crearCookie("Tipo tiro",tipo);
	botonTipoSeleccionado("Tiro",tipo);
};

function botonPoste(evento) {
	switch (evento) {
		case "palo": //1 clic
			crearCookie("Tiro al palo", "Si");
			break;

		case "dentro": //doble clic
			// Ver tirador
			var jugador = leerCookie("jugadorActivo");
			var equipo = leerCookie("equipoActivo");
			registroDatos("Tiro al palo",equipo,jugador)

			// Olvidar jugada anterior
			eliminarCookie("jugadorAntiguo");
			eliminarCookie("jugadorActivo");
			eliminarCookie("equipoAntiguo");
			eliminarCookie("equipoActivo");

			// Eliminar cookie de palo
			eliminarCookie("Tiro al palo");

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
}

/* Opciones de parada */
function accionParada() {
	var tipoParada = leerCookie("Tipo parada"); //despeje, blocaje
	var zonaParada = leerCookie("Zona Parada"); //manos, pies, cuerpo

	//////////////////////////////// Hay que identificar qué portero es el que está haciendo la parada. Eso se hace con la localización de jugadores y viendo quién está en la portería ////////////////////
	var portero = "1";
	var equipoAtq = leerCookie("equipoActivo");
	var tirador = leerCookie("jugadorActivo");
	var pasador = leerCookie("jugadorAntiguo");
	if (equipoAtq == "L") {
		var equipoDef = "V";
	}else {
		var equipoDef = "L";
	}

	registroDatos("Parada",tirador,equipoAtq,pasador,equipoDef,portero,tipoParada,zonaParada);

	//Eliminar jugador seleccionado
	$(".jugador").removeClass("seleccionado");
	$(".jugador").removeClass("seleccionadoAntiguo");

	//Cambio de pantalla
	$("#pantallaTiro").hide();
	$("#pantallaEquipos").show();
	$("#opcionesTiro").hide();
	if (tipoParada == "Despeje") {
		$("#opcionesDefecto").show();
		eliminarCookie("jugadorActivo");
		eliminarCookie("equipoActivo");
		eliminarCookie("jugadorAntiguo");
		eliminarCookie("equipoAntiguo");
	}else{
		$("#opcionesJugador").show();
		crearCookie("jugadorActivo",portero);
		crearCookie("equipoActivo",equipoDef);
		eliminarCookie("jugadorAntiguo");
		eliminarCookie("equipoAntiguo");
		var seleccionarPortero = "#jugador"+equipoDef+portero;
		$(seleccionarPortero).addClass("seleccionado");
	}
};

function tipoParada(tipo) {
	crearCookie("Tipo parada",tipo);
	botonTipoSeleccionado("Parada",tipo);

	tipoCuerpoParada("Manos");
};

function tipoCuerpoParada(tipo) {
	crearCookie("Zona Parada",tipo);
	botonTipoSeleccionado("ZonaParada",tipo);
};


/* Funciones pérdidas de balón */
function accionPerdida(accion) {
	registroDatos("Perdida",leerCookie("jugadorActivo"),leerCookie("equipoActivo"),accion);
	ventanaInicial();
};



/* Función para cambiar marcador cuando hay un gol */
function accionGol(equipoActual, goles) {
	/* Tomar valores o darle valores por defecto */
	/////////////////////////////////////// Tomar el valor inicial del marcador del servidor ////////////////////////////////////////
	if (typeof equipoActual !== 'undefined') { // Ver el equipo con el que se trabaja
		var equipo = equipoActual;
	}else {
		var equipo = leerCookie("equipoActivo");
	}

	if (typeof goles !== 'undefined') { // Ver cuántos goles hay en el marcador
		var nuevoMarcador = goles; //Asignar valor manualmente
	}else {
		if (equipo === "L") { // Ver marcador actual
			var marcador = document.getElementById("marcadorL").value; // Asignar valor actual del marcador
		}else {
			var marcador = document.getElementById("marcadorV").value; // Asignar valor actual del marcador
		}
		/* Sumar 1 gol al valor del marcador */
		var nuevoMarcador = parseInt(marcador) + 1;
	}
	var marcadorLabel = "<label>"+nuevoMarcador+"</label>";

	/* Imprimir nuevo valor en el marcador */
	if (equipo == "L") {
		document.getElementById("marcadorL").value = nuevoMarcador; // Cambiar value
		document.getElementById("imprimirMarcadorCapturaL").innerHTML = marcadorLabel;
	}else {
		document.getElementById("marcadorV").value = nuevoMarcador; // Cambiar value
		document.getElementById("imprimirMarcadorCapturaV").innerHTML = marcadorLabel;
	}


	/* Imprimir registro en marcador lateral si está ya iniciado el juego */
	if (typeof equipoActual == 'undefined') {
		/* Ver qué jugador ha marcado */
		var jugador = leerCookie("jugadorActivo");

		/* Ver si es jugada individual o viene de asistencia */
		if (typeof leerCookie("Asistencia") !== 'undefined') {
			var jugadorAsistencia = leerCookie("jugadorAntiguo");
			var equipoAsistencia = leerCookie("equipoAntiguo");
			registroDatos("Gol",jugador,equipo,jugadorAsistencia,equipoAsistencia);
		}else {
			registroDatos("Gol",jugador,equipo);
		}
	}
};


function tipoPase(tipo) {
	crearCookie("Tipo pase",tipo);
	botonTipoSeleccionado("Pase",tipo);
};
	
function accionPase(tipo) {
	if (tipo === 'Pase') {
		registroDatos("Pase",leerCookie("jugadorActivo"), leerCookie("equipoActivo"),leerCookie("jugadorAntiguo"), leerCookie("equipoAntiguo"), leerCookie("Tipo pase"));
		botonVolver();
	}else if (tipo === 'Asistencia') {
		crearCookie("Asistencia","Si");
		abrirVentanaTiro();
	}

	// Asignar pase clásico por defecto para la siguiente jugada
	crearCookie("Tipo pase","Clasico");
	botonTipoSeleccionado("Pase","Clasico");
};

function botonTipoSeleccionado(tipo,nombre) {
	switch (tipo) {
		case "Pase":
			var array = ['Clasico','Lateral','Cadera','Picado','Recurso','Suspension'];
			var nombreTipo = "#botonPase";
			break;
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
	var jugadorEnviaPase = leerCookie("jugadorAntiguo");
	var equipoEnviaPase = leerCookie("equipoAntiguo");
	//ver jugador que recibe el pase
	var jugadorRecibePase = leerCookie("jugadorActivo");
	var equipoRecibePase = leerCookie("equipoActivo");

	//Cambiar pantalla para elegir al jugador que hace el robo de balón
	$(".jugador").removeClass("seleccionado");
	$("#opcionesAtaque").hide();
	$("#opcionesDefecto").show();
	switch (accion) {
		case "Robo":
			crearCookie("Seleccionar defensa","Si");
			crearCookie("jugadorEnviaPase",jugadorEnviaPase);
			crearCookie("jugadorRecibePase",jugadorRecibePase);
			crearCookie("equipoEnviaPase",equipoEnviaPase);
			break;
		case "No Forzado":
			registroDatos("No Forzado",jugadorEnviaPase,equipoEnviaPase,jugadorRecibePase,equipoRecibePase,tipo);
			break;
		case "Disuasion":
			crearCookie("Seleccionar defensa","Si");
			crearCookie("jugadorEnviaPase",jugadorEnviaPase);
			crearCookie("jugadorRecibePase",jugadorRecibePase);
			crearCookie("equipoEnviaPase",equipoEnviaPase);
			crearCookie("disuasion",tipo);
			break;
	}
};

/* Función de defensa */
/* Se determina a qué botones se le ha dado y se envía al servidor*/
function accionDefensa(categoria,tipo) {
	var jugadorAtq = leerCookie("jugadorActivo");
	var equipoAtq = leerCookie("equipoActivo");
	var jugadorDef = leerCookie("jugadorAntiguo");
	var equipoDef = leerCookie("equipoAntiguo");

	registroDatos(tipo,jugadorAtq,equipoAtq,jugadorDef,equipoDef);

	if (tipo == "Exclusion") {
		contadorExclusion(jugadorAtq,equipoAtq);
	}
	
	switch (categoria) {
		case "Robo":
			switch (tipo) {
				case "Robo":
					$('#opcionesDefecto').hide(); //////////////////////////// ESTO NO FUNCIONAAAAAAA
					$('#opcionesJugador').show();
					break;
				case "Intento":
					crearCookie("jugadorActivo", jugadorDef);
					crearCookie("equipoActivo", equipoDef);
					eliminarCookie("jugadorAntiguo");
					eliminarCookie("equipoAntiguo");

					jugadorSeleccionado(equipoDef,jugadorDef);
					$('#opcionesAtaque').hide();
					$('#opcionesJugador').show();
					break;
			}
		case "Golpe":
			eliminarCookie("jugadorActivo");
			eliminarCookie("equipoActivo");
			eliminarCookie("jugadorAntiguo");
			eliminarCookie("equipoAntiguo");
			$('.jugador').removeClass('seleccionado');
			$('#opcionesDefensa').hide();
			$('#opcionesDefecto').show();
			break;
	}
};

/* Función deshacer (al darle al botón deshacer, se vuelve al estado básico del último jugador seleccionado) */
function botonVolver() {
	$('#pantallaTiro').hide();
	$('#opcionesTiro').hide();
	$('#opcionesDefensa').hide();
	$('#opcionesAtaque').hide();
	$('#pantallaEquipos').show();
	$('#opcionesJugador').show();
};

/* Función de mostrar listado de acciones en el lateral (¿se guarda en local o se ve en el servidor?*/
function registroDatos(accion, dorsal, equipo, dorsalAnt, equipoAnt, opcion1,opcion2,opcion3) {
	// Obtener datos de Local Storage
	if (sessionStorage.getItem('arrayRegistros')) {
		var arrayAccion = sessionStorage.getItem('arrayRegistros');
		arrayAccion = JSON.parse(arrayAccion);
	} else {
		var arrayAccion = Array();
	}

	if (typeof /*localStorage.getItem("minuto")*/ leerCookie("minuto") !== 'undefined') {
		var minuto = /*localStorage.getItem("minuto")*/ leerCookie("minuto");
	}else {
		var minuto = "--";
	}
	if (typeof /*localStorage.getItem("segundo")*/ leerCookie("segundo") !== 'undefined') {
		var segundo = /*localStorage.getItem("segundo")*/ leerCookie("segundo");
	}else {
		var segundo = "--";
	}

	if (typeof leerCookie("Asistencia") !== 'undefined') {
		if (accion == "Parada") {
			//Incluir datos de parada que viene de una asistencia. No sale en pantalla, pero sí se envía al servidor
		}else{
			var accion = "Asistencia";
		}
	}
	
	if (accion == "Parada") {
		if (typeof leerCookie("Zona Parada") !== 'undefined') {
			var opcion3 = leerCookie("Zona Parada");
		}else {
			var opcion3 = "";
		}
	}
	
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
			case "Mitad":
				imprimir += '<br>';
				imprimir += '====== DESCANSO ======';
				imprimir += '<br>';
				break;
			case "Final":
				imprimir += '======= FINAL =======';
				imprimir += '<br>';
				break;
			case "Pase":
				imprimir += arrayAccion[i][2]+' <small><small><small>'+arrayAccion[i][7]+'</small></small></small>&nbspde&nbsp<span class="'+clase+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span>a&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
				break;
			case "Parada":
				if (leerCookie("Tiro al palo") == "Si") {
					imprimir += 'Palo y '+arrayAccion[i][8]+'</label> <small><small><small>'+arrayAccion[i][9]+'</small></small></small> <label>de</label>&nbsp<span class="'+clase+'">'+arrayAccion[i][7]+'<sup>'+arrayAccion[i][6]+'</sup></span> <label>a</label>&nbsp<span class="'+clase2+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
				}else {
					imprimir += arrayAccion[i][8]+'</label> <small><small><small>'+arrayAccion[i][9]+'</small></small></small> <label>de</label>&nbsp<span class="'+clase+'">'+arrayAccion[i][7]+'<sup>'+arrayAccion[i][6]+'</sup></span> <label>a</label>&nbsp<span class="'+clase2+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
				}
				break;
			case "Gol":
				if (leerCookie("Tiro al palo") == "Si") {
					imprimir += 'Tiro al palo y&nbsp<label class="textoGol">Gol</label>&nbspde&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
					eliminarCookie("Tiro al palo");
				}else {
					imprimir += ' <label class="textoGol">'+arrayAccion[i][2]+'</label>&nbspde&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
				}
				break;
			case "Asistencia":
				imprimir += ' <label class="textoGol">Gol</label>&nbspde&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>a pase de&nbsp<span class="'+clase+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
				eliminarCookie("Asistencia");		
				break;
			case "Perdida":
				if (arrayAccion[i][5][0] === "T") {
					switch (arrayAccion[i][5]) {
						case "Tarjeta Amarilla":
							aplicarSancion("TAmarilla",arrayAccion[i][3],arrayAccion[i][4]);
							imprimir += '<span class="tarjeta" id="amarilla"></span> '+arrayAccion[i][5]+' a&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
							break;
						case "Tarjeta Roja":
							aplicarSancion("TRoja",arrayAccion[i][3],arrayAccion[i][4]);
							imprimir += '<span class="tarjeta" id="roja"></span> '+arrayAccion[i][5]+' a&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
							break;
						case "Tarjeta Azul":
							aplicarSancion("TAzul",arrayAccion[i][3],arrayAccion[i][4]);
							imprimir += '<span class="tarjeta" id="azul"></span> '+arrayAccion[i][5]+' a&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
							break;
					}
				}else {
					imprimir += arrayAccion[i][5]+' de&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
				}
				break;
			case "Robo":
				if (arrayAccion[i][9] == "En el pase") {
					imprimir += '<span class="'+clase+'">'+arrayAccion[i][7]+'<sup>'+arrayAccion[i][8]+'</sup></span>Roba Pase de&nbsp<span class="'+clase2+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
				}else {
					imprimir += '<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>Roba Balón a&nbsp<span class="'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
				}
				break;
			case "No Forzado":
				if (arrayAccion[i][7] == "Error Pase") {
					imprimir += '<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span> Error de Pase a&nbsp<span class="'+clase+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
				}else {
					imprimir += '<span class="'+clase+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span>No Recep Pase de&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
				}
				break;
			case "Disuasion":
				if (arrayAccion[i][9] == "Error Pase") {
					imprimir += '<span class="'+clase+'">'+arrayAccion[i][7]+'<sup>'+arrayAccion[i][8]+'</sup></span>Disuade Pase de&nbsp<span class="'+clase2+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
				}else {
					imprimir += '<span class="'+clase+'">'+arrayAccion[i][7]+'<sup>'+arrayAccion[i][8]+'</sup></span>Disuade Recep de&nbsp<span class="'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
				}
				break;
			case "Intento":
				imprimir += '<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>Falla Robo a&nbsp<span class="'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
				break;
			case "Golpe":
				imprimir += arrayAccion[i][2]+' de&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>&nbspa&nbsp<span class="'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
				break;
			case "Exclusion":
				aplicarSancion("Exclusion",arrayAccion[i][3],arrayAccion[i][4]);
				imprimir += '<label style="color:red">2min</label>&nbspa&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>&nbsp(Golpe a&nbsp<span class="'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span>)</label><br>';
				break;
			case "TAmarilla":
				var jugadorSacado = "#jugador"+arrayAccion[i][4]+arrayAccion[i][3];
				$(jugadorSacado).removeClass('seleccionado');
				$(jugadorSacado).addClass('jugadorFuera');
				aplicarSancion("TAmarilla",arrayAccion[i][3],arrayAccion[i][4]);
				imprimir += '<span class="tarjeta" id="amarilla"></span> a&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>por Golpe a&nbsp<span class="'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
				break;
			case "TRoja":
				aplicarSancion("TRoja",arrayAccion[i][3],arrayAccion[i][4]);
				imprimir += '<span class="tarjeta" id="roja"></span> a&nbsp<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>por Golpe a&nbsp<span class="'+clase2+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
				break;
			case "TAzul":
				aplicarSancion("TAzul",arrayAccion[i][3],arrayAccion[i][4]);
				imprimir += '<span class="tarjeta" id="azul"></span> a <span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span>por Golpe a <span class="'+clase+'">'+arrayAccion[i][5]+'<sup>'+arrayAccion[i][6]+'</sup></span></label><br>';
				break;
			case "Tiempo Muerto":
				imprimir += 'Tiempo Muerto&nbsp<span class="'+clase+'">'+arrayAccion[i][3].charAt(0).toUpperCase() + arrayAccion[i][3].slice(1)+'</span></label><br>';
				break;
			case "Tiro al palo":
				imprimir += 'Tiro al palo de<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
				break;
			case "Fuera Porteria":
				imprimir += 'Tiro fuera portería de<span class="'+clase+'">'+arrayAccion[i][3]+'<sup>'+arrayAccion[i][4]+'</sup></span></label><br>';
				break;
		}
	}
	$('#imprimirSeleccion').html(imprimir);
	$('#imprimirSeleccion').show();

	// Guardar datos en Local Storage
	sessionStorage.setItem('arrayRegistros', JSON.stringify(arrayAccion));

	function aplicarSancion(sancion,dorsal,equipo) {
		var imprimir = '';
	};

	/* INCLUIR LECTURA EN EL SERVIDOR */
	//////////////////////////////////////////////////////////////////////////////////////
	/*$.ajax ({
		url: "php/lecturaBM.php",
        type: 'POST',
        data: {
        	IDPartido: leerCookie("partidoActual"),
			minuto: arrayLectura[0],
			segundo: arrayLectura[1],
			accion: arrayLectura[2],
			dorsal: arrayLectura[3],
			equipo: idEquipo(arrayLectura[4]),
			dorsalAnt: arrayLectura[5],
			equipoAnt: idEquipo(arrayLectura[6]),
			opcion1: arrayLectura[7],
			opcion2: arrayLectura[8],
			opcion3: arrayLectura[9]
        },

        success: function(res){
        	//var js= JSON.parse(res);

        }
	});*/
	function idEquipo(equipo) {
		switch (equipo) {
			case "L":
				var equipo = leerCookie("IDLocal");
				break;
			case "V":
				var equipo = leerCookie("IDVisitante");
				break;
		}
		return equipo;
	};
};

/* Aplicar temporizador por Exclusión */
function contadorExclusion(dorsal, equipo) {
	//Comprobar en el servidor los jugadores que tienen sancion en vigor
	/////////////////////////////////////////////////////////////////////////////////////////

	var jugador = equipo+dorsal;
	var etiquetaExclusionJugador = '#exclusion'+jugador;
	var etiquetaNumeroExclusiones = '#sanciones'+jugador;

	// Ver el tiempo o crearlo
	if (!leerCookie(jugador+'min')) {
		crearCookie(jugador+'min',2);
		crearCookie(jugador+'sec',0);
	}
	
	var minuto = leerCookie(jugador+'min');
	var segundos = leerCookie(jugador+'sec');

	if (segundos == 0) {
		segundos = "00";
	}else {
		segundos = segundos.toString();
	}

	var jugadorInactivo = "#jugador"+jugador;
	$(jugadorInactivo).addClass("jugadorFuera");

	//$(etiquetaExclusionJugador).removeClass("invisible");
	var imprimir = "<label><sup>"+minuto.toString()+":"+segundos+"</sup></label>";
	$(etiquetaExclusionJugador).html(imprimir);

	// Crear cookie con número de exclusiones
	var nombre = "numeroExclusiones"+jugador;
	if (!leerCookie(nombre)) {
		var numero = 1;
		crearCookie(nombre,numero);
	}else {
		var numero = parseInt(leerCookie(nombre)) + 1;
		crearCookie(nombre,numero);
	}

	// Incluir número de exclusiones
	var imprimirExclusiones = "";
	for (var i = 0; i < numero; i++) {
		imprimirExclusiones += "<img src='img/Captura/2minutos.png'>";
	}
	$(etiquetaNumeroExclusiones).html(imprimirExclusiones);
};


/* Función del reloj (cuenta atrás, tiempo muerto, parado por árbitro, edicion del tiempo,...*/
function relojInicial() {
	/* INCLUIR LECTURA EN EL SERVIDOR */

	// Si no hay datos en el servidor se coge el dato en local
	//var minutos = localStorage.getItem("minuto");
	//var segundos = localStorage.getItem("segundo");
	var minutos = leerCookie("minuto");
	var segundos = leerCookie("segundo");

	if (typeof minutos !== 'undefined' && typeof segundos !== 'undefined') {
		imprimirReloj(minutos, segundos);
	}else {
		//localStorage.setItem("minuto","00");
		//localStorage.setItem("segundo","00");
		crearCookie("minuto","00");
		crearCookie("segundo","00");
		imprimirReloj("00","00");
	}
};

function inicioReloj() {
	/* Cambiar botones */
	$('#botonInicioReloj').fadeOut('slow');
	$('#botonesReloj').delay(500).fadeIn('slow');

	if (/*localStorage.getItem("minuto")*/ leerCookie("minuto")) {
		var minutos = /*localStorage.getItem("minuto")*/ leerCookie("minuto");
		var segundos = /*localStorage.getItem("segundo")*/ leerCookie("segundo");
	}else {
		var minutos = '00';
		var segundos = '00';
		crearCookie("minuto", "00");
		crearCookie("segundo", "00");
		//localStorage.setItem("minuto","00");
		//localStorage.setItem("segundo","00");
	}

	if (!leerCookie("periodo")) {
		crearCookie("periodo","1");
	}

	imprimirReloj(minutos,segundos);

	crearCookie("tiempo","Si");

	eliminarCookie("tiempoParado");

	setTimeout(updateClock(),1000);

	//////////////////////////////////////////////////////////////////////////////////////////
	/////////////// INCLUIR CONTADOR DE EXCLUSIONES //////////////////////////////////////////
	// mirar todas las cookies con finalizacion min o sec y se le va restando 1 segundo //////
};

function pausaReloj(tipoPausa) {
	$("#botonesReloj").hide();
	if (tipoPausa === "tiempo"){
		// Mostrar pantalla de elección de equipo
		$("#botonInicioReloj").hide();
		$("#botonTiempoMuerto").show();
			if (leerCookie("tiempoMuertoLocal") == "0") {
				$("#botonTMLocal").hide();
				$("#botonTMCancelar").show();
			}
			if (leerCookie("tiempoMuertoVisitante") == "0") {
				$("#botonTMVisitante").hide();
				$("#botonTMCancelar").show();
			}
		// Registrar pausa
		crearCookie("tiempoParado","Tiempo Muerto");
	}else if (tipoPausa === "pausa") {
		crearCookie("tiempoParado","Pausa juego");
		$('#botonInicioReloj').show();
	}

	if (leerCookie("tiempo") === "Si") {
		crearCookie("tiempo","No");
	}else if (leerCookie("tiempo") === "No"){
		crearCookie("tiempo","Si");
		setTimeout(updateClock(),1000);
	}
};

function tiempoMuerto(equipo) {
	if (equipo != "cancelar") {
		registroDatos("Tiempo Muerto",equipo,equipo.charAt(0).toUpperCase());
		// Marcar en contadores de tiempos muertos
		contadorTM(equipo);
	}
	$("#botonTiempoMuerto").hide();
	$("#botonInicioReloj").show();
};

function updateClock() {
	//Convertir valores a Int
	var minutosInt = parseInt(/*localStorage.getItem("minuto")*/ leerCookie("minuto"));
	var segundosInt = parseInt(/*localStorage.getItem("segundo")*/ leerCookie("segundo"));

	if (leerCookie("tiempo") === "Si") {
		if (segundosInt === 59) {
			minutosInt += 1;
			segundosInt = 0;
		}else{
			segundosInt += 1;
		}

		var minutosOk = convertirString(minutosInt);
		var segundosOk = convertirString(segundosInt);
		
		imprimirReloj(minutosOk,segundosOk);

		crearCookie("minuto",convertirString(minutosInt));
		crearCookie("segundo",convertirString(segundosInt));
		//localStorage.setItem("minuto",convertirString(minutosInt));
		//localStorage.setItem("segundo",convertirString(segundosInt));

		relojExclusiones(); // Hacer funcionar reloj de exclusiones

		if (minutosInt === 30 && segundosInt === 0) {
			var minutosOk = convertirString(minutosInt);
			var segundosOk = convertirString(segundosInt);
			imprimirReloj(minutosOk,segundosOk);
			crearCookie("minuto","00");
			crearCookie("segundo","00");
			//localStorage.setItem("minuto","00");
			//localStorage.setItem("segundo","00");
			if (leerCookie("periodo") == "1") {
				crearCookie("periodo","2");
				var mensaje = " la primera parte";
				var mensajeReloj = "Final 1ª parte";
				registroDatos("Mitad");
			}else {
				eliminarCookie("periodo");
				var mensaje = "l partido";
				var mensajeReloj = "Final del partido";
				registroDatos("Final");
			}
			$("#periodoReloj").html(mensajeReloj); //Impresión en reloj
			$('#botonesReloj').hide();
			$('#botonInicioReloj').show();

			// Guardar datos en Local Storage
			sessionStorage.setItem('arrayRegistros', JSON.stringify(arrayAccion));

			//Ventana emergente informando del final del tiempo
			alert('Final de'+mensaje);
		} else {
			setTimeout(updateClock,1000);
		}
	} else if (leerCookie("tiempo") === "No") {
		var minutos = convertirString(minutosInt);
		var segundos = convertirString(segundosInt);
		imprimirReloj(minutos,segundos);

		// Ver si es pausa o tiempo muerto
		if (leerCookie("tiempoParado") === "Tiempo Muerto") {
			$('#botonesReloj').hide();
			$('#botonTiempoMuerto').show();
		} else if (leerCookie("tiempoParado") === "Pausa juego") {
			$('#botonesReloj').hide();
			$('#botonTiempoMuerto').hide();
			$('#botonInicioReloj').show();
		}
	} else {
		//alert('Recuerda seleccionar al jugador que inicia el balón para iniciar el tiempo');
		var minutos = convertirString(minutosInt);
		var segundos = convertirString(segundosInt);
		imprimirReloj(minutos,segundos);
		$('#botonesReloj').hide();
	}

	function convertirString(numero) {
		if (numero < 10) {
			var numeroString = '0' + numero.toString();
		} else {
			var numeroString = numero.toString();
		}
		return numeroString;
	}
};

function relojExclusiones() {
	var equipo = ["L","V"];
	var dorsal = ["1","2","3","4","5","6","7","8","9","10","11","12","14","16","17","18","21","23","24","30","33","37","66","77"]; ////// tomar esta lista del servidor (números personalizados)

	for (var i = 0; i < 2; i++) {
		for (var j = 0; j < dorsal.length; j++) {
			var jugador = equipo[i]+dorsal[j];
			var etiquetaJugador = '#exclusion'+jugador;

			var minuto = leerCookie(jugador+"min")
			var segundo = leerCookie(jugador+"sec");

			if (typeof minuto !== 'undefined' && typeof segundo !== 'undefined') {
				if (segundo == "00" || segundo == "0") {
					if (minuto === "0") {
						// Final de la cuenta
						var finalizarContador = "."+jugador;
						$(etiquetaJugador).addClass("invisible");
						var jugadorInactivo = "#jugador"+jugador;
						$(jugadorInactivo).removeClass("jugadorFuera");
						eliminarCookie(jugador+"min");
						eliminarCookie(jugador+"sec");
					}else {
						segundo = "59";
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

				function imprimirContador(color) {
					//Actualizar el valor de la cookie
					crearCookie(jugador+"min",minuto);
					crearCookie(jugador+"sec",segundo);

					//Configurar el número de dorsal para que se vea correctamente
					var dorsal = "#numeroDorsal"+jugador;
					$(dorsal).addClass('dorsalVisible');

					//Imprimir contador actualizado
					var imprimir = "<label><sup>"+minuto.toString()+":"+segundo.toString()+"</sup></label>";
					$(etiquetaJugador).html(imprimir);
				}
			}
		}
	}
	return;
}

function imprimirReloj(minutos,segundos) {
	if (leerCookie("periodo") == "1" ||leerCookie("periodo") == "2") {
		var periodo = leerCookie("periodo")+"ª parte";
	}else {
		var periodo = "Partido sin iniciar";
	}
	var reloj = '<div id="periodoReloj" class="w100 h20">'+periodo+'</div>';
	reloj += '<input type="text" id="valorReloj" value="'+minutos+':'+segundos+'" style="display: none;">';
	reloj += '<div class="pantallaReloj w90 h70 centradoXY">'+minutos+':'+segundos+'</div>';
	$('#reloj').html(reloj);			
};