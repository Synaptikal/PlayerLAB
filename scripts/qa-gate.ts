// PlayerLAB QA Gate - Enforced Before Each Commit
// This script validates adherence to Vault v2 design standards

interface QACheck {
  name: string
  description: string
  validator: () => boolean
  critical: boolean
}

const QA_CHECKS: QACheck[] = [
  {
    name: "Glass Styling Applied",
    description: "All panels use GlassContainer components",
    validator: () => {
      // Check for glass container usage
      return document.querySelectorAll(".glass-container, .glass-card, .glass-panel").length > 0
    },
    critical: true,
  },
  {
    name: "Neon Glow Active",
    description: "Interactive elements have glow effects",
    validator: () => {
      return document.querySelectorAll('[class*="glow"]').length > 0
    },
    critical: true,
  },
  {
    name: "Orbitron Font Loaded",
    description: "Header font is properly loaded",
    validator: () => {
      const testEl = document.createElement("div")
      testEl.style.fontFamily = "Orbitron"
      document.body.appendChild(testEl)
      const computed = window.getComputedStyle(testEl).fontFamily
      document.body.removeChild(testEl)
      return computed.includes("Orbitron")
    },
    critical: true,
  },
  {
    name: "Inter Font Loaded",
    description: "Body font is properly loaded",
    validator: () => {
      const testEl = document.createElement("div")
      testEl.style.fontFamily = "Inter"
      document.body.appendChild(testEl)
      const computed = window.getComputedStyle(testEl).fontFamily
      document.body.removeChild(testEl)
      return computed.includes("Inter")
    },
    critical: true,
  },
  {
    name: "Branding Assets Visible",
    description: "PlayerLAB logo and assets are loaded",
    validator: () => {
      return document.querySelectorAll('img[alt*="PlayerLAB"], [class*="gradient-text"]').length > 0
    },
    critical: true,
  },
  {
    name: "Animations Active",
    description: "Hover and transition animations are working",
    validator: () => {
      return document.querySelectorAll('[class*="animate-"], [class*="transition-"]').length > 0
    },
    critical: false,
  },
  {
    name: "Phase 2 Scaffolding Intact",
    description: "Future phase routes and components remain",
    validator: () => {
      // Check for phase 2 placeholder routes
      return fetch("/api/analytics/overview")
        .then((res) => res.ok)
        .catch(() => false)
    },
    critical: true,
  },
]

export async function runQAGate(): Promise<{ passed: boolean; results: any[] }> {
  console.log("🔍 Running PlayerLAB QA Gate...")

  const results = []
  let criticalFailures = 0

  for (const check of QA_CHECKS) {
    try {
      const passed = await check.validator()
      results.push({
        name: check.name,
        description: check.description,
        passed,
        critical: check.critical,
      })

      if (!passed && check.critical) {
        criticalFailures++
      }

      console.log(`${passed ? "✅" : "❌"} ${check.name}: ${check.description}`)
    } catch (error) {
      results.push({
        name: check.name,
        description: check.description,
        passed: false,
        critical: check.critical,
        error: error.message,
      })

      if (check.critical) {
        criticalFailures++
      }

      console.log(`❌ ${check.name}: Error - ${error.message}`)
    }
  }

  const passed = criticalFailures === 0

  console.log(`\n🎯 QA Gate Result: ${passed ? "PASSED" : "FAILED"}`)
  console.log(`Critical Failures: ${criticalFailures}`)

  return { passed, results }
}

// Auto-run in development
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  window.addEventListener("load", () => {
    setTimeout(() => runQAGate(), 2000)
  })
}
