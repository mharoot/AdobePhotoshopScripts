



var variable_swatch_names = app.activeDocument.layers.getByName('variable_swatch_names');
var test = app.activeDocument.layers.getByName('variable_swatch_names').layers;
// alert(test);
// alert(test[0].textItem.contents)
var color;
var hexCode;


getThe12HexCodeValues();



function getThe12HexCodeValues() {
    for (var i = 1; i < 13; i++) {
        var hexDropper = '034_0' + i + '_hex_dropper';
        app.doAction(hexDropper, '000_virtual_element_builders.atn')
        color = app.foregroundColor

        var j = i - 1;
        
        hexCode = color.rgb.hexValue;
        test[j].textItem.contents = hexCode;
    }
}





