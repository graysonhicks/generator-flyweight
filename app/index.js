
const Generator = require('yeoman-generator');

module.exports = class extends Generator { 

  scaffolding() {
    // Copy dot files.
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationRoot()
    );

    // Copy HTML.
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('app/index.html'),
      { title: this.appname }
    );

    // Copy README file.
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath(`README.md`)
    );

     // Copy stylesheet.
     this.fs.copy(
      this.templatePath('src/styles/index.scss'),
      this.destinationPath(`app/src/styles/index.scss`)
    );

     // Copy app script entry.
     this.fs.copy(
      this.templatePath('src/scripts/index.js'),
      this.destinationPath(`app/src/scripts/index.js`)
    );

     // Copy app bundle placeholder.
     this.fs.copy(
      this.templatePath('dist/bundle.js'),
      this.destinationPath(`app/dist/bundle.js`)
    );

    // Copy webpack config.
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );

    // Copy favicon.
    this.fs.copy(
      this.templatePath('favicon.ico'),
      this.destinationPath('app/favicon.ico')
    );
  }

  createPackageJson() {
    let pkg = {
      name: this.appname.replace(/\s+/g, '-').toLowerCase(),
      homepage: this.appname.replace(/\s+/g, '-').toLowerCase(),
      version: '1.0.0',
      description: '',
      keywords: [],
      author: '',
      "private": true,
      "engines": {
        "node": ">=8.9.4"
      },
      "dependencies": {
        "jquery": "^2.2.0",
        "underscore": "^1.8.3",
        "popper.js": "^1.14.3",
        "bootstrap": "^4.1.1"
      },
      "devDependencies": {
        "node-sass": "^4.9.0",
        "webpack": "^4.8.3",
        "webpack-cli": "^2.1.3",
        "webpack-dev-server": "^3.1.4",
        "css-loader": "^0.28.11",
        "sass-loader": "^7.0.1",
        "style-loader": "^0.21.0",
        "file-loader": "^1.1.11",
        "html-webpack-plugin": "^3.2.0",
        "clean-webpack-plugin": "^0.1.19",
        "html-webpack-plugin": "^3.2.0"
      },
      "scripts": {
        "build": "webpack --production",
        "watch": "webpack --watch",
        "start": "webpack-dev-server --mode development --open"
      }
    };

    this.fs.extendJSON(this.destinationPath('package.json'), pkg);
  }

  install() {
    this.npmInstall([
      'jquery',
      'underscore',
      'popper.js',
      'bootstrap',
    ]);

    this.npmInstall([
      "node-sass",
      "webpack",
      "webpack-cli",
      "webpack-dev-server",
      "css-loader",
      "sass-loader",
      "style-loader",
      "file-loader",
      "clean-webpack-plugin",
      "html-webpack-plugin"
    ], { 'save-dev': true });
  }
}

