

(function start(){
    var variable_swatch_names = app.activeDocument.layers.getByName('variable_swatch_names').layers;
    populateTheTop12Swatches(variable_swatch_names);
})();


/**
 * Passing variable_swatch_names layers in order to replace the top 12 Hex Code
 * values.
 * @param {ArtLayer} layers 
 */
function populateTheTop12Swatches(layers) {
    var color;
    var hexCode;
    for (var i = 1; i < 13; i++) {
        var hexDropper = '034_0' + i + '_hex_dropper';
        app.doAction(hexDropper, '000_virtual_element_builders.atn')
        color = app.foregroundColor

        var j = i - 1;
        
        hexCode = color.rgb.hexValue;
        layers[j].textItem.contents = hexCode;
    }
}





