

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// SDG 12 CHANGE: New icons to represent the breakdown feature
import { ArrowRight, Leaf, Package, Globe, Award } from 'lucide-react';
import { useRouter } from "next/navigation";


const AuroraBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
    <div
      className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2
                 bg-radial-gradient from-emerald-950/50 to-slate-950"
    />
  </div>
);


const AnimatedPhoneMockup = () => (
  <div className="relative w-80 h-[580px] bg-slate-800/80 backdrop-blur-xl border border-emerald-400/20 rounded-4xl shadow-2xl shadow-emerald-900/50">
    <div className="absolute inset-1.5 bg-slate-950 rounded-3xl overflow-hidden p-4 flex flex-col items-center">
       <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold text-emerald-400">EcoScan</h2>
            <p className="text-slate-400 text-center px-4">See the full story behind the barcode.</p>
            <div className="w-48 h-48 mt-4 relative">
                <Leaf className="w-full h-full text-emerald-500/30"/>
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_15px_2px_rgba(52,211,153,0.7)] animate-scan-vertical" />
            </div>
            <p className="mt-4 text-xs text-slate-500">Point at any barcode</p>
       </div>
    </div>
  </div>
);


export default function LandingPage() {
  const router = useRouter();

  const handleStartScanning = () => {
    router.push("/scan");
  };
  
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 overflow-x-hidden">
      <AuroraBackground />

      <header className="fixed top-0 left-0 w-full p-4 z-50">
        <nav className="container mx-auto flex justify-between items-center bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-2">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-bold">EcoScan</span>
          </div>
          <Button 
            onClick={handleStartScanning} 
            className="bg-emerald-500 text-slate-900 font-bold hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:scale-105"
          >
            Start Scanning <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 pt-32">
    
        <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              The Story is in the Barcode.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0">
              {/* SDG 12 CHANGE: Updated tagline to reflect deeper insights */}
              Go beyond a simple score. Uncover the real-world impact of any product—from its packaging to its origins—with a single, powerful scan.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              <Button 
                onClick={handleStartScanning}
                size="lg" 
                className="bg-emerald-500 text-slate-900 font-bold text-lg px-8 py-6 rounded-full hover:bg-emerald-400 shadow-2xl shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105"
              >
                Uncover the Truth
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex items-center justify-center">
            <AnimatedPhoneMockup />
          </div>
        </section>


        <section className="py-24 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">One Scan. Total Clarity.</h2>
            <p className="mt-4 text-lg text-slate-400">We translate complex data into a simple, actionable report.</p>
          </div>
          {/* SDG 12 CHANGE: The feature cards are now updated to reflect the new core features. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/50 border-emerald-400/20 shadow-2xl shadow-emerald-900/30 hover:border-emerald-400/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-emerald-900/50 border border-emerald-400/30 rounded-lg">
                  <Package className="w-8 h-8 text-emerald-400" />
                </div>
                <CardTitle className="text-2xl">Packaging Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">Instantly know if the packaging is recyclable, made from plastic, or uses sustainable materials. Fight waste before you even buy.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-emerald-400/20 shadow-2xl shadow-emerald-900/30 hover:border-emerald-400/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                 <div className="p-3 bg-emerald-900/50 border border-emerald-400/30 rounded-lg">
                  <Globe className="w-8 h-8 text-emerald-400" />
                </div>
                <CardTitle className="text-2xl">Ingredient Origins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">Discover where your food comes from. We assess the carbon footprint of transportation and champion locally sourced products.</p>
              </CardContent>
            </Card>
             <Card className="bg-slate-900/50 border-emerald-400/20 shadow-2xl shadow-emerald-900/30 hover:border-emerald-400/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                 <div className="p-3 bg-emerald-900/50 border border-emerald-400/30 rounded-lg">
                  <Award className="w-8 h-8 text-emerald-400" />
                </div>
                <CardTitle className="text-2xl">Production Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">See if a product holds meaningful certifications like Organic or Fair Trade, ensuring ethical and sustainable production practices.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="py-24">
            <Card className="bg-gradient-to-br from-emerald-900/60 to-slate-900/50 border-slate-700/50 p-8 md:p-12 text-center">
    
                <p className="text-2xl md:text-3xl font-medium italic text-white">"EcoScan showed me that a product's 'A' rating was hiding non-recyclable plastic. It's the detailed breakdown that changed everything. I finally feel in control."</p>
                <div className="flex items-center justify-center gap-4 mt-8">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>SG</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">Sanjay G</p>
                        <p className="text-sm text-slate-400">Conscious Consumer</p>
                    </div>
                </div>
            </Card>
        </section>

      </main>

      <footer className="border-t border-slate-800 mt-24 py-8">
        <div className="container mx-auto text-center text-slate-500">
          <p>© {new Date().getFullYear()} EcoScan. All Rights Reserved.</p>
          <p className="mt-2 text-xs">A project for UN Sustainable Development Goal 12: Responsible Consumption and Production.</p>
        </div>
      </footer>
    </div>
  );
}