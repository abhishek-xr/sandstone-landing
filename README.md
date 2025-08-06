# Sandstone Coming Soon Landing Page

A stunning coming soon page featuring a dynamic halftone animation background, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✨ **Dynamic Halftone Animation**: Real-time canvas-based halftone effect with smooth color transitions
- 🎨 **Staged Text Reveal**: Beautiful sequential text animations ("Sandstone" → "We don't build - we sculpt" → "Coming soon")
- 📧 **Email Capture**: Functional email subscription form with validation
- 📱 **Responsive Design**: Fully responsive layout that works on all devices
- ⚡ **Performance Optimized**: Client-side rendering with optimized canvas operations
- 🎯 **Interactive Elements**: Contact links and privacy footer
- 🌙 **Dark Theme**: Elegant dark design with proper contrast

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Canvas API**: Custom halftone rendering
- **Fonts**: System fonts with custom tracking and weights

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhishek-xr/sandstone-landing.git
   cd sandstone-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout with black background
│   ├── page.tsx           # Main landing page component
│   └── api/               # API routes (if needed)
├── components/            # React components
│   ├── HalftoneReveal.tsx # Canvas-based halftone animation
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx    # Button component
│   │   ├── input.tsx     # Input component
│   │   └── utils.ts      # Utility functions
│   └── figma/            # Custom components
├── public/               # Static assets
│   └── assets/           # Images and halftone data
└── Configuration Files   # Next.js, TypeScript, Tailwind configs
```

## Animation Features

### Halftone Background
- **Real-time Processing**: Client-side image processing with Canvas API
- **Performance Optimized**: Scaled processing (800px max) for smooth performance
- **Three Animation Phases**:
  1. **Halftone Dots** (0-2s): White dots appear with random timing
  2. **Color Reveal** (2-6.5s): Dots transition to original image colors
  3. **Refinement** (6.5-8.5s): Enhanced accuracy with brightness reduction

### Text Animations
- **Staged Reveal**: Text appears in sequence with proper timing
- **Smooth Transitions**: Framer Motion animations with easing
- **Email Form**: Appears after text animations complete

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Animation Timing
Adjust animation phases in `components/HalftoneReveal.tsx`:
- Halftone phase duration
- Color transition timing
- Refinement phase length

### Text Content
Modify text content and timing in `app/page.tsx`:
- Main heading text
- Subtitle text
- Animation delays

### Styling
Customize appearance in:
- `app/globals.css` - Global styles and animations
- `tailwind.config.js` - Tailwind configuration
- Component-specific CSS classes

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Automatic deployment on push to main branch
3. Optimized for Next.js 14 with App Router

### Build Process
```bash
npm run build
```
- Static generation for optimal performance
- Optimized bundle size (~134kB first load)
- Pre-rendered pages for fast loading

## Performance Features

- **Optimized Canvas Rendering**: Batch processing and efficient algorithms
- **Memory Management**: Proper cleanup of animation frames and refs
- **Responsive Design**: Adapts to all screen sizes
- **SSR Compatible**: Client-side only components with proper hydration
- **Fast Loading**: Optimized images and minimal dependencies

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Canvas API**: Required for halftone animation
- **ES6+ Features**: Arrow functions, destructuring, etc.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- Canvas API for the custom halftone rendering 