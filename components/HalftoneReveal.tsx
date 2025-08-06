'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface HalftoneBackgroundProps {
  imageSrc: string;
  className?: string;
  onAnimationComplete?: () => void;
  onPhaseChange?: (phase: 'blank' | 'halftone' | 'color' | 'refinement' | 'complete') => void;
}

interface HalftoneDot {
  x: number;
  y: number;
  size: number;
  opacity: number;
  originalSize: number;
  originalColor: { r: number; g: number; b: number };
}

export default function HalftoneBackground({ imageSrc, className = '', onAnimationComplete, onPhaseChange }: HalftoneBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [halftoneDots, setHalftoneDots] = useState<HalftoneDot[]>([]);
  const [animationPhase, setAnimationPhase] = useState<'blank' | 'halftone' | 'color' | 'refinement' | 'complete'>('blank');
  const animationRef = useRef<number>();
  const animationStartTime = useRef<number>(0);
  
  // Cache for efficient animation
  const dotsCache = useRef<HalftoneDot[]>([]);
  const animationProgress = useRef({ halftone: 0, color: 0, refinement: 0 });
  
  // Individual dot animation states for per-dot coloring
  const dotAnimationStates = useRef<{ [key: number]: { halftone: number; color: number; halftoneDelay: number; colorDelay: number; refinement: number; refinementDelay: number } }>({});
  
  // Performance optimizations for coloring phase
  const colorPhaseCache = useRef<{ [key: number]: { r: number; g: number; b: number } }>({});
  const lastRenderTime = useRef<number>(0);
  const frameCount = useRef<number>(0);

  // Optimized dot processing with exact dotSpacing = 1
  const processImageData = useCallback((data: ImageData, width: number, height: number) => {
    const dots: HalftoneDot[] = [];
    const dotSpacing = 1; // Exact spacing as requested
    
    for (let y = 0; y < data.height; y += dotSpacing) {
      for (let x = 0; x < data.width; x += dotSpacing) {
        const index = (y * data.width + x) * 4;
        const r = data.data[index];
        const g = data.data[index + 1];
        const b = data.data[index + 2];
        
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        const normalizedBrightness = luminance / 255;
        const dotSize = Math.max(0, Math.pow(normalizedBrightness, 0.8) * 1.6);
        
        if (dotSize > 0.5) {
          dots.push({
            x: (x / data.width) * 100,
            y: (y / data.height) * 100,
            size: dotSize,
            opacity: 0.9,
            originalSize: dotSize,
            originalColor: { r, g, b }
          });
        }
      }
    }
    
    return dots;
  }, []);

  // Load and process the image with optimized performance
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Use a smaller canvas for processing to improve performance
      const maxDimension = 800; // Limit processing size for performance
      const scale = Math.min(maxDimension / img.width, maxDimension / img.height);
      const processWidth = Math.floor(img.width * scale);
      const processHeight = Math.floor(img.height * scale);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = processWidth;
      canvas.height = processHeight;
      
      // Draw image scaled down for processing
      ctx.drawImage(img, 0, 0, processWidth, processHeight);
      
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const dots = processImageData(data, canvas.width, canvas.height);
      
      // Cache all dots for efficient animation
      dotsCache.current = dots;
      setHalftoneDots(dots);
      console.log('HalftoneBackground: Created', dots.length, 'halftone dots with dotSpacing = 1');
      
      // Reset animation state
      setAnimationPhase('blank');
      animationProgress.current = { halftone: 0, color: 0, refinement: 0 };
    };
    
    img.src = imageSrc;
  }, [imageSrc, processImageData]);

  // Animation sequence with individual dot coloring
  useEffect(() => {
    if (dotsCache.current.length === 0) return;

          const startAnimation = () => {
        animationStartTime.current = performance.now();
        setAnimationPhase('halftone');
        onPhaseChange?.('halftone');
        
        // Initialize individual dot animation states with random delays
      dotAnimationStates.current = {};
      for (let i = 0; i < dotsCache.current.length; i++) {
        // Generate random delays for each dot (0 to 1)
        const halftoneDelay = Math.random();
        const colorDelay = Math.random();
        const refinementDelay = Math.random();
        dotAnimationStates.current[i] = { 
          halftone: 0, 
          color: 0, 
          halftoneDelay, 
          colorDelay,
          refinement: 0,
          refinementDelay
        };
      }
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - animationStartTime.current;
        
        if (elapsed < 2000) {
          // Phase 1: Populate halftone dots (0-2s) - faster
          const progress = Math.min(1, elapsed / 2000);
          animationProgress.current.halftone = progress;
          
          // Update individual dot halftone states with random timing
          for (let i = 0; i < dotsCache.current.length; i++) {
            const dotState = dotAnimationStates.current[i];
            // Use random delay for each dot
            const dotDelay = dotState.halftoneDelay * 0.5; // Spread dots over 50% of animation
            const dotProgress = Math.max(0, Math.min(1, (progress - dotDelay) * 2));
            dotAnimationStates.current[i].halftone = dotProgress;
          }
          
          // Force re-render
          throttledRender();
          
          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            // Seamlessly move to color phase without resetting time
            setAnimationPhase('color');
            onPhaseChange?.('color');
            animationRef.current = requestAnimationFrame(animate);
          }
        } else if (elapsed < 6500) {
          // Phase 2: Individual dot color reveal (2-6.5s) - faster and smoother
          const progress = Math.min(1, (elapsed - 2000) / 4500);
          animationProgress.current.color = progress;
          
          // Update individual dot color states with optimized batch processing
          for (let i = 0; i < dotsCache.current.length; i++) {
            const dotState = dotAnimationStates.current[i];
            // Use random delay for each dot's color animation
            const dotDelay = dotState.colorDelay * 0.4; // Spread color reveal over 40% of animation
            const dotProgress = Math.max(0, Math.min(1, (progress - dotDelay) * 2.5));
            dotAnimationStates.current[i].color = dotProgress;
            
            // Cache color values for faster rendering
            if (dotProgress > 0) {
              const dot = dotsCache.current[i];
              colorPhaseCache.current[i] = dot.originalColor;
            }
            
            // Precalculate refinement dots during color phase for efficiency
            if (progress > 0.6) { // Start precalculating refinement in last 50% of color phase
              const refinementDelay = dotState.refinementDelay * 0.3;
              const refinementProgress = Math.max(0, Math.min(1, (progress - 0.5) * 2));
              const dotRefinementProgress = Math.max(0, Math.min(1, (refinementProgress - refinementDelay) * 1.5));
              dotAnimationStates.current[i].refinement = dotRefinementProgress;
            }
          }
          
          // Force re-render
          throttledRender();
          
          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            // Seamlessly move to refinement phase without resetting time
            setAnimationPhase('refinement');
            onPhaseChange?.('refinement');
            animationRef.current = requestAnimationFrame(animate);
          }
        } else if (elapsed < 8500) {
          // Phase 3: Refinement - increase dot accuracy (6.5-8.5s) - shorter since precalculated
          const progress = Math.min(1, (elapsed - 6500) / 2000);
          animationProgress.current.refinement = progress;
          
          // Update individual dot refinement states (most already precalculated)
          for (let i = 0; i < dotsCache.current.length; i++) {
            const dotState = dotAnimationStates.current[i];
            // Use random delay for refinement
            const dotDelay = dotState.refinementDelay * 0.3;
            const dotProgress = Math.max(0, Math.min(1, (progress - dotDelay) * 1.43));
            // Only update if not already precalculated
            if (dotState.refinement < dotProgress) {
              dotAnimationStates.current[i].refinement = dotProgress;
            }
          }
          
          // Force re-render
          throttledRender();
          
          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setAnimationPhase('complete');
            onPhaseChange?.('complete');
            onAnimationComplete?.();
          }
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a delay to let content appear first
    const timer = setTimeout(startAnimation, 1000);
    
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [halftoneDots.length, onAnimationComplete, onPhaseChange]);

  // Optimized render function with smooth color transitions
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || dotsCache.current.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Performance monitoring
    const currentTime = performance.now();
    frameCount.current++;
    
    // Enable high-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Clear canvas with black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Pre-calculate canvas dimensions for better performance
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Batch render dots for better performance
    const dotsToRender = [];
    
    // Pre-process all dots to determine rendering order
    for (let i = 0; i < dotsCache.current.length; i++) {
      const dot = dotsCache.current[i];
      const dotState = dotAnimationStates.current[i];
      
      if (!dotState) continue;
      
      const dotHalftoneScale = dotState.halftone;
      if (dotHalftoneScale <= 0) continue;
      
      const dotColorScale = dotState.color;
      const dotRefinementScale = dotState.refinement;
      
      // Calculate final properties
      const finalOpacity = dot.opacity * dotHalftoneScale;
      const finalSize = dot.size * (1 + (dotRefinementScale * 0.8));
      
      // Smooth color interpolation with reduced brightness post-refinement
      let finalColor;
      if (dotColorScale > 0) {
        const cachedColor = colorPhaseCache.current[i];
        const sourceColor = cachedColor || dot.originalColor;
        
        // Smooth transition from white to color
        const transitionProgress = Math.min(1, dotColorScale * 1.5);
        
        // Reduce brightness based on refinement phase
        const brightnessReduction = dotRefinementScale * 0.3; // Reduce brightness by up to 30%
        const brightnessMultiplier = 1 - brightnessReduction;
        
        finalColor = {
          r: Math.round((255 * (1 - transitionProgress) + sourceColor.r * transitionProgress) * brightnessMultiplier),
          g: Math.round((255 * (1 - transitionProgress) + sourceColor.g * transitionProgress) * brightnessMultiplier),
          b: Math.round((255 * (1 - transitionProgress) + sourceColor.b * transitionProgress) * brightnessMultiplier)
        };
      } else {
        finalColor = { r: 255, g: 255, b: 255 }; // White
      }
      
      dotsToRender.push({
        x: (dot.x / 100) * canvasWidth,
        y: (dot.y / 100) * canvasHeight,
        size: finalSize,
        color: finalColor,
        opacity: finalOpacity
      });
    }
    
    // Render dots in optimized batches
    const batchSize = 50;
    for (let i = 0; i < dotsToRender.length; i += batchSize) {
      const batch = dotsToRender.slice(i, i + batchSize);
      
      for (const dot of batch) {
        ctx.globalAlpha = dot.opacity;
        ctx.fillStyle = `rgb(${dot.color.r}, ${dot.color.g}, ${dot.color.b})`;
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    
    ctx.globalAlpha = 1;
    
    // Performance logging (can be removed in production)
    if (frameCount.current % 60 === 0) {
      const fps = 1000 / (currentTime - lastRenderTime.current);
      console.log(`Halftone FPS: ${fps.toFixed(1)}`);
      lastRenderTime.current = currentTime;
    }
  }, []);

  // Optimized render function for 120fps
  const throttledRender = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    // Use requestAnimationFrame for optimal frame rate (up to 120fps on supported displays)
    animationRef.current = requestAnimationFrame(renderCanvas);
  }, [renderCanvas]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const resizeCanvas = () => {
      const container = containerRef.current!;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      throttledRender();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [throttledRender]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
} 