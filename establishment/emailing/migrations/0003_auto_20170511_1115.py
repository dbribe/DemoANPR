# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-11 11:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emailing', '0002_emailcampaign_is_announcement'),
    ]

    operations = [
        migrations.RenameField(
            model_name='emailcampaign',
            old_name='is_announcement',
            new_name='is_newsletter',
        ),
        migrations.RemoveField(
            model_name='emailcampaign',
            name='system_use',
        ),
        migrations.AlterField(
            model_name='emailcampaign',
            name='name',
            field=models.CharField(max_length=256, unique=True),
        ),
        migrations.AlterField(
            model_name='emailtemplate',
            name='plaintext',
            field=models.TextField(blank=True, max_length=131072, null=True),
        ),
    ]