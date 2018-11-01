
/**
 * Extract the Hex Code from the csv file.   (color 3=CLASS4HEX layer in photoshop)
 * @param {String} csv path/to/filename.csv.
 * @return {String} If no Hex Code for color 3 in csv then we return #808080 else we return the Hex Code.
 */
function getColor3HexCode(csv)
{
    // Extract data from the CSV
    var str = extractAsString(csv); 
    
    // Extract the Colors from the CSV
    var lines  = str.split("\n"),
    lineItems  = lines[1].split(",");
   
    // Extract index of 3
    var index = walkToColor3(lineItems);

    // If there is no color 3 in csv then return no color
    if (index === -1) {
        return "808080";
    } else {
        var c3 = lineItems[index]; 
        
        // Extract the HEX Values only
        var c3Index = c3.indexOf('#');

        // return #808080 if there is no Color 3 Hex Code
        var hexCode = (c3Index < 0) ? "808080": c3.substring(c3Index+1, c3.length);
        return hexCode;
    }

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
 * Searches for the index of item_meta COLOR 3 property.
 * @param {Array} lineItems the data value columns.
 * @return {Int}  -1 means not found | greater than -1 is an index value
 */
function walkToColor3(lineItems)
{
    // Walk to COLOR 3.
    var i = 0;
    while ( i < lineItems.length) {
        if (lineItems[i].indexOf("COLOR 3=#") > 0 )
            break;
        i++;
    }

    // if No COLOR 3 found then return -1 else greater than -1
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
    // get the CLASS4HEX layer hex color code from csv file
    var hex = getColor3HexCode(csv);

    // set the CLASS4HEX layer in photoshop
    setClass4Hex(hex);
    
}

run_script('/Users/gpcolor/Desktop/MICHAEL/order_1.csv');
