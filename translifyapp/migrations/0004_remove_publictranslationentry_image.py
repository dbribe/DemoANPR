# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-05-10 22:16
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('translifyapp', '0003_publictranslationentry'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='publictranslationentry',
            name='image',
        ),
    ]
