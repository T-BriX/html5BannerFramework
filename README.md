HTML5 Advertising Banner Framework
==================================

A framework for HTML5 advertising banners.

This framework uses __gulp-inject__ to inject CSS and JS directly into the html file.
Images are compressed with __gulp-imagemin__ and __pngquant__.

Requirements
------------

This framework requires node.js to work. I recommend installing it using [Node Version Manager (nvm)](https://github.com/creationix/nvm).


Installation
------------

1. Update node. Used version v7.1.0. Or simply type `$ nvm use`. This will use the node version defined in *.nvmrc*.
2. Install gulp 4. `$ npm install -g gulp-cli`.
3. Use `$ npm install` or if your using yarn simply type `$ yarn` to install node dependencies.

Tasks
-----

1. `$ gulp build` Builds the project.
2. `$ gulp watch` Builds the project and watches for changes.

License
-------
Copyright (c) 2017 Thorben Ziegler <contact@thorbenziegler.de>

"THE BEER-WARE LICENSE" (Revision 42):
<contact@thorbenziegler.de> wrote this framework. As long as you retain this notice you
can do whatever you want with this stuff. If we meet some day, and you think
this stuff is worth it, you can buy me a beer in return.
