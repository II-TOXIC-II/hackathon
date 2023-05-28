import django.contrib.auth as auth
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect

from . import forms, models


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
        form = forms.CustomUserCreationForm(data=request.POST)

        if form.is_valid():
            user = form.save()
            auth.login(request, user)

            user_model = models.CustomUser.objects.create(
                first_name=form.cleaned_data['first_name'],
                last_name=form.cleaned_data['last_name'],
                patronymic=form.cleaned_data['patronymic'],
                email=form.cleaned_data['email'],
                organization_name=form.cleaned_data['organization_name'],
                taxpayer_identification_number=form.cleaned_data['taxpayer_identification_number'],
                organization_web_site=form.cleaned_data['organization_web_site'],
                branch=form.cleaned_data['branch'],
                country=form.cleaned_data['country'],
                city=form.cleaned_data['city'],
                post=form.cleaned_data['post']
            )
            user_model.save()

            return redirect("home")

    else:
        form = forms.CustomUserCreationForm()

    return render(request, "pages/registration.html", {
        "page_title": "Регистрация",
        "form":       form,
    })


def login(request):
    user = request.user

    if user.is_authenticated:
        return redirect("home")

    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = auth.authenticate(request, username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return redirect("home")

    else:
        form = AuthenticationForm()

    return render(request, "pages/login.html", {
        "page_title": "Вход",
        "form":       form,
    })


def logout(request):
    user = request.user

    if user.is_authenticated:
        auth.logout(request)

    return redirect("login")
