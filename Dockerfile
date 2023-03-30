# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory to /app
WORKDIR /src

# Copy the current directory contents into the container at /app
COPY . /src

# Install any needed packages specified in package.json
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=development

# Run the command to start the server
CMD ["npm", "start"]
