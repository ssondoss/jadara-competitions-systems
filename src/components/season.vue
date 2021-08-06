<template>
  <div>
    <div class="p-4 rounded shadow bg-white border-bottom-scd">
      <!-- <div class="row mx-0 px-0">
        <div class="ml-auto mb-2 px-0">
          <i
            class="fa fa-times-circle text-danger"
            @click="deleteSeason(seasonProp.id)"
          ></i>
        </div>
      </div> -->
      <div class="h5 word-break mb-3">{{ seasonProp.seasonName }}</div>
      <div dir="rtl" class="mb-3">{{ seasonProp.rounds }} جولة</div>

      <hr />
      <div class="row mx-0 text-center">
        <div class="col-4 text-center">
          <img
            src="../assets/delete.svg"
            alt=""
            height="30"
            width="auto"
            @click="deleteSeason(seasonProp.id)"
          />
        </div>
        <div class="col-4">
          <router-link
            :to="{ path: '/season-details', query: { id: seasonProp.id } }"
          >
            <img src="../assets/info.svg" alt="" height="30" width="auto"
          /></router-link>
        </div>
        <div class="col-4">
          <img src="../assets/edit.svg" height="30" width="auto" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "season",
  props: ["seasonProp"],
  data: () => {
    return {
      url: process.env.VUE_APP_API,
    };
  },
  methods: {
    editSeason(seasonID){axios.put(this.url+"/Seasons/" + seasonID).then(() => {
            window.location.reload();
          });
    },
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
  },

};
</script>

<style scoped>
img:hover{
  height: 33px !important;
}
</style>
