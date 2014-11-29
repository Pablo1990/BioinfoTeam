//var win = Ti.UI.createWindow();
//{backgroundImage: "Fundacion0_001.jpg"}
//https://github.com/appcelerator/titanium_mobile/blob/master/demos/KitchenSink/Resources/examples/rss.js
var url = 'http://www.elmundo.es/rss/hackathon/ciencia.xml';
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
	for (var i = 0; i < 3; i++) {
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
		row.add(desc);

		tableData.push(row);
	}
	var tableView = Ti.UI.createTableView({
		data : tableData,
		top : '70dp',
		left : '43dp',
		right : '45dp',
		bottom : '355dp',
		borderRadius: '5dp'
	});
	wMenu.add(tableView);
};
xhr.send();
wMenu.open();
