<template>
  <transition name="modal">
      <div class="modal-mask">
          <div class="modal-wrapper">
              <div class="modal-container">
                  <div class="modal-body">
                      <div class="col-12">
                          <div class="modal-form-heading">
                              <h4>Delete Lecturer</h4>
                          </div>
                      </div>
                      <div class="col-12">
                          <div>
                              <div class="form-row">
                                  <div class="form-group col-12">
                                      <p>
                                        Are you sure you want to delete this lecturer? <br/>
                                        By deleting this, enrolments related to this lecturer will also be deleted.
                                      </p>
                                  </div>

                              </div>
                              <div class="form-row">
                                <div class="form-group col-12">
                                    <button type="button" class="btn btn-primary add-form-bttn"  @click="deleteLecturer">Delete</button>
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
  name: 'deleteLecturer',
  props: ['lecturer_id'],
  data(){
    return{
      enrolments: {},
      lecturer: {}
    }
  },
  created(){
    let app = this;
    let token = localStorage.getItem("token");
    axios.get(`/api/lecturers/${app.lecturer_id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(function(response) {
            app.lecturer = response.data.data;
            console.log('lecturer',app.lecturer);
        })
        .catch(function(error) {
            console.log(error);
      });
  },
  methods: {
    deleteLecturer(){
      let app = this;
      console.log("deleted");
      let token = localStorage.getItem("token");

      //for each enrolment of the course
      app.lecturer.enrolments.forEach((enrolment) => {
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
      axios.delete(`/api/lecturers/${app.lecturer_id}`, {
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
