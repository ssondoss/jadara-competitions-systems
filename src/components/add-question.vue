<template>
  <div class="h-100 bg-scd">
    <div class="sticky-button btn btn-main">
      <i class="fa fa-chevron-circle-left" @click="back()"></i>
    </div>
    <navbar />

    <div class="row mx-0">
      <div class="col-xl-5 col-lg-6 col-md-7 mx-auto mt-5 h-fit py-0">
        <form
          action=""
          dir="rtl"
          class="bg-white shadow p-5 rounded border-bottom-scd h-fit"
        >
          <div class="form-group mt-4">
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              class="form-control"
              placeholder="نص السؤال
"
              v-model="questionText"
            ></textarea>
          </div>
          <div class="form-group px-0">
            <input
              type="text"
              class="form-control"
              v-model="firstChoice"
              placeholder="الخيار الأول"
            />
          </div>

          <div class="form-group px-0">
            <input
              type="text"
              class="form-control"
              v-model="secondChoice"
              placeholder="الخيار الثاني"
            />
          </div>
          <div class="form-group px-0">
            <input
              type="text"
              class="form-control"
              v-model="thirdChoice"
              placeholder="الخيار الثالث "
            />
          </div>
          <div class="form-group px-0">
            <input
              type="text"
              class="form-control"
              v-model="fourthChoice"
              placeholder="الخيار الرابع "
            />
          </div>
          <div class="form-group text-right">
            <label>رقم الإجابة الصحيحة</label>
            <select class="form-control" v-model="answer">
              <option value="1">الخيار الأول</option>
              <option value="2">الخيار الثاني</option>
              <option value="3">الخيار الثالث</option>
              <option value="4">الخيار الرابع</option>
            </select>
          </div>

          <div class="form-group pt-3">
            <button class="btn btn-main w-100" @click="createQuestion">
              إضافة
            </button>
          </div>
        </form>
      </div>
      <div class="col-md-4 m-auto d-none d-md-block">
        <img
          src="../assets/why.svg"
          alt=""
          height="auto"
          width="100%"
          class="m-auto"
        />
      </div>
    </div>
    <div class="row rounded mx-md-3 mx-0">
      <div
        v-for="question in questions"
        :key="question.id"
        class="col-md-4 mt-5 mx-auto"
      >
        <div class="shadow bg-white rounded w-100">
          <div class="text-right px-3 pt-3">
            <i
              class="fa fa-times-circle text-danger"
              @click="deleteQuestion(question.id)"
            ></i>
          </div>
          <div class="row mx-0 border-bottom p-3">
            <div class="text-center col-1">
              <input
                v-if="id != undefined"
                class="form-check-input"
                type="checkbox"
                value=""
                :checked="isChecked(question.id)"
                data-toggle="tooltip"
                data-placement="top"
                title="Tooltip on top"
                @click="addQuestionToRound(question.id)"
              />
            </div>
            <div class="col-11 text-right px-0 font-wight-bold h6 word-break">
              {{ question.questionText }}
            </div>
          </div>
          <div class="px-0">
            <ol class="pt-3 text-right small" dir="rtl">
              <li>
                {{ question.firstChoice }}
              </li>
              <li>{{ question.secondChoice }}</li>
              <li>{{ question.thirdChoice }}</li>
              <li>{{ question.fourthChoice }}</li>
            </ol>
            <div
              class="text-right py-3 col-12 border-top small bg-light"
              dir="rtl"
            >
              <div class="">
                الجواب :
                <span class="text-success">
                  {{ question.correctChoice }}
                </span>
              </div>
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
  name: "AddQuestion",
  components: {
    navbar,
  },
  created() {
    this.id = this.$route.query.id;
    this.getAllQuestions();
    if (this.id != undefined) {
      this.getAllRoundQustions();
    }
  },
  data: () => {
    return {
      questionDetails: false,
      questionText: "",
      firstChoice: "",
      secondChoice: "",
      thirdChoice: "",
      fourthChoice: "",
      answer: 0,
      id: 0,
      questions: [],
      roundQustions: [],
      url: process.env.VUE_APP_API,
    };
  },
  methods: {

  deleteQuestion(id) {
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
          axios.delete(this.url + "/Questions/" + id).then(() => {
            window.location.reload();
          });
        }
      });
    },



    showQuestionDetails() {
      this.questionDetails = !this.questionDetails;
    },

    createQuestion() {
      if(this.questionText =="" || this.firstChoice =="" || this.secondChoice =="" || this.thirdChoice =="" || this.fourthChoice == "" || this.answer ==""){
        this.$swal("الرجاء إدخال كافة الحقول");

      }
      let anwsers = [
        this.firstChoice,
        this.secondChoice,
        this.thirdChoice,
        this.fourthChoice,
      ];
      axios
        .post(
          this.url + "/Questions",

          {
            questionText: this.questionText,
            firstChoice: this.firstChoice,
            secondChoice: this.secondChoice,
            thirdChoice: this.thirdChoice,
            fourthChoice: this.fourthChoice,
            correctChoice: +this.answer,
            roundQuestions: null,
            correctAnswer: anwsers[+this.answer - 1],
          }
        )
        .then(
          (res) => {
                        window.location.reload();

          },
          (err) => {
            console.log("error : " + err);
          }
        );
    },
    getAllQuestions() {
      axios.get(this.url + "/Questions/").then(
        (res) => {
          this.questions = res.data;
          console.log(this.questions);
          console.log(this.id);
        },
        (err) => {}
      );
    },
    getAllRoundQustions() {
      axios
        .get(this.url + "/RoundQuestions/" + this.id)
        .then((questionsRoundRes) => {
          this.roundQustions = questionsRoundRes.data;
          console.log(this.roundQustions);
        });
    },

    back(){
     window.history.back();
    },

    addQuestionToRound(questionID) {
      if (this.roundQustions.find((question) => question.question.id == questionID)) {
        axios
          .delete(this.url + "/RoundQuestions/" + this.id + "/" + questionID)
          .then((questionsRoundRes) => {
            this.getAllRoundQustions();
          });
      } else {
        axios
          .post(this.url + "/RoundQuestions", {
            roundID: this.id,
            questionID: questionID,
          })
          .then((questionsRoundRes) => {
            this.getAllRoundQustions();
          });
      }
    },
    isChecked(questionID) {
      return this.roundQustions.find((question) => question.question.id == questionID);
    },
  },
};
</script>
<style scoped>
.h-fit {
  height: 100% !important;
  position: relative;
}
.sticky-button {
  position: fixed;
  bottom: 10px;
  right: 30px;
  z-index: 99;
  font-size: 18px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
