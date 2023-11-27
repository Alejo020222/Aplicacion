from django.contrib.auth.models import User, AbstractUser, Permission, auth, BaseUserManager, PermissionsMixin, AbstractBaseUser
from django.db import models
import uuid
from django.core.files.storage import FileSystemStorage
from django.core.files.uploadedfile import SimpleUploadedFile

# Create your models here.


class Documento(models.Model):
    nombre = models.CharField(max_length=255, verbose_name='Nombre')
    fecha = models.DateField(verbose_name='Fecha')
    resumen = models.TextField(verbose_name='Resumen')
    profesor = models.ForeignKey(
        'Profesor', default=None, on_delete=models.CASCADE, verbose_name="Tutor")
    cotutor = models.CharField(
        max_length=255, verbose_name="Co-Tutor", blank=True)
    url = models.URLField(verbose_name='URL', unique=True)
    tribunal = models.ForeignKey(
        'Tribunal', null=True, on_delete=models.CASCADE, verbose_name='Tribunal')
    est = models.ForeignKey(
        'Estudiante', on_delete=models.CASCADE, default=None, verbose_name="Tesista")

    class Meta:
        verbose_name = 'Documento'
        verbose_name_plural = 'Documentos'
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre

class Usuario(models.Model):

    class Rol(models.TextChoices):
        ADMINISTRADOR = '1', 'Administrador'
        PROFESOR = '2', 'Profesor'
        ESTUDIANTE = '3', 'Estudiante'


    username = models.CharField(max_length=30, unique=True, verbose_name="Usuario")
    password = models.CharField(max_length=30, verbose_name="Contraseña")
    rol =models.CharField(max_length=1, choices=Rol.choices, default=Rol.ADMINISTRADOR, verbose_name="Rol")
   
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        db_table = 'usuario'
        ordering = ["id"]

    def __str__(self):
        return self.username

class Profesor(models.Model):
    nombre = models.CharField(max_length=30, verbose_name='Nombre')
    apellidos = models.CharField(max_length=100, verbose_name='Apellidos')
    categoria = models.CharField(max_length=100, verbose_name='Categoria')
    titulacion = models.CharField(max_length=100, default=None, verbose_name="Titulacion")
    area = models.CharField(max_length=50, verbose_name='Area')
    solapin = models.IntegerField(unique=True, default=None, verbose_name="Solapin")
    user_id = models.OneToOneField(Usuario, on_delete=models.CASCADE, default=None, verbose_name="Usuario")

    class Meta:
        verbose_name = 'Profesor'
        verbose_name_plural = 'Profesores'
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre + " " + self.apellidos

    @property
    def get_solapin(self):
        return int(self.solapin)

    @property
    def solapinTrab(self):
        return 'T-' + "{:04}".format(self.solapin)


class Estudiante(models.Model):
    nombre = models.CharField(max_length=50, verbose_name='Nombre')
    apellidos = models.CharField(max_length=100, verbose_name='Apellidos')
    carrera = models.CharField(max_length=255, default=' ', verbose_name='Carrera')
    year = models.PositiveIntegerField(verbose_name='Año')
    solapin = models.IntegerField(unique=True, default=None, verbose_name="Solapin")
    userid = models.OneToOneField(Usuario, on_delete=models.CASCADE, default=None, verbose_name="Usuario")

    class Meta:
        verbose_name = 'Estudiante'
        verbose_name_plural = 'Estudiantes'
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre + " " + self.apellidos

    @property
    def get_solapin(self):
        return int(self.solapin)

    @property
    def solapinTrab(self):
        return 'E-' + "{:04}".format(self.solapin)


class Tribunal(models.Model):
    presidente = models.CharField(max_length=100, verbose_name='Presidente')
    secretario = models.CharField(max_length=100, verbose_name='Secretario')
    vocal = models.CharField(max_length=100, verbose_name='Vocal')
    oponente = models.CharField(
        max_length=100, verbose_name='Oponente', blank=True)

    class Meta:
        verbose_name = 'Tribunal'
        verbose_name_plural = 'Tribunales'
        ordering = ["id"]

    def __str__(self):
        return f"{self.id}"


class PrimerCorte(models.Model):
    fecha = models.DateField(verbose_name='Fecha')
    evaluacion = models.IntegerField(verbose_name='Evaluacion')
    recomendaciones = models.TextField(verbose_name='Recomendaciones')
    doc = models.ForeignKey(Documento, default=None,
                            on_delete=models.CASCADE, verbose_name='PrimerCorte')
    documento = models.FileField(
        upload_to='primer_corte/', null=True, blank=True)

    class Meta:
        verbose_name = 'PrimerCorte'
        verbose_name_plural = 'PrimerosCortes'
        ordering = ["fecha"]

    def __str__(self):
        return self.doc.nombre


class SegundoCorte(models.Model):
    fecha = models.DateField(verbose_name='Fecha')
    evaluacion = models.IntegerField(verbose_name='Evaluacion')
    recomendaciones = models.TextField(verbose_name='Recomendaciones')
    doc = models.ForeignKey(
        Documento, default=None, on_delete=models.CASCADE, verbose_name='SegundoCorte')
    documento = models.FileField(
        upload_to='primer_corte/', null=True, blank=True)

    class Meta:
        verbose_name = 'SegundoCorte'
        verbose_name_plural = 'SegundosCortes'
        ordering = ["fecha"]

    def __str__(self):
        return self.doc.nombre


class Predefensa(models.Model):
    fecha = models.DateField(verbose_name='Fecha')
    evaluacion = models.IntegerField(verbose_name='Evaluacion')
    recomendaciones = models.TextField(verbose_name='Recomendaciones')
    doc = models.ForeignKey(Documento, default=None,
                            on_delete=models.CASCADE, verbose_name='Predefensa')
    documento = models.FileField(
        upload_to='primer_corte/', null=True, blank=True)

    class Meta:
        verbose_name = 'Predefensa'
        verbose_name_plural = 'Predefensas'
        ordering = ["fecha"]

    def __str__(self):
        return self.doc.nombre


class Defensa(models.Model):
    fecha = models.DateField(verbose_name='Fecha')
    evaluacion = models.IntegerField(verbose_name='Evaluacion')
    doc = models.ForeignKey(Documento, default=None,
                            on_delete=models.CASCADE, verbose_name='Defensa')
    url = models.URLField(verbose_name='URL', unique=True)

    class Meta:
        verbose_name = 'Defensa'
        verbose_name_plural = 'Defensas'
        ordering = ["fecha"]

    def __str__(self):
        return self.doc.nombre
