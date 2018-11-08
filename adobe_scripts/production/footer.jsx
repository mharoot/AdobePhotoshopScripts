#include "json2.js" 
(function start(){
    var order = loadJson();
    csv_order_swatch_names(order);
    // static_text(order); not in use...
    csv_order_info(order);
    
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


function csv_order_info(order)
{
    var layers = app.activeDocument.layers.getByName('csv_order_info').layers;
    //_order_info_footer
    layers[0].textItem.contents = "this is where _order_info_footer is supposed to be";
    //_order_info_gpcopy
    layers[1].textItem.contents = generateOrderInfoString(order);
}

/**
 * Generates order_id with the following information
 * 1. order number - we can not let ppl count it he doesn't like that it shows 1
 * 2. pattern name
 * 3. Colors: class2,class3,class4
 * 4. Scale: is it a 100 it it a 120 Pattern Scale
 * 5. 3D: on or off
 * 6. Texture: if any utilized
 * 7. order width and order height in inches
 * @param {JSON} order 
 */
function generateOrderInfoString(order)
{
    // order number
    var orderNumber = order["_id"]; // the mongodb id as the order
    // pattern name
    var itemName = order["item_name"];
    var n = itemName.indexOf(' - '); // "3C_ASD166992632 - Commercial Type II",
    var patternName = itemName.substring(0, n); // 3C_ASD166992632 
    // colors
    var class2 = order["item_meta"]["COLOR 1"],
        class3 = order["item_meta"]["COLOR 2"],
        class4 = order["item_meta"]["COLOR 3"];
    // scale
    var patternScale = order["item_meta"]["PATTERN SCALE"];
    // 3D
    var _3D = order["item_meta"]["3D Effect"];
    // texture
    var textureEffect = order["item_meta"]["Texture Effect"];
    // order width and height in inches
    var w = order["item_meta"]["Wall Width"]*12,
        h = order["item_meta"]["Wall Height"]*12;
    // order info 
    var orderInfo = "Order Number: " + orderNumber + "; " +
                    "Pattern Name: " + patternName + "; " +
                    "Colors: " + class2 + ", " + class3 + ", " + class4 + "; " +
                    "Scale: " + patternScale + "; " +
                    "3D Effect: " + _3D + "; " +
                    "Texture: " + textureEffect + "; " +
                    "Width" + w + "″; " +
                    "Height" + h + "″; ";

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


{
"art_by":"Amr Saemaldahr",
"print_by":"Michael Harootoonyan",
"_id":"5b2202b28a8bfd1d1b650ba1",
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