$(function onCalling() {
    var num = button.value;

    document.getElementById("idSpan").innerHTML = sessionStorage.ttoken;

    var link2 = crossroads.addRoute("", function () {
        $("#divHome").show();
        $("#divContact").hide();
    });

        window.plugins.CallNumber.callNumber({
            function onSucccess(result) {
                console.log("Success:"+result);
            },
            function onError(result) {
                console.log("Error:"+result);
            },
            "1300882244",
            true
        });
 

    function parseHash(newHash, oldHash) {
        crossroads.parse(newHash);
    }

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();

});