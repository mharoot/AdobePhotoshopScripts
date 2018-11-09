#include "json2.js" 
// global variables must be declared before the start
var dir = "/Users/gpcolor/Desktop/digitaldecor-backend/bin/virtual_UPS_label/"; 

(function start(){
    var order = loadJson();
    open_UPS_label(order);
    
})();

function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('087_expect_UPS_label_virtual.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}


/**
 * Opens the UPS label gif.
 * @param {JSON} order if file is not found paste generic UPS label 'ups_label_virtual.gif'
 * @return {void} 
 */
function open_UPS_label(order)
{
    var labelFile = "virtual_UPS_" + order["_id"] + "_virtual.gif";
    try {
        file = new File(dir+labelFile); 
        app.open(file);
    } catch (e)
    {
        file = new File(dir+"ups_label_virtual.gif");
        app.open(file);
    }
}