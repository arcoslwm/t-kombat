FROM node:16-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]