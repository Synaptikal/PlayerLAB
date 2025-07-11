#!/bin/bash

# Quick save script - commits and pushes all changes immediately to MAIN branch
echo "🔄 Quick saving to GitHub main branch..."

# Make sure we're on main branch
git checkout main

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

# Push to main branch
git push origin main

echo "✅ All changes saved to GitHub main branch!"