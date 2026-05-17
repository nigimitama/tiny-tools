# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development
npm run dev               # Start development server with turbopack
npm run build            # Build for production (static export)
npm run start            # Start production server
npm run lint             # Run ESLint
```

**Note**: Deployment to GitHub Pages is automated via GitHub Actions when pushing to the `develop` branch.

## Architecture Overview

This is a Next.js application that provides various utility tools, deployed on GitHub Pages. The app follows a page-based routing structure with each tool as a separate page.

### Key Structure
- **Tool Pages**: Each utility tool is a separate page in `src/app/[tool-name]/page.tsx`
- **Route Configuration**: Tool navigation is centrally managed in `src/app/route-settings.tsx`
- **Tool Categories**: Tools are organized into "Text Transformation" and "Image Transformation" categories
- **Client Components**: Many tools use client-side components for interactivity (files ending in `ClientComponents.tsx`)

### Current Tools
- Amazon URL Shortener
- Space Remover
- Words Replacer (with localStorage-based rule storage)
- JSON/Python Dict Formatter
- Difference Viewer
- Base64 Image Encoder
- Images to PDF

### Technology Stack
- **Framework**: Next.js 15 with App Router (Static Export)
- **UI**: Fluent UI React Components
- **Deployment**: GitHub Pages (automated via GitHub Actions)
- **Styling**: Global CSS with Fluent UI
- **Build**: Turbopack for development
- **Storage**: Client-side localStorage for persistent data

### Adding New Tools
1. Create a new directory in `src/app/[tool-name]/`
2. Add `page.tsx` with the tool interface
3. Add client components if needed (`ClientComponents.tsx`)
4. Update `route-settings.tsx` to include the new tool in navigation
5. Choose appropriate category and Fluent UI icon

The app is designed to be simple, with each tool being self-contained and focused on a specific utility function.