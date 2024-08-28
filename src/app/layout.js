import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProtectedContent from "@/app/components/ComponentLock";
import Script from 'next/script';

export const metadata = {
  title: 'Windrose Video Uploader | Free Marketing Content for NPOs',
  description: 'Empowering Non-Profit Organizations with free, professional marketing content. Upload raw footage, get polished videos, and amplify your message.',
  keywords: 'NPO, non-profit, video editing, marketing, free content, social media, St. Louis, philanthropy',
  openGraph: {
    title: 'Windrose Video Uploader | Free Marketing Content for NPOs',
    description: 'Empowering Non-Profit Organizations with free, professional marketing content. Upload raw footage, get polished videos, and amplify your message.',
    url: 'https://www.windrose.dev',
    siteName: 'Windrose Video Uploader',
    images: [
      {
        url: '/windroselogo.svg', // Replace with your actual OG image
        width: 1200,
        height: 630
      }
    ],
    locale: 'en_US',
    type: 'website',
    manifest: '/manifest.json'
  }
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
            <Script
          async
          strategy="beforeInteractive"
          data-website-id="f01872f9-a742-4250-9f16-69736c147028"
          src="https://umami-windrose.vercel.app/script.js"
        />
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#317873", // myrtle-green
            colorText: "#2B3D4F", // gunmetal
            colorBackground: "#FFEFD5", // papaya-whip
            colorInputBackground: "#FFFFFF",
            colorInputText: "#2B3D4F", // gunmetal
            colorInputBorder: "#317873", // myrtle-green
            borderRadius: "0.5rem",
          },
          elements: {
            formButtonPrimary:
              "bg-myrtle-green hover:bg-myrtle-green-light text-papaya-whip font-montserrat font-bold py-2 px-4 rounded transition duration-300",
            socialButtonsBlockButton:
              "bg-white border-myrtle-green hover:bg-papaya-whip hover:border-myrtle-green-light text-gunmetal hover:text-palatinate",
            socialButtonsBlockButtonText: "font-montserrat font-semibold",
            formButtonReset:
              "bg-white border border-solid border-myrtle-green hover:bg-papaya-whip hover:border-myrtle-green-light text-gunmetal hover:text-palatinate",
            membersPageInviteButton:
              "bg-myrtle-green hover:bg-myrtle-green-light text-papaya-whip font-montserrat font-bold py-2 px-4 rounded transition duration-300",
            card: "bg-papaya-whip shadow-md",
            formFieldLabel: "font-lora text-palatinate",
            formFieldInput: "font-hind text-gunmetal",
          },
        }}
      >
        <body className={`min-h-screen flex flex-col antialiased bg-papaya-whip text-gunmetal font-montserrat`}>
          <Navbar />
          <ProtectedContent>
            {children}
          </ProtectedContent>
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}