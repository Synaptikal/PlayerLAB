"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-[#1D1D2F] text-white px-6 py-10">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center mb-16">
        <h1 className="text-2xl font-orbitron tracking-wide">PLAYERLAB</h1>
        <ul className="flex gap-6 text-sm font-medium text-muted">
          <li><a href="/vault">Vault</a></li>
          <li><a href="/tools/draft-kit">Draft Kit</a></li>
          <li><a href="/tools/trade-analyzer">Trade Analyzer</a></li>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Own the Draft. Win the League.</h2>
        <p className="text-muted mb-6 text-lg">AI-powered fantasy insights at your fingertips. Smarter trades. Better picks. Total domination.</p>
        <Button className="text-lg px-8 py-4 rounded-xl backdrop-blur bg-accent/30 border border-accent hover:bg-accent/60 transition">
          Launch Tools
        </Button>
      </section>

      {/* FEATURE TILES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Card className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-6 hover:scale-[1.02] transition">
          <h3 className="text-xl font-semibold mb-2">Draft Kit</h3>
          <p className="text-muted text-sm">Get instant recommendations and top picks based on your live roster.</p>
        </Card>
        <Card className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-6 hover:scale-[1.02] transition">
          <h3 className="text-xl font-semibold mb-2">Trade Analyzer</h3>
          <p className="text-muted text-sm">AI breakdowns of trade fairness, value shifts, and win probability.</p>
        </Card>
        <Card className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-6 hover:scale-[1.02] transition">
          <h3 className="text-xl font-semibold mb-2">Vault</h3>
          <p className="text-muted text-sm">Track your saved players, favorites, and custom watchlists in one place.</p>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-muted text-xs mt-24">
        &copy; {new Date().getFullYear()} PlayerLAB. Built with AI + Passion.
      </footer>
    </div>
  );
}
