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

var itemList = [];

var wMenu = Titanium.UI.createWindow({
	backgroundImage : "Fundacion0_004.jpg",
	title : 'Menu'
});

wMenu.addEventListener('swipe', function(e) {
	if (e.direction == 'right') {

		wNoticias.open();
	} else if (e.direction == 'left') {

		wArticulos.open();
	} else if (e.direction == 'down') {
		wAjustes.open();
	} else if (e.direction == 'up') {

		wSocial.open();
	}
});

var wNoticias = Titanium.UI.createWindow({
	backgroundImage : "FundacionB_001.jpg",
	title : 'Noticias'
});

wNoticias.addEventListener('swipe', function(e) {
	if (e.direction == 'left') {
		wNoticias.close();
	}
});

var wArticulos = Titanium.UI.createWindow({
	backgroundImage : "FundacionC_001.jpg",
	title : 'Articulos'
});

wArticulos.addEventListener('swipe', function(e) {
	if (e.direction == 'right') {
		wArticulos.close();
	}
});

var wAjustes = Titanium.UI.createWindow({
	backgroundImage : "FundacionA_001.jpg",
	title : 'Preferencias'
});

wAjustes.addEventListener('swipe', function(e) {
	if (e.direction == 'up') {
		wAjustes.close();
	}
});

var wSocial = Titanium.UI.createWindow({
	backgroundImage : "FundacionD_001.jpg",
	title : 'Social'
});

wSocial.addEventListener('swipe', function(e) {
	if (e.direction == 'down') {
		wSocial.close();
	}
});

function setDatosArticulos(tablaDatos) {
	var tableView = Ti.UI.createTableView({
		data : tablaDatos,
		top : '150dp',
		left : '40dp',
		right : '40dp',
	});
	wArticulos.add(tableView);
}

function setDatosNoticias(tablaDatos) {
	var tableView = Ti.UI.createTableView({
		data : tablaDatos,
		top : '150dp',
		left : '40dp',
		right : '40dp',
	});
	wNoticias.add(tableView);
}

function loadRSS(url, type) {

	// url = http://www.ncbi.nlm.nih.gov/entrez/eutils/erss.cgi?rss_guid=1RSu50XbTiNW5P-7402oRwT3E3NHLlHfWt_z7A2fjpVL_od5Qg
	data = [];

	Ti.API.info('>>>> loading RSS feed ' + url);
	xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET', url);
	xhr.onload = function() {

		Ti.API.info('>>> got the feed! ... ');

		// Now parse the feed XML
		var xml = this.responseXML;

		itemList = xml.documentElement.getElementsByTagName("item");
		Ti.API.info('found ' + itemList.length + ' items in the RSS feed');

		/* title: Titulo de la noticia original
		 * description: Texto completo en html de la noticia
		 * link: Enlace a la noticia
		 * category: Categoría del contenido. Puede no venir. Puede ser N elementos guid: Cadena única del item
		 * pubDate: Fecha de publicación según RFC 822
		 */

		var tableData = [];
		for (var i = 0; i < itemList.length; i++) {
			row = Ti.UI.createTableViewSection({
				headerTitle : itemList.item(i).getElementsByTagName("title").item(0).textContent
			});
			var descriptionRaw = itemList.item(i).getElementsByTagName("description").item(0).textContent;
			var regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
			///<[a-zA-Z /%\="\:]+>/g
			var description = descriptionRaw.replace(regex, "");
			desc = Ti.UI.createTableViewRow({
				title : description.trim().substr(0, 80) + '...',
				color : 'black'
			});
			row.addEventListener("click", function(e) {
				link = itemList.item(i).getElementsByTagName("link").item(0).textContent;
				Ti.Platform.openURL(link);
			});
			row.add(desc);

			tableData.push(row);
		}
		if (type == 1)
			setDatosArticulos(tableData);
		else
			setDatosNoticias(tableData);
	};

	xhr.send();
}

var url = 'http://www.ncbi.nlm.nih.gov/entrez/eutils/erss.cgi?rss_guid=1RSu50XbTiNW5P-7402oRwT3E3NHLlHfWt_z7A2fjpVL_od5Qg';
loadRSS(url, 1);
var url = 'http://www.elmundo.es/rss/hackathon/ciencia.xml';
loadRSS(url, 0);
