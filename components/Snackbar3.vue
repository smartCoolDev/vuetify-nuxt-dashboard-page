<template>
<v-snackbar color="primary red--text" :timeout="2500" top v-model="snackbar">
    <span>{{err_msg}}</span>
    <v-btn flat class="secondary--text" @click="snackbar = false">Close</v-btn>
</v-snackbar>
</template>

<script>
import { EventBus } from '@/eventbus.js';

export default {
    name: 'Snackbar3',
    data() {
        return {
            snackbar: false,
            err_msg: ''
        }
    },
    mounted() {
        EventBus.$on('invalidForm', (error) => {
            this.err_msg = error;
            this.snackbar = true;
        }) 
    }
}
</script>