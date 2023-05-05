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
		<div id="cajaMenuSuperior">
			<div class="cajaMenu w33" onclick="location.href='menu.php'"><img src="img/Menu/volver.png"><label>Volver</label></div>
			<div class="cajaMenu w33">
				<label>2021/2022</label> 
			</div>
			<div class="cajaMenu w33"><img src="img/Menu/Balon Balonmano.png"><label>Balonmano</label></div>
		</div>
		<div id="cajaMenuCentral">
			<div class="lineaCajaMenuCentral">
				<div class="cajaMenu trofeos w33"> <!--onclick="location.href='captura.html'"-->
					<label>Liga</label>
					<label class="sombraTextoPartidos">Liga</label>
					<img class="h70" id="ligaBalonmano" src="img/Menu/Liga Asobal.png">
				</div>
				<div class="cajaMenu trofeos w33">
					<label>Copa</label>
					<label class="sombraTextoPartidos">Copa</label>
					<img class="h70" id="copaBalonmano" src="img/Menu/Copa Asobal.png">
				</div>
				<div class="cajaMenu trofeos w33">
					<label>Supercopa</label>
					<label class="sombraTextoPartidos">Supercopa</label>
					<img class="h70" id="superCopaBalonmano" src="img/Menu/Recopa Asobal.png">
				</div>
			</div>
			<div class="lineaCajaMenuCentral">
				<div class="cajaMenu w49 h43" id="cajaOtrasCompeticiones">
					<label>Otras competiciones</label>
					<label class="sombraTextoPartidos">Otras competiciones</label>
				</div>
				<div class="cajaMenu w49 h43" id="cajaMisCompeticiones">
					<label>Mis competiciones</label>
					<label class="sombraTextoPartidos">Mis competiciones</label>
				</div>
			</div>
		</div>
	</div>
</body>

<script type="text/javascript">

</script>
</html>