<template>
  <transition name="modal">
      <div class="modal-mask">
          <div class="modal-wrapper">
              <div class="modal-container delete-container">
                  <div class="modal-body">
                      <div class="col-12">
                          <div class="modal-form-heading">
                              <h4>Delete Enrolment</h4>
                          </div>
                      </div>
                      <div class="col-12">
                          <div>
                              <div class="form-row">
                                  <div class="form-group col-12">
                                      <p>
                                        Are you sure you want to delete this enrolment? <br/>
                                      </p>
                                  </div>
                              </div>
                              <div class="form-row">
                                <div class="form-group col-12">
                                    <button type="button" class="btn btn-primary add-form-bttn" @click="deleteEnrolment">Yes</button>
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
    name: 'deleteEnrolment',
    props: ['enrolment_id'],
    data() {
        return {
            enrolment: {},
        }
    },
    created() {
      let app = this;
      let token = localStorage.getItem("token");
      axios.get(`/api/enrolments/${app.enrolment_id}`, {
              headers: {
                  Authorization: "Bearer " + token
              }
          })
          .then(function(response) {
              app.enrolment = response.data.data;
          })
          .catch(function(error) {
              console.log(error);
          });
    },
    methods: {
        deleteEnrolment() {
            let app = this;
            let token = localStorage.getItem("token");
            axios.delete(`/api/enrolments/${app.enrolment.id}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(response => {
                  this.$emit('close');
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
    }
}
</script>
<style>

</style>
