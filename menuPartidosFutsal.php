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
					<label>2021/2022</label>
					<!--<select>
						<option>Temporada 2016/2017</option>
						<option>Temporada 2017/2018</option>
						<option>Temporada 2018/2019</option>
						<option>Temporada 2019/2020</option>
						<option>Temporada 2020/2021</option>
						<option selected>Temporada 2021/2022</option>
					</select>-->
				</div>
				<div class="cajaMenu w33"><img src="img/Menu/Balon Futsal.png"><label>Futbol Sala</label></div>
			</div>
			<div id="cajaMenuCentral">
				<div class="lineaCajaMenuCentral">
					<div class="cajaMenu trofeos w33"> <!--onclick="location.href='captura.html'">-->
						<label>Liga</label>
						<label class="sombraTextoPartidos">Liga</label>
						<img class="w100" id="ligaFutsal" src="img/Menu/Liga Futsal.png">
					</div>
					<div class="cajaMenu trofeos w33">
						<label>Copa de España</label>
						<label class="sombraTextoPartidos">Copa España</label>
						<img class="w100" id="copaFutsal" src="img/Menu/Copa Futsal.png">
					</div>
					<div class="cajaMenu trofeos w33">
						<label>Supercopa</label>
						<label class="sombraTextoPartidos">Supercopa</label>
						<img class="w100" id="superCopaFutsal" src="img/Menu/Supercopa Futsal.png">
					</div>
				</div>
				<div class="lineaCajaMenuCentral">
					<div class="cajaMenu w100 h43" id="cajaOtrasCompeticiones">
						<label>Otras competiciones</label>
						<label class="sombraTextoPartidos">Otras competiciones</label>
					</div>
				</div>
			</div>
		</div>
		<div id="bannerPubliDer" class="w10"></div>
	</div>
</body>

<script type="text/javascript">

</script>
</html>