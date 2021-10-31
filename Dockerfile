
FROM node:15
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
#container exposed network port number
EXPOSE 3000
#command to run within the container
CMD ["npm", "start"]
