import type { Metadata, Viewport } from "next";
import { AppProvider } from "@/context/AppContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { PWAInstallBanner } from "@/components/PWAInstallBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nashik Kumbh 2027 — Official Devotee Travel Companion",
  description: "Complete digital travel & pilgrimage companion for Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027. Temples, Darshan, Stays, Shahi Snan Calendar, Free Bhandara, Local Buses, Smart Map & 24/7 Emergency SOS.",
  keywords: ["Nashik Kumbh 2027", "Trimbakeshwar Jyotirlinga", "Ram Kund Snan", "Kumbh Mela", "Devotee Companion", "Nashik Hotels", "Annadan"],
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" }
    ],
    apple: "/logo.png",
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#984300",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nashik Kumbh" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FCF9F4] text-[#1C1C19]">
        <AccessibilityProvider>
          <AppProvider>
            <AccessibilityToolbar />
            <div id="main-content" className="flex-1 flex flex-col">
              {children}
            </div>
            <PWAInstallBanner />
          </AppProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
