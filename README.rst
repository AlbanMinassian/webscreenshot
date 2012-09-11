.. -*- coding: utf-8 -*-

webscreenshot
=============

Présentation
-----------------------------------------

Capture d'écrans web en lot à l'aide de `phantomjs <http://phantomjs.org>`_

Usage
-----------------------------------------

- ``cd webscreenshot``
- ``vi webscreenshot.js`` :

    - corriger variable ``arrayUrls`` pour ajouter les url à capturer en lot
    - corriger ``page.viewportSize`` pour définir taille capture écran
    - corriger ``writePath`` pour définir le répertoire où déposer les captures
    
- ``phantomjs webscreenshot.js`` (ou F5 depuis `SciTE <www.scintilla.org/SciTE.html>`_ si ``properties.directory.enable=1``)



Installation 
-----------------------------------------

- Installer http://phantomjs.org/ et ajouter exéuctable dans PATH
- ``git clone https://github.com/ami44/webscreenshot.git``

Todo 
-----------------------------------------

- passer en argument un fichier json des urls à capturer 
- indiquer un répertoire de destination 
- voir code phantomjs-screenshots

Exemples phantomjs utiles : 
-----------------------------------------

- http://fcargoet.evolix.net/2012/01/use-phantomjs-to-take-screenshots-of-you-webapp-for-you/ ( définir une zone précise à capturer )
- http://skookum.com/blog/dynamic-screenshots-on-the-server-with-phantomjs/ ( injecter javascript après load )
- https://github.com/fzaninotto/screenshot-as-a-service