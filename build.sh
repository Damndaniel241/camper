#!/bin/bash

# Build React app
npm run build

# Create Netlify build directory (if it doesn't exist)
mkdir -p netlify_build

# Copy React static files (excluding Django files)
shopt -s extglob
cp -r build/!(*.py|*.pyc|manage.py|requirements.txt|api|core/*) netlify_build/  # Replace 'myproject' with your Django project name

# (Optional) Remove unnecessary directories
rm -rf netlify_build/__pycache__
