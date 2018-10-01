
FROM keymetrics/pm2:latest-alpine

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN yarn --production

# Bundle app files
COPY . .

# Build app
RUN yarn build

# Move necessary files into dist
RUN mkdir -p ./dist/client/ && mv build/* ./dist/client/
RUN mv node_modules/ dist/

# Remove unwanted files & directories
RUN rm -rf src server public

CMD [ "pm2-runtime", "start", "pm2.config.js" ]