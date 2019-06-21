var tableData = require("../data/friends");

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(tableData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        var totalDifference = 1000000;
        var friend = {};
        for (let i = 0; i < req.body.scores.length; i++) {
            req.body.scores[i] = Number(req.body.scores[i]);
        }

        tableData.forEach(element => {
            var num = element.scores.reduce((a, b) => a + b);
            if (Math.abs(num - req.body.scores.reduce((a, b) => a + b, 0)) < totalDifference) {
                totalDifference = Math.abs(num - req.body.scores.reduce((a, b) => a + b, 0));
                friend = element;
            }
        });

        tableData.push(req.body);
        res.json(friend);
    });

};