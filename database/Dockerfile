FROM postgres

RUN mkdir -p /database/csv

RUN mkdir -p /docker-entrypoint-initdb.d

COPY ./csv /database/csv

COPY vacationme.sql /docker-entrypoint-initdb.d