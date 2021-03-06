# Generated by Django 3.0.3 on 2020-03-08 17:57

from decimal import Decimal
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map_db', '0005_auto_20200308_2316'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='autoPrice',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10, validators=[django.core.validators.MinValueValidator(Decimal('0.0'))]),
        ),
        migrations.AlterField(
            model_name='route',
            name='busPrice',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10, validators=[django.core.validators.MinValueValidator(Decimal('0.0'))]),
        ),
        migrations.AlterField(
            model_name='route',
            name='trainPrice',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10, validators=[django.core.validators.MinValueValidator(Decimal('0.0'))]),
        ),
    ]
