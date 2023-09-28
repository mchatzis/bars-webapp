python3 manage.py makemigrations
python3 manage.py migrate
python manage.py collectstatic --no-input
gunicorn -c gunicorn.conf.py