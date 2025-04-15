'use client';

import Image from "next/image";
import { motion } from 'framer-motion';
import { useState } from 'react';

// Animation variants for sections
const sectionVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number = 1) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.2,
			duration: 0.5,
			ease: "easeOut",
		},
	}),
};

// Define type for language keys
type Language = 'en' | 'ru';

// Define structure for translations
interface TranslationContent {
	heroTitle: string;
	heroSubtitle: string;
	installButton: string;
	installTooltip: string;
	featuresTitle: string;
	feature1: string;
	feature2: string;
	feature3: string;
	feature4: string;
	feature5: string;
	feature6: string;
	quoteText: string;
	quoteAuthor: string;
	mobileTitle: string;
	androidStatus: string;
	iosStatus: string;
	footerMadeWith: string;
	footerCoffee: string;
	footerCopyright: string;
	footerInstallButton: string;
	socialTwitter: string;
	socialGitHub: string;
	socialBlog: string;
	socialInstagram: string;
}

// Translations object with type
const translations: Record<Language, TranslationContent> = {
	en: {
		heroTitle: "Crushing it is overrated.",
		heroSubtitle: "Click the button. Get the credit. Continue existing.",
		installButton: "Install Extension",
		installTooltip: "It's okay, we won't tell anyone.",
		featuresTitle: "What It Does (Basically Nothing)",
		feature1: "One daily button for existing",
		feature2: "Ironic compliments",
		feature3: "Emotional validation streaks",
		feature4: "Emergency mode for existential spirals",
		feature5: "Barely useful daily tips",
		feature6: "No charts, no pressure, no guilt",
		quoteText: "You didn't do much. But you did something.",
		quoteAuthor: "— Bare Minimum Hero",
		mobileTitle: "Also Available On... Well, Not Yet",
		androidStatus: "Android: Coming Soon™",
		iosStatus: "iOS: Coming...ish",
		footerMadeWith: "Made with apathy and love.",
		footerCoffee: "Built in under 2 coffees.",
		footerCopyright: "© Bare Minimum Hero, 2025",
		footerInstallButton: "Install the Damn Extension",
		socialTwitter: "Twitter",
		socialGitHub: "GitHub",
		socialBlog: "Blog",
		socialInstagram: "Instagram",
	},
	ru: {
		heroTitle: "Ты не победил, но и не исчез. Уже хорошо.",
		heroSubtitle: "Нажми кнопку. Получи похвалу. Продолжай существовать.",
		installButton: "Установить расширение",
		installTooltip: "Всё в порядке, мы никому не скажем.",
		featuresTitle: "Что умеет (почти ничего)",
		feature1: "Одна кнопка в день — для тех, кто существует",
		feature2: "Ироничные комплименты",
		feature3: "Серии выживания с наградами",
		feature4: "Экстренный режим на случай внутреннего шторма",
		feature5: "Ежедневные \"почти советы\"",
		feature6: "Без графиков, без вины, без KPI",
		quoteText: "Ты сделал немного. Но ты сделал что-то.",
		quoteAuthor: "— Bare Minimum Hero",
		mobileTitle: "Скоро и на... Ну, когда-нибудь",
		androidStatus: "Android: Скоро (надеемся)",
		iosStatus: "iOS: Когда-нибудь... может быть",
		footerMadeWith: "Создано с апатией и теплом",
		footerCoffee: "Собрано меньше чем за 2 чашки кофе.",
		footerCopyright: "© Bare Minimum Hero, 2025",
		footerInstallButton: "Установи это чёртово расширение",
		socialTwitter: "Twitter",
		socialGitHub: "GitHub",
		socialBlog: "Блог",
		socialInstagram: "Инстаграм",
	},
};

export default function Home() {
	const [language, setLanguage] = useState<Language>('en'); // Explicitly type state
	const t = translations[language]; // Access is now type-safe

	return (
		<div className="min-h-screen bg-[#f9f6f1] text-[#333] flex flex-col items-center font-sans overflow-x-hidden relative">

			{/* Language Switcher */}
			<div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex gap-3">
				<button
					onClick={() => setLanguage('en')}
					className={`text-sm font-medium ${language === 'en' ? 'text-black underline' : 'text-gray-500 hover:text-black'} transition-colors`}
				>
					EN
				</button>
				<button
					onClick={() => setLanguage('ru')}
					className={`text-sm font-medium ${language === 'ru' ? 'text-black underline' : 'text-gray-500 hover:text-black'} transition-colors`}
				>
					RU
				</button>
			</div>

			{/* 1. Hero Section */}
			<section className="w-full flex flex-col items-center justify-center text-center px-4 py-16 md:pt-24 md:pb-20 bg-[#f9f6f1]">
				<motion.div
					className="max-w-2xl"
					initial="hidden"
					animate="visible"
					custom={1}
					variants={sectionVariants}
				>
					<Image
						src="/images/BMH_Logo_trans.png"
						alt="Bare Minimum Hero Logo - a tired star holding coffee"
						width={150}
						height={150}
						className="mx-auto mb-8"
						priority
					/>
					<h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
						{t.heroTitle}
					</h1>
					<p className="text-lg md:text-xl mb-8 text-gray-700">
						{t.heroSubtitle}
					</p>
					<a
						href="https://chromewebstore.google.com/detail/kgfbfabodbchkinlehamabjkknenhpdb?utm_source=item-share-cb"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block bg-[#ffcc70] text-black font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#f7c060] hover:scale-105 transition-all duration-200 ease-in-out"
						title={t.installTooltip}
					>
						{t.installButton}
					</a>
				</motion.div>
			</section>

			{/* 2. "What It Does" Section - Using translations */}
			<motion.section
				className="w-full max-w-3xl px-4 py-16 md:py-20 text-center md:text-left"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				custom={2}
				variants={sectionVariants}
			>
				<h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">{t.featuresTitle}</h2>
				<ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-lg list-none p-0">
					<li className="flex items-start space-x-3 text-left">
						<span className="text-xl text-green-600 mt-1">✅</span>
						<span>{t.feature1}</span>
					</li>
					<li className="flex items-start space-x-3 text-left">
						<span className="text-xl text-green-600 mt-1">✅</span>
						<span>{t.feature2}</span>
					</li>
					<li className="flex items-start space-x-3 text-left">
						<span className="text-xl text-green-600 mt-1">✅</span>
						<span>{t.feature3}</span>
					</li>
					<li className="flex items-start space-x-3 text-left">
						<span className="text-xl text-green-600 mt-1">✅</span>
						<span>{t.feature4}</span>
					</li>
					<li className="flex items-start space-x-3 text-left">
						<span className="text-xl text-green-600 mt-1">✅</span>
						<span>{t.feature5}</span>
					</li>
					<li className="flex items-start space-x-3 text-left">
						<span className="text-xl text-red-500 mt-1">🚫</span>
						<span>{t.feature6}</span>
					</li>
				</ul>
			</motion.section>

			{/* 5. Quote Section - Using translations */}
			<motion.section
				className="w-full bg-gray-100 px-4 py-12 md:py-16 text-center"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.5 }}
				custom={3}
				variants={sectionVariants}
			>
				<blockquote className="max-w-xl mx-auto text-xl md:text-2xl italic text-gray-700 my-6 md:my-8">
					&quot;{t.quoteText}&quot;
					<br />
					<span className="mt-2 text-base not-italic text-gray-500 block">{t.quoteAuthor}</span>
				</blockquote>
			</motion.section>

			{/* 3. Mobile Coming Soon Section - Using translations */}
			<motion.section
				className="w-full max-w-3xl px-4 py-16 md:py-20 text-center"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				custom={4}
				variants={sectionVariants}
			>
				<h2 className="text-3xl md:text-4xl font-semibold mb-10">{t.mobileTitle}</h2>
				<div className="flex justify-center items-start gap-12 md:gap-20">
					<div className="flex flex-col items-center">
						<Image
							src="/images/bearminimumhero-android.png"
							alt="Bare Minimum Hero Android app placeholder"
							width={100}
							height={100}
							className="mb-2 opacity-50"
						/>
						<p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t.androidStatus.replace('™', '<sup>™</sup>') }}></p> {/* Handle TM symbol */}
					</div>
					<div className="flex flex-col items-center">
						<Image
							src="/images/bearminimumhero-ios.png"
							alt="Bare Minimum Hero iOS app placeholder"
							width={100}
							height={100}
							className="mb-2 opacity-50"
						/>
						<p className="text-gray-600">{t.iosStatus}</p>
					</div>
				</div>
			</motion.section>

			{/* 4. Footer - Using translations */}
			<motion.footer
				className="w-full bg-[#f3f0e8] text-gray-700 px-4 py-8 mt-16 text-center"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				custom={5}
				variants={sectionVariants}
			>
				<div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
					<div className="flex gap-6">
						<a href="https://x.com/skazoff" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">{t.socialTwitter}</a>
						<a href="https://github.com/MaxBasev" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">{t.socialGitHub}</a>
						<a href="https://skazoff.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">{t.socialBlog}</a>
						<a href="https://instagram.com/maxbasev" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">{t.socialInstagram}</a>
					</div>
					<div className="text-sm">
						<p>{t.footerMadeWith} {t.footerCoffee}</p>
						<p className="mt-2">{t.footerCopyright}</p>
						<a
							href="https://chromewebstore.google.com/detail/kgfbfabodbchkinlehamabjkknenhpdb?utm_source=item-share-cb"
							target="_blank"
							rel="noopener noreferrer"
							className="block mt-3 text-sm text-[#ffcc70] hover:text-[#f7c060] font-semibold transition-colors"
						>
							{t.footerInstallButton}
						</a>
					</div>
				</div>
			</motion.footer>
		</div>
	);
}
