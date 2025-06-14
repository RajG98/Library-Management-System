# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port for the React app
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
