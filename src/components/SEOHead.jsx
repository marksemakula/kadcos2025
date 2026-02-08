import { useEffect } from 'react';
import { siteConfig, pageSEO, generatePageSchema } from '../utils/seoConfig';

/**
 * SEOHead Component
 * Updates document head with page-specific SEO meta tags
 * 
 * @param {string} page - Page key from pageSEO config
 * @param {object} customData - Optional custom SEO data to override defaults
 */
const SEOHead = ({ page, customData = {} }) => {
  useEffect(() => {
    const pageData = pageSEO[page] || {};
    const data = { ...pageData, ...customData };
    
    // Update document title
    if (data.title) {
      document.title = data.title;
    }
    
    // Helper function to update or create meta tag
    const updateMeta = (name, content, isProperty = false) => {
      if (!content) return;
      
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };
    
    // Update basic meta tags
    updateMeta('description', data.description);
    updateMeta('keywords', data.keywords);
    
    // Update Open Graph tags
    updateMeta('og:title', data.title, true);
    updateMeta('og:description', data.description, true);
    updateMeta('og:url', `${siteConfig.siteUrl}${data.canonicalPath || ''}`, true);
    
    // Update Twitter Card tags
    updateMeta('twitter:title', data.title);
    updateMeta('twitter:description', data.description);
    updateMeta('twitter:url', `${siteConfig.siteUrl}${data.canonicalPath || ''}`);
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && data.canonicalPath) {
      canonical.setAttribute('href', `${siteConfig.siteUrl}${data.canonicalPath}`);
    }
    
    // Add page-specific structured data
    const pageSchema = generatePageSchema(page);
    if (pageSchema) {
      // Remove any existing page-specific schema
      const existingPageSchema = document.querySelector('script[data-page-schema]');
      if (existingPageSchema) {
        existingPageSchema.remove();
      }
      
      // Add new page schema
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-schema', 'true');
      script.textContent = JSON.stringify(pageSchema);
      document.head.appendChild(script);
    }
    
    // Cleanup on unmount
    return () => {
      const pageSchemaScript = document.querySelector('script[data-page-schema]');
      if (pageSchemaScript) {
        pageSchemaScript.remove();
      }
    };
  }, [page, customData]);
  
  // This component doesn't render anything visible
  return null;
};

export default SEOHead;
