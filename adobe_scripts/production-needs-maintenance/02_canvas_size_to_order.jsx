
extractDimensionsFromCSV('/Users/gpcolor/Desktop/MICHAEL/order_1.csv');

/**
 * Extracts the width and height from the csv file converting from feet to inches.
 * The csv structure can never change, if so this function will break and needs to be
 * modified in order to correctly extract the width and height.
 * @param {String} csv path/to/filename.csv.
 * @return {void}
 */
function extractDimensionsFromCSV(csv)
{
    // Extract the Width and Height from the CSV
    var myCSV = new File(csv, "UTF-16");
    myCSV.open('r');
    var str    = myCSV.read();
    var lines  = str.split("\n");
    lineItems  = lines[1].split(",");
    var width  = lineItems[49];
    var height = lineItems[50];
    myCSV.close();

    // https://stackoverflow.com/questions/10003683/extract-get-a-number-from-a-string
    var w = width.replace( /^\D+/g, '');
    var h = height.replace( /^\D+/g, '');

    // feet to inches
    var wInches = w*12;
    var hInches = h*12;

    // the adobe action
    app.activeDocument.resizeCanvas(wInches,hInches,AnchorPosition.TOPLEFT)
}