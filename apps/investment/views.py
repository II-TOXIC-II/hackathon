import django.contrib.auth as auth
from django.contrib.auth.models import User
from django.shortcuts import render, redirect

from . import models


def home(request):
    return render(request, "pages/home.html", {
        "page_title": "Главная"
    })


def report(request):
    return render(request, "pages/report.html", {
        "page_title": "Отчет"
    })


def registration(request):
    user = request.user

    if user.is_authenticated:
        return redirect("home")

    if request.method == "POST":
        fields = request.POST.dict()

        User.objects.create_user(username=fields["registerLogin"], password=fields["registerPassword"],
                                 email=fields['email'], first_name=fields['firstName'],
                                 last_name=fields['lastName']).save()

        user = auth.authenticate(request, username=fields["registerLogin"], password=fields["registerPassword"])
        auth.login(request, user)

        user_model = models.CustomUser.objects.create(
            first_name=fields['firstName'],
            last_name=fields['lastName'],
            patronymic=fields['fatherName'],
            email=fields['email'],
            organization_name=fields['nameOrganization'],
            taxpayer_identification_number=fields['inn'],
            organization_web_site=fields['site'],
            branch=fields['branch'],
            country=fields['country'],
            city=fields['city'],
            post=fields['jobTitle']
        )
        user_model.save()

        return redirect("home")

    return render(request, "pages/registration.html", {
        "page_title": "Регистрация",
    })


def login(request):
    user = request.user

    if user.is_authenticated:
        return redirect("home")

    if request.method == "POST":
        fields = request.POST.dict()

        username = fields['login']
        password = fields['password']

        user = auth.authenticate(request, username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect("home")

    return redirect("registration")


def logout(request):
    user = request.user

    if user.is_authenticated:
        auth.logout(request)

    return redirect("login")
