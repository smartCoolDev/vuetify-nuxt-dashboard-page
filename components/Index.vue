<template>
<div class="home">
    <v-btn v-if="loggedIn" fab right fixed color="primary secondary--text right elevation-24 mr-5" slot="activator" @click="clicked"><v-icon>add</v-icon></v-btn>
    <v-container class="my-5">
        <v-chip class="subheading grey darken-4 amber--text elevation-24">Filter By:</v-chip>
        <br>
        <br>
        <v-btn small class="amber black--text elevation-24" @click="sortProp('title')"><v-icon left>folder</v-icon>Project Title</v-btn>
        <v-btn small class="amber black--text elevation-24" @click="sortProp('person')"><v-icon left>person</v-icon>Person Name</v-btn>
        <v-btn small class="amber black--text elevation-24" @click="sortProp('status')"><v-icon left>assignment_turned_in</v-icon>Status</v-btn>
        <br>
        <br>
        <v-card dark class="grey darken-4 elevation-24" v-for="(project, key) in projects" :key="key">
            <v-layout row wrap :class="`pa-3 project ${project.status.toLowerCase()}`" @mouseover="project.delete_item = !project.delete_item, project.edit_item = !project.edit_item" @mouseout="project.delete_item = !project.delete_item, project.edit_item = !project.edit_item">
                <v-flex xs12 md6>
                    <div class="caption amber--text">Project title</div>
                    <div>{{project.title}}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                    <div class="caption amber--text">Person</div>
                    <div>{{project.person}}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                    <div class="caption amber--text">Due by</div>
                    <div>{{project.due_date}}</div>
                </v-flex>
                <v-flex xs2 sm4 md2>
                    <div class="right">
                    <v-chip small :class="`black--text ${project.status.toLowerCase()}`">
                        {{ project.status }}
                    </v-chip>
                    </div>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
        </v-card>
    </v-container>
</div>
</template>

<script>
import { db } from '~/plugins/fb.js';
import { EventBus } from '@/eventbus.js';

export default {
    name: 'Index',
    data() {
        return {
            projects: [],
            dialog: false,
            loggedIn: null,
            loggedOut: null
        }
    },
    methods: {
        sortProp,
        clicked
    },
    mounted() {
        EventBus.$on('loginStatus', (loggedIn, loggedOut) => {
            this.loggedIn = loggedIn;
            this.loggedOut = loggedOut;
        })
        db.collection('projects').onSnapshot(res => 
            {
                const changes = res.docChanges();
                changes.forEach((change) => {
                    if (change.type === 'added') {
                        this.projects.push({
                            ...change.doc.data(),
                            id: change.doc.id
                        })
                    }
                })
            })
        }
}

let clicks = {title: 0, person: 0, status: 0};

function sortProp(prop) {
    if ((clicks[prop] % 2) === 0) {
        this.projects.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
    }

    else if ((clicks[prop] % 2) === 1) {
        this.projects.sort((a, b) => a[prop] < b[prop] ? 1 : -1)
    }

    clicks[prop]++
}

function clicked() {
    EventBus.$emit('wasClicked', this.dialog = !this.dialog)
    this.dialog = false
}
</script>

<style scoped>
.project.finished {
    border-left: 4px green solid;
}

.project.overdue {
    border-left: 4px crimson solid;
}

.project.queued {
    border-left: 4px goldenrod solid;
}

.project.ongoing {
    border-left: 4px yellow solid;
}

.v-chip.finished {
    background: green;
}

.v-chip.overdue {
    background: crimson;
}

.v-chip.queued {
    background: goldenrod;
}

.v-chip.ongoing {
    background: yellow;
}

</style>
