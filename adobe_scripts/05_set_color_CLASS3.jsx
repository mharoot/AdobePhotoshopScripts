
/**
 * Extract the Hex Code from the csv file.   (color 2=CLASS3HEX layer in photoshop)
 * @param {String} csv path/to/filename.csv.
 * @return {String} If no Hex Code for color 2 in csv then we return #808080 else we return the Hex Code.
 */
function getColor2HexCode(csv)
{
    // Extract data from the CSV
    var str = extractAsString(csv); 
    
    // Extract the Colors from the CSV
    var lines  = str.split("\n");
    lineItems  = lines[1].split(",");
   
    // color2 - MUST EXIST
    var index = walkToColor2(lineItems);

    // If there is no color 2 in csv then return no color
    if (index === -1) {
        return "808080";
    } else {
        var c2 = lineItems[index]; 
        
        // Extract the HEX Values only
        var c2Index = c2.indexOf('#');

        // return #808080 if there is no Color 2 Hex Code
        var hex = (c2Index < 0) ? "808080": c2.substring(c2Index+1, c2.length);
        return hex;
    }
}

/**
 * Sets the CLASS3HEX layer in photoshop to the Hex Code value color.
 * @param {String} c The hex value of the color.
 */
function setClass3HexLayer(c) {
    var Color = new SolidColor;
    var x = c.replace('#', '');
    Color.rgb.hexValue = x;
   
    // if you open up photoshop, the file is sitting in a folder that is 3 directories deep.
    // hence why layerSets[0] is repeated 3 times in order,  ( layerSets[0] = 1st subfolder )
    var PTL = app.activeDocument.layerSets[0].layerSets[0].layerSets[0].layers.getByName('CLASS3HEX');
    
    // set this layer as the selected active layer (simulates clicking on the CLASS3HEX layer)
    app.activeDocument.activeLayer = PTL;

    // we want the entire layer not just a portion so we select all
    app.activeDocument.selection.selectAll();
    app.activeDocument.selection.fill(Color);

    // deselect that layer to avoid accidental changes.
    app.activeDocument.selection.deselect();
}

/**
 * Searches for the index of item_meta COLOR 2 property.
 * @param {Array} lineItems the data value columns.
 * @return {Int}  -1 means not found | greater than -1 is an index value
 */
function walkToColor2(lineItems)
{
    // Walk to COLOR 2.
    var i = 0;
    while ( i < lineItems.length) {
        if (lineItems[i].indexOf("COLOR 2=#") > 0 )
            break;
        i++;
    }

    // if No COLOR 2 found then return -1 else greater than -1
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
    // get the CLASS3HEX layer hex color code from csv file
    var hex = getColor2HexCode(csv);

    // set the CLASS3HEX layer in photoshop
    setClass3HexLayer(hex);
}

run_script('/Users/gpcolor/Desktop/MICHAEL/order_1.csv');