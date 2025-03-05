from django.db import models



class Plan(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    price = models.IntegerField()
    
    check_limit = models.IntegerField(default=0)

    def __str__(self):
        return self.name
