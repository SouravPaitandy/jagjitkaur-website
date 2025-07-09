export default function WhatsAppButton({ productName, product }) {
  // Create a comprehensive message with all relevant details
  const createMessage = () => {
    let message = `🌟 *Inquiry from Jagjit Kaur Website* 🌟\n\n`;
    message += `Hello! I'm interested in the following product:\n\n`;
    message += `📱 *Product:* ${productName}\n`;
    
    // Add product details if available
    if (product) {
      if (product.category) message += `🏷️ *Category:* ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}\n`;
      if (product.price) message += `💰 *Listed Price:* ₹${product.price}\n`;
      if (product.fabric) message += `🧵 *Fabric:* ${product.fabric}\n`;
      if (product.work) message += `✨ *Work:* ${product.work}\n`;
      if (product.origin) message += `📍 *Origin:* ${product.origin}\n`;
      if (product.occasion) message += `🎉 *Occasion:* ${product.occasion}\n`;
    }
    
    message += `\n📋 *I would like to know:*\n`;
    message += `• Current availability and stock status\n`;
    message += `• Final pricing and any ongoing offers\n`;
    message += `• Size options and measurements\n`;
    message += `• Delivery time and shipping charges\n`;
    message += `• Return/exchange policy\n`;
    message += `• Care instructions\n`;
    message += `• Payment methods accepted\n\n`;
    
    message += `📞 *My preferred contact method:*\n`;
    message += `[ ] WhatsApp call\n`;
    message += `[ ] WhatsApp message\n`;
    message += `[ ] Regular phone call\n\n`;
    
    message += `⏰ *Best time to contact me:*\n`;
    message += `[ ] Morning (9 AM - 12 PM)\n`;
    message += `[ ] Afternoon (12 PM - 5 PM)\n`;
    message += `[ ] Evening (5 PM - 8 PM)\n\n`;
    
    message += `💬 *Additional questions/requirements:*\n`;
    message += `(Please mention any specific requirements, custom sizing, color preferences, or special requests)\n\n`;
    
    message += `Thank you for your time! Looking forward to hearing from you. 🙏\n\n`;
    message += `*Website:* jkbyjagjitkaur.com`;
    
    return encodeURIComponent(message);
  };

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE; // Replace with actual business number if needed
  const link = `https://wa.me/${phone}?text=${createMessage()}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      title="WhatsApp us for inquiries"
      className="bg-stone-700 dark:bg-stone-200 hover:bg-stone-900 dark:hover:bg-stone-100 text-white dark:text-stone-900 px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.69"/>
      </svg>
      <span className="tracking-widest">BUY NOW</span>
    </a>
  );
}