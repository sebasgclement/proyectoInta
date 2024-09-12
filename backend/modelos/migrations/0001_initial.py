# Generated by Django 4.1 on 2024-09-02 19:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.CharField(max_length=10, primary_key=True, serialize=False, verbose_name='ID de la Categoría')),
                ('nombre', models.CharField(max_length=100, verbose_name='Nombre de la Categoría')),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50, verbose_name='Nombre')),
                ('apellido', models.CharField(max_length=50, verbose_name='Apellido')),
                ('usuario', models.CharField(max_length=50, verbose_name='Usuario')),
                ('escuela', models.CharField(max_length=50, verbose_name='Escuela')),
                ('integrantes', models.TextField(max_length=1000, verbose_name='Integrantes del Equipo')),
                ('nombre_equipo', models.CharField(max_length=50, verbose_name='Nombre del Equipo')),
                ('puntaje', models.IntegerField(default=0, verbose_name='Puntaje')),
                ('fecha_inscripcion', models.DateField(auto_now_add=True, verbose_name='Fecha de Inscripción')),
            ],
        ),
        migrations.CreateModel(
            name='Pregunta',
            fields=[
                ('id', models.CharField(max_length=10, primary_key=True, serialize=False, verbose_name='ID de la Pregunta')),
                ('texto_pregunta', models.TextField(max_length=1000, verbose_name='Texto de la Pregunta')),
                ('respuesta_correcta', models.CharField(max_length=1000, verbose_name='Respuesta Correcta')),
                ('respuesta_incorrecta_1', models.CharField(max_length=1000, verbose_name='Respuesta Incorrecta 1')),
                ('respuesta_incorrecta_2', models.CharField(max_length=1000, verbose_name='Respuesta Incorrecta 2')),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='preguntas', to='modelos.categoria', verbose_name='Categoría')),
            ],
        ),
    ]
