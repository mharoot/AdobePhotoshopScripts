#include "json2.js" 
(function start(){
    var order = loadJson();
    var width = order["item_meta"]["Wall Width"] * 12, 
        height = order["item_meta"]["Wall Height"] * 12; // 1ft = 12in
    // the adobe action
    app.activeDocument.resizeCanvas(width,height,AnchorPosition.TOPLEFT);
})();


// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('01_scale.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

