from django.db import models
from django.contrib.auth.models import User
from .helper import generate_slug

# Create your models here.

class VoiceRoom(models.Model):
    room_host = models.ForeignKey(User, on_delete=models.CASCADE, related_name="host")
    room_title = models.CharField(max_length=255, unique=False, blank=False)
    description = models.CharField(max_length=255, unique=False, blank=False)
    created_time = models.DateTimeField(auto_now_add=True)
    deleted_time = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    slug = models.SlugField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.room_title

    def save(self, *args, **kwargs):
        self.slug = generate_slug(self.room_title)
        super(VoiceRoom, self).save(*args, **kwargs)

    @property
    def group_name(self):
        return f"VoiceRoom-{self.id}"

class VoiceRoomUser(models.Model):
    room_id = models.ForeignKey(VoiceRoom, on_delete=models.CASCADE) 
    room_user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    join_time = models.DateTimeField(auto_now_add=True)
    leave_time = models.DateTimeField(default=None, blank=True, null=True)

    def __str__(self):
        return f'{self.room_id}-{self.room_user_id}'