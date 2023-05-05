// FUNCIONES BÁSICAS SOBRE IDIOMAS
///////////////////////////////////////////////////////////////////////
/*
Golpe franco: Free throw
7 metros: 7-Meter throw

*/
///////////////////////////////////////////////////////////////////////

/*jslint browser:true */
/*jslint node: true */
/* jshint latedef:nofunc */

function verIdioma() {
    "use strict";
    function guardar() {
        var idioma = navigator.language;
        localStorage.setItem("idioma", idioma);
        return idioma;
    }
    var idioma = localStorage.getItem("idioma") ? localStorage.getItem("idioma") : guardar();
    return idioma;
}

function idiomaActual(pagina, deporte) {
    "use strict";
    var idioma = verIdioma(),
        idiomaAlt = "",
        idiomaImg = "",
        imagen = "";

    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-AR":
    case "es-CL":
    case "es-MX":
    case "es-419":
        idiomaAlt = "Español";
        idiomaImg = "es";
        break;
    case "en":
    case "en-US":
    case "en-us":
    case "en-GB":
        idiomaAlt = "English";
        idiomaImg = "en";
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        idiomaAlt = "Français";
        idiomaImg = "fr";
        break;
    case "de":
    case "de-DE":
    case "de-de":
        idiomaAlt = "Deutsch";
        idiomaImg = "de";
        break;
    }
    imagen = "<img class='w90' src='img/Idiomas/" + idiomaImg + ".png' onclick='abrirCajaIdiomas()' alt='" + idiomaAlt + "'>";

    document.getElementById("idiomaActual").innerHTML = imagen;

    switch (pagina) {
    case "index":
        mostrarCuadroLogin();
        comprobarPermisoCookies();
        break;
    case "indexOffLine":
        break;
    case "menu":
        mostrarFavoritos();
        mostrarMenuSuperior();
        mostrarMenuSecciones();
        mostrarAjustesUsuario();
        comprobarEstadoUsuario();
        mostrarBarraInferior(deporte);
        break;
    }
}

function abrirCajaIdiomas() {
    "use strict";
    document.getElementById("cajaIdiomas").classList.remove("invisible");
    document.getElementById("cajaIdiomas").classList.add("abrirCaja");
}

function elegirIdioma(pagina, idioma) {
    "use strict";
    localStorage.setItem("idioma", idioma);
    idiomaActual(pagina);
    document.getElementById("cajaIdiomas").classList.add("invisible");
}





// FUNCIONES CON TEXTO EN TODOS LOS IDIOMAS
function nombrePais(pais) {
    "use strict";
    var idioma = verIdioma(),
        orden = 0,
        arrayTexto = [];
    switch (pais) {
    case "arg":
        orden = 1;
        break;
    case "bih":
        orden = 2;
        break;
    case "blr":
        orden = 3;
        break;
    case "br":
        orden = 4;
        break;
    case "chl":
        orden = 5;
        break;
    case "cpv":
        orden = 6;
        break;
    case "cro":
        orden = 7;
        break;
    case "cub":
        orden = 8;
        break;
    case "de":
        orden = 9;
        break;
    case "den":
        orden = 10;
        break;
    case "egy":
        orden = 11;
        break;
    case "en":
        orden = 12;
        break;
    case "es":
        orden = 13;
        break;
    case "fr":
        orden = 14;
        break;
    case "geo":
        orden = 15;
        break;
    case "grc":
        orden = 16;
        break;
    case "hu":
        orden = 17;
        break;
    case "irn":
        orden = 18;
        break;
    case "isr":
        orden = 19;
        break;
    case "it":
        orden = 20;
        break;
    case "kor":
        orden = 21;
        break;
    case "ltu":
        orden = 22;
        break;
    case "mkd":
        orden = 23;
        break;
    case "mne":
        orden = 24;
        break;
    case "ngr":
        orden = 25;
        break;
    case "nig":
        orden = 26;
        break;
    case "pol":
        orden = 27;
        break;
    case "prt":
        orden = 28;
        break;
    case "ru":
        orden = 29;
        break;
    case "rus":
        orden = 30;
        break;
    case "srb":
        orden = 31;
        break;
    case "svk":
        orden = 32;
        break;
    case "svn":
        orden = 33;
        break;
    case "swe":
        orden = 34;
        break;
    case "tun":
        orden = 35;
        break;
    case "ukr":
        orden = 36;
        break;
    case "usa":
        orden = 37;
        break;
    case "tr":
        orden = 38;
        break;
    case "fi":
        orden = 39;
        break;
    case "nb":
        orden = 40;
        break;
    case "qa":
        orden = 41;
        break;
    case "ksv":
        orden = 42;
        break;
    case "nld":
        orden = 43;
        break;
    case "urg":
        orden = 44;
        break;
    }
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["", "Argentina", "Bosnia y Herzegovina", "Bielorrusia", "Brasil", "Chile", "Cabo Verde", "Croacia", "Cuba", "Alemania", "Dinamarca", "Egipto", "Inglaterra", "España", "Francia", "Georgia", "Grecia", "Hungría", "Irán", "Israel", "Italia", "Korea", "Lituania", "Macedonia del Norte", "Montenegro", "Níger", "Nigeria", "Polonia", "Portugal", "Rumanía", "Rusia", "Serbia", "Eslovaquia", "Eslovenia", "Suecia", "Túnez", "Ucrania", "EEUU", "Turquía", "Finlandia", "Noruega", "Qatar", "Kosovo", "Países Bajos", "Uruguay"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["", "Argentina", "Bosnia and Herzegovina", "Belarus", "Brazil", "Chile", "Cape Verde", "Croatia", "Cuba", "Germany", "Denmark", "Egypt", "England", "France", "Georgia", "Greece", "Hungary", "Iran", "Israel", "Italy", "Korea", "Lithuania", "North Macedonia", "Spain", "Montenegro", "Niger", "Nigeria", "Poland", "Portugal", "Romania", "Russia", "Serbia", "Slovakia", "Slovenia", "Sweden", "Tunisia", "Ukraine", "USA", "Turkey", "Finland", "Norway", "Qatar", "Kosovo", "Netherlands", "Uruguay"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["", "Argentine", "Bosnie-Herzégovine", "Biélorussie", "Brésil", "Chili", "Cap-Vert", "Croatie", "Cuba", "Allemagne", "Danemark", "Égypte", "Angleterre", "France", "Géorgie", "Grèce", "Hongrie", "Iran", "Israël", "Italie", "Corée", "Lituanie", "Macédoine du Nord", "Espagne", " Monténégro", "Niger", "Nigeria", "Pologne", "Portugal", "Roumanie", "Russie", "Serbie", "Slovaquie", "Slovénie", "Suède", "Tunisie", "Ukraine", "USA", "Turquie", "Finlande", "Norvège", "Qatar", "Kosovo", "Pays Bas", "Uruguay"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["", "Argentinien", "Bosnien und Herzegowina", "Weißrussland", "Brasilien", "Chile", "Kap Verde", "Kroatien", "Kuba", "Deutschland", "Dänemark", "Ägypten", "England", "Frankreich", "Georgien", "Griechenland", "Ungarn", "Iran", "Israel", "Italien", "Korea", "Litauen", "Nordmazedonien", "Spanien", "Montenegr", "Niger", "Nigeria", "Polen", "Portugal", "Rumänien", "Russland", "Serbien", "Slowakei", "Slowenien", "Schweden", "Tunesien", "Ukraine", "USA", "Truthahn", "Finnland", "Norwegen", "Katar", "Kosovo", "Niederlande", "Uruguay"];
        break;
    }
    return arrayTexto[orden];
}

function textoMeses(mes) {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["", "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["", "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["", "JANVIER", "FÉVRIER", "MARS", "AVRIL", "MAI", "JUIN", "JUILLET", "AOÛT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DÉCEMBRE"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["", "JANUAR", "FEBRUAR", "MÄRZ", "APRIL", "MAI", "JUNI", "JULI", "AUGUST", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DEZEMBER"];
        break;
    }
    return arrayTexto[mes];
}

function textoDeportes(deporte, opcion) {
    "use strict";
    var idioma = opcion ? "es" : verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["Balonmano", "Baloncesto", "Futsal"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["Handball", "Basketball", "Futsal"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["Handball", "Basketball", "Futsal"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["Handball", "Basketball", "Futsal"];
        break;
    }
    switch (deporte) {
    case "Balonmano":
    case "BM":
    case "1":
    case 1:
        return arrayTexto[0];
    case "Baloncesto":
    case "BL":
    case "2":
    case 2:
        return arrayTexto[1];
    case "Futsal":
    case "FS":
    case "3":
    case 3:
        return arrayTexto[2];
    }
}

function textoJugadores() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["", "Jugador", "Jugadora"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["", "Player", "Player"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["", "Joueur", "Joueur"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["", "Spieler", "Spieler"];
        break;
    }
    return arrayTexto;
}

function valorCategoria(valor) {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["", "Primer Equipo", "Segundo Equipo", "Equipo Senior", "Deporte Adaptado", "Juvenil 17A", "Juvenil 16A", "Cadete 15A", "Cadete 14A", "Infantil 13A", "Infantil 12A", "Alevín 11A", "Alevín 10A", "Benjamín 9A", "Benjamín 8A", "Prebenjamín"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["", "First Team", "Second Team", "Senior Team", "Adapted Sport", "Youth 17Y", "Youth 16Y", "Cadet 15Y", "Cadet 14Y", "Infantile 13Y", "Infantile 12Y", "Juvenile 11Y", "Juvenile 10Y", "Youngest 9Y", "Youngest 8Y", "Pre Youngest"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["", "Équipe première", "Seconde équipe", "Équipe senior", "Sport adapté", "Jeunesse 17A", "Jeunesse 16A", "Cadet 15A", "Cadet 14A", "Infantile 13A", "Infantile 12A", "Juvénile 11A", "Juvénile 10A", "Plus Jeune 9A", "Plus Jeune 8A", "Pré Plus Jeune"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["", "Erstes Team", "Zweites Team", "Seniorenteam", "Adaptierter Sport", "Jugend 17J", "Jugend 16J", "Kadett 15J", "Kadett 14J", "Kindlich 13J", "Kindlich 12J", "Jugendlicher 11J", "Jugendlicher 10J", "Jüngster 9J", "Jüngster 8J", "Vorjüngster"];
        break;
    }
    return arrayTexto[valor];
}

function textoSeccion(valor, opcion) {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        if (opcion === "Completa") {
            arrayTexto = ["", "Sección Masculina", "Sección Femenina", "Sección Mixta"];
        } else {
            arrayTexto = ["", "Masculina", "Femenina", "Mixta"];
        }
        break;
    case "en":
    case "en-US":
    case "en-us":
        if (opcion === "Completa") {
            arrayTexto = ["", "Male section", "Women's Section", "Mixed section"];
        } else {
            arrayTexto = ["", "Male", "Female", "Mixed"];
        }
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        if (opcion === "Completa") {
            arrayTexto = ["", "Section masculine", "Section féminine", "Section mixte"];
        } else {
            arrayTexto = ["", "Masculin", "Féminine", "Mixte"];
        }
        break;
    case "de":
    case "de-DE":
    case "de-de":
        if (opcion === "Completa") {
            arrayTexto = ["", "Männliche Sektion", "Frauenabteilung", "Gemischte Sektion"];
        } else {
            arrayTexto = ["", "Männliche", "Weiblich", "Gemischt"];
        }
        break;
    }
    return arrayTexto[valor];
}

function textoTurnos(turno) {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["Mañana", "Tarde", "Noche"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["Morning", "Afternoon", "Night"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["Matin", "<small>Après-midi</small>", "Nuit"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["Morgen", "Nachmittag", "Abend"];
        break;
    }
    return arrayTexto[turno];
}

function nombreMoneda(valor) {
    "use strict";
    var arrayTexto = ["", "€", "$"];
    return arrayTexto[valor];
}

function textoPeriodicidad(valor) {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["indefinido", "día", "mes", "año"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["indefinite", "day", "month", "year"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["indéfini", "jour", "mois", "année"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["unbestimmt", "Tag", "Monat", "Jahr"];
        break;
    }
    return arrayTexto[valor];
}

function textoMenuSuperior() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["Volver"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["Back"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["Revenir"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["Hinter"];
        break;
    }
    return arrayTexto;
}

function textoPuestos(deporte, puesto, tipo) {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        switch (deporte) {
        case 1:
        case "1":
            if (tipo == "1" || tipo == 1) {
                arrayTexto = ["-","PO","ED","EI","LD","LI","CT","PV","DF","UN"];
            }else{
                arrayTexto = ["-","Portero", "Extremo Der", "Extremo Izq", "Lateral Der", "Lateral Izq", "Central", "Pivote", "Defensa", "Universal"];
            }
            break;
        case 2:
        case "2":
            arrayTexto = ["-","Base", "Escolta", "Alero", "Ala-Pivot", "Pivot"]; /*1,2,3,4,5*/
            break;
        case 3:
        case "3":
            arrayTexto = ["-","Portero", "Cierre", "Ala Der", "Ala Izq", "Pivote"];
            break;
        }
        break;
    case "en":
    case "en-US":
    case "en-us":
        switch (deporte) {
        case 1:
        case "1":
            if (tipo == "1" || tipo == 1) {
                arrayTexto = ["-","GK","RW","LW","RB","LB","CB","P","?","?"];
            }else {
                arrayTexto = ["-","Goalkeeper", "Right Winger", "Left Winger", "Right Backcourt", "Left Backcourt", "Center Backcourt", "Pivot","?","?"];
            }
            break;
        case 2:
        case "2":
            arrayTexto = ["-","Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"]; /*1,2,3,4,5*/
            break;
        case 3:
        case "3":
            arrayTexto = ["-","Goalkeeper", "Defender", "Right Winger", "Left Winger", "Forward"];
            break;
        }
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        switch (deporte) {
        case 1:
        case "1":
            if (tipo == "1" || tipo == 1) {
                arrayTexto = ["-","", "LD", "LG", "AD", "AG", "AC", "P","?","?"];
            }else {
                arrayTexto = ["-","Gardien", "Ailier Droit", "Ailier Gauche", "Arrière Droit", "Arrière Gauche", "Arrière Central", "Pivot","?","?"];
            }
            break;
        case 2:
        case "2":
            arrayTexto = ["-","Meneur", "Arrière", "Ailier", "Ailier Fort", "Pivot"]; /*1,2,3,4,5*/
            break;
        case 3:
        case "3":
            arrayTexto = ["-","Gardien", "Cierre", "Ailier droit", "Ailier gauche", "Avant"];
            break;
        }
        break;
    case "de":
    case "de-DE":
    case "de-de":
        switch (deporte) {
        case 1:
        case "1":
            if (tipo == "1" || tipo == 1) {
                arrayTexto = ["-","TW","RA","LA","RR","RL","RM","KM","?","?"];
            }else {
                arrayTexto = ["-","Towart", "Rechtsau&#223;en", "Linksau&#223;en", "Rückraum Rechts", "Rückraum Links", "Rückraum Mitte", "Kreis Mitte","?","?"];
            }
            break;
        case 2:
        case "2":
            arrayTexto = ["-","Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"]; /*PG,SG,SF,PF,C*/
            break;
        case 3:
        case "3":
            arrayTexto = ["-","Towart", "Cierre", "Ala Der", "Ala Izq", "Pivote"];
            break;
        }
        break;
    }
    return arrayTexto[parseInt(puesto)];
}

function textoTecnicos(puesto) {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["", "Entrenador", "Ayudante Entrenador", "Médico", "Oficial", "Staff Adicional"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["", "Coach", "Assistant Coach", "Doctor", "Official", "Additional Staff"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["", "Entraîneur", "Entraîneur adjoint", "Médecin", "Fonctionnaire", "Personnel supplémentaire"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["", "Trainer", "Assistenztrainer", "Arzt", "Amtlich", "Zusätzliches Personal"];
        break;
    }
    return arrayTexto[puesto];
}

function nombreSuscripcion(estado, orden) {
    "use strict";
    var estadoReturn,
        idioma = "",
        arrayTexto = [];
    if (orden === 0) {
        estadoReturn = estado === "0" ? "error" : "acierto";
    } else {
        idioma = verIdioma();
        switch (idioma) {
        case "es":
        case "es-ES":
        case "es-es":
        case "es-419":
            arrayTexto = ["Sin confirmar", "Equipo Pro", "Club Pro", "Gran Club Pro", "Entrenador", "Jugador", "Beca Pro", "Versión Gratuita", "Autorizado", "Eliminar"];
            break;
        case "en":
        case "en-US":
        case "en-us":
            arrayTexto = ["Unconfirmed", "Pro-Team", "Club Pro", "Grand Club Pro", "Coach", "Player", "<small>Pro Scholarship</small>", "Free version", "Authorized", "Remove"];
            break;
        case "fr":
        case "fr-FR":
        case "fr-fr":
            arrayTexto = ["Non confirmé", "Pro-équipe", "Club Pro", "Grand Club Pro", "Entraîneur", "Joueur", "Bourse Pro", "Version gratuite", "Autorisé", "Supprimer"];
            break;
        case "de":
        case "de-DE":
        case "de-de":
            arrayTexto = ["Unbestätigt", "Professionelles Team", "Club Pro", "Grand Club Pro", "Coach", "Spieler", "<small>Pro Stipendium</small>", "Freie Version", "Autorisiert", "Entfernen"];
            break;
        }
        estadoReturn = arrayTexto[estado];
    }
    return estadoReturn;
}

function textoIndex() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = [
            // Página General
            "usuario", "contraseña", "Acceder", "Registrarse", "Olvidé mis Datos", "Rellene sus datos", "Cancelar", "Aceptar condiciones de Uso",
            // Cuadro de aceptación de Cookies
            "Su privacidad es importante para nosotros", "Almacenamos o accedemos a información de su dispositivo, tales como cookies, y procesamos datos personales, tales como identificadores únicos e información estándar enviada por un dispositivo, exclusivamente para guardar sus preferencias de uso en esta herramienta web.", "Tenga en cuenta que para ejercer su derecho a rechazar tal procesamiento tan sólo debe dejar de utilizar esta herramienta web. Estas preferencias se aplicarán solo a este sitio web. Para aclarar cualquier duda sobre este o cualquier otr término de uso recuerde visitar nuestra política de privacidad."];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = [
            // General
            "user", "password", "Login", "Register", "Fill in your details", "Cancel",
            // Cookies
            "Your privacy is important to us", "We store or access information from your device, such as cookies, and process personal data, such as unique identifiers and standard information submitted by a device, solely to save your usage preferences on this web tool.", "Please note that in order to exercise your right to refuse such processing you must only stop using this web tool. These preferences will apply only to this website. To clarify any questions about this or any other term of use remember to visit our privacy policy."
        ];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = [
            // General
            "utilisateur", "mot de passe", "Connectez-vous", "Registre", "Remplissez vos coordonnées", "Annuler",
            // Cookies
            "Votre vie privée est importante pour nous", "Nous stockons ou accédons à des informations à partir de votre appareil, telles que les cookies, et traitons des données personnelles, telles que des identifiants uniques et des informations standard soumises par un appareil, uniquement pour enregistrer vos préférences d’utilisation sur cet outil Web.", "Veuillez noter que pour exercer votre droit de refuser un tel traitement, vous devez seulement cesser d’utiliser cet outil Web. Ces préférences s’appliqueront uniquement à ce site Web. Pour clarifier toute question concernant cette condition ou toute autre condition d’utilisation, n’oubliez pas de consulter notre politique de confidentialité."
        ];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = [
            // General
            "benutzer", "passwort", "Einloggen", "Registrieren", "Geben Sie Ihre Daten ein", "Abbrechen",
            // Cookies
            "Ihre Privatsphäre ist uns wichtig", "Wir speichern oder greifen auf Informationen von Ihrem Gerät zu, wie z. B. Cookies, und verarbeiten personenbezogene Daten wie eindeutige Identifikatoren und Standardinformationen, die von einem Gerät übermittelt werden, ausschließlich um Ihre Nutzungspräferenzen in diesem Web-Tool zu speichern.", "Bitte beachten Sie, dass Sie zur Ausübung Ihres Rechts, eine solche Verarbeitung abzulehnen, die Nutzung dieses Webtools nur einstellen müssen. Diese Präferenzen gelten nur für diese Website. Um Fragen zu dieser oder einer anderen Nutzungsdauer zu klären, denken Sie daran, unsere Datenschutzerklärung zu besuchen."
        ];
        break;
    }
    return arrayTexto;
}

function textoMenuConfiguracion() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["Ajustes Usuario", "Cerrar Sesión", "Suscripciones", "Favoritos", "Tour<br>BigDT", "Ayuda en Navegación", "Legal", "Eres usuario tipo"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["User Settings", "Sign off", "Subscriptions", "Favorites", "BigDT<br>Tour", "Navigation Help", "Legal", "You are user type"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["Paramètres utilisateur", "Fermer la session", "Abonnements", "Favoris", "Visite<br>BigDT", "Aide à la<br>navigation", "Juridique", "Vous êtes un utilisateur de type"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["Benutzereinstellungen", "Abmelden", "Abonnements", "Favoriten", "BigDT-Tour", "Navigationshilfe", "Gesetzlich", "Sie sind ein Benutzer vom Typ"];
        break;
    }
    return arrayTexto;
}

function textoAyuda(paso) {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = [
            "<strong class='color2'>Ajustes de Usuario</strong>: En este menú podrás configurar todas tus preferencias de uso, además de muchas otras opciones. En este tutorial te iremos mostrando, paso a paso, los puntos más importantes.",
            "<strong class='color2'>Secciones</strong>: El menú Ajustes se divide en 3 secciones, <strong class='color2'>Superior</strong> (Idioma, Usuario y Cerrar sesión), <strong class='color2'>Medio</strong> (Suscripciones y Favoritos) y <strong class='color2'>Inferior</strong> (Ayuda y Legal)",
            "<strong class='color2'>Sección Superior</strong>: De izquierda a derecha, puedes seleccionar el <strong class='color2'>Idioma</strong> de la app, puedes modificar tu <strong class='color2'>Nombre de usuario</strong>, <strong class='color2'>Cerrar la sesión</strong> en uso o <strong class='color2'>Cerrar la ventana</strong> de Ajustes.",
            "<strong class='color2'>Sección Media</strong>: En la sección <strong class='color2'>Suscripciones</strong> podrás ver el estado y acceder a la configuración de cada deporte. En la sección <strong class='color2'>Favoritos</strong> podrás seleccionar el deporte y los equipos que te aparecerán por defecto en tu menú inicial.",
            "<strong class='color2'>Sección Inferior</strong>: De izquierda a derecha, podrás acceder al archivo de <strong class='color2'>ayuda de BigDT</strong>, seleccionar si quieres que te aparezca <strong class='color2'>ayuda en pantalla</strong> mientras navegas y ver toda la <strong class='color2'>documentación legal</strong> que te relaciona con nosotros.",
            "<strong class='color2'>PRIMER PASO</strong>: Lo primero que debes hacer para que el sistema funcione correctamente es entrar en la configuración de la suscripción y seleccionar si esta cuenta corresponde a un <strong class='color2'>Club</strong>, a un miembro del <strong class='color2'>Cuerpo Técnico</strong> (entrenadores, ayudantes, preparadores físicos,...) o a un <strong class='color2'>Jugador</strong>."
        ];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["Paso1", "Paso2", "Paso3", "Paso4", "Paso5", "Paso6", "Paso7"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["Paso1", "Paso2", "Paso3", "Paso4", "Paso5", "Paso6", "Paso7"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["Paso1", "Paso2", "Paso3", "Paso4", "Paso5", "Paso6", "Paso7"];
        break;
    }
    return arrayTexto[paso - 1];
}

function textoMenuSecciones() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["Jugar Amistoso", "Competiciones", "Clasificaciones", "Entrenador <span style='color: var(--color-pro);'>Pro</span>", "Para acceder a estadísticas profesionales debes estar registrado como Usuario Pro", "Modo Edición", "Los Mejores"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["Play Friendly", "Competitions", "Classifications", "Trainer <span style='color: var(--color-pro);'>Pro</span>", "To access the professional statistics options you must be registered as a Pro User", "Edit mode", "The best"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["Jouer Amicalement", "Compétitions", "Classements", "Entraîneur <span style='color: var(--color-pro);'>Pro</span>", "Pour accéder aux options de statistiques professionnelles, vous devez être enregistré en tant qu'utilisateur Pro", "Mode édition", "Les meilleurs"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["Freundlich spielen", "Wettbewerbe", "<small>Klassifikationen</small>", "Trainer <span style='color: var(--color-pro);'>Pro</span>", "Um auf die professionellen Statistikoptionen zugreifen zu können, müssen Sie als Pro-Benutzer registriert sein", "<small><small>Bearbeitungsmodus</small></small>", "Der beste"];
        break;
    }
    return arrayTexto;
}
function textoMenu() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = [
            // Menu Favoritos
            "o", "o", "o", "o", "D", "V", "E", "Próximo Rival", "victorias", "puntos", "MI CLASIFICACIÓN", "MIS PARTIDOS", "MI PLANTILLA",
            // Barra Inferior
            "Totales", "Media", "Goles", "Puntos", "Asistencias", "Minutos", "Valoración"
        ];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = [
            // Menu Favoritos
            "st", "nd", "rd", "th", "L", "W", "D", "Next Opponent", "victories", "points", "MY CLASSIFICATION", "MY MATCHES", "MY STAFF",
            // Barra Inferior
            "Totals", "Average", "Goals", "Points", "Assists", "Minutes", "Assessment"
        ];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = [
            // Menu Favoritos
            "er", "e", "e", "e", "D", "V", "A", "<small>Adversaire Suivant</small>", "victoires", "points", "MON CLASSEMENTS", "MES MATCHS", "MON ÉQUIPE",
            // Barra Inferior
            "Totaux", "Moyenne", "Buts", "Points", "Aides", "Minutes", "Évaluation"
        ];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = [
            // Menu Favoritos
            "ste", "de", "de", "de", "V", "S", "B", "Nächster Gegner", "siege", "punkte", "<small>MEINE KLASSIFIKATIONEN</small>", "<small>MEINE STREICHHÖLZER</small>", "MEINE MITARBEITER",
            // Barra Inferior
            "Summen", "Durchschnitt", "Tore", "Punkte", "Assists", "Protokoll", "Bewertung"
        ];
        break;
    }
    return arrayTexto;
}

function textoCompeticiones() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = [
            // Menu Superior
            "Competiciones", "Temporada", "Categorías", "Selecciones", "Internacionales", "Nacionales", "Interterritoriales", "Territoriales", "Sección Masculina", "Sección Femenina", "Sección Mixta", "Categorías Inferiores", "Competiciones Territoriales", "Competiciones Personalizadas",
            // Menu Competiciones 2
            "Temporada", "Jornada", "Partido"
        ];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = [
            // Menu Superior
            "Competitions", "Season", "Categories", "National Teams", "International", "Nationals", "Inter-territorial", "Territorial", "Men's Section", "Women's Section", "Inferior Categories", "Territorial Competitions", "Custom Competitions",
            // Menu Competiciones 2
            "Season", "Matchday", "Match"
        ];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = [
            // Menu Superior
            "Compétitions", "Saison", "Catégories", "Équipes", "International", "Nationaux", "Interterritorial", "Territorial", "Section masculine", "Section féminine", "<small>Catégories Inférieures</small>", "Compétitions territoriales", "Compétitions Personnalisées",
            // Menu Competiciones 2
            "Saison", "Journée", "Le Match"
        ];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = [
            // Menu Superior
            "Wettbewerbe", "Jahreszeit", "Kategorien", "Nationalmannschaften", "International", "Staatsangehörige", "Interterritorial", "Territorial", "Staatsangehörige", "Herrenabteilung", "Frauenabteilung", "<small>Minderwertige Kategorien</small>", "Territoriale Wettbewerbe", "<small>Benutzerdefinierte Wettbewerbe</small>",
            // Menu Competiciones 2
            "Jahreszeit", "Saison", "Spiel"
        ];
        break;
    }
    return arrayTexto;
}
function textoDirectoTV() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["Directo BigDT", "Directo", "Directo TV <span class='textoPro'>Pro</span>"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["Direct BigDT", "Direct", "Direct TV <span class='textoPro'>Pro</span>"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["Direct BigDT", "Direct", "Direct TV <span class='textoPro'>Pro</span>"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["Direkt BigDT", "Direct", "Direkt TV <span class='textoPro'>Pro</span>"];
        break;
    }
    return arrayTexto;
}

function textoClasificaciones() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = [
            // Menu Superior
            "Volver", "Clasificaciones", "Balonmano", "Baloncesto", "Futsal", "Temporada", "Categorías", "Selecciones", "Internacionales", "Nacionales", "Interterritoriales", "Territoriales", "Sección Masculina", "Sección Femenina", "Femenina", "Categorías Inferiores", "Competiciones Territoriales", "Competiciones Personalizadas",
            // Menu Competiciones 2
            "Temporada", "Jornada", "Partido"
        ];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = [
            // Menu Superior
            "Back", "Competitions", "Handball", "Basketball", "Futsal", "Men's League", "Men", "Women's League", "Women", "Inferior Categories", "Territorial Competitions", "Custom Competitions",
            // Menu Competiciones 2
            "Season", "Matchday", "Match"
        ];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = [
            // Menu Superior
            "Revenir", "Compétitions", "Handball", "Basketball", "Futsal", "Ligue masculine", "Masculin", "Ligue féminine", "Femelle", "<small>Catégories Inférieures</small>", "Compétitions territoriales", "Compétitions Personnalisées",
            // Menu Competiciones 2
            "Saison", "Journée", "Le Match"
        ];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = [
            // Menu Superior
            "Hinter", "Wettbewerbe", "Handball", "Basketball", "Futsal", "Liga der Männer", "Männlich", "Liga der Frauen", "Weiblich", "<small>Minderwertige Kategorien</small>", "Territoriale Wettbewerbe", "<small>Benutzerdefinierte Wettbewerbe</small>",
            // Menu Competiciones 2
            "Jahreszeit", "Saison", "Spiel"
        ];
        break;
    }
    return arrayTexto;
}

function textoPro() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = [
            // Menu Superior
            "Menú Pro"
        ];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = [
            // Menu Superior
            "Pro Menu"
        ];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = [
            // Menu Superior
            "Menu Professionnel"
        ];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = [
            // Menu Superior
            "Profi-Menü"
        ];
        break;
    }
    return arrayTexto;
}


function textoMiClasificacion() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["Volver", "Mi Clasificación", "Clasificación General", "Clasificaciones Históricas"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["Back", "My Rating", "General Classification", "Historical Rankings"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["Revenir", "Ma note", "Classification générale", "Classements historiques"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["Hinter", "Meine Bewertung", "Allgemeine Klassifikation", "Historische Rankings"];
        break;
    }
    return arrayTexto;
}

function textoMiPlantilla() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["Volver", "Mi Plantilla"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["Back", "My Staff"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["Revenir", "Mon Équipe"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["Hinter", "Meine Mitarbeiter"];
        break;
    }
    return arrayTexto;
}

function textoEdicion() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = [
            // Menu Superior
            "", "Modo Edición", "Balonmano", "Baloncesto", "Futsal", "Liga Masculina", "Masculina", "Liga Femenina", "Femenina", "Categorías Inferiores", "Competiciones Territoriales", "Competiciones Personalizadas",
            // Menu Competiciones 2
            "Temporada", "Jornada", "Partido"
        ];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = [
            // Menu Superior
            "", "Edit mode", "Handball", "Basketball", "Futsal", "Men's League", "Men", "Women's League", "Women", "Inferior Categories", "Territorial Competitions", "Custom Competitions",
            // Menu Competiciones 2
            "Season", "Matchday", "Match"
        ];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = [
            // Menu Superior
            "", "Mode édition", "Handball", "Basketball", "Futsal", "Ligue masculine", "Masculin", "Ligue féminine", "Femelle", "<small>Catégories Inférieures</small>", "Compétitions territoriales", "Compétitions Personnalisées",
            // Menu Competiciones 2
            "Saison", "Journée", "Le Match"
        ];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = [
            // Menu Superior
            "", "Bearbeitungsmodus", "Handball", "Basketball", "Futsal", "Liga der Männer", "Männlich", "Liga der Frauen", "Weiblich", "<small>Minderwertige Kategorien</small>", "Territoriale Wettbewerbe", "<small>Benutzerdefinierte Wettbewerbe</small>",
            // Menu Competiciones 2
            "Jahreszeit", "Saison", "Spiel"
        ];
        break;
    }
    return arrayTexto;
}

function textoTipoTiro() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["Clásico", "De cadera", "En apoyo", "De rosca", "Vaselina", "Fly"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["Classic", "Hip", "Support", "Thread", "Vaseline", "Fly"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["Classique", "Hip", "Support", "Fil", "Vaseline", "Fly"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["Klassisch", "Hüfte", "Stütze", "Faden", "Vaseline", "Fliege"];
        break;
    }
    return arrayTexto;
}

function textoTipoPase() {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["Clásico", "Lateral", "De cadera", "Recurso", "Picado", "Suspensión"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["Classic", "Side", "Hip", "Resource", "Chopped", "Suspension"];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["Classique", "Côté", "Hanche", "Ressource", "Haché", "Suspension"];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["Klassisch", "Seite", "Hüfte", "Ressource", "Gehackt", "Federung"];
        break;
    }
    return arrayTexto;
}

function textoCondiciones() {
    "use strict";
    var idioma = verIdioma(),
        texto = "";
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        texto = "<h1><strong>Términos y Condiciones de Uso de BigDT</strong></h1>";
        texto += "         <p>Última actualización: 16-02-2023</p><br>";
        texto += "        <br><h1>1. Introducción</h1>";
        texto += "            <p>Lea detenidamente los presentes Términos y Condiciones de uso (en lo sucesivo, los <strong>términos</strong>) que rigen el uso que usted haga de los servicios personalizados de BigDT (que incluyen el acceso a los mismos) para la gestión de datos deportivos, incluidos todos nuestros sitios web y aplicaciones de software que incorporan o enlazan con los presentes Términos (conjuntamente, el <strong>servicio de BigDT</strong>) y cualquier otro material que se ponga a disposición a través del <strong>Servicio de BigDT</strong> (en lo sucesivo, el <strong>contenido</strong>).</p><br>";
        texto += "            <p>El uso del <strong>Servicio de BigDT</strong> podrá estar sujeto a términos y condiciones adicionales que establezca Jambitec, los cuales se incorporan a los presentes Términos mediante la presente referencia. </p><br>";
        texto += "            <p>Al suscribirse al <strong>Servicio de BigDT</strong>, o al utilizarlo de cualquier otro modo, usted acepta los presentes Términos. Si no acepta los presentes Términos, no deberá utilizar el <strong>Servicio de BigDT</strong> ni acceder a ningún Contenido. </p><br>";
        texto += "            <br><h1>Proveedor del Servicio</h1>";
        texto += "             <p>Los presentes Términos se establecen entre usted y Jambitec JLJP, Sociedad Limitada, con CIF B-90.442.302 y domicilio social en Calle Alhelí, número 9 Local Derecha, 41008 Sevilla, España.</p><br>";
        texto += "            <br><h1>Requisitos de edad y elegibilidad</h1>";
        texto += "            <p>Para poder utilizar el <strong>servicio de BigDT</strong> y acceder a cualquier Contenido, deberá (1) tener 12 años de edad (o la edad mínima equivalente en su país de origen) o más, (2) contar con el consentimiento de sus padres o de su tutor legal si es menor de edad en su país de origen; (3) estar facultado para celebrar un contrato vinculante con nosotros y no estar impedido para ello en virtud de la legislación aplicable, y (4) residir en un país en el que el Servicio esté disponible. Asimismo, garantiza que toda la información de registro que envíe a <strong>BigDT</strong> es veraz, precisa y completa, y se compromete a mantenerla así en todo momento. Si es menor de edad en su país de origen, su padre, madre o tutor legal deberá aceptar los presentes Términos en su nombre. Durante el proceso de registro podrá encontrar información adicional sobre los requisitos de edad mínima. Si no cumple los requisitos de edad mínima o el consentimiento de sus padres o de su tutor legal, <strong>BigDT</strong> no podrá registrarle como usuario.</p></br>";
        texto += "        <br><br><h1>2. El Servicio que ofrecemos</h1>";
        texto += "            <h1>Opciones del Servicio de BigDT</h1>";
        texto += "                 <p>Ofrecemos numerosas opciones de <strong>servicio de BigDT</strong>. Algunas opciones del <strong>servicio de BigDT</strong> se ofrecen de forma gratuita, mientras que otras opciones requieren un pago para poder acceder a las mismas. </p></br>";
        texto += "                 <p>El Servicio Pro puede no estar disponible para todos los usuarios. En el momento de la suscripción a los servicios, le explicaremos qué servicios están disponibles para usted. Si cancela su suscripción al Servicio Pro, o si su suscripción a dicho Servicio se interrumpe —por ejemplo, si cambia sus datos de pago—, es posible que no pueda volver a suscribirse al Servicio Pro. Tenga en cuenta que el Servicio Pro puede dejar de funcionar en el futuro, en cuyo caso ya no se le cobrará por el Servicio.</p></br>";
        texto += "             <h1>Pruebas</h1>";
        texto += "                 <p>Ocasionalmente, nosotros, o terceros en nuestro nombre, podremos ofrecer pruebas de Suscripciones de pago durante un periodo determinado sin pago o con una tarifa reducida. Al utilizar un <strong>servicio de BigDT</strong> mediante una Prueba, acepta las Términos de la oferta promocional de Suscripción Pro.</p></br>";
        texto += "             <h1>Aplicaciones, dispositivos y software de código abierto de terceros</h1>";
        texto += "                 <p>El <strong>servicio de BigDT</strong> podrá integrarse o interactuar de otro modo con aplicaciones, sitios web y servicios de terceros, así como con ordenadores personales, teléfonos móviles, tabletas, dispositivos portátiles, altavoces y otros dispositivos. El uso que usted haga de dichas Aplicaciones de terceros y de los Dispositivos podrá estar sujeto a los términos, condiciones y políticas adicionales que le facilite el tercero en cuestión. BigDT no garantiza que las Aplicaciones de terceros y los Dispositivos sean compatibles con el <strong>servicio de BigDT</strong>. </p></br>";
        texto += "             <h1>Limitaciones y modificaciones del Servicio</h1>";
        texto += "                 <p>Ponemos el máximo cuidado y esfuerzo para mantener el <strong>servicio de BigDT</strong> en funcionamiento y proporcionarle una experiencia profesional completa. No obstante, nuestra oferta de servicios y su disponibilidad podrán variar ocasionalmente, de conformidad con la legislación aplicable, sin que ello suponga responsabilidad alguna para usted, como por ejemplo:</p></br>";
        texto += "                 <ul>";
        texto += "                     <li>· Los <strong>servicio de BigDT</strong> podrán sufrir interrupciones temporales debidas a dificultades técnicas, a la realización de tareas de mantenimiento o pruebas, o a actualizaciones, incluidas aquellas necesarias para reflejar los cambios en las leyes y requisitos normativos pertinentes.</li>";
        texto += "                     <li>· Nuestro objetivo es evolucionar y mejorar nuestros Servicios constantemente, y podremos modificar, suspender o dejar de prestar, de forma permanente o temporal, la totalidad o parte del <strong>servicio de BigDT</strong>, incluyendo determinadas funciones, prestaciones, planes de suscripción y ofertas promocionales.</li>";
        texto += "                     <li>· BigDT no tiene ninguna obligación de proporcionar ningún contenido específico a través del <strong>servicio de BigDT</strong>, y BigDT o los propietarios correspondientes podrán retirar determinados Contenidos sin previo aviso.</li>";
        texto += "                 </ul>";
        texto += "                 <p>En el caso de que hubiera abonado directamente a BigDT las cuotas de una Suscripción de pago que BigDT suspenda antes de que finalice su Periodo de prepago, tal y como se define dicho término en la cláusula de Pagos y cancelaciones que figura a continuación, BigDT le reembolsará las cuotas prepagadas correspondientes al Periodo de prepago relativas a la parte no utilizada de su Suscripción de pago vigente en ese momento tras dicha suspensión. Para poder efectuar el reembolso, su cuenta y sus datos de facturación deberán estar actualizados.</p></br>";
        texto += "                 <p>BigDT no tendrá ninguna responsabilidad frente a usted, ni ninguna obligación de reembolsarle, en relación con las interrupciones o fallos de Internet o de otros servicios causados por acciones de las autoridades gubernamentales, de otros terceros o por acontecimientos que escapen a nuestro control.</p></br>";
        texto += "        <br><br><h1>3. Uso del Servicio</h1>";
        texto += "             <h1>Crear una cuenta de BigDT</h1>";
        texto += "                 <p>Para utilizar la totalidad o parte del <strong>servicio de BigDT</strong>, es posible que tenga que crear una cuenta de BigDT. Su nombre de usuario y su contraseña son exclusivamente para su uso personal y deberán ser confidenciales. Reconoce que es responsable de todo uso de su nombre de usuario y contraseña, incluido cualquier uso no autorizado. Notifique inmediatamente a nuestro equipo de Servicio Técnico si pierde o le roban su nombre de usuario o contraseña, o si cree que se ha producido un acceso no autorizado a su cuenta.</p><br>";
        texto += "                 <p>BigDT podrá reclamar o exigirle que cambie su nombre de usuario por cualquier motivo.</p><br>";
        texto += "             <h1>Sus derechos de uso del Servicio de BigDT</h1>";
        texto += "                 <strong>Acceso a los Servicios de BigDT</strong><br>";
        texto += "                     <p>Con sujeción al cumplimiento por su parte de los presentes Términos, incluidos cuantos términos y condiciones resulten de aplicación, le otorgamos un permiso limitado, no exclusivo y revocable para hacer un uso personal y no comercial del <strong>servicio de BigDT</strong> y del Contenido. Este Acceso permanecerá en vigor hasta que usted o BigDT lo rescindan. Acepta y se compromete a no redistribuir ni transferir el <strong>servicio de BigDT</strong> ni el Contenido.</p><br>";
        texto += "                     <p>Las aplicaciones de software de BigDT y el Contenido se conceden bajo licencia, no son objeto de venta ni de transferencia, y BigDT y sus licenciantes conservan la propiedad de todas las copias de las aplicaciones de software de BigDT y del Contenido, incluso después de su instalación en sus Dispositivos.</p><br>";
        texto += "                 <strong>Derechos de propiedad de BigDT</strong><br>";
        texto += "                     <p>El <strong>servicio de BigDT</strong> y el Contenido son propiedad de BigDT o de sus licenciantes. Todas las marcas comerciales, marcas de servicio, nombres comerciales, logotipos, nombres de dominio y cualquier otra característica de la marca BigDT son propiedad exclusiva de Jambitec o de sus licenciantes. Los presentes Términos no le otorgan ningún derecho de uso de las Características de la marca BigDT, con fines comerciales o no comerciales.</p><br>";
        texto += "                     <p>Usted se compromete a respetar las Directrices del usuario de BigDT y a no utilizar el <strong>servicio de BigDT</strong>, el Contenido ni ninguna parte del mismo de ninguna manera que no esté expresamente permitida por los presentes Términos.</p><br>";
        texto += "             <h1>Pagos y cancelación</h1>";
        texto += "                 <strong>Facturación</strong><br>";
        texto += "                     <p>Puede adquirir una Suscripción de pago directamente a BigDT o a través de un tercero, ya sea mediante:</p><br>";
        texto += "                     <ol>";
        texto += "                         <li>· El pago por adelantado de una cuota de suscripción mensual o de cualquier otro plazo periódico que se le comunique antes de la compra; o</li>";
        texto += "                         <li>· El prepago que le da acceso al <strong>servicio de BigDT</strong> durante un periodo de tiempo específico.</li>";
        texto += "                     </ol>";
        texto += "                     <p>Los tipos impositivos se calculan en función de la información que usted proporcione y del tipo aplicable en el momento de su cargo periódico.</p><br>";
        texto += "                     <p>Si adquiere el acceso a una Suscripción de pago a través de un tercero, podrán aplicarse al uso que usted haga del <strong>servicio de BigDT</strong>unos términos y condiciones independientes con dicho tercero, además de los presentes Términos. Si adquiere una Suscripción de pago utilizando un código, una tarjeta regalo, una oferta de prepago o cualquier otra oferta proporcionada o vendida por BigDT o en su nombre para acceder a una Suscripción de pago, acepta por el presente documento los Términos de BigDT.</p><br>";
        texto += "                 <strong>Cambios de precios e impuestos</strong><br>";
        texto += "                     <p>BigDT podrá modificar ocasionalmente el precio de las Suscripciones de pago, incluidas las cuotas de suscripción periódicas, el Periodo de prepago, para los periodos aún no pagados, o los Códigos, definidos anteriormente, y le comunicará cualquier cambio de precio con la debida antelación. Los cambios de precio entrarán en vigor al inicio del siguiente periodo de suscripción que siga a la fecha del cambio de precio. Con arreglo a la legislación aplicable, si sigue utilizando el <strong>servicio de BigDT</strong> una vez que el cambio de precio entre en vigor, se entenderá que ha aceptado el nuevo precio. Si no está de acuerdo con un cambio de precio, podrá rechazar dicho cambio dándose de baja de la Suscripción de pago correspondiente antes de que el cambio de precio entre en vigor.</p><br>";
        texto += "                     <p>Los tipos impositivos se basan en los tipos aplicables en el momento de su cobro periódico. Estos importes podrán cambiar con el tiempo en función de los requisitos fiscales locales de su país, estado, territorio o incluso ciudad. Cualquier cambio en el tipo impositivo se aplicará automáticamente en función de la información de la cuenta que proporcione.</p><br>";
        texto += "                 <strong>Renovación y cancelación</strong><br>";
        texto += "                     <p>Con la excepción de las Suscripciones de pago de un Periodo de prepago, su pago a BigDT o al tercero a través del cual adquirió la Suscripción de pago se renovará automáticamente al final del periodo de suscripción aplicable, a menos que cancele su Suscripción de pago antes de que finalice el periodo de suscripción en curso. Póngase en contacto con nuestro equipo de Atención al Cliente para obtener instrucciones sobre cómo proceder a la cancelación. La cancelación entrará en vigor el día siguiente al último día del periodo de suscripción actual, y se le cambiará a la versión gratuita del <strong>servicio de BigDT</strong>. No proporcionamos reembolsos ni créditos por ningún periodo de suscripción parcial, salvo que se indique expresamente en los presentes Términos.</p><br>";
        texto += "                     <p>Si ha adquirido una Suscripción de pago utilizando un Código, su suscripción terminará automáticamente al final del periodo indicado en el Código, o cuando no tenga un saldo prepagado suficiente para pagar el <strong>servicio de BigDT</strong>.</p><br>";
        texto += "                 <strong>Derecho de desistimiento</strong><br>";
        texto += "                     <p>Si se suscribe a una Prueba, acepta que el derecho de desistimiento de la Suscripción de pago por la que recibe una Prueba finaliza catorce (14) días después de iniciar la Prueba. Si no cancela la Suscripción de pago antes de que finalice la Prueba, perderá su derecho de desistimiento y autorizará a BigDT a cobrarle automáticamente el precio acordado cada mes hasta que cancele la Suscripción de pago. En el caso de pruebas inferiores a catorce (14) días, usted consiente expresamente que le proporcionemos el servicio de pago inmediatamente después de que finalice su Prueba y que a partir de ese momento pierda su derecho de desistimiento.</p><br>";
        texto += "                     <p>Si adquiere una Suscripción de pago sin Prueba, acepta que tiene catorce (14) días después de su compra para desistir por cualquier motivo y deberá pagarnos los servicios prestados hasta el momento en que nos comunique que ha cambiado de opinión. Consiente expresamente la prestación del servicio inmediatamente después de su compra, la pérdida del derecho de desistimiento y autoriza a BigDT a cobrarle automáticamente cada mes hasta que se dé de baja.</p><br>";
        texto += "             <h1>Directrices del usuario</h1>";
        texto += "                 <p>Hemos adoptado unas directrices para el uso del <strong>servicio de BigDT</strong>, destinadas a garantizar que dicho Servicio siga siendo agradable para todos. Al utilizar el <strong>servicio de BigDT</strong>, deberá cumplir las Directrices del usuario de BigDT, así como todas las leyes, normas y normativas aplicables, y respetar la propiedad intelectual, la privacidad y otros derechos de terceros.</p><br>";
        texto += "                 <p>Es posible que actualicemos las Directrices de usuario y las Normas de la plataforma de vez en cuando; puede encontrar la versión más reciente en nuestro <strong>servicio de BigDT</strong>.</p><br>";
        texto += "                 <p>La infracción de las Directrices de usuario o las Normas de la plataforma puede generar la eliminación de cualquier contenido o material que usted haya aportado a los Servicios o la cancelación o suspensión de su cuenta. Intentamos que los Servicios estén disponibles para todo el mundo, pero no puede usar nuestros Servicios si cancelamos su cuenta de cualquiera de nuestros Servicios con anterioridad. También prohibimos los intentos de elusión previa a nuestras acciones de cumplimiento, incluida la creación de nuevas cuentas.</p><br>";
        texto += "                 <p>No se permiten las siguientes acciones por motivo alguno en relación con los Servicios y el material o contenido disponible en los Servicios, o cualquier parte de estos: </p>";
        texto += "                 <ol>";
        texto += "                     <li>· Aplicarles ingeniería inversa, descompilarlos, desmontarlos, modificarlos o crear obras derivadas, excepto cuando tales restricciones estén expresamente prohibidas en virtud de la legislación pertinente. Si la legislación pertinente le permite descompilar cualquier parte de los Servicios o el Contenido cuando sea necesario para obtener la información necesaria a fin de crear un programa independiente que se pueda operar con los Servicios u otros programas, la información que obtenga de tales actividades (a) solo puede usarse para el objetivo anterior, (b) no se puede divulgar ni comunicar sin un consentimiento previo por escrito de BigDT a ningún tercero a quien no sea necesario divulgarla o comunicarla para lograr el objetivo, y (c) no se puede usar para crear ningún software o servicio que sea considerablemente similar a ninguna parte de los Servicios o el Contenido en su expresión.</li>";
        texto += "                     <li>· Copiarlos, reproducirlos, redistribuirlos, \"imitarlos\", grabarlos, transferirlos, presentarlos, enmarcarlos, enlazarlos o mostrarlos al público, transmitirlos o ponerlos a disposición del público, o cualquier otro uso que no esté expresamente permitido en el marco de los Acuerdos o la legislación pertinente, o que infrinja de otra manera los derechos de propiedad intelectual.</li>";
        texto += "                     <li>· Importar o copiar cualquier archivo local que usted no tenga el derecho legal de importar o copiar de esta manera.</li>";
        texto += "                     <li>· Transferir copias del Contenido almacenado en el caché desde un dispositivo autorizado a cualquier otro dispositivo mediante cualquier medio.</li>";
        texto += "                     <li>· El \"rastreo\" o la \"extracción\", ya sea por medios manuales o automatizados, o usar cualquier medio automatizado (incluidos los bots, las paletas y los spiders) para ver información, acceder a esta o recopilarla.</li>";
        texto += "                     <li>· Realizar ventas, arriendos, sublicenciamientos, alquileres u otra monetización, excepto según lo permitido expresamente en el marco de los Acuerdos.</li>";
        texto += "                     <li>· Vender una cuenta, o aceptar u ofrecerse a aceptar cualquier compensación, financiera o de otro tipo, para influenciar el nombre de una cuenta o algoritmo derivado de los datos introducidos.</li>";
        texto += "                     <li>· Aumentar de forma artificial el conteo de acciones antes, durante o después de los partidos, promover Contenido de forma artificial u otras manipulaciones, como (i) usar cualquier bot, script u otros procesos automatizados, (ii) proporcionar o aceptar cualquier tipo de compensación (financiera o de otro tipo) o (iii) cualquier otro medio.</li>";
        texto += "                     <li>· Eludir cualquier tecnología usada por BigDT, sus licenciatarios o cualquier tercero, incluida cualquier restricción territorial o de acceso a contenido aplicada por BigDT o sus licenciatarios.</li>";
        texto += "                     <li>· Eludir o bloquear anuncios, o crear o distribuir herramientas diseñadas para bloquear anuncios.</li>";
        texto += "                     <li>· Eliminar o alterar cualquier aviso de derechos de autor, marca comercial u otros avisos de propiedad intelectual (incluso con el propósito de disimular o cambiar cualquier indicación de propiedad o fuente) .</li>";
        texto += "                     <li>· Eliminar o alterar cualquier parte de los Servicios o Contenido, excepto según lo permitido expresamente en el marco de los Acuerdos o, en el caso de que otro usuario haga que algún Contenido esté disponible, con el consentimiento expreso de tal usuario.</li>";
        texto += "                     <li>· Proporcionar su contraseña a cualquier otra persona o usar el nombre de usuario y contraseña de cualquier otra persona.</li>";
        texto += "                 </ol><br>";
        texto += "                 <p>Respete a BigDT, a los propietarios del material y contenido en los Servicios, y a otros usuarios de los Servicios. No participe en ninguna actividad, no publique ningún Contenido de usuario ni registre ni use ningún nombre de usuario que consista en material como el descrito a continuación o que lo contenga: </p>";
        texto += "                 <ol>";
        texto += "                     <li>· Que sea ilegal o esté destinado a promover o cometer un acto ilícito de cualquier tipo, incluidas infracciones de los derechos de propiedad intelectual, derechos de privacidad, derechos de publicidad o derechos de propiedad de BigDT o algún tercero, o que infrinja cualquier acuerdo del cual sea parte, por ejemplo, un acuerdo de grabación o un acuerdo de publicación exclusivo.</li>";
        texto += "                     <li>· Que incluya su contraseña o la de otro usuario de forma deliberada, que contenga datos personales de terceros de forma deliberada o que tenga la intención de solicitar tales datos.</li>";
        texto += "                     <li>· Que exponga información confidencial o de propiedad de un tercero, o información personal sobre usted mismo que no desee transmitir a personas de todo el mundo, especialmente relativo a usuarios menores de edad.</li>";
        texto += "                     <li>· Que tenga contenido malicioso como malware, caballos de Troya o virus, o interfiera de otro modo con el acceso de cualquier usuario al <strong>servicio de BigDT</strong>.</li>";
        texto += "                     <li>· Que imite o falsifique su afiliación a BigDT (incluidos, por ejemplo, el uso del contenido con derechos de autor de BigDT, el uso del logotipo de BigDT sin permiso u otros usos de las marcas comerciales de BigDT de manera confusa), otro usuario, persona o entidad, o sea de otro modo fraudulento, falso o engañoso.</li>";
        texto += "                     <li>· Que implique la transmisión de correos masivos no solicitados u otras formas de spam, correo basura, cadenas o similares.</li>";
        texto += "                     <li>· Actividades comerciales o de ventas no autorizadas, tales como anuncios, promociones, concursos, loterías, apuestas o estafas piramidales.</li>";
        texto += "                     <li>· Que se vincule a productos o servicios, haga referencia estos o los promueva de forma no autorizada, excepto según lo expresamente autorizado por BigDT.</li>";
        texto += "                     <li>· Que interfiera o interrumpa de alguna manera el <strong>servicio de BigDT</strong>, que manipule, infrinja o intente sondear, escanear o probar vulnerabilidades del <strong>servicio de BigDT</strong> o los sistemas informáticos, la red, las reglas de uso o cualquiera de los componentes de seguridad, medidas de autenticación o cualquier otra medida de protección de BigDT aplicables al Servicio, el Contenido de BigDT o cualquier parte de estos.</li>";
        texto += "                     <li>· Que cause conflicto con los Términos y Condiciones de uso de BigDT o cualquier otro término o política aplicable a su uso de los Servicios.</li>";
        texto += "                     <li>· Que se haya eliminado de cualquiera de nuestros servicios por infringir nuestros términos o políticas. Esto incluye los contenidos creados o adaptados para reconstituir o cumplir el mismo objetivo que el Contenido eliminado previamente.</li>";
        texto += "                 </ol>";
        texto += "        <br><br><h1>4. Contenido y Derechos de propiedad intelectual</h1>";
        texto += "             <h1>Contenido de usuario</h1>";
        texto += "                 <strong>El contenido que usted publica en el servicio</strong><br>";
        texto += "                     <p>Los usuarios de BigDT podrán publicar, cargar o aportar de otro modo contenidos al <strong>servicio de BigDT</strong>. Para evitar dudas, el usuario incluye toda la información, los materiales y otros contenidos que sean añadidos, creados, cargados, enviados, distribuidos o publicados en el <strong>servicio de BigDT</strong> por los usuarios.</p><br>";
        texto += "                     <p>Usted es el único responsable de todo el Contenido de usuario que publique.</p><br>";
        texto += "                     <p>Promete que, con respecto a cualquier Contenido de usuario que publique en BigDT, (1) es usted propietario o tiene derecho a publicar dicho Contenido de usuario; (2) dicho Contenido de usuario, o su uso por parte de BigDT en virtud de la licencia concedida a continuación, no (i) infrinja los presentes Términos, la legislación aplicable o los derechos de propiedad intelectual o de otro tipo de terceros; o (ii) dicho Contenido de usuario no implique ninguna afiliación o respaldo hacia usted o su Contenido de usuario por parte de BigDT o de cualquier otra persona o entidad sin el consentimiento previo y expreso de BigDT o de dicha persona o entidad.</p><br>";
        texto += "                     <p>Al publicar o compartir Contenidos de usuario u otra información en el <strong>servicio de BigDT</strong>, deberá tener en cuenta que los contenidos y demás información serán accesibles públicamente y podrán ser utilizados y compartidos por otros en el <strong>servicio de BigDT</strong> y en toda la red, por lo que le recomendamos que tenga cuidado al publicar o compartir en el <strong>servicio de BigDT</strong>, y que sea consciente de la configuración de su cuenta. BigDT no es responsable de lo que usted u otras personas publiquen o compartan en el <strong>servicio de BigDT</strong>.</p><br>";
        texto += "                 <strong>Supervisión del Contenido de usuario</strong><br>";
        texto += "                     <p>BigDT podrá supervisar o revisar el Contenido de usuario, pero no tiene obligación de hacerlo. BigDT se reserva el derecho de eliminar o inhabilitar el acceso a cualquier Contenido de usuario por cualquier motivo o sin él. BigDT podrá tomar estas medidas sin previo aviso.</p><br>";
        texto += "             <h1>Licencias que nos concede</h1>";
        texto += "                 <strong>Contenido de usuario</strong><br>";
        texto += "                     <p>Usted conserva la propiedad de su Contenido de usuario cuando lo publica en el Servicio. No obstante, para que podamos poner su Contenido de usuario a disposición del <strong>servicio de BigDT</strong>, necesitamos que nos conceda una licencia limitada sobre dicho Contenido de usuario. En consecuencia, usted concede a BigDT una licencia no exclusiva, transferible, sublicenciable, libre de derechos, totalmente pagada e irrevocable, a escala mundial, para reproducir, poner a disposición, ejecutar y mostrar, traducir, modificar, crear obras derivadas, distribuir y utilizar de cualquier otro modo dicho Contenido de usuario a través de cualquier medio, ya sea solo o en combinación con otros Contenidos o materiales, de cualquier forma y por cualquier medio, método o tecnología, conocidos en la actualidad o que se creen en el futuro, en relación con el <strong>servicio de BigDT</strong>. Cuando proceda y en la medida en que lo permita la legislación aplicable, también acepta renunciar, y no hacer valer, cualquier reclamación o derechos equivalentes, como su derecho a ser identificado como autor de cualquier Contenido de usuario, incluidas las Opiniones, y su derecho a oponerse al tratamiento despectivo de dicho Contenido de usuario.</p><br>";
        texto += "                 <strong>Opiniones</strong><br>";
        texto += "                     <p>Si usted aporta ideas, sugerencias u otros comentarios en relación con su uso del <strong>servicio de BigDT</strong> o de cualquier Contenido, dichas Opiniones no son confidenciales y podrán ser utilizadas por BigDT sin restricciones y sin que usted reciba pago alguno. Las Opiniones tienen la consideración de un tipo de Contenido de usuario en virtud de los presentes Términos.</p><br>";
        texto += "                 <strong>Su Dispositivo</strong><br>";
        texto += "                     <p>Asimismo, nos concede el derecho (1) de permitir que el <strong>servicio de BigDT</strong> utilice el procesador, el ancho de banda y el hardware de almacenamiento de su Dispositivo con el fin de facilitar el funcionamiento del <strong>servicio de BigDT</strong>, (2) de proporcionarle publicidad y otra información, y de permitir que nuestros socios comerciales hagan lo mismo, en la medida en que esté permitido de conformidad con la Política de privacidad de BigDT.</p><br>";
        texto += "             <h1>Experiencia de contenido</h1>";
        texto += "                 <p>En cualquier parte del <strong>servicio de BigDT</strong>, el Contenido al que usted acceda, incluida su selección y colocación, podrá estar condicionado por consideraciones comerciales, incluidos los acuerdos de BigDT con terceros.</p><br>";
        texto += "             <h1>Reclamaciones por infracción</h1>";
        texto += "                 <p>BigDT respeta los derechos de los titulares de la propiedad intelectual. Si cree que algún Contenido infringe sus derechos de autor, consulte la Política de Copyright de BigDT.</p><br>";
        texto += "             <h1>Política de Copyright de BigDT</h1>";
        texto += "                 <p>BigDT respeta los derechos de propiedad intelectual y espera que sus usuarios hagan lo mismo. Si usted es titular de derechos de autor o copyright, o su agente, y considera que alguno de los materiales protegidos con copyright que están disponibles directamente a través del <strong>servicio de BigDT</strong> vulnera sus derechos, por favor háganoslo saber.</p><br>";
        texto += "                 <p>Escríbanos a <strong>serviciotecnico@bigdt.es</strong> para enviar la notificación de la presunta infracción de los derechos de copyright. Otra alternativa es enviar la notificación a nuestro agente legal de BigDT a la siguiente dirección: </p><br>";
        texto += "                 <p>Jambitec JLJP, SL</p>";
        texto += "                 <p>A/a: Servicio Legal BigDT</p>";
        texto += "                 <p>Calle Alhelí, número 9 Local Derecha</p>";
        texto += "                 <p>41008 Sevilla</p>";
        texto += "                 <p>España</p><br><br>";
        texto += "                 <p>Debe dirigirse una notificación de la supuesta infracción de derechos de autor o copyright al agente legal de BigDT como se indica arriba. Por favor incluya información lo más detallada posible para que podamos identificar los hechos y circunstancias, incluyendo, en la medida de lo posible: </p><br>";
        texto += "                 <ul>";
        texto += "                     <li>· Una firma manuscrita o electrónica del titular de los derechos de autor o copyright supuestamente infringidos (o de la persona autorizada para actuar en su nombre); </li>";
        texto += "                     <li>· Identificación específica de cada elemento cuyos derechos de autor o copyright hayan sido supuestamente infringidos; </li>";
        texto += "                     <li>· Una descripción de dónde se halla localizado en el <strong>servicio de BigDT</strong> o las Webs de BigDT el material cuyos derechos de autor o copyright se consideran infringidos (por favor provea el máximo detalle posible y facilite una captura de pantalla para ayudarnos a localizar el material que está denunciando); </li>";
        texto += "                     <li>· Información de contacto de la parte reclamante, tal como el nombre completo, dirección, número de teléfono y dirección de correo electrónico; </li>";
        texto += "                     <li>· Una declaración conforme la parte reclamante cree de buena fe que el uso del (de los) trabajo(s) en el modo por el que se reclama no está autorizado por el titular de los derechos de copyright, su agente, o la ley; y</li>";
        texto += "                     <li>· Una declaración conforme la información proporcionada en la notificación es precisa, y la parte reclamante es la titular del derecho supuestamente infringido, o su agente.</li>";
        texto += "                 </ul>";
        texto += "                 <p>También consideramos oportuno hacerle saber que BigDT tiene una política para cancelar, en las circunstancias apropiadas, las cuentas de aquellos abonados que sean infractores recurrentes.</p><br><br>";
        texto += "                 <p>Copyright © 2023 Jambitec JLJP, S.L. Todos los derechos reservados.</p><br><br>";
        texto += "                 <p>Jambitec JLJP, Sociedad Limitada</p>";
        texto += "                 <p>Calle Alhelí, número 9 Local Derecha</p>";
        texto += "                 <p>41008 Sevilla</p>";
        texto += "                 <p>España</p>";
        texto += "                 <p>CIF: B-90.442.302</p><br>";
        texto += "        <br><br><h1>5. Asistencia al cliente, información, preguntas y reclamaciones</h1>";
        texto += "            <p>Para obtener asistencia al cliente con preguntas relacionadas con la cuenta y el pago, utilice la dirección <strong>serviciotecnico@bigdt.es</strong>.</p><br>";
        texto += "            <p>Igualmente, si tiene alguna pregunta relativa al <strong>servicio de BigDT</strong> o a los presentes Términos (incluidos los términos y condiciones adicionales de Bigdt incorporados en el presente documento), póngase en contacto también en la dirección <strong>serviciotecnico@bigdt.es</strong>.</p><br>";
        texto += "            <p>Si reside en la Unión Europea, también podrá presentar una reclamación en la plataforma en línea para la resolución alternativa de controversias (plataforma ODR). Puede acceder a la plataforma ODR a través del siguiente enlace: <a href='https://ec.europa.eu/consumers/odr' target='_blank'>https://ec.europa.eu/consumers/odr</a>.</p><br>";
        texto += "        <br><br><h1>6. Problemas y controversias</h1>";
        texto += "            <h1>Suspensión y finalización de los Servicios de BigDT</h1>";
        texto += "                <p>Los presentes Términos seguirán siendo de aplicación en su caso hasta que sean resueltos por usted o por BigDT. BigDT podrá rescindir los presentes Términos, incluidos los términos y condiciones adicionales que se incorporen al presente documento, o suspender su acceso al <strong>servicio de BigDT</strong> en cualquier momento si consideramos que ha incumplido cualquiera de los presentes Términos, si dejamos de prestar el <strong>servicio de BigDT</strong> o cualquier componente material del mismo con un preaviso razonable, o si consideramos que es necesario para cumplir con la legislación aplicable. En caso de que usted o BigDT rescindan los presentes Términos, o en caso de que BigDT suspenda su acceso al <strong>servicio de BigDT</strong>, acepta que BigDT, con sujeción a la legislación aplicable, no asumirá responsabilidad alguna frente a usted y, salvo lo dispuesto expresamente en los presentes Términos, BigDT no le reembolsará ninguna cantidad que haya abonado. Podrá rescindir los presentes Términos en cualquier momento, y en tal caso no podrá seguir accediendo ni utilizando el <strong>servicio de BigDT</strong>. Si desea saber cómo cancelar su cuenta de BigDT, utilice los recursos de Atención al Cliente en nuestra dirección <strong>serviciotecnico@bigdt.es</strong>.</p><br>";
        texto += "                <p>Los apartados o cláusulas de los presentes Términos que, explícitamente o por su naturaleza, deba permanecer en vigor incluso tras la extinción de los presentes Términos, seguirán vigentes.</p><br>";
        texto += "            <h1>Exenciones de responsabilidad sobre la garantía</h1>";
        texto += "                <p>BigDT prestará el <strong>servicio de BigDT</strong> con la diligencia y competencia razonables y de conformidad con cualquier especificación del <strong>servicio de BigDT</strong> facilitada por BigDT, si bien, con sujeción a lo anterior, el <strong>servicio de BigDT</strong> se presta según disponibilidad, sin garantías de ningún tipo, ya sean expresas, implícitas o legales. Asimismo, BigDT y todos los propietarios de contenidos renuncian a cualquier garantía expresa, implícita y legal en relación con los contenidos, incluidas las garantías de calidad satisfactoria, comerciabilidad, idoneidad para un fin determinado o de no infracción. Ni BigDT ni ningún propietario de contenidos garantiza que el <strong>servicio de BigDT</strong> o los contenidos estén libres de malware o de otros componentes dañinos. Por otra parte, BigDT no hace ninguna declaración, ni garantiza ni asume responsabilidad alguna, en relación con las aplicaciones de terceros (o el contenido de las mismas), los contenidos de los usuarios, los dispositivos o cualquier producto o servicio anunciado, promocionado u ofrecido por un tercero en el <strong>servicio de BigDT</strong>o en cualquier sitio web con hipervínculos, o a través de los mismos, y BigDT no es responsable de las transacciones entre usted y los terceros proveedores de lo que antecede. Ningún consejo ni información, verbal o por escrito, que usted obtenga de BigDT dará lugar a ninguna garantía en nombre de BigDT.</p><br>";
        texto += "                <p>Algunas jurisdicciones no permiten la exclusión de las garantías implícitas ni la limitación de los derechos legales aplicables a un consumidor, por lo que la exclusión y las limitaciones de la presente cláusula pueden no ser de aplicación en su caso y sus derechos legales no se verán afectados.</p><br>";
        texto += "            <h1>Limitación de la responsabilidad y plazo para presentar una reclamación</h1>";
        texto += "                <p>Con arreglo a la legislación aplicable, acepta que su único y exclusivo recurso en caso de problemas o insatisfacción con el <strong>servicio de BigDT</strong> es desinstalar cualquier software de BigDT y dejar de utilizar el <strong>servicio de BigDT</strong>. Asimismo, acepta que BigDT no tiene ninguna obligación ni responsabilidad derivada de las aplicaciones de terceros o del contenido de las mismas puestas a disposición a través del <strong>servicio de BigDT</strong> o en relación con el mismo, y si bien su relación con dichas aplicaciones de terceros podrá regirse por acuerdos independientes con dichos terceros, su único y exclusivo recurso, en lo que respecta a BigDT, para cualquier problema o insatisfacción con las aplicaciones de terceros o el contenido de las mismas, es desinstalar o dejar de utilizar dichas aplicaciones de terceros.</p><br>";
        texto += "                <p>En ningún caso BigDT, sus directivos, accionistas, empleados, agentes, consejeros, empresas subsidiarias, filiales, sucesores, cesionarios, proveedores o licenciantes serán responsables de (1) ningún daño indirecto, especial, incidental, punitivo, ejemplar o consecuente; (2) ninguna pérdida de uso, datos, negocio o beneficios, directa o indirecta, en todos los casos derivados del uso o de la imposibilidad de usar el <strong>servicio de BigDT</strong>, los dispositivos, las aplicaciones de terceros o el contenido de las aplicaciones de terceros; o (3) una responsabilidad agregada por todas las reclamaciones relacionadas con el <strong>servicio de BigDT</strong>, las aplicaciones de terceros o el contenido de las aplicaciones de terceros superior a la mayor de las siguientes cantidades: (a) las cantidades pagadas por usted a BigDT durante los doce meses anteriores a la primera reclamación; o (b) 30,00 €. Cualquier responsabilidad que nos corresponda por las pérdidas que sufra se limitará estrictamente a las pérdidas que sean razonablemente previsibles.</p><br>";
        texto += "                <p>A modo de aclaración, los presentes Términos no limitan la responsabilidad de BigDT en caso de fraude, falsedad fraudulenta, muerte o daños personales en la medida en que la legislación aplicable prohíba dicha limitación y por cualquier otra responsabilidad que, en virtud de la legislación aplicable, no pueda ser limitada o excluida.</p><br>";
        texto += "                <p>Salvo en aquellos casos en los que dicha restricción esté prohibida por la legislación aplicable, cualquier reclamación que surja en virtud de los presentes Términos debe iniciarse mediante la presentación de una solicitud de arbitraje o la interposición de una demanda individual en virtud del acuerdo de arbitraje que figura a continuación, en el plazo de un (1) año a partir de la fecha en la que la parte que hace valer la reclamación tenga conocimiento por primera vez, o deba tenerlo, del acto, la omisión o el incumplimiento que haya dado lugar a la reclamación, y no existirá derecho a ningún tipo de recurso por cualquier reclamación que no se haga valer dentro de dicho plazo.</p><br>";
        texto += "            <h1>Derechos de terceros</h1>";
        texto += "                <p>Reconoce y acepta que los propietarios del Contenido y ciertos distribuidores, como los proveedores de tiendas de aplicaciones, son beneficiarios de los presentes Términos y tienen derecho a hacerlos cumplir directamente en su contra. Al margen de lo establecido en el presente apartado, los presentes Términos no pretenden otorgar derechos a ninguna otra persona, salvo a usted y a BigDT, y en ningún caso los presentes Términos crearán derechos de terceros beneficiarios.</p><br>";
        texto += "                <p>Si ha descargado cualquiera de nuestras aplicaciones de software para móvil de App Store de Apple Inc. o si utiliza la aplicación en un dispositivo iOS, reconoce que ha leído, comprendido y acepta el siguiente aviso relativo a Apple. Los presentes Términos se establecen únicamente entre usted y BigDT, no con Apple, y Apple no es responsable del <strong>servicio de BigDT</strong> ni del contenido del mismo. Apple no tiene obligación alguna de proporcionar ningún servicio de mantenimiento y soporte con respecto al <strong>servicio de BigDT</strong>. En caso de que el <strong>servicio de BigDT</strong> no cumpla alguna de las garantías aplicables, podrá notificar a Apple, y Apple le reembolsará el precio de compra aplicable da la aplicación y, en la medida en que lo permita la ley aplicable, Apple no tendrá ninguna otra obligación de garantía con respecto al <strong>servicio de BigDT</strong>. Apple no se hace responsable de atender ninguna reclamación que usted o un tercero presente en relación con el <strong>servicio de BigDT</strong> o con su posesión o uso del <strong>servicio de BigDT</strong>, incluyendo (1) reclamaciones de responsabilidad del producto; (2) cualquier reclamación acerca de que el <strong>servicio de BigDT</strong> no cumple algún requisito legal o normativo aplicable; (3) reclamaciones que surjan en el marco de la legislación sobre protección del consumidor o legislación similar; y (4) reclamaciones con respecto a la infracción de la propiedad intelectual. Apple no se hace responsable de la investigación, defensa, resolución y descargo de cualquier reclamación de terceros en el sentido de que el <strong>servicio de BigDT</strong> o su posesión y uso de la aplicación por su parte infringen los derechos de propiedad intelectual de dicho tercero. Acepta cumplir los términos de terceros aplicables cuando utilice el <strong>servicio de BigDT</strong>. Apple, y las filiales de Apple, son terceros beneficiarios de los presentes Términos, y una vez que usted los acepte, Apple tendrá el derecho, y se considerará que ha aceptado el derecho, de hacer cumplir estos Términos contra usted como tercero beneficiario de los mismos.</p><br>";
        texto += "            <h1>Indemnización</h1>";
        texto += "                <p>Acepta indemnizar a BigDT y eximirle de toda responsabilidad por las pérdidas directas razonablemente previsibles, los daños y perjuicios y los gastos razonables (incluidos los honorarios razonables de los abogados y las costas) que sufra o en los que incurra BigDT como consecuencia de o en relación con (1) el incumplimiento por su parte de cualquiera de los presentes Términos (incluidos los términos y condiciones adicionales de BigDT incorporados en el presente documento); (2) cualquier Contenido de usuario que usted publique o aporte de cualquier otro modo; (3) cualquier actividad en la que participe en el <strong>servicio de BigDT</strong> o a través del mismo; y (4) la violación por su parte de cualquier ley o de los derechos de un tercero.</p><br>";
        texto += "            <h1>Ley aplicable, arbitraje obligatorio y jurisdicción</h1>";
        texto += "                 <p>Para resolver cualquier discrepancia legal referente a este Contrato o al <strong>servicio de BigDT</strong> en sí, ambas partes acudirán a los Tribunales de la ciudad de Sevilla, España.</p><br>";
        texto += "                 <p>En caso que la Normativa vigente lo estime necesario, el lugar para resolver dichas discrepancias serán los Tribunales de la ciudad origen del usuario.</p><br>";
        texto += "        <br><br><h1>7. Acerca de los presente Términos y Condiciones</h1>";
        texto += "            <p>De acuerdo con la legislación aplicable, usted podrá tener ciertos derechos que no podrán verse limitados por ningún contrato. Los presentes Términos no pretenden en modo alguno restringir dichos derechos.</p><br>";
        texto += "            <h1>Cambios</h1>";
        texto += "                <p>Nos reservamos el derecho de modificar los presentes Términos (incluidos los términos y condiciones adicionales de BigDT incorporados en el presente documento por referencia) puntualmente, notificándole dichos cambios por cualquier medio razonable (antes de que entren en vigor), incluyendo la publicación de un Contrato revisado en el <strong>servicio de BigDT</strong> correspondiente (siempre que, en el caso de cambios sustanciales, tratemos de complementar dicha notificación por correo electrónico, un mensaje emergente en el servicio u otros medios). Dichos cambios no serán de aplicación a ninguna controversia entre usted y nosotros que surja antes de la fecha en la que publiquemos los Términos revisados, u otros términos y condiciones de BigDT, que incorporen dichos cambios, o que le notifiquemos de otro modo dichos cambios. El uso que usted haga del <strong>servicio de BigDT</strong> después de cualquier modificación de los presentes Términos constituirá su aceptación de dichos cambios. Si no desea seguir utilizando el <strong>servicio de BigDT</strong> con arreglo a los Términos actualizados, podrá cancelar su cuenta poniéndose en contacto con nosotros. La fecha de entrada en vigor que figura en la parte superior del presente documento indica cuándo se modificaron por última vez los presentes Términos.</p><br>";
        texto += "            <h1>Contrato completo</h1>";
        texto += "                <p>Salvo lo dispuesto en la presente cláusula o lo acordado explícitamente por escrito entre usted y BigDT, los presentes Términos constituyen todos los términos y condiciones acordados entre usted y BigDT y sustituyen a cualquier contrato anterior en relación con el objeto de los presentes Términos, ya sea por escrito o verbal. Tal y como se ha indicado anteriormente, se incorporan al presente documento por referencia otros términos y condiciones que rigen el uso del <strong>servicio de BigDT</strong>.</p><br>";
        texto += "            <h1>Divisibilidad y renuncia</h1>";
        texto += "                <p>Salvo que se indique lo contrario en los presentes Términos, en caso de que alguna disposición de los mismos se considere inválida o inaplicable por cualquier motivo o en cualquier medida, las restantes disposiciones de los presentes Términos no se verán afectadas, y la aplicación de dicha disposición se llevará a cabo en la medida permitida por la ley.</p><br>";
        texto += "                <p>El hecho de que BigDT o cualquier tercero beneficiario no haga cumplir los presentes Términos o cualquier disposición de las mismas no supondrá una renuncia al derecho de BigDT o de dicho tercero beneficiario a hacerlo.</p><br>";
        texto += "            <h1>Cesión</h1>";
        texto += "                <p>BigDT podrá ceder la totalidad o parte de los presentes Términos, y podrá ceder o delegar, total o parcialmente, cualquiera de sus derechos u obligaciones en virtud de los presentes Términos. Usted no podrá ceder los presentes Términos, en su totalidad o en parte, ni transferir o sublicenciar sus derechos en virtud de los mismos, a ningún tercero.</p><br>";
        texto += "        <br><br><h1>8. Política de privacidad</h1>";
        texto += "             <h1>Tus derechos</h1>";
        texto += "                 <p>La <a href='http://www.europarl.europa.eu/charter/pdf/text_es.pdf' target='_blank'>Carta de los Derechos Fundamentales de la Unión Europea</a> establece que toda persona tiene derecho a la protección de los datos de carácter personal que le conciernan. El <a href='https://www.aepd.es/normativa/index.html' target='_blank'>Reglamento General de Protección de Datos</a>, aplicable desde el 25 de mayo de 2018, especifica los siguientes derechos en relación con la protección de datos personales:</p><br>";
        texto += "                 <ul>";
        texto += "                     <li>· Derecho de acceso</li>";
        texto += "                     <li>· Derecho de rectificación</li>";
        texto += "                     <li>· Derecho de supresión ('derecho al olvido')</li>";
        texto += "                     <li>· Derecho a la limitación del tratamiento</li>";
        texto += "                     <li>· Derecho a la portabilidad de los datos</li>";
        texto += "                     <li>· Derecho de oposición</li>";
        texto += "                 </ul><br>";
        texto += "                 <p>Puedes encontrar más información sobre el alcance de tus derechos en esta página de la <a href='https://www.aepd.es/reglamento/derechos/index.html' target='_blank'>Agencia Española de Protección de Datos</a>.</p><br>";
        texto += "             <h1>Cómo ejercer tus derechos</h1>";
        texto += "                 <p>Puedes ejercer tus derechos en relación con el tratamiento de tus datos personales a escribiéndonos a la dirección de email <strong>lopd@bigdt.es</strong>.</p><br>";
        texto += "             <h1>Cookies</h1>";
        texto += "                 <p>Una cookie es un pequeño archivo de texto que se envía al navegador del usuario y se almacena en el dispositivo del usuario (ordenador, teléfono, tablet...). El <strong>servicio de BigDT</strong> utiliza cookies dentro de sus sistemas de medición de audiencias para distinguir los accesos desde cada dispositivo y navegador, sin almacenar ningún dato personal de cada usuario en el proceso. De esta manera, podemos saber cuántos usuarios distintos acceden a un determinado servicio, con qué frecuencia media regresan a una determinada sección... Esta información se utiliza para optimizar los servicios prestados, destacar la información más relevante y otras prácticas dirigidas a mejorar la satisfacción del usuario con el <strong>servicio de BigDT</strong>.</p><br>";
        texto += "             <h1>Tratamiento de datos personales</h1>";
        texto += "                 <p>BigDT cuenta con delegado de protección de datos (DPD) designado ante la Agencia Española de Protección de Datos, cuyas señas de contacto son: </p><br>";
        texto += "                 <p>Francisco Javier Larrondobuno Pérez</p>";
        texto += "                 <p>DNI: 48.955.766-J</p>";
        texto += "                 <p>Calle Alhelí, número 9</p>";
        texto += "                 <p>41008 Sevilla</p>";
        texto += "                 <p>España</p>";
        texto += "                 <p>Email: lopd@bigdt.es</p><br>";
        texto += "                 <p>Así mismo, se enumeran las actividades de tratamiento de datos personales que se realizan al acceder al <strong>servicio de BigDT</strong>:</p><br>";
        texto += "                 <p>Datos de usuario:</p>";
        texto += "                 <ul>";
        texto += "                     <li>· Nombre de perfil</li>";
        texto += "                     <li>· Dirección de correo electrónico</li>";
        texto += "                     <li>· Contraseña</li>";
        texto += "                 </ul><br>";
        texto += "                 <p>Datos de suscriptor:</p>";
        texto += "                 <ul>";
        texto += "                     <li>· Nombre sociedad o Nombre y apellidos</li>";
        texto += "                     <li>· Número de Identificación Fiscal</li>";
        texto += "                     <li>· Dirección de facturación</li>";
        texto += "                     <li>· Localidad</li>";
        texto += "                     <li>· Código posrtal</li>";
        texto += "                     <li>· Dirección de email</li>";
        texto += "                 </ul><br>";
        texto += "                 <p>Datos de uso:</p>";
        texto += "                 <ul>";
        texto += "                     <li>· Historial básico de navegación</li>";
        texto += "                     <li>· Idioma del sistema</li>";
        texto += "                 </ul><br>";
        texto += "                 <p>Datos adicionales que quieras proporcionarnos:</p>";
        texto += "                 <ul>";
        texto += "                     <li>· Datos de voz: Si las funciones de voz están disponibles en tu mercado y has elegido utilizar una función de voz, recopilamos y tratamos los datos de voz. Entre los datos de voz se incluyen grabaciones de audio de tu voz y transcripciones de esas grabaciones</li>";
        texto += "                     <li>· Datos de pago y compra: Fechas de tu historial de alta, pagos y baja</li>";
        texto += "                 </ul><br>";
        texto += "             <h1>Menores</h1>";
        texto += "                 <p>Debido a que el <strong>servicio de BigDT</strong> maneja de forma legítima datos sobre menores de edad, BigDT trata estos datos con mucho cuidado para proteger los derechos de los mismos.</p>";
        texto += "                 <p>A continuación se enumeran los datos recogidos y manejados relativos a menores de edad:</p><br>";
        texto += "                 <p>Datos personales:</p>";
        texto += "                 <ul>";
        texto += "                     <li>· Nombre y apellidos</li>";
        texto += "                     <li>· Año de nacimiento: recogemos este dato, entre otros motivos, para identificar a los usuarios menores de edad dentro del <strong>servicio de BigDT</strong></li>";
        texto += "                     <li>· Fotografía de perfil: este dato es voluntario por parte del usuario y sólo se utiliza para facilitar la identificación visual de los usuarios dentro del <strong>servicio de BigDT</strong> y como mejora visual del mismo. Dentro del perfil del usuario, tanto si es menor de edad como si no, existe la posibilidad de especificar qué usuarios tienen disponible el acceso a esta fotografía, de manera que es el mismo usuario quien determina la limitación del uso de la misma</li>";
        texto += "                     <li>· Nacionalidad</li>";
        texto += "                     <li>· Dato actual e histórico de la Altura</li>";
        texto += "                     <li>· Dato actual e histórico del Peso</li>";
        texto += "                 </ul><br>";
        texto += "                 <p>Datos deportivos personales:</p>";
        texto += "                 <ul>";
        texto += "                     <li>· Posición/es en el campo en las que juega</li>";
        texto += "                     <li>· Estilo de juego</li>";
        texto += "                     <li>· Mano predominante a la hora de jugar</li>";
        texto += "                 </ul><br>";
        texto += "                 <p>Datos de entrenamiento:</p>";
        texto += "                 <ul>";
        texto += "                     <li>· Conversaciones en chat de equipo</li>";
        texto += "                     <li>· Fechas y horarios de entrenamiento</li>";
        texto += "                     <li>· Rutinas de entrenamiento practicadas</li>";
        texto += "                     <li>· Pruebas de esfuerzo</li>";
        texto += "                     <li>· Asistencias y faltas a los entrenamientos</li>";
        texto += "                     <li>· Seguimiento de lesiones</li>";
        texto += "                 </ul><br>";
        texto += "                 <p>Valoraciones calculadas sobre el usuario:</p>";
        texto += "                 <ul>";
        texto += "                     <li>· Valoraciones en base a los datos almacenados sobre sus entrenamientos</li>";
        texto += "                     <li>· Valoraciones en base a los datos almacenados sobre sus partidos</li>";
        texto += "                 </ul><br>";
        texto += "             <h1>Cambios en esta Política</h1>";
        texto += "                 <p>De manera ocasional, podemos realizar cambios en esta Política.</p><br>";
        texto += "                 <p>Si realizamos cambios importantes en esta Política, te lo notificaremos de forma adecuada en función de las circunstancias. Por ejemplo, es posible que publiquemos un anuncio en un lugar destacado del <strong>servicio de BigDT</strong> o te enviemos una notificación por correo electrónico o a través de tu dispositivo.</p>";
        break;
    case "en":
    case "en-US":
    case "en-us":
        texto = "<p>Provisionally, in order to view the Conditions and Terms Contract, we regret to inform you that you must change the language of the application to 'Spanish'.</p>";
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        texto = "<p>Provisoirement, afin de visualiser les Conditions et Termes du Contrat, nous avons le regret de vous informer que vous devez changer la langue de l'application en 'Espagnol'.</p>";
        break;
    case "de":
    case "de-DE":
    case "de-de":
        texto = "<p>Vorläufig bedauern wir, Ihnen mitteilen zu müssen, dass Sie die Sprache der Anwendung auf „Spanisch“ ändern müssen, um die Allgemeinen Geschäftsbedingungen anzuzeigen.</p>";
        break;
    }
    return texto;
}

function mensajeError(codigo) {
    "use strict";
    var idioma = verIdioma(),
        arrayTexto = [];
    switch (idioma) {
    case "es":
    case "es-ES":
    case "es-es":
    case "es-419":
        arrayTexto = ["", "Ya creaste anteriormente un equipo con el mismo nombre, por lo que he actualizado con los nuevos datos introducidos.", "Otro usuario ya ha registrado este nombre de equipo.", "ERROR: Ocurrió un error al crear los datos. Por favor, inténtalo más tarde.", "ERROR: Ocurrió un problema al subir el archivo al servidor.\nPor favor, vuelva a intentarlo.", "ERROR: El archivo debe ser Jpg o Png.", "ERROR: El archivo es mayor de 1000KB de tamaño.\nPor favor, inténtalo con un archivo más pequeño"];
        break;
    case "en":
    case "en-US":
    case "en-us":
        arrayTexto = ["", "", "", "", "", ""];
        break;
    case "fr":
    case "fr-FR":
    case "fr-fr":
        arrayTexto = ["", "", "", "", "", ""];
        break;
    case "de":
    case "de-DE":
    case "de-de":
        arrayTexto = ["", "", "", "", "", ""];
        break;
    }
    return arrayTexto[codigo];
}