





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
    // Extract data from the CSV
    var str = extractAsString(csv); 

    // Extract the Colors from the CSV
    var lines  = str.split("\n");
    lineItems  = lines[1].split(",");

    // color2 - may or may not exist
    var c2 = lineItems[53]; 
    
    // Extract the HEX Values only
    var c2Index = c2.indexOf('#');
    if (c2Index < 0)
    {
        // alert("No Color 2 Found");
        return;
    }
    var color2 = c2.substring(c2Index+1, c2.length);


    var myColor = new SolidColor();  
    myColor.rgb.hexValue=color2;
    changeForegroundColor(myColor);
    


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