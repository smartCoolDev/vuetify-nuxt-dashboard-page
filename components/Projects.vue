<template>
<v-container class="mt-5">
    <v-expansion-panel class="mt-5">
        <v-expansion-panel-content v-for="(project, key) in updateProjects" :key="key" class="amber black--text">
            <template v-slot:header>
                <div>{{project.title}}</div>
            </template>
            <v-card class="grey darken-4 amber--text">
                <v-card-text>
                    {{project.content}}
                </v-card-text>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</v-container>
</template>

<script>
import { db } from '~/plugins/fb.js';
import { EventBus } from '@/eventbus.js';

export default {
    name: 'Projects',
    data() {
        return {
            projects: [],
            user: ''
        }
    },
    computed: {
        updateProjects() {
            return this.projects.filter((project) => project.person === this.user)
        }
    },
    mounted() {
        EventBus.$on('nameGet', (name) => this.user = name)
    },
    created() {
        db.collection('projects').onSnapshot(res => {
            const changes = res.docChanges();

            changes.forEach(change => {
                if (change.type === 'added') {
                    this.projects.push({
                        ...change.doc.data(),
                        id: change.doc.id
                    })
                }})
        
        })
    }
}
</script>