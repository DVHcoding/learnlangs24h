/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                title: ['Montserrat', 'sans-serif'],
                body: ['QuickSand', 'sans-serif'],
            },
            screens: {
                sm: { max: '769px' },
                phone: { max: '470px' },
                pm: { min: '471px', max: '639px' },
            },
            colors: {
                bgCustom: 'var(--bg-custom)',
                bgCustomProcess: 'var(--bg-custom-process)',
                bgCustomGroup: 'var(--bg-custom-group)',
                bgHoverGrayDark: 'var(--bgHover-gray-dark)',
                textCustom: 'var(--text-custom)',
                textSidebar: 'var(--text-sidebar)',
                textCustomProcess: 'var(--text-custom-process)',
                textCustomFeatures: 'var(--text-custom-features)',
                textCustomName: 'var(--text-custom-name)',
                textCustomGray: 'var(--text-custom-gray)',
                bdCustom: 'var(--border-custom)',
            },
        },
    },
    plugins: [],
};
