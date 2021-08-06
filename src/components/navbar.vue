<template>
  <div class="">
    <nav
      class="navbar navbar-expand-lg navbar-light bg-white shadow px-1 px-md-5"
      dir="rtl"
    >
      <a class="navbar-brand py-0" href="#">
        <img src="../assets/jadara.png" alt="" height="60" width="auto" />
      </a>
      <button
        class="navbar-toggler ml-3"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link mx-3 color-main" to="/home"
              >الصفحة الرئيسية
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-3 color-main" to="/add-question"
              > إضافة سؤال
            </router-link>
          </li>
              <li class="nav-item">
            <router-link class="nav-link mx-3 color-main" to="/add-team"
              > إضافة فريق
            </router-link>
          </li>
          <li class="nav-item ">
            <router-link
              type="button"
              class="nav-link mx-3 color-main"
              to="/add-season"
            >
              <!-- <small><i class="fa fa-plus ml-1" aria-hidden="true"></i></small> -->
              أضف موسم
            </router-link>
          </li>

          <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle waves-effect waves-light" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown
            </a>
            <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item waves-effect waves-light" href="#">Action</a>
              <a class="dropdown-item waves-effect waves-light" href="#">Another action</a>
              <a class="dropdown-item waves-effect waves-light" href="#">Something else here</a>
            </div>
          </li> -->
        </ul>
      </div>
    </nav>

  </div>
</template>

<script>
export default {
  name: "navbar",
  data: () => {
    return { addSeason: false };
  },
  methods: {
    openAddSeasonModel: function () {
      this.addSeason = true;
    },
  },
};
</script>
<style scoped>
.nav-link {
  font-weight: bold;
}
.navbar-toggler:focus {
  outline: none !important;
}
nav{
  border-bottom: 0px solid #8ac4d0;
}


</style>
