from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import ReservationSerializer
from .models import Reservation
from drf_spectacular.utils import extend_schema

class ReservationListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="User reservations list",
        responses={200: ReservationSerializer(many=True)}
    )
    def get(self, request):
        reservations = Reservation.objects.filter(user=request.user)
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)

    @extend_schema(
        summary="Book a car",
        request=ReservationSerializer,
        responses={201: ReservationSerializer}
    )
    def post(self, request):
        serializer = ReservationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
