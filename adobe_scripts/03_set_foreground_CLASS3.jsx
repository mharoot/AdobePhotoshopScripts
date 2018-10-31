/**
 * Literally changes only the foreground color in photoshop.
 * @param {SolidColor} color 
 */
function changeForegroundColor(color) 
{
    // app is litterally Adobe Photoshop CC 2017
    // accessing the foregroundColor property of type SolidColor
    app.foregroundColor = color;
}

/**
 * Extracts the Hex from color 2
 * @param {String} csv path/to/filename.csv.
 */
function extractColor2Hex(csv)
{
    // Extract the Color from the CSV
    var color2 = getColor2Hex(csv);
    var myColor = new SolidColor();  
    myColor.rgb.hexValue=color2;
    changeForegroundColor(myColor);

}

/**
 * Extracts the Hex from color 2
 * @param {String} csv path/to/filename.csv.
 * @return {String} Should there be no color 2 in csv then we return #808080 else we return the hex code.
 */
function getColor2Hex(csv)
{
    // Extract data from the CSV
    var str = extractAsString(csv); 
    
    // Extract the Colors from the CSV
    var lines  = str.split("\n");
    lineItems  = lines[1].split(",");
   
    // color2 - MUST EXIST
    var index = checkForErrors(lineItems);
    var c2 = lineItems[index]; 
    
    // Extract the HEX Values only
    var c2Index = c2.indexOf('#');

    // return #808080 if there is no Color 2 Hex Code
    var hex = (c2Index < 0) ? "808080": c2.substring(c2Index+1, c2.length);
    return hex;
}

/**
 * Searches for the item_meta COLOR 2 property.  Alerts user of the script of the problem.
 * This function is used to walk to the COLOR 2 Property which is an OPTIONAL value
 * It then spits out the index we should use to walk until we find what we are looking to extract.
 * @param {Array} lineItems the data value columns.
 * @return {Int} the index of the line items where I should begin my walk to extract additonal data. 
 *               a value of -1 means there is a problem with the CSV.
 */
function checkForErrors(lineItems)
{
    // Walk to COLOR 2.
    var i = 0;
    while (lineItems[i].indexOf("COLOR 2=#") === -1 && i < lineItems.length) {
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

function run_script() {
    extractColor2Hex('/Users/gpcolor/Desktop/MICHAEL/order_1.csv')
}

run_script();