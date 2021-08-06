<template>
  <div class="h-100 bg-scd">
    <navbar />
<div class="sticky-button btn btn-main">
      <i class="fa fa-chevron-circle-left" @click="back()"></i>
    </div>
    <div class="row mx-0">
      <div class="col-xl-5 col-lg-6 col-md-7 mx-auto mt-5 h-fit py-0">
        <form
          action=""
          dir="rtl"
          class="bg-white shadow p-md-5 p-4 rounded border-bottom-scd h-fit"
        >
          <div class="form-group px-0">
            <input
              type="text"
              class="form-control"
              v-model="teamName"
              placeholder="اسم الفريق"
            />
          </div>

          <div class="form-group mb-0">
            <button class="btn btn-main w-100" @click="createTeam">
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row rounded mx-md-3 mx-1">
      <div
        v-for="team in teams"
        :key="team.teamID"
        class="col-md-3 mt-3 mt-md-5 mx-auto"
      >
        <div class="shadow bg-white rounded w-100 p-3">
          <div class="text-right small text-danger pb-2">
            <i class="fa  fa-times-circle" @click="deleteTeam(team.id)"></i>
          </div>

          <div class="row mx-0 pr-0 ">
            <div class="text-left col-1">
              <input
                v-if="id != undefined"
                class="form-check-input"
                type="checkbox"
                value=""
                :checked="isChecked(team.id)"
                data-toggle="tooltip"
                data-placement="top"
                title="Tooltip on top"
                @click="addTeamToRound(team.id)"
              />
            </div>
            <div class="col-11 ml-auto pr-0 text-right  word-break">
              {{ team.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-5"></div>
  </div>
</template>
<script>
import navbar from "./navbar";
import { v4 } from "uuid";
import axios from "axios";
export default {
  name: "AddTeam",
  components: {
    navbar,
  },
  created() {
    this.id = this.$route.query.id;
    this.getAllTeams();
    if (this.id != undefined) {
      this.getAllRoundTeams();
    }
  },
  data: () => {
    return {
      teamName: "",

      id: 0,
      teams: [],
      roundTeams: [],
      url: process.env.VUE_APP_API,
    };
  },
  methods: {
    deleteTeam(teamID) {
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
          axios.delete(this.url + "/Teams/" + teamID).then(() => {
            window.location.reload();
          });
        }
      });
    },

    createTeam() {
      if (this.teamName === "") {
        this.$swal("الرجاء إدخال اسم الفريق !");
      } else {
        axios
          .post(
            this.url + "/Teams",

            {
              name: this.teamName,

              roundTeams: null,
            }
          )
          .then(
            (res) => {
              this.getAllTeams();
            },
            (err) => {
              console.log("error : " + err);
            }
          );
      }
    },
    getAllTeams() {
      axios.get(this.url + "/Teams/").then(
        (res) => {
          this.teams = res.data;
        },
        (err) => {}
      );
    },
    getAllRoundTeams() {
      axios
        .get(this.url + "/Teams/RoundTeams/" + this.id)
        .then((teamsRoundRes) => {
          this.roundTeams = teamsRoundRes.data;
        });
    },
  back(){
     window.history.back();
    },
    addTeamToRound(teamID) {
      if (this.roundTeams.find((team) => team.teamID == teamID)) {
        this.roundTeams.forEach((team) => {
          if (team.teamID == teamID) {
            axios
              .delete(this.url + "/RoundTeams/" + team.id)
              .then((teamsRoundRes) => {
                this.getAllRoundTeams();
              });
          }
        });
      } else {
        axios
          .post(this.url + "/RoundTeams", {
            roundID: this.id,
            teamID: teamID,
          })
          .then((teamsRoundRes) => {
            this.getAllRoundTeams();
          });
      }
    },
    isChecked(teamID) {
      return this.roundTeams.find((team) => team.teamID == teamID);
    },
  },
};
</script>
<style scoped>
.h-fit {
  height: 100% !important;
}
</style>
