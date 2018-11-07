#include "json2.js" 

// load JSON function
function loadJson() {
    var script = new File($.fileName).toString();
    var json_path = script.split('dd_order_sample_build_2.jsx').shift() + 'order.json'
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
    var textureEffect = order.item_meta["Texture Effect"].replace(/\s/g, '_').toUpperCase();
    var wallHeight = order.item_meta["Wall Height"] * 12;
    var wallWidth = order.item_meta["Wall Width"] * 12;
    var DDDopacity = order.item_meta["3D Effect"];
    var sample = order.item_meta["SAMPLE"];
    var shipping_name = order.shipping_first_name + ' ' + order.shipping_last_name
    var shipping_address = order.shipping_address + '\r\n' + order.shipping_city + ' ' + order.shipping_state + ', ' + order.shipping_postcode + '\r\n' + order.shipping_country
    var phone_number = order.billing_phone;

    //app.dispayDialogs = DialogModes.NO

    try {
        app.preferences.rulerUnits = Units.INCHES
        app.preferences.typeUnits = TypeUnits.POINTS
               
        fetchPattern(path + '/bin/virtual_templates/TX_virtual.psd');
        resizeCanvas(52, 23);

        if (textureEffect && textureEffect != 'NONE') {
               fetchPattern(path + '/bin/texture_aging_original/'+textureEffect+'/TX_'+textureEffect+'_virtual.psd');    
                resizeCanvas(52, 23);
               app.activeDocument.layers[0].duplicate(app.documents[0].layers[0], ElementPlacement.PLACEBEFORE) 
               app.documents[1].close(SaveOptions.DONOTSAVECHANGES);
                app.activeDocument.flatten();
                app.activeDocument.close(SaveOptions.SAVECHANGES);

                fetchPattern(path + '/bin/texture_aging_original/'+textureEffect+'/texture_'+textureEffect+'_virtual.psd');    
                app.activeDocument.flatten();
                savePSD(path, 'virtual_templates/texture_virtual.psd');
                app.activeDocument.close(SaveOptions.SAVECHANGES);

                fetchPattern(path + '/bin/texture_aging_original/'+textureEffect+'/aging_'+textureEffect+'_virtual.psd');    
                app.activeDocument.flatten();
                savePSD(path, 'virtual_templates/aging_virtual.psd');
                app.activeDocument.close(SaveOptions.SAVECHANGES);

                fetchPattern(path + 'bin/' + item_name + '_COLOR_sample.psd');
                fetchPattern(path + '/bin/filters/'+textureEffect+'/TX_'+textureEffect+'_COLOR_FILTER_SAMPLE.psd');
                resizeCanvas(52, 23);  
                app.activeDocument = app.documents[0];  
                app.documents[0].layers[0].duplicate(app.documents[1].layers[0], ElementPlacement.PLACEBEFORE)
                app.activeDocument = app.documents[1];           
                app.documents[0].close(SaveOptions.DONOTSAVECHANGES);
                app.activeLayer = app.activeDocument.layers[0];
                app.doAction('CREATE_SMART_OBJECT', 'SELECT_TEXTURE.atn');
                app.doAction('TRANSFER_FILTER', 'SELECT_TEXTURE.atn');
                savePSD(path, 'COLOR_FILTERED_sample');
                closeDoc()
         } else {
                fetchPattern(path + '/bin/texture_aging_original/inert/TX_INERT_virtual_sample.psd');    
                resizeCanvas(52, 23);
                app.activeDocument.layers[0].duplicate(app.documents[0].layers[0], ElementPlacement.PLACEBEFORE) 
                app.documents[1].close(SaveOptions.DONOTSAVECHANGES);
                app.activeDocument.flatten()
                app.activeDocument.close(SaveOptions.SAVECHANGES);

                fetchPattern(path + '/bin/texture_aging_original/inert/texture_inert_virtual.psd');    
                app.activeDocument.flatten()
                savePSD(path, 'virtual_templates/texture_virtual.psd')
                app.activeDocument.close(SaveOptions.SAVECHANGES);

                fetchPattern(path + '/bin/texture_aging_original/inert/aging_inert_virtual.psd');    
                app.activeDocument.flatten()
                savePSD(path, 'virtual_templates/aging_virtual.psd')
                app.activeDocument.close(SaveOptions.SAVECHANGES);

                fetchPattern(path + 'bin/' + item_name + '_COLOR_sample.psd')
                fetchPattern(path + '/bin/filters/INERT/TX_INERT_COLOR_FILTER_SAMPLE.psd');
                resizeCanvas(52, 23);
                app.activeDocument = app.documents[0]  
                app.documents[0].layers[0].duplicate(app.documents[1].layers[0], ElementPlacement.PLACEBEFORE)
                app.activeDocument = app.documents[1]            
                app.documents[0].close(SaveOptions.DONOTSAVECHANGES);
                app.activeLayer = app.activeDocument.layers[0]
                app.doAction('CREATE_SMART_OBJECT', 'SELECT_TEXTURE.atn')
                app.doAction('TRANSFER_FILTER', 'SELECT_TEXTURE.atn')
                savePSD(path, 'COLOR_FILTERED_sample')
                closeDoc()
       
                fetchPattern(path + 'bin/' + item_name + '_3D_sample.psd')
                fetchPattern(path + '/bin/filters/INERT/TX_INERT_3d_FILTER_sample.psd');   
                resizeCanvas(52, 23);
                app.activeDocument = app.documents[0]  
                app.documents[0].layers[0].duplicate(app.documents[1].layers[0], ElementPlacement.PLACEBEFORE)
                app.activeDocument = app.documents[1]            
                app.documents[0].close(SaveOptions.DONOTSAVECHANGES);
                app.activeLayer = app.activeDocument.layers[0]
                app.doAction('CREATE_SMART_OBJECT', 'SELECT_TEXTURE.atn')
                app.doAction('TRANSFER_FILTER', 'SELECT_TEXTURE.atn')
                savePSD(path, '3D_FILTERED_sample')
                closeDoc()

                fetchPattern(path + 'bin/' + item_name + '_MASK_sample.psd')
                fetchPattern(path + '/bin/filters/INERT/TX_INERT_MASK_FILTER_sample.psd');   
                resizeCanvas(52, 23);
                app.activeDocument = app.documents[0]  
                app.documents[0].layers[0].duplicate(app.documents[1].layers[0], ElementPlacement.PLACEBEFORE)
                app.activeDocument = app.documents[1]            
                app.documents[0].close(SaveOptions.DONOTSAVECHANGES);
                app.activeLayer = app.activeDocument.layers[0]
                app.doAction('CREATE_SMART_OBJECT', 'SELECT_TEXTURE.atn')
                app.doAction('TRANSFER_FILTER', 'SELECT_TEXTURE.atn')
                savePSD(path, 'MASK_FILTERED_sample')
                closeDoc()
         }
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

function fetchPattern(path) {
    var patternFile = new File(path);
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

function savePSD(path, type) {
    var doc = activeDocument;
    var options = new PhotoshopSaveOptions()
    var file = new File(path + 'bin/' + type)
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
    app.activeDocument.resizeImage(UnitValue(scaleH, 'inch'), UnitValue(scaleH, 'inch'), AnchorPosition.TOPLEFT);
}

