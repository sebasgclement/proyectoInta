# Generated by Django 4.1 on 2024-09-11 21:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelos', '0006_pregunta_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='pregunta',
            name='respuesta_incorrecta_3',
            field=models.CharField(default='RI3', max_length=1000, verbose_name='Respuesta Incorrecta 3'),
            preserve_default=False,
        ),
    ]
