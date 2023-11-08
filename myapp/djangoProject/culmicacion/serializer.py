from rest_framework import serializers
from .models import Documento, Estudiante, Profesor, Tribunal, PrimerCorte, SegundoCorte, Predefensa, Defensa

class DocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documento
        fields = '__all__'

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = '__all__'

class ProfesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesor
        fields = '__all__'

class TribunalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tribunal
        fields = '__all__'

class PrimerCorteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrimerCorte
        fields = '__all__'

class SegundoCorteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SegundoCorte
        fields = '__all__'

class PredefensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Predefensa
        fields = '__all__'

class DefensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defensa
        fields = '__all__'