# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json (if available) to the container's filesystem
COPY package*.json ./

# Install the application's dependencies inside the container
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Set the environment variable to development. This can be overridden during container run.
ENV NODE_ENV=development

# Expose the port the app runs on
EXPOSE 9000

# Define the command to run the app
CMD [ "npm", "run","dev" ]
