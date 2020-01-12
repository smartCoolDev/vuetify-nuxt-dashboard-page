<template>
<v-toolbar tabs app dark>
    <router-link to="/">
        <v-tooltip bottom color="black amber--text">
            <v-btn fab slot="activator" color="amber--text">
                <v-icon>
                    home
                </v-icon>
            </v-btn>
            <span>Home</span>
        </v-tooltip>
    </router-link>
    <router-link to="/about">
        <v-tooltip bottom color="black amber--text">
            <v-btn fab slot="activator" class="amber--text ml-4">
                <v-icon>
                    face
                </v-icon>
            </v-btn>
            <span>About</span>
        </v-tooltip>
    </router-link>
    <v-spacer></v-spacer>
        <v-btn v-if="loggedIn" flat color="red" @click="logOut()">
            <span>Logout</span>
            <v-icon left>
                exit_to_app
            </v-icon>
        </v-btn>
        <v-btn v-if="loggedOut" flat color="green" @click="login_dialog = true">
            <v-icon left>
                create
            </v-icon>
            <span>Sign-in</span>
        </v-btn>
        <v-btn color="amber black--text" @click="changeState()">
            <span>Menu</span>
            <v-icon right>
                exit_to_app
            </v-icon>
        </v-btn>
    <v-dialog persistent dark width="800" v-model="login_dialog">
        <Snackbar3 />
        <v-card class="secondary">
            <v-card-title class="headline primary--text" primary-title>Login</v-card-title>
            <v-divider></v-divider>
            <v-form class="pa-3">
                <v-text-field label="Email" v-model="loginEmail" style="width: 50%; margin-left: 25%;" required></v-text-field>
                <v-text-field label="Password" v-model="loginPassword" style="width: 50%; margin-left: 25%;" :type="loginpassy" :append-icon="loginicon" required @click:append="changeIconIN()"></v-text-field>
            </v-form>
            <v-card-actions>
                <v-btn flat color="green" @click="login_dialog = false, signup_dialog = true">Create an account</v-btn>
                <v-spacer></v-spacer>
                <v-btn flat class="red--text right" @click="login_dialog = false, loginEmail = '', loginPassword = ''">Cancel</v-btn>
                <v-btn class="primary secondary--text elevation-24" @click="logIn()" :loading="loginState">Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog persistent dark width="800" v-model="signup_dialog">
        <Snackbar3 />
        <v-card class="secondary">
            <v-card-title class="headline primary--text" primary-title>Create Account</v-card-title>
            <v-divider></v-divider>
            <v-form class="pa-3">
                <v-text-field label="Name" v-model="signName" style="width: 50%; margin-left: 25%;" required></v-text-field>
                <v-text-field label="Username" v-model="signUsername" style="width: 50%; margin-left: 25%;" required></v-text-field>
                <v-text-field label="Email" v-model="signEmail" style="width: 50%; margin-left: 25%;" required></v-text-field>
                <v-text-field label="Password" v-model="signPassword" style="width: 50%; margin-left: 25%;" :type="passy" :append-icon="icon" required @click:append="changeIcon()"></v-text-field>
                <v-text-field label="Role" v-model="signRole" style="width: 50%; margin-left: 25%;" required></v-text-field>
                <v-text-field label="Avatar URL" v-model="signAvatar" style="width: 50%; margin-left: 25%;" required></v-text-field>
                <v-textarea label="About" v-model="signAbout" style="width: 100%;" required></v-textarea>
            </v-form>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat class="red--text right" @click="signup_dialog = false, signEmail = '', signPassword = '', signUsername = '', signRole = '', signName = '', signAbout = '', loginEmail = '', loginPassword = ''">Cancel</v-btn>
                <v-btn class="primary secondary--text elevation-24" @click="signUp()" :loading="signupState">Sign Up</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-toolbar>
</template>

<script>
import { EventBus } from '@/eventbus.js';
import { auth, db } from '~/plugins/fb.js';
import Snackbar3 from '@/components/Snackbar3.vue';

export default {
    name: 'Navbar',
    data() {
        return {
            drawer: false,
            login_dialog: false,
            signup_dialog: false,
            showPass: false,
            signupState: false,
            loginState: false,
            loggedIn: null,
            loggedOut: null,
            isAdmin: false,
            passy: 'password',
            loginpassy: 'password',
            icon: 'visibility',
            loginicon: 'visibility',
            loginEmail: '',
            loginPassword: '',
            signEmail: '',
            signPassword: '',
            signUsername: '',
            signRole: '',
            signName: '',
            signAbout: '',
            signAvatar: '',
            validEmail: true,
            inputRules: [
                (value) => value && value.length >= 3 || 'Minimum length is three characters.'
            ]
        }
    },
    methods: {
        changeState,
        signUp,
        logOut,
        logIn,
        changeIcon,
        changeIconIN
    },
    components: {
        Snackbar3
    },
    mounted() {
        EventBus.$on('loginStatus', (loggedIn, loggedOut) => {
            this.loggedIn = loggedIn;
            this.loggedOut = loggedOut;
        })
    },
    created() {
        EventBus.$emit('accountStatus', (this.loggedIn, this.loggedOut)),
        EventBus.$on('loginEvent', () => this.login_dialog = true)
    }
}

function changeState() {
    EventBus.$emit('drawerState', this.drawer = !this.drawer)
}

function signUp() {
    this.signupState = true;
    const email = this.signEmail;
    const password = this.signPassword;
    const username = this.signUsername;
    const role = this.signRole;
    const name = this.signName;
    const about = this.signAbout;
    const avatar = this.signAvatar;
    const userInfo = {
        username,
        email,
        name,
        role,
        about,
        avatar,
        admin: false,
        show: false
    };
    auth.createUserWithEmailAndPassword(email, password).then(() => {
        db.collection('users').add(userInfo).then(() => {
            this.signup_dialog = false;
            EventBus.$emit('accountCreated')
            this.signupState = false;
            this.loggedOut = false;
            this.loggedIn = true;
        }).catch((err) => {
            this.signupState = false;
            EventBus.$emit('invalidForm', err.message)
            }
        )}).catch((err) => {
            this.signupState = false;
            EventBus.$emit('invalidForm', err.message)
    })
}

function logOut() {
    auth.signOut().then(this.loggedIn = false, this.loggedOut = true, this.isAdmin = false)
    EventBus.$emit('adminLogout')
}

function changeIcon() {
    if (this.icon === 'visibility') {
        this.passy = 'text';
        this.icon = 'visibility_off';
    }
    else if (this.icon !== 'visibility') {
        this.passy = 'password';
        this.icon = 'visibility';
    }
}

function changeIconIN() {
    if (this.loginicon === 'visibility') {
        this.loginpassy = 'text';
        this.loginicon = 'visibility_off';
    }
    else if (this.loginicon !== 'visibility') {
        this.loginpassy = 'password';
        this.loginicon = 'visibility';
    }
}

function logIn() {
    this.loginState = true;
    const loginemail = this.loginEmail;
    const loginpassword = this.loginPassword;
    let admins = db.collection('admins').get().then(data => data.docChanges().forEach(change => { 
        if (change.doc.data().email === loginemail) {
            this.isAdmin = true;
        }
        else {
            this.isAdmin = false;
        }
    }))
    auth.signInWithEmailAndPassword(loginemail, loginpassword).then(() => {
        if (this.isAdmin) {
            EventBus.$emit('isAdmin')
        }
        this.login_dialog = false;
        EventBus.$emit('loggedIn');
        this.loginState = false;
        this.loggedOut = false;
        this.loggedIn = true;
    }).catch((err) => {
        this.loginState = false;
        EventBus.$emit('invalidForm', err.message)
    })
}
</script>
