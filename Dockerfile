FROM node:8-alpine as builder

WORKDIR /usr/src/app

# Install all app dependencies
COPY package.json .
RUN yarn

# Bundle app files
COPY . .

# Build app
RUN yarn build

# Move necessary files into dist
RUN mkdir -p ./dist/client/ && \
    mv build/* ./dist/client/ && \
    mv pm2.config.js ./dist/ &&

# Prepare build for production
FROM keymetrics/pm2:latest-alpine

WORKDIR /home/node

COPY --from=builder /usr/src/app/dist .
# Install production app dependencies
COPY package.json .
RUN yarn --production

CMD [ "pm2-runtime", "start", "pm2.config.js" ]