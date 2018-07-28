# Generated by Django 2.0.7 on 2018-07-22 04:38

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('document_extract_app', '0004_document_ocr_json'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='annotated_json',
            field=django.contrib.postgres.fields.jsonb.JSONField(default={}, verbose_name='Annotated JSON'),
        ),
        migrations.AlterField(
            model_name='document',
            name='ocr_json',
            field=django.contrib.postgres.fields.jsonb.JSONField(default={}, verbose_name='OCR JSON'),
        ),
    ]
