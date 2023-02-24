FROM node:16.18.0
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . ./
#container exposed network port number
EXPOSE 8000
CMD ["npm", "start"]