<template>
<v-snackbar color="amber black--text" :timeout="2500" top v-model="snackbar">
    <span>Logged in successfully!</span>
    <v-btn flat class="black--text" @click="snackbar = false">Close</v-btn>
</v-snackbar>
</template>

<script>
import { EventBus } from '@/eventbus.js';

export default {
    name: 'Snackbar4',
    data() {
        return {
            snackbar: false
        }
    },
    mounted() {
        EventBus.$on('loggedIn', () => this.snackbar = true)
    }
}
</script>
