// hooks/useDominantColor.ts
import ColorThief from 'colorthief';
import { useState, useEffect } from 'react';

export const useGetDominantColor = (imageUrl: string | undefined): string => {
  const [dominantColor, setDominantColor] = useState<string>('rgb(0, 0, 0)');

  useEffect(() => {
    if (!imageUrl) {
      setDominantColor('rgb(0, 0, 0)');
      return;
    }

    const image = new window.Image();
    image.crossOrigin = 'Anonymous';
    image.src = imageUrl;

    image.onload = () => {
      try {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(image);
        if (color) {
          setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        }
      } catch (error) {
        console.error('Failed to extract color:', error);
      }
    };

    image.onerror = (error) => {
      console.error('Image failed to load:', error);
      setDominantColor('rgb(0, 0, 0)');
    };
  }, [imageUrl]);

  return dominantColor;
};