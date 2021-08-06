<template>
  <div class="h-100 bg-scd mb-0 pb-5" v-if="dataIsReady">
    <navbar />
    <div class="py-5">
      <div class="row mx-0" dir="rtl">
        <div
          class="mx-auto px-1 mb-3"
          v-for="(team, index) in teamsInRound"
          :key="index"
          dir="rtl"
        >
          <div
            class="p-4 mb-4 bg-white shadow mx-auto word-break rounded "
            v-bind:class="{ 'alert-info': teamTurn == team.teamID }"
          >
            <img src="../assets/male.png" alt="" height="200" width="200" />

            <div class="text-center mt-4 word-break font-weight-bold">
              {{ team.teamName }}
            </div>
            <hr />
            <div dir="rtl" class="h5">{{ team.noOfCorrectAnswer }} نقطه</div>
          </div>
        </div>
      </div>
      <div class="row mx-0 justifiy-content-center text-center mt-5 px-lg-5">
        <div
          class="mx-auto my-4"
          style="width: 100px"
          v-for="(question, index) in questions"
          :key="index"
        >
          <button  v-if="!question.isAvailable"
            @click="goToQuestionPage(question.questionID)"
            class="circle shadow d-flex mx-auto"
          >
            <span
              class="m-auto font-weight-bold h5"

              >{{ index + 1 }}
            </span>
          </button>
          <button
                    @click="unAvailable()"
            class="circle shadow d-flex mx-auto bg-main2"  v-if="question.isAvailable"
          >
            <span
              class="m-auto font-weight-bold h5"

              >{{ index + 1 }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from "./navbar";
import axios from "axios";

export default {
  name: "QuestionsKeyboard",
  components: {
    navbar,
  },
  created() {
    this.id = this.$route.query.id;
    this.getAllQuestions();
    this.getRound();
    // this.getAvailableQuestions();
    this.changeTeamTurn();
  },
  data: () => {
    return {
      id: 0,
      questions: [],
      url: process.env.VUE_APP_API,
      teamsInRound: {},
      teamTurn: 0,
      availableQuestions: {},
      dataIsReady: false,
      roundQuestionDetails: {},
    };
  },
  methods: {
    unAvailable(){
        this.$swal("هذا السؤال غير متاح !");
    },
    // getAllQuestions() {
    //   axios.get(this.url + "/RoundQuestions/" + this.id).then(
    //     (res) => {
    //       this.questions = res.data;
    //        axios
    //     .get(this.url + "/TeamAnswers/availableQuestions/" + this.id)
    //     .then((res) => {
    //       this.availableQuestions = res.data;
    //          this.dataIsReady = true;
    //     });
    //     },
    //     (err) => {}
    //   );
    // },
    getAllQuestions() {
      axios
        .get(this.url + "/TeamAnswers/availableQuestions/" + this.id)
        .then((res) => {
          this.questions = res.data;
        });
    },
    getRound() {
      axios.get(this.url + "/Teams/RoundTeams/" + this.id).then(
        (res) => {
          this.teamsInRound = res.data;
          axios
            .get(
              this.url +
                "/TeamAnswers/" +
                this.id +
                "/" +
                this.teamsInRound[0].teamID
            )
            .then((res) => {
              this.teamsInRound[0].noOfCorrectAnswer =
                res.data.noOfCorrectAnswer;
            });
          axios
            .get(
              this.url +
                "/TeamAnswers/" +
                this.id +
                "/" +
                this.teamsInRound[1].teamID
            )
            .then((res) => {
              this.teamsInRound[1].noOfCorrectAnswer =
                res.data.noOfCorrectAnswer;
                this.dataIsReady=true;
            });
        },
        (err) => {}
      );
    },
    changeTeamTurn() {
      axios.get(this.url + "/TeamAnswers/Turn/" + this.id).then((res) => {
        this.teamTurn = res.data.teamId;
      });
    },
    goToQuestionPage(roundQuestionId) {
      axios.get(this.url + "/RoundQuestions/" + this.id).then((res) => {
        res.data.forEach((element) => {
          if (element.id == roundQuestionId) {
            this.roundQuestionDetails = element;

          }
        });
            this.$router.push({
              path: "/question-counter",
              query: {
                questionId: this.roundQuestionDetails.question.id,
                team: this.teamTurn,
                roundQuestionId: roundQuestionId,
              },
            });
      });
    },

    getAvailableQuestion(questionId) {
      for (const question of this.availableQuestions) {
        if (question.questionID == questionId) return question;
      }
    },
  },
};
</script>
<style scoped>
.circle {
  height: 70px;
  width: 70px !important;
  background-color: #fff;
  color: #28527a;
  /* border: 2px solid #28527a; */
  border: none !important;

  border-radius: 50%;
}
.circle:hover {
  height: 73px;
  width: 73px !important;

  background-color: #28527a;
  color: #fff;
  transition: 1s;
  border: none !important;
  outline: none !important;
}
.circle:focus {
  height: 73px;
  width: 73px !important;

  background-color: #28527a;
  color: #fff;
  transition: 1s;
  border: none !important;
  outline: none !important;
}
.alert-info {
  background-color: #d1ecf1 !important;
  border: 1px solid #bee5eb !important;
  color: #0c5460 !important;
}
</style>
