
# 🌿 EcoScan

![SDG 12](https://img.shields.io/badge/SDG-12-00A99D?style=for-the-badge&logo=sustainable-development-goals)
![Tech Stack](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Styling](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Deployment](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**See the true story behind the barcode. Go beyond a simple score and uncover the real-world impact of any product—from its packaging to its origins—with a single, powerful scan.**

---

## 🚀 Live Demo

**[Link](https://eco-scan-sand.vercel.app/)**


## 🎯 The Problem

In today's world, consumers want to make sustainable choices, but they face a significant **information gap**. Product labels are often vague or misleading ("greenwashing"), and even official ratings like an "Eco-Score" don't explain the *why* behind the grade. This lack of transparency makes it nearly impossible for the average person to practice responsible consumption, directly hindering the progress of **UN Sustainable Development Goal 12**.

## ✨ Our Solution

**EcoScan** is a mobile-first web application that bridges this gap. By scanning a product's barcode, users get an immediate, easy-to-understand, and actionable sustainability report.

Instead of just a single score, we provide a detailed **Sustainability Breakdown** across three key pillars:

1.  **📦 Packaging Analysis:** Is the packaging recyclable? Is it made from problematic materials like plastic?
2.  **🌍 Ingredient Origins:** Are the ingredients sourced locally, or do they have a large transportation footprint? Is the origin known at all?
3.  **🏆 Production Method:** Does the product carry meaningful certifications like Organic or Fair Trade that ensure ethical and sustainable practices?

EcoScan empowers consumers to make informed decisions at the exact moment they are needed most—in the store aisle.

## 🌟 Key Features

*   **Barcode Scanning:** A simple interface to begin the product analysis (simulated in the current version).
*   **Holistic Sustainability Report:** An overall score combined with a detailed breakdown of environmental factors.
*   **Health & Allergen Snapshot:** Provides crucial nutritional levels and allergen alerts for a complete product view.
*   **Transparency Call-to-Action:** If data is missing, we encourage users to contribute to the open-source community via a direct link to the Open Food Facts product page.
*   **Fully Responsive Design:** A beautiful and seamless experience on both mobile and desktop devices.

## 🛠️ Tech Stack

*   **Framework:** **Next.js 14** (App Router)
*   **Language:** **TypeScript**
*   **Styling:** **Tailwind CSS**
*   **UI Components:** **Shadcn/UI**
*   **Icons:** **Lucide React**
*   **Primary Data Source:** **[Open Food Facts API](https://world.openfoodfacts.org/api/v2/)**
*   **Deployment:** **Vercel**

## 🔧 Getting Started (Local Setup)

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ecoscan.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd ecoscan
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install, or pnpm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 🙏 Acknowledgments

This project would not be possible without the incredible open-source community behind **[Open Food Facts](https://world.openfoodfacts.org/)**. Thank you for providing the data that powers our mission for a more transparent world.
