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

// Read from recipes.json
fs.readFile('recipes.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split the file content by line to process each JSON record individually
  const lines = data.split('\n').filter((line) => line.trim() !== '');

  const uniqueBeans = new Set();

  for (const line of lines) {
    const record = JSON.parse(line);
    for (let i = 1; i <= 8; i++) {
      const beanName = record[`bean${i}Name`];
      if (beanName && beanName.trim() !== '') {
        uniqueBeans.add(beanName);
      }
    }
  }

  console.log([...uniqueBeans]);
});
