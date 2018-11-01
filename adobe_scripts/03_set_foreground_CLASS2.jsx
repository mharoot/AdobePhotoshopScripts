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
 * Searches for the item_meta COLOR 1 property.  Alerts user of the script of the problem.
 * This function is used to walk to the COLOR 1 Property which is a mandatory data value.
 * It then spits out the index we should use to walk until we find what we are looking to extract.
 * @param {Array} lineItems the data value columns.
 * @return {Int} the index of the line items where I should begin my walk to extract additonal data. 
 *               a value of -1 means there is a problem with the CSV.
 */
function checkForErrors(lineItems)
{
    var i = 0;

    while (lineItems[i].indexOf("COLOR 1=#") === -1 && i < lineItems.length) {
        i++;
    }

    if (i === lineItems.length) {
        alert("CSV PROBLEM: item_meta 'COLOR 1' NOT found!")
        return -1;
    } else {
        // alert("item_meta - COLOR 1: position "+i)
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
 * Extract the Hex Code from the csv file.   (color 1=CLASS2HEX layer in photoshop)
 * @param {String} csv path/to/filename.csv.
 * @return {String} Should there be no color 1 in csv 
 *                  then we return #808080 && alert in photoshop of the Problem.
 *                  else we return the hex code.
 */
function getColor1HexCode(csv)
{
    // Extract data from the CSV
    var str = extractAsString(csv); 

    // Extract the Colors from the CSV
    var lines  = str.split("\n");
    lineItems  = lines[1].split(",");
    

    // Extract index of 3 by walking to Color 1.  We are error checking
    // here since it is a special case. Color 1 is mandatory.
    var index = checkForErrors(lineItems);
    var c1 = lineItems[index]; 
    
    // Extract the HEX Values only
    var c1Index = c1.indexOf('#');
    if (c1Index < 0)
    {
        alert("No Color 1 Found in CSV! Returning 808080");
        return "808080";
    } else {
        // give color 1 hex
        return c1.substring(c1Index+1, c1.length);
    }
    
}



/**
 * 
 * @param {String} csv path/to/filename.csv. 
 */
function run_script(csv) {
    setColor1HexForeground(csv)
}

/**
 * Extracts the Hex from color 1
 * @param {String} csv path/to/filename.csv.
 */
function setColor1HexForeground(csv)
{
    // Extract the Color from the CSV
    var color1 = getColor1HexCode(csv);
    var myColor = new SolidColor();  
    myColor.rgb.hexValue=color1;
    changeForegroundColor(myColor);
}

// Script Entry Point
run_script('/Users/gpcolor/Desktop/MICHAEL/order_1.csv');