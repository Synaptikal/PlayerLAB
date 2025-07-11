#!/bin/bash

# Quick save script - commits and pushes all changes immediately
echo "🔄 Quick saving to GitHub..."

# Add all changes
git add -A

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to save"
    exit 0
fi

# Commit with timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
git commit -m "Auto-save: $TIMESTAMP"

# Push to remote
git push

echo "✅ All changes saved to GitHub!"