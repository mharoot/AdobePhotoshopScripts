#include "json2.js" 


(function start(){
    var order = loadJson();
    csv_order_swatch_names(order);
    // static_text(order); not in use...
    csv_order_infoCopy(order);
    
})();

/**
 * Populates static_text from order.json.
 * @param {JSON} order 
 */
function static_text(order)
{
    var layers = app.activeDocument.layers.getByName('static_text').layers;
    // BLANK
    layers[0].textItem.contents = "WHAT GOES INTO BLANK LAYER?"
    // NOTES
    layers[1].textItem.contents = "THESE ARE THE ITEM's NOTES.  Blah blah blah.  This is cool.";
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


function csv_order_infoCopy(order)
{
    var layers = app.activeDocument.layers.getByName('csv_order_info copy').layers;
    //_order_info_footer
    layers[0].textItem.contents = "this is where _order_info_footer is supposed to be";
    //_order_info_gpcopy
    layers[1].textItem.contents = generateOrderInfoString(order);
}

function generateOrderInfoString(order)
{
    var tab = '    ';
    var orderInfo = '"order_id:" ' + order["order_id"] + tab +
                     '"item_name:" ' + order["item_name"] + tab +
                     '"item_meta": ' +
                     JSON.stringify({
                        "Wall Height" : "5",
                        "Wall Width" : "5",
                        "PATTERN SCALE" : "100",
                        "Texture Effect" : "woodgrain",
                        "3D Effect" : "On",
                        "Aging Effect" : "Lived-in",
                        "COLOR 3" : "#83a530",
                        "COLOR 2" : "#af6b46",
                        "COLOR 1" : "#c9a566"});
                    
    return orderInfo;
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




