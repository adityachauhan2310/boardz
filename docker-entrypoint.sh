#!/bin/sh
set -e

# Wait for postgres to be ready
echo "Waiting for PostgreSQL to be ready..."
until nc -z -v -w30 db 5432
do
  echo "Waiting for PostgreSQL connection..."
  sleep 5
done
echo "PostgreSQL is ready!"

# Initialize the database
echo "Initializing database..."
cd /app/server

# Create a temporary .env file with database configuration for initialization
cat > .env << EOL
DATABASE_URL=postgresql://admin:boardzdb2310@db/boardz
SECRET_KEY=7LC9MiW7WjdKK3k3XI15esDHvJdw9luoX6w/sP5t3XI=
EOL

node db/init.js || echo "Database might already be initialized"

# Start the application
echo "Starting the application..."
node app.js --prod
