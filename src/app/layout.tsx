import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Bare Minimum Hero - Crushing it is overrated.",
	description: "A Chrome extension that rewards you for doing the absolute least. Celebrate your smallest achievements.",
	openGraph: {
		title: "Bare Minimum Hero",
		description: "A Chrome extension that rewards you for doing the absolute least.",
		images: [
			{
				url: '/images/BMH_Logo_trans.png',
				width: 512,
				height: 512,
				alt: 'Bare Minimum Hero Logo',
			},
		],
		url: 'YOUR_WEBSITE_URL',
		siteName: 'Bare Minimum Hero',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: "Bare Minimum Hero",
		description: "A Chrome extension that rewards you for doing the absolute least.",
		images: ['/images/BMH_Logo_trans.png'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className={`font-sans antialiased`}>
				{children}
			</body>
		</html>
	);
}
