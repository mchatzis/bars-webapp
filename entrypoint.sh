python3 manage.py makemigrations
python3 manage.py migrate
gunicorn -c gunicorn-dev.conf.py