"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// Read the file
fs.readFile('recipes.json', 'utf8', function (err, data) {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    // Split by lines and filter out empty lines
    var lines = data.split('\n').filter(function (line) { return line.trim() !== ''; });
    // Extract product names
    var productNames = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        try {
            var obj = JSON.parse(line);
            productNames.push(obj.product);
        }
        catch (parseErr) {
            console.error('Error parsing JSON from line:', parseErr);
        }
    }
    // Write product names to a new file
    fs.writeFile('output_file.txt', productNames.join('\n'), function (err) {
        if (err) {
            console.error('Error writing to file:', err);
        }
        else {
            console.log('Product names saved successfully!');
        }
    });
});
