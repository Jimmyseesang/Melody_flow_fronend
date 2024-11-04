/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                pinky: {
                    100: '#ffa6fc',
                    200: '#ffa8b7',
                    300: '#ff76d8',
                    400: '#fc68dc',
                    500: '#ff59c7',
                },
                black: {
                    100: '#111111',
                    200: '#262626',
                },
            },
            fontFamily: {
                supakan: ["Oxanium", "sans-serif"]
            },
            flex: {
                '2': '1 0 100%'
            },
            keyframes: {
                spin: {
                    'from': { transform: 'rotate(0deg)' },
                    'to': { transform: 'rotate(360deg)' }
                },
                hide: {
                    'from': {transform: 'translateX(0)'},
                    'to': {transform: 'translateX(-80px)'}
                },
                appear: {
                    'from' : {opacity: '0'},
                    'to' : {opacity: '1'}
                }

            },
            animation: {
                spin: 'spin 1s linear infinite',
                spin1: 'spin 30s linear infinite',
                hide: 'hide 30s ease-in-out forwards',
                appear: 'appear 1s linear forwards'
            }

        },
    },
    plugins: [],
}
