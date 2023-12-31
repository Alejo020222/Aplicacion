# Generated by Django 4.1.3 on 2023-11-25 21:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Documento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=255, verbose_name='Nombre')),
                ('fecha', models.DateField(verbose_name='Fecha')),
                ('resumen', models.TextField(verbose_name='Resumen')),
                ('cotutor', models.CharField(blank=True, max_length=255, verbose_name='Co-Tutor')),
                ('url', models.URLField(unique=True, verbose_name='URL')),
            ],
            options={
                'verbose_name': 'Documento',
                'verbose_name_plural': 'Documentos',
                'ordering': ['nombre'],
            },
        ),
        migrations.CreateModel(
            name='Tribunal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('presidente', models.CharField(max_length=100, verbose_name='Presidente')),
                ('secretario', models.CharField(max_length=100, verbose_name='Secretario')),
                ('vocal', models.CharField(max_length=100, verbose_name='Vocal')),
                ('oponente', models.CharField(blank=True, max_length=100, verbose_name='Oponente')),
            ],
            options={
                'verbose_name': 'Tribunal',
                'verbose_name_plural': 'Tribunales',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=30, unique=True)),
                ('password', models.CharField(max_length=30)),
                ('rol', models.CharField(choices=[('Admin', 'Administrador'), ('Profesor', 'Profesor'), ('Estudiante', 'Estudiante')], default='Admin', max_length=30, verbose_name='Rol')),
            ],
            options={
                'verbose_name': 'Usuario',
                'verbose_name_plural': 'Usuarios',
                'db_table': 'usuario',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='SegundoCorte',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(verbose_name='Fecha')),
                ('evaluacion', models.IntegerField(verbose_name='Evaluacion')),
                ('recomendaciones', models.TextField(verbose_name='Recomendaciones')),
                ('documento', models.FileField(blank=True, null=True, upload_to='primer_corte/')),
                ('doc', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='culmicacion.documento', verbose_name='SegundoCorte')),
            ],
            options={
                'verbose_name': 'SegundoCorte',
                'verbose_name_plural': 'SegundosCortes',
                'ordering': ['fecha'],
            },
        ),
        migrations.CreateModel(
            name='Profesor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=30, verbose_name='Nombre')),
                ('apellidos', models.CharField(max_length=100, verbose_name='Apellidos')),
                ('categoria', models.CharField(max_length=100, verbose_name='Categoria')),
                ('titulacion', models.CharField(default=None, max_length=100, verbose_name='Titulacion')),
                ('area', models.CharField(max_length=50, verbose_name='Area')),
                ('solapin', models.IntegerField(default=None, unique=True, verbose_name='Solapin')),
                ('user_id', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='culmicacion.usuario', verbose_name='Usuario')),
            ],
            options={
                'verbose_name': 'Profesor',
                'verbose_name_plural': 'Profesores',
                'ordering': ['nombre'],
            },
        ),
        migrations.CreateModel(
            name='PrimerCorte',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(verbose_name='Fecha')),
                ('evaluacion', models.IntegerField(verbose_name='Evaluacion')),
                ('recomendaciones', models.TextField(verbose_name='Recomendaciones')),
                ('documento', models.FileField(blank=True, null=True, upload_to='primer_corte/')),
                ('doc', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='culmicacion.documento', verbose_name='PrimerCorte')),
            ],
            options={
                'verbose_name': 'PrimerCorte',
                'verbose_name_plural': 'PrimerosCortes',
                'ordering': ['fecha'],
            },
        ),
        migrations.CreateModel(
            name='Predefensa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(verbose_name='Fecha')),
                ('evaluacion', models.IntegerField(verbose_name='Evaluacion')),
                ('recomendaciones', models.TextField(verbose_name='Recomendaciones')),
                ('documento', models.FileField(blank=True, null=True, upload_to='primer_corte/')),
                ('doc', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='culmicacion.documento', verbose_name='Predefensa')),
            ],
            options={
                'verbose_name': 'Predefensa',
                'verbose_name_plural': 'Predefensas',
                'ordering': ['fecha'],
            },
        ),
        migrations.CreateModel(
            name='Estudiante',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50, verbose_name='Nombre')),
                ('apellidos', models.CharField(max_length=100, verbose_name='Apellidos')),
                ('carrera', models.CharField(default=' ', max_length=255, verbose_name='Carrera')),
                ('year', models.PositiveIntegerField(verbose_name='Año')),
                ('solapin', models.IntegerField(default=None, unique=True, verbose_name='Solapin')),
                ('userid', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='culmicacion.usuario', verbose_name='Usuario')),
            ],
            options={
                'verbose_name': 'Estudiante',
                'verbose_name_plural': 'Estudiantes',
                'ordering': ['nombre'],
            },
        ),
        migrations.AddField(
            model_name='documento',
            name='est',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='culmicacion.estudiante', verbose_name='Tesista'),
        ),
        migrations.AddField(
            model_name='documento',
            name='profesor',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='culmicacion.profesor', verbose_name='Tutor'),
        ),
        migrations.AddField(
            model_name='documento',
            name='tribunal',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='culmicacion.tribunal', verbose_name='Tribunal'),
        ),
        migrations.CreateModel(
            name='Defensa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(verbose_name='Fecha')),
                ('evaluacion', models.IntegerField(verbose_name='Evaluacion')),
                ('url', models.URLField(unique=True, verbose_name='URL')),
                ('doc', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='culmicacion.documento', verbose_name='Defensa')),
            ],
            options={
                'verbose_name': 'Defensa',
                'verbose_name_plural': 'Defensas',
                'ordering': ['fecha'],
            },
        ),
    ]
