# Sandstone Coming Soon Landing Page

A beautiful, parallax-driven coming soon page built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✨ **Parallax Effects**: Multi-layered parallax scrolling with sand particles
- 🎨 **Modern Design**: Beautiful typography with custom fonts and gradients
- 📱 **Responsive**: Fully responsive design that works on all devices
- ⚡ **Performance**: Optimized with Next.js 14 and App Router
- 🎯 **Email Capture**: Functional email subscription form
- 🌙 **Dark Mode Ready**: Built with dark mode support in mind

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Playfair Display, Dancing Script)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sandstone-coming-soon
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── figma/            # Custom components
├── styles/               # Additional styles
├── guidelines/           # Project guidelines
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Customization

### Colors
The color scheme can be customized in `app/globals.css` by modifying the CSS custom properties.

### Typography
Custom fonts are defined in `app/globals.css`:
- `.font-serif` - Playfair Display
- `.font-script` - Dancing Script

### Parallax Effects
Parallax speeds and effects can be adjusted in `app/page.tsx` by modifying the transform values.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy automatically

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Unsplash](https://unsplash.com) for the background image 