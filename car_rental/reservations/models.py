from django.db import models
from django.contrib.auth import get_user_model
from cars.models import Car

User = get_user_model()

class Reservation(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending payment'),
        ('paid', 'Paid'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.user} → {self.car} ({self.start_date} - {self.end_date})"
