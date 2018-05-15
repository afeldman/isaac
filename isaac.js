"use strict";
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow () {
    // Create the browser window.
    let {width, height} = require('electron').screen.getPrimaryDisplay().size;
    win = new BrowserWindow({width: width, height: height});
    
    // and load the index.html of the app.
    win.loadURL(url.format({
	pathname: path.join(__dirname, 'index.html'),
	protocol: 'file:',
	slashes: true
    }));
        
    // Emitted when the window is closed.
    win.on('closed', () => {
	// Dereference the window object, usually you would store windows
	// in an array if your app supports multi windows, this is the time
	// when you should delete the corresponding element.
	win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
	app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
	createWindow();
    }
});

ipcMain.on('openFile', (event, path) => { 
    const {dialog} = require('electron'); 
    const fs = require('fs') ;
   dialog.showOpenDialog(function (fileNames) { 
      
      // fileNames is an array that contains all the selected 
      if(fileNames === undefined) { 
         console.log("No file selected"); 
      
      } else { 
         readFile(fileNames[0]); 
      } 
   });
   
   function readFile(filepath) { 
      fs.readFile(filepath, 'utf-8', (err, data) => { 
         
         if(err){ 
            alert("An error ocurred reading the file :" + err.message) 
            return 
         } 
         
         // handle the file content 
         event.sender.send('fileData', data) 
      });
   } 
}); 
