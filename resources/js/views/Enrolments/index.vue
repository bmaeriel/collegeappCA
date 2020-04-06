<template>
  <div class="col-lg-12 col-md-12 col-sm-12 index">
      <div>

          <b-card>
            <b-table responsive borderless :items="items" :fields="fields" primary-key="id" hover id="index-table" :perPage="perPage" :currentPage="currentPage">
              <template v-slot:cell(course)="data">
                  <b>{{data.item.course.title }}</b>
              </template>
              <template v-slot:cell(lecturer)="data">
                  <b>{{data.item.lecturer.name }}</b>
              </template>
              <template v-slot:cell(status)="data">
                  <span v-if="data.item.status === 'assigned'">
                      <button class="btn btn-primary statusbttn" style="background-color: #69db66">
                        {{data.item.status }}
                      </button>
                  </span>
                  <span v-if="data.item.status === 'interested'" >
                      <button class="btn btn-primary statusbttn" style="background-color: #f98510">
                        {{data.item.status }}
                      </button>
                  </span>
                  <span v-if="data.item.status === 'associate'">
                      <button class="btn btn-primary statusbttn" style="background-color: #3bd2b4">
                        {{data.item.status }}
                      </button>
                  </span>
                  <span v-if="data.item.status === 'career_break'">
                      <button class="btn btn-primary statusbttn" style="background-color: #fa5353">
                        {{data.item.status }}
                      </button>
                  </span>
              </template>
                <template v-slot:cell(Actions)="row">
                    <span class="icon">
                        <router-link :to="{ name: 'viewEnrolment', params: { enrolment_id: row.item.id} }">
                            <jam-eye-f></jam-eye-f>
                        </router-link>
                    </span>
                    <span class="icon" @click="edit(row.item.id)">
                        <jam-pencil></jam-pencil>
                    </span>
                    <span class="icon" @click="deleteEnrolment(row.item.id)">
                        <jam-delete></jam-delete>
                    </span>
                </template>
                <template v-slot:cell(course)="data">
                  <b><router-link class="view-link" :to="{ name: 'viewCourse', params: { course_id: data.item.course_id} }">{{data.item.course.title}}</router-link></b>
                </template>
                <template v-slot:cell(lecturer)="data">
                  <b><router-link class="view-link" :to="{ name: 'viewLecturer', params: { lecturer_id: data.item.lecturer_id} }">{{data.item.lecturer.name}}</router-link></b>
                </template>
            </b-table>
        </b-card>
    </div>

    <div class="col-lg-12 bottom-div">
      <div class="page-buttons">
        <b-pagination v-model="currentPage" :total-rows="courses" :per-page="perPage" aria-controls="index-table"></b-pagination>
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

    <addEnrolment v-if="showModal" @close="showModal = false; getEnrolments()"></addEnrolment>
    <editEnrolment v-if="editModal" @close="editModal = false; getEnrolments()" :enrolment_id="enrolment_id"></editEnrolment>
    <deleteEnrolment v-if="deleteModal" @close="deleteModal = false; getEnrolments()" :enrolment_id="enrolment_id"></deleteEnrolment>
</div>
</template>
<script>
import addEnrolment from '../../components/Enrolments/addEnrolment'
import editEnrolment from '../../components/Enrolments/editEnrolment'
import deleteEnrolment from '../../components/Enrolments/deleteEnrolment'

export default {
    name: 'enrolmentsIndex',
    components: {
        addEnrolment,
        editEnrolment,
        deleteEnrolment
    },
    data() {
        return {
            fields: ['id', 'course', 'lecturer', 'date', 'time', 'status', 'Actions'],
            items: [],
            showModal: false,
            editModal: false,
            deleteModal: false,
            enrolment_id: '',
            perPage: 10,
            currentPage: 1
        }
    },
    mounted() {
        this.getEnrolments();
    },
    methods: {
        getEnrolments() {
            let token = localStorage.getItem("token");
            axios.get('/api/enrolments', {
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
        deleteEnrolment(id) {
          let app = this;
          app.enrolment_id = id;
          app.deleteModal = true;
        },
        edit(id) {
            let app = this;
            app.enrolment_id = id;
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
