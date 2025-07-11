// Basic sanitization utilities (DOMPurify will be added later)
// import DOMPurify from 'isomorphic-dompurify';

// Simple HTML tag removal
export function removeHtmlTags(text: string): string {
  return text.replace(/<[^>]*>/g, '');
}

// Basic HTML sanitization
export function sanitizeHtml(html: string): string {
  // For now, just remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/javascript:/gi, '');
}

// Sanitize text content (remove HTML tags)
export function sanitizeText(text: string): string {
  return removeHtmlTags(text);
}

// Sanitize user input for display
export function sanitizeForDisplay(content: string): string {
  if (!content) return '';
  
  // First sanitize HTML
  const sanitized = sanitizeHtml(content);
  
  // Then escape any remaining special characters
  return sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Validate and sanitize URLs
export function sanitizeUrl(url: string): string | null {
  if (!url) return null;
  
  try {
    const parsed = new URL(url);
    
    // Only allow HTTP/HTTPS protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }
    
    // Basic domain validation (you can add more specific rules)
    const allowedDomains = [
      'espn.com', 'fantasypros.com', 'sleeper.app', 'nfl.com',
      'nba.com', 'mlb.com', 'nhl.com', 'reddit.com', 'youtube.com'
    ];
    
    const domain = parsed.hostname.toLowerCase();
    const isAllowed = allowedDomains.some(allowed => 
      domain === allowed || domain.endsWith(`.${allowed}`)
    );
    
    return isAllowed ? url : null;
  } catch {
    return null;
  }
}

// Sanitize object properties recursively
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj } as T;
  
  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      // Sanitize string values
      if (key.includes('html') || key.includes('content') || key.includes('description')) {
        (sanitized as Record<string, string>)[key] = sanitizeHtml(value);
      } else if (key.includes('url') || key.includes('link')) {
        (sanitized as Record<string, string>)[key] = sanitizeUrl(value) || '';
      } else {
        (sanitized as Record<string, string>)[key] = sanitizeText(value);
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recursively sanitize nested objects
      (sanitized as Record<string, unknown>)[key] = sanitizeObject(value as Record<string, unknown>);
    }
  }
  
  return sanitized;
}

// Removed React component SanitizedContent due to linter/type issues. 