<template>
  <div class="h-100 bg-scd p-2">
    <navbar />
    <div
      class="p-md-4 p-3 rounded shadow bg-white m-md-4 my-4 border-bottom-scd"
    >
      <div class="mb-5 p-3 bg-scd h2">{{ teamName }}</div>
      <div class="row mx-0">
        <div class="col-md-5 col-xl-6 m-auto" dir="rtl" id="countdown">
          <div id="countdown-number" class="mx-auto">{{ counter }}</div>
          <svg>
            <circle r="60" cx="90" cy="90"></circle>
          </svg>
        </div>
        <div
          class="col-md-7 col-xl-6 text-right px-lg-4 px-md-1 mt-4 px-1"
          dir="rtl"
        >
          <div class="text-right" dir="rtl">
            <div class="h4 mb-4">{{ question.questionText }} ؟</div>
          </div>
          <div
            class="border p-3 my-3 h5"
            @click="choose(question.firstChoice, 1)"
            v-bind:class="{ 'alert-success': selectedNumberChoice == 1 }"
          >
            {{ question.firstChoice }} .1
          </div>
          <div
            class="border p-3 my-3 h5"
            @click="choose(question.secondChoice, 2)"
            v-bind:class="{ 'alert-success': selectedNumberChoice == 2 }"
          >
            {{ question.secondChoice }} .2
          </div>
          <div
            class="border p-3 my-3 h5"
            @click="choose(question.thirdChoice, 3)"
            v-bind:class="{ 'alert-success': selectedNumberChoice == 3 }"
          >
            {{ question.thirdChoice }} .3
          </div>
          <div
            class="border p-3 my-3 h5"
            @click="choose(question.fourthChoice, 4)"
            v-bind:class="{ 'alert-success': selectedNumberChoice == 4 }"
          >
            {{ question.fourthChoice }} .4
          </div>
          <button class="btn btn-main w-100 my-3" @click="confirm()">
            تأكيد
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
  name: "QuestionCounter",
  components: {
    navbar,
  },
  data: () => {
    return {
      questionId: 0,
      question: {},
      url: process.env.VUE_APP_API,
      counter: 30,
      selectedAnswer: "",
      teamID: 0,
      roundQuestionId: 0,
      selectedNumberChoice: 0,
      teamName: "",
      endCounterAlert: false,
      counterInterval:{}
    };
  },
  created() {
    this.questionId = this.$route.query.questionId;
    this.teamID = this.$route.query.team;
    this.roundQuestionId = this.$route.query.roundQuestionId;
    this.getTeamName();

    this.getQuestion();

    this.counterInterval = setInterval(() => {
      if (this.counter > 0) this.counter = this.counter - 1;
      else {
        this.counterFinished();
        clearInterval(this.counterInterval);
      }
    }, 1000);
  },

  methods: {
    choose(answer, i) {
      this.selectedAnswer = answer;
      this.selectedNumberChoice = i;
    },
    confirm() {
      if (this.selectedAnswer != "" && this.counter > 0) {
        this.endCounterAlert = true;
        axios
          .post(this.url + "/TeamAnswers/", {
            roundQuestionID: this.roundQuestionId,
            teamID: this.teamID,
            selectedAnswer: this.selectedAnswer,
          })
          .then((res) => {
            if (this.selectedNumberChoice == this.question.correctChoice) {
              this.$swal({
                position: "center",
                icon: "success",
                title: "إجابتك صحيحة",
                showConfirmButton: true,
              }).then((result) => {
                 clearInterval(this.counterInterval);

                window.history.back();
              });
            } else if (this.selectedNumberChoice != this.question.correctChoice)
              this.$swal({
                icon: "error",
                title: " .. للأسف",
                text: "إجابتك خاطئة !",
              }).then((result) => {
                clearInterval(this.counterInterval);

                window.history.back();
              });
          });
      }
    },
    getQuestion() {
      axios.get(this.url + "/Questions/" + this.questionId).then(
        (res) => {
          this.question = res.data;
          console.log(this.question);
        },
        (err) => {}
      );
    },

    getTeamName() {
      axios.get(this.url + "/Teams/" + this.teamID).then((res) => {
        this.teamName = res.data.name;
      });
    },
    counterFinished() {
      if (this.counter == 0 && this.endCounterAlert == false) {
        this.$swal({
          icon: "error",
          title: "للأسف ..",
          text: "لقد انتهى وقتك !",
        }).then(() => {
          window.history.back();
        });
      }
    },
  },
};
</script>
<style scoped>
.circle {
  height: 80px;
  width: 80px !important;
  background-color: #eeeeee;
  color: #000;

  border-radius: 50%;
}

#countdown {
  position: relative !important;
  margin: auto;
  justify-content: center;
  text-align: center;
}

#countdown-number {
  color: red;
  top: 31%;
  font-weight: bold;
  font-size: 22px;
  left: 50%;
  right: 50%;
  position: absolute;
}

svg {
  width: 153px;
  height: 153px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

svg circle {
  stroke-dasharray: 380px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 5px;
  stroke: red;
  fill: none;
  animation: countdown 30s linear forwards;
}

@keyframes countdown {
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 380px;
  }
}
@media screen and (max-width: 450px) {
  .h4 {
    font-size: 18px !important;
  }
  .h5 {
    font-size: 16px !important;
  }
  .h2 {
    font-size: 20px !important;
  }
}
</style>
