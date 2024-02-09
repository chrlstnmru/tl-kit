/** @type {import('tailwindcss').Config}*/
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				overpass: ['Overpass', 'sans-serif']
			}
		}
	},

	plugins: []
};
