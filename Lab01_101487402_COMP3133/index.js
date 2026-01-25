const fs = require("fs");
const csv = require("csv-parser");

const canadaFile = "canada.txt";
const usaFile = "usa.txt";

if (fs.existsSync(canadaFile)) fs.unlinkSync(canadaFile);
if (fs.existsSync(usaFile)) fs.unlinkSync(usaFile);


fs.writeFileSync(canadaFile, "country,year,population\n");
fs.writeFileSync(usaFile, "country,year,population\n");

fs.createReadStream("input_countries.csv")
  .pipe(csv())
  .on("data", (row) => {
    const country = row.country || row.Country;
    const year = row.year || row.Year;
    const population = row.population || row.Population;

    const line = `${country},${year},${population}\n`;

    // Canada
    if (country.toLowerCase() === "canada") {
      fs.appendFileSync(canadaFile, line);
    }

    // United States
    if (country.toLowerCase() === "united states") {
      fs.appendFileSync(usaFile, line);
    }
  })
  .on("end", () => {
    console.log("files created!!!");
  });
