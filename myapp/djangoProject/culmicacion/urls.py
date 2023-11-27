from django.urls import path, include
from rest_framework import routers
from culmicacion import views
from django.contrib.auth.decorators import login_required
from rest_framework.authtoken.views import obtain_auth_token


router = routers.DefaultRouter()
router.register(r'Documento', views.DocumentoView, 'documento')
router.register(r'Profesor', views.ProfesorView, 'profesor')
router.register(r'Estudiante', views.EstudianteView, 'estudiante')
router.register(r'Tribunal', views.TribunalView, 'tribunal')
router.register(r'PrimerCorte', views.PrimerCorteView, 'primercorte')
router.register(r'SegundoCorte', views.SegundoCorteView, 'segundocorte')
router.register(r'Predefensa', views.PredefensaView, 'predefensa')
router.register(r'Defensa', views.DefensaView, 'defensa')
router.register(r'Usuario', views.UsuarioView, 'usuario')

router_urls = [path('', login_required(view)) for view in router.urls]

urlpatterns = [
    #path('', include(router_urls))
    path('', include(router.urls))
]