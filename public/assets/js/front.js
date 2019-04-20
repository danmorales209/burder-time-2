var main = function() {
    $("#show-orders").on("click", function (event) {
        event.preventDefault();

        window.location.assign("/orders");

    });


    // Add event listener to the add burger button
    $("#add-burger").on("click", function (event) {
        event.preventDefault();

        // Get the inputs
        let customerName = $("#customer-name").val().trim();
        let newBurger = $("#burger-name").val().trim();

        // Make sure the <textarea> isn't empty
        if (newBurger && customerName) {

            $.post("/api/add", { burgerName: newBurger, customer: customerName }).then(function (response) {
                console.log(response);
            }).then(function () {
                window.location.reload(true);
            });
        }
    });

    // Add event listen for the devour buttons
    $(".eat-burger").on("click", function () {
        // Get the id of the burger, which is stored in the button attribute below
        let burgerID = Number($(this).attr("burger-id"));

        // PUT request
        $.ajax({
            url: "/api/devour/" + burgerID,
            method: "PUT",
        }).then(function () {
            // Reload page for handlebars logic to display
            window.location.reload(true);
        });

    });
};

main();