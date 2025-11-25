export const sanitizeFilename = (filename: string): string => {
    return filename
        // Remove or replace non-ASCII characters with hyphens
        .replace(/[^\x00-\x7F]/g, '-')
        // Replace spaces with hyphens
        .replace(/\s+/g, '-')
        // Remove any characters that aren't alphanumeric, hyphens, or underscores
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        // Remove multiple consecutive hyphens
        .replace(/-+/g, '-')
        // Remove leading/trailing hyphens
        .replace(/^-+|-+$/g, '')
        // Limit length to avoid issues
        .substring(0, 100)
        // Ensure it's not empty (fallback to 'file' if all characters were removed)
        || 'file'
}


export const sanitizeDisplayName = (name: string) => {
    if (!name) {
        return '';
    }

    return name
        .normalize('NFC') // keep international chars in canonical form
        .replace(/\s+/g, ' ') // collapse whitespace
        .trim()
        .slice(0, 100); // keep names reasonable
}