/*
 gulp-imports
 Author: Jim Cowart (http://freshbrewedcode.com/jimcowart)
 License: MIT (http://www.opensource.org/licenses/mit-license)
 Version 0.0.2 (really, it should be 0.0.0.0.0.0.2)
 */

/*global require, module, Buffer */

var fs = require('fs');
var path = require('path');
var evs = require('event-stream');
var g_util = require('gulp-util');

// TODO: adjust these to be more forgiving with whitespace....
var patterns = {
    html: /([<][!][-]{2}).?import[(]?.?["'](.*)["'].?[)]?.?[-]{2}[>]/g,
    js: /([\/]{2}|[\/][*]).?import.?[(]?.?["'](.*)["'].?[)]?[;]?.*?(\n[*][\/])?/g,
    css: /([\/]{2}|[\/][*]).?import[(]?.?["'](.*)["'].?[)]?([*][\/])?/g,
    yaml: /([ \t]*)[-][ ]?import[:][ ]*["'](.*)["']/g,
    yml: /([ \t]*)[-][ ]?import[:][ ]*["'](.*)["']/g,
    json: /([ \t]*)[-][ ]?import[:][ ]*["'](.*)["']/g
};

var getExtension = function(p) {
    return path.extname(p).substr(1).toLowerCase();
};

function getImport(ext, contents, dirname) {
    patterns[ext].lastIndex = 0; // OH lastIndex - how I HATE you.
    var match = patterns[ext].exec(contents);
    return match ? {
        matchText: match[0],
        index: match.index,
        path: path.join(dirname, match[2])
    } : undefined;
}

function processMatch(_import, contents) {
    return contents.substring(0, _import.index) +
        processFile(
            _import.path,
            String(fs.readFileSync(_import.path))
    ) +
        contents.substring(_import.index + _import.matchText.length);
}
function processFile(p, contents) {
    var ext = getExtension(p);
    var processed = contents,
        _import;
    while (_import = getImport(ext, processed, path.dirname(p))) {
        processed = processMatch(_import, processed);
    }
    return processed;
}

module.exports = function() {

    function processImports(file) {
        var contents = String(file.contents);
        var ext = getExtension(file.path);

        // I'm no stream guru yet - so I have no idea if this can be done.....yet....
        if (file.isStream()) {
            this.emit('error', new g_util.PluginError('gulp-imports', 'Yikes - sorry about this, but streams are not supported yet.'));
        }

        if (patterns.hasOwnProperty(ext)) {
            if (file.isBuffer()) {
                contents = processFile(file.path, contents);
                file.contents = new Buffer(contents);
            }
        }

        this.emit('data', file);
    }

    return evs.through(processImports);
};