export default {
    plugins: {
        'postcss-px-to-viewport': {
            viewportWidth: 750,
            exclude: [/node_modules/, /\/src\/assets\//, /index.html/],
            include: [/\/src\/view\//, /\/src\/components\//]
        }
    }
}