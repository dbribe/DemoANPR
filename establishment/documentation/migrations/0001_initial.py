# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-03 19:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('content', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DocumentationEntry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url_name', models.CharField(blank=True, max_length=64, null=True)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('parent_index', models.IntegerField(default=0)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='content.Article')),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sub_entries', to='documentation.DocumentationEntry')),
            ],
            options={
                'db_table': 'DocumentationEntry',
            },
        ),
        migrations.AlterUniqueTogether(
            name='documentationentry',
            unique_together=set([('parent', 'url_name')]),
        ),
    ]
