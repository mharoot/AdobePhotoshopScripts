#include "json2.js" 


var static_TX_texture_aging_dir = '/Users/gpcolor/Desktop/digitaldecor-backend/bin/static_TX_texture_aging';


(function start(){
    var order = loadJson();
    var textureEffect = order["item_meta"]["Texture Effect"];
    
    var aging_virutal_psd_file = expect_open_correct_aging(textureEffect);
    app.open(aging_virutal_psd_file);

})();

/**
 * Finds the correct file to for the texture effect.
 * @param {String} textureEffect 
 * @return {File} The `aging_virtual.psd` file.
 */
function expect_open_correct_aging(textureEffect)
{
    var aging_virutal_psd;

    switch(jsUcfirst(textureEffect))
    {
        case "Inert":
            aging_virutal_psd = File(static_TX_texture_aging_dir+"/inert/aging_INERT_virtual.psd");
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
            aging_virutal_psd = File(static_TX_texture_aging_dir+"/woodgrain/aging_WOODGRAIN_virtual.psd");
        break;
        default:
            alert("Default: " +textureEffect);
    }

    return aging_virutal_psd;
}

// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('023_expect_open_correct_aging.jsx').shift() + 'order.json'
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
