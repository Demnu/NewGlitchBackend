#!/bin/bash

# Update and restart the backend service
echo "Updating and restarting the backend service..."

# Navigate to the backend git repository directory
cd NewGlitchBackend/ || exit

# Pull the latest changes from Git for the backend
git pull

# Generate api client for frontend
npm run generate-apiClient

# Stop the running docker containers, and remove containers, networks, volumes, and images created by `up`.
docker-compose down

# Build the Docker images according to your docker-compose.yml or Dockerfile
docker-compose build

# Start up the Docker containers in detached mode
docker-compose up -d

# Update and restart the front-end service
echo "Updating and restarting the front-end service..."

# Navigate to the front-end app directory
cd ../GlitchFrontEndTypescript || exit

# Stop the PM2 process with the name "glitchFrontEndDev"
pm2 stop glitchFrontEndDev

# Delete the PM2 process
pm2 delete glitchFrontEndDev

# Pull the latest changes from Git for the front-end
git pull

npm install

# Start the application using PM2 and the npm 'dev' script
pm2 start npm --name "glitchFrontEndDev" -- run dev

echo "Update and restart process completed."
