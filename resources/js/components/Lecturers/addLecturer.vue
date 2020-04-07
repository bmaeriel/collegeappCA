<template>
<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-body">
                    <div class="col-12">
                        <div class="modal-form-heading">
                            <h4>Add Lecturer</h4>
                            <p><span class="asterik">&ast;</span> &mdash; Required fields</p>
                        </div>
                    </div>
                    <div class="col-12">
                        <form v-on:submit.prevent="addLecturer">
                            <div class="form-row">
                                <div class="form-group col-lg-6 col-sm-12">
                                    <label class="required" for="name">Name<span class="asterik">&ast;</span></label>
                                    <b-form-input id="name" type="text" v-model="lecturer.name" class="form-control" name="name" autocomplete="name" required></b-form-input>
                                      <span class="errors">{{ getErrors('name') }}</span>
                                </div>
                                <div class="form-group col-lg-6 col-sm-12">
                                    <label class="required" for="address">Address<span class="asterik">&ast;</span></label>
                                    <b-form-input id="address" v-model="lecturer.address" type="text" class="form-control" name="address" autocomplete="address" required></b-form-input>
                                      <span class="errors">{{ getErrors('address') }}</span>
                                </div>
                                <div class="form-group col-12">
                                    <label class="required" for="email">Email<span class="asterik">&ast;</span></label>
                                    <b-form-input id="email" v-model="lecturer.email" type="email" class="form-control" name="email" autocomplete="email"></b-form-input>
                                      <span class="errors">{{ getErrors('email') }}</span>
                                </div>
                                <div class="form-group col-12">
                                    <label class="required" for="phone">Phone<span class="asterik">&ast;</span></label>
                                    <b-form-input id="phone" v-model="lecturer.phone" type="text" class="form-control" name="phone" required autocomplete="phone" required></b-form-input>
                                      <span class="errors">{{ getErrors('phone') }}</span>
                                </div>
                                <div class="col-lg-3 col-sm-6">
                                    <button type="submit" class="btn btn-primary add-form-bttn" @click="warn('Form cannot be submitted yet.', $event)">Add</button>
                                </div>

                                <div class="col-lg-3 col-sm-6">
                                    <button type="button" class="btn btn-secondary cancel-form-bttn" @click="$emit('close')">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>
<script>
export default {
    name: 'addLecturer',
    data() {
        return {
            lecturer: {},
            errors: {}
        }
    },
    methods: {
      warn: function(message, event) {
          // now we have access to the native event
          if (event) {
              event.preventDefault();
              this.addLecturer();
          }
      },
        addLecturer() {
            let app = this;
            let token = localStorage.getItem("token");
            axios.post('/api/lecturers', {
                    name: app.lecturer.name,
                    address: app.lecturer.address,
                    email: app.lecturer.email,
                    phone: app.lecturer.phone
                },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    console.log(response.data);
                    app.$emit('close');
                })
                .catch(function(error) {
                  console.log(error);
                  app.errors = error.response.data.errors;
              });
      },
      getErrors(field) {
          if (this.errors[field]) {
              return this.errors[field][0];
          }
      },
    }
}
</script>
