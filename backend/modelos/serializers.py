from rest_framework import serializers
from .models import Usuario, Categoria, Pregunta


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'apellido', 'usuario', 'escuela', 'integrantes', 'nombre_equipo', 'puntaje', 'fecha_inscripcion', 'password']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = ['categoria', 'texto_pregunta', 'respuesta_correcta', 'respuesta_incorrecta_1', 'respuesta_incorrecta_2', 'respuesta_incorrecta_3', 'image']


