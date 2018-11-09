// 083_expect_open_pattern_qrcode.jsx

#include "json2.js" 
// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('082_expect_open_printby_virtual.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

var dir = '/Users/gpcolor/Desktop/digitaldecor-backend'; 


(function start(){
    var order = loadJson();
    // TODO
})();

