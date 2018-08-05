# Listing Details

A full-stack React component that recreates the listing details section of an AirBnB listing page, including:

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

## Requirements

- Node >=6.7.0
- npm >=6.0
- MongoDB >=3.0

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

## Development

The server for this component is run locally on port 3001. It can be run either directly with NPM scripts from local files or from its respective container on DockerHub (see more below).

_By default, the static js bundle is served from S3; to serve from localhost, change the appropriate commented-out lines in public/index.html._

> All commands to be run from within the root directory

### Running with NPM

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

NOTE: The files built in this way will only be served if you change the script tags used in public/index.html!

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

Note that this will just take the latest image of this repo on DockerHub. To update that image based on the current state of the repo, run `npm run build:docker`.

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

```sh
npm run test
```

#### Linting

```sh
npm run lint
```
