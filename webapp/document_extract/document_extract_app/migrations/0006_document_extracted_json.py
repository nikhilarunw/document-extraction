# Generated by Django 2.0.7 on 2018-07-26 02:42

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('document_extract_app', '0005_extractionmodel_model_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='extracted_json',
            field=django.contrib.postgres.fields.jsonb.JSONField(default={}, verbose_name='Extracted JSON'),
        ),
    ]
