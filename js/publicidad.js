// Gestión de la publicidad

// Página Index
function publiIndex() {
	let codigo = "";
	codigo += "	<picture class='h100 centradoXY'>";
	codigo += "		<source media='(max-width: 430px)' srcset='img/Publicidad/BannerPubli.png'>";
	codigo += "		<source media='(min-width: 430px)' srcset='img/Publicidad/BannerPubliIndex.png'>";
	codigo += "		<img id='publiGrande' class='h100 w90' src='img/Publicidad/BannerPubliIndex.png' alt='Banner Publicidad'>";
	codigo += " </picture>";
	document.getElementById("pieIndex").innerHTML = codigo;
}


// Página Menu
function mostrarPubli() {
	let banners = document.getElementsByClassName("bannerPublicidad");
	for (var i = 0; i < banners.length; i++) {
		banners[i].src = "img/Publicidad/BannerPubli.png";
	}

	// Footers
	let footers = document.getElementsByClassName("PFooter");
	for (var i = 0; i < footers.length; i++) {
		footers[i].innerHTML = "<img class='h100 w90' src='img/Publicidad/BannerPubli.png' alt='Publi'>";
	}

	// Transicion entre pantallas
	document.getElementById("PTransicion").src = 'img/Publicidad/Jambitec.png';
	
	// Banner principal Previa Partido
	// NOTA: Se sitúa aquí para que esté visible mientras cargan los datos de la pantalla
	document.getElementById("PPrevia0").src='img/Publicidad/BannerPubli.png';
};


// Página Previa Partido
function publiPrevia(opcion) {
	switch (opcion) {
	case "VS":
		document.getElementById("PPreviaVS").src='img/Publicidad/BannerPubli.png';
		break;
	case "Gen":
		document.getElementById("PPreviaGen").src='img/Publicidad/BannerPubliDoble.png';
		break;
	case "Ind":
		document.getElementById("PPreviaInd").src='img/Publicidad/BannerPubli.png';
		break;
	case "IndPro":
		document.getElementById("PPreviaIndPro").src='img/Publicidad/BannerPubli.png';
		break;
	}
}