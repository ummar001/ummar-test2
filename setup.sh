#!/bin/sh

# Run npm install
npm install

# Create or update .env file with required environment variables
rm -rf .env
echo "NEXT_PUBLIC_AUTH_BACKEND=waycup" >> .env
echo "NEXT_PUBLIC_STORE_BACKEND=waycup" >> .env
echo "NEXT_PUBLIC_BANK_SETTINGS_BACKEND=waycup" >> .env
echo "NEXT_PUBLIC_DRINKS_BACKEND=waycup" >> .env
echo "NEXT_PUBLIC_EXTRAS_BACKEND=waycup" >> .env
echo "NEXT_PUBLIC_API_URL=https://dev.api.waycupapp.com" >> .env
echo "NEXT_PUBLIC_CLIENT_API_URL=https://dev.client.api.waycupapp.com" >> .env
echo "NEXT_PUBLIC_CLIENT_APP_URL=https://dev.app.client.waycupapp.com" >> .env
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env

echo "Setup complete!"