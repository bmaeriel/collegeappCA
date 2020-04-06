<template>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-lg-5 col-sm-12 mt-5">
            <div class="signinheader">
                <h1>College Web App</h1>
                <h3>Sign In</h3>
                <p>Don't have an account yet? <router-link to="/register">Sign Up</router-link>
                </p>
            </div>

            <form v-on:submit.prevent="signin">
                <div class="row">
                    <div class="form-group col-12">
                        <label for="email">Email Address</label>
                        <input id="email" type="email" v-model="user.email" class="form-control" name="email" required autocomplete="email">
                        <span class="errors">{{ getErrors('email') }}</span>
                    </div>

                    <div class="form-group col-12">
                        <label for="password">Password</label>
                        <input id="password" v-model="user.password" type="password" class="form-control" name="password" required autocomplete="current-password">
                        <span class="errors">{{ getPasswordError() }}</span>
                        <span class="errors">{{ getErrors('password') }}</span>
                    </div>

                    <div class="form-bttn col-12">
                      <button class="signinbttn" type="submit" @click="warn('Form cannot be submitted yet.', $event)"><jam-log-in></jam-log-in><span> &nbsp; Sign in</span></button>
                    </div>

                </div>
            </form>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'signin',
    data() {
        return {
            user: {},
            errors: {}
        }
    },
    methods: {
      warn: function(message, event) {
          if (event) {
              event.preventDefault();
              this.signin();
          }
      },
        signin() {
            let app = this;
            //log in
            axios.post('/api/login', {
                    email: app.user.email,
                    password: app.user.password
                })
                .then(function(response) {
                    console.log(response.data);
                    app.user.name = response.data.name;
                    app.user.email = response.data.email;
                    localStorage.setItem("token", response.data.token);

                    // go to home
                    app.$router.push({
                        path: '/',
                    });
                    app.$emit('login');
                })
                .catch(function(error) {
                    console.log(error);
                    //if authentication error
                    if(error.response.data.errors === "Unauthorised"){
                      app.errors = error.response.data.errors;
                    }
                      app.errors = error.response.data.errors;
                  });
          },
          getErrors(field){
            if(this.errors[field]){
              return this.errors[field][0];
            }
          },
          getPasswordError(){
            if(this.errors === "Unauthorised"){
              return "Invalid password. Try again!";
            }
          }
    }
}
</script>
