from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("user/create", views.create_user, name="create_user"),
    path("user/login", views.log_user, name="log_user"),
    path("user/me", views.me, name="me"),
    path("user/logout", views.logout_user, name="logout_user"),
    path("user/delete/<int:user_id>", views.delete_user, name="delete_user"),
    path("user/update", views.update_user, name="update_user"),
]