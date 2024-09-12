from django.contrib import admin
from .models import Usuario
from .models import Categoria
from .models import Pregunta

# Register your models here.

admin.site.register(Usuario)
admin.site.register(Categoria)
admin.site.register(Pregunta)

