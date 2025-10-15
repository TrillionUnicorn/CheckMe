# Production Dockerfile for SvelteKit frontend

FROM node:20-alpine as builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine
WORKDIR /app

# Copy built app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
RUN npm ci --production

# Expose port
EXPOSE 5173

# Start app
CMD ["node", "build"]

