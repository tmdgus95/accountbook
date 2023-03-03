/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: { main: "#fbe300" },
            spacing: {
                maincard: "1020px",
                login: "749px",
                mypapge: "749px",
            },
            backgroundImage: {
                couplemain: "url('images/background.jpg')",
            },
        },
    },
    plugins: [],
};
