// src/app/api/product-info/route.ts
import { NextResponse } from 'next/server';

// --- NEW: Type definitions aligned with the frontend component ---

// Represents a single factor contributing to the sustainability score
export type SdgFactor = {
  score: 'good' | 'average' | 'bad' | 'unknown';
  details: string; // e.g., "Made from 100% recycled plastic" or "Packaging data is missing"
};

// The updated ProductInfo type our API will return
export interface ProductInfo {
  barcode: string;
  productName?: string;
  brand?: string;
  imageUrl?: string;
  ingredientsText?: string;
  allergens?: string[];
  
  // Overall score remains for the banner
  ecoScoreGrade?: string; 
  color: 'green' | 'yellow' | 'red' | 'gray';

  // The new detailed SDG 12 breakdown
  sdg12Info: {
    packaging: SdgFactor;
    ingredientOrigins: SdgFactor;
    productionMethod: SdgFactor;
  };
  
  // Nutrient levels remain for health context (related to SDG 3)
  nutrientLevels?: { [key: string]: 'low' | 'moderate' | 'high' };
}

// --- HELPER FUNCTIONS FOR SDG 12 ANALYSIS ---

/**
 * Cleans up label strings from the API (e.g., "en:organic" -> "Organic")
 */
const cleanLabel = (label: string): string => {
  return label.replace(/en:|fr:|es:/g, '').replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
};

/**
 * Analyzes the packaging data from the product object.
 * @param product The product data from Open Food Facts.
 * @returns An SdgFactor object for packaging.
 */
function analyzePackaging(product: any): SdgFactor {
  const packagingData = product.ecoscore_data?.adjustments?.packaging;
  if (!packagingData || packagingData.warning === 'packaging_data_missing') {
    return {
      score: 'unknown',
      details: 'Packaging information is not available for this product.'
    };
  }

  // A negative 'value' in adjustments indicates non-recyclable materials.
  if (packagingData.value < 0 || packagingData.non_recyclable_and_non_biodegradable_materials > 0) {
    return {
      score: 'bad',
      details: 'Contains non-recyclable or problematic materials.'
    };
  }

  // If data exists and has no negative penalties, we can assume it's at least average or good.
  return {
    score: 'good',
    details: 'Packaging materials appear to be recyclable or have a lower environmental impact.'
  };
}

/**
 * Analyzes the ingredient origin data from the product object.
 * @param product The product data from Open Food Facts.
 * @returns An SdgFactor object for ingredient origins.
 */
function analyzeOrigins(product: any): SdgFactor {
  const originData = product.ecoscore_data?.adjustments?.origins_of_ingredients;
  if (!originData || originData.warning === 'origins_are_100_percent_unknown') {
    return {
      score: 'unknown',
      details: 'The origin of the ingredients is unknown, which may hide a large transportation footprint.'
    };
  }
  
  const knownOrigins = originData.aggregated_origins
    ?.filter((o: any) => o.origin !== 'en:unknown')
    .map((o: any) => cleanLabel(o.origin))
    .join(', ');

  // A positive EPI score (value >= 0) is a good sign.
  if (originData.value >= 0) {
    return {
      score: 'good',
      details: `Ingredients are sourced from sustainable locations. Known origins: ${knownOrigins || 'N/A'}.`
    };
  }

  // This case should be covered by the 'unknown' warning but is a good fallback.
  return {
    score: 'bad',
    details: 'Ingredient origins have a negative environmental impact score.'
  };
}

/**
 * Analyzes the production method (labels) from the product object.
 * @param product The product data from Open Food Facts.
 * @returns An SdgFactor object for production methods.
 */
function analyzeProduction(product: any): SdgFactor {
  const productionData = product.ecoscore_data?.adjustments?.production_system;
  if (!productionData) {
    return {
      score: 'unknown',
      details: 'Production method information is unavailable.'
    };
  }
  
  if (productionData.labels && productionData.labels.length > 0) {
    const cleanedLabels = productionData.labels.map(cleanLabel).join(', ');
    return {
      score: 'good',
      details: `Certified with sustainable labels: ${cleanedLabels}.`
    };
  }

  if (productionData.warning === 'no_label') {
    return {
      score: 'average',
      details: 'This product does not carry any specific sustainability certifications.'
    };
  }

  return {
    score: 'unknown',
    details: 'Could not determine the production method.'
  };
}


// --- MAIN API ROUTE ---

export async function POST(req: Request) {
  try {
    const { barcode } = await req.json();

    if (!barcode) {
      return NextResponse.json({ error: 'Barcode is required' }, { status: 400 });
    }

    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,brands,quantity,image_front_url,ingredients_text,allergens_hierarchy,nutrient_levels,ecoscore_grade,ecoscore_data`);

    if (!response.ok) {
        if (response.status === 404) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 0 || !data.product) {
      return NextResponse.json({ error: 'Product not found in database' }, { status: 404 });
    }

    const { product } = data;
    const ecoScoreGrade = product.ecoscore_grade || 'unknown';

    let color: ProductInfo['color'] = 'gray';

    switch (ecoScoreGrade) {
      case 'a': case 'b':
        color = 'green';
        break;
      case 'c':
        color = 'yellow';
        break;
      case 'd': case 'e':
        color = 'red';
        break;
    }

    // --- Constructing the rich ProductInfo object ---
    const result: ProductInfo = {
      barcode,
      productName: product.product_name || 'Unknown Product',
      brand: product.brands || 'Unknown Brand',
      imageUrl: product.image_front_url,
      ingredientsText: product.ingredients_text,
      allergens: product.allergens_hierarchy || [],
      nutrientLevels: product.nutrient_levels,
      ecoScoreGrade: ecoScoreGrade.toUpperCase(),
      color,
      // Here we call our analysis functions to build the SDG 12 breakdown
      sdg12Info: {
        packaging: analyzePackaging(product),
        ingredientOrigins: analyzeOrigins(product),
        productionMethod: analyzeProduction(product),
      },
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}