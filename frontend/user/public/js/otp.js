$(document).ready(function () {
    $("#verify").click(function verifyOTP() {
        var OTP = $(".form-control").val();
        if(OTP==""){
            return alert("Please enter OTP to continue")
        }
        
        $.ajax("https://node-examportal.herokuapp.com/verification", {
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            beforeSend: function () {
                $('.main').animate({ opacity: 0.6 })
                $('.mod').fadeIn()
                $('.spinner').show()
            },
            data: JSON.stringify({
                "otp":OTP,
            }),
            success: function (data) {
                if(data.code=="200"&&data.message=="verified successfully"){
                    localStorage.removeItem('token');
                    localStorage.setItem('token',data.token);
                    alert("Your Phone number has been verified")
                    $(location).attr('href', '../views/accessKey.html')
                }else if(data.code=="400"){
                    alert("Your OTP does not matched. Try again")
                    location.reload();
                }
                
            },
            error: function (error) {
                $('.spinner').hide()
                alert("User already Existed")
                console.log(error);
            }
        })
    })
})