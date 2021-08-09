var slug = document.getElementById("slug").value;

// api url
const api_url = "https://e64091c38e58.ngrok.io/rooms/live_room/" + slug;

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

    var room_token = a['room_token']
    var room_name = a['room_name']

    
    data = a["payload"];

    card = `<div class="col-lg-6 col-sm-8 mb-4 hover-animate">
    <div class="card shadow border-0" style="width:60rem;" class="roomcard">
      <div class="card-body">
        <div class="row text-center">               
          <div class="col">
            <p class="my-2" class="roomname" style="font-size: 20px; ">`+ data["room_title"] +`</p>
            <p class="my-2" class="roomname" style="font-size: 11px;">`+ data["description"] +`</p> 
          </div>
        </div>
        <hr class="solid">
        <div class="row">               
          <div class="col">
            <p class="my-2" class="roomhost" style="font-size: 17px;">Host :</p>
            
            <div style="overflow:hidden;" id="remote-media-div" class="circleBase video"></div>
            
            </div>
        </div>
        <div class="row">               
          <div class="col">
            <p class="my-2" class="roomaudience" style="font-size: 17px;">Audience :</p>
            <div style="overflow:hidden;" id="remote-media-div" class="circleBase video"></div>
            <div style="overflow:hidden;" id="remote-media-div" class="circleBase video"></div>
            <div style="overflow:hidden;" id="remote-media-div" class="circleBase video"></div> 
          </div>
        </div>
        <hr class="solid">
        <div class="row text-center">               
          <div class="col">
            <span class="room-unmute pointer"><i class="fas fa-microphone fa-2x"></i></i></span>
            <span class="room-mute mx-4 pointer"><i class="fas fa-microphone-slash fa-2x"></i></span>
            <span class="room-leave pointer"><i class="fas fa-phone-slash fa-2x"></i></span> 
          </div>
        </div>       
      </div>
    </div>
  </div>`

    $("#roomdetail").append(card);


    // console.log("Connect function begin 1");
    // const { connect } = require('twilio-video');
    // console.log("Connect function begin 2");



    const Video = Twilio.Video;

    Video.createLocalTracks({
      audio: true,
      video: { width: 150, height: 150 }
    }).then(localTracks => {
      return Video.connect(room_token, {
        name: room_name,
        tracks: localTracks
      });
    }).then(room => {
      console.log(`Connected to Room: ${room.name}`);

      room.on('participantConnected', participant => {
        console.log(`Participant "${participant.identity}" connected`);
        // participant.tracks.forEach(track => {
        //   console.log('--------------- 1 -------------')
        //   document.getElementById('remote-media-div').appendChild(track.attach());
        // });
        participant.tracks.forEach(publication => {
          if (publication.isSubscribed) {
            console.log('--------------- 1 -------------')
            const track = publication.track;
            document.getElementById('remote-media-div').appendChild(track.attach());
          }
        });
        // participant.on('trackAdded', track => {
        //   console.log('--------------- 2 -------------')
        //   document.getElementById('remote-media-div').appendChild(track.attach());
        // });
        participant.on('trackSubscribed', track => {
          console.log('--------------- 2 -------------')
          document.getElementById('remote-media-div').appendChild(track.attach());
        });
      });

    });

    // Video.connect(room_token, { name:room_name, audio: true, video: { width: 640 } }).then(room => {
    //   console.log(`Successfully joined a Room: ${room}`);
    //   room.on('participantConnected', participant => {
    //     console.log(`A remote Participant connected: ${participant}`);
    //   });
    // }, error => {
    //   console.error(`Unable to connect to Room: ${error.message}`);
    // });

    

}

// Calling that async function
getapi(api_url);
