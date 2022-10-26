from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer

class GetUserProfileView(APIView):
    def get(self, request, format=None):
        try:
            user = self.request.user
            username = user.username
            
            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)
            
            return Response({ 'profile': user_profile.data, 'username': str(username) })
        except NameError as err:
            return Response({ 'error': err})
            # return Response({ 'error': 'Something went wrong when retrieving profile' })