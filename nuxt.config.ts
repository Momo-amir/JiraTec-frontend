// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },

	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:5155", // Use default if not set
		},
	},
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@pinia/nuxt"],

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
				},
			},

			plugins: [require("daisyui")],
			daisyui: {
				themes: ["light", "dark", "cupcake"],
			},
		},
	},
});
