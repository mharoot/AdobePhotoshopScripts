#include "json2.js" 
// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('081_expect_open_designby_virtual.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

var dir = '/Users/gpcolor/Desktop/digitaldecor-backend'; 


(function start(){
    var order = loadJson();
    openDesignBy(order["design_by"]);
})();


/**
 * Opens the designBy file in Adobe Photoshop.
 * @param {String} designer if file is not found designer is digitaldecor.
 * @return {void} 
 */
function openDesignBy(designer)
{
    var designBy = "designby_" + designer + "_virtual.psd";
    var file;
    try {
        file = new File(source_logos+designBy); 
    } catch (e)
    {
        file = new File(source_logos+"designby_digitaldecor_virtual.psd")
    }

    app.open(file);
}