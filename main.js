#!/usr/bin/env node

'use strict';

var fs = require('fs'),
    path = require('path'),
    srcDir = process.argv[2],
    dstDir = __dirname + '/js/';

if (undefined === srcDir) {
    console.error('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' <bootstrap-dir>');
    process.exit(-1);
}

srcDir = path.normalize(srcDir);

if (-1 === srcDir.indexOf('/', srcDir.length - 1)) {
    srcDir += '/';
}

srcDir += 'js/';

if (!fs.existsSync(srcDir) || !fs.statSync(srcDir).isDirectory()) {
    console.error('Specified directory does not exist or does not contain \'js\' subdirectory');
    process.exit(-2);
}

if (!fs.existsSync(dstDir)) {
    fs.mkdirSync(dstDir);
}

fs.readdirSync(srcDir).forEach(function (filename) {
    var filePath = srcDir + filename,
        pluginName,
        content;

    if ('.js' !== path.extname(filename) || !fs.statSync(filePath).isFile()) {
        return;
    }

    pluginName = path.basename(filename, '.js');
    content = fs.readFileSync(filePath, 'utf8');

    fs.writeFileSync(dstDir + filename, amdify(pluginName, content));
});

function amdify(pluginName, content) {
    var deps = getDependencies(pluginName).map(function (name) {
            return "'" + name + "'";
        });

    return [
        'define([' + deps.join(', ') + '], function (jQuery) {\n',
        indent(content), '\n',
        '});'
    ].join('');
}

function indent(content) {
    return content
        .split('\n')
        .map(function (line) {
            return '    ' + line;
        })
        .join('\n');
}

function getDependencies(pluginName) {
    var deps = ['jquery'];

    if ('transition' !== pluginName) {
        deps.push('bootstrap/transition');
    }

    if ('popover' === pluginName) {
        deps.push('bootstrap/tooltip');
    }

    return deps;
}

