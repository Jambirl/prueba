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
				<div class="cajaMenu w33"><img src="img/Menu/Balon Baloncesto.png"><label>Baloncesto</label></div>
			</div>
			<div id="cajaMenuCentral">
				<div class="lineaCajaMenuCentral">
					<div class="cajaMenu trofeos w33">
						<label>Liga</label>
						<label class="sombraTextoPartidos">Liga</label>
						<img class="w70" id="ligaBaloncesto" src="img/Menu/Liga Endesa.png">
					</div>
					<div class="cajaMenu trofeos w33">
						<label>Copa</label>
						<label class="sombraTextoPartidos">Copa</label>
						<img class="w70" id="copaBaloncesto" src="img/Menu/Copa Baloncesto.png">
					</div>
					<div class="cajaMenu trofeos w33">
						<label>Supercopa</label>
						<label class="sombraTextoPartidos">Supercopa</label>
						<img class="w70 invisible" id="superCopaBaloncesto" src="img/Menu/Partido Baloncesto.png">
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