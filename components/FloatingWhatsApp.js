'use client';

export default function FloatingWhatsApp() {
  const createMessage = () => {
    let message = `🌟 *Hello from Jagjit Kaur Website* 🌟\n\n`;
    message += `Hi! I'm interested in your beautiful collection.\n\n`;
    message += `📋 *I would like to know more about:*\n`;
    message += `• Your latest collections\n`;
    message += `• Custom orders and tailoring\n`;
    message += `• Pricing and availability\n`;
    message += `• Delivery options\n\n`;
    message += `Please let me know how I can explore your exquisite handcrafted pieces! 🙏\n\n`;
    message += `*Website:* jkbyjagjitkaur.com`;
    
    return encodeURIComponent(message);
  };

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE; // Replace with actual business number if needed
  const link = `https://wa.me/${phone}?text=${createMessage()}`;

  return (
    <div className="fixed bottom-1/5 right-6 z-40 group">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-stone-700 dark:bg-stone-200 hover:bg-stone-900 dark:hover:bg-stone-100 text-white dark:text-stone-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        title="Chat with us on WhatsApp"
        aria-label="Contact us on WhatsApp"
      >
        <svg 
          className="w-7 h-7" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.69"/>
        </svg>
        
        {/* Ripple effect */}
        {/* <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping"></div> */}
      </a>
      
      {/* Tooltip */}
      <div className="absolute bottom-16 right-0 mb-2 px-3 py-1 bg-stone-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with us!
        <div className="absolute top-full right-4 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-800"></div>
      </div>
    </div>
  );
}
