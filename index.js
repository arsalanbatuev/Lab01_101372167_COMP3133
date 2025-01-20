const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

if (fs.existsSync(canadaFile)) fs.unlinkSync(canadaFile);
if (fs.existsSync(usaFile)) fs.unlinkSync(usaFile);

const writeCanada = fs.createWriteStream(canadaFile);
const writeUSA = fs.createWriteStream(usaFile);

writeCanada.write('country,year,population\n');
writeUSA.write('country,year,population\n');

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    if (row.country.toLowerCase() === 'canada') {
      writeCanada.write(`${row.country},${row.year},${row.population}\n`);
    } else if (row.country.toLowerCase() === 'united states') {
      writeUSA.write(`${row.country},${row.year},${row.population}\n`);
    }
  })
  .on('end', () => {
    console.log('CSV processing completed.');
  });
