FROM node:7.6
RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install --only=production

EXPOSE 3001

ENV PORT 3001

# ENV PGHOST put/url/here
ENV PGUSER marcelinoornelas
ENV PGDATABASE vacation_me
# ENV PGPASSWORD password

CMD ["npm", "start"]