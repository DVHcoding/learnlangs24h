/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                title: ['Montserrat', 'sans-serif'],
                body: ['QuickSand', 'sans-serif'],
                segoe: ['Segoe UI', 'sans-serif'],
            },
            screens: {
                sm: { max: '768px' },
                phone: { max: '470px' },
                pm: { min: '471px', max: '639px' },
                tablet: { min: '575px', max: '768px' },
            },
            colors: {
                bgCustom: 'var(--bg-custom)',
                bgCustomProcess: 'var(--bg-custom-process)',
                bgCustomGroup: 'var(--bg-custom-group)',
                bgCustomCard: 'var(--bg-custom-card)',
                bgCustomCardItem: 'var(--bg-custom-card-item)',
                bgHoverGrayDark: 'var(--bgHover-gray-dark)',
                textCustom: 'var(--text-custom)',
                textSidebar: 'var(--text-sidebar)',
                textCustomProcess: 'var(--text-custom-process)',
                textCustomFeatures: 'var(--text-custom-features)',
                textCustomName: 'var(--text-custom-name)',
                textCustomGray: 'var(--text-custom-gray)',
                textBlackGray: 'var(--text-black-gray)',
                bdCustom: 'var(--border-custom)',
                bdCustom2: 'var(--border-custom-2)',
            },
        },
    },
    plugins: [],
};
