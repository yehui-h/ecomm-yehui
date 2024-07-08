FROM node:20.11.1 AS builder

WORKDIR /build-app
COPY package.json .
RUN npm install

# app
FROM node:20.11.1

EXPOSE 80
CMD ["node", "index.js"]

WORKDIR /ecomm-yehui/users
COPY --from=builder /build-app/node_modules/ /ecomm-yehui/users/node_modules/
COPY --from=builder /build-app/package.json /ecomm-yehui/users/
COPY distribution/ .
