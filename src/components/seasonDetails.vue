<template>
  <div class="h-100 bg-scd p-relative">
    <div v-if="addRound" class="model-p">
      <transition name="model" class="bg-main">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog m-auto">
              <div class="modal-content shadow" dir="rtl">
                <div class="modal-header w-100 row mx-0">
                  <h4 class="modal-title">أضف جولة جديدة</h4>
                  <div class="mr-auto">
                    <button
                      class="close mr-auto text-left outline-none"
                      type="button"
                      @click="addRound = false"
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
                      :value="season.seasonName"
                      disabled
                    />
                  </div>
                  <div class="form-group">
                    <label>اسم الجولة</label>
                    <input
                      type="text"
                      v-model="roundName"
                      class="form-control"
                    />
                  </div>

                  <input
                    type="button"
                    class="btn btn-main w-100 mt-3"
                    value="تأكيد"
                    @click="createRound(id)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

      <div v-if="updateRoundModal" class="model-p">
      <transition name="model" class="bg-main">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog m-auto">
              <div class="modal-content shadow" dir="rtl">
                <div class="modal-header w-100 row mx-0">
                  <h4 class="modal-title">أضف جولة جديدة</h4>
                  <div class="mr-auto">
                    <button
                      class="close mr-auto text-left outline-none"
                      type="button"
                      @click="updateRoundModal = false"
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
                      :value="season.seasonName"
                      disabled
                    />
                  </div>
                  <div class="form-group">
                    <label>اسم الجولة</label>
                    <input
                      type="text"
                      v-model="updatedRoundName"
                      class="form-control"
                    />
                  </div>

                  <input
                    type="button"
                    class="btn btn-main w-100 mt-3"
                    value="تأكيد"
                    @click="updateRound()"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>


    <navbar />
    <div class="mt-5 col-12 mx-auto px-0 px-md-5" dir="rtl">
      <div class="row mx-0">
        <div class="col-md-6 pr-md-0">
          <div
            class="row mx-0 p-3 pr-0 bg-white ml-auto shadow border-bottom-scd"
          >
            <div class="text-right font-weight-bold">اسم الموسم</div>

            <div class="mr-auto text-left word-break">
              {{ season.seasonName }}
            </div>
          </div>
        </div>
        <div class="col-md-6 pl-md-0 mt-3 mt-md-0">
          <div class="row mx-0 p-3 bg-white ml-auto shadow border-bottom-scd">
            <div class="text-right font-weight-bold">عدد جولات الموسم</div>
            <div class="mr-auto text-left">
              {{ season.rounds == null ? "0" : season.rounds.length }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex p-md-5 p-3">
      <div
        class="col-12 m-auto bg-white shadow p-lg-5 p-3 border-bottom-scd"
        dir="rtl"
      >
        <div class="mb-0 mx-auto px-0" dir="rtl">
          <button
            class="btn btn-main shadow px-md-4 circle py-2 w-100 word-break"
            @click="openddRoundModel"
          >
            <img
              src="./../assets/trophy.svg"
              alt=""
              height="30"
              width="30"
              class="trophy ml-2"
            />
            <span class="t-small" >
              إضافة جولة للموسم
            </span>

          </button>
        </div>
        <div class="row mx-0 px-0">
          <div
            class="col-lg-4 col-md-6 px-md-2 mt-md-4 mt-3 px-0"
            v-for="round in season.rounds"
            :key="round.id"
          >
            <div class="border p-3">
              <!-- <div class="ml-auto text-right w-100">
                <i
                  class="fa  fa-times-circle text-danger"
                  @click="deleteRound(round.id)"
                ></i>
              </div> -->
              <div class="h5">{{ round.roundName }}</div>
              <small>{{ round.dateAndTime | formatDate }}</small>
              <hr />
              <div class="row mx-0">
                <div class="col-6">{{ round.teamsInRound }} أفرقة</div>
                <div class="col-6">{{ round.roundQuestions }} أسئلة</div>
              </div>
              <hr />
              <div class="row mx-0">
                <div class="col-3 ">
                  <router-link
                    class="btn btn-outline-success w-100"
                    :to="{ path: '/add-team', query: { id: round.id } }"
                  >
                       <img src="../assets/add.svg" height="25" width="auto"/>
                  </router-link>
                </div>
                  <div class="col-3 ">
                  <div
                    class="btn btn-outline-danger w-100"                   @click="deleteRound(round.id)"

                  >
                       <img src="../assets/delete.svg" height="25" width="auto"/>
                  </div>
                </div>
                   <div class="col-3 ">
                  <div
                  @click="editRound(round)"
                    class="btn btn-outline-info w-100"
                  >
                       <img src="../assets/edit-blue.svg" height="25" width="auto" />
                  </div>
                </div>
                <div class="col-3 ">
                  <router-link
                    class="btn btn-outline-success w-100"
                    :to="{ path: '/add-question', query: { id: round.id } }"
                  >
                       <img src="../assets/search.svg" height="25" width="auto"/>
                  </router-link>
                </div>
              </div>
              <hr />

              <span v-if="round.roundQuestions != null">
                <button
                  @click="startRound(round)"
                  class="btn btn-outline-main w-100"
                >
                  بدء الجولة <img src="../assets/quiz.svg" height="25" width="auto"/>
                </button>
              </span>
              <!-- <div v-if="round.roundQuestions.length <= 29">
                <router-link
                  class="btn btn-outline-success w-100"
                  :to="{ path: '/add-question', query: { id: round.id } }"
                >
                  <i class="fa fa-plus-square ml-1" aria-hidden="true"></i>
                  إضافة سؤال
                </router-link>
              </div>
              <span
                v-if="round.teamsInRound.lenght > 0"
                class="alert alert-danger"
                >منتهية</span
              > -->
            </div>
          </div>
        </div>
        <!-- <div class="text-center bg-scd py-2 h5 mb-0">الجولات</div> -->
      </div>
    </div>
  </div>
</template>
<script>
import navbar from "./navbar";
import axios from "axios";

export default {
  name: "seasonDetails",
  components: {
    navbar,
  },
  data: () => {
    return {
      updateRoundModal:false,
      addRound: false,
      roundName: "",
      updatedRoundName:"",
      seasonID: "",
      id: 0,
      season: {},
      url: process.env.VUE_APP_API,
      addTeamsToRound: false,
      firstTeam: "",
      secondTeam: "",
      addTeamsToRoundID: "",
      updatedRoundID:0 ,
      updatedRound:{}
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getSeason();
  },

  methods: {



editRound(round){
  this.updateRoundModal=true;
  this.updatedRoundID = round.id;
  this.updatedRoundName = round.roundName;
  this.updatedRound= round

},
      updateRound() {
      if (this.updatedRoundName == "") {
        this.$swal("الرجاء إدخال اسم الجولة ");
      }
      else {
      axios
        .put(this.url + "/Rounds/" + this.updatedRoundID, {
          id: this.updatedRoundID,
          roundName: this.updatedRoundName,
          dateAndTime: this.updatedRound.dateAndTime,
  seasonID: this.id,

        })
        .then((res) => {});
      this.updateRoundModal = false;
            window.location.reload();
   } },
    deleteRound(roundID) {
      this.$swal({
        title: "هل أنت متأكد ؟",
        text: "لا يمكنك الرجوع عن هذا الخيار",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم قم بحذفها !",
        cancelButtonText: "إلغاء",
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.value) {
          axios.delete(this.url + "/Rounds/" + roundID).then(() => {
            window.location.reload();
          });
        }
      });
    },
    getTeams() {
      axios.get(this.url + "/Teams/RoundTeams/" + this.id).then(
        (res) => {
          this.season = res.data;

          console.log(this.season);
        },
        (error) => {}
      );
    },
    addQuestion(id) {
      axios.get(this.url + "/Questions/" + id).then(
        (res) => {
          this.season = res.data;
        },
        (error) => {}
      );
    },
    createRound(seasonID) {
      axios
        .post(this.url + "/Rounds", {
          roundName: this.roundName,
          seasonID: seasonID,
          dateAndTime: new Date(Date.now()),
        })
        .then(
          (res) => {
            this.addRound = false;
            this.getSeason();
          },
          (err) => {
            console.log("error : " + err);
          }
        );
    },

    openddRoundModel: function () {
      this.addRound = true;
    },
    startRound(round) {
      if (round.roundQuestions == 0 || round.teamsInRound < 2) {
        this.$swal("الرجاء إضافة فريقين وسؤال واحد على الأقل ! ");
      } else {
        this.$swal({
          title: "هل تريد بدء هذه الجولة ؟",
          text: "لا يمكنك الرجوع عن هذا الخيار",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "نعم ابدأ الجولة",
          cancelButtonText: "إلغاء",
          showCloseButton: true,
          showLoaderOnConfirm: true,
        }).then((result) => {
          if (result.value) {
            this.$router.push("/questions-keyboard?id=" + round.id);
          }
        });
      }
    },
    confirmAddTeams() {
      axios
        .post(this.url + "/Teams", { name: this.firstTeam })
        .then((firstTeamRes) => {
          axios
            .post(this.url + "/RoundTeams", {
              roundID: this.addTeamsToRoundID,
              teamID: firstTeamRes.data.id,
            })
            .then();
        });

      axios
        .post(this.url + "/Teams", { name: this.secondTeam })
        .then((secondTeamRes) => {
          axios
            .post(this.url + "/RoundTeams", {
              roundID: this.addTeamsToRoundID,
              teamID: secondTeamRes.data.id,
            })
            .then();
        });

      this.$router.push({
        path: "/questions-keyboard",
        query: { id: this.addTeamsToRoundID },
      });
    },
    getSeason() {
      axios.get(this.url + "/Seasons/" + this.id).then(
        (res) => {
          this.season = res.data;

          console.log(this.season);
        },
        (error) => {}
      );
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 470px) {
  .t-small {
    font-size: 14px !important;
    word-break: break-all !important;
  }
}
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
.trophy {
  animation: rotate 2s infinite;
}
@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.p-relative {
  position: relative;
}
.btn-outline-success{
  background-color: #fff !important;
}
.btn-outline-success:hover img{
height: 28px !important;}
.btn-outline-info{
  background-color: #fff !important;
}
.btn-outline-info:hover img{
height: 28px !important;}

.btn-outline-danger{
  background-color: #fff !important;
}
.btn-outline-danger:hover img{
height: 28px !important;}
</style>
