<template>
    <div id="app">
        <main>
            <router-view></router-view>
        </main>
        <AppFooter></AppFooter>
    </div>
</template>

<script>
    import AppFooter from './components/Footer'

    export default {
        name: 'sshy',
        components: {
            AppFooter
        }
    }
</script>

<style lang="scss">
    @import 'assets/sass/app';
</style>
