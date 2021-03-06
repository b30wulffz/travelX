# Generated by Django 3.0.3 on 2020-03-05 10:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map_db', '0003_auto_20200304_2346'),
    ]

    operations = [
        migrations.AddField(
            model_name='route',
            name='distance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='location',
            name='place_img',
            field=models.ImageField(default='default.jpg', upload_to=''),
        ),
    ]
