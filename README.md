# Jagjit Kaur - Heritage Fashion Collection

A sophisticated e-commerce platform showcasing exquisite handcrafted Indian traditional wear, built with modern web technologies to deliver an exceptional user experience.

## 🌟 Project Overview

Jagjit Kaur is a premium fashion website dedicated to celebrating the timeless elegance of Indian craftsmanship. Our platform features a curated collection of sarees, lehengas, kurtas, and other traditional garments, each piece representing the finest artisanal work and cultural heritage.

## ✨ Key Features

### 🎨 **Elegant Design & User Experience**
- Responsive, mobile-first design with dark/light theme support
- Smooth animations and transitions for enhanced user engagement
- Professional typography using Fira Sans font family
- Optimized image loading with Next.js Image component

### 🛍️ **Advanced Product Showcase**
- Dynamic product filtering by category, fabric, and craftsmanship
- URL-based category navigation from hero section
- Real-time search functionality across product attributes
- Grid and list view options for product browsing
- Interactive product cards with detailed specifications

### 📱 **Modern Web Technologies**
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS for rapid, responsive design
- **Database**: Firebase Firestore for scalable data management
- **Icons**: React Icons (Feather Icons) for consistent iconography
- **Deployment**: Optimized for Vercel platform

### 🔧 **Enhanced Functionality**
- Server-side rendering for optimal SEO performance
- Suspense boundaries for smooth client-side navigation
- WhatsApp integration for direct customer communication
- Floating action buttons for improved accessibility
- Scroll-to-top functionality for better navigation

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

```bash
Node.js (version 18.0 or higher)
npm or yarn package manager
Git for version control
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/jagjitkaur-fashion.git
   cd jagjitkaur-fashion
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Firebase Admin (Server-side)
   FIREBASE_PRIVATE_KEY=your_private_key
   FIREBASE_CLIENT_EMAIL=your_client_email
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📁 Project Structure

```
jagjitkaur-site/
├── app/                    # Next.js App Router pages
│   ├── layout.js          # Root layout with navigation
│   ├── page.js            # Homepage with hero section
│   └── products/          # Product listing and filtering
├── components/            # Reusable React components
│   ├── HeroSection.js     # Dynamic hero carousel
│   ├── ProductCard.js     # Product display component
│   ├── ProductsComp.js    # Main products page logic
│   ├── NavBar.js          # Navigation component
│   └── FloatingWhatsApp.js # WhatsApp integration
├── lib/                   # Utility functions and configurations
│   ├── firebase.js        # Firebase client configuration
│   └── fetchProducts.js   # Data fetching utilities
├── public/               # Static assets
│   └── images/           # Product images and assets
└── data/                 # Static data files
```

## 🎯 Core Features Explained

### Category-Based Navigation
- Hero section links automatically filter products by category
- URL parameters maintain filter state across page refreshes
- Seamless integration between marketing content and product catalog

### Advanced Search & Filtering
- Multi-attribute search (name, fabric, craftsmanship, origin)
- Real-time filtering with visual feedback
- Responsive filter controls for mobile and desktop

### WhatsApp Integration
- Floating WhatsApp button on all pages
- Pre-formatted messages with product details
- Direct customer communication channel

### Performance Optimizations
- Server-side rendering for fast initial page loads
- Image optimization with Next.js Image component
- Lazy loading for improved performance
- Build-time static generation where possible

## 🔨 Build & Deployment

### Local Build Testing
```bash
# Build the application
npm run build

# Test the production build locally
npm start
```

### Deployment to Vercel
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Firebase Setup
1. Create a Firebase project
2. Enable Firestore database
3. Configure authentication (if needed)
4. Add your domain to authorized domains

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | React framework | 14.x |
| React | UI library | 18.x |
| Tailwind CSS | Styling framework | 3.x |
| Firebase | Backend services | 10.x |
| React Icons | Icon library | 4.x |
| Vercel | Deployment platform | Latest |

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

We welcome contributions to improve the Jagjit Kaur platform. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and structure
- Test your changes thoroughly before submitting
- Update documentation for new features
- Ensure responsive design across all devices

## 📞 Support & Contact

For technical support, feature requests, or business inquiries:

- **Website**: [jkbyjagjitkaur.com](https://jkbyjagjitkaur.com)
- **WhatsApp**: +91 7363961142
- **Instagram**: [@jagjitkaur.official](https://instagram.com/Jagjitkaur.official)
- **Email**: work@jkbyjagjitkaur.com

## 📄 License

This project is proprietary software. All rights reserved to [Jagjit Kaur](https://instagram.com/Jagjitkaur.official) Fashion House.

---

*Built with ❤️ for preserving and celebrating Indian traditional craftsmanship*

**Version**: 1.5.0  
**Last Updated**: July 2025