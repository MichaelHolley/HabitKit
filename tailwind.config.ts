import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				xs: '480px'
			},
			fontSize: {
				'2xs': '.5rem'
			}
		}
	},
	daisyui: {
		themes: ['dim']
	},
	plugins: [daisyui]
} satisfies Config;
