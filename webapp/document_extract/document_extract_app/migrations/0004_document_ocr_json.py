# Generated by Django 2.0.7 on 2018-07-21 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('document_extract_app', '0003_auto_20180715_1520'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='ocr_json',
            field=models.FileField(default={}, upload_to='', verbose_name='OCR JSON'),
        ),
    ]
