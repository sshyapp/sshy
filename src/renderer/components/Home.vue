<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item"
                v-for="key in keys">
                <div class="row">
                    <div class="col-9 overflow-auto">
                        {{ key.fileName }}
                        <br>
                        <small class="text-info">
                            {{ key.fullPath }}
                        </small>
                    </div>
                    <div class="col-3">
                        <div class="btn-group float-right">
                            <button class="btn btn-link btn-sm border border-white text-decoration-none dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Actions
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#"
                                   v-on:click="copy(key.publicKey)">Copy public key</a>
                                <a class="dropdown-item" href="#"
                                v-on:click="reveal(key.privateKey)">
                                    Reveal in Finder
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

        <Modal></Modal>
    </div>
</template>

<script>
    import { ipcRenderer } from 'electron'
    import Modal from './Modal';

    export default {
        name: 'home',

        components: {
            Modal
        },

        data: () => {
            return {
                keys: [],
            }
        },

        mounted () {
            ipcRenderer.send('hey-backend-please-send-me-ssh-keys')

            ipcRenderer.on('there-are-your-ssh-keys-your-welcome', (event, args) => {
                this.keys = args
            })
        },

        methods: {
            copy(publicKey) {
                ipcRenderer.send('hey-backend-please-copy-the-content-of-this-file', publicKey);
            },
            reveal(privateKey) {
                ipcRenderer.send('hey-backend-please-reveal-this-file', privateKey);
            }
        }
    }
</script>

<style>
</style>
