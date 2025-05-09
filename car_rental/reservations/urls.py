from django.urls import path
from .views import ReservationListCreateView, MockPaymentView

urlpatterns = [
    path('reservations/', ReservationListCreateView.as_view(), name='reservation-list-create'),
    path('reservations/<int:reservation_id>/mock-pay/', MockPaymentView.as_view(), name='mock-payment'),
]