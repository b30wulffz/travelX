# Generated by Django 3.0.3 on 2020-03-08 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map_db', '0004_auto_20200305_1552'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='route',
            name='mode',
        ),
        migrations.RemoveField(
            model_name='route',
            name='price',
        ),
        migrations.AddField(
            model_name='route',
            name='autoPrice',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='route',
            name='busPrice',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='route',
            name='trainPrice',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
