$(function () {
    //$("#idSpan").val = sessionStorage.ttoken;
    document.getElementById("idSpan").innerHTML = sessionStorage.ttoken;


    var link1 = crossroads.addRoute("/logout", function () {
        sessionStorage.clear();
        location.href = "login.html";
    });

    var link2 = crossroads.addRoute("", function () {
        $("#divHome").show();
        $("#divContact").hide();
    });

    var link4 = crossroads.addRoute("/btnAddContact", function () {
        $("#divHome").hide();
        $("#divContact").hide();
        $("#divAddContact").show();
        $("#divEditContact").hide();
    });


    var link3 = crossroads.addRoute("/contacts", function () {
        $(".navbar-collapse li").removeClass("active");
        $(".navbar-collapse li a[href='#contacts']").parent().addClass("active");
        var email = sessionStorage.ttoken;
        var datalist = "email=" + email;
        $.ajax({
            type: "post",
            url: "http://localhost:8080/Caller/GetContactData",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);

                var lastIndex = myData.length - 1;
                var htmlText = "";
                if (myData[lastIndex].status === 1) {
                    for (var i = 0; i < lastIndex; i++) {
                        htmlText = htmlText + "<tr><td>" + myData[i].id
                            + "</td><td><a href='#viewcontact/" +myData[i].id+ "'>" + myData[i].fname
                            + "</a></td><td>" + myData[i].extension
                            + "</td><td>" + myData[i].jobtitle
                            + "</td><td>" + myData[i].id
                            + "</td><td>" + myData[i].email
                            + "</td><td><a href='#delcontact'><span class='glyphicon glyphicon-trash' data-contactid="
                            + myData[i].id
                            + "></span></a></td></tr>";
                    }
                    $("#tblContacts tbody").html(htmlText);
                }
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
        });
        $("#divHome").hide();
        $("#divContact").show();
        $("#divAddContact").hide();
        $("#divEditContact").hide();
    });

    var link5 = crossroads.addRoute("/viewcontact/{id}", function(id){

        var datalist = "id=" +id;
        $.ajax({
            type: "post",
            url: "http://localhost:8080/Caller/GetContactDataById",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);

                if (myData.status === 1) {
                    document.getElementById("fname100").value = myData.name;
                    document.getElementById("phoneno100").value = myData.phone;
                    document.getElementById("emailadd100").value = myData.email;
                    document.getElementById("contactid").value = myData.id;
                }
                $("#divHome").hide();
                $("#divContact").hide();
                $("#divAddContact").hide();
                $("#divEditContact").show();
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
        });
    });


    $("#frmAddKenalan").submit(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var phone = $("#phone").val();
        var email = $("#email").val();

        var datalist = "firstname=" + firstname + " &lastname=" + lastname + "&phone=" + phone + "&email=" + email + "&owneremail=" + sessionStorage.ttoken;
        $.ajax({
            type: "post",
            url: "http://localhost:8080/Caller/AddContact",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                if (myData.status === 1) {
                    alert("Add Contact Success!");
                    $("#divContact").hide();
                }
                else {
                    alert("Add Contact Failed");
                }
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
        });
    });

    $("#frmEditContact").submit(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var firstname = $("#fname100").val();
        var phone = $("#phoneno100").val();
        var email = $("#emailadd100").val();
        var contactid = $("#contactid").val();

        var datalist = "firstname=" + firstname + "&phone=" + phone + "&email=" + email + "&contactid=" +contactid;
        $.ajax({
            type: "post",
            url: "http://localhost:8080/Caller/UpdateContactById",
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                if (myData.status === 1) {
                    alert("Update Contact Success!");
                    $("#divEditContact").hide();
                    $("#divContact").show();
                }
                else {
                    alert("Update Contact Failed");
                }
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
        });
    });

    $("#tblContacts tbody").on("click","span",function(){
       var contactid=$(this).data("contactid")
       // bootbox.alert("Delete process"+contactid);
       datalist="contactid="+contactid;
       var parentTR = $(this).parent().parent().parent();
       bootbox.confirm("Are u sure to delete this contact?",function(answer){
            if (answer){
                $.ajax({
            type: "post",
            url: "http://localhost:8080/Caller/DelContactById",//192.168.134.20:8080
            data: datalist,
            cache: false,
            success: function (mydata) {
                var myData = JSON.parse(mydata);
                if (myData.status === 1) {
                    alert("Delete Contact Success!");
                    $(parentTR).fadeOut("slow","swing",function(){
                        $(parentTR).remove();
                    });

                }
                else {
                    alert("Delete Contact Failed");
                }
            },
            error: function () {
                console.log("ajax error!");
                alert("Please contact admin!");
            }
        });
            }
            else{
                bootbox.alert("Delete canceled");
            }
       });
    });

    function parseHash(newHash, oldHash) {
        crossroads.parse(newHash);
    }

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();

});