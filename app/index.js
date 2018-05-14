
const Generator = require('yeoman-generator');

module.exports = class extends Generator { 

  scaffolding() {
  // Copy dot files
  this.fs.copy(
    this.templatePath('.*'),
    this.destinationRoot()
  );
  console.log(this.templatePath());
  console.log(this.destinationPath());
  
  

    // Copy HTML
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('app/index.html'),
      { title: this.appname }
    );

    // Copy README file
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath(`README.md`)
    );

     // Copy stylesheet
     this.fs.copy(
      this.templatePath('src/styles/app.sass'),
      this.destinationPath(`app/src/styles/app.sass`)
    );

     // Copy app script
     this.fs.copy(
      this.templatePath('src/scripts/index.js'),
      this.destinationPath(`app/src/scripts/index.js`)
    );

    this.fs.copy(
      this.templatePath('favicon.ico'),
      this.destinationPath('favicon.ico')
    );
  }

  createPackageJson() {
    let pkg = {
      name: this.appname,
      version: '1.0.0',
      description: '',
      keywords: [],
      author: '',
      "private": true,
      "engines": {
        "node": ">=8.0"
      },
      "scripts": {
        "sass": "sass --style compressed --update app/src/styles/app.sass:app/dist/styles/app.css",
        "browserify": "browserify app/src/scripts/index.js -o app/dist/scripts/bundle.js",
        "watch:sass": "sass --watch app/src/styles/app.sass:app/dist/styles/app.css",
        "watch:js": "watchify app/src/scripts/index.js -o app/dist/scripts/bundle.js",
        "server": "live-server --open='app'",
        "watch": "parallelshell 'npm run watch:sass' 'npm run watch:js' 'npm run server'"
      },
      "browserify": {
        "transform": [
          "browserify-shim"
        ]
      },
      "browserify-shim": {
        "jQuery": "$",
        "underscore": "_"
      }
    };

    this.fs.extendJSON(this.destinationPath('package.json'), pkg);
  }

  install() {
    this.npmInstall([
      'browserify',
      'jquery',
      'jquery-ui',
      'underscore',
      'bootstrap-sass',
      'font-awesome',
      'browserify',
      'watchify',
      'browserify-shim',
      'parallelshell',
      'live-server',
      'onchange'
    ], { 'save-dev': true });
  }
}

