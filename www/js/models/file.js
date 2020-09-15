/* global LocalFileSystem, Connection */

import m from "mithril";
import police from "./police";



var file = {
    independentRead: function () {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
            console.log('file system open: ' + fs.name);
            fs.root.getFile("cached_crimes5.txt", { create: false, exclusive: false },
                function (fileEntry) {
                    file.readFile(fileEntry);
                }, onErrorCreateFile
            );
        }, onErrorLoadFs);
    },

    file: function(inObj) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
            console.log('file system open: ' + fs.name);
            fs.root.getFile("cached_crimes5.txt", { create: true, exclusive: false },
                function (fileEntry) {
                    file.writeFile(fileEntry, inObj);
                }, onErrorCreateFile
            );
        }, onErrorLoadFs);
    },

    writeFile: function writeFile(fileEntry, dataObj) {
        console.log("dataObj is:");
        console.log(dataObj);
        // Create a FileWriter object for our FileEntry (log.txt).
        console.log("file entry");
        console.log(fileEntry);
        fileEntry.createWriter(function (fileWriter) {
            fileWriter.truncate(0);
            fileWriter.onwriteend = function() {
                console.log("Successful file write...");
                fileWriter.write(dataObj);
                fileWriter.onwriteend = function() {
                    file.readFile(fileEntry);
                };
            };

            fileWriter.onerror = function (e) {
                console.log("Failed file write: " + e.toString());
            };

            if (!dataObj) {
                console.log("No dataObj passed");
                dataObj = new Blob(['some file data'], { type: 'text/plain' });
            }
        });
    },

    readFile: function readFile(fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();

            reader.onloadend = function() {
                var networkState = navigator.connection.type;

                console.log("Successful file read: " + this.result);
                displayFileData(fileEntry.fullPath + ": " + this.result);

                let outObj = (JSON.parse(this.result));

                if (networkState !== Connection.NONE) {
                    police.events = outObj;
                }
                console.log(outObj);
                police.cachedEvents = outObj;
                m.redraw();
            };
            reader.readAsText(file);
        }, onErrorReadFile);
    },

    createFile: function createFile(dirEntry, fileName, isAppend) {
        // Creates a new file or returns the file if it already exists.
        dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
            file.writeFile(fileEntry, null, isAppend);
        }, onErrorCreateFile);
    }
};

function onErrorCreateFile() {
    console.log("Create file fail...");
}

function onErrorLoadFs() {
    console.log("File system fail...");
}

function onErrorReadFile() {
    console.log("Read file faled...");
}

function displayFileData(data) {
    console.log("displaying file data");
    console.log(data);
}

export default file;
