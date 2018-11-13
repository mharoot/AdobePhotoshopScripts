

(function start(){
    // select_channel("THAT IS NOT THERE");
    select_channel("day_night_mask");
})();

function select_channel(name)
{
    var channels = app.activeDocument.channels;
    try {
        var selectedChannel = channels.getByName(name);
        app.activeDocument.activeChannels = [selectedChannel];  
        app.doAction('001_found_day_night_mask', '000_client_original_preprocess.atn');
    } catch (e) {
        app.doAction('001_missing_day_night_mask', '000_client_original_preprocess.atn');
    }
}
 
