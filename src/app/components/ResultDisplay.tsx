
'use client';

import Image from 'next/image';
import type { ProductInfo, SdgFactor } from '@/app/api/product-info/route'; 
import { Leaf, TriangleAlert, ShieldX, Scan, Package, Globe, Award, Info, Search } from 'lucide-react';

const scoreDetails = {
  green: { label: 'Good Choice', Icon: Leaf, gradient: 'from-green-400 to-emerald-600', shadow: 'shadow-green-500/50' },
  yellow: { label: 'Could Be Better', Icon: TriangleAlert, gradient: 'from-yellow-400 to-amber-600', shadow: 'shadow-yellow-500/50' },
  red: { label: 'Poor Choice', Icon: ShieldX, gradient: 'from-red-500 to-rose-700', shadow: 'shadow-red-500/50' },
  gray: { label: 'Data Incomplete', Icon: Info, gradient: 'from-slate-500 to-slate-700', shadow: 'shadow-slate-500/50' }
};


const sdgScoreDetails = {
    good: { color: 'text-emerald-400', ring: 'ring-emerald-500/30' },
    average: { color: 'text-yellow-400', ring: 'ring-yellow-500/30' },
    bad: { color: 'text-rose-400', ring: 'ring-rose-500/30' },
    unknown: { color: 'text-slate-400', ring: 'ring-slate-500/30' }
};

const factorIcons = {
    packaging: Package,
    ingredientOrigins: Globe,
    productionMethod: Award,
};

const nutrientLevelClasses = {
    low: 'bg-green-500/20 text-green-300 border-green-500/30',
    moderate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    high: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';


function SdgFactorDisplay({ factor, name, title }: { factor: SdgFactor, name: keyof typeof factorIcons, title: string }) {
    const details = sdgScoreDetails[factor.score];
    const Icon = factorIcons[name];

    return (
        <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg ring-1 ring-slate-700">
            <Icon className={`w-6 h-6 mt-1 flex-shrink-0 ${details.color}`} />
            <div>
                <h4 className="font-bold text-white">{title}</h4>
                <p className={`text-sm ${details.color}`}>{factor.details}</p>
            </div>
        </div>
    );
}


export default function ResultDisplay({ data, onScanAgain }: { data: ProductInfo; onScanAgain: () => void; }) {
  const details = scoreDetails[data.color];

  const handleFindAlternatives = () => {
    alert('Feature coming soon: Searching for more sustainable alternatives!');
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/50 backdrop-blur-xl border border-emerald-400/20 rounded-2xl shadow-2xl shadow-emerald-900/50 overflow-hidden animate-fade-in">
    
        <div className={`relative p-6 text-white bg-gradient-to-br ${details.gradient} shadow-lg ${details.shadow}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <details.Icon className="w-12 h-12" />
                    <div>
                        <p className="font-bold text-2xl">{details.label}</p>
                        <p className="opacity-80">Sustainability Overview</p>
                    </div>
                </div>
                <div className="text-4xl font-black opacity-80 border-2 border-white/20 rounded-full w-16 h-16 flex items-center justify-center bg-slate-800/50">
                  {data.ecoScoreGrade?.toUpperCase() ?? "N/A" }
                </div>
            </div>
        </div>

        <div className="p-6 space-y-6">
            
          
            <div className="text-center">
                {data.imageUrl && (
                    <Image
                        src={data.imageUrl}
                        alt={data.productName || 'Product'}
                        width={128}
                        height={128}
                        className="rounded-xl object-contain mx-auto mb-4 border-4 border-slate-700 bg-white shadow-xl"
                    />
                )}
                <h1 className="text-3xl font-bold text-white">{data.productName}</h1>
                <p className="text-lg text-slate-400">{data.brand}</p>
            </div>
            
            
            <div>
                <h3 className="text-lg font-semibold text-emerald-300 mb-3">Sustainability Breakdown</h3>
                <div className="space-y-3">
                    {data.sdg12Info ? (
                        <>
                            <SdgFactorDisplay factor={data.sdg12Info.packaging} name="packaging" title="Packaging" />
                            <SdgFactorDisplay factor={data.sdg12Info.ingredientOrigins} name="ingredientOrigins" title="Ingredient Origins" />
                            <SdgFactorDisplay factor={data.sdg12Info.productionMethod} name="productionMethod" title="Production Method" />
                        </>
                    ) : (
                        <div className="p-4 text-center bg-slate-800/50 rounded-lg ring-1 ring-slate-700">
                          <p className="text-slate-400">Detailed sustainability information is not available for this product.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* SDG 12 CHANGE: Turn missing data into an educational opportunity and a call to action. */}
            {data.color === 'gray' && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                    <h3 className="font-bold text-blue-300">Help Improve Transparency!</h3>
                    <p className="text-blue-400 mt-1 text-sm">
                        This product has incomplete data. You can help by contributing photos and information on {' '}
                        <a href={`https://world.openfoodfacts.org/product/${data.barcode}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">
                            Open Food Facts
                        </a>.
                    </p>
                </div>
            )}

            {/* Nutrition & Allergens are still important for a holistic view */}
            {data.nutrientLevels && (
              <div>
                <h3 className="text-lg font-semibold text-emerald-300">Health Snapshot</h3>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {Object.entries(data.nutrientLevels).map(([key, value]) => (
                    <span key={key} className={`px-3 py-1 text-sm font-semibold rounded-full border ${nutrientLevelClasses[value] || 'bg-gray-500/20'}`}>
                        {capitalize(key.replace(/_/g, ' '))}
                    </span>
                    ))}
                </div>
              </div>
            )}
            
            {data.allergens && data.allergens.length > 0 && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                    <h3 className="font-bold text-rose-300">Allergen Alert</h3>
                    <p className="text-rose-400 mt-1">Contains: {data.allergens.map(a => capitalize(a.replace('en:', ''))).join(', ')}</p>
                </div>
            )}

            {/* SDG 12 CHANGE: The action buttons are now more aligned with consumer empowerment. */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-700/50">
                <button onClick={onScanAgain} className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500 text-slate-900 font-bold rounded-lg hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105">
                    <Scan className="w-5 h-5"/>
                    Scan Another
                </button>
                <button onClick={handleFindAlternatives} className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-colors">
                    <Search className="w-5 h-5"/>
                    Find Alternatives
                </button>
            </div>
        </div>
    </div>
  );
}