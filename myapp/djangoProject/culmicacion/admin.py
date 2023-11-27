from django.contrib import admin
from .models import Documento, Profesor, Estudiante, Tribunal, PrimerCorte, SegundoCorte, Predefensa, Defensa, Usuario

# Register your models here.

admin.site.register(Documento)
admin.site.register(Profesor)
admin.site.register(Estudiante)
admin.site.register(Tribunal)
admin.site.register(PrimerCorte)
admin.site.register(SegundoCorte)
admin.site.register(Predefensa)
admin.site.register(Defensa)
admin.site.register(Usuario)