const STATIC_CACHE = "static";

const APP_SHELL = [
	"/",
	"index.html",
	"menu.html",
	"js/jquery.js",
	"js/world.js",
	"js/main.js",
	"js/menuEdicion.js",
	"js/capturaBalonmano.js",
	"css/futura light bt.ttf",
	"css/estilo.css",
	"mp3/sonidoToque.mp3",
	"mp3/sonidoTransicion.mp3",
	"img/Menu/apple-touch-icon.png",
//Para beta offline
	"img/Clubes/defecto.png",
	"js/categorias.js",
	/*"img/Menu/*.*",
	"img/Idiomas/*.*",
	"img/Publicidad/*.*",
	"img/Captura/*.*",
	"img/Clubes/Organizadoras/*.*",
	"img/Clubes/Plantillas/*.*"*/
];

// Instalar Service Worker en el navegador
self.addEventListener("install", e => {
	const cacheStatic = caches
		.open(STATIC_CACHE) // Abrir la caché (es petición asíncrona)
		.then(cache => cache.addAll(APP_SHELL)); // Instalar los datos en la caché

	e.waitUntil(cacheStatic); // Como es un evento asíncrono, le digo que espere a que guarde los datos en la caché
})


// Configurar uso offline
self.addEventListener("fetch", e => {
	if (e.request.url.startsWith(self.location.origin)) {
		e.respondWith(
			caches
				.match(e.request) // Busca los datos (es petición asíncrona)
				.then( (res) => res || fetch(e.request)) //Busca en la caché. Si no hay nada, realiza la fetch al servidor sobre los datos
				.catch(console.log) // Si ha dado un error, lo imprime en consola
		)
	}
	//console.log("fetch: ", e.request); // Ver lo que está recogiendo (es sólo informativo para ver que está funcionando)

//	e.respondWith(
//		caches
//			.match(e.request) // Busca los datos (es petición asíncrona)
//			.then( (res) => res || fetch(e.request)) //Busca en la caché. Si no hay nada, realiza la fetch al servidor sobre los datos
//			.catch(console.log) // Si ha dado un error, lo imprime en consola
//	)
}); // Ver petición


// Evento para subir datos al servidor cuando has estado offline y ya vuelves a estar online (¿reSign?)
// Existe una pequeña BD dentro del navegador para estos casos