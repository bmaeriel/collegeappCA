<template>
<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-body">
                    <div class="col-12">
                        <div class="modal-form-heading">
                            <h4>Update Enrolment</h4>
                            <p><span class="asterik">&ast;</span> &mdash; Required fields</p>
                        </div>
                    </div>
                    <div class="col-12">
                        <form v-on:submit.prevent="updateEnrolment">
                            <div class="form-row">
                                <div class="form-group col-12">
                                    <label class="required" for="course_id">Course<span class="asterik">&ast;</span></label>
                                    <select class="custom-select" id="course_id" v-model="enrolment.course_id" required>
                                        <option disabled value="">Select Course</option>
                                        <option :value="course.id" v-for="course in courses">
                                            {{course.title}}
                                        </option>
                                    </select>
                                    <span class="errors">{{ getErrors('course_id') }}</span>
                                </div>
                                <div class="form-group col-12">
                                    <label class="required" for="lecturer_id">Lecturer<span class="asterik">&ast;</span></label>
                                    <select class="custom-select" id="lecturer_id" v-model="enrolment.lecturer_id" required>
                                        <option disabled value="">Select Lecturer</option>
                                        <option :value="lecturer.id" v-for="lecturer in lecturers">
                                            {{lecturer.name}}
                                        </option>
                                    </select>
                                    <span class="errors">{{ getErrors('lecturer_id') }}</span>
                                </div>
                                <div class="form-row col-12 pr-0">
                                    <div class="form-group col-lg-6 col-sm-12">
                                        <label class="required" for="date">Date<span class="asterik">&ast;</span></label>
                                        <input id="date" v-model="enrolment.date" type="date" class="form-control" name="date" autocomplete="date" required>
                                        <span class="errors">{{ getErrors('date') }}</span>
                                    </div>
                                    <div class="form-group col-lg-6 col-sm-12 pr-0">
                                        <label class="required" for="time">Time<span class="asterik">&ast;</span></label>
                                        <input id="time" v-model="enrolment.time" type="time" class="form-control" name="time" autocomplete="time"></input>
                                        <span class="errors">{{ getErrors('time') }}</span>
                                    </div>
                                </div>
                                <div class="form-group col-12">
                                    <label class="required" for="status">Status<span class="asterik">&ast;</span></label>
                                    <select class="custom-select" id="status" v-model="enrolment.status" required>
                                        <option disabled value="">Select Status</option>
                                        <option value="assigned">Assigned</option>
                                        <option value="interested">Interested</option>
                                        <option value="associate">Associate</option>
                                        <option value="career_break">Career break</option>
                                    </select>
                                    <span class="errors">{{ getErrors('status') }}</span>
                                </div>
                                <div class="col-lg-3 col-sm-6">
                                    <button type="submit" class="btn btn-primary add-form-bttn update" @click="warn('Form cannot be submitted yet.', $event)">Update</button>
                                </div>

                                <div class="col-lg-3 col-sm-6">
                                    <button type="button" class="btn btn-secondary cancel-form-bttn update" @click="$emit('close')">Cancel</button>
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
    name: 'editEnrolment',
    props: ['enrolment_id'],
    data() {
        return {
            lecturers: {},
            courses: {},
            enrolment: {},
            errors: {}
        }
    },
    mounted() {
        this.getCourses();
        this.getLecturers();

        let app = this;
        let token = localStorage.getItem("token");
        axios.get(`/api/enrolments/${app.enrolment_id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(function(response) {
                app.enrolment = response.data.data;
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
                this.updateEnrolment();
            }
        },
        getCourses() {
            let token = localStorage.getItem("token");
            axios.get('/api/courses', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(response => {
                    this.courses = response.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getLecturers() {
            let token = localStorage.getItem("token");
            axios.get('/api/lecturers', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(response => {
                    this.lecturers = response.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        updateEnrolment() {
            let app = this;
            let token = localStorage.getItem("token");
            axios.put(`/api/enrolments/${app.enrolment_id}`, app.enrolment, {
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
