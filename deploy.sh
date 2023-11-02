#!/bin/bash

# Navigate to your git repository directory
#cd /path/to/your/git/repo

# Pull the latest changes from Git
git pull origin master

# Stop the running docker containers and remove containers, networks, volumes, and images created by `up`.
docker-compose down

# Build the Docker images according to your docker-compose.yml or Dockerfile
docker-compose build

# Start up the Docker containers in detached mode
docker-compose up -d

# Note: Make sure that your docker-compose.yml file is in the git repository directory
# or update the paths in the script accordingly.
