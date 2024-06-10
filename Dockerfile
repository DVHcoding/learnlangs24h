FROM node:18-alpine
WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install
COPY . .

# Start your React app
CMD ["npm", "run", "dev"]