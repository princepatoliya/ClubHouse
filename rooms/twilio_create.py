import os
from twilio.rest import Client

from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant

from django.conf import settings




def TwilioRoomCreate(room_name):
    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN
    client = Client(account_sid, auth_token)

    room = client.video.rooms.create(
                                status_callback='http://example.org',
                                type='peer-to-peer',
                                unique_name=room_name
                                )
    print("---------------------Create Twilio Room-------------------")
    return room


def Create_token(username, room_name):
    twilio_account_sid = settings.TWILIO_ACCOUNT_SID
    twilio_api_key_sid = settings.TWILIO_API_KEY_SID
    twilio_api_key_secret = settings.TWILIO_API_KEY_SECRET

    token = AccessToken(twilio_account_sid, twilio_api_key_sid, twilio_api_key_secret,
                        identity=username, ttl=3600 )

    
    # print("------------------")
    token.add_grant(VideoGrant(room = room_name))
    return token.to_jwt()

