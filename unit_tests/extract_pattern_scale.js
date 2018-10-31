var item_meta = "Substrate=Paper,Wall Width (ft)=1,Wall Height (ft)=1,Total Area (sq. ft.)=100,COLOR 1=#F0EA2F,COLOR 2=#25C7D3,Aging Effect=Lived-in,3D Effect=On,Texture Effect=Wood Grain,PATTERN SCALE=138, SAMPLE=YES";

var find = 'PATTERN SCALE=';
var index = item_meta.indexOf(find);

var patternScale = item_meta.substring(index+find.length, item_meta.length);
patternScale = patternScale.substring(0,patternScale.indexOf(','));


alert(patternScale);