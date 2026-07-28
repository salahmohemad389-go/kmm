export const WHATSAPP_PHONE = '+201000000000';

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanNumber = phone.replace(/[^0-9+]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(phone: string, message: string): void {
  const url = buildWhatsAppUrl(phone, message);
  window.open(url, '_blank', 'noopener,noreferrer');
}
