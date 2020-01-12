<template>
<div class="home">
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 row wrap v-for="(person, key) in team" :key="key" class="ml-5 mt-5 mr-5">
                <v-card dark class="pa-5 amber--text darken-4 grey elevation-24">
                    <v-img :src="person.avatar" height="200px" width="200px" class="round-avatar ma-auto">
                    </v-img>
                    <v-card-title primary-title>
                        <div class="headline right ma-auto">{{person.name}}</div>
                        <span class="grey--text right ma-auto">{{person.role}}</span>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat class="ma-auto right amber--text" @click="person.show = !person.show">{{ person.show ? 'Hide' : 'About'}}</v-btn>
                    </v-card-actions>
                    <v-slide-y-transition>
                        <v-card-text v-show="person.show">
                            {{person.about}}
                        </v-card-text>
                    </v-slide-y-transition>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
import { db } from '~/plugins/fb.js'

export default {
    name: 'About',
    data() {
        return {
            team: []
        }
    },
    created() {
        db.collection('users').onSnapshot(res => 
        {
            const changes = res.docChanges();

            changes.forEach((change) => {
                if (change.type === 'added') {
                    this.team.push({
                        ...change.doc.data(),
                        id: change.doc.id
                    })
                }
            })
        })
    }
}
</script>

<style scoped>
.round-avatar {
    clip-path: circle(50%);
}

</style>
