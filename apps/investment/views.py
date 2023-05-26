from django.shortcuts import render


def home(request):
    return render(request, "pages/home.html", {
        "page_title": "Главная"
    })


def registration(request):
    return render(request, "pages/registration.html", {
        "page_title": "Регистрация"
    })


def login(request):
    return render(request, "pages/login.html", {
        "page_title": "Вход"
    })


def logout(request):
    pass
