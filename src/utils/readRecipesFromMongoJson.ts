import * as fs from 'fs';

// Read the file
fs.readFile('recipes.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split by lines and filter out empty lines
  const lines = data.split('\n').filter((line) => line.trim() !== '');

  // Extract product names
  const productNames: string[] = [];
  for (let line of lines) {
    try {
      const obj = JSON.parse(line);
      productNames.push(obj.product);
    } catch (parseErr) {
      console.error('Error parsing JSON from line:', parseErr);
    }
  }

  // Write product names to a new file
  fs.writeFile('output_file.txt', productNames.join('\n'), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Product names saved successfully!');
    }
  });
});
