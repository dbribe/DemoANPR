# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-28 13:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialaccount', '0002_auto_20170728_1040'),
    ]

    operations = [
        migrations.RenameField(
            model_name='socialapp',
            old_name='secret',
            new_name='secret_key',
        ),
    ]