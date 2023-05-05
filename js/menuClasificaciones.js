// Funciones para menú clasificaciones
function prepararPantallaClasificaciones() {
	let textoIdioma = textoClasificaciones(); // Tomar Idioma
	let deporte = sessionStorage.getItem("Deporte");
	let deporteLabel = textoDeportes(deporte);

	// Preparar código cuadro superior
	let superior = versionBeta();		
	superior += "	<img class='h15 botonVolverMenuSuperior' src='img/Menu/anterior.png' alt='Volver'>";
	superior += "	<label onclick=\"pasarPantalla('menuClasificaciones','menuIndex')\">"+textoIdioma[0]+"</label>";
	superior += "	<label class='botonMenuSuperior'>"+textoIdioma[1]+" · "+ deporteLabel +"</label>";
	superior += "	<img class='botonMenuSuperior logoBigDT' src='img/Menu/Logo_BigDT.png' onclick=\"pasarPantalla('menuClasificaciones','menuIndex')\">";


	// Preparar código cuadro central
	let central = "";
	central += "	<select name='selectClasificaciones' id='selectClasificaciones'>";
	central += "		<option value='0'>Sumas Totales</option>";
	central += "		<optgroup label='Sección Masculina'></optgroup>";
	central += "			<option value='1M'>Liga</option>";
	central += "			<option value='2M'>Copa</option>";
	central += "			<option value='3M'>Supercopa</option>";
	central += "		<optgroup label='Sección Femenina'></optgroup>";
	central += "			<option value='1F'>Liga</option>";
	central += "			<option value='2F'>Copa</option>";
	central += "			<option value='3F'>Supercopa</option>";
	central += "		<optgroup label='Categoría Juvenil'></optgroup>";
	central += "			<option value='1J'>Liga</option>";
	central += "			<option value='2J'>Copa</option>";
	central += "		<optgroup label='Categoría Cadete'></optgroup>";
	central += "			<option value='1C'>Liga</option>";
	central += "			<option value='2C'>Copa</option>";
	central += "		<optgroup label='Categoría Infantil'></optgroup>";
	central += "			<option value='1I'>Liga</option>";
	central += "			<option value='2I'>Copa</option>";
	central += "		<optgroup label='Categoría Alevín'></optgroup>";
	central += "			<option value='1A'>Liga</option>";
	central += "			<option value='2A'>Copa</option>";
	central += "		<optgroup label='Categoría Benjamín'></optgroup>";
	central += "			<option value='1B'>Liga</option>";
	central += "			<option value='2B'>Copa</option>";
	central += "	</select>";
	central += "	<div class='w80 h10'>";
	central += "		<div class='w10'></div>";
	central += "		<div id='cuadroOpcionesSuperior' class='w80 h50 spaceBetweenXY radio'>";
	central += "			<input type='radio' name='botonTipoClasificacion' id='botonTipoClasificacion1' onclick=\"mostrarSubmenu('1'); mostrarClasificaciones('1')\">";
	central += "			<label for='botonTipoClasificacion1' class='w40 h100 centradoXY'>Clubes</label>";
	central += "			<input type='radio' name='botonTipoClasificacion' id='botonTipoClasificacion2' onclick=\"mostrarSubmenu('Equipos')\">";
	central += "			<label for='botonTipoClasificacion2' class='w40 h100 centradoXY'>Equipos</label>";
	central += "			<input type='radio' name='botonTipoClasificacion' id='botonTipoClasificacion3' onclick=\"mostrarSubmenu('Jugadores')\">";
	central += "			<label for='botonTipoClasificacion3' class='w40 h100 centradoXY'>Jugadores</label>";
	central += "		</div>";
	central += "		<div id='cuadroOpcionesTipoEquipos' class='spaceBetweenXY radio invisible'>";
	central += "			<input type='radio' name='botonTipoClasificacion2' id='botonTipoEquipos1' onclick=\"mostrarClasificaciones('2A')\">";
	central += "			<label for='botonTipoEquipos1' class='w30 h100 centradoXY'>Clasificación</label>";
	central += "			<input type='radio' name='botonTipoClasificacion2' id='botonTipoEquipos2' onclick=\"mostrarClasificaciones('2B')\">";
	central += "			<label for='botonTipoEquipos2' class='w30 h100 centradoXY'>Generales</label>";
	central += "			<input type='radio' name='botonTipoClasificacion2' id='botonTipoEquipos3' onclick=\"mostrarClasificaciones('2C')\">";
	central += "			<label for='botonTipoEquipos3' class='w30 h100 centradoXY'>Ataque</label>";
	central += "			<input type='radio' name='botonTipoClasificacion2' id='botonTipoEquipos4' onclick=\"mostrarClasificaciones('2D')\">";
	central += "			<label for='botonTipoEquipos4' class='w30 h100 centradoXY'>Defensa</label>";
	central += "		</div>";
	central += "		<div id='cuadroOpcionesTipoJugadores' class='spaceBetweenXY radio invisible'>";
	central += "			<input type='radio' name='botonTipoClasificacion2' id='botonTipoJugadores2' onclick=\"mostrarClasificaciones('3A')\">";
	central += "			<label for='botonTipoJugadores2' class='w40 h100 centradoXY'>Generales</label>";
	central += "			<input type='radio' name='botonTipoClasificacion2' id='botonTipoJugadores3' onclick=\"mostrarClasificaciones('3B')\">";
	central += "			<label for='botonTipoJugadores3' class='w40 h100 centradoXY'>Ataque</label>";
	central += "			<input type='radio' name='botonTipoClasificacion2' id='botonTipoJugadores4' onclick=\"mostrarClasificaciones('3C')\">";
	central += "			<label for='botonTipoJugadores4' class='w40 h100 centradoXY'>Defensa</label>";
	central += "		</div>";
	central += "	</div>";
	central += "	<div id='cuadroClasificaciones' class='w100 h90 spaceAroundXY flexWrap'>";
	central += "	</div>";

	// Publicar códigos
	$("#cajaMenuSuperiorClasificaciones").html(superior);
	$("#cajaMenuSuperiorClasificaciones").show(superior);

	$("#cajaMenuCentralClasificaciones").html(central);
	$("#cajaMenuCentralClasificaciones").show(central);
};
	function mostrarSubmenu(opcion) {
		$("#cuadroOpcionesTipoEquipos").addClass("invisible");
		$("#cuadroOpcionesTipoJugadores").addClass("invisible");
		if (opcion != "1") {
			var id = "#cuadroOpcionesTipo"+opcion;
			$(id).removeClass("invisible");
		}
	};
	function mostrarClasificaciones(opcion) {
		var datos = "";
		switch (opcion) {
			case "1":
				datos += "	<div class='w30 h50 centradoXY flexWrap'>";
				datos += "		<label>Total Histórico de Trofeos</label>";
				datos += "		<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var i = 1; i <= 20; i++) {
					datos += "		<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "			<div class='w10 h100 centradoXY cajaNumero'>"+i+"</div>";
					datos += "				<div class='w90 h100 centradoXY flexWrap'>";
					datos += "					<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Equipo "+i+"</div>";
					datos += "					<div class='w100 h50 spaceAroundXY'><strong>Dato</strong> <strong>Dato</strong> <strong>Dato</strong></div>";
					datos += "				</div>";
					datos += "		</div>";
				}
				datos += "		</div>"
				datos += "	</div>";

				datos += "	<div class='w20 h50 centradoXY flexWrap'>";
				datos += "		<label>Total de puntos</label>";
				datos += "		<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var j = 1; j <= 20; j++) {
					datos += "		<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "			<div class='w10 h100 centradoXY cajaNumero'>"+j+"</div>";
					datos += "				<div class='w90 h100 centradoXY flexWrap'>";
					datos += "					<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Equipo "+j+"</div>";
					datos += "					<div class='w100 h50 spaceAroundXY'><strong>XX puntos</strong></div>";
					datos += "				</div>";
					datos += "		</div>";
				}
				datos += "		</div>"
				datos += "	</div>";

				datos += "	<div class='w20 h50 centradoXY flexWrap'>";
				datos += "		<label>Equipos por Club</label>";
				datos += "		<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var j = 1; j <= 20; j++) {
					datos += "		<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "			<div class='w10 h100 centradoXY cajaNumero'>"+j+"</div>";
					datos += "				<div class='w90 h100 centradoXY flexWrap'>";
					datos += "					<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Equipo "+j+"</div>";
					datos += "					<div class='w100 h50 spaceAroundXY'><strong>XX equipos</strong></div>";
					datos += "				</div>";
					datos += "		</div>";
				}
				datos += "		</div>"
				datos += "	</div>";

				datos += "	<div class='w20 h50 centradoXY flexWrap'>";
				datos += "		<label>Valoración Media</label>";
				datos += "		<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var k = 1; k <= 20; k++) {
					datos += "		<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "			<div class='w10 h100 centradoXY cajaNumero'>"+k+"</div>";
					datos += "				<div class='w90 h100 centradoXY flexWrap'>";
					datos += "					<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Equipo "+k+"</div>";
					datos += "					<div class='w100 h50 spaceAroundXY'><strong>Dato</strong></div>";
					datos += "				</div>";
					datos += "		</div>";
				}
				datos += "		</div>"
				datos += "	</div>";
				break;
			case "2A":
				datos += "	<div id='menuSuperior' class='w90 h10 spaceAroundXY'>";
				datos += "		<select class='w10'>";
				datos += "			<option>Masculina</option>";
				datos += "			<option>Femenina</option>";
				datos += "			<option>Mixta</option>";
				datos += "		</select>";
				datos += "		<select class='w20'>";
				datos += "			<optgroup>Nacional</optgroup>";
				datos += "				<option>Liga Asobal</option>";
				datos += "				<option>División de Honor Plata</option>";
				datos += "				<option selected>Primera Nacional</option>";
				datos += "		</select>";
				datos += "		<select class='w10'>";
				datos += "			<option>Grupo A</option>";
				datos += "			<option>Grupo B</option>";
				datos += "			<option>Grupo C</option>";
				datos += "			<option>Grupo D</option>";
				datos += "			<option>Grupo E</option>";
				datos += "			<option selected>Grupo F</option>";
				datos += "		</select>";
				datos += "		<select class='w10'>";
				for (var i = 30; i >= 1; i--) {
					datos += "		<option>Jornada "+i+"</option>";
				}
				datos += "		</select>";
				datos += "	</div>";
				datos += "	<div id='menuDatos' class='w100 h90 centradoXY'>";
				datos += "		<div class='w90 h90 cuadroDatosClasificaciones centradoXY flexWrap' style='padding:0'>";
				datos += "			<div class='w95 h15 centradoInlineXY'>";
				datos += "				<div class='w8 centradoXY'></div>";
				datos += "				<div class='w50'></div>";
				datos += "				<div class='w8 centradoXY'><strong style='color:var(--color-corporativo-morado)'>Pts</strong></div>";
				datos += "				<div class='w8 centradoXY'><strong style='color:var(--color-corporativo-morado)'>PJ</strong></div>";
				datos += "				<div class='w8 centradoXY'><strong style='color:var(--color-corporativo-morado)'>V</strong></div>";
				datos += "				<div class='w8 centradoXY'><strong style='color:var(--color-corporativo-morado)'>E</strong></div>";
				datos += "				<div class='w8 centradoXY'><strong style='color:var(--color-corporativo-morado)'>D</strong></div>";
				datos += "				<div class='w8 centradoXY'><strong style='color:var(--color-corporativo-morado)'>GF</strong></div>";
				datos += "				<div class='w8 centradoXY'><strong style='color:var(--color-corporativo-morado)'>GC</strong></div>";
				datos += "				<div class='w8 centradoXY'><strong style='color:var(--color-corporativo-morado)'>Dif</strong></div>";
				datos += "			</div>";

				datos += "			<div id='cuadroMiClasificacionGeneral' class='w95 h85 centradoXY flexWrap'>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>1</div>";
				datos += "					<div class='w50' style='margin-left:1%'>BM Ikasa</div>";
				datos += "					<div class='w8 centradoXY'>52</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>25</div>";
				datos += "					<div class='w8 centradoXY'>2</div>";
				datos += "					<div class='w8 centradoXY'>3</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>2</div>";
				datos += "					<div class='w50' style='margin-left:1%'>BM Caserío Ciudad Real</div>";
				datos += "					<div class='w8 centradoXY'>49</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>24</div>";
				datos += "					<div class='w8 centradoXY'>1</div>";
				datos += "					<div class='w8 centradoXY'>5</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>3</div>";
				datos += "					<div class='w50' style='margin-left:1%'>Grupo Egido Quental BM Pinto</div>";
				datos += "					<div class='w8 centradoXY'>49</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>22</div>";
				datos += "					<div class='w8 centradoXY'>5</div>";
				datos += "					<div class='w8 centradoXY'>3</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>4</div>";
				datos += "					<div class='w50' style='margin-left:1%'>Helvetia BM Prointegrada</div>";
				datos += "					<div class='w8 centradoXY'>42</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>21</div>";
				datos += "					<div class='w8 centradoXY'>0</div>";
				datos += "					<div class='w8 centradoXY'>9</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>5</div>";
				datos += "					<div class='w50' style='margin-left:1%'>BM Bolaños</div>";
				datos += "					<div class='w8 centradoXY'>42</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>20</div>";
				datos += "					<div class='w8 centradoXY'>2</div>";
				datos += "					<div class='w8 centradoXY'>8</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>6</div>";
				datos += "					<div class='w50' style='margin-left:1%'>BM Ciudad de Algeciras</div>";
				datos += "					<div class='w8 centradoXY'>36</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>17</div>";
				datos += "					<div class='w8 centradoXY'>2</div>";
				datos += "					<div class='w8 centradoXY'>11</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>7</div>";
				datos += "					<div class='w50' style='margin-left:1%'>ARS Naranjas Palma del Río</div>";
				datos += "					<div class='w8 centradoXY'>33</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>15</div>";
				datos += "					<div class='w8 centradoXY'>3</div>";
				datos += "					<div class='w8 centradoXY'>12</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>8</div>";
				datos += "					<div class='w50' style='margin-left:1%'>E.Doblea WOP BM Pozoblanco</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>13</div>";
				datos += "					<div class='w8 centradoXY'>4</div>";
				datos += "					<div class='w8 centradoXY'>13</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>9</div>";
				datos += "					<div class='w50' style='margin-left:1%'>Trops Málaga-Norte</div>";
				datos += "					<div class='w8 centradoXY'>28</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>12</div>";
				datos += "					<div class='w8 centradoXY'>4</div>";
				datos += "					<div class='w8 centradoXY'>14</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>10</div>";
				datos += "					<div class='w50' style='margin-left:1%'>CBM Cantera Sur</div>";
				datos += "					<div class='w8 centradoXY'>28</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>13</div>";
				datos += "					<div class='w8 centradoXY'>2</div>";
				datos += "					<div class='w8 centradoXY'>15</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>11</div>";
				datos += "					<div class='w50' style='margin-left:1%'>BM Sanse</div>";
				datos += "					<div class='w8 centradoXY'>22</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>10</div>";
				datos += "					<div class='w8 centradoXY'>2</div>";
				datos += "					<div class='w8 centradoXY'>18</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>12</div>";
				datos += "					<div class='w50' style='margin-left:1%'>SAFA Madrid</div>";
				datos += "					<div class='w8 centradoXY'>21</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>10</div>";
				datos += "					<div class='w8 centradoXY'>1</div>";
				datos += "					<div class='w8 centradoXY'>19</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>13</div>";
				datos += "					<div class='w50' style='margin-left:1%'>Melilla Sport Capital BM</div>";
				datos += "					<div class='w8 centradoXY'>19</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>9</div>";
				datos += "					<div class='w8 centradoXY'>1</div>";
				datos += "					<div class='w8 centradoXY'>20</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>14</div>";
				datos += "					<div class='w50' style='margin-left:1%'>BM Montequinto</div>";
				datos += "					<div class='w8 centradoXY'>14</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>17</div>";
				datos += "					<div class='w8 centradoXY'>2</div>";
				datos += "					<div class='w8 centradoXY'>22</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>15</div>";
				datos += "					<div class='w50' style='margin-left:1%'>Dechoker Corazonistas</div>";
				datos += "					<div class='w8 centradoXY'>13</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>5</div>";
				datos += "					<div class='w8 centradoXY'>3</div>";
				datos += "					<div class='w8 centradoXY'>22</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "				<div class='w100 h15 centradoInlineXY'>";
				datos += "					<div class='w8 h60 centradoXY' style='border-radius:5px;background:var(--color-texto);color:var(--color-corporativo-rosa)'>16</div>";
				datos += "					<div class='w50' style='margin-left:1%'>BM Maracena La Esquinita de Javi</div>";
				datos += "					<div class='w8 centradoXY'>2</div>";
				datos += "					<div class='w8 centradoXY'>30</div>";
				datos += "					<div class='w8 centradoXY'>1</div>";
				datos += "					<div class='w8 centradoXY'>0</div>";
				datos += "					<div class='w8 centradoXY'>29</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "					<div class='w8 centradoXY'>-</div>";
				datos += "				</div>";
				datos += "			</div>";
				datos += "		</div>";
				datos += "	</div>";
				break;
			case "2B":
				break;
			case "2C":
				break;
			case "2D":
				break;
			case "3A":
				datos += "	<div class='w20 h50 centradoXY flexWrap'>";
				datos += "		<label>Mejores Valoraciones</label>";
				datos += "		<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var i = 1; i <= 20; i++) {
					datos += "		<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "			<div class='w10 h100 centradoXY cajaNumero'>"+i+"</div>";
					datos += "				<div class='w90 h100 centradoXY flexWrap'>";
					datos += "					<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Equipo "+i+"</div>";
					datos += "					<div class='w100 h50 spaceAroundXY'><strong>Dato</strong></div>";
					datos += "				</div>";
					datos += "		</div>";
				}
				datos += "		</div>"
				datos += "	</div>";

				datos += "	<div class='w20 h50 centradoXY flexWrap'>";
				datos += "		<label>Minutos Jugados</label>";
				datos += "		<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var j = 1; j <= 20; j++) {
					datos += "		<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "			<div class='w10 h100 centradoXY cajaNumero'>"+j+"</div>";
					datos += "				<div class='w90 h100 centradoXY flexWrap'>";
					datos += "					<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Equipo "+j+"</div>";
					datos += "					<div class='w100 h50 spaceAroundXY'><strong>Dato</strong></div>";
					datos += "				</div>";
					datos += "		</div>";
				}
				datos += "		</div>"
				datos += "	</div>";

				datos += "	<div class='w20 h50 centradoXY flexWrap'>";
				datos += "		<label>Partidos Jugados</label>";
				datos += "		<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var j = 1; j <= 20; j++) {
					datos += "		<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "			<div class='w10 h100 centradoXY cajaNumero'>"+j+"</div>";
					datos += "				<div class='w90 h100 centradoXY flexWrap'>";
					datos += "					<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Equipo "+j+"</div>";
					datos += "					<div class='w100 h50 spaceAroundXY'><strong>Dato</strong></div>";
					datos += "				</div>";
					datos += "		</div>";
				}
				datos += "		</div>"
				datos += "	</div>";
				break;

			case "3B":
				datos += "	<div class='w100 h50 spaceAroundXY'>";
				
				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Valoraciones Ataque</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var i = 1; i <= 20; i++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+i+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+i+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";

				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Goleadores</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var j = 1; j <= 20; j++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+j+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+j+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";


				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Efectividad en Pases</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var m = 1; m <= 20; m++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+m+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+m+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato% (OK/Tot)</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";

				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Asistencias</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var n = 1; n <= 20; n++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+n+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+n+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";
				datos += "	</div>";

				datos += "	<div class='w100 h50 spaceAroundXY'>";
				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Efectividad (Tiros/Goles)</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var i = 1; i <= 20; i++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+i+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+i+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato% (Tir/Gol)</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";

				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Efectividad 9M (T/G)</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var j = 1; j <= 20; j++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+j+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+j+"</div>";
	
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato% (Tir/Gol)</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";

				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Efectividad 6M (T/G)</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var k = 1; k <= 20; k++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+k+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+k+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato% (Tir/Gol)</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";

				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Efectividad 7M (T/G)</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var l = 1; l <= 20; l++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+l+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+l+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato% (Tir/Gol)</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";
				datos += "	</div>";
				break;

			case "3C":
				datos += "	<div class='w100 h50 spaceAroundXY'>";
				
				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Valoraciones Defensa</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var i = 1; i <= 20; i++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+i+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+i+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";

				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Efectividad en Robos</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var j = 1; j <= 20; j++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+j+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+j+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";


				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Exclusiones</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var m = 1; m <= 20; m++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+m+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+m+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato% (OK/Tot)</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";

				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Expulsiones</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var n = 1; n <= 20; n++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+n+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+n+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";
				datos += "	</div>";

				datos += "	<div class='w100 h50 spaceAroundXY'>";
				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Efectividad (Defensas/Tiros)</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var i = 1; i <= 20; i++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+i+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+i+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato% (Tir/Gol)</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";

				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Efectividad 9M (D/T)</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var j = 1; j <= 20; j++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+j+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+j+"</div>";
	
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato% (Tir/Gol)</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";

				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Efectividad 6M (D/T)</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var k = 1; k <= 20; k++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+k+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+k+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato% (Tir/Gol)</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";

				datos += "		<div class='w19 h95 centradoXY flexWrap'>";
				datos += "			<label>Errores Forzados</label>";
				datos += "			<div class='h80 cuadroDatosClasificaciones centradoXY flexWrap'>";
				for (var l = 1; l <= 20; l++) {
					datos += "			<div class='w90 h25 centradoInlineXY casillaDatosClasificaciones'>";
					datos += "				<div class='w10 h100 centradoXY cajaNumero'>"+l+"</div>";
					datos += "					<div class='w90 h100 centradoXY flexWrap'>";
					datos += "						<div class='w100 h50'><img class='w20' src='img/Clubes/Clubes/defecto.png' alt=''>Jugador "+l+"</div>";
					datos += "						<div class='w100 h50 spaceAroundXY'><strong>Dato% (Tir/Gol)</strong></div>";
					datos += "					</div>";
					datos += "			</div>";
				}
				datos += "			</div>"
				datos += "		</div>";
				datos += "	</div>";
				break;
		}
		$("#cuadroClasificaciones").html(datos);
	};