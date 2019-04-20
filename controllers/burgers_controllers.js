// Dependencies
var db = require("../models");

// Export the express app
module.exports = function (app) {

    // Default path. Uses the ORM all to get the burger information form the DB
    // and render the home page using the handlebars template.
    app.get("/", function (req, res) {

        db.Burger.findAll({ include: [db.Customer] }).then(function (data) {
            var hbsObj = {
                burger: data
            };

            res.render("index", hbsObj);
        });
    }),

        app.get("/orders", function (req, res) {
            db.Burger.findAll({ include: [db.Customer] }).then(function (data) {

                console.log(data);
                var hbsObj = {
                    customer: data
                };

                res.render("orders", hbsObj);
            });
        }),

        app.get("/api/customers", function (req, res) {
            db.Customer.findAll().then(function (results) {
                res.status(200).json(results.map(x => {
                    return (
                        {
                            name: x.name,
                            id: x.id
                        })
                }));
            });
        }),


        //  The PUT updates a single existing entry and updateds the boolean devoured to true;
        app.put("/api/devour/:id", function (req, res) {

            let inID = req.params.id;

            db.Burger.update({ devoured: true }, { where: { id: inID } })
                .then(function () {
                    console.log("Burger updated.");
                    res.status(200).end();
                });

        }),

        // POST adds a new burger to the database using the ORM create method
        app.post("/api/add", function (req, res) {

            console.log("Adding burger", req.body);

            db.Customer.findOne({
                where: {
                    name: req.body.customer
                }
            }).then(function (response) {
                if (!response) {
                    db.Customer.create({ name: req.body.customer }).then(function (createResp) {
                        db.Burger.create({ name: req.body.burgerName, CustomerId: createResp.dataValues.id }).then(function (moreCreate) {

                            res.status(200).end();
                        });
                    });
                }
                else {

                    console.log(response)
                    db.Burger.create({ name: req.body.burgerName, CustomerId: response.dataValues.id }).then(function () {
                        res.status(200).end();
                    });
                }
            });

            /* db.Burger.create({ name: req.body.newBurger }).then(function () {
                console.log("Burger added");
                res.status(200).end();
            }); */
        });
}