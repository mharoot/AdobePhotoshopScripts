





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
 * Extracts the Hex from Class2
 * @param {String} csv path/to/filename.csv.
 */
function extractClass2Hex(csv)
{
    // Extract data from the CSV
    var str = extractAsString(csv); 

    // Extract the Colors from the CSV
    var lines  = str.split("\n");
    lineItems  = lines[1].split(",");
    var c1 = lineItems[52]; // color1
    var c2 = lineItems[53]; // color2
    
    // Extract the HEX Values only
    var color1 = c1.substring(c1.indexOf('#')+1, c1.length);
    var color2 = c2.substring(c2.indexOf('#')+1, c2.length);

    alert ("color1: #"+ color1 + " color2: #" + color2);

    var myColor = new SolidColor();  
    myColor.rgb.hexValue=color1;
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
    extractClass2Hex('/Users/gpcolor/Desktop/MICHAEL/order_1.csv')
}

run_script();