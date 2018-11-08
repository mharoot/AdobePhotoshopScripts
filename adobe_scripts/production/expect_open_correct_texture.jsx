#include "json2.js" 
(function start(){
    var order = loadJson();
})();

// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('expect_open_correct_texture.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}