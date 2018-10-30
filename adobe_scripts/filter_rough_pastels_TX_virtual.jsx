


// application entry point
function main() {
    var mapFile = new File(app.activeDocument.path + "/" + app.activeDocument.name); // The image map.
    var textureFile = new File('/Users/gpcolor/Desktop/MICHAEL/TX_virtual.psd');
    
    // applies the text fill filter using the given file
    var layerRef = app.activeDocument.artLayers.getByName("Background");
    layerRef.applyTextureFill(textureFile);
    
}

// GO!
main();


/**
 * myArtLayer.applyTextureFill( textureFile )
 * 
 * Artistic: Rough Pastels
 * Stroke Length: 17
 * Stroke Detail: 11
 * Texture: file of TX_virtual.
 * Scaling: 100%
 * Relief: 11
 * Light: Top Left
 */