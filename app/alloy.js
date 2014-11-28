// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var wMenu = Titanium.UI.createWindow({
	backgroundImage : "Fundacion0_001.jpg",
	title : 'Noticias'
});

var wNoticias = Titanium.UI.createWindow({
	backgroundImage : "FundacionB_001.jpg",
	title : 'Noticias'
});

wMenu.addEventListener('swipe', function(e) {
	var url = 'http://www.elmundo.es/rss/hackathon/ciencia.xml';
	loadRSS(url);
});

var wArticulos = Titanium.UI.createWindow({
	backgroundImage : "Fundacion0_001.jpg",
	title : 'Noticias'
});

var wAjustes = Titanium.UI.createWindow({
	backgroundImage : "Fundacion0_001.jpg",
	title : 'Noticias'
});

var wSocial = Titanium.UI.createWindow({
	backgroundImage : "Fundacion0_001.jpg",
	title : 'Noticias'
});

function setDatos(tablaDatos) {
	var tableView = Ti.UI.createTableView({
		data : tablaDatos
	});
	wNoticias.add(tableView);
	wNoticias.open();
}

function loadRSS(url) {

	// url = http://www.ncbi.nlm.nih.gov/entrez/eutils/erss.cgi?rss_guid=1RSu50XbTiNW5P-7402oRwT3E3NHLlHfWt_z7A2fjpVL_od5Qg
	data = [];

	Ti.API.info('>>>> loading RSS feed ' + url);
	xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', url);
	xhr.onload = function() {

		Ti.API.info('>>> got the feed! ... ');

		// Now parse the feed XML
		var xml = this.responseXML;

		var itemList = xml.documentElement.getElementsByTagName("item");
		Ti.API.info('found ' + itemList.length + ' items in the RSS feed');

		/* title: Titulo de la noticia original
		 * description: Texto completo en html de la noticia
		 * link: Enlace a la noticia
		 * category: Categoría del contenido. Puede no venir. Puede ser N elementos guid: Cadena única del item
		 * pubDate: Fecha de publicación según RFC 822
		 */

		var tableData = [];
		for (var i = 0; i < 10; i++) {
			var row = Ti.UI.createTableViewSection({
				headerTitle : 'Noticias'
			});
			var texto = itemList.item(i).getElementsByTagName("title").item(0).textContent;
			row.add(Ti.UI.createTableViewRow({
				title : texto
			}));
			//Ti.API.info('Item title ' + itemList.item(i).getElementsByTagName("title").item(0).textContent);
			//Ti.API.info('Item dc:creator ' + itemList.item(i).getElementsByTagName("dc:creator").item(0).textContent);

			tableData.push(row);
		}

		setDatos(tableData);
	};

	xhr.send();
}