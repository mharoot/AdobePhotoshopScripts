#include "json2.js" 


var source_logos = '/Users/gpcolor/Desktop/digitaldecor-backend/bin/source_logos/'; 


(function start(){
    var order = loadJson();
    openPrintBy(order["print_by"]);

})();

function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('082_expect_open_printby_virtual.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

/**
 * Opens the printBy file in Adobe Photoshop.
 * @param {String} printer if file is not found printer is gpcolor.
 * @return {void} 
 */
function openPrintBy(printer)
{
    
    var printBy = "printby_" + printer + "_virtual.psd";
    try {
        file = new File(source_logos+printBy); 
        app.open(file);
    } catch (e)
    {
        file = new File(source_logos+"printby_gpcolor_virtual.psd")
        app.open(file);
    }
}



/*
#include "json2.js" 
// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('082_expect_open_printby_virtual.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

var dir = '/Users/gpcolor/Desktop/digitaldecor-backend'; 


(function start(){
    var order = loadJson();
    // TODO
})();


*/