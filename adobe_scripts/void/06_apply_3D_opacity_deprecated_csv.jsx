function apply3D(opacity) {
    var _3D = app.activeDocument.layerSets[0].layerSets[0].layers.getByName('3D')
    app.activeDocument.activeLayer = _3D;
    _3D.opacity = opacity;

    // Wes is supposed to delete this layer it's not supposed to bere.  Leave just in case.
    // var _3d_intensity = app.activeDocument.layerSets[0].layerSets[0].layers.getByName('3d_intensity')
    // app.activeDocument.activeLayer = _3d_intensity;
    // _3d_intensity.opacity = opacity;
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
 * 
 * @param {String} csv path/to/filename.csv. 
 */
function run_script(csv) 
{
    // Extract data from the CSV
    var csvString = extractAsString(csv); 

    // Extract the Colors from the CSV
    var lines  = csvString.split("\n"),
    lineItems  = lines[1].split(",");

    // Extract Index of '3D Effect'
    var index = walkTo3D(lineItems);
    var no_3D_effect_item_meta_found = index === -1;

    if (no_3D_effect_item_meta_found) {
        apply3D(0);
    } else {
        // see if '3D Effect' is on
        var _3D_effect_on = lineItems[index].indexOf('On') >= 0;
        _3D_effect_on ? apply3D(33) : apply3D(0);

    }
}


/**
 * 3D Effect=On
 */
/**
 * Searches for the index of item_meta '3D Effect' property.
 * @param {Array} lineItems the data value columns.
 * @return {Int}  -1 means not found | greater than -1 is an index value
 */
function walkTo3D(lineItems)
{
    // Walk to 3D Effect
    var i = 0;
    while ( i < lineItems.length) {
        if (lineItems[i].indexOf('3D Effect') >= 0 )
            break;
        i++;
    }

    // if No '3D Effect'found then return -1 else greater than -1
    return (i === lineItems.length) ? -1 : i;
}


// Script entry point
run_script('/Users/gpcolor/Desktop/MICHAEL/order_1.csv');
