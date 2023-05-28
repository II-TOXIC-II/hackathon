from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("report", views.report, name="report"),
    path("generate_report_pdf", views.generate_report_pdf, name="generate_report_pdf"),
    path("registration", views.registration, name="registration"),
    path("login", views.login, name="login"),
    path("logout", views.logout, name="logout"),
]
