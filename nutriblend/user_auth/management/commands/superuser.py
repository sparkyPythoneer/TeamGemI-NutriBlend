from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from decouple import config

class Command(BaseCommand):
    help = 'Creates a superuser from environment variables'

    def handle(self, *args, **options):
        User = get_user_model()
        first_name = config('DJANGO_SUPERUSER_FIRST_NAME')
        last_name = config('DJANGO_SUPERUSER_LAST_NAME')
        email = config('DJANGO_SUPERUSER_EMAIL')
        password = config('DJANGO_SUPERUSER_PASSWORD')

        try:
            User.objects.create_superuser(first_name=first_name,last_name=last_name, email=email, password=password)
            self.stdout.write(self.style.SUCCESS('Successfully created new superuser'))
        except IntegrityError:
            self.stdout.write(self.style.ERROR('Could not create superuser'))
