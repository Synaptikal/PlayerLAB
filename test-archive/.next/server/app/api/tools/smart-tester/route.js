"use strict";(()=>{var e={};e.id=182,e.ids=[182],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6573:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>y,patchFetch:()=>h,requestAsyncStorage:()=>l,routeModule:()=>u,serverHooks:()=>m,staticGenerationAsyncStorage:()=>g});var s={};r.r(s),r.d(s,{GET:()=>d,POST:()=>c});var o=r(9303),n=r(8716),i=r(670),a=r(7070);let p=async e=>{let{description:t,framework:r,type:s,component:o,features:n}=e;await new Promise(e=>setTimeout(e,1e3));let i=[];"jest"===r&&"unit"===s&&i.push({id:`test-${Date.now()}-1`,name:`${o||"Component"} Rendering Test`,description:`Test that ${o||"component"} renders correctly`,type:s,framework:r,code:`import { render, screen } from '@testing-library/react'
import ${o||"Component"} from '../components/${o||"Component"}'

describe('${o||"Component"}', () => {
  it('renders correctly', () => {
    const mockProps = {
      // Add mock props based on description
    }
    
    render(<${o||"Component"} {...mockProps} />)
    
    expect(screen.getByTestId('${o?.toLowerCase()||"component"}')).toBeInTheDocument()
  })
})`,status:"pending",bugs:[]}),"playwright"===r&&"integration"===s&&i.push({id:`test-${Date.now()}-2`,name:`${o||"Feature"} Integration Test`,description:`Test ${o||"feature"} integration with other components`,type:s,framework:r,code:`import { test, expect } from '@playwright/test'

test('${o||"feature"} integration', async ({ page }) => {
  await page.goto('/${o?.toLowerCase()||"page"}')
  
  // Test user interactions
  await page.click('[data-testid="${o?.toLowerCase()||"button"}"]')
  
  // Verify expected behavior
  await expect(page.locator('[data-testid="result"]')).toBeVisible()
})`,status:"pending",bugs:[]}),"cypress"===r&&"e2e"===s&&i.push({id:`test-${Date.now()}-3`,name:`${o||"Application"} End-to-End Test`,description:`Test complete user flow for ${o||"application"}`,type:s,framework:r,code:`describe('${o||"Application"} E2E', () => {
  it('completes user flow', () => {
    cy.visit('/')
    
    // Navigate through the application
    cy.get('[data-testid="nav-${o?.toLowerCase()||"link"}"]').click()
    
    // Perform actions
    cy.get('[data-testid="action-button"]').click()
    
    // Verify final state
    cy.get('[data-testid="success-message"]').should('be.visible')
  })
})`,status:"pending",bugs:[]});let a=[];return(t.toLowerCase().includes("drag")||t.toLowerCase().includes("drop"))&&a.push({id:`bug-${Date.now()}-1`,severity:"medium",description:"Drag and drop may not be accessible via keyboard",line:8,suggestion:"Add keyboard navigation support for drag and drop functionality"}),(t.toLowerCase().includes("api")||t.toLowerCase().includes("fetch"))&&a.push({id:`bug-${Date.now()}-2`,severity:"high",description:"Missing error handling for API calls",line:12,suggestion:"Add try-catch blocks and user-friendly error messages"}),a.length>0&&i.length>0&&(i[0].bugs=a),i};async function c(e){try{let t=await e.json();if(!t.description)return a.NextResponse.json({error:"Test description is required"},{status:400});if(!t.framework||!["jest","playwright","cypress"].includes(t.framework))return a.NextResponse.json({error:"Valid framework is required"},{status:400});if(!t.type||!["unit","integration","e2e"].includes(t.type))return a.NextResponse.json({error:"Valid test type is required"},{status:400});let r=await p(t);return a.NextResponse.json({success:!0,tests:r,message:`Generated ${r.length} test(s) for ${t.framework} ${t.type} testing`})}catch(e){return console.error("Smart Tester API Error:",e),a.NextResponse.json({error:"Failed to generate tests"},{status:500})}}async function d(){return a.NextResponse.json({message:"Smart Tester API is running",version:"1.0.0",features:["AI-powered test generation","Multi-framework support (Jest, Playwright, Cypress)","Bug detection and suggestions","Test export functionality"]})}let u=new o.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/tools/smart-tester/route",pathname:"/api/tools/smart-tester",filename:"route",bundlePath:"app/api/tools/smart-tester/route"},resolvedPagePath:"C:\\PlayerLAB\\app\\api\\tools\\smart-tester\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:g,serverHooks:m}=u,y="/api/tools/smart-tester/route";function h(){return(0,i.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:g})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[276,972],()=>r(6573));module.exports=s})();