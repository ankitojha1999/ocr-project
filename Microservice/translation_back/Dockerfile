# Dockerfile for Translation Service
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5002
CMD ["node", "translation-service.js"]
