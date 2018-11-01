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
 * 
 * @param {String} csv path/to/filename.csv. 
 */
function run_script(csv) {
    setColor3HexForeground(csv)
}

/**
 * Extracts the Hex from color 3
 * @param {String} csv path/to/filename.csv.
 */
function setColor3HexForeground(csv)
{
    // Extract the Color from the CSV
    var color3 = getColor3HexCode(csv);
    var myColor = new SolidColor();  
    myColor.rgb.hexValue=color3;
    changeForegroundColor(myColor);

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

// Script Entry Point
run_script('/Users/gpcolor/Desktop/MICHAEL/order_1.csv');

