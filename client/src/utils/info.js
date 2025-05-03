export function getFirstName(fullName) {
    if (typeof fullName !== 'string') return '';
    
    const trimmedName = fullName.trim();
    const firstSpaceIndex = trimmedName.indexOf(' ');
  
    if (firstSpaceIndex === -1) {
      return trimmedName; // No space found, return the full name
    }
  
    return trimmedName.slice(0, firstSpaceIndex);
  }
  