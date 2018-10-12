FROM node:8-alpine as builder

WORKDIR /src

# Install all app dependencies
COPY package.json .
RUN yarn

# Bundle app files
COPY . .

# Build app
RUN yarn build

# Move necessary files into dist
RUN mkdir -p ./dist/client/ && mv build/* ./dist/client/

# Prepare build for production
FROM keymetrics/pm2:8-alpine

WORKDIR /usr/src/app

COPY --from=builder /src/dist/* .
# Install production app dependencies
COPY package.json .
RUN yarn

CMD [ "pm2-runtime", "server.js" ]