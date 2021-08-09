function alertmessage(msg_type, msg){
    $.bootstrapGrowl(msg, {
        ele: 'body', // which element to append to
        type: msg_type, // (null, 'info', 'danger', 'success')
        offset: {from: 'top', amount: 120}, // 'top', or 'bottom'
        align: 'right', // ('left', 'right', or 'center')
        width: 450, // (integer, or 'auto')
        delay: 1000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
        allow_dismiss: true, // If true then will display a cross to close the popup.
        stackup_spacing: 10 // spacing between consecutively stacked growls.
      });

}


function login(){
    var csrftoken = document.getElementById('logincsrf').value
    var username = document.getElementById('loginUsername').value
    var password = document.getElementById('loginPassword').value
    // var msg = document.getElementById('message_template')

    if(username == "" || password == ""){
    
        if(username == ""){
            document.getElementById('login_username_empty_msg').innerHTML = "Required, Only [0-9] and [a-z] and Underscore( _ ) ";
        }
        else{
            document.getElementById('login_username_empty_msg').innerHTML = "";
        }
        if(password == ""){
            document.getElementById('login_password_empty_msg').innerHTML = "Required";
        }
        else{
            document.getElementById('login_password_empty_msg').innerHTML = "";
        }
    }
    else{
        document.getElementById('login_password_empty_msg').innerHTML = "";
        document.getElementById('login_username_empty_msg').innerHTML = "";

        var data = {
            "username" : username,
            "password" : password
        }

        fetch('/accounts/login/', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'X-CSRFToken' : csrftoken,
            },
            body: JSON.stringify(data)
        }).then(result => result.json()).then(response => {
            if(response.status == 200){
                // alertmessage('success', response.message);
                window.location.href = '../'
                
            }
            else{
                // alert(response.message); 
                alertmessage('danger', response.message);
            }
        })


    }
}

function register(){
    // alert("asd");
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
        // alert("asdasd");
        var data = {
            "first_name" : firstname,
            "last_name" : lastname,
            "username" : registerUsername,
            "email": registerEmail,
            "password" : registerPassword,
            "confirmpassword" : registerConfirmPassword,
        }

        fetch('/accounts/register/', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'X-CSRFToken' : csrftoken,
            },
            body: JSON.stringify(data)
        }).then(result => result.json()).then(response => {
            if(response.status == 200){
                window.location.href = '../'   
            }
            else{
                alertmessage('danger', response.message);
            }
        })
    }
}