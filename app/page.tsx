'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HalftoneBackground from '@/components/HalftoneReveal';

const antelopeCanyonImage = '/assets/sandstone.jpg';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [halftoneAnimationComplete, setHalftoneAnimationComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'blank' | 'halftone' | 'color' | 'refinement' | 'complete'>('blank');
  const [showEmailForm, setShowEmailForm] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      console.log('Email submitted:', email);
    }
  };

  // Set loaded state after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-black fixed inset-0">
      {/* Loading state - just black background, no text */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black z-50" />
      )}
      
      {/* Halftone Background */}
      <HalftoneBackground 
        imageSrc={antelopeCanyonImage}
        className="z-0"
        onAnimationComplete={() => setHalftoneAnimationComplete(true)}
                  onPhaseChange={(phase) => {
            setCurrentPhase(phase);
          }}
      />
      
      {/* Content Container */}
      <div className="relative z-50 min-h-screen flex flex-col">
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-12">
            
            {/* Primary Heading */}
            <motion.div 
              className="space-y-8 pt-8 mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-8xl md:text-8xl font-medium text-white tracking-widest leading-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              >
                Sandstone
              </motion.h1>
              
              {/* Artisans of Digital Sand */}
              <motion.p 
                className="text-2xl md:text-3xl text-white/90 font-medium tracking-wide leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              >
                We don&apos;t build - we sculpt
              </motion.p>
              
              {/* Coming Soon */}
              <motion.p 
                className="text-3xl md:text-4xl text-white font-normal tracking-widest leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
              >
                Coming soon
              </motion.p>
            </motion.div>

            {/* Email Form - always visible */}
            <motion.div
              className="space-y-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
            >
                {/* Email Address */}
                <motion.p 
                  className="text-xl md:text-2xl text-white font-medium tracking-wide leading-relaxed"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                  team@sandstone.ai
                </motion.p>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        className="flex-1 bg-white border-2 border-white text-black placeholder:text-black/70 focus:border-blue-500 focus:bg-white z-50 relative shadow-2xl backdrop-blur-sm"
                        required
                      />
                      <Button 
                        type="submit"
                        className="bg-white hover:bg-gray-100 text-black border-2 border-white hover:border-gray-300 z-50 relative shadow-2xl font-medium px-8 py-3"
                      >
                        Notify me
                      </Button>
                    </div>
                  </form>
                ) : (
                  <motion.p 
                    className="text-2xl text-white/80 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Thank you! We&apos;ll notify you when we launch.
                  </motion.p>
                )}
              </motion.div>
          </div>
        </main>

        {/* Footer - always visible */}
        <motion.footer 
          className="relative z-50 py-8 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-8">
              <a 
                href="#privacy" 
                className="text-white hover:text-yellow-200 text-lg transition-colors duration-200 hover:underline font-bold tracking-wide"
              >
                Privacy
              </a>
              <a 
                href="mailto:team@sandstone.ai" 
                className="text-white hover:text-yellow-200 text-lg transition-colors duration-200 hover:underline font-bold tracking-wide"
              >
                Contact
              </a>
            </div>
            <div className="text-white text-lg font-bold tracking-wide">
              © 2025 Sandstone. All rights reserved.
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
} 