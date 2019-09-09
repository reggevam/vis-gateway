FROM node:12.7.0-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production

CMD ["npm", "run", "production"]