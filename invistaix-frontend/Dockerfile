FROM node:24 AS builder
WORKDIR /app

COPY . .
RUN npm install

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]