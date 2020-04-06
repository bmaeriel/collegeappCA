
<template>
<div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-8 sign-in">
                <h2 class="text-center h2-text">Sign Up</h2>
                <p class="text-center mt-3">
                    Already have an account? <a>
                        <router-link to="/signin">Sign In</router-link>
                    </a>
                </p>
                <hr />
                <form v-on:submit.prevent="register">
                    <div class="form-group row justify-content-center">
                        <div class="col-12">
                            <label for="name">Name</label>
                            <input id="name" type="text" v-model="name" class="form-control" name="name" autocomplete="name">
                            <span class="errors">{{ getErrors('name') }}</span>
                        </div>
                    </div>

                    <div class="form-group row justify-content-center">
                        <div class="col-12">
                            <label for="email">Email Address</label>
                            <input id="email" type="email" v-model="email" class="form-control" name="email" required autocomplete="email">
                            <span class="errors">{{ getErrors('email') }}</span>
                        </div>
                    </div>

                    <div class="form-group row justify-content-center">
                        <div class="col-12">
                            <label for="password">Password</label>
                            <input id="password" type="password" v-model="password" class="form-control" name="password" required autocomplete="new-password">
                              <span class="errors">{{ getErrors('password') }}</span>
                        </div>
                    </div>

                    <div class="form-group row justify-content-center">
                        <div class="col-12">
                            <label for="password_confirmation">Confirm password</label>
                            <input id="password_confirmation" v-model="password_confirmation" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                              <span class="errors">{{ getErrors('passwordConfirmation') }}</span>
                        </div>
                    </div>

                    <div class="form-bttn">
                      <button type="submit"  @click="warn('Form cannot be submitted yet.', $event)"><jam-log-in></jam-log-in><span> &nbsp; Register</span></button>
                    </div>
                </form>
            </div>
        </div>
</div>
</template>

<script>
export default {
    name: 'register',
    props: ['app'],
    components: {

    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: []
        }
    },
    methods: {
      warn: function(message, event) {
          if (event) {
              event.preventDefault();
              this.register();
          }
      },
        register() {
            let app = this;
            axios.post('/api/register', {
                    name: app.name,
                    email: app.email,
                    password: app.password,
                    password_confirmation: app.password_confirmation
                })
                .then(function(response) {
                    console.log(response.data);
                    app.name = response.data.name;
                    app.email = response.data.email;
                    localStorage.setItem("token", response.data.token);
                    //go to home page
                    app.$router.push({
                        path: '/',
                    });

                    app.$emit('login');
                })
                .catch(function(error) {
                  app.errors = error.response.data.errors;
                    console.log(error);
                });
        },
        getErrors(field){
          if(this.errors[field]){
            return this.errors[field][0];
          }
        },
    }
}
</script>
