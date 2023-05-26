# Create your models here.
from django.db import models


class CustomUser(models.Model):
    """Модель для хранения информации о зарегистрированном пользователе"""

    first_name = models.CharField(max_length=30, verbose_name="Имя")
    last_name = models.CharField(max_length=30, verbose_name="Фамилия")
    patronymic = models.CharField(max_length=30, verbose_name="Отчество", blank=True, null=True)
    email = models.EmailField(verbose_name="Почта", unique=True)
    organization_name = models.CharField(max_length=100, verbose_name="Название организации", blank=True, null=True)
    taxpayer_identification_number = models.CharField(max_length=12, verbose_name="ИНН")
    organization_web_site = models.URLField(verbose_name="Сайт организации", blank=True, null=True)
    branch = models.CharField(max_length=50, verbose_name="Отрасль ведения бизнеса", blank=True, null=True)
    country = models.CharField(max_length=50, verbose_name="Страна", blank=True, null=True)
    city = models.CharField(max_length=50, verbose_name="Город", blank=True, null=True)
    post = models.CharField(max_length=50, verbose_name="Должность", blank=True, null=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"


class TableFile(models.Model):
    """Модель для хранения загруженных администратором файлов таблиц"""

    file = models.FileField(verbose_name="Файл таблицы", upload_to="media\\investment\\tables")
    table_type = models.CharField(verbose_name="Тип таблицы", max_length=50)

    def __str__(self):
        return self.file.name

    class Meta:
        verbose_name = "Файл таблицы"
        verbose_name_plural = "Файлы таблиц"
