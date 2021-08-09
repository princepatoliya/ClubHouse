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

function create_room(){
    var title = document.getElementById('roomtitlefield').value
    var description = document.getElementById('roomdescriptionfield').value

    if(title == ""){
        alertmessage("danger", "Title can't be empty.")
    }

    else{

        if(description == ""){
            description = "Join Now.";
        }

        var data = {
            "room_title" : title,
            "description" : description
        }

        token = "Token " + sessionStorage.getItem("auth_token");

        fetch('https://e64091c38e58.ngrok.io/rooms/create_room/', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        }).then(result => result.json()).then(response => {
            if(response['status'] == 200){
                sessionStorage.setItem("alert-message", "Room created successfully.");
                sessionStorage.setItem("slug", response['slug'])
                window.location.href = "room/" + response['slug'];    
            }
            else{
                alertmessage('danger', response['message']);
            }
        })

    }
}