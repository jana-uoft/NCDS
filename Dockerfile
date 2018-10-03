FROM keymetrics/pm2:latest-alpine

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN yarn

# Bundle app files
COPY . .

# Build app
RUN yarn build

# Move necessary files into dist
RUN mkdir -p ./dist/client/ && mv build/* ./dist/client/
RUN mv node_modules/ dist/

# Remove unwanted files & directories
RUN rm -rf src server public

# install gettext
ENV GETTEXT_VER=0.19.8
ENV GETTEXT_FNAME=gettext-$GETTEXT_VER
ENV GETTEXT_SOURCE=http://ftp.gnu.org/pub/gnu/gettext/$GETTEXT_FNAME.tar.lz

RUN wget $GETTEXT_SOURCE && \
  lzip -d -c $GETTEXT_FNAME.tar.lz | tar -xvf - && \
  cd $GETTEXT_FNAME && \
  ./configure && \
  make && \
  make install && \
  cd / && \
  rm -rf $GETTEXT_FNAME && \
  rm $GETTEXT_FNAME.tar.lz
  
RUN env $(cat .env) envsubst < pm2.config.js > pm2.config.js

CMD [ "pm2-runtime", "start", "pm2.config.js" ]