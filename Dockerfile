FROM node:8

RUN apt-get update; apt-get install curl git rsync -y
