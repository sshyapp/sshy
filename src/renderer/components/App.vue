<template>
    <main>
        <div>{{ name }}</div>
        <footer class="container-fluid">

            <button class="btn btn-link btn-sm" v-on:click="requestKeys">
                Refresh
            </button>

            <button class="btn btn-link btn-sm" id="new-key-modal">
                New
            </button>

        </footer>
    </main>
</template>

<script>

    export default {

        created() {
            // this.requestKeys();
        },

        data() {
            return {
                name: 'Yeah BOIIIIII'
            }
        },

        methods: {
            requestKeys() {
                ipcRenderer.send('hey-backend-please-send-me-ssh-keys');
            }
        }
    }
</script>

<style>
    @import './../../../dist/app.css';
</style>
