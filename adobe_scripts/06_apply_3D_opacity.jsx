function apply3D(opacity) {
    var DDD = app.activeDocument.layerSets[0].layerSets[0].layers.getByName('3D')
    app.activeDocument.activeLayer = DDD;
    DDD.opacity = opacity;
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
    var no_3D_effect = index === -1;

    var opacity = (no_3D_effect) ? 0:33; // 33% when the 3D effect is on
    apply3D(opacity);
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
