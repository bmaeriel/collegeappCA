<template>
  <div class="col-lg-12 col-md-12 col-sm-12 index">
      <div>
          <b-card>
            <b-table responsive borderless :items="items" :fields="fields" primary-key="id" hover id="index-table" :perPage="perPage" :currentPage="currentPage">
                <template v-slot:cell(Actions)="row">
                    <span class="icon">
                        <router-link :to="{ name: 'viewLecturer', params: { lecturer_id: row.item.id} }">
                            <jam-eye-f></jam-eye-f>
                        </router-link>
                    </span>
                    <span class="icon" @click="edit(row.item.id)">
                        <jam-pencil></jam-pencil>
                    </span>
                    <span class="icon" @click="deleteLecturer(row.item.id)">
                        <jam-delete></jam-delete>
                    </span>
                </template>
                <template v-slot:cell(name)="row">
                  <b><router-link class="view-link" :to="{ name: 'viewLecturer', params: { lecturer_id: row.item.id} }">{{row.item.name}}</router-link></b>
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

    <addLecturer v-if="showModal" @close="showModal = false; getLecturers()"></addLecturer>
    <editLecturer v-if="editModal" @close="editModal = false; getLecturers()" :lecturer_id="lecturer_id"></editLecturer>
    <deleteLecturer v-if="deleteModal" @close="deleteModal = false; getLecturers()" :lecturer_id="lecturer_id"></deleteLecturer>

</div>
</template>
<script>
import addLecturer from '../../components/Lecturers/addLecturer'
import editLecturer from '../../components/Lecturers/editLecturer'
import deleteLecturer from '../../components/Lecturers/deleteLecturer'


export default {
    name: 'lecturersIndex',
    components: {
        addLecturer,
        editLecturer,
        deleteLecturer
    },
    data() {
        return {
            fields: ['name', 'address', 'email', 'phone', 'Actions'],
            items: [],
            showModal: false,
            editModal: false,
            deleteModal: false,
            lecturer_id: '',
            perPage: 10,
            currentPage: 1
        }
    },
    mounted() {
        this.getLecturers();
    },
    methods: {
        getLecturers() {
            let token = localStorage.getItem("token");
            axios.get('/api/lecturers', {
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
        deleteLecturer(id) {
            console.log(id);
            let app = this;
            app.lecturer_id = id;
            app.deleteModal = true;
        },
        edit(id) {
            let app = this;
            app.lecturer_id = id;
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
