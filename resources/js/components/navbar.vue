<template>
<div>
    <b-navbar toggleable="lg" variant="info" class="navBar">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-if="isLoggedIn === true">
                    <router-link :to="{path: '/'}"><span>
                            <jam-dashboard></jam-dashboard>
                        </span>Dashboard</router-link>
                </b-nav-item>
            </b-navbar-nav>


            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <div v-if="isLoggedIn === true">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <img src="/images/profile.png" class="profile">
                            <em>{{user.name}}</em>
                        </template>
                        <b-dropdown-item @click="logout()" class="signout">
                            <jam-log-out></jam-log-out> &nbsp; Sign out
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </div>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>
<script>
export default {
    name: 'navbar',
    props: {
        isLoggedIn: Boolean
    },
    data() {
        return {
            user: {}
        }
    },
    created() {
        this.checkIfLogIn();
    },
    watch: {
        //watch any changes in isLoggedIn data
        isLoggedIn: function(newVal, oldVal) {
            immediate: true,
            this.checkIfLogIn();
        }
    },
    methods: {
        checkIfLogIn() {
            //if user is logged in, get user data
            if (this.isLoggedIn) {
                this.getUser();
            }
        },
        getUser() {
            let app = this;
            let token = localStorage.getItem("token");
            axios.get('/api/user', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(response => {
                    console.log('USER DEETS', response.data.user);
                    app.user = response.data.user;
                    console.log(app.user.id);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        logout() {
          //logs out of the application
            let token = localStorage.getItem('token');
            axios.get('/api/logout', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });

            console.log("USER LOGGED OUT");
            //remove token
            localStorage.removeItem('token');
            this.$emit('logout');

            //go to sign in page
            this.$router.push({
                name: 'signin'
            });
        }
    }
}
</script>
