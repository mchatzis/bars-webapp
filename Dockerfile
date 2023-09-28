FROM python:3.8-slim-bookworm

# install system-wide deps for python and node
RUN apt-get -y update
RUN apt-get -y install curl
RUN apt install libpq5
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get install -yq nodejs

# set environment variables
ENV PYTHONUNBUFFERED=1
ENV PROJ_ROOT=/home/ec2-user/app/bars-webapp
RUN mkdir -p $PROJ_ROOT/collectedstatic

WORKDIR $PROJ_ROOT
ADD ./requirements.txt .
RUN pip3 install -r requirements.txt

COPY . .

RUN npm install\
    && npm run build

CMD ["bash", "./entrypoint.sh"]