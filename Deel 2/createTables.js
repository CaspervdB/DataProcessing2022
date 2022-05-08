// This will fill the database file but will not create one, if needed create a database.db file in the same folder as this file

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err);
});

const sql1 = `CREATE TABLE kenteken(kenteken PRIMARY KEY, voertuigsoort, merk, handelsbenaming, vervaldatumAPK, datumTenaamstelling, brutoBPM, inrichting, aantalZitplaatsen, eersteKleur, tweedeKleur, aantalCilinders, cilinderInhoud, massaLedigVoertuig, toegestaandeMaximumMassaVoertuig, massaRijklaar, maximumMassaTrekkenOngeremd, maximumMassaTrekkenGeremd, datumEersteToelating, datumEersteAfgifteNederland, wachtOpKeuren, catalogusprijs, wamVerzekerd, exportIndicator, taxiIndicator, tellerstandoordeel);`;
const sql2 = `CREATE TABLE terugRoepActie(kenteken PRIMARY KEY, referentiecodeRDW,codeStatus, status)`;
const sql3 = `CREATE TABLE verbruik(kenteken PRIMARY KEY, brandstofVolgnummer, brandstofOmschrijving, brandstofverbruikBuitenDeStad, brandstofverbruikGecombineerd, brandstofverbruikStad);`;
db.run(sql1);
db.run(sql2);
db.run(sql3);