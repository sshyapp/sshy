<template>
    <div class="modal" tabindex="-1" role="dialog" id="new-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form @submit.prevent="submit" autocomplete="off" id="new-form">
                    <div class="modal-header">
                        <h5 class="modal-title">New SSH Key</h5>
                    </div>
                    <div class="modal-body">


                        <div class="form-group">
                            <label for="name">
                                Name:
                            </label>
                            <input type="text"
                                   id="name"
                                   v-model="ssh.name"
                                   class="form-control"
                                   required>
                        </div>

                        <div class="form-group">
                            <label for="type">
                                Type:
                            </label>
                            <select id="type"
                                    v-model="ssh.type"
                                    class="form-control"
                                    required>
                                <option value="rsa" selected>Rsa</option>
                                <option value="dsa">Dsa</option>
                                <option value="ecdsa">Ecdsa</option>
                                <option value="ed25519">Ed25519</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="bits">
                                Bits:
                            </label>
                            <select id="bits"
                                    v-model.number="ssh.bits"
                                    class="form-control"
                                    required>
                                <option value="1024">1024</option>
                                <option value="2048">2048</option>
                                <option value="4096" selected>4096</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="comment">
                                Comment:
                            </label>
                            <input type="text"
                                   id="comment"
                                   v-model="ssh.comment"
                                   class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="passphrase">
                                Passphrase
                            </label>
                            <input type="password"
                                   id="passphrase"
                                   v-model="ssh.passphrase"
                                   class="form-control">
                        </div>


                    </div>
                    <div class="modal-footer">
                        <button type="button"
                                class="btn btn-secondary"
                                v-on:click="cancel">
                            Cancel
                        </button>
                        <button type="submit"
                                id="submit-btn"
                                class="btn btn-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { ipcRenderer } from 'electron'

    export default {
        name: 'modal',

        data () {
            return {
                ssh: {
                    name: null,
                    type: 'rsa',
                    bits: 4096,
                    comment: null,
                    passphrase: null,
                }
            }
        },

        methods: {
            submit () {
                const btn = $('#submit-btn')

                btn.text('Saving ...')

                const res = ipcRenderer.sendSync('hey-backend-please-create-a-new-ssh-key', this.ssh)
                if (typeof res === 'boolean') {
                    ipcRenderer.send('hey-backend-please-send-me-ssh-keys')
                    btn.text('Save')
                    this.cancel()
                    return
                }
                btn.text('Save')
                alert(res)
            },

            cancel () {
                $('#new-form').trigger('reset')
                $('#new-modal').modal('hide')
            }
        }
    }
</script>
