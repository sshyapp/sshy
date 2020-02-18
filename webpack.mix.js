const mix = require('laravel-mix');

mix.js('src/renderer/app.js', 'dist/');
mix.setPublicPath('dist');
