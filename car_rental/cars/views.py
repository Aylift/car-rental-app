from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, SAFE_METHODS, BasePermission
from rest_framework import status
from .models import Car
from .serializers import CarSerializer
from drf_spectacular.utils import extend_schema


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class CarListCreateView(APIView):
    permission_classes = [IsAdminOrReadOnly]

    @extend_schema(
        summary="Cars list",
        responses={200: CarSerializer(many=True)}
    )
    def get(self, request):
        cars = Car.objects.all()
        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)

    @extend_schema(
        summary="Add new car",
        request=CarSerializer,
        responses={201: CarSerializer}
    )
    def post(self, request):
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CarDetailView(APIView):
    permission_classes = [IsAdminOrReadOnly]

    @extend_schema(
        summary="Car details",
        responses={200: CarSerializer}
    )
    def get(self, request, pk):
        car = get_object_or_404(Car, pk=pk)
        serializer = CarSerializer(car)
        return Response(serializer.data)

    @extend_schema(
        summary="Edit car",
        request=CarSerializer,
        responses={200: CarSerializer}
    )
    def put(self, request, pk):
        car = get_object_or_404(Car, pk=pk)
        serializer = CarSerializer(car, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        summary="Delete car",
        responses={204: None}
    )
    def delete(self, request, pk):
        car = get_object_or_404(Car, pk=pk)
        car.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

