import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/site.css',
                'resources/js/about.js',
                'resources/js/contact.js',
                'resources/js/evenementen.js',
                'resources/js/fotoalbums.js',
                'resources/js/home.js',
                'resources/js/site.js',
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: [
                '**/storage/framework/views/**',
                '**/storage/statamic/**',
            ],
        },
    },
});
