FROM node:18-alpine AS client-builder

WORKDIR /app/client
COPY client/package.json client/package-lock.json client/patches ./
COPY client/patches/ ./patches/
RUN npm ci
COPY client .
RUN npm run build

FROM node:18-alpine AS server-builder

WORKDIR /app
RUN apk add --no-cache python3 make g++ build-base

COPY server/package.json server/package-lock.json ./server/
WORKDIR /app/server
# Install with rebuild to ensure native modules are properly compiled
RUN npm ci --ignore-scripts && \
    npm rebuild bcrypt --build-from-source

FROM node:18-alpine

RUN apk add --no-cache python3 bash

WORKDIR /app
COPY --from=server-builder /app/server/node_modules ./server/node_modules
COPY server ./server
COPY --from=client-builder /app/client/dist ./server/public
COPY --from=client-builder /app/client/dist/index.html ./server/views/

# Create required directories
RUN mkdir -p ./server/public/user-avatars \
    ./server/public/background-images \
    ./server/private/attachments

WORKDIR /app/server

# Expose the port
EXPOSE 1337

# Use the start:prod script
CMD ["npm", "run", "start:prod"]
