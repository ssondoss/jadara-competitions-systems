<template>
  <div class="h-100 bg-scd">
    <navbar />
    <div v-if="updateSeason" class="model-p">
      <transition name="model" class="bg-main">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog m-auto">
              <div class="modal-content shadow" dir="rtl">
                <div class="modal-header w-100 row mx-0">
                  <h4 class="modal-title">تعديل الموسم</h4>
                  <div class="mr-auto">
                    <button
                      class="close mr-auto text-left outline-none"
                      type="button"
                      @click="updateSeason = false"
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                </div>
                <div class="modal-body text-right">
                  <div class="form-group">
                    <label>اسم الموسم</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="seasonName"
                    />
                  </div>

                  <input
                    type="button"
                    class="btn btn-main w-100 mt-3"
                    value="تأكيد"
                    @click="editSeason()"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="row mx-0 mt-3">
      <div
        class="col-xl-3 col-lg-4 col-md-6 my-3"
        v-for="season in seasons"
        :key="season.id"
      >
        <div class="p-4 rounded shadow bg-white">
          <!-- <div class="row mx-0 px-0">
        <div class="ml-auto mb-2 px-0">
          <i
            class="fa fa-times-circle text-danger"
            @click="deleteSeason(seasonProp.id)"
          ></i>
        </div>
      </div> -->
          <div class="h5 word-break mb-3">{{ season.seasonName }}</div>
          <div dir="rtl" class="mb-3">{{ season.rounds }} جولة</div>

          <hr />
          <div class="row mx-0 text-center">
            <div class="col-4 text-center">
              <img
                src="../assets/delete.svg"
                alt=""
                height="30"
                width="auto"
                @click="deleteSeason(season.id)"
              />
            </div>
            <div class="col-4">
              <router-link
                :to="{ path: '/season-details', query: { id: season.id } }"
              >
                <img src="../assets/info.svg" alt="" height="30" width="auto"
              /></router-link>
            </div>
            <div class="col-4">
              <img
                src="../assets/edit.svg"
                height="30"
                width="auto"
                @click="openUpdateSeason(season.id, season.seasonName, season)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "./navbar";
import season from "./season";
import { v4 } from "uuid";
import axios from "axios";
export default {
  name: "home",
  components: {
    navbar,
    season,
  },
  created() {
    this.getAllSeasons();
  },
  data: () => {
    return {
      seasons: [],
      url: process.env.VUE_APP_API,
      updateSeason: false,
      seasonName: "",
      updateSeasonId: 0,
      updateSeasonObject: {},
    };
  },
  methods: {
    openUpdateSeason(id, name, season) {
      this.updateSeasonObject = season;
      this.seasonName = name;
      this.updateSeasonId = id;
      this.updateSeason = true;
    },
    editSeason() {
      if (this.seasonName == "") {
        this.$swal("الرجاء إدخال اسم الموسم ");
      }
      else {
      this.updateSeasonObject.seasonName = this.seasonName;
      console.log(this.updateSeasonId);
      axios
        .put(this.url + "/Seasons/" + this.updateSeasonId, {
          id: this.updateSeasonId,
          seasonName: this.seasonName,
        })
        .then((res) => {});
      this.updateSeason = false;
   } },
    deleteSeason(seasonID) {
      this.$swal({
        title: "هل أنت متأكد ؟",
        text: "لا يمكنك التراجع عن هذا الخيار",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم قم بحذفها",
        cancelButtonText: "إلغاء",
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.value) {
          axios.delete(this.url + "/Seasons/" + seasonID).then(() => {
            window.location.reload();
          });
        }
      });
    },
    getAllSeasons() {
      axios.get(this.url + "/Seasons").then(
        (res) => {
          this.seasons = res.data;
        },
        (error) => {}
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.model-p {
  position: absolute;
  z-index: 999;
  background-color: #0000006e;
  width: 100% !important;
  background-size: cover !important;
  bottom: 0%;
  margin-bottom: 0 !important;
  top: 0%;
  right: 0%;
}
.modal-dialog {
  position: absolute;
  top: 20%;
  right: 0%;
  left: 0%;
  width: 100% !important;
  padding: 20px !important;
}
</style>
