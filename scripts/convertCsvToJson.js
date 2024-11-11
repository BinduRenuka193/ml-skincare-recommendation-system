import fs from 'fs';
import { parse } from 'csv-parse';

const inputFile = '../src/data/products.csv';
const outputFile = '../src/data/products.json';

const parser = parse({ columns: true, trim: true });

const products = [];

fs.createReadStream(inputFile)
  .pipe(parser)
  .on('data', (row) => {
    products.push({
      product_href: row.product_href,
      name: row.name,
      product_type: row.product_type,
      brand: row.brand,
      notable_effects: row.notable_effects,
      skintype: row.skintype,
      price: row.price_rs,
      picture_src: row.picture_src
    });
  })
  .on('end', () => {
    fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));
    console.log(`Converted ${products.length} products to JSON`);
  });
