const mix = require('laravel-mix');

mix.js('src/renderer/app.js', 'dist/');
mix.sass('src/renderer/sass/app.scss', 'dist/');
mix.setPublicPath('dist');
