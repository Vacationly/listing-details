FROM node:7.6
RUN mkdir -p /app
WORKDIR /app
COPY . /app
EXPOSE 3001
CMD ["npm", "run"]