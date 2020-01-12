<template>
<v-snackbar color="amber black--text" :timeout="3500" top v-model="snackbar">
    <span>The new project has been created.</span>
    <v-btn flat class="black--text" @click="snackbar = false">Close</v-btn>
</v-snackbar>
</template>

<script>
import { EventBus } from '@/eventbus.js';

export default {
    name: 'Snackbar',
    data() {
        return {
            snackbar: false
        }
    },
    mounted() {
        EventBus.$on('switchSnackbar', state => this.snackbar = state)
    }
}
</script>
