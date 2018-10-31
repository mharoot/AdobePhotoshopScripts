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
 * Extracts the Hex from color 1
 * @param {String} csv path/to/filename.csv.
 */
function extractColor1Hex(csv)
{
    // Extract the Color from the CSV
    var color1 = getColor1Hex(csv);
    var myColor = new SolidColor();  
    myColor.rgb.hexValue=color1;
    changeForegroundColor(myColor);
}

/**
 * Extracts the Hex from color 1
 * @param {String} csv path/to/filename.csv.
 * @return {String} Should there be no color 1 in csv then we return #808080 else we return the hex code.
 */
function getColor1Hex(csv)
{
    // Extract data from the CSV
    var str = extractAsString(csv); 

    // Extract the Colors from the CSV
    var lines  = str.split("\n");
    lineItems  = lines[1].split(",");

    

    // color1 - MUST EXIST
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

function run_script() {
    extractColor1Hex('/Users/gpcolor/Desktop/MICHAEL/order_1.csv')
}

run_script();