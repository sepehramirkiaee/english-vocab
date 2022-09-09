FROM node:14.14.0

WORKDIR /app

RUN npm install

CMD ["npm", "run", "serve"]