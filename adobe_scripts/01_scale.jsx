/**
 * Extracts the csv file as a string
 * @param {String} csv path/to/filename.csv
 * @return {String} The csv file as a string.
 */
function extractAsString(csv) {
    var myCSV = new File(csv, "UTF-16");
    myCSV.open('r');
    var str = myCSV.read();
    myCSV.close();
    return str;
}


/**
 * Extracts the scalify number.
 * @param {String} csv path/to/filename.csv.
 * @return {Int} The Pattern Scale number.
 */
function extractPatternScale(csv)
{
    // Extract data from the CSV
    var str = extractAsString(csv); 

    // Extract the Colors from the CSV
    var lines  = str.split("\n"); 
    lineItems  = lines[1].split(",");

    // Walk to pattern scale
    var patternScaleIndex = walkToPatternScale(lineItems);
    
    var patternScale = lineItems[patternScaleIndex];
    patternScale = patternScale.substring(patternScale.indexOf('=')+1, patternScale.length);

    return patternScale;


}

/**
 * Walks along the lineItems until the 'Pattern Scale' string is found.
 * @param {Array} lineItems The col data values.
 * @return The index of Pattern Scale or -1 if failed.
 */
function walkToPatternScale(lineItems)
{
    var i = 0;
    var find = 'PATTERN SCALE=';
    while ( i < lineItems.length) {
        if (lineItems[i].indexOf(find) >= 0 )
            break;
        i++;
    }

    if (i === lineItems.length) {
        alert('PATTERN SCALE not found in CSV');
        return -1;
    } else {
        // alert('PATTERN SCALE FOUND! ' + i);
        return i;
    }
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



/**
 * 
 * @param {String} csv path/to/filename.csv. 
 */
function run_script(csv) 
{
    var patternScale = extractPatternScale(csv);
    var scalePercent = patternScale/200;
    resizeImageToScale(scalePercent);
    
}



run_script('/Users/gpcolor/Desktop/MICHAEL/order_1.csv');