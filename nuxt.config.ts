// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:5155", // Use default if not set
		},
	},
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
	googleFonts: {
		families: {
			Poppins: [400, 500, 600, 700],
			"Open Sans": [400, 600, 700],
		},
	},

	tailwindcss: {
		config: {
			theme: {
				extend: {
					colors: {
						primary: {
							DEFAULT: "#14213D", // Customize your primary color
							light: "#6cb2eb", // Lighter shade for primary
							dark: "#1d72b8", // Darker shade for primary
						},
						secondary: {
							DEFAULT: "#ffed4a", // Customize your secondary color
							light: "#fff9c2", // Lighter shade for secondary
							dark: "#f9d71c", // Darker shade for secondary
						},
						accent: {
							DEFAULT: "#38c172", // Customize your accent color
							light: "#51d88a", // Lighter shade for accent
							dark: "#1f9d55", // Darker shade for accent
						},
						base: {
							DEFAULT: "#ffffff", // Customize your base color
							light: "#f7fafc", // Lighter base
							dark: "#e2e8f0", // Darker base
						},
					},
					fontFamily: {
						sans: ["Poppins", "sans-serif"], // Customize your desired fonts
						serif: ["Open sans", "serif"],
						// Add more custom fonts here
					},
					fontSize: {
						xs: "0.75rem", // 12px
						sm: "0.875rem", // 14px
						base: "1rem", // 16px
						lg: "1.125rem", // 18px
						xl: "1.25rem", // 20px
						"2xl": "1.5rem", // 24px
						h3: "clamp(1.25rem, 1vw + 0.75rem, 1.75rem);",
						h2: "clamp(1.563rem, 1vw + 1rem, 2rem);",
						h1: "clamp(2rem, 2vw + 1rem, 3rem);",
						"6xl": "4rem", // 64px
						// Add more custom font sizes here
					},
					safelist: ["bg-primary", "bg-secondary", "bg-accent", "text-primary", "text-secondary", "text-accent"],
				},
			},
		},
	},
});
