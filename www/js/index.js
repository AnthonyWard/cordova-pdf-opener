/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        let sourcePdf = cordova.file.applicationDirectory + "www/test.pdf";
        let fileMIMEType = "application/pdf"

        resolveLocalFileSystemURL(sourcePdf, function(entry) {
            var nativePath = entry.toInternalURL();
            openTheThing(nativePath, fileMIMEType);
        });

        var pdfFileName = "test.pdf",
			targetPdf;
        targetPdf = cordova.file.externalDataDirectory + pdfFileName;

        // Check whether the sample PDF file exists.
        window.resolveLocalFileSystemURL(
            sourcePdf,
            loadPdfFromFileEntry, // success
            function (error) { //error
                console.log(`copying from ${sourcePdf.toURL} to ${targetPdf.toURL}`)
                copyFile(
                    sourcePdf,
                    targetPdf,
                    loadPdfFromFileEntry,
                    function(error) {
                        alert("Error copying file.");
                        console.log("Error: " + JSON.stringify(error, null, 4));
                    });
            });


        function openTheThing(filePath, fileMIMEType) {
            cordova.plugins.fileOpener2.open(
                filePath, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Download/starwars.pdf
                fileMIMEType, 
                { 
                    error : function(e) { 
                        alert('Error status: ' + e.status + ' - Error message: ' + e.message + '. File path: ' + filePath);
                    },
                    success : function () {
                        alert('file opened successfully'); 				
                    }
                }
            );
        }

        function loadPdf(targetUrl) {
            console.log("Loading PDF file from: " + targetUrl);
            // window.open(targetUrl, "_system", "location=yes,hidden=no");
        }
        
        function loadPdfFromFileEntry(fileEntry) {
            loadPdf(fileEntry.toURL());	
        }
        
        function copyFile(sourceUri, targetUri, successFunction, errorFunction) {
            var fileTransfer = new FileTransfer();
            
            console.log("Copying PDF file from: " + sourceUri + " to: " + targetUri);	
        
            fileTransfer.download(
                encodeURI(sourceUri),
                encodeURI(targetUri),
                successFunction,
                errorFunction);
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();