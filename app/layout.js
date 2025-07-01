import { Inter, Fira_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from '../components/FloatingWhatsApp';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Jagjit Kaur | Handcrafted Indian Fashion",
  description: "Discover minimal, elegant sarees and Indian wear by Jagjit Kaur. Handloom, custom, and bridalwear handcrafted with love.",
  keywords: ["saree", "kurti", "bridalwear", "handloom", "Indian fashion", "Jagjit Kaur"],
  openGraph: {
    title: "Jagjit Kaur | Modern Indian Fashion",
    description: "Elegance in every thread. Explore handcrafted sarees and bridalwear.",
    url: "https://jkbyjagjitkaur.com",
    siteName: "Jagjit Kaur",
    images: [
      {
        // url: "https://res.cloudinary.com/<your-cloud>/image/upload/vXXXXXXX/og-image.jpg", // your OG image
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Jagjit Kaur Saree Collection",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jagjit Kaur | Handcrafted Fashion",
    description: "Luxury sarees and bridalwear handcrafted for modern elegance.",
    // images: ["https://res.cloudinary.com/<your-cloud>/image/upload/vXXXXXXX/og-image.jpg"],
    images: ["images/logo.png"]
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaSans.variable} ${dmSerif.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        suppressContentEditableWarning
      >
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}