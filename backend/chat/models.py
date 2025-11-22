from django.db import models

class Message(models.Model):
    USER_CHOICES = [
        ('A', 'Usuário A'),
        ('B', 'Usuário B'),
    ]
    
    user = models.CharField(max_length=1, choices=USER_CHOICES)
    content = models.TextField()
    is_response = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    parent_message = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='responses'
    )
    
    class Meta:
        ordering = ['timestamp']
    
    def __str__(self):
        msg_type = "Resposta" if self.is_response else "Pergunta"
        return f"{msg_type} de {self.get_user_display()}"