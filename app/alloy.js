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

//http://stackoverflow.com/questions/11946153/how-to-parse-this-xml-in-titanium
//http://docs.appcelerator.com/titanium/latest/#!/api

/*
* http://hackathonem.com/hackaton.pdf
* URL de acceso
*  http://www.elmundo.es/rss/hackathon/albumes.xml
* http://www.elmundo.es/rss/hackathon/ciencia.xml
* http://www.elmundo.es/rss/hackathon/espana.xml
* http://www.elmundo.es/rss/hackathon/economia.xml
* http://www.elmundo.es/rss/hackathon/internacional.xml
*/

//https://github.com/appcelerator/titanium_mobile/blob/master/demos/KitchenSink/Resources/examples/rss.js

url = 'http://www.elmundo.es/rss/hackathon/ciencia.xml';
data = [];
Ti.API.info('>>>> loading RSS feed ' + url);
xhr = Titanium.Network.createHTTPClient();
xhr.open('GET', url);
xhr.onload = function() {

	Ti.API.info('>>> got the feed! ... ');

	// Now parse the feed XML
	var xml = this.responseXML;

	var itemList = xml.documentElement.getElementsByTagName("item");
	Ti.API.info('found '+itemList.length+' items in the RSS feed');
	
	/* title: Titulo de la noticia original
	 * description: Texto completo en html de la noticia
	 * link: Enlace a la noticia
	 * category: Categoría del contenido. Puede no venir. Puede ser N elementos guid: Cadena única del item
	 * pubDate: Fecha de publicación según RFC 822
	 */
	for (var i=0; i < itemList.length; i++) {
		Ti.API.info('Item title ' + itemList.item(i).getElementsByTagName("title").item(0).textContent);
		Ti.API.info('Item dc:creator ' + itemList.item(i).getElementsByTagName("dc:creator").item(0).textContent);
	}
};

xhr.send();
