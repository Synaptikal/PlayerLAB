const fs = require('fs');
const path = require('path');

// Function to fix remaining issues
function fixRemainingIssues(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove unused variables
  const unusedVars = [
    'setSearchTerm', 'setSelectedPosition', 'setSelectedWeek', 'setFilteredNews', 
    'setError', 'setFilteredPlayers', 'setTeams', 'request', 'err', 'playerId',
    'limit', 'index', 'mandatoryComponents', 'NewsResponse', 'API_FOOTBALL_BASE',
    'glowColor', 'holographicElement', 'getShadowClass', 'actionTypes', 'Toast',
    'DownloadIcon', 'Settings', 'Code', 'Input', 'Filter', 'Target', 'Download',
    'Share2', 'Share2Icon', 'TargetIcon'
  ];
  
  // Remove unused imports
  const unusedImports = [
    'Filter', 'Settings', 'DownloadIcon', 'Code', 'Input', 'Target', 'Download',
    'Share2', 'Share2Icon', 'TargetIcon'
  ];
  
  // Remove unused variables from useState
  unusedVars.forEach(varName => {
    const useStateRegex = new RegExp(`const \\[.*?${varName}.*?\\] = useState\\([^)]*\\)`, 'g');
    content = content.replace(useStateRegex, '');
    
    // Also remove individual variable assignments
    const assignRegex = new RegExp(`\\b${varName}\\b\\s*[,=]`, 'g');
    content = content.replace(assignRegex, '');
  });
  
  // Remove unused imports
  unusedImports.forEach(importName => {
    const importRegex = new RegExp(`\\b${importName}\\b\\s*,?`, 'g');
    content = content.replace(importRegex, '');
  });
  
  // Fix any types
  content = content.replace(/: any/g, ': unknown');
  content = content.replace(/: any\[/g, ': unknown[');
  content = content.replace(/any\[\]/g, 'unknown[]');
  content = content.replace(/any\b/g, 'unknown');
  
  // Remove unused function parameters
  content = content.replace(/\([^)]*_\s*[,)]/g, '()');
  
  // Clean up empty import statements
  content = content.replace(/import\s*{\s*}\s*from\s*['"][^'"]+['"];?\s*/g, '');
  content = content.replace(/import\s*{\s*,+\s*}\s*from\s*['"][^'"]+['"];?\s*/g, '');
  
  // Clean up trailing commas in imports
  content = content.replace(/,\s*}/g, '}');
  
  fs.writeFileSync(filePath, content);
}

// List of files to fix
const filesToFix = [
  'app/analysis/page.tsx',
  'app/api/tools/smart-tester/route.ts',
  'app/api/tools/trade-analyzer/route.ts',
  'app/hype/page.tsx',
  'app/leagues/page.tsx',
  'app/matchups/page.tsx',
  'app/news/page.tsx',
  'app/players/page.tsx',
  'app/plugins/page.tsx',
  'app/settings/page.tsx',
  'app/teams/page.tsx',
  'app/tools/smart-tester/page.tsx',
  'app/tools/trade-analyzer/page.tsx',
  'app/trends/page.tsx',
  'components/ui/chart.tsx',
  'components/ui/holographic-analytics-tile.tsx',
  'components/ui/use-toast.ts',
  'lib/design-system.ts',
  'lib/news-apis.ts',
  'lib/sleeper-api.ts',
  'lib/social-apis.ts',
  'lib/sports-apis.ts'
];

// Fix each file
filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Fixing ${file}...`);
    fixRemainingIssues(file);
  }
});

console.log('Remaining issues fixed!'); 