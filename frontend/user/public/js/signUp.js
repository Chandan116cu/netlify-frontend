$(document).ready(function () {
    $("#signUpSubmit").click(function validate() {
        var firstName = $("#firstName").val()
        var lastName = $("#lastName").val()
        Email = $("#inputEmail").val()
        var PhoneNumber = $("#phoneNumber").val()
        var Password = $("#inputPassword").val()
        confirmPassword = $("#cnfPassword").val()
        var accountType = "Student"


        if (firstName == "") {
            return alert("Please enter First Name")
        }
        var regex = /^[a-zA-Z ]{2,30}$/
        if (regex.test(firstName) === false) {
            return alert("Please enter a valid first name");
        }

        if (lastName === "") {
            return alert("Please enter your last name");
        }

        var regex = /^[a-zA-Z ]{2,30}$/
        if (regex.test(lastName) === false) {
            return alert("Please enter a valid last name");
        }

        if(Email == ""){
            return alert("Please enter your emailId")
        }

        
        if (PhoneNumber == "") {
            return alert("Please enter your mobile number");
        }
        var regex = /^\d{10}$/
        if (regex.test(PhoneNumber) === false) {
            return alert("Please enter a valid 10 digit mobile number")
        }
        if(Password == ""){
            return alert("Password cannot be empty")
        }
        if(Password.length < 6 ){
            return alert("Please enter a minimum of 6 digits password")
        }

        if (Password != confirmPassword) {
            return alert("Confirm Password does not match")
        }
        name = firstName + " " + lastName;
        $.ajax("http://localhost:"+localStorage.getItem('server-port')+"/signUp", {
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            beforeSend: function () {
                $('.main').animate({ opacity: 0.6 })
                $('.mod').fadeIn()
                $('.spinner').show()
            },
            data: JSON.stringify({
                "name": name,
                "email": Email,
                "phoneNumber": PhoneNumber,
                "password": Password,
                "accountType": accountType
            }),
            success: function (data, status) {
                alert("Your SignUp has been successful")
                $(location).attr('href', '../views/login.html')
            },
            error: function (error) {
                $('.spinner').hide()
                alert("User already Existed")
                console.log(error);
            }
        })
    })
})