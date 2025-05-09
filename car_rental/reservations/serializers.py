from rest_framework import serializers
from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'user', 'car', 'start_date', 'end_date', 'created_at', 'payment_status']
        read_only_fields = ['id', 'created_at', 'user', 'payment_status']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
