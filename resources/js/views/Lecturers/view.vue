<template>
<div class="view">
    <div class="back-div">
        <a @click="$router.go(-1)">
            <span class="back-btn">
                <jam-arrow-left />Back</span>
        </a>
    </div>

    <div>
        <b-card :title="lecturer.name">
            <b-table-simple borderless>
                <b-tr>
                    <b-th>Name</b-th>
                    <b-td>{{lecturer.name}}</b-td>
                </b-tr>
                <b-tr>
                    <b-th>Address</b-th>
                    <b-td>{{lecturer.address}}</b-td>
                </b-tr>
                <b-tr>
                    <b-th>Email</b-th>
                    <b-td>{{lecturer.email}}</b-td>
                </b-tr>
                <b-tr>
                    <b-th>Phone</b-th>
                    <b-td>{{lecturer.phone}}</b-td>
                </b-tr>
            </b-table-simple>
            <b-card-text>
                <span class="icon" @click="editModal = true">
                    <jam-pencil /> Edit</span>

                <span class="icon" @click="deleteLecturer">
                    <jam-delete /> Delete</span>

            </b-card-text>
        </b-card>
    </div>
    <editLecturer v-if="editModal" @close="editModal = false; getLecturer()" :lecturer_id="this.$route.params.lecturer_id"></editLecturer>
    <deleteLecturer v-if="deleteModal" @close="$router.push('/lecturers')" :lecturer_id="lecturer.id"></deleteLecturer>

    <div class="lecturers-card">
        <h3>Courses enrolled:</h3>
        <div>
            <b-card>
                <b-table responsive  hover borderless :items="items" :fields="fields" show-empty id="course-table" :perPage="perPage" :currentPage="currentPage">
                    <template v-slot:cell(course)="data">
                        <b>{{data.item.course.title }}</b>
                    </template>
                    <template v-slot:cell(status)="data">
                      <span v-if="data.item.status === 'assigned'">
                          <!-- <b class="text-success">{{data.item.status }}</b> -->
                          <button type="button" class="btn btn-primary statusbttn" style="background-color: #69db66">
                            {{data.item.status }}
                          </button>
                      </span>
                      <span v-if="data.item.status === 'interested'" >
                          <!-- <b class="text-info">{{data.item.status }}</b> -->
                          <button type="button" class="btn btn-primary statusbttn" style="background-color: #f98510">
                            {{data.item.status }}
                          </button>
                      </span>
                      <span v-if="data.item.status === 'associate'">
                          <!-- <b class="text-warning">{{data.item.status }}</b> -->
                          <button type="button" class="btn btn-primary statusbttn" style="background-color: #3bd2b4">
                            {{data.item.status }}
                          </button>
                      </span>
                      <span v-if="data.item.status === 'career_break'">
                          <!-- <b class="text-danger">{{data.item.status }}</b> -->
                          <button type="button" class="btn btn-primary statusbttn" style="background-color: #fa5353">
                            {{data.item.status }}
                          </button>
                      </span>
                    </template>
                    <template v-slot:empty="scope">
                        <h4>{{ scope.emptyText }}</h4>
                    </template>
                    <template v-slot:cell(course)="data">
                      <b><router-link class="view-link" :to="`/view/course/${data.item.course_id}`">{{data.item.course.title}}</router-link></b>
                    </template>
                </b-table>
            </b-card>
        </div>
    </div>

    <div class="page-buttons">
      <b-pagination v-model="currentPage" :total-rows="courses" :per-page="perPage" aria-controls="course-table">
      </b-pagination>
    </div>

</div>
</template>
<script>
import editLecturer from '../../components/Lecturers/editLecturer'
import deleteLecturer from '../../components/Lecturers/deleteLecturer'

export default {
    name: 'viewLecturer',
    data() {
        return {
            lecturer: {},
            editModal: false,
            deleteModal: false,
            items: [],
            fields: ['course', 'date', 'time', 'status'],
            perPage: 5,
            currentPage: 1
        }
    },
    components: {
        editLecturer,
        deleteLecturer
    },
    mounted() {
        this.getLecturer();
    },
    methods: {
        getLecturer() {
            let app = this;
            let token = localStorage.getItem("token");
            axios.get(`/api/lecturers/${app.$route.params.lecturer_id}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    app.lecturer = response.data.data;
                    app.items = app.lecturer.enrolments;
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        deleteLecturer() {
            let app = this;
            app.deleteModal = true;
        },
    },
    computed: {
        courses() {
            return this.items.length;
        }
    }
}
</script>
<style>

</style>
