from django.db import models
from django.contrib.auth.hashers import make_password

class Usuario(models.Model):
    nombre = models.CharField(verbose_name="Nombre", max_length=50)
    apellido = models.CharField(verbose_name="Apellido", max_length=50)
    usuario = models.CharField(verbose_name="Usuario", max_length=50)
    escuela = models.CharField(verbose_name="Escuela", max_length=50)
    integrantes = models.TextField(verbose_name="Integrantes del Equipo", max_length=1000)
    nombre_equipo = models.CharField(verbose_name="Nombre del Equipo", max_length=50)
    puntaje = models.IntegerField(verbose_name="Puntaje", default=0)
    fecha_inscripcion = models.DateField(verbose_name="Fecha de Inscripción", auto_now_add=True)
    password = models.CharField(verbose_name="Contraseña", max_length=128, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.pk:  # Solo en la creación de un nuevo usuario
            self.password = make_password(self.password)  # Hashea la contraseña
        super(Usuario, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.nombre_equipo})"

class Categoria(models.Model):
    id = models.CharField(verbose_name="ID de la Categoría", max_length=10, primary_key=True)
    nombre = models.CharField(verbose_name="Nombre de la Categoría", max_length=100)

    def __str__(self):
        return self.nombre

class Pregunta(models.Model):
    categoria = models.ForeignKey(Categoria, related_name='preguntas', on_delete=models.CASCADE, verbose_name="Categoría")
    image = models.ImageField(upload_to='imagenes', null=True, blank=True)
    texto_pregunta = models.TextField(verbose_name="Texto de la Pregunta", max_length=1000)
    respuesta_correcta = models.CharField(verbose_name="Respuesta Correcta", max_length=1000)
    respuesta_incorrecta_1 = models.CharField(verbose_name="Respuesta Incorrecta 1", max_length=1000)
    respuesta_incorrecta_2 = models.CharField(verbose_name="Respuesta Incorrecta 2", max_length=1000)
    respuesta_incorrecta_3 = models.CharField(verbose_name="Respuesta Incorrecta 3", max_length=1000)

    def __str__(self):
        return self.texto_pregunta
