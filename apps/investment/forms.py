from django import forms
from django.contrib.auth.forms import UserCreationForm


class CustomUserCreationForm(UserCreationForm):
    """Форма регистрации пользователя"""

    first_name = forms.CharField(label="Имя", required=True)
    last_name = forms.CharField(label="Фамилия", required=True)
    patronymic = forms.CharField(label="Отчество", required=False)
    email = forms.EmailField(required=True)
    organization_name = forms.CharField(label="Название организации", required=False)
    taxpayer_identification_number = forms.CharField(label="ИНН", required=True)
    organization_web_site = forms.CharField(label="Сайт организации", required=False)
    branch = forms.CharField(label="Отрасль ведения бизнеса", required=False)
    country = forms.CharField(label="Страна", required=False)
    city = forms.CharField(label="Город", required=False)
    post = forms.CharField(label="Должность", required=False)
