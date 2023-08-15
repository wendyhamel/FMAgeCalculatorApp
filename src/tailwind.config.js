tailwind.config = {
	theme: {
		fontFamily: {
			'sans': ['Poppins', 'sans-serif']
		},
		extend: {
			fontSize: {
				'3.5xl': '2rem',
				'5.5xl': ['3.5rem', {lineHeight: '3.8rem'}],
			},
			colors: {
				'purple': 'hsl(259, 100%, 65%)',
				'red': 'hsl(0, 100%, 67%)',
				'white': 'hsl(0, 0%, 100%)',
				'off-white': 'hsl(0, 0%, 94%)',
				'light-grey': 'hsl(0, 0%, 86%)',
				'smokey-grey': 'hsl(0, 1%, 44%)',
				'off-black': 'hsl(0, 0%, 8%)',
			},
		}
	}
}