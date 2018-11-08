#include "json2.js" 


(function start(){
    var order = loadJson();
    csv_order_swatch_names(order);
    csv_order_panelinfo(order);
})();

/**
 * Populates csv_order_panelinfo from order.json.
 * @param {JSON} order 
 */
function csv_order_panelinfo(order)
{
    var layers = app.activeDocument.layers.getByName('csv_order_panelinfo').layers;
    // substrate info was placed in here...
    var index = str.indexOf('Commercial Type');
    // _substrate
    layers[0].textItem.contents = str.substring(index, str.length);
    // _total_panel_height
    layers[1].textItem.contents = str.substring(index, str.length);
    // _total_panel_width

    // _this_panel_width

    // _total_panel_count

    // _panel_number

}

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
 * Populates csv_order_swatch_names from order.json.
 * @param {JSON} order 
 */
function csv_order_swatch_names(order) {
    var layers = app.activeDocument.layers.getByName('csv_order_swatch_names').layers;
    layers[1].textItem.contents = order["item_meta"]["COLOR 1"];
    layers[2].textItem.contents = order["item_meta"]["COLOR 2"];
    layers[3].textItem.contents = order["item_meta"]["COLOR 3"];
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




