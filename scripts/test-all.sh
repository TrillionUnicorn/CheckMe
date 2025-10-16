#!/bin/bash

# CheckMe - Complete Testing Script
# This script runs all tests and checks for issues

set -e

echo "🧪 CheckMe Complete Testing Suite"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

print_info() {
  echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
  print_error "Bun is not installed"
  print_info "Install Bun: curl -fsSL https://bun.sh/install | bash"
  exit 1
fi

print_success "Bun is installed: $(bun --version)"
echo ""

# Install dependencies
print_info "Installing dependencies..."
bun install
print_success "Dependencies installed"
echo ""

# Type checking
print_info "Running type check..."
if bun run check; then
  print_success "Type check passed"
else
  print_error "Type check failed"
  exit 1
fi
echo ""

# Linting
print_info "Running linter..."
if bun run lint; then
  print_success "Linting passed"
else
  print_warning "Linting has warnings (continuing...)"
fi
echo ""

# Build test
print_info "Testing build..."
if bun run build; then
  print_success "Build successful"
else
  print_error "Build failed"
  exit 1
fi
echo ""

# Install Playwright browsers
print_info "Installing Playwright browsers..."
bunx playwright install
print_success "Playwright browsers installed"
echo ""

# Run Playwright tests
print_info "Running Playwright tests..."
if bun test; then
  print_success "All Playwright tests passed"
else
  print_error "Some Playwright tests failed"
  print_info "Check test results in playwright-report/"
  exit 1
fi
echo ""

# Generate test report
print_info "Generating test report..."
bunx playwright show-report
echo ""

# Check bundle size
print_info "Checking bundle size..."
BUILD_SIZE=$(du -sh build | cut -f1)
print_info "Build size: $BUILD_SIZE"
echo ""

# Summary
echo "=================================="
print_success "All tests completed successfully!"
echo "=================================="
echo ""
echo "Next steps:"
echo "  1. Review test report: bunx playwright show-report"
echo "  2. Check build output in build/"
echo "  3. Run dev server: bun run dev"
echo "  4. Create PR for changes"
echo ""

