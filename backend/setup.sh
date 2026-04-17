#!/bin/bash

# AI Resume Optimizer Backend Quick Start Script

set -e

echo "=== AI Resume Optimizer Backend Setup ==="

# Check Python version
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "✓ Python version: $python_version"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

echo "✓ Virtual environment activated"

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt
echo "✓ Dependencies installed"

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "⚠ Please edit .env with your configuration"
fi

# Create MongoDB data directory
mkdir -p data/mongo

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Edit .env with your Gemini API key and database URLs"
echo "2. Start MongoDB: mongod --dbpath ./data/mongo"
echo "3. Start Redis: redis-server"
echo "4. Run the server: uvicorn app.main:app --reload"
echo ""
