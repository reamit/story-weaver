import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StoryWeaver - AI Children's Story Generator",
  description: "Create personalized children's stories with AI-generated illustrations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=Modak&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}