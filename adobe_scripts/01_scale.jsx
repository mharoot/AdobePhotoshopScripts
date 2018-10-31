
/**
 * Searches for the item_meta Wall Width property.  Alerts user of the script of the problem.
 * This function is used to walk to the Wall Width Property which is a mandatory data value.
 * It then spits out the index we should use to walk until we find what we are looking to extract.
 * @param {Array} lineItems the data value columns.
 * @return {Int} the index of the line items where I should begin my walk to extract additonal data. 
 *               a value of -1 means there is a problem with the CSV.
 */
function checkForErrors(lineItems)
{
    var i = 0;

    while (lineItems[i].indexOf("Wall Width") === -1 && i < lineItems.length) {
        i++;
    }

    if (i === lineItems.length) {
        alert("CSV PROBLEM: item_meta 'Wall Width' NOT found!")
        return -1;
    } else {
        // alert("item_meta - Wall Width: position "+i)
        return i;
    }

}

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

    // Check for errors and stop the script if Wall Width is missing
    var startIndex = checkForErrors(lineItems);
    if (startIndex === -1) {
        alert('CANCELING SCRIPT EXECUTION');
        return;
    }

    var patternScaleIndex = walkToPatternScale(lineItems, startIndex);
    
    var patternScale = lineItems[patternScaleIndex];
    patternScale = patternScale.substring(patternScale.indexOf('=')+1, patternScale.length);

    return patternScale;


}

/**
 * Walks along the lineItems until the 'Pattern Scale' string is found.
 * @param {Array} lineItems The col data values.
 * @param {Int} startIndex  Where the walk will start from.
 * @return The index of Pattern Scale or -1 if failed.
 */
function walkToPatternScale(lineItems, startIndex)
{
    var i = startIndex;
    var find = 'PATTERN SCALE=';


    while (lineItems[i].indexOf(find) === -1 && i < lineItems.length) {
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
 * Resizes the image using the Bi-Cubic Sharper Resample Method.
 * @param {Int} scalePercent patternScale number divided by 200.
 */
function resizeImageToScale(scalePercent) {
    var scaleW = app.activeDocument.width * scalePercent
    var scaleH = app.activeDocument.height * scalePercent
    // the height and width are tyed together so scaleH
    app.activeDocument.resizeImage(UnitValue(scaleW, 'inch'), UnitValue(scaleH, 'inch'), null, ResampleMethod.BICUBICSHARPER);
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