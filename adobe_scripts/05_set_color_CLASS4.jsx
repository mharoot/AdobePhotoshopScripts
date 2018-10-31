
/**
 * Extracts the Hex from color 3
 * @param {String} csv path/to/filename.csv.
 * @return {String} Should there be no color 3 in csv then we return #808080 else we return the hex code.
 */
function getColor3Hex(csv)
{
    // Extract data from the CSV
    var str = extractAsString(csv); 
    
    // Extract the Colors from the CSV
    var lines  = str.split("\n");
    lineItems  = lines[1].split(",");
   
    // color2 - MUST EXIST
    var index = checkForErrors(lineItems);
    var c3 = lineItems[index]; 
    
    // Extract the HEX Values only
    var c3Index = c3.indexOf('#');

    // return #808080 if there is no Color 3 Hex Code
    var hex = (c3Index < 0) ? "808080": c3.substring(c3Index+1, c3.length);
    return hex;
}

/**
 * CLASS4HEX gets a color set.
 * @param {String} c The hex value of the color.
 */
function setClass4Hex(c) {
    var Color = new SolidColor;
    var x = c.replace('#', '');
    Color.rgb.hexValue = x;
   
    // if you open up photoshop, the file is sitting in a folder that is 3 directories deep.
    // hence why layerSets[0] is repeated 3 times in order,  ( layerSets[0] = 1st subfolder )
    var PTL = app.activeDocument.layerSets[0].layerSets[0].layerSets[0].layers.getByName('CLASS4HEX');
    
    // set this layer as the selected active layer (simulates clicking on the CLASS4HEX layer)
    app.activeDocument.activeLayer = PTL;

    // we want the entire layer not just a portion so we select all
    app.activeDocument.selection.selectAll();
    app.activeDocument.selection.fill(Color);

    // deselect that layer to avoid accidental changes.
    app.activeDocument.selection.deselect();
}

/**
 * Searches for the item_meta COLOR 3 property.  Alerts user of the script of the problem.
 * This function is used to walk to the COLOR 3 Property which is a OPTIONAL data value.
 * It then spits out the index we should use to walk until we find what we are looking to extract.
 * @param {Array} lineItems the data value columns.
 * @return {Int} the index of the line items where I should begin my walk to extract additonal data. 
 *               a value of -1 means there is a problem with the CSV.
 */
function checkForErrors(lineItems)
{
    // Walk to COLOR 3.
    var i = 0;
    while (lineItems[i].indexOf("COLOR 3=#") === -1 && i < lineItems.length) {
        i++;
    }

    // if No COLOR 2 found then return -1 else the hex code
    return (i === lineItems.length) ? -1 : i;

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
    var csvString = extractAsString(csv);

    
}

run_script('/Users/gpcolor/Desktop/MICHAEL/order_1.csv');