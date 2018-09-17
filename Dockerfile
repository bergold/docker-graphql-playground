FROM node:10-alpine
ARG buildid

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

LABEL me.bergold.graphql-playground.buildid=${buildid}
ENV PORT=4000 \
    BUILD_ID=${buildid} \
    NODE_ENV=production

EXPOSE $PORT
CMD [ "node", "/usr/src/app/src/index.js" ]
