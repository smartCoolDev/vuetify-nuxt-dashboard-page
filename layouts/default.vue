<template>
  <v-app class="grey darken-3">
    <Snackbar />
    <Snackbar2 />
    <Snackbar4 />
    <Navbar />
    <v-content class="ml-5 mt-5">
      <router-view></router-view>
    </v-content>
    <Drawer />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Drawer from '@/components/Drawer.vue';
import Snackbar from '@/components/Snackbar.vue';
import Snackbar2 from '@/components/Snackbar2.vue';
import Snackbar4 from '@/components/Snackbar4.vue';
import { auth, db } from '~/plugins/fb.js';
import { EventBus } from '@/eventbus.js';

export default {
  components: {
    Navbar,
    Drawer,
    Snackbar,
    Snackbar2,
    Snackbar4
  },
  data() {
    return {
      loggedIn: null,
      loggedOut: null
    }
  },
  mounted() {
    auth.onAuthStateChanged( (user) => {
      if (user) {
        this.loggedIn = true;
        this.loggedOut = false;
        EventBus.$emit('loginStatus', this.loggedIn, this.loggedOut, user.email)
      }
      else {
        this.loggedIn = false;
        this.loggedOut = true;
        EventBus.$emit('loginStatus', this.loggedIn, this.loggedOut)
      }
      
    }),
      EventBus.$on('loginStatus', (logIn, logOut, email) => {
      this.loggedIn = logIn;
      this.loggedOut = logOut;
      if (this.loggedIn) {
          let avatar = '';
          let name = '';
          console.log('in')
          db.collection('users').onSnapshot(res => {
              const changes = res.docChanges();
              changes.forEach((change) => {
                      if (change.doc.data().email === email) {
                          avatar = change.doc.data().avatar;
                          name = change.doc.data().name;
                          EventBus.$emit('loginData', name, avatar)
                          return true
                  }
              })
          })
      }
    })
    
  },
}

</script>

<style>
body::-webkit-scrollbar {
  width: 1em;
}

body::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.8);
}

body::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 5px;
  box-shadow: inset 0 0 15px black;
}

body::-webkit-scrollbar-thumb:hover {
  background-color: #ffc107;
}

::selection {
  color: black;
  background-color: #ffc107;
}

</style>