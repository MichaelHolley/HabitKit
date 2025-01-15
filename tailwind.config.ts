import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				xs: '480px'
			}
		}
	},
	daisyui: {
		themes: ['dim']
	},
	plugins: [daisyui]
} satisfies Config;
