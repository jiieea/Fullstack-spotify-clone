// @ts-expect-error - jsmediatags doesn't have perfect TypeScript support
import jsmediatags from 'jsmediatags'

interface TagData {
    tags?: {
        genre?: string;
        TAG?: {
            genre?: string;
        };
        TCON?: {
            data?: string;
        };
        [key: string]: unknown;
    };
}

/**
 * Extracts genre from an audio file (browser-compatible)
 * @param file - The audio file (File or Blob object)
 * @returns Promise<string | null> - The genre string or null if not found
 */
const getGenre = async (file: File | Blob): Promise<string | null> => {
    return new Promise((resolve) => {
        try {
            jsmediatags.read(file, {
                onSuccess: (tag: TagData) => {
                    try {
                        // Try different possible locations for genre
                        let genre: string | null = null;
                        
                        // Check ID3v2 tags first (most common)
                        if (tag.tags?.genre) {
                            genre = tag.tags.genre;
                        }
                        // Check ID3v1 tags
                        else if (tag.tags?.TAG?.genre) {
                            genre = tag.tags.TAG.genre;
                        }
                        // Check raw tags
                        else if (tag.tags?.TCON?.data) {
                            genre = tag.tags.TCON.data;
                        }
                        
                        // Clean up genre string (remove ID3v1 genre codes if present)
                        if (genre) {
                            // ID3v1 uses numeric codes, try to resolve them
                            const genreMatch = genre.match(/^\((\d+)\)(.+)$/);
                            if (genreMatch) {
                                // If it's a numeric code, use the text part
                                genre = genreMatch[2].trim() || genreMatch[1];
                            }
                            // Remove parentheses and clean
                            genre = genre.replace(/^\([^)]*\)\s*/, '').trim();
                            
                            if (genre && genre.length > 0) {
                                console.log('Extracted genre:', genre);
                                resolve(genre);
                                return;
                            }
                        }
                        
                        console.log('Genre not found in metadata');
                        resolve(null);
                    } catch (parseError) {
                        console.error('Error parsing genre from tags:', parseError);
                        resolve(null);
                    }
                },
                onError: (error: Error) => {
                    console.error('Error reading metadata:', error);
                    resolve(null);
                }
            });
        } catch (error) {
            console.error('Error extracting genre:', error);
            resolve(null);
        }
    });
}

export default getGenre;

