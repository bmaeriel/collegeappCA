<template>
<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-body">
                    <div class="col-12">
                        <div class="modal-form-heading">
                            <h4>Update Lecturer</h4>
                            <p><span class="asterik">&ast;</span> &mdash; Required fields</p>
                        </div>
                    </div>
                    <div class="col-12">
                        <form v-on:submit.prevent="updateCourse">
                            <div class="form-row">
                                <div class="form-group col-lg-6 col-sm-12">
                                    <label class="required" for="name">Name<span class="asterik">&ast;</span></label>
                                    <input id="name" type="text" v-model="lecturer.name" class="form-control" name="name" autocomplete="name" required>

                                </div>
                                <div class="form-group col-lg-6 col-sm-12">
                                    <label class="required" for="address">Address<span class="asterik">&ast;</span></label>
                                    <input id="address" v-model="lecturer.address" type="text" class="form-control" name="address" autocomplete="address" required>

                                </div>
                                <div class="form-group col-12">
                                    <label class="required" for="email">Email<span class="asterik">&ast;</span></label>
                                    <input id="email" v-model="lecturer.email" type="email" class="form-control" name="email" autocomplete="email"></input>
                                </div>
                                <div class="form-group col-12">
                                    <label class="required" for="phone">Phone<span class="asterik">&ast;</span></label>
                                    <input id="phone" v-model="lecturer.phone" type="text" class="form-control" name="phone" required autocomplete="phone" required>
                                </div>
                                <div class="col-lg-3 col-sm-6">
                                    <button type="submit" class="btn btn-primary add-form-bttn update" @click="warn('Form cannot be submitted yet.', $event)">Update</button>
                                </div>

                                <div class="col-lg-3 col-sm-6">
                                    <button type="button" class="btn btn-secondary cancel-form-bttn " @click="$emit('close')">Cancel</button>
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
    name: 'editLecturer',
    props: ['lecturer_id'],
    data() {
        return {
            lecturer: {}
        }
    },
    created() {
        let app = this;
        let token = localStorage.getItem("token");
        axios.get(`/api/lecturers/${app.lecturer_id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function(response) {
              app.lecturer = response.data.data;
                console.log(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    methods: {
      warn: function(message, event) {
          // now we have access to the native event
          if (event) {
              event.preventDefault();
              this.updateCourse();
          }
      },
        updateCourse() {
            let app = this;
            let token = localStorage.getItem("token");
            console.log(app.lecturer);
            axios.put(`/api/lecturers/${app.lecturer_id}`, app.lecturer,
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
                });
        }
    }
}
</script>
