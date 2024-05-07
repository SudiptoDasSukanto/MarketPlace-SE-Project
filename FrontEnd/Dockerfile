# Use an official Node.js image as a base
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy tailwind.config.js to the working directory
COPY tailwind.config.js ./

# Install create-vite-app globally
RUN npm install -g create-vite-app

# Create a new Vite React project named "my-react-app"
RUN create-vite-app codesamurai-client --template react

# Change working directory to the newly created project
WORKDIR /app/codesamurai-client


# Install Tailwind CSS
RUN npm install tailwindcss@latest postcss@latest autoprefixer@latest

# Initialize Tailwind CSS
RUN npx tailwindcss init -p

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
