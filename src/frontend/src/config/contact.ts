// Centralized contact configuration
export const CONTACT_CONFIG = {
  phone: '+919983685264',
  whatsapp: '+919610685264',
  companyName: 'Bikaner Express Delivery',
  serviceArea: 'Serving Bikaner city, villages & dhanis',
  location: 'Bikaner, Rajasthan',
} as const;

export function buildWhatsAppLink(message?: string): string {
  const baseUrl = `https://wa.me/${CONTACT_CONFIG.whatsapp.replace(/\+/g, '')}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}
