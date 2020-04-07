<template>
<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-body">
                    <div class="col-12">
                        <div class="modal-form-heading">
                            <h4>Update Course</h4>
                            <p><span class="asterik">&ast;</span> &mdash; Required fields</p>
                        </div>
                    </div>
                    <div class="col-12">
                        <form v-on:submit.prevent="updateCourse">
                            <div class="form-row">
                                <div class="form-group col-lg-6 col-sm-12">
                                    <label class="required" for="Title">Title<span class="asterik">&ast;</span></label>
                                    <b-form-input id="title" type="text" v-model="course.title" class="form-control" name="title" autocomplete="title" required></b-form-input>
                                    <span class="errors">{{ getErrors('title') }}</span>
                                </div>
                                <div class="form-group col-lg-6 col-sm-12">
                                    <label class="required" for="code">Code<span class="asterik">&ast;</span></label>
                                    <b-form-input id="code" v-model="course.code" type="text" class="form-control" name="code" autocomplete="code" required></b-form-input>
                                    <span class="errors">{{ getErrors('code') }}</span>
                                </div>
                                <div class="form-group col-12">
                                    <label for="description">Description<span class="asterik">&ast;</span></label>
                                    <textarea id="description" v-model="course.description" type="text" class="form-control" name="description" autocomplete="description"></textarea>
                                    <span class="errors">{{ getErrors('description') }}</span>
                                </div>
                                <div class="form-group col-12">
                                    <label class="required" for="points">Points<span class="asterik">&ast;</span></label>
                                    <b-form-input id="points" v-model="course.points" type="text" class="form-control" name="points" required autocomplete="points" required></b-form-input>
                                    <span class="errors">{{ getErrors('points') }}</span>
                                </div>
                                <div class="form-group col-12">
                                    <label class="required" for="status">Level<span class="asterik">&ast;</span></label>
                                    <select class="custom-select" id="level" v-model="course.level" required>
                                      <option disabled value="Select Level">Select Level</option>
                                      <option value="7">Level 7</option>
                                      <option value="8">Level 8</option>
                                      <option value="9">Level 9</option>
                                      <option value="10">Level 10</option>
                                    </select>
                                    <span class="errors">{{ getErrors('level') }}</span>
                                </div>

                                <div class="col-lg-3 col-sm-6">
                                    <button type="submit" class="btn btn-primary add-form-bttn update" @click="warn('Form cannot be submitted yet.', $event)">Update</button>
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
    name: 'editCourse',
    props: ['course_id'],
    data() {
        return {
            course: {},
            errors: {}
        }
    },
    created() {
        let app = this;
        let token = localStorage.getItem("token");
        axios.get(`/api/courses/${app.course_id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function(response) {
              app.course = response.data.data;
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
            console.log(app.course);
            axios.put(`/api/courses/${app.course_id}`, app.course,
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
