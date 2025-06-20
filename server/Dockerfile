FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 4200

CMD ["npm", "run", "start"]
