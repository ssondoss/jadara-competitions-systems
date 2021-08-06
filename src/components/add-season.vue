<template>
  <div class="h-100 bg-scd px-2">
    <navbar />
    <div
      class="
        border-bottom-scd
        col-xl-4 col-lg-6 col-md-8
        mx-auto
        bg-white
        shadow
        p-md-5 p-4
        mt-5
        rounded
      "
    >
      <form action="" dir="rtl">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="اسم الموسم"
            v-model="seasonName"
          />
        </div>

        <div class="form-group pt-2">
          <button class="btn btn-main w-100" @click="createSeason">
            إضافة
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import navbar from "./navbar";
import { v4 } from "uuid";
import axios from "axios";
export default {
  name: "addSeason",
  data: () => {
    return {
      seasonName: "",
      teams: [{ id: v4(), name: "" }],
      url: process.env.VUE_APP_API,
    };
  },
  components: {
    navbar,
  },
  methods: {
    createSeason() {
      if (this.seasonName === "") {
        this.$swal("الرجاء إدخال اسم الموسم ");
      } else {
        axios.post(this.url + "/Seasons", { seasonName: this.seasonName }).then(
          (res) => {

            this.$router.push("/home");
          },
          (err) => {
            console.log("error : " + err);
          }
        );
      }
    },
  },
};
</script>
