FROM node:18.12.1 as build

# RUN mkdir /root/.ssh/

# RUN touch /root/.ssh/known_hosts
# RUN ssh-keyscan -H github.com >> ~/.ssh/known_hosts

RUN apt update && apt install git

RUN git clone -b main https://github.com/optus-fi/dashboard.git

WORKDIR /dashboard

RUN npm install

RUN npm run build

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /dashboard/build /usr/share/nginx/html