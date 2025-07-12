"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Copy, CheckCircle, AlertTriangle, Bug,  Eye, RefreshCw, Sparkles, TestTube, FileCode, PlayCircle } from 'lucide-react';import { useState } from "react"

interface TestCase {
  id: string
  name: string
  description: string
  type: "unit" | "integration" | "e2e"
  framework: "jest" | "playwright" | "cypress"
  code: string
  status: "pending" | "running" | "passed" | "failed"
  bugs: Bug[]
}

interface Bug {
  id: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
  line: number
  suggestion: string
}

const testFrameworks = [
  { value: "jest", label: "Jest", icon: TestTube },
  { value: "playwright", label: "Playwright", icon: PlayCircle },
  { value: "cypress", label: "Cypress", icon: FileCode }
]

const testTypes = [
  { value: "unit", label: "Unit Test", description: "Test individual components" },
  { value: "integration", label: "Integration Test", description: "Test component interactions" },
  { value: "e2e", label: "End-to-End Test", description: "Test complete user flows" }
]

export default function SmartTesterPage() {
  const [selectedFramework, setSelectedFramework] = useState("jest")
  const [selectedType, setSelectedType] = useState("unit")
  const [testDescription, setTestDescription] = useState("")
  const [generatedTests, setGeneratedTests] = useState<TestCase[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const mockGeneratedTests: TestCase[] = [
    {
      id: "1",
      name: "Dashboard Widget Rendering",
      description: "Test that dashboard widgets render correctly with data",
      type: "unit",
      framework: "jest",
      code: `import { render, screen } from '@testing-library/react'
import DashboardWidget from '../components/DashboardWidget'

describe('DashboardWidget', () => {
  it('renders widget with correct data', () => {
    const mockData = {
      title: 'Team Performance',
      data: { wins: 8, losses: 3 }
    }
    
    render(<DashboardWidget data={mockData} />)
    
    expect(screen.getByText('Team Performance')).toBeInTheDocument()
    expect(screen.getByText('8-3')).toBeInTheDocument()
  })
})`,
      status: "passed",
      bugs: []
    },
    {
      id: "2",
      name: "Drag and Drop Functionality",
      description: "Test widget reordering with drag and drop",
      type: "integration",
      framework: "playwright",
      code: `import { test, expect } from '@playwright/test'

test('widget drag and drop', async ({ page }) => {
  await page.goto('/dashboard')
  
  const firstWidget = page.locator('[data-testid="widget-1"]')
  const secondWidget = page.locator('[data-testid="widget-2"]')
  
  await firstWidget.dragTo(secondWidget)
  
  // Verify order changed
  const widgets = page.locator('[data-testid^="widget-"]')
  await expect(widgets.nth(0)).toHaveAttribute('data-testid', 'widget-2')
})`,
      status: "running",
      bugs: [
        {
          id: "bug-1",
          severity: "medium",
          description: "Drag handle not accessible via keyboard",
          line: 8,
          suggestion: "Add keyboard navigation support for drag and drop"
        }
      ]
    },
    {
      id: "3",
      name: "API Data Loading",
      description: "Test API integration and data fetching",
      type: "e2e",
      framework: "cypress",
      code: `describe('API Integration', () => {
  it('loads dashboard data from API', () => {
    cy.intercept('GET', '/api/dashboard', {
      statusCode: 200,
      body: {
        widgets: [
          { id: 1, title: 'Team Performance' }
        ]
      }
    }).as('getDashboard')
    
    cy.visit('/dashboard')
    cy.wait('@getDashboard')
    
    cy.get('[data-testid="widget-1"]')
      .should('contain', 'Team Performance')
  })
})`,
      status: "failed",
      bugs: [
        {
          id: "bug-2",
          severity: "high",
          description: "API endpoint returns 500 error",
          line: 12,
          suggestion: "Check server configuration and database connection"
        },
        {
          id: "bug-3",
          severity: "low",
          description: "Missing error handling for network failures",
          line: 15,
          suggestion: "Add try-catch blocks and user-friendly error messages"
        }
      ]
    }
  ]

  const generateTests = async () => {
    setIsGenerating(true)
    // Simulate AI test generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGeneratedTests(mockGeneratedTests)
    setIsGenerating(false)
  }

  const runTests = async () => {
    setIsRunning(true)
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsRunning(false)
  }

  const exportTests = (framework: string) => {
    const tests = generatedTests.filter(test => test.framework === framework)
    const code = tests.map(test => test.code).join('\n\n')
    
    const blob = new Blob([code], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tests.${framework === 'jest' ? 'js' : 'ts'}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed": return "text-green-400"
      case "failed": return "text-red-400"
      case "running": return "text-yellow-400"
      default: return "text-slate-400"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500"
      case "high": return "text-orange-500"
      case "medium": return "text-yellow-500"
      case "low": return "text-blue-500"
      default: return "text-slate-400"
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 pt-32 pb-16 px-6">
        {/* Header */}
        <motion.div
          className="max-w-7xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
                Smart Tester
              </h1>
              <p className="text-slate-300 text-lg">
                AI-powered test generation with intelligent bug detection
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="backdrop-blur-xl bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30"
                onClick={runTests}
                disabled={isRunning || generatedTests.length === 0}
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? "Running..." : "Run Tests"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Test Generation Form */}
        <motion.section
          className="max-w-7xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-orbitron font-semibold text-white mb-4">
                  Generate Tests
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                      Test Framework
                    </label>
                    <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                      <SelectTrigger className="backdrop-blur-xl bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select framework" />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-xl bg-slate-900 border-cyan-400/30">
                        {testFrameworks.map((framework) => (
                          <SelectItem key={framework.value} value={framework.value}>
                            <div className="flex items-center gap-2">
                              <framework.icon className="w-4 h-4" />
                              {framework.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                      Test Type
                    </label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="backdrop-blur-xl bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="backdrop-blur-xl bg-slate-900 border-cyan-400/30">
                        {testTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-slate-400">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                      Test Description
                    </label>
                    <Textarea
                      placeholder="Describe what you want to test..."
                      value={testDescription}
                      onChange={(e) => setTestDescription(e.target.value)}
                      className="backdrop-blur-xl bg-white/5 border-white/20 text-white placeholder:text-slate-400 min-h-32"
                    />
                  </div>
                  <Button
                    onClick={generateTests}
                    disabled={isGenerating || !testDescription}
                    className="backdrop-blur-xl bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30 w-full"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isGenerating ? "Generating..." : "Generate Tests"}
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-orbitron font-semibold text-white mb-4">
                  Export Options
                </h3>
                <div className="space-y-4">
                  {testFrameworks.map((framework) => (
                    <Button
                      key={framework.value}
                      variant="outline"
                      onClick={() => exportTests(framework.value)}
                      disabled={generatedTests.filter(t => t.framework === framework.value).length === 0}
                      className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-cyan-400/20 w-full justify-start"
                    >
                      <framework.icon className="w-4 h-4 mr-2" />
                      Export {framework.label} Tests
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Generated Tests */}
        {generatedTests.length > 0 && (
          <motion.section
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6">
              {generatedTests.map((test) => (
                <Card key={test.id} className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-orbitron font-semibold text-white">
                          {test.name}
                        </h3>
                        <div className={`flex items-center gap-1 ${getStatusColor(test.status)}`}>
                          {test.status === "passed" && <CheckCircle className="w-4 h-4" />}
                          {test.status === "failed" && <AlertTriangle className="w-4 h-4" />}
                          {test.status === "running" && <RefreshCw className="w-4 h-4 animate-spin" />}
                          <span className="text-sm font-medium capitalize">{test.status}</span>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm">{test.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-slate-400 capitalize">{test.type} Test</span>
                        <span className="text-xs text-slate-400 capitalize">{test.framework}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="backdrop-blur-xl bg-white/5 hover:bg-cyan-400/20"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="backdrop-blur-xl bg-white/5 hover:bg-cyan-400/20"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Preview */}
                  <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-300">Test </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="backdrop-blur-xl bg-white/5 hover:bg-cyan-400/20"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <pre className="text-xs text-slate-300 overflow-x-auto">
                      <code>{test.code}</code>
                    </pre>
                  </div>

                  {/* Bug Detection */}
                  {test.bugs.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                        <Bug className="w-4 h-4 text-red-400" />
                        Bug Detection ({test.bugs.length})
                      </h4>
                      <div className="space-y-2">
                        {test.bugs.map((bug) => (
                          <div key={bug.id} className="bg-red-400/10 border border-red-400/30 rounded-lg p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-xs font-medium ${getSeverityColor(bug.severity)}`}>
                                    {bug.severity.toUpperCase()}
                                  </span>
                                  <span className="text-xs text-slate-400">Line {bug.line}</span>
                                </div>
                                <p className="text-sm text-white mb-2">{bug.description}</p>
                                <p className="text-xs text-slate-300">
                                  <strong>Suggestion:</strong> {bug.suggestion}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
} 