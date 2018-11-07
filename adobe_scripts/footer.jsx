#include "json2.js" 


(function start(){
    var csv_order_swatch_names = app.activeDocument.layers.getByName('csv_order_swatch_names').layers;
    // alert( csv_order_swatch_names );
    fillClass2Through4(csv_order_swatch_names);
})();


// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('footer.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

/**
 * csv_order_swatch_names 
 * @param {ArtLayer} layers 
 */
function fillClass2Through4(layers) {
    var order = loadJson();
    layers[1].textItem.contents = order["item_meta"]["COLOR 1"];
    layers[2].textItem.contents = order["item_meta"]["COLOR 2"];
    layers[3].textItem.contents = order["item_meta"]["COLOR 3"];

    // for (var i = 1; i < layers.length; i++) {
    //     layers[i].textItem.contents = ;
    // }
}





