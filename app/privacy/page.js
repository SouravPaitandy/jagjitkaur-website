import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Jagjit Kaur - Data Protection & Customer Privacy",
  description: "Learn how Jagjit Kaur protects your personal information and privacy when shopping for handcrafted Indian fashion. Our commitment to data security.",
  keywords: ["privacy policy", "data protection", "customer privacy", "Jagjit Kaur", "data security"],
};

export default function PrivacyPolicy() {
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
            <span className="text-stone-800 dark:text-stone-200 font-semibold">Privacy Policy</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-700 dark:bg-stone-300 rounded-full mb-6">
              <svg className="w-8 h-8 text-white dark:text-stone-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="font-fira-sans text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
              How we protect and use your personal information
            </p>
            <div className="mt-4 text-sm text-stone-500 dark:text-stone-400">
              Last updated: January 2025
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-stone-800 rounded-lg shadow-lg border border-stone-200 dark:border-stone-700 overflow-hidden">
            <div className="p-8 space-y-12">
              
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">🛡️</span>
                  Our Commitment to Privacy
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    At Jagjit Kaur, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    We respect your privacy rights and strive to maintain transparency about our data practices. By using our services, you consent to the collection and use of information as described in this policy.
                  </p>
                </div>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Information We Collect
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-6">
                  
                  <div className="bg-stone-100 dark:bg-stone-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-3">Personal Information</h3>
                    <ul className="text-stone-700 dark:text-stone-300 space-y-2">
                      <li>• Name and contact information (phone number, email address)</li>
                      <li>• Shipping and billing addresses</li>
                      <li>• Payment information (processed securely through third-party providers)</li>
                      <li>• WhatsApp messages and communication history</li>
                      <li>• Purchase history and preferences</li>
                    </ul>
                  </div>

                  <div className="bg-stone-100 dark:bg-stone-700 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-3">Technical Information</h3>
                    <ul className="text-stone-700 dark:text-stone-300 space-y-2">
                      <li>• Device information (type, operating system, browser)</li>
                      <li>• IP address and location data</li>
                      <li>• Website usage patterns and analytics</li>
                      <li>• Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  How We Use Your Information
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-stone-100 dark:bg-stone-700 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-3">Order Processing</h3>
                      <ul className="text-stone-700 dark:text-stone-300 space-y-2 text-sm">
                        <li>• Process and fulfill your orders</li>
                        <li>• Communicate about order status</li>
                        <li>• Handle payments and billing</li>
                        <li>• Arrange shipping and delivery</li>
                      </ul>
                    </div>
                    
                    <div className="bg-stone-100 dark:bg-stone-700 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-3">Customer Service</h3>
                      <ul className="text-stone-700 dark:text-stone-300 space-y-2 text-sm">
                        <li>• Respond to inquiries and support requests</li>
                        <li>• Process returns and exchanges</li>
                        <li>• Provide product recommendations</li>
                        <li>• Improve our products and services</li>
                      </ul>
                    </div>

                    <div className="bg-stone-100 dark:bg-stone-700 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-3">Marketing (Optional)</h3>
                      <ul className="text-stone-700 dark:text-stone-300 space-y-2 text-sm">
                        <li>• Send promotional offers (with consent)</li>
                        <li>• Share new collection updates</li>
                        <li>• Provide personalized recommendations</li>
                        <li>• Newsletter communications</li>
                      </ul>
                    </div>

                    <div className="bg-stone-100 dark:bg-stone-700 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-3">Website Improvement</h3>
                      <ul className="text-stone-700 dark:text-stone-300 space-y-2 text-sm">
                        <li>• Analyze website usage and performance</li>
                        <li>• Enhance user experience</li>
                        <li>• Troubleshoot technical issues</li>
                        <li>• Develop new features</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Information Sharing */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Information Sharing
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-4">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    <strong>We do not sell, trade, or rent your personal information to third parties.</strong> We may share your information only in the following limited circumstances:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-stone-500 pl-4">
                      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">Service Providers</h3>
                      <p className="text-stone-700 dark:text-stone-300">
                        Trusted third-party services that help us operate our business (payment processors, shipping companies, analytics providers) under strict confidentiality agreements.
                      </p>
                    </div>

                    <div className="border-l-4 border-stone-500 pl-4">
                      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">Legal Requirements</h3>
                      <p className="text-stone-700 dark:text-stone-300">
                        When required by law, court order, or government regulation, or to protect our rights, property, or safety.
                      </p>
                    </div>

                    <div className="border-l-4 border-stone-500 pl-4">
                      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">Business Transfers</h3>
                      <p className="text-stone-700 dark:text-stone-300">
                        In the event of a merger, acquisition, or sale of all or part of our business, customer information may be transferred as part of the transaction.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                  Data Security
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-4">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-stone-100 dark:bg-stone-700 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Technical Safeguards
                      </h3>
                      <ul className="text-stone-700 dark:text-stone-300 space-y-2 text-sm">
                        <li>• SSL encryption for data transmission</li>
                        <li>• Secure hosting infrastructure</li>
                        <li>• Regular security updates</li>
                        <li>• Firewall protection</li>
                      </ul>
                    </div>

                    <div className="bg-stone-100 dark:bg-stone-700 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Access Controls
                      </h3>
                      <ul className="text-stone-700 dark:text-stone-300 space-y-2 text-sm">
                        <li>• Limited access to personal data</li>
                        <li>• Employee confidentiality agreements</li>
                        <li>• Regular access reviews</li>
                        <li>• Secure payment processing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                  Your Privacy Rights
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-4">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    You have several rights regarding your personal information. Contact us to exercise any of these rights:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-stone-100 dark:bg-stone-700 p-4 rounded-lg">
                      <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">Access & Portability</h3>
                      <p className="text-stone-700 dark:text-stone-300 text-sm">Request a copy of your personal data we hold</p>
                    </div>
                    
                    <div className="bg-stone-100 dark:bg-stone-700 p-4 rounded-lg">
                      <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">Correction</h3>
                      <p className="text-stone-700 dark:text-stone-300 text-sm">Update or correct inaccurate information</p>
                    </div>
                    
                    <div className="bg-stone-100 dark:bg-stone-700 p-4 rounded-lg">
                      <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">Deletion</h3>
                      <p className="text-stone-700 dark:text-stone-300 text-sm">Request deletion of your personal data</p>
                    </div>
                    
                    <div className="bg-stone-100 dark:bg-stone-700 p-4 rounded-lg">
                      <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">Opt-out</h3>
                      <p className="text-stone-700 dark:text-stone-300 text-sm">Unsubscribe from marketing communications</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cookies and Tracking */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
                  Cookies and Tracking
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none space-y-4">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    We use cookies and similar tracking technologies to enhance your browsing experience and analyze website performance.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-stone-100 dark:bg-stone-700 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-3">Types of Cookies We Use</h3>
                      <div className="space-y-3 text-stone-700 dark:text-stone-300">
                        <div>
                          <strong>Essential Cookies:</strong> Required for website functionality and security
                        </div>
                        <div>
                          <strong>Analytics Cookies:</strong> Help us understand how visitors use our site
                        </div>
                        <div>
                          <strong>Preference Cookies:</strong> Remember your settings and preferences
                        </div>
                        <div>
                          <strong>Marketing Cookies:</strong> Used to show relevant advertisements (with consent)
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                      You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.
                    </p>
                  </div>
                </div>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">7</span>
                  Children's Privacy
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                  </p>
                </div>
              </section>

              {/* Updates to Privacy Policy */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">8</span>
                  Updates to This Policy
                </h2>
                <div className="prose prose-stone dark:prose-invert max-w-none">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-full flex items-center justify-center text-sm font-bold mr-3">9</span>
                  Contact Us About Privacy
                </h2>
                <div className="bg-stone-100 dark:bg-stone-700 p-6 rounded-lg">
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
                  </p>
                  <div className="space-y-3 text-stone-700 dark:text-stone-300">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <div>
                        <strong>WhatsApp:</strong> +91 7363961142
                        <div className="text-sm text-stone-600 dark:text-stone-400">Fastest response for privacy inquiries</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <strong>Email:</strong> privacy@jagjitkaur.com
                        <div className="text-sm text-stone-600 dark:text-stone-400">For detailed privacy requests</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      <strong>Website:</strong> jagjitkaur.com
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-stone-200 dark:bg-stone-800 rounded-lg">
                    <p className="text-sm text-stone-700 dark:text-stone-300">
                      <strong>Response Time:</strong> We aim to respond to all privacy-related inquiries within 48 hours. For urgent matters, please use WhatsApp for faster assistance.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/terms" className="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
                Terms of Service
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