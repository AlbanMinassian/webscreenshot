var idxarrayUrls = 0;
var loadInProgress = false;
var page = require('webpage').create();
var fs = require('fs');


// ----------------------------------------------------------------------------------------------------------
// taille de la cpture écran
// ----------------------------------------------------------------------------------------------------------
page.viewportSize = { width: 600, height: 800 }; // definir taille ecran

// ----------------------------------------------------------------------------------------------------------
// liste des liens à capturer
// ----------------------------------------------------------------------------------------------------------
var arrayUrls = new Array(
    'http://backbone4.localhost',
    'http://backbone4.localhost#/next',
    'http://127.0.0.1/zfrest4/api'
);  

// ----------------------------------------------------------------------------------------------------------
// emplcament du répertoir out
// ----------------------------------------------------------------------------------------------------------
var writePath = fs.workingDirectory;

  
// ----------------------------------------------------------------------------------------------------------
// toutes les 250 microsecondes, tester si page en cours de traitement sinon lancer le suivant
// ----------------------------------------------------------------------------------------------------------
var interval = setInterval(function() {
    if (!loadInProgress && idxarrayUrls < arrayUrls.length) {
        console.log("image " + (idxarrayUrls + 1));
        // ----------------------------------------------------------------------------------------------------------
        // page.open()
        // ----------------------------------------------------------------------------------------------------------
        page.open(arrayUrls[idxarrayUrls], function (status) {
            if (status !== 'success') {
                console.log(status + ' : Unable to load the address '+arrayUrls[idxarrayUrls]);
                phantom.exit();
            } else {
                // ----------------------------------------------------------------------------------------------------------
                // page.render()
                // give some time to javascript application to render application, load asynchronous data
                // ----------------------------------------------------------------------------------------------------------
                window.setTimeout(function () { 
                    //~ page.render( fs.workingDirectory + '/' + (idxarrayUrls + 1) + ".png");
                    
                    var pngPath = writePath + '/' + (idxarrayUrls + 1) + ".png"
                    page.render( pngPath );
                    console.log('page ' + (idxarrayUrls + 1) + ' : ' + pngPath );
                    idxarrayUrls++;
                    loadInProgress = false;
                }, 200);
            }
        });
    }
    if (idxarrayUrls == arrayUrls.length) {
        console.log("image render complete!");
        phantom.exit();
    }
}, 250);

// ----------------------------------------------------------------------------------------------------------
// page.on
// ----------------------------------------------------------------------------------------------------------
page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('page ' + (idxarrayUrls + 1) + ' load started');
};
page.onResourceReceived = function() {
    //~ console.log('onResourceReceived');
}
page.onLoadFinished = function() {
    console.log('page ' + (idxarrayUrls + 1) + ' load finished');
    // ----------------------------------------------------------------------------------------------------------
    // bug connu : si fond transparent alors affiché noir !
    // ----------------------------------------------------------------------------------------------------------
    // donc forcer couleur de fond 
    // - http://code.google.com/p/phantomjs/wiki/FAQ
    // - http://code.google.com/p/phantomjs/issues/detail?id=393
    // ----------------------------------------------------------------------------------------------------------
    page.evaluate(function() {  
        if (getComputedStyle(document.body, null).backgroundColor === 'rgba(0, 0, 0, 0)') { // tester automatiquement si noir !
            document.body.bgColor = 'white'; 
        }        
    });    
    // ----------------------------------------------------------------------------------------------------------
    // capturer écran ici ...
    // => capture vide si backbonejs
    // ==> déplacé render() dans la fonction callback de page.open() et là ca fonctionne !
    // ----------------------------------------------------------------------------------------------------------
}
