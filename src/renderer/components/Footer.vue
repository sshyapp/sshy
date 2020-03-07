<template>
    <footer class="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
        <div class="container">

            <button class="btn btn-link btn-sm btn-outline-primary text-decoration-none"
                    v-on:click="refresh">
                Refresh
            </button>

            <button class="btn btn-link btn-sm btn-outline-primary text-decoration-none"
                    v-on:click="openModal">
                New
            </button>

        </div>
    </footer>
</template>

<script>
    import { ipcRenderer } from 'electron'

    export default {
        name: 'app-footer',
        methods: {
            refresh: () => {
                ipcRenderer.send('hey-backend-please-send-me-ssh-keys')
            },

            openModal: () => {
                $('#new-modal').modal('show')
            }
        }
    }
</script>
