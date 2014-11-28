//http://stackoverflow.com/questions/11946153/how-to-parse-this-xml-in-titanium
//http://docs.appcelerator.com/titanium/latest/#!/api

/*addEventListener('swipe', function(e){
	var noticias = Alloy.createController('noticias').getView();
    $.index.openWindow(noticias);
});*/

/*
* http://hackathonem.com/hackaton.pdf
* URL de acceso
*  http://www.elmundo.es/rss/hackathon/albumes.xml
* http://www.elmundo.es/rss/hackathon/ciencia.xml
* http://www.elmundo.es/rss/hackathon/espana.xml
* http://www.elmundo.es/rss/hackathon/economia.xml
* http://www.elmundo.es/rss/hackathon/internacional.xml
*/

var win = Ti.UI.createWindow();
//{backgroundImage: "Fundacion0_001.jpg"}
//https://github.com/appcelerator/titanium_mobile/blob/master/demos/KitchenSink/Resources/examples/rss.js

url = 'http://www.elmundo.es/rss/hackathon/ciencia.xml';
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
		var row = Ti.UI.createTableViewSection({ headerTitle: 'Noticias' });
		var texto = itemList.item(i).getElementsByTagName("title").item(0).textContent;
		row.add(Ti.UI.createTableViewRow({ title: texto }));
		//Ti.API.info('Item title ' + itemList.item(i).getElementsByTagName("title").item(0).textContent);
		//Ti.API.info('Item dc:creator ' + itemList.item(i).getElementsByTagName("dc:creator").item(0).textContent);

		tableData.push(row);
	}
	
	var tableView = Ti.UI.createTableView({
		data : tableData
	});
	
	win.add(tableView);
};
xhr.send();

win.open();

