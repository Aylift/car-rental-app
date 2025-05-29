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


class CancelReservationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="Cancel a reservation",
        responses={200: ReservationSerializer, 404: dict, 400: dict}
    )
    def post(self, request, reservation_id):
        try:
            reservation = Reservation.objects.get(id=reservation_id, user=request.user)
        except Reservation.DoesNotExist:
            return Response({'detail': 'Reservation not found.'}, status=status.HTTP_404_NOT_FOUND)

        if reservation.payment_status == 'paid':
            return Response({'detail': 'Cannot cancel a paid reservation.'}, status=status.HTTP_400_BAD_REQUEST)

        reservation.delete()
        return Response({'detail': 'Reservation canceled successfully.'}, status=status.HTTP_200_OK)


class MockPaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="Mock payment for a reservation",
        responses={200: ReservationSerializer}
    )
    def post(self, request, reservation_id):
        try:
            reservation = Reservation.objects.get(id=reservation_id, user=request.user)
        except Reservation.DoesNotExist:
            return Response({'detail': 'Reservation not found.'}, status=status.HTTP_404_NOT_FOUND)

        if reservation.payment_status == 'paid':
            return Response({'detail': 'Reservation already paid.'}, status=status.HTTP_400_BAD_REQUEST)

        reservation.payment_status = 'paid'
        reservation.save()

        serializer = ReservationSerializer(reservation)
        return Response(serializer.data, status=status.HTTP_200_OK)
