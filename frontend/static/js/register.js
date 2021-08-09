$('document').ready(function(){
    
    $('#registerUsername').keypress(function(e){
    var key = e.keyCode;
    if((key>=97 && key<=122 || key>=48 && key<=57 || key==95) == false) {
        e.preventDefault();
    }
    })

    $('#registerFirstname').keypress(function(e){
        var key = e.keyCode;
        if((key>=65 && key<=90 || key>=97 && key<=122) == false){
            e.preventDefault();
        }
    })

    $('#registerLastname').keypress(function(e){
        var key = e.keyCode;
        if((key>=65 && key<=90 || key>=97 && key<=122) == false){
            e.preventDefault();
        }
    })

});


function register(){

    var csrftoken = document.getElementById('registercsrf').value;
    var registerUsername = document.getElementById('registerUsername').value;
    var registerPassword = document.getElementById('registerPassword').value;
    var registerConfirmPassword = document.getElementById('registerConfirmPassword').value;
    var registerEmail = document.getElementById('registerEmail').value;
    var registerFirstname = document.getElementById('registerFirstname').value;
    var registerLastname = document.getElementById('registerLastname').value;

    if(registerUsername == "" || registerPassword == "" || registerConfirmPassword == "" || registerEmail == "" || registerFirstname == "" || registerFirstname == ""){
        if(registerUsername == ""){
            document.getElementById('register_username_empty_msg').innerHTML = "Required, Only [0-9] and [a-z] and Underscore( _ ) ";
        }
        else{
            document.getElementById('register_username_empty_msg').innerHTML = "";
        }

        if(registerPassword == ""){
            document.getElementById('register_password_empty_msg').innerHTML = "Required";
        }
        else{
            document.getElementById('register_password_empty_msg').innerHTML = "";
        }

        if(registerConfirmPassword == ""){
            document.getElementById('register_cpassword_empty_msg').innerHTML = "Required";
        }
        else{
            document.getElementById('register_cpassword_empty_msg').innerHTML = "";
        }
        if(registerEmail == ""){
            document.getElementById('register_email_empty_msg').innerHTML = "Required";
        }
        else{
            document.getElementById('register_email_empty_msg').innerHTML = "";
        }
        if(registerFirstname == ""){
            document.getElementById('register_firstlastname_empty_msg').innerHTML = "Required";
        }
        else{
            document.getElementById('register_firstlastname_empty_msg').innerHTML = "";
        }
        if(registerLastname == ""){
            document.getElementById('register_firstlastname_empty_msg').innerHTML = "Required";
        }
        else{
            document.getElementById('register_firstlastname_empty_msg').innerHTML = "";
        }

    }
    else{   
        document.getElementById('register_username_empty_msg').innerHTML = "";
        document.getElementById('register_password_empty_msg').innerHTML = "";
        document.getElementById('register_cpassword_empty_msg').innerHTML = "";
        document.getElementById('register_email_empty_msg').innerHTML = "";
        document.getElementById('register_firstlastname_empty_msg').innerHTML = "";

        var data = {
            "first_name" : registerFirstname,
            "last_name" : registerLastname,
            "username" : registerUsername,
            "email": registerEmail,
            "password" : registerPassword,
            "confirmpassword" : registerConfirmPassword,
        }

        fetch('https://e64091c38e58.ngrok.io/accounts/register/', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'X-CSRFToken' : csrftoken,
            },
            body: JSON.stringify(data)
        }).then(result => result.json()).then(response => {
            if(response.status == 200){
                sessionStorage.setItem("alert-message", "Registered Successfully.");
                window.location.href = '../login/';                    
            }
            else{
                alertmessage('danger', response.message);
            }
        })
    }
}