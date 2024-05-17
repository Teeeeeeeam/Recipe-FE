FROM node:18-slim

RUN mkdir -p /app/front

WORKDIR /app/front

COPY . .

# RUN yarn build

CMD [ "yarn", "start" ]