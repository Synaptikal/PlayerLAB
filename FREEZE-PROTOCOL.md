# PLAYERLAB FREEZE PREVENTION & EMERGENCY RECOVERY PROTOCOL

## 🚨 If the System Freezes or Becomes Unresponsive

### 1. Quick Health Check (Recommended First Step)
- Open PowerShell in the project directory.
- Run:
  ```
  npm run health-check
  ```
- This will:
  - Kill problematic Node/Next/NPM processes
  - Clear Next.js cache
  - Attempt to recover automatically

### 2. Full Emergency Recovery (If Quick Check Fails)
- Open PowerShell in the project directory.
- Run:
  ```
  npm run emergency-recovery
  ```
- This will:
  - Kill all Node/Next/NPM processes
  - Clear Next.js and npm cache
  - Rebuild the project

### 3. Batch File Fallback (If PowerShell Fails)
- Open Command Prompt (cmd.exe) in the project directory.
- Run:
  ```
  scripts\emergency-recovery.bat
  ```
- This will perform the same steps as above using Windows batch commands.

### 4. Manual Recovery (Last Resort)
- Open PowerShell or Command Prompt.
- Run these commands one by one:
  ```
  Get-Process | Where-Object {$_.ProcessName -like "*node*" -or $_.ProcessName -like "*npm*" -or $_.ProcessName -like "*next*"} | Stop-Process -Force -ErrorAction SilentlyContinue
  Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
  npm cache clean --force
  npm run build
  ```

---

## 🛡️ Prevention Best Practices
- Run health checks regularly: `npm run health-check`
- Avoid running multiple dev/build processes at once
- Keep dependencies up to date
- Restart your terminal after major errors
- Document any recurring freeze patterns for future improvement

---

## 📋 Print & Post This Protocol Near Your Workstation!
- For help, contact the PlayerLAB dev team or refer to this file in the project root. 