// api url
const api_url = "https://e64091c38e58.ngrok.io/rooms/show_rooms/";
token = "Token " + sessionStorage.getItem("auth_token");
 
var data = [];
var card = ``;

// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url, {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : token,
        },
    });
    
    // Storing data in form of JSON
    var a = await response.json();
    
    data = a["payload"];

    for(var i=0; i<data.length; i++){
        
        sessionStorage.setItem("room_slug", data[i]["slug"]);

        card += `<div class="col-lg-6 col-sm-8 mb-4 hover-animate">
        <div class="card shadow border-0" class="homeroomcard">
          <div class="card-body">
  
            <p class="my-2" class="roomname" style="font-size: 13px;"> `+ data[i]["room_title"] +` <span><i class="fas fa-home fa-xm" style="color: #00AC61;"></i></span></p>
            
            <p class="my-2 text-muted text-sm" >
              `+ data[i]["description"] +`
            </p>

            <p class="my-2 text-muted text-sm">
              <span>Hosted by </span><span>`+ data[i]["room_host"]["username"] +` <i class="fas fa-comment-dots"></i></span>
            </p>
            
            <p class="text-gray-700 text-sm my-2"> 1 <i class="fas fa-user"></i> <spam>/</spam> <span>0</span> <i class="far fa-comment-dots"></i>  
            <a href="room/`+ data[i]["slug"] +`"><span class="float-right person-booth pointer enterroomicon"><i class="fas fa-person-booth fa-2x"></i></span></a>
            </p>
            
          </div>
        </div>
      </div>`
    }

    $("#roomdata").append(card);

}

// Calling that async function
getapi(api_url);
