
/**
 * 
 * @param {Int}    horizontalScale      The amount of horizontal distortion. Range: -999 to 999.
 * @param {Int}    verticalScale        The amount of vertical distortion. Range: -999 to 999.
 * @param {String} displacementType     The displacement type.  DisplacementMapType.STRETCHTOFIT | DisplacementMapType.TILE
 * @param {String} undefinedAreas       The treatment of undistorted areas. UndefinedAreas.WRAPAROUND | UndefinedAreas.REPEATEDGEPIXELS	
 * @param {File}   displacementMapFile  The distortion image map.   new File("c:path/to/file.psd");
 */
function applyDisplacementFilter( horizontalScale, verticalScale, displacementType, undefinedAreas, displacementMapFile ) {
    var layerRef = app.activeDocument.artLayers.getByName("Background");
    layerRef.applyDisplace( horizontalScale, verticalScale, displacementType, undefinedAreas, displacementMapFile ); 
}

// application entry point
function main() {
    var psdFile = app.activeDocument.path + "/" + app.activeDocument.name;
    
    var horizontalScale     = 0,
        verticalScale       = 5,
        displacementType    = DisplacementMapType.TILE,
        undefinedAreas      = UndefinedAreas.WRAPAROUND,
        displacementMapFile = new File(psdFile); //The distortion image map.
    
    applyDisplacementFilter( horizontalScale, verticalScale, displacementType, undefinedAreas, displacementMapFile ); 
}

// GO!
main();


