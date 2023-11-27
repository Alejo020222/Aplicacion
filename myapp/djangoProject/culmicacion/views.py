from rest_framework import viewsets
from .serializer import DocumentoSerializer, EstudianteSerializer, ProfesorSerializer, TribunalSerializer, PrimerCorteSerializer, SegundoCorteSerializer, PredefensaSerializer, DefensaSerializer, UsuarioSerializer
from .models import Documento, Profesor, Estudiante, Tribunal, PrimerCorte, SegundoCorte, Predefensa, Defensa, Usuario
from django.contrib.auth.decorators import login_required

# Create your views here.

class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()

class DocumentoView(viewsets.ModelViewSet):
    serializer_class = DocumentoSerializer
    queryset = Documento.objects.all()

class EstudianteView(viewsets.ModelViewSet):
    serializer_class = EstudianteSerializer
    queryset = Estudiante.objects.all()

class ProfesorView(viewsets.ModelViewSet):
    serializer_class = ProfesorSerializer
    queryset = Profesor.objects.all()

class TribunalView(viewsets.ModelViewSet):
    serializer_class = TribunalSerializer
    queryset = Tribunal.objects.all()

class PrimerCorteView(viewsets.ModelViewSet):
    serializer_class = PrimerCorteSerializer
    queryset = PrimerCorte.objects.all()

class SegundoCorteView(viewsets.ModelViewSet):
    serializer_class = SegundoCorteSerializer
    queryset = SegundoCorte.objects.all()

class PredefensaView(viewsets.ModelViewSet):
    serializer_class = PredefensaSerializer
    queryset = Predefensa.objects.all()

class DefensaView(viewsets.ModelViewSet):
    serializer_class = DefensaSerializer
    queryset = Defensa.objects.all()