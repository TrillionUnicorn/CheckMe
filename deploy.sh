#!/bin/bash

# CheckMe Deployment Script
# This script automates the deployment of CheckMe to a VPS

set -e

echo "🚀 CheckMe Deployment Script"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}Please run as root or with sudo${NC}"
  exit 1
fi

# Function to print colored output
print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

print_info() {
  echo -e "${YELLOW}ℹ $1${NC}"
}

# Update system packages
print_info "Updating system packages..."
apt-get update -y
apt-get upgrade -y
print_success "System packages updated"

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
  print_info "Installing Docker..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sh get-docker.sh
  rm get-docker.sh
  systemctl enable docker
  systemctl start docker
  print_success "Docker installed"
else
  print_success "Docker already installed"
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
  print_info "Installing Docker Compose..."
  curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  print_success "Docker Compose installed"
else
  print_success "Docker Compose already installed"
fi

# Create application directory
APP_DIR="/opt/checkme"
if [ ! -d "$APP_DIR" ]; then
  print_info "Creating application directory..."
  mkdir -p $APP_DIR
  print_success "Application directory created"
fi

# Clone or update repository
if [ -d "$APP_DIR/.git" ]; then
  print_info "Updating repository..."
  cd $APP_DIR
  git pull origin main
  print_success "Repository updated"
else
  print_info "Cloning repository..."
  git clone https://github.com/TrillionUnicorn/CheckMe.git $APP_DIR
  cd $APP_DIR
  print_success "Repository cloned"
fi

# Create .env file if it doesn't exist
if [ ! -f "$APP_DIR/.env" ]; then
  print_info "Creating .env file..."
  cp $APP_DIR/.env.example $APP_DIR/.env
  print_info "Please edit $APP_DIR/.env with your configuration"
  print_info "Press Enter to continue after editing..."
  read
fi

# Build and start containers
print_info "Building and starting containers..."
cd $APP_DIR
docker-compose down
docker-compose build --no-cache
docker-compose up -d
print_success "Containers started"

# Wait for services to be ready
print_info "Waiting for services to be ready..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
  print_success "All services are running"
else
  print_error "Some services failed to start"
  docker-compose logs
  exit 1
fi

# Setup firewall
print_info "Configuring firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
print_success "Firewall configured"

# Setup automatic updates
print_info "Setting up automatic updates..."
cat > /etc/cron.daily/checkme-update << 'EOF'
#!/bin/bash
cd /opt/checkme
git pull origin main
docker-compose pull
docker-compose up -d
docker system prune -f
EOF
chmod +x /etc/cron.daily/checkme-update
print_success "Automatic updates configured"

# Display status
echo ""
echo "=============================="
print_success "Deployment completed successfully!"
echo "=============================="
echo ""
echo "Application URL: http://$(curl -s ifconfig.me)"
echo "Health Check: http://$(curl -s ifconfig.me)/health"
echo ""
echo "Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Restart: docker-compose restart"
echo "  - Stop: docker-compose down"
echo "  - Update: cd /opt/checkme && git pull && docker-compose up -d"
echo ""
print_info "Don't forget to:"
echo "  1. Configure your domain DNS to point to this server"
echo "  2. Set up SSL certificates (use Certbot)"
echo "  3. Review and update .env file"
echo "  4. Set up monitoring and backups"
echo ""

