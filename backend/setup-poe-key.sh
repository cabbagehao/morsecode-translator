#!/bin/bash

# Setup script for POE API Key in Cloudflare Worker
# Usage: ./setup-poe-key.sh

echo "Setting up POE API Key for Cloudflare Worker..."

# The POE API Key from the user's request
POE_API_KEY="twIl5oH_lehmQO9mAWoOl5iTyxczFNq8tU6yzfiJ3K0"

# Set the secret in Cloudflare Worker
echo "Setting POE_API_KEY secret..."
echo "$POE_API_KEY" | wrangler secret put POE_API_KEY

echo "POE API Key has been set successfully!"
echo "You can now deploy the worker with: npm run deploy"