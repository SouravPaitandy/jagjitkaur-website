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
  title: {
    template: '%s | Jagjit Kaur',
    default: 'Jagjit Kaur | Handcrafted Indian Fashion',
  },
  description: "Discover minimal, elegant sarees and Indian wear by Jagjit Kaur. Handloom, custom, and bridalwear handcrafted with love.",
  keywords: ["saree", "kurti", "bridalwear", "handloom", "Indian fashion", "Jagjit Kaur"],
  openGraph: {
    title: "Jagjit Kaur | Modern Indian Fashion",
    description: "Elegance in every thread. Explore handcrafted sarees and bridalwear.",
    url: "https://jkbyjagjitkaur.com",
    siteName: "Jagjit Kaur",
    images: [
      {
        url: "/images/logo.png", // More descriptive filename
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
    images: ["/images/logo.png"] // Full path with more descriptive filename
  },
  icons: {
    icon: [
      { url: "/images/favicon.ico" },
      { url: "/images/favicon.ico", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-alt.ico", sizes: "32x32", type: "image/png" } // Windows taskbar icon
    ],
    apple: [
      { url: "/images/icon.png", sizes: "180x180", type: "image/png" }
    ],
    // other: [
    //   { rel: "mask-icon", url: "/images/safari-pinned-tab.svg", color: "#5bbad5" }
    // ]
  }
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