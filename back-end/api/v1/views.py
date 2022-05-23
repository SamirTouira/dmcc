from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import User
from django.views.decorators.csrf import csrf_exempt
from json import loads
from django.contrib.auth import authenticate, login, logout

# Create your views here.

def index(request):
    return JsonResponse({'message': 'Hello, world.'})

@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        data = loads(request.body)
        if data['email'] and data['password']:
            user = User.objects.create_user(
                email=data['email'],
                password=data['password']
            )
            user.save()
            return JsonResponse({'message': 'User created successfully.'})
        else:
            return JsonResponse({'message': 'Missing parameters.'})
    else:
        return JsonResponse({'error': 'Method not allowed.'})

@csrf_exempt
def me(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return JsonResponse({'email': request.user.email, 'id': request.user.id})
        else:
            return JsonResponse({'message': 'User not authenticated.'})
    else:
        return JsonResponse({'error': 'Method not allowed.'})


@csrf_exempt
def log_user(request):
    if request.method == 'POST':
        data = loads(request.body)
        if data['email'] and data['password']:
            user = authenticate(email=data['email'], password=data['password'])
            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'User logged in.', 'token': request.session.session_key})
            else:
                return JsonResponse({'message': 'User not found.'})
        else:
            return JsonResponse({'message': 'Missing parameters.'})
    else:
        return JsonResponse({'error': 'Method not allowed.'})

@csrf_exempt
def logout_user(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            logout(request)
            return JsonResponse({'message': 'User logged out.'})
        else:
            return JsonResponse({'message': 'User not authenticated.'})
    else:
        return JsonResponse({'error': 'Method not allowed.'})

@csrf_exempt
def delete_user(request, user_id):
    if request.method == 'DELETE':
        #if request.user.is_authenticated and request.user.is_staff:
        user = get_object_or_404(User, pk=user_id)
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return JsonResponse({'message': 'User not found.'})
        user.delete()
        return JsonResponse({'message': 'User deleted.'})

@csrf_exempt
def update_user(request):
    if request.method == 'PUT':
        data = loads(request.body)
        if data['email'] and data['password']:
            if request.user.is_authenticated:
                user = request.user
                user.email = data['email']
                user.set_password(data['password'])
                user.save()
                return JsonResponse({'message': 'User updated.'})
            else:
                return JsonResponse({'message': 'User not authenticated.'})
        else:
            return JsonResponse({'message': 'Missing parameters.'})
    else:
        return JsonResponse({'error': 'Method not allowed.'})
