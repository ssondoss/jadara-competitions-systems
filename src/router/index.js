import Vue from "vue";
import Router from "vue-router";
import home from "@/components/home";
import test from "@/components/test";
import Intro from '@/components/intro'
import seasonDetails from '@/components/seasonDetails'
import addSeason from '@/components/add-season'
import AddRound from '@/components/add-round'
import AddQuestion from '@/components/add-question'
import AddTeam from '@/components/add-team'

import QuestionsKeyboard from '@/components/questions-keyboard'
import QuestionCounter from '@/components/question-counter'




Vue.use(Router);

export default new Router({
  routes: [

    {
      path: "/",
      name: "Intro",
      component: Intro,
    },
    {
      path:"/question-counter",
      name:"QuestionCounter",
      component:QuestionCounter
    },
    {
      path: "/home",
      name: "home",
      component: home,
    },
    {
      path: "/questions-keyboard",
      name: "QuestionsKeyboard",
      component: QuestionsKeyboard,
    },

    {
      path: "/season-details",
      name: "seasonDetails",
      component: seasonDetails,
    },


    {
      path: "/add-season",
      name: "addSeason",
      component: addSeason,
    }, {
      path: "/add-round",
      name: "AddRound",
      component: AddRound,
    },
    {
      path: "/add-question",
      name: "AddQuestion",
      component: AddQuestion,
    },
    {
      path: "/add-team",
      name: "AddTeam",
      component: AddTeam,
    },
  ],
});
