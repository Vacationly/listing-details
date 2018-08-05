# Listing Details

A full-stack React module that recreates the listing details section of an AirBnB listing page, including:

- Overview (title, type, location, host, capacity)
- Highlights
- Description
- Amenities
- Sleeping arrangements
- House rules
- Cancellation policy
- Video tour (add-on to what AirBnB actually has)

Data is randomly generated to fill in each part of the component.

## Related Projects

- https://github.com/HalalGuys/navigation
- https://github.com/HalalGuys/reviews
- https://github.com/HalalGuys/bookings
- https://github.com/HalalGuys/photos

## Build with...

### System Requirements

- Node >=6.7.0 (runtime environment)
- npm >=6.0 (dependency manager)
- MongoDB >=3.0 (database)

### Prod Dependencies (installed with npm)

- axios (sending API requests from client)
- body-parser (handling requests on server)
- css-modules (modular styles)
- faker (data generation)
- mongoose (database connections)
- nodemon (running/watching server)
- prop-types (validating component data)
- react (component library)
- react-dom (rendering component)
- react-icons (rendering special icons)

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

## Setting Up

You can locally run this module either (1) with NPM scripts from local files, or (2) from its respective container on DockerHub (see more below).

When the server is running, navigating to **localhost:3001/listing/[id from 1 to 100]** should display a listing details page (with unique data for the given id).

**By default, the static js bundle is served from S3; to serve from localhost, change the appropriate commented-out lines in public/index.html.**

> NOTE: All commands below to be run from within the root directory

### Running with npm

In order to run with npm, you need to:

- Install dependencies
- Seed your database
- Build client bundle.js, locally and/or to S3
- Run the server

#### Installing Dependencies

```sh
npm install -g webpack
npm install
```

#### Seeding Database

```sh
npm run seed
```

#### Building Local Client Bundle

> NOTE: The files built in this way will only be served if you change the script tags used in public/index.html!

```sh
npm run build:dev
```

#### Building Client Bundle to S3

```sh
npm run build:prod
```

#### Running Server

> NOTE: This uses nodemon, so changes will update the server environment automatically.

```sh
npm run start
```

### Running with Docker

In order to run with Docker, you need to:

- Create your own image on DockerHub, updating the `package.json` and `docker-compose.yml` files accordingly
- Build your image to DockerHub
- Run the `docker-compose` file
- Modify some of the scripts further if you want to work out of a locally Dockerized version

**NOTE: If you plan on running with Docker, please modify the `build:docker` script in `package.json` to create images in your own account. For example:**

Current script:

```sh
docker build . -t bcronin2/fec-airbnh-details && docker push bcronin2/fec-airbnh-details
```

Your script:

```sh
docker build . -t YOUR_NAME/fec-airbnh-details && docker push YOUR_NAME/fec-airbnh-details
```

**You should also update line 5 in `docker-compose.yml` with this new tag.**

#### Building Container to DockerHub

```sh
npm run build:docker
```

#### Running Container from DockerHub (includes seeding database)

```sh
docker-compose up (-d)
```

### Maintenance

#### Testing

> NOTE: The \_\_test\_\_ folder only contains API tests and config files; other integration tests and unit tests of components are in client/components. The command below runs tests from both locations.

```sh
npm run test
```

#### Linting

```sh
npm run lint
```
