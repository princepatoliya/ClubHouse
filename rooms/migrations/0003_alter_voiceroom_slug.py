# Generated by Django 3.2.5 on 2021-07-23 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0002_alter_voiceroomuser_leave_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='voiceroom',
            name='slug',
            field=models.SlugField(blank=True, max_length=1000, null=True),
        ),
    ]