$('document').ready(function(){
    $('#loginUsername').keypress(function(e){
    var key = e.keyCode;
    if((key>=97 && key<=122 || key>=48 && key<=57 || key==95) == false) {
        e.preventDefault();
    }
    })

    if(sessionStorage.getItem("alert-message")){
        alertmessage('success', sessionStorage.getItem("alert-message"));
        sessionStorage.removeItem("alert-message");
    }

});

function alertmessage(msg_type, msg){
    $.bootstrapGrowl(msg, {
        ele: 'body', // which element to append to
        type: msg_type, // (null, 'info', 'danger', 'success')
        offset: {from: 'top', amount: 120}, // 'top', or 'bottom'
        align: 'right', // ('left', 'right', or 'center')
        width: 450, // (integer, or 'auto')
        delay: 900, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
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

        fetch('https://e64091c38e58.ngrok.io/accounts/login/', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'X-CSRFToken' : csrftoken,
            },
            body: JSON.stringify(data)
        }).then(result => result.json()).then(response => {
            if(response['token']){
                sessionStorage.setItem("auth_token", response['token']);
                sessionStorage.setItem("is_login", true);
                sessionStorage.setItem("alert-message", "You are logged in.");
        
                window.location.href = "../";    
            }
            else{
                alertmessage('danger', response['non_field_errors']);
            }
        })


    }
}