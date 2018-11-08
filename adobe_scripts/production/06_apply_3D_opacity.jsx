#include "json2.js" 
(function start(){
    var order = loadJson();
    // see if '3D Effect' is on
    var _3D_effect_on = order["item_meta"]["3D Effect"].indexOf('On') > -1
    _3D_effect_on ? apply3D(100) : apply3D(0);    
})();


// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('06_apply_3D_opacity.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

function apply3D(opacity) {
    // Traverse into the 3DGroup folder in adobe photoshop
    var _3DGroup = app.activeDocument.layerSets[0];
    // Select the 3D layer
    var _3D = _3DGroup.layers.getByName('3D');
    app.activeDocument.activeLayer = _3D;
    // apply the opacity
    _3D.opacity = opacity;
}


/*
{"_id":"5b2202b28a8bfd1d1b650ba1",
"order_id":"1",
"status":"generating",
"billing_phone":"310-980-6482",
"shipping_first_name":"Amr",
"shipping_last_name":"Saemaldahr",
"shipping_address":"6400 Crescent Park East",
"shipping_postcode":"90094",
"shipping_city":"Playa Vista",
"shipping_state":"CA",
"shipping_country":"US",
"shipping_company":"self",
"ited_id":"200",
"item_name":"3C_ASD166992632 - Commercial Type II",
"item_meta":{
    "Wall Height":"5",
    "Wall Width":"5",
    "PATTERN SCALE":"100",
    "Texture Effect":"woodgrain",
    "3D Effect":"On",
    "Aging Effect":"Lived-in",
    "COLOR 3":"#83a530",
    "COLOR 2":"#af6b46",
    "COLOR 1":"#c9a566"}
}
*/

