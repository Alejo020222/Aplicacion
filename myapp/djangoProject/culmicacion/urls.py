from django.urls import path, include
from rest_framework import routers
from culmicacion import views


router = routers.DefaultRouter()
router.register(r'Documento', views.DocumentoView, 'documento')
router.register(r'Profesor', views.ProfesorView, 'profesor')
router.register(r'Estudiante', views.EstudianteView, 'estudiante')
router.register(r'Tribunal', views.TribunalView, 'tribunal')
router.register(r'PrimerCorte', views.PrimerCorteView, 'primercorte')
router.register(r'SegundoCorte', views.SegundoCorteView, 'segundocorte')
router.register(r'Predefensa', views.PredefensaView, 'predefensa')
router.register(r'Defensa', views.DefensaView, 'defensa')

urlpatterns = [
    path('', include(router.urls))
]