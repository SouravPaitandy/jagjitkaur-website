import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Jagjit Kaur - Handcrafted Indian Fashion",
  description: "Terms and conditions for purchasing handcrafted Indian fashion from Jagjit Kaur. Read our policies on orders, returns, and customer rights.",
  keywords: ["terms of service", "conditions", "policies", "Jagjit Kaur", "Indian fashion"],
};

export default function TermsOfService() {
  return (
    <>
      <main className="min-h-screen bg-stone-50 dark:bg-stone-900 py-16">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav className="flex items-center space-x-3 text-sm mb-8">
            <Link
              href="/"
              className="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-stone-800 dark:text-stone-200 font-semibold">Terms of Service</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-700 dark:bg-stone-300 rounded-full mb-6">
              <svg className="w-8 h-8 text-white dark:text-stone-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="font-fira-sans text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
              Your rights and responsibilities when shopping with Jagjit Kaur
            </p>
            <div className="mt-4 text-sm text-stone-500 dark:text-stone-400">
              Last updated: January 2025
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-stone-800 rounded-lg shadow-lg border border-stone-200 dark:border-stone-700 overflow-hidden">
            <div className="p-8 space-y-12">
              
              {/* 1. Acceptance of Terms */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Acceptance of Terms
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    By accessing and using the Jagjit Kaur website ("we," "us," or "our"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    These terms apply to all visitors, users, and others who access or use our website and services related to handcrafted Indian fashion products.
                  </p>
                </div>
              </section>

              {/* 2. About Our Products */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  About Our Products
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-4">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Handcrafted Nature:</strong> All our products are handcrafted by skilled artisans. This means each piece is unique and may have slight variations in color, pattern, or finish, which are characteristic of handmade items and not defects.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Product Descriptions:</strong> We strive to provide accurate descriptions and images of our products. However, colors may appear differently on various devices and screens.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Authenticity:</strong> We guarantee that all our products are authentic, handcrafted pieces made using traditional techniques and genuine materials.
                  </p>
                </div>
              </section>

              {/* 3. Ordering and Payment */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Ordering and Payment
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-4">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Order Process:</strong> Orders are placed through WhatsApp communication. We will confirm availability, pricing, and delivery details before processing your order.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Payment Terms:</strong> Payment can be made through various methods including bank transfer, UPI, or other agreed-upon methods. Full payment is required before shipping.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Pricing:</strong> All prices are in Indian Rupees (INR) and may be subject to change without notice. Any applicable taxes will be clearly communicated.
                  </p>
                </div>
              </section>

              {/* 4. Shipping and Delivery */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                  Shipping and Delivery
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-4">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Shipping Coverage:</strong> We provide free shipping across India for all orders.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Delivery Time:</strong> Standard delivery takes 5-7 business days within India. Express delivery options may be available upon request.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>International Shipping:</strong> International shipping is available upon request with additional charges and extended delivery times.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Risk of Loss:</strong> All items purchased are made pursuant to a shipment contract. Risk of loss and title for items pass to you upon delivery to the carrier.
                  </p>
                </div>
              </section>

              {/* 5. Returns and Exchanges */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                  Returns and Exchanges
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-4">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Return Period:</strong> Returns are accepted within 7 days of delivery, provided the item is in original condition with tags attached.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Return Conditions:</strong> Items must be unworn, unaltered, and in the same condition as received. Custom or personalized items cannot be returned.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Return Process:</strong> Contact us via WhatsApp to initiate a return. We will provide return instructions and arrange pickup if applicable.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>Refunds:</strong> Refunds will be processed within 5-7 business days after we receive and inspect the returned item.
                  </p>
                </div>
              </section>

              {/* 6. Intellectual Property */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
                  Intellectual Property
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-4">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    The service and its original content, features, and functionality are and will remain the exclusive property of Jagjit Kaur and its licensors. The service is protected by copyright, trademark, and other laws.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without prior written consent.
                  </p>
                </div>
              </section>

              {/* 7. User Conduct */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">7</span>
                  User Conduct
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-4">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    You agree not to use the service for any unlawful purpose or to solicit others to perform unlawful acts. You agree not to use the service to impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    You agree not to interfere with or disrupt the service or servers or networks connected to the service.
                  </p>
                </div>
              </section>

              {/* 8. Disclaimers */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">8</span>
                  Disclaimers
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-4">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    While we strive to ensure product quality and customer satisfaction, variations in handcrafted items are normal and expected characteristics of authentic handmade products.
                  </p>
                </div>
              </section>

              {/* 9. Contact Information */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">9</span>
                  Contact Information
                </h2>
                <div className="bg-stone-100 dark:bg-stone-700 p-6 rounded-lg">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2 text-stone-700 dark:text-stone-300">
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      WhatsApp: +91 7363961142
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email: contact@jagjitkaur.com
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      Website: jagjitkaur.com
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/products" className="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
                Our Collection
              </Link>
              <Link href="/" className="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}