#include "json2.js" 


var static_TX_texture_aging_dir = '/Users/gpcolor/Desktop/digitaldecor-backend/bin/static_TX_texture_aging';


(function start(){
    var order = loadJson();
    var textureEffect = order["item_meta"]["Texture Effect"];
    
    var TX_virtual_psd_file = expect_open_correct_TX(textureEffect);
    app.open(TX_virtual_psd_file);

})();

/**
 * Finds the correct file to for the texture effect.
 * @param {String} textureEffect 
 * @return {File} The `TX_virtual.psd` file.
 */
function expect_open_correct_TX(textureEffect)
{
    var TX_virtual_psd;

    switch(jsUcfirst(textureEffect))
    {
        case "Inert":
            TX_virtual_psd = File(static_TX_texture_aging_dir+"/inert/TX_INERT_virtual.psd");
            break;
        case "Linen":
            alert(textureEffect);
            break;
        case "Papyrus":
            alert(textureEffect);
            break;
        case "Rockwork":
            alert(textureEffect);
        break;
        case "Stucco":
            alert(textureEffect);
            break;
        case "Woodgrain": 
            TX_virtual_psd = File(static_TX_texture_aging_dir+"/woodgrain/TX_WOODGRAIN_virtual.psd");
        break;
        default:
            alert("Default: " +textureEffect);
    }

    return TX_virtual_psd;
}

// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('022_expect_open_correct_TX.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}


function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
