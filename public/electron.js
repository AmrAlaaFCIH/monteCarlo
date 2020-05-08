const {app}=require('electron');
const Window1=require('./windows/window1');

app.allowRendererProcessReuse=true;

app.whenReady().then(Window1);