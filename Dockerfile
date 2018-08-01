FROM node:7.6
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app
EXPOSE 3001
ENV DB database
ENV PORT 3001
CMD ["npm", "run"]