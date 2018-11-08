#include "json2.js" 
(function start(){
    var order = loadJson();
    var color1 = order["item_meta"]["COLOR 2"];
    color1 = color1.substring(1, color1.length)
    var color = new SolidColor();  
    color.rgb.hexValue=color1;
    changeForegroundColor(color);
})();


// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('03_set_foreground_CLASS3.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}


/**
 * Literally changes only the foreground color in photoshop.
 * @param {SolidColor} color 
 */
function changeForegroundColor(color) 
{
    // app is litterally Adobe Photoshop CC 2017
    // accessing the foregroundColor property of type SolidColor
    app.foregroundColor = color;
}