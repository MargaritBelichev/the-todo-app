# Generated by Django 3.1.4 on 2021-01-06 16:46

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0008_todolist_issuccessful'),
    ]

    operations = [
        migrations.AddField(
            model_name='todolist',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]