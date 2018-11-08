#include "json2.js" 
(function start(){
    var order = loadJson();
    var patternScale = order["item_meta"]["PATTERN SCALE"];
        // width = order["item_meta"]["Wall Width"] * 12, 
        // height = order["item_meta"]["Wall Height"] * 12; // 1ft = 12in
    resizeImageToScale(patternScale);
    
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



/**
 * Changes the size of the image.
 * @param {UnitValue} width                 Use function UnitValue(scaleW, 'inch');
 * @param {UnitValue} height                Use function UnitValue(scaleW, 'inch');
 * @param {Int} resolution                  Resolution of the image.
 * @param {ResampleMethod} resampleMethod   AUTOMATIC | BICUBIC | BICUBICAUTOMATIC | BICUBICSHARPER | 
 *                                          BICUBICSHMOOTHER | BILINEAR | NEARSTNEIGHBOR | NONE | PRESERVEDETAILS
 * @param {Int} amount                      The amount parameter controls the amount of noise value when using preserve details (Range: 0 - 100).
 * @return {void}
 */
function resizeImage(width, height, resolution, resampleMethod, amount) 
{
    app.activeDocument.resizeImage(width, height, resolution, resampleMethod, amount);
}

/**
 * Resizes the image using the Bi-Cubic Sharper Resample Method.
 * @param {Int} scalePercent patternScale number divided by 200.
 */
function resizeImageToScale(scalePercent) {
    // scaled width and height
    var scaleW = app.activeDocument.width * scalePercent,
        scaleH = app.activeDocument.height * scalePercent;
    
    // resizeImage parameters
    var width  = UnitValue(scaleW, 'inch'),
        height = UnitValue(scaleH, 'inch'),
        resolution = null,
        resampleMethod = ResampleMethod.BICUBICSHARPER,
        amount = null;

    // Changes the size of the image in photoshop
    resizeImage(width, height, resolution, resampleMethod, amount);

    
}