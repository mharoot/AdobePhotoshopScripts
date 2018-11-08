#include "json2.js" 
(function start(){
    var order = loadJson();
    var color1 = order["item_meta"]["COLOR 3"];
    color1 = color1.substring(1, color1.length)
    var color = new SolidColor();  
    color.rgb.hexValue=color1;
    setClass2HexLayer(color);
})();


// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('05_set_color_CLASS4.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}


/**
 * Sets the CLASS2HEX layer in photoshop to the Hex Code value color.
 * @param {String} c The Hex Code value of the color.
 */
function setClass2HexLayer(c) {
    var Color = new SolidColor;
    var x = c.replace('#', '');
    Color.rgb.hexValue = x;
   
    // if you open up photoshop, the file is sitting in a folder that is 3 directories deep.
    // hence why layerSets[0] is repeated 3 times in order,  ( layerSets[0] = 1st subfolder )
    var PTL = app.activeDocument.layerSets[0].layerSets[0].layerSets[0].layers.getByName('CLASS2HEX');
    
    // set this layer as the selected active layer (simulates clicking on the CLASS4HEX layer)
    app.activeDocument.activeLayer = PTL;

    // we want the entire layer not just a portion so we select all
    app.activeDocument.selection.selectAll();
    app.activeDocument.selection.fill(Color);

    // deselect that layer to avoid accidental changes.
    app.activeDocument.selection.deselect();
}






