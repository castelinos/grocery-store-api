FROM node:alpine as build
WORKDIR /usr/src/app

# Install the application dependencies
COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install --only=production

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/config.js ./
COPY --from=build /usr/src/app/.env ./

CMD ["node","dist/server.js"]



