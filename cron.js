import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import User from './models/User.js';
var app = express();
import cors from 'cors';
app.use(cors());
import lookup from "coordinate_to_country"

import express from 'express';
import countries from './public/countries.json' with { type: "json" };
import findLatLongRandom from './components/findLatLongServer.js';
import cityGen from './serverUtils/cityGen.js';

configDotenv();

// let dbEnabled = false;
// if (!process.env.MONGODB) {
//   console.log("[MISSING-ENV WARN] MONGODB env variable not set".yellow);
//   dbEnabled = false;
// } else {
//   // Connect to MongoDB
//   if (mongoose.connection.readyState !== 1) {
//     try {
//       await mongoose.connect(process.env.MONGODB);
//       console.log('[INFO] Database Connected');
//       dbEnabled = true;
//     } catch (error) {
//       console.error('[ERROR] Database connection failed!'.red, error.message);
//       console.log(error);
//       dbEnabled = false;
//     }
//   }
// }


let countryLocations = {};
const locationCnt = 2000;
const batchSize = 10;


for (const country of countries) {
  countryLocations[country] = [];
}

const generateBalancedLocations = async () => {
  while (true) {
    const batchPromises = [];

    // Loop through each country and start generating one batch for each
    for (const country of countries) {
      for (let i = 0; i < batchSize; i++) {
      const startTime = Date.now(); // Start time for each country
      const locationPromise = new Promise((resolve, reject) => {
        findLatLongRandom({ location: country }, cityGen, lookup)
          .then((latLong) => {
            const endTime = Date.now(); // End time after fetching location
            const duration = endTime - startTime; // Duration calculation

            resolve({ country: latLong.country, latLong });

          })
          .catch(reject);
      });

      batchPromises.push(locationPromise);
    }
    }

    try {
      // Await the results of generating locations for all countries in parallel
      const batchResults = await Promise.all(batchPromises);

      for (const { country, latLong } of batchResults) {
        // Update country-specific locations, ensuring a max of locationCnt
        try {
          if(countryLocations[country]) {
        countryLocations[country].unshift(latLong);
        if (countryLocations[country].length > locationCnt) {
          countryLocations[country].pop();
        }
      }
      } catch (error) {
        console.error('Error updating country locations', error, country, latLong);
      }
      }



    } catch (error) {
      console.error('Error generating locations', error);
    }

    // Delay before starting the next round of generation
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

// Start generating balanced locations for all countries
generateBalancedLocations();


let allCountriesCache = [{ "lat": -19.879842659309492, "long": -43.670413454248006, "country": "BR" }, { "lat": 20.135314104756286, "long": -100.29356734837116, "country": "MX" }, { "lat": 33.78837496994207, "long": 132.71083343539289, "country": "JP" }, { "lat": 40.06074748102191, "long": 22.56026917707304, "country": "GR" }, { "lat": 51.15896475413572, "long": 3.731268442956184, "country": "BE" }, { "lat": -23.37329331485114, "long": -50.84053688318288, "country": "BR" }, { "lat": 6.716808364269906, "long": 80.06299445255699, "country": "LK" }, { "lat": -34.8959205019246, "long": 138.63880284961732, "country": "AU" }, { "lat": 46.598084644501576, "long": 2.6143392020731357, "country": "FR" }, { "lat": 43.61140651962714, "long": -72.97280304214556, "country": "US" }, { "lat": 40.24245072247337, "long": -77.17703276440484, "country": "US" }, { "lat": 48.724681302129596, "long": -1.1660591321220115, "country": "FR" }, { "lat": 16.747503749746688, "long": 77.49598950987385, "country": "IN" }, { "lat": 62.354316574600325, "long": 50.07729768499946, "country": "RU" }, { "lat": 57.75493145744408, "long": -3.911952457355695, "country": "GB" }, { "lat": 6.890809255286151, "long": 80.5954600388597, "country": "LK" }, { "lat": 24.03912002891681, "long": -104.55724154156484, "country": "MX" }, { "lat": 7.538250279715096, "long": 122.87253571338866, "country": "PH" }, { "lat": 38.33333838551845, "long": -85.65255971854496, "country": "US" }, { "lat": 19.490956234930476, "long": -99.12425237704893, "country": "MX" }, { "lat": 40.14866867132865, "long": -89.36513464791723, "country": "US" }, { "lat": 40.28630434134524, "long": -86.7353819418805, "country": "US" }, { "lat": 43.401995330505315, "long": -0.38877387612238756, "country": "FR" }, { "lat": -28.230439186143318, "long": 28.307282728397407, "country": "ZA" }, { "lat": 45.84009033077856, "long": -119.7000968144879, "country": "US" }, { "lat": -42.809590374390055, "long": 147.2981528652234, "country": "AU" }, { "lat": 40.88869028672737, "long": -72.68983284806949, "country": "US" }, { "lat": 39.29097934896099, "long": -75.63478178163903, "country": "US" }, { "lat": 5.312265515952477, "long": 100.44163552817636, "country": "MY" }, { "lat": 42.602099730386264, "long": -88.70782443523038, "country": "US" }];

let lastAllCountriesCacheUpdate = 0;

app.get('/allCountries.json', (req, res) => {
  if(Date.now() - lastAllCountriesCacheUpdate > 60 * 1000) {
    let locations = [];
    const totalCountries = countries.length;
    const locsPerCountry = locationCnt / totalCountries;
    for (const country of countries) {
      const locs = countryLocations[country];
      const randomLocations = locs.sort(() => Math.random() - 0.5).slice(0, locsPerCountry);
      locations.push(...randomLocations);
    }
    locations = locations.sort(() => Math.random() - 0.5);
    allCountriesCache = locations;
    console.log(`Updated allCountries.json cache with ${locations.length} locations`);
    return res.json({ ready: locations.length>0, locations });
  } else {
    console.log(`Serving allCountries.json from cache with ${allCountriesCache.length} locations`);
    return res.json({ ready: allCountriesCache.length>0, locations: allCountriesCache });
  }
});

app.get('/countryLocations/:country', (req, res) => {
  const country = req.params.country;
  if (!countryLocations[country]) {
    return res.status(404).json({ message: 'Country not found' });
  }
  return res.json({ ready:
    countryLocations[country].length > 0,
     locations: countryLocations[country] });
});

// Endpoint for /clueCountries.json
app.get('/clueCountries.json', (req, res) => {
  if (clueLocations.length === 0) {
    // send json {ready: false}
    return res.json({ ready: false });
  } else {
    return res.json({ ready: true, locations: clueLocations.sort(() => Math.random() - 0.5) });
  }
});


// listen 3003
app.get('/', (req, res) => {
  res.status(200).send('WorldGuessr Utils');
});

app.listen(process.env.CRON_PORT ?? 3003,async () => {
  await mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("Connected to MongoDB successfully from CRON server")
  }).catch(err=>{
    console.log("Error connecting to MongoDB from CRON server", err)
  })
  console.log('WorldGuessr Utils listening on port 3003');
});