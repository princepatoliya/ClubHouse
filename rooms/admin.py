from django.contrib import admin
from django.core.paginator import Paginator
from django.core.cache import cache
from django.db import models

from rooms.models import VoiceRoom, VoiceRoomUser

class VoiceRoomAdmin(admin.ModelAdmin):
    list_display = ['id','room_title', 'room_host', 'description', 'created_time', 'deleted_time', 'is_active']
    search_fields = ['id', 'room_title', 'room_host__username', 'room_host__email']
    readonly_fields = ['id',]

    class Meta:
        model = VoiceRoom

admin.site.register(VoiceRoom, VoiceRoomAdmin)

# Resource: http://masnun.rocks/2017/03/20/django-admin-expensive-count-all-queries/
class CachingPaginator(Paginator):
    def _get_count(self):

        if not hasattr(self, "_count"):
            self._count = None

        if self._count is None:
            try:
                key = "adm:{0}:count".format(hash(self.object_list.query.__str__()))
                self._count = cache.get(key, -1)
                if self._count == -1:
                    self._count = super().count
                    cache.set(key, self._count, 3600)

            except:
                self._count = len(self.object_list)
        return self._count

    count = property(_get_count)

class VoiceRoomUserAdmin(admin.ModelAdmin):
    list_display = ['room_id',  'room_user_id', 'join_time', 'leave_time']
    list_filter = ['room_id',  'room_user_id', 'join_time', 'leave_time']
    search_fields = ['room_id__room_title', 'room_user_id__username','room_user_id__email']
    readonly_fields = ['id',]

    show_full_result_count = False
    paginator = CachingPaginator

    class Meta:
        model = VoiceRoomUser

admin.site.register(VoiceRoomUser, VoiceRoomUserAdmin)