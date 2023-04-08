from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer, UserChangePasswordSerializer, SendPasswordResetEmailSerializer, UserResetPasswordSerializer
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistration(APIView):

    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=False):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token': token, 'Msg' : serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    

class UserLogin(APIView):

    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=False):
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token' : token, 'Msg' : 'Login Success'})
            else:
                return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}})

        return Response(serializer.errors)
    

class UserProfile(APIView):

    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserChangePassword(APIView):
    
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid(raise_exception=False):
            return Response({'msg':'Password Changed Successfully'})
        
        return Response(serializer.errors)
        

class SendPasswordResetEmail(APIView):

    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid(raise_exception=False):
            return Response({'msg':'Password Reset link send. Please check your Email'})
        return Response(serializer.errors)
    

class UserResetPassword(APIView):

    renderer_classes = [UserRenderer]

    def post(self, request, uid, token, format=None):
        serializer = UserResetPasswordSerializer(data=request.data, context={'uid':uid, 'token':token})
        if serializer.is_valid(raise_exception=False):
            return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors)
