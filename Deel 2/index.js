const express = require('express');
const app = express();


let fs = require('fs');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello Cappie! this is a test");
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port ' + port));

// getVehiclejson gets all or one vehicle

// If licence plate is not specified, get all vehicles.
app.get('/getVehiclejson/:id', (req, res) => {
    if (req.query.id == null) {
        fs.readFile(__dirname + "/../Deel 0/Kenteken.json", 'utf8', function (err, data) {
            if (err == null) {
                // 200 OK Indicates that the request has succeeded.
                res.status(200).end(data);
            } else {
                // 404 Not Found The server can not find the requested resource.
                res.status(404).end("Error reading file");
            }

        });
    } else {
        // if a plate is entered find that vehicle
        fs.readFile(__dirname + "/../Deel 0/Kenteken.json", 'utf8', function (err, data) {
            if (err == null) {
                var vehicles = JSON.parse(data);
                // loop through all vehicles
                for (var i = 0; i < vehicles.length; i++) {
                    if (vehicles !== null) {
                        if (vehicles[i].plate == req.query.id) {
                            // 200 OK Indicates that the request has succeeded.
                            res.status(200).end(JSON.stringify(vehicles[i]));
                        }
                    }
                }
                // Set does not contain licence plate
                if (i == vehicles.length) {
                    // 404 Not Found The server can not find the requested resource.
                    res.status(404).end("Vehicle with this licence plate is not found");
                }
            } else {
                // 404 Not Found The server can not find the requested resource.
                res.status(404).end("Error reading file");
            }
        });
    }

});
