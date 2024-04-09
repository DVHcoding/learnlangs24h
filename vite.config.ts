import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@features': path.resolve(__dirname, './src/features'),
            '@services': path.resolve(__dirname, './src/services'),
            '@store': path.resolve(__dirname, './src/store'),
            '@types': path.resolve(__dirname, './src/types'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@admin': path.resolve(__dirname, './src/admin'),
        },
    },
    server: {
        proxy: {
            '/api/v1': {
                target: 'http://192.168.43.159:4000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
