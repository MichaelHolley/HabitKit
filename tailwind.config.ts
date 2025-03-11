import type { Config } from 'tailwindcss';

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
	}
} satisfies Config;
