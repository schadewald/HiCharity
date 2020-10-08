FROM node
WORKDIR /cen4053-group7
COPY . .
RUN yarn install --production
CMD ["node", "server.js"]