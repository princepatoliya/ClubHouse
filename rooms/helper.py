from django.utils.text import slugify

#generate random string

import random
import string

def generate_random_string(n):
    return ' ' + ''.join(random.choices(string.ascii_uppercase + string.ascii_letters, k=n))

#Generate new slug if exicts then call same function and add random string with text
def generate_slug(text):
    new_slug = slugify(text)
    
    #import here because circular import issue
    from .models import VoiceRoom
    
    if VoiceRoom.objects.filter(slug = new_slug).first():
        return generate_slug(text + generate_random_string(random.randint(1,9)) )
    
    # print("finally:-  ", new_slug)
    return new_slug