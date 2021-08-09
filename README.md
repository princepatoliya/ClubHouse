# ClubHouse (ON GOING) (Maybe not all functionality will be working 100%.)
---
Django REST, MySQL, JavaScript, jQuery [July-2021 (On Going)]
- Audio-Chat Social Networking App
-Voice Rooms, where users can voice-chat(Twilio) about a topic while others can listen.
- Clubs, where users can form groups based on their interests.
- Users can add friends based on their interactions in the clubs or chat rooms, or find people.

## Setup

The first thing to do is to create virtual environment:
- Create a virtual environment to install pakages to using **requirement.txt** file
```
pip install virtualenv
virtualenv MyBlog
Scripts\activate
cd ClubHouse

```
- clone repository
```
git clone https://github.com/princepatoliya/ClubHouse.git
```

- Then install the dependencies:
```
pip install -r ClubHouse/requirement.txt
```

- Inside ClubHouse create file '.env' and enter this values
I used sqliteDB (user-admin, pass - admin)
```
TWILIO_ACCOUNT_SID = <VALUE>
TWILIO_AUTH_TOKEN = <VALUE>
TWILIO_API_KEY_SID = <VALUE>
TWILIO_API_KEY_SECRET_API = <VALUE>

```
- finally run server
```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```



