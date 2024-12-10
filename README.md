# Weather Forecast App

[![CI](https://github.com/ckng0221/weather-forecast-app/actions/workflows/ci.yml/badge.svg)](https://github.com/ckng0221/weather-forecast-app/actions/workflows/ci.yml)

Weather Forecast App is a web application written in [TypeScript](https://www.typescriptlang.org/) and [Go](https://go.dev/). The application currently provides weather forecast information in major location in Malaysia (API v1). The API is versioned and can be served independently as a public API to provide weather forecast data.

- `API`: The backend application server with REST API endpoints.
- `UI`: The UI of the application.
- `Timer`: A cron job that that pull the latest data from the weather forecast source.

## Tech Stacks

### Backend (API)

- Programming Language: [TypeScript](https://www.typescriptlang.org/)
- Server Framework: [NestJS](https://nestjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)

### UI

- Programming Language: [TypeScript](https://www.typescriptlang.org/)
- Frontend Framework: [Angular](https://angular.dev/)
- CSS Framework: [Tailwind CSS](https://tailwindcss.com/)
- UI library: [Angular Material UI](https://material.angular.io/)
- Hosting: [Nginx](https://nginx.org/en/)

### Timer

- Programming Language: [Go](https://go.dev/)
- Data Source: [data.gov.my](https://developer.data.gov.my/realtime-api/weather)

### Build

- CI Platform: [GitHub Actions](https://github.com/features/actions)
- Multi-container Tool: [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

### Installation

```bash
# At the project root
# Install all denpendencies
make install_all
```

Before running application, rename the `.env.example` files to `.env`, and update the environment variables accordingly.

## Run application

### On local

To run the application locally, ensure that `MongoDB` is installed beforehand.

```bash
# At project root
# Development mode
make -j2 run_dev

# Build all
make build_all

# Alternatively, you can navigate to the root of each application (e.g., ./apps/api) and run the npm scripts to run the particular application only.
```

### With docker and docker compose

To run the application using Docker, ensure that `Docker` and `Docker Compose` are installed beforehand.


```bash
# At project root
# Create docker images and run docker containers in detached mode
make run_docker

# Stop and remove containers
make stop_docker

# To access the docker applications on local, could browser:
http://weather-forecast.127.0.0.1.nip.io
```

# Future release

In current API v1 only support Malaysia weather foreacst with relatively fewer information.
For future API v2, it is planned to support all global regions, with more information such as humidity, due point, and hourly weather throughout the day.


# Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the guidelines outlined in CONTRIBUTING.md.

# License

This project is licensed under the MIT License.
