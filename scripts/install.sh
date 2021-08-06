#!/bin/bash

echo 'Checking nodejs install'
if which npm >/dev/null; then
    echo "nodejs installed"
else
    echo "Installing nodejs"
    brew install node
fi

echo 'Checking gulp-cli install'
if which gulp >/dev/null; then
    echo "gulp installed"
else
    echo "Installing gulp"
    npm i -g gulp-cli
fi

echo "Checking yarn install"
if which yarn >/dev/null; then
    echo "yarn installed"
else
    echo "yarn installing"
    npm i -g yarn
fi

echo "Install our modules"
yarn add gulp gulp-sass browser-sync gulp-autoprefixer gulp-clean-css gulp-purgecss del gulp-minify gulp-zip --dev

echo "Checking node-sass install"
if which node-sass >/dev/null; then
    echo "node-sass installed"
else
    echo "node-sass installing"
    npm i node-sass --save-dev
fi
