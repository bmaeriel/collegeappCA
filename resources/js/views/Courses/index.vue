<template>
<div class="col-lg-12 col-md-12 col-sm-12 index">
    <div>
        <b-card class="overflow-hidden">
            <b-table responsive borderless :items="items" :fields="fields" primary-key="id" hover id="index-table" :perPage="perPage" :currentPage="currentPage">
                <template v-slot:cell(Actions)="row">
                    <span class="icon">
                        <router-link :to="{ name: 'viewCourse', params: { course_id: row.item.id} }">
                            <jam-eye-f></jam-eye-f>
                        </router-link>
                    </span>
                    <span class="icon" @click="edit(row.item.id)">
                        <a><jam-pencil></jam-pencil></a>
                    </span>
                    <span class="icon" @click="deleteCourse(row.item.id)">
                        <jam-delete></jam-delete>
                    </span>
                </template>
                <template v-slot:cell(title)="row">
                  <b><router-link class="view-link" :to="{ name: 'viewCourse', params: { course_id: row.item.id} }">{{row.item.title}}</router-link></b>
                </template>
            </b-table>
        </b-card>
    </div>
      <div class="col-lg-12 bottom-div">
        <div class="page-buttons">
          <b-pagination v-model="currentPage" :total-rows="courses" :per-page="perPage" aria-controls="index-table">
          </b-pagination>
        </div>
          <div class="add-button ml-auto">
            <ul class="pagination">
              <li class="page-item">
                <button type="button" @click="showModal = true" class="btn btn-primary addbtn">
                  ADD
                </button>
              </li>
            </ul>
          </div>
      </div>

    <addCourse v-if="showModal" @close="showModal = false; getCourses()"></addCourse>
    <editCourse v-if="editModal" @close="editModal = false; getCourses()" :course_id="course_id"></editCourse>
    <deleteCourse v-if="deleteModal" @close="deleteModal = false; getCourses()" :course_id="course_id"></deleteCourse>
</div>
</template>
<script>
import addCourse from '../../components/Courses/addCourse.vue'
import editCourse from '../../components/Courses/editCourse.vue'
import deleteCourse from '../../components/Courses/deleteCourse.vue'

export default {
    name: 'coursesIndex',
    components: {
        addCourse,
        editCourse,
        deleteCourse
    },
    data() {
        return {
            fields: ['title', 'code', 'level', 'points', 'Actions'],
            items: [],
            showModal: false,
            editModal: false,
            deleteModal: false,
            course_id: '',
            perPage: 10,
            currentPage: 1
        }
    },
    mounted() {
        this.getCourses();
    },
    methods: {
        getCourses() {
            let token = localStorage.getItem("token");
            axios.get('/api/courses', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(response => {
                    this.items = response.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        deleteCourse(id) {
            console.log(id);
            let app = this;
            app.course_id = id;
            app.deleteModal = true;
        },
        edit(id) {
            let app = this;
            app.course_id = id;
            app.editModal = true;
        }
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
