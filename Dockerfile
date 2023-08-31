FROM python:3.8-slim-bookworm

# install system-wide deps for python and node
RUN apt-get -y update
RUN apt-get -y install git curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get install -yq nodejs

# set environment variables
ENV PYTHONUNBUFFERED=1
ENV PROJ_ROOT=/bars-webapp
WORKDIR $PROJ_ROOT

RUN git clone https://github.com/mchatzis/bars-webapp.git .
RUN pip3 install --no-cache-dir -r requirements.txt
RUN npm install\
    && npm run build

RUN python3 manage.py makemigrations\
    && python3 manage.py migrate

CMD ["python3", "manage.py", "runserver", "0.0.0.0:3000"]
