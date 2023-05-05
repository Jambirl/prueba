function favoritosOFF() {
	var json = 
'{"Balonmano":{"IDFav":"43","EscudoFav":"e7e1f453518f60d6ccf116badd98daee.png","DatosFav":["1","20"],"TemporadaFav":"2021","EscudoRiv":"9f4ea684447ad2340460cba99d209e5b.png","DatosRival":["2","18","1","0","1","2","1"],"TemporadaRiv":"2021","DatosPartido":["3","2735"]},"Baloncesto":{"IDFav":"0","EscudoFav":"828007b617f6b8dee2dbe092ddff06d5.png","DatosFav":["5","8"],"TemporadaFav":"2021","EscudoRiv":"137f50e8669a457c6f1ab6745646bf4e.png","DatosRival":["15","2","1","0","0","0","0"],"TemporadaRiv":"2021","DatosPartido":["1","0"]},"Futsal":{"IDFav":"0","EscudoFav":"577bf99e008a326db3547fd48c391ad0.png","DatosFav":["10","10"],"TemporadaFav":"2021","EscudoRiv":"3aee162c78e94bc448ca059a74b8b938.png","DatosRival":["6","20","0","1","1","2","2"],"TemporadaRiv":"2021","DatosPartido":["1","0"]}}';
	return json;
};

function datosDeporte(deporte, categoria) {
	switch (deporte) {
		case "Balonmano":
		case "1":
			switch (categoria) {
				case "d1M":
					var datos = ["dcf2d6aaddf9be186c0405ab86d94bb1.png", "Liga Sacyr"];
					break;
				case "d2M":
					var datos = ["", "DH Plata", "Gr.A", "Gr.B"];
					break;
				case "d3M":
					var datos = ["", "1ª Nacional", "Gr.A", "Gr.B", "Gr.C", "Gr.D", "Gr.E", "Gr.F"];
					break;
				case "d1F":
					var datos = ["4a0d14d534b9c5e8eed9e956e0de373b.png", "Liga Guerreras"];
					break;
				case "d2F":
					var datos = ["", "DH Plata", "Gr.A","Gr.B","Gr.C","Gr.D"];
					break;
				case "d3M":
					var datos = ["", "Primera Nacional", "Gr.A","Gr.B","Gr.C","Gr.D","Gr.E","Gr.F"];
					break;
				case "d3F":
					var datos = ["", "Primera Nacional"];
					break;
				case "copaM":
					var datos = ["", ""];
					break;
				case "copaF":
					var datos = ["", ""];
					break;
			}
			break;
		case "Baloncesto":
		case "2":
			switch (categoria) {
				case "d1M":
					var datos = ["1f6cd03d798feeecb2e22ce1b179a20d.png", "Liga Endesa"];
					break;
				case "d2M":
					var datos = ["886795c304fce043f4cf1c8b6361f2b2.png", "LEB Oro"];
					break;
				case "d3M":
					var datos = ["d4feb0edacdc091553fae52a19f5e076.png","LEB Plata", "Gr. Este", "Gr. Oeste"];
					break;
				case "d1F":
					var datos = ["bae3e8006ed7f087ac8412aa0af02c99.png", "LF Endesa"];
					break;
				case "d2F":
					var datos = ["fddb2c17945c7c4f95020afceaca32e1.png", "LF Challenge"];
					break;
				case "d3F":
					var datos = ["", "LF2", "Gr. A", "Gr. B"];
					break;
			}
			break;
		case "Futsal":
		case "3":
			switch (categoria) {
				case "d1M":
					var datos = ["7e9a213f644eaa50ad2bf8223f2cbb1b.png", "Primera RFEF"];
					break;
				case "d2M":
					var datos = ["1de5bbce9821df1070017de786be4b7e.png", "Segunda RFEF"];
					break;
				case "d3M":
					var datos = ["", "2ª División B", "Gr. 1", "Gr. 2", "Gr. 3", "Gr. 4", "Gr. 5", "Gr. 6"];
					break;
				case "d1F":
					var datos = ["22625f5ce17c3c40c592bd02d86ff5fa.png", "Primera RFEF"];
					break;
				case "d2F":
					var datos = ["e39ea25aad404072b12bd02a2d6d3b9a.png", "Segunda RFEF"];
					break;
				case "d3F":
					var datos = ["", "2ª División B", "Gr. 1", "Gr. 2", "Gr. 3", "Gr. 4"];
					break;
			}
			break;
	}

	return datos;
};