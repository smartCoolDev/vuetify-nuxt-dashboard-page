<template>
<v-snackbar color="amber black--text" :timeout="3500" top v-model="snackbar">
    <span>Account succesfuly created!</span>
    <v-btn flat class="black--text" @click="snackbar = false">Close</v-btn>
</v-snackbar>
</template>

<script>
import { EventBus } from '@/eventbus.js';

export default {
    name: 'Snackbar2',
    data() {
        return {
            snackbar: false
        }
    },
    mounted() {
        EventBus.$on('accountCreated', () => this.snackbar = true)
    }
}
</script>
