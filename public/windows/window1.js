const {BrowserWindow}=require('electron');
const WindowState=require('electron-window-state');
const isDev=require('electron-is-dev');

module.exports=()=>{
    let winState=WindowState({
        defaultHeight:1000,
        defaultWidth:1000
    })
    let Window=new BrowserWindow({
        height:winState.height,
        width:winState.width,
        x:winState.x,
        y:winState.y,
        show:false,
        webPreferences:{
            nodeIntegration:true
        }
    })
    Window.setMenu(null);
    winState.manage(Window);
    if(isDev){
        Window.loadURL('http://localhost:4000/');
        Window.webContents.toggleDevTools();
    }else{
        Window.loadFile('./build/index.html');
    }
    Window.on('ready-to-show',Window.show);
}