FROM node:alpine As development

ARG service

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as production

ARG service
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist

COPY package*.json ./
RUN npm install --omit=dev

CMD ["node", "dist/main.js"]