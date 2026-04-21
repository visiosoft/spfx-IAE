'use strict';

const build = require('@microsoft/sp-build-web');
const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');


build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
    var result = getTasks.call(build.rig);

    result.set('serve', result.get('serve-deprecated'));

    return result;
};

// Task to increment version
gulp.task('increment-version', function(done) {
    const packagePath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    const versionParts = packageJson.version.split('.');
    versionParts[2] = String(Number(versionParts[2]) + 1); // Increment patch version
    const newVersion = versionParts.join('.');
    
    packageJson.version = newVersion;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 4) + '\n');
    
    console.log(`✓ Version incremented to ${newVersion}`);
    done();
});

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfig) => {
    generatedConfig.plugins.push(
      new webpack.DefinePlugin({
        PACKAGE_VERSION: JSON.stringify(require('./package.json').version)
      })
    );
    return generatedConfig;
  }
});

build.initialize(require('gulp'));
