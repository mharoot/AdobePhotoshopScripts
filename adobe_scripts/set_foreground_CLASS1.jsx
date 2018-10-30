





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
    // Extract data from the CSV
    var str = extractAsString(csv); 

    // Extract the Colors from the CSV
    var lines  = str.split("\n");
    lineItems  = lines[1].split(",");
    var c1 = lineItems[52]; // color1
    //var c2 = lineItems[53]; // color2
    
    var c1Index = c1.indexOf('#');
    if (c1Index < 0)
    {
        alert("There is a problem with the csv format coming from the meta items.  This is a logic bug and it is caused from poor csv structure.  Solution is to fix csv generator.");
        return;
    }
    // Extract the HEX Values only
    var color1 = c1.substring(c1Index+1, c1.length);
    // var color2 = c2.substring(c2.indexOf('#')+1, c2.length);

    //alert ("color1: #"+ color1 + " color2: #" + color2);

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
    extractColor1Hex('/Users/gpcolor/Desktop/MICHAEL/order_1.csv')
}

run_script();