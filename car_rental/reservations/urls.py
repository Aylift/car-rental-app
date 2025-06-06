from django.urls import path
from .views import ReservationListCreateView, MockPaymentView, CancelReservationView

urlpatterns = [
    path('reservations/', ReservationListCreateView.as_view(), name='reservation-list-create'),
    path('reservations/<int:reservation_id>/mock-pay/', MockPaymentView.as_view(), name='mock-payment'),
    path('reservations/<int:reservation_id>/cancel/', CancelReservationView.as_view(), name='reservation-cancel'),
]