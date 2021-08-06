<template>
  <div class="h-100 bg-scd">
    <navbar />
    <div class="col-md-6 shadow bg-white mx-auto mt-5 p-4 rounded">
      <form action="">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="اسم الجولة" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import navbar from "./navbar";

export default {
  name: "AddRound",
  components: {
    navbar,
  },

};
</script>
