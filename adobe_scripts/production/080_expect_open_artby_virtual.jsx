// 080_expect_open_artby_virtual.jsx
#include "json2.js" 


var source_logos = '/Users/gpcolor/Desktop/digitaldecor-backend/bin/source_logos/'; 


(function start(){
    var order = loadJson();
    openArtBy(order["art_by"]);

})();

// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('080_expect_open_artby_virtual.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

/**
 * Opens the artBy file in Adobe Photoshop.
 * @param {String} artist if file is not found artist is digitaldecor.
 * @return {void} 
 */
function openArtBy(artist)
{
    var artBy = "artby_" + artist + "_virtual.psd";
    try {
        file = new File(source_logos+artBy); 
        app.open(file);
    } catch (e)
    {
        file = new File(source_logos+"artby_digitaldecor_virtual.psd")
        app.open(file);
    }
}
