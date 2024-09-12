from django.shortcuts import render
from rest_framework import generics
from .models import Pregunta
from .serializers import PreguntaSerializer
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework.decorators import action


# Create your views here.
from rest_framework import viewsets
from .models import Usuario, Categoria, Pregunta
from .serializers import UsuarioSerializer, CategoriaSerializer, PreguntaSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    @action(detail=True, methods=['patch'])  # Permite solicitudes PATCH en el detalle
    def update_score(self, request, pk=None):
        print(f"Updating score for user ID: {pk}")  # Para depuración
        user = self.get_object()
        score = request.data.get('score')

        if score is not None:
            user.puntaje += score
            user.save()
            return Response({'score': user.puntaje})
        return Response({'error': 'Score not provided'}, status=400)

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class PreguntaViewSet(viewsets.ModelViewSet):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer

class PreguntasPorCategoriaAPIView(generics.ListAPIView):
    serializer_class = PreguntaSerializer

    def get_queryset(self):
        categoria_id = self.kwargs['categoria_id']
        print(f"Buscando preguntas para la categoría: {categoria_id}")
        preguntas = Pregunta.objects.filter(categoria=categoria_id)
        print(f"Número de preguntas encontradas: {preguntas.count()}")  # Para depuración
        return preguntas
    
@api_view(['POST'])
def login_user(request):
    usuario = request.data.get('usuario')
    password = request.data.get('password')
    
    try:
        user = Usuario.objects.get(usuario=usuario)
        if check_password(password, user.password):
            return Response({
                'message': 'Login successful',
                'usuario':user.usuario,
                'id':user.id
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_400_BAD_REQUEST)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_400_BAD_REQUEST)