from django.contrib import admin
from .models import Reservation


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'car', 'start_date', 'end_date', 'payment_status')
    list_filter = ('payment_status', 'start_date', 'end_date')
    search_fields = ('user__username', 'car__brand', 'car__model')
