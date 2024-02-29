FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .
COPY package-lock.json .

# Install dependencies with npm, ignoring peer dependency warnings
RUN npm install --legacy-peer-deps --omit=dev

# Copy the rest of the application code to the working directory
COPY . .

# Build your application (if needed)
RUN npm run build

# Specify the command to run your application
CMD [ "npm", "start" ]
