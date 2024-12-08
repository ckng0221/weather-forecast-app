FROM node:alpine as build

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:docker

FROM nginx:alpine as runtime

COPY --from=build /usr/app/dist/weather-forecast/browser /usr/share/nginx/html

# RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Remove default
RUN rm /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx

# docker build . -t weather-forecast-ui
# docker run --name weather-forecast-ui -p 80:80 -d weather-forecast-ui
# docker run -p 80:80 -d weather-forecast-ui
