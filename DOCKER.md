# Docker Setup for Boardz Application

This document outlines how to run the Boardz application using Docker.

## Option 1: PostgreSQL Service Only

If you only need the PostgreSQL database service, you can use the `docker-compose-db-only.yml` file:

```bash
docker-compose -f docker-compose-db-only.yml up -d
```

This will start just the PostgreSQL database with the following configuration:
- Database name: `boardz`
- Username: `user`
- Password: `YOUR_PASSWORD` (you should change this)
- Data persistence: via Docker volume `db-data`

## Option 2: Complete Application

To run the complete application (database + app), use the main `docker-compose.yml` file:

```bash
# Build the image first
docker build -t your-org/boardz:latest .

# Start both services
docker-compose up -d
```

This will start both the PostgreSQL database and the Boardz application.

### Environment Variables

You should customize at least the following environment variables in `docker-compose.yml` before deploying:

- `DATABASE_URL`: Connection string to your PostgreSQL database
- `SECRET_KEY`: A secure random string used for session encryption
- `BASE_URL`: The URL where your application will be accessible

### Data Persistence

The following directories are mounted as volumes for data persistence:

- `./data/user-avatars`: User profile images
- `./data/background-images`: Background images for boards
- `./data/attachments`: File attachments

## Building a Custom Image

You can build a custom Docker image for the Boardz application using:

```bash
docker build -t your-org/boardz:latest .
```

The provided Dockerfile:
1. Builds the client application
2. Sets up the server application
3. Combines them into a single container
4. Exposes port 1337 for web access
