$(document).ready(function(){
    var a = `
            <a class="atag" href="/"> <i class="fas fa-laptop-code fa-sm"></i> Home</a>
            <a class="atag" href="/create_room/"><i class="fas fa-plus fa-sm"></i> New Room</a>
            <a class="atag" href="/profile/"><i class="fas fa-user-alt fa-sm"></i> Profile</a>
            <a class="atag" onclick=logout() style="color: #B4161B;"><i class="fas fa-sign-out-alt fa-sm"></i> Logout</a>
            `
    
    var b = `<a class="atag" href="/login/" style="color: green;"><i class="fas fa-sign-out-alt fa-sm"></i> Sign In</a>`

    if(sessionStorage.getItem("alert-message")){
        alertmessage('success', sessionStorage.getItem("alert-message"));
        sessionStorage.removeItem("alert-message");
    }

    if (sessionStorage.getItem("is_login")) {
        // console.log("done");
        $("#navigation").append(a)
    }
    else{
        $("#navigation").append(b)
    }

});

function logout(){
    sessionStorage.removeItem("is_login");
    sessionStorage.removeItem("auth_token");
    window.location.href = "/";
}

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



