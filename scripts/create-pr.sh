#!/bin/bash

# CheckMe - PR Creation Script
# This script helps create PRs for new features

set -e

echo "🔀 CheckMe PR Creation Tool"
echo "============================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  print_error "Not a git repository"
  exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
print_info "Current branch: $CURRENT_BRANCH"

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
  print_warning "You have uncommitted changes"
  echo ""
  read -p "Do you want to commit them? (y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    read -p "Enter commit message: " COMMIT_MSG
    git add .
    git commit -m "$COMMIT_MSG"
    print_success "Changes committed"
  else
    print_error "Please commit or stash your changes first"
    exit 1
  fi
fi

# Ask for PR details
echo ""
print_info "PR Details"
echo "----------"
read -p "PR Title: " PR_TITLE
read -p "PR Description: " PR_DESCRIPTION
read -p "Target branch (default: main): " TARGET_BRANCH
TARGET_BRANCH=${TARGET_BRANCH:-main}

# Push current branch
print_info "Pushing branch to remote..."
git push -u origin $CURRENT_BRANCH
print_success "Branch pushed"

# Create PR using GitHub CLI if available
if command -v gh &> /dev/null; then
  print_info "Creating PR using GitHub CLI..."
  gh pr create \
    --title "$PR_TITLE" \
    --body "$PR_DESCRIPTION" \
    --base $TARGET_BRANCH \
    --head $CURRENT_BRANCH
  print_success "PR created successfully!"
  
  # Open PR in browser
  gh pr view --web
else
  print_warning "GitHub CLI not installed"
  print_info "Install it: https://cli.github.com/"
  print_info "Or create PR manually at:"
  echo "https://github.com/TrillionUnicorn/CheckMe/compare/$TARGET_BRANCH...$CURRENT_BRANCH"
fi

echo ""
print_success "Done!"

