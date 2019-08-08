FROM node:12.7.0-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
COPY .env.production .env
ENV NODE_ENV=production

CMD ["npm", "run", "production"]