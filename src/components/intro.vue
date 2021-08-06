<template #app>
  <div class="bg-main p-0 m-0 fst-div">
    <div class="bg-scd p-0 m-0 scd-div">
      <div class="scd-text text-center">
        <div class="text-right h5" dir="rtl">
          هل تريد بدء موسم جديد للمسابقات الثقافية لطلاب جامعة جدارا ؟
        </div>
         <router-link class="btn btn-main mt-4" to="/home">بدء موسم جديد</router-link>
      </div>
    </div>
    <img
      src="../assets/jadara.png"
      alt=""
      height="150"
      width="auto"
      class="logo  p-0 m-0"
    />
    <div class="fst-text   text-center">
      <div class="h5  text-right" dir="rtl">
        هذه المنصة مبنية لمسؤولي المسابقات الثقافية في جامعة جدارا ، حيث يستطيع
        من خلالها إجراء مسابقة الجامعة بطريقة إلكترونية سهلة و منظمة ومحترفة .
      </div>
      <router-link class="btn btn-main mt-5" to="/home">بدء موسم جديد</router-link>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "Intro",
  components: {
    // HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: "Times New Roman", Times, serif;

  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
