import { useState, useEffect } from "react";
import { PRODUCTS } from "../config/content";

export const usePreloadImages = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const imagePaths: string[] = [];

    // Collect all image paths from all products
    PRODUCTS.forEach((product) => {
      const { frameCount, imagePath } = product;
      
      const count = frameCount || 191;
      for (let i = 1; i <= count; i++) {
        imagePaths.push(`${imagePath}/1 (${i}).gif`);
      }
    });

    let loadedCount = 0;
    const total = imagePaths.length;

    const updateProgress = () => {
      if (!isMounted) return;
      loadedCount++;
      const currentProgress = Math.min(100, Math.round((loadedCount / total) * 100));
      setProgress(currentProgress);

      if (loadedCount === total) {
        setIsLoaded(true);
      }
    };

    if (total === 0) {
      setIsLoaded(true);
      return;
    }

    // Parallel loading
    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { progress, isLoaded };
};
