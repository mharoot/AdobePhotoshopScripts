// 000_expect_asset.jsx
// /Users/gpcolor/Desktop/digitaldecor-backend/Image Pattern Library/1C_ASD1333991.psd
#include "json2.js" 


var IPL = '/Users/gpcolor/Desktop/digitaldecor-backend/Image Pattern Library/';


(function start(){
    var order = loadJson();
    var patternFileName = extractPatternName(order);
    var pattern_psd_file = expect_asset(patternFileName);
    app.open(pattern_psd_file);

})();

/**
 * Finds the correct file from pattern file name.
 * @param {String} patternFileName 
 * @return {File} The `patternName.psd` file.
 */
function expect_asset(patternFileName)
{
    return File(IPL + patternFileName + ".psd");
}

/**
 * Extracts the pattern name from item_name field in orders.
 * @param {JSON} order 
 * @return {String} "3C_ASD166992632 - Commercial Type II" will become 3C_ASD166992632 
 */
function extractPatternName(order)
{
        // pattern name
        var itemName = order["item_name"];
        var n = itemName.indexOf(' - '); 
        return itemName.substring(0, n);
}

// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('000_expect_asset.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}
