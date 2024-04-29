#!/usr/bin/env bash

set -o errexit  # exit when there is an error error
# pip install --upgrade pip

pip install -r requirements.txt

# python manage.py collectstatic --no-input
python manage.py makemigrations user_auth

# python manage.py makemigrations user_auth
python manage.py migrate

if [[ $CREATE_SUPERUSER ]]; then
  python manage.py createsuperuser --no-input
fi