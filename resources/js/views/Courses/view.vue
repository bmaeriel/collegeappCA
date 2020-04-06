<template>
<div class="view">
    <div class="back-div">
        <a @click="$router.go(-1)">
            <span class="back-btn">
                <jam-arrow-left />Back</span>
        </a>
    </div>

    <div>
        <b-card :title="course.title">
            <b-table-simple borderless>
                <b-tr>
                    <b-th>Code</b-th>
                    <b-td>{{course.code}}</b-td>
                </b-tr>
                <b-tr>
                    <b-th>Level</b-th>
                    <b-td>{{course.level}}</b-td>
                </b-tr>
                <b-tr>
                    <b-th>Points</b-th>
                    <b-td>{{course.points}}</b-td>
                </b-tr>
                <b-tr>
                    <b-th>Description</b-th>
                    <b-td>{{course.description}}</b-td>
                </b-tr>
            </b-table-simple>
            <b-card-text>
                <span class="icon" @click="editModal = true">
                    <jam-pencil /> Edit</span>

                <span class="icon" @click="deleteCourse">
                    <jam-delete /> Delete</span>

            </b-card-text>
        </b-card>
    </div>
    <editCourse v-if="editModal" @close="editModal = false; getCourse()" :course_id="this.$route.params.course_id"></editCourse>
    <deleteCourse v-if="deleteModal" @close="$router.push('/')" :course_id="course.id"></deleteCourse>

    <div class="lecturers-card">
        <h3>Lecturers enrolled in this course:</h3>
        <div>
            <b-card>
                <b-table responsive borderless hover :items="items" :fields="fields" show-empty id="lecturer-table" :perPage="perPage" :currentPage="currentPage">
                    <template v-slot:cell(lecturer)="data">
                        <b>{{data.item.lecturer.name }}</b>
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
                    <template v-slot:cell(lecturer)="data">
                      <b><router-link class="view-link" :to="`/view/lecturer/${data.item.lecturer_id}`">{{data.item.lecturer.name}}</router-link></b>
                    </template>
                </b-table>
            </b-card>
        </div>
    </div>

    <div class="page-buttons">
      <b-pagination v-model="currentPage" :total-rows="lecturers" :per-page="perPage" aria-controls="lecturer-table">
      </b-pagination>
    </div>

</div>
</template>
<script>
import editCourse from '../../components/Courses/editCourse.vue'
import deleteCourse from '../../components/Courses/deleteCourse.vue'

export default {
    name: 'viewCourse',
    data() {
        return {
            course: {},
            editModal: false,
            deleteModal: false,
            items: [],
            fields: ['lecturer', 'date', 'time', 'status'],
            perPage: 5,
            currentPage: 1

        }
    },
    components: {
        editCourse,
        deleteCourse
    },
    mounted() {
        this.getCourse();
    },
    methods: {
        getCourse() {
            let app = this;
            let token = localStorage.getItem("token");
            axios.get(`/api/courses/${app.$route.params.course_id}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(function(response) {
                    app.course = response.data.data;
                    app.items = app.course.enrolments;
                    console.log(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        deleteCourse() {
            //show delete modal
            let app = this;
            app.deleteModal = true;
        },
    },
    computed: {
      //get number of lecturers
        lecturers() {
            return this.items.length;
        }
    }
}
</script>
<style>
</style>
