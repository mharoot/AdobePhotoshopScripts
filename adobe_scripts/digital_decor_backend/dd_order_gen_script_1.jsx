#include "json2.js" 

// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('dd_order_gen_script_1.jsx').shift() + 'order.json'
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}
function writeErrorFile(e, order_id, item_name, ited_id) {
    var script = new File($.fileName).toString();
    var err_path = script.split('adobe-scripts').shift() + 'ERROR_LOGS/'
    var saveFile = new File(err_path + order_id + '_' + ited_id + '_' + item_name + '.txt')
    saveFile.open('w');
    saveFile.write(e);
    saveFile.close();
}
// main start function
(function start() {
    var order = loadJson();
    var path = new File($.fileName).toString().split('adobe-scripts').shift();
    var id = order["order_id"];
    var item_name = order["item_name"].split(' ').shift();
    var ited_id = order["ited_id"];
    var threeD = order.item_meta["3D Effect"];
    var aging = order.item_meta["Aging Effect"];
    var color1 = order.item_meta["COLOR 1"];
    var color2 = order.item_meta["COLOR 2"] || 'inert';
    var color3 = order.item_meta["COLOR 3"] || 'inert';
    var patternScale = order.item_meta["PATTERN SCALE"];
    var substrate = order.item_meta["Substrate"];
    var textureEffect = order.item_meta["Texture Effect"].toUpperCase();
    var wallHeight = order.item_meta["Wall Height"]*12;
    var wallWidth = order.item_meta["Wall Width"]*12;
    var DDDopacity = order.item_meta["3D Effect"];
    var sample = order.item_meta["SAMPLE"];
    var shipping_name = order.shipping_first_name + ' ' + order.shipping_last_name
    var shipping_address = order.shipping_address + '\r\n' + order.shipping_city + ' ' + order.shipping_state + ', ' + order.shipping_postcode + '\r\n' + order.shipping_country
    var phone_number = order.billing_phone;

    app.dispayDialogs = DialogModes.NO

    try {
        app.preferences.rulerUnits = Units.INCHES
        app.preferences.typeUnits = TypeUnits.POINTS

        fetchPattern(item_name);
         app.doAction('set_resolution_100', 'ENGINE IMAGE FINISHING.atn')
      
        resizeImageToScale(patternScale / 200);

        resizeCanvas(wallWidth, wallHeight);
     
        app.activeDocument.layerSets[0].layerSets[0].layers[0].visible = false

         savePSD(path, item_name, '_MASK_interim')
        
        app.activeDocument.layerSets[0].layers[0].remove()

        setColor1(color1);
        if (color2 != 'inert') { setColor2(color2) };
        if (color3 != 'inert') { setColor3(color3) };
            
        savePSD(path, item_name, '_COLOR')
        
        //make 3d layer visible
         app.activeDocument.layerSets[0].layerSets[0].layers[0].visible = true
        // make colors invisible 
        app.activeDocument.layerSets[0].layerSets[0].layerSets[0].visible = false


        if (DDDopacity === 'On') { apply3D(100) }
        if (DDDopacity === 'Half') { apply3D(50) }
        if (DDDopacity === 'Off') { apply3D(0) }

        savePSD(path, item_name, '_3D')
         closeDoc();

        var mask = new File(path +'bin/' + item_name +'_MASK_interim' + '.psd');
        app.open(new File(mask));

        app.activeDocument.layerSets[0].layerSets[0].layers[0].visible = true
        app.activeDocument.layerSets[0].layerSets[0].layers.getByName('3D').remove()
       
       app.doAction('set_greyscale', 'ENGINE IMAGE FINISHING.atn')

        
        app.activeDocument.flatten()
        savePSD(path, item_name, '_MASK')
        closeDoc();
        
        var threeD = new File(path +'bin/' + item_name +'_3D' + '.psd');
        app.open(new File(threeD));
         app.activeDocument.layerSets[0].layerSets[0].layerSets[0].visible = true
          app.activeDocument.layerSets[0].layerSets[0].layerSets[0].remove()
        app.doAction('set_greyscale', 'ENGINE IMAGE FINISHING.atn')
              
        app.activeDocument.flatten()
        savePSD(path, item_name, '_3D')
        closeDoc();

        var colors = new File(path +'bin/' + item_name +'_COLOR' + '.psd');
        app.open(new File(colors));
         app.activeDocument.layerSets[0].layerSets[0].layers.getByName('3D').visible = true
            app.activeDocument.layerSets[0].layerSets[0].layers.getByName('3D').remove()
       
        app.activeDocument.flatten()
        savePSD(path, item_name, '_COLOR')
        closeDoc();     
        
    }
    catch (e) {
        writeErrorFile(e, order.order_id, order.item_name, order.ited_id)
        app.activeDocument = app.documents[0];
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
})();

function fetch_texture(texture) {
    var patternFile = new File(texture);
    app.open(new File(patternFile));
}

function fetchPattern(name) {
    var patternFile = new File('/Users/gpcolor/Desktop/digitaldecor-backend/Image Pattern Library/' + name + '.psd');
    app.open(new File(patternFile));
}
function resizeCanvas(width, height) {
    app.activeDocument.resizeCanvas(UnitValue(width, "inch"), UnitValue(height, "inch"), AnchorPosition.TOPLEFT);
}

function closeDoc() {
    while (app.documents.length > 0) {
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
}

function apply3D(opacity) {
    var DDD = app.activeDocument.layerSets[0].layerSets[0].layers.getByName('3D')
    app.activeDocument.activeLayer = DDD;
    DDD.opacity = opacity;
}
function setColor1(c) {
    var Color = new SolidColor;
    var x = c.replace('#', '');
    Color.rgb.hexValue = x;
    var PTL = app.activeDocument.layerSets[0].layerSets[0].layerSets[0].layers.getByName('CLASS2HEX')
    app.activeDocument.activeLayer = PTL
    app.activeDocument.selection.selectAll();
    app.activeDocument.selection.fill(Color);
    app.activeDocument.selection.deselect();
}
function setColor2(c) {
    var Color = new SolidColor;
    var x = c.replace('#', '');
    Color.rgb.hexValue = x;
    var PTL = app.activeDocument.layerSets[0].layerSets[0].layerSets[0].layers.getByName('CLASS3HEX')
    app.activeDocument.activeLayer = PTL
    app.activeDocument.selection.selectAll();
    app.activeDocument.selection.fill(Color);
    app.activeDocument.selection.deselect();
}
function setColor3(c) {
    var Color = new SolidColor;
    var x = c.replace('#', '');
    Color.rgb.hexValue = x;
    var PTL = app.activeDocument.layerSets[0].layerSets[0].layerSets[0].layers.getByName('CLASS4HEX')
    app.activeDocument.activeLayer = PTL
    app.activeDocument.selection.selectAll();
    app.activeDocument.selection.fill(Color);
    app.activeDocument.selection.deselect();
}

function savePSD(path, item_name , type){
    var doc = activeDocument;
    var options = new PhotoshopSaveOptions()
    var file = new File(path + 'bin/'+item_name+type)
    options.layers = true;
    doc.saveAs(new File(file, options, true));
}

function saveFile(id, ited_id, path) {
    var doc = activeDocument;
    var file = new File(path + 'GENERATED/' + id + '-' + ited_id + ".tiff");
    var opts = new TiffSaveOptions();
    opts.LayerCompression = true;
    opts.layers = true;
    opts.saveImagePyramid = true;
    opts.imageCompression = TIFFEncoding.JPEG;
    opts.jpegQuality = 12;
    doc.saveAs(new File(file, opts, true));
}
function resizeImageToScale(scalePercent) {
    var scaleW = app.activeDocument.width * scalePercent
    var scaleH = app.activeDocument.height * scalePercent
    app.activeDocument.resizeImage(UnitValue(scaleH, 'inch'), UnitValue(scaleH, 'inch'), null, ResampleMethod.BICUBICSHARPER);
}

