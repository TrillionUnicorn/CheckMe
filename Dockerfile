# Multi-stage build for production-ready CheckMe application with Bun

# Stage 1: Build
FROM oven/bun:1.1.38-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* bunfig.toml* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Stage 2: Production
FROM oven/bun:1.1.38-alpine AS production

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install production dependencies only
RUN bun install --production --frozen-lockfile

# Copy built application from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun -e "fetch('http://localhost:3000/health').then(r => process.exit(r.ok ? 0 : 1))"

# Start the application
CMD ["bun", "run", "build/index.js"]

