<template>
<div class="view">
    <div class="back-div">
        <a @click="$router.go(-1)">
            <span class="back-btn">
                <jam-arrow-left />Back</span>
        </a>
    </div>

    <div>
        <b-card title="Enrolment">
            <b-table-simple borderless v-if="isLoaded">
                <b-tr>
                    <b-th>Course</b-th>
                    <b-td>{{enrolment.course.title}}</b-td>
                </b-tr>
                <b-tr>
                    <b-th>Lecturer</b-th>
                    <b-td>{{enrolment.lecturer.name}}</b-td>
                </b-tr>
                <b-tr>
                    <b-th>Date</b-th>
                    <b-td>{{enrolment.date}}</b-td>
                </b-tr>
                <b-tr>
                    <b-th>Time</b-th>
                    <b-td>{{enrolment.time}}</b-td>
                </b-tr>
            </b-table-simple>
            <b-card-text>
                <span class="icon" @click="editModal = true">
                    <jam-pencil /> Edit</span>

                <span class="icon" @click="deleteEnrolment">
                    <jam-delete /> Delete</span>

            </b-card-text>
        </b-card>
    </div>
    <editEnrolment v-if="editModal" @close="editModal = false; getEnrolment()" :enrolment_id="this.$route.params.enrolment_id"></editEnrolment>
    <deleteEnrolment v-if="deleteModal" @close="$router.push('/enrolments')" :enrolment_id="this.$route.params.enrolment_id"></deleteEnrolment>

</div>
</template>
<script>
import editEnrolment from '../../components/Enrolments/editEnrolment'
import deleteEnrolment from '../../components/Enrolments/deleteEnrolment'

export default {
    name: 'viewEnrolment',
    data() {
        return {
            enrolment: {},
            editModal: false,
            deleteModal: false,
            isLoaded: false
        }
    },
    components: {
        editEnrolment,
        deleteEnrolment
    },
    created() {
        this.getEnrolment();
    },
    methods: {
        getEnrolment() {
            let app = this;
            let token = localStorage.getItem("token");
            axios.get(`/api/enrolments/${app.$route.params.enrolment_id}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    app.enrolment = response.data.data;
                    app.isLoaded = true;
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        deleteEnrolment() {
            let app = this;
            app.deleteModal = true;
        },
    }
}
</script>
