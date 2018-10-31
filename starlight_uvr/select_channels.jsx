var channels = app.activeDocument.channels;
var dayNightMaskChannel = channels.getByName("day_night_mask");
app.activeDocument.activeChannels = [dayNightMaskChannel];