<template>
  <transition name="modal">
      <div class="modal-mask">
          <div class="modal-wrapper">
              <div class="modal-container">
                  <div class="modal-body">
                      <div class="col-12">
                          <div class="modal-form-heading">
                              <h4>Delete Course</h4>
                          </div>
                      </div>
                      <div class="col-12">
                          <div>
                              <div class="form-row">
                                  <div class="form-group col-12">
                                      <p>
                                        Are you sure you want to delete this course? <br/>
                                        By deleting this, enrolments related to this course will also be deleted.
                                      </p>
                                  </div>
                              </div>
                              <div class="form-row">
                                <div class="form-group col-12">
                                    <button type="button" class="btn btn-primary add-form-bttn" @click="deleteCourse">Delete</button>
                                    <button type="button" class="btn btn-secondary cancel-form-bttn ml-4" @click="$emit('close')">Cancel</button>
                                </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </transition>
</template>
<script>
export default {
  name: 'deleteCourse',
  props: ['course_id'],
  data(){
    return{
      enrolments: {},
      course: {}
    }
  },
  created(){
    let app = this;
    let token = localStorage.getItem("token");
    axios.get(`/api/courses/${app.course_id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(function(response) {
            app.course = response.data.data;
            console.log('course',app.course);
        })
        .catch(function(error) {
            console.log(error);
      });
  },
  methods: {
    deleteCourse(){
      let app = this;
      let token = localStorage.getItem("token");

      //for each enrolment of the course
      app.course.enrolments.forEach((enrolment) => {
        // console.log(enrolment);

        //delete enrolments
        axios.delete(`/api/enrolments/${enrolment.id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(response => {
                console.log("deleted!");
            })
            .catch(function(error) {
                console.log(error);
            });

      });

      //delete course after deleting enrolments
      axios.delete(`/api/courses/${app.course_id}`, {
              headers: {
                  Authorization: "Bearer " + token
              }
          })
          .then(response => {
              console.log(response);
              app.$emit('close');
          })
          .catch(function(error) {
              console.log(error);
          });

    }

  }
}
</script>
<style>
</style>
