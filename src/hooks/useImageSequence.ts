import { useState, useEffect, useRef, useCallback } from 'react';
import { SITE_CONFIG } from '../config/content';

interface UseImageSequenceProps {
  basePath: string;
  frameDirection: 'forward' | 'reverse';
  totalFrames?: number;
}

interface UseImageSequenceReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isLoading: boolean;
  loadingProgress: number;
  error: string | null;
  // Control API
  setControlMode: (mode: 'scroll' | 'external') => void;
  renderByProgress: (progress01: number) => void;
}

/**
 * Hook pour charger et animer une séquence d'images sur un canvas
 * 
 * @param basePath - Chemin vers le dossier des images (ex: "/images/mango")
 * @param frameDirection - Direction de lecture des frames:
 *   - "forward": 1 (1).gif → 1 (191).gif (scroll 0% = frame 1, scroll 100% = frame 191)
 *   - "reverse": 1 (191).gif → 1 (1).gif (scroll 0% = frame 191, scroll 100% = frame 1)
 * @param totalFrames - Nombre total de frames (par défaut: 191)
 */
export function useImageSequence({
  basePath,
  frameDirection,
  totalFrames = SITE_CONFIG.totalFrames,
}: UseImageSequenceProps): UseImageSequenceReturn {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);
  
  const controlModeRef = useRef<'scroll' | 'external'>('scroll');
  const externalProgressRef = useRef<number>(0);
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  /**
   * Génère le chemin d'une frame selon son index
   * Le nom du fichier est toujours "1 (X).gif" où X est le numéro
   */
  const getFramePath = useCallback((frameNumber: number): string => {
    // Encode l'espace en %20 pour les URLs
    return `${basePath}/1%20(${frameNumber}).gif`;
  }, [basePath]);

  /**
   * Calcule le numéro de frame à afficher selon la progression du scroll
   * 
   * @param scrollProgress - Progression du scroll de 0 à 1
   * @returns Numéro de frame à afficher (1 à totalFrames)
   */
  const getFrameIndex = useCallback((scrollProgress: number): number => {
    // Clamp la progression entre 0 et 1
    const progress = Math.max(0, Math.min(1, scrollProgress));
    
    if (frameDirection === 'forward') {
      // Forward: scroll 0% = frame 1, scroll 100% = frame 191
      return Math.floor(progress * (totalFrames - 1)) + 1;
    } else {
      // Reverse: scroll 0% = frame 191, scroll 100% = frame 1
      return totalFrames - Math.floor(progress * (totalFrames - 1));
    }
  }, [frameDirection, totalFrames]);

  /**
   * Dessine une frame sur le canvas
   */
  const drawFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    // L'index dans le tableau est frameNumber - 1 (car les frames commencent à 1)
    const imageIndex = frameNumber - 1;
    const image = imagesRef.current[imageIndex];
    
    if (!image || !image.complete) return;

    // Taille du canvas
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Taille de l'image
    const imgWidth = image.naturalWidth;
    const imgHeight = image.naturalHeight;
    
    // Calcul du ratio pour "cover" (remplir tout l'écran)
    const scaleX = canvasWidth / imgWidth;
    const scaleY = canvasHeight / imgHeight;
    const scale = Math.max(scaleX, scaleY); // "cover" utilise max, "contain" utilise min
    
    // Taille finale de l'image
    const finalWidth = imgWidth * scale;
    const finalHeight = imgHeight * scale;
    
    // Position pour centrer l'image
    const x = (canvasWidth - finalWidth) / 2;
    const y = (canvasHeight - finalHeight) / 2;
    
    // Effacer et dessiner
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(image, x, y, finalWidth, finalHeight);
  }, []);

  // Exposed control API
  const setControlMode = useCallback((mode: 'scroll' | 'external') => {
    controlModeRef.current = mode;
  }, []);

  const renderByProgress = useCallback((progress01: number) => {
    externalProgressRef.current = Math.max(0, Math.min(1, progress01));
    const frameNumber = getFrameIndex(externalProgressRef.current);
    frameRef.current = frameNumber;
    drawFrame(frameNumber);
  }, [drawFrame, getFrameIndex]);

  /**
   * Charge toutes les images de la séquence
   */
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const loadImage = (frameNumber: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          if (isMounted) {
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
          }
          resolve();
        };
        
        img.onerror = () => {
          console.warn(`Frame non trouvée: ${getFramePath(frameNumber)}`);
          if (isMounted) {
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
          }
          resolve();
        };
        
        img.src = getFramePath(frameNumber);
        // Mettre à jour immédiatement la ref pour que drawFrame puisse l'utiliser
        if (!imagesRef.current[frameNumber - 1]) {
            imagesRef.current[frameNumber - 1] = img;
        }
        images[frameNumber - 1] = img; // Index 0 = frame 1
      });
    };

    const loadAllImages = async () => {
      setIsLoading(true);
      setError(null);
      
      // Charger les images par lots pour éviter trop de requêtes simultanées
      const batchSize = 10;
      
      // IMPORTANT: Charger les frames dans l'ordre d'affichage
      // Pour "forward": charger 1 → 191 (la frame 1 s'affiche d'abord)
      // Pour "reverse": charger 191 → 1 (la frame 191 s'affiche d'abord)
      
      if (frameDirection === 'forward') {
        // Forward: charger de 1 à 191
        for (let i = 1; i <= totalFrames; i += batchSize) {
          const batch: Promise<void>[] = [];
          
          for (let j = i; j < Math.min(i + batchSize, totalFrames + 1); j++) {
            batch.push(loadImage(j));
          }
          
          await Promise.all(batch);
          
          // Afficher la première frame dès qu'elle est chargée
          if (i === 1 && images[0]?.complete) {
            drawFrame(1);
          }
          
          if (!isMounted) return;
        }
      } else {
        // Reverse: charger de 191 à 1 (la frame 191 s'affiche en premier)
        for (let i = totalFrames; i >= 1; i -= batchSize) {
          const batch: Promise<void>[] = [];
          
          for (let j = i; j > Math.max(i - batchSize, 0); j--) {
            batch.push(loadImage(j));
          }
          
          await Promise.all(batch);
          
          // Afficher la frame 191 dès qu'elle est chargée (c'est la première visible)
          if (i === totalFrames && images[totalFrames - 1]?.complete) {
            drawFrame(totalFrames);
          }
          
          if (!isMounted) return;
        }
      }
      
      imagesRef.current = images;
      setIsLoading(false);
      
      // Redessiner la frame de départ une fois tout chargé
      const firstFrame = frameDirection === 'forward' ? 1 : totalFrames;
      drawFrame(firstFrame);
    };

    loadAllImages();

    return () => {
      isMounted = false;
    };
  }, [basePath, totalFrames, getFramePath, drawFrame, frameDirection]);

  /**
   * Gère le scroll et le redimensionnement
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Trouver le conteneur parent avec la classe "scroll-container"
    containerRef.current = canvas.closest('.scroll-container') as HTMLElement | null;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Échelle pour haute densité
      }
      drawFrame(frameRef.current || (frameDirection === 'forward' ? 1 : totalFrames));
    };

    const computeAndRender = () => {
      const container = containerRef.current;
      if (!container) return;

      // If in external control mode, render by external progress reference and skip scroll mapping
      if ((controlModeRef.current === 'external')) {
        const frameNumber = getFrameIndex(externalProgressRef.current);
        if (frameNumber !== frameRef.current) {
          frameRef.current = frameNumber;
          requestAnimationFrame(() => drawFrame(frameNumber));
        }
        return;
      }

      // Position absolue du conteneur dans la page
      const rect = container.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;

      // Hauteur scrollable de la section (500vh - 100vh)
      const sectionHeight = container.offsetHeight - window.innerHeight;
      if (sectionHeight <= 0) return;

      // Position actuelle du scroll relative au début de la section
      const current = window.scrollY - sectionTop;

      // Progression clampée entre 0 et 1
      const scrollProgress = Math.max(0, Math.min(1, current / sectionHeight));

      // Numéro de frame correspondant
      const frameNumber = getFrameIndex(scrollProgress);

      if (frameNumber !== frameRef.current) {
        frameRef.current = frameNumber;
        requestAnimationFrame(() => drawFrame(frameNumber));
      }
    };

    // Initialiser tailles et premier rendu
    handleResize();
    computeAndRender();

    // Écouteurs d'événements
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', computeAndRender, { passive: true });

    // Boucle RAF pour garantir la synchro (fallback si l'événement scroll rate)
    let rafId = 0;
    const loop = () => {
      computeAndRender();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', computeAndRender);
      cancelAnimationFrame(rafId);
    };
  }, [drawFrame, getFrameIndex, frameDirection, totalFrames]);

  return {
    canvasRef,
    isLoading,
    loadingProgress,
    error,
    setControlMode,
    renderByProgress,
  };
}
