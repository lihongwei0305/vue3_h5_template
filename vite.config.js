import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import path from "path";
import legacy from '@vitejs/plugin-legacy'
// https://vitejs.dev/config/

let config = {
    plugins: [
        vue(),
        DefineOptions(),
        legacy({
            targets: ['defaults', 'ie >= 11', 'chrome 52'],  //需要兼容的目标列表，可以设置多个
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            renderLegacyChunks: true,
            polyfills: [
                'es.symbol',
                'es.array.filter',
                'es.promise',
                'es.promise.finally',
                'es/map',
                'es/set',
                'es.array.for-each',
                'es.object.define-properties',
                'es.object.define-property',
                'es.object.get-own-property-descriptor',
                'es.object.get-own-property-descriptors',
                'es.object.keys',
                'es.object.to-string',
                'web.dom-collections.for-each',
                'esnext.global-this',
                'esnext.string.match-all'
            ]
        })
    ],
    resolve: {
        extensions: [".vue", ".js"],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@com': path.resolve(__dirname, 'src/components'),
        },
    },
    server: {
        port: 5000,
        proxy: {
            '/api': {
                target: `http://10.12.254.168/api/`,   // 代理接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',    // 代理的路径
                },
            },
        }
    }
}

export default defineConfig(config)


