from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import UserManager
from .managers import MyUserManager

class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    def is_staff(self):
        return self.is_staff
    def has_perm(self, perm, obj=None):
        return True
    def has_module_perms(self, app_label):
        return True
    objects = MyUserManager()
    def __str__(self):
        return self.email
    def get_email(self):
        return self.email
    def get_admin(self):
        return self.is_staff
