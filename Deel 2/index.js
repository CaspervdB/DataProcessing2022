const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
let sql;
const url = require('url');
const Validator = require('jsonschema').Validator;
const v = new Validator();
const xml2js = require("xml2js");

const parser = new xml2js.Parser();

// import kentekenDraft07 from "./validatie/json/kenteken.schema.json";
// import actieDraft07 from "./validatie/json/terugRoepActie.schema.json";
// import verbruikDraft07 from "./validatie/json/verbruik.schema.json";

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./database.db', sqlite.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err);
});

app.use(bodyParser.json());

// CRUD operations for kenteken.
app.post('/kenteken', (req, res) => {
    try {
        console.log(req.body);
        parser.parseString(req.body, function (err, result) {
            let json = JSON.stringify(result);
            console.log(json + " this is json");
        });
        const { kenteken , voertuigsoort, merk, handelsbenaming, vervaldatumAPK, datumTenaamstelling, brutoBPM, inrichting, aantalZitplaatsen, eersteKleur, tweedeKleur, aantalCilinders, cilinderInhoud, massaLedigVoertuig, toegestaandeMaximumMassaVoertuig, massaRijklaar, maximumMassaTrekkenOngeremd, maximumMassaTrekkenGeremd, datumEersteToelating, datumEersteAfgifteNederland, wachtOpKeuren, catalogusprijs, wamVerzekerd, exportIndicator, taxiIndicator, tellerstandoordeel} = req.body;
        sql = "INSERT INTO kenteken(kenteken, voertuigsoort, merk, handelsbenaming, vervaldatumAPK, datumTenaamstelling, brutoBPM, inrichting, aantalZitplaatsen, eersteKleur, tweedeKleur, aantalCilinders, cilinderInhoud, massaLedigVoertuig, toegestaandeMaximumMassaVoertuig, massaRijklaar, maximumMassaTrekkenOngeremd, maximumMassaTrekkenGeremd, datumEersteToelating, datumEersteAfgifteNederland, wachtOpKeuren, catalogusprijs, wamVerzekerd, exportIndicator, taxiIndicator, tellerstandoordeel) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        db.run(sql, [kenteken , voertuigsoort, merk, handelsbenaming, vervaldatumAPK, datumTenaamstelling, brutoBPM, inrichting, aantalZitplaatsen, eersteKleur, tweedeKleur, aantalCilinders, cilinderInhoud, massaLedigVoertuig, toegestaandeMaximumMassaVoertuig, massaRijklaar, maximumMassaTrekkenOngeremd, maximumMassaTrekkenGeremd, datumEersteToelating, datumEersteAfgifteNederland, wachtOpKeuren, catalogusprijs, wamVerzekerd, exportIndicator, taxiIndicator, tellerstandoordeel], (err) => {
            if(err) return res.json({ status: 300, succes: false, error: err});
            console.log(req.body.handelsbenaming + ' with licence plate: "' +  req.body.kenteken + '" is added to database!');
        })

        return res.json({
            status: 200,
            succes: true
        })
    } catch (error) {
        return res.json({
            status: 400,
            succes: false,
        })
    }
})

app.get('/kenteken', (req, res) => {
    sql = "SELECT * FROM kenteken";
    try {
        const queryObject = url.parse(req.url, true).query;
        if(queryObject.kenteken) sql += ` WHERE kenteken="${queryObject.kenteken}"`;
        db.all(sql,[], (err, rows) => {
            if(err) return res.json({ status: 300, succes: false, error: err});

            if(rows.length<1) return res.json({ status: 300, succes: false, error: "No match"});
            return res.json({
                status: 200,
                data: rows,
                succes: true
            })
        })
    } catch (error) {
        return res.json({
            status: 400,
            succes: false,
        })
    }
})

app.delete('/kenteken', (req, res) => {
    try {
        const queryObject = url.parse(req.url, true).query;
        sql = `DELETE FROM kenteken WHERE kenteken="${queryObject.kenteken}"`;
        db.run(sql,(err => {
            if(err) return res.json({ status: 300, succes: false, error: err});
            return res.json({
                status: 200,
                succes: true
            })
        }))
    } catch (error) {
        return res.json({
            status: 400,
            succes: false,
        })
    }
})

app.patch('/kenteken', (req, res) => {
    try {
        const queryObject = url.parse(req.url, true).query;
        sql = `UPDATE kenteken SET merk="${queryObject.merk}" WHERE kenteken="${queryObject.kenteken}"`;
        db.run(sql,(err => {
            if(err) return res.json({ status: 300, succes: false, error: err});
            return res.json({
                status: 200,
                succes: true
            })
        }))
    } catch (error) {
        return res.json({
            status: 400,
            succes: false,
        })
    }
})

// CRUD operations for TerugRoepActie.
app.post('/terugRoepActie', (req, res) => {
    try {
        const { kenteken, referentiecodeRDW, codeStatus, status } = req.body;
        sql = "INSERT INTO terugRoepActie(kenteken,  referentiecodeRDW, codeStatus, status ) VALUES (?,?,?,?)";
        db.run(sql, [kenteken ,  referentiecodeRDW, codeStatus, status ], (err) => {
            if(err) return res.json({ status: 300, succes: false, error: err});
        })

        return res.json({
            status: 200,
            succes: true
        })
    } catch (error) {
        return res.json({
            status: 400,
            succes: false,
        })
    }
})

app.get('/terugRoepActie', (req, res) => {
    sql = "SELECT * FROM terugRoepActie";
    try {
        const queryObject = url.parse(req.url, true).query;
        if(queryObject.kenteken) sql += ` WHERE kenteken="${queryObject.kenteken}"`;
        db.all(sql,[], (err, rows) => {
            if(err) return res.json({ status: 300, succes: false, error: err});

            if(rows.length<1) return res.json({ status: 300, succes: false, error: "No match"});
            return res.json({
                status: 200,
                data: rows,
                succes: true
            })
        })
    } catch (error) {
        return res.json({
            status: 400,
            succes: false,
        })
    }
})

app.delete('/terugRoepActie', (req, res) => {
    try {
        const queryObject = url.parse(req.url, true).query;
        sql = `DELETE FROM terugRoepActie WHERE kenteken="${queryObject.kenteken}"`;
        db.run(sql,(err => {
            if(err) return res.json({ status: 300, succes: false, error: err});
            return res.json({
                status: 200,
                succes: true
            })
        }))
    } catch (error) {
        return res.json({
            status: 400,
            succes: false,
        })
    }
})

app.patch('/terugRoepActie', (req, res) => {
    try {
        const queryObject = url.parse(req.url, true).query;
        sql = `UPDATE terugRoepActie SET codeStatus="${queryObject.codeStatus}" WHERE kenteken="${queryObject.kenteken}"`;
        db.run(sql,(err => {
            if(err) return res.json({ status: 300, succes: false, error: err});
            return res.json({
                status: 200,
                succes: true
            })
        }))
    } catch (error) {
        return res.json({
            status: 400,
            succes: false,
        })
    }
})

// CRUD operations for verbruik.
app.post('/verbruik', (req, res) => {
    try {

        const { kenteken,  brandstofVolgnummer, brandstofOmschrijving, brandstofverbruikBuitenDeStad, brandstofverbruikGecombineerd, brandstofverbruikStad} = req.body;
        console.log(req.body);
        sql = "INSERT INTO verbruik(kenteken,  brandstofVolgnummer, brandstofOmschrijving, brandstofverbruikBuitenDeStad, brandstofverbruikGecombineerd, brandstofverbruikStad) VALUES (?,?,?,?,?,?)";
        db.run(sql, [kenteken,  brandstofVolgnummer, brandstofOmschrijving, brandstofverbruikBuitenDeStad, brandstofverbruikGecombineerd, brandstofverbruikStad], (err) => {
            if(err) return res.json({ status: 300, succes: false, error: err});
        })

        return res.json({
            status: 200,
            succes: true
        })
    } catch (error) {
        return res.json({
            status: 400,
            succes: false,
        })
    }
})

app.get('/verbruik', (req, res) => {
    sql = "SELECT * FROM verbruik";
    try {
        const queryObject = url.parse(req.url, true).query;
        if(queryObject.kenteken) sql += ` WHERE kenteken="${queryObject.kenteken}"`;
        db.all(sql,[], (err, rows) => {
            if(err) return res.json({ status: 300, succes: false, error: err});

            if(rows.length<1) return res.json({ status: 300, succes: false, error: "No match"});
            return res.json({
                status: 200,
                data: rows,
                succes: true
            })
        })
    } catch (error) {
        return res.json({
            status: 400,
            succes: false,
        })
    }
})

app.delete('/verbruik', (req, res) => {
    try {
        const queryObject = url.parse(req.url, true).query;
        sql = `DELETE FROM verbruik WHERE kenteken="${queryObject.kenteken}"`;
        db.run(sql,(err => {
            if(err) return res.json({ status: 300, succes: false, error: err});
            return res.json({
                status: 200,
                succes: true
            })
        }))
    } catch (error) {
        return res.json({
            status: 400,
            succes: false,
        })
    }
})

app.patch('/verbruik', (req, res) => {
    try {
        const queryObject = url.parse(req.url, true).query;
        sql = `UPDATE verbruik SET brandstofOmschrijving="${queryObject.brandstofOmschrijving}" WHERE kenteken="${queryObject.kenteken}"`;
        db.run(sql,(err => {
            if(err) return res.json({ status: 300, succes: false, error: err});
            return res.json({
                status: 200,
                succes: true
            })
        }))
    } catch (error) {
        return res.json({
            status: 400,
            succes: false,
        })
    }
})

app.get('/healthcheck', (req, res) => {
    res.send('API is up and running!');
});

app.listen( PORT, () => console.log('Listening on http://localhost:' + PORT));

