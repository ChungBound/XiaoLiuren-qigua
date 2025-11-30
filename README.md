
# Xiao Liu Ren Divination (小六壬排盘)

A premium, bilingual Xiao Liu Ren divination application built with Next.js and React.

## Features

*   **Multiple Divination Methods**:
    *   **Time Divination (时间起卦)**: Uses the current or selected date/time based on the traditional Lunar calendar algorithm.
    *   **Number Divination (数字起卦)**: Uses three random numbers provided by the user.
*   **Bilingual Support**: Full English and Chinese (Simplified) support.
*   **Premium UI**: Modern, mystical design with smooth animations and glassmorphism effects.
*   **Accurate Logic**: Implements the traditional counting method (Da An -> Liu Lian -> ...).

## Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Styling**: CSS Modules (Vanilla CSS)
*   **Library**: `lunar-javascript` for accurate Lunar date conversion.

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

*   `src/app/page.tsx`: Main application logic and UI.
*   `src/lib/xiaoliuren.ts`: Core divination algorithms.
*   `src/lib/translations.ts`: Bilingual text data.
*   `src/app/globals.css`: Global styles and theming.
