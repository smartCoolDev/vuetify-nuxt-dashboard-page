<template>
<v-navigation-drawer app v-model="drawer" ref="nav" class="amber" :style="shadow()">
    <v-layout column nowrap align-center :class="{'mt-5': loggedIn}">
        <v-flex v-if="loggedOut">
            <v-btn depressed round color="secondary primary--text" class="mt-5" large @click="loginEvent()">Login</v-btn>
        </v-flex>
        <v-flex v-if="loggedIn">
            <v-avatar size=150>
                <img :src="avatar">
            </v-avatar>
        </v-flex>
        <v-flex v-if="loggedIn">
            <h1 class="subheading mt-5 font-weight-bold">{{name}}</h1>
        </v-flex>
        <v-flex class="mt-5" v-if="loggedIn">
            <v-dialog v-model="dialog" persistent dark width="500">
                <template v-slot:activator="{ on }" class="darken-4">
                    <v-btn class="grey darken-4 amber--text" v-on="on">
                        <v-icon left>fiber_new</v-icon>
                        Create new project
                    </v-btn>
                </template>
                <v-card class="grey darken-4">
                    <v-card-title class="headline amber--text" primary-title> New Project </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text dark app>
                        <v-form class="pa-3" ref="form">
                            <v-text-field label="Title" :rules="inputRules" v-model="newproj.title" prepend-icon="title"></v-text-field>
                            <v-textarea label="Description" :rules="inputRules" v-model="newproj.content" prepend-icon="description"></v-textarea>
                            <v-menu offset-y>
                                <v-text-field :value="this.newproj.due_date" label="Due Date" slot="activator" prepend-icon="calendar_today"></v-text-field>
                                <v-date-picker dark v-model="newproj.due_date" class="amber black--text"></v-date-picker>
                            </v-menu>
                            <v-menu offset-y class="right mt-3" transition="scale-transition">
                                <v-btn class="white black--text" v-model="newproj.status" slot="activator">{{newproj.status}}</v-btn>
                                <v-list>
                                    <v-list-tile @click="newproj.status = 'Queued'">
                                        <v-list-tile-title>Queued</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="newproj.status = 'Ongoing'">
                                        <v-list-tile-title>Ongoing</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="newproj.status = 'Finished'">
                                        <v-list-tile-title>Finished</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="newproj.status = 'Overdue'">
                                        <v-list-tile-title>Overdue</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </v-form>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat class="red--text" @click="dialog = false">Cancel</v-btn>
                        <v-btn flat class="amber black--text" @click="submit()" :loading="newproj.loading">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-flex>
    </v-layout>
    <v-list class="mt-5 ml-2">
            <v-list-tile v-for="(element, key) in menu_list" v-ripple :key="key" router :to="element.route">
                    <v-list-tile-action>
                        <v-icon class="black--text">{{element.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="black--text">{{element.title}}</v-list-tile-title>
                    </v-list-tile-content>
            </v-list-tile>
    </v-list>
</v-navigation-drawer>
</template>

<script>
import { db } from '~/plugins/fb.js';
import { EventBus } from '@/eventbus.js';

let guests_menus = [];

let users_menus = [];

let admins_menus = [];

export default {
    name: 'Drawer',
    methods: {
        submit,
        loginEvent
    },
    data() {
        return {
            snackbar: false,
            drawer: false,
            dialog: false,
            shadow: () => this.drawer ? 'box-shadow: 0 0 200px black;' : 'box-shadow: 0 0 0; transition: 0.3s;',
            loggedIn: null,
            loggedOut: null,
            avatar: '',
            name: '',
            inputRules: [
                (value) => value && value.length >= 1 || 'Minimum length is one character.'
                ],
            isAdmin: null,
            newproj: {
                title: '',
                content: '',
                due_date: '',
                status: 'Queued',
                loading: false
                },
            menu_list: []
        }
    },
    mounted() {
        EventBus.$on('drawerState', state => this.drawer = state),
        EventBus.$on('wasClicked', dialog_state => this.dialog = dialog_state),
        EventBus.$on('isAdmin', () => this.isAdmin = true),
        EventBus.$on('adminLogout', () => this.isAdmin = false),
        EventBus.$on('loginData', (name, avatar) => {
            this.name = name;
            this.avatar = avatar;
            EventBus.$emit('nameGet', name);
        })
    },
    created() {
        EventBus.$on('loginStatus', (loggedIn, loggedOut) => {
            this.menu_list = [];
            this.loggedIn = loggedIn;
            this.loggedOut = loggedOut;
            let status1 = loggedIn;
            let status2 = loggedOut;

            db.collection('menu_list').onSnapshot(res => {
                const changes = res.docChanges();

                changes.forEach((change) => {

                    let data = change.doc.data();
                    data.id = change.doc.id;
                    
                    let isInGuests = guests_menus.find(function(el){ return el.id === data.id }) !== undefined;
                    let isInUsers = users_menus.find(function(el){ return el.id === data.id }) !== undefined;
                    let isInAdmins = admins_menus.find(function(el){ return el.id === data.id }) !== undefined;

                    if (change.type === 'added' && data.view === 'guests' && !isInGuests) {
                        guests_menus.push(data)
                    }

                    if (change.type === 'added' && data.view === 'users' && !isInUsers) {
                        users_menus.push(data);
                    }
                    if (change.type === 'added' && data.view === 'admins' && !isInAdmins) {
                        admins_menus.push(data);
                    }
                })

                if (status1 === false && status2 === true) {
                    guests_menus.forEach((menu) => !this.menu_list.includes(menu) ? this.menu_list.push(menu) : false)   
                }

                if (status1 === true && status2 === false && !this.isAdmin) {
                    guests_menus.forEach((menu) => !this.menu_list.includes(menu) ? this.menu_list.push(menu) : false);
                    users_menus.forEach((menu) => !this.menu_list.includes(menu) ? this.menu_list.push(menu) : false);
                }

                if (status1 === true && status2 === false && this.isAdmin) {
                    guests_menus.forEach((menu) => !this.menu_list.includes(menu) ? this.menu_list.push(menu) : false);
                    users_menus.forEach((menu) => !this.menu_list.includes(menu) ? this.menu_list.push(menu) : false);
                    admins_menus.forEach((menu) => !this.menu_list.includes(menu) ? this.menu_list.push(menu) : false);
                }

                this.menu_list.sort((a, b) => a.title < b.title ? -1 : 1 )
            })
        }
        )
        }
}

function submit() {
  if (this.$refs.form.validate()) {
    this.newproj.loading = true;
    const project = {
      title: this.newproj.title,
      content: this.newproj.content,
      due_date: this.newproj.due_date,
      status: this.newproj.status,
      person: this.name
    };
    db.collection('projects').add(project).then(() => {
      this.newproj.loading = false; 
      this.dialog = false;
      this.newproj.title = '';
      this.newproj.content = '';
      this.newproj.due_date = '';
      this.newproj.status = 'Queued';
      EventBus.$emit('switchSnackbar', this.snackbar = !this.snackbar);
    }).catch(err => console.log(err));
  }
  else if (!this.$refs.form.validate()) {
    this.dialog = true;
  }
}

function loginEvent() {
    EventBus.$emit('loginEvent')
}
</script>