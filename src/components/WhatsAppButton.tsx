import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919999999999?text=Hi! I'm interested in your products"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-20 right-4 z-50 w-12 h-12 bg-whatsapp rounded-full flex items-center justify-center shadow-lg max-w-mobile"
    style={{ right: 'max(1rem, calc((100vw - 480px) / 2 + 1rem))' }}
  >
    <MessageCircle size={24} className="text-primary-foreground" fill="currentColor" />
  </a>
);

export default WhatsAppButton;
