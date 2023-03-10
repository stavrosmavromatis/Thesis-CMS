<template>
  <div class="parent-card-container">
    <v-card
      elevation="10"
      class="parent-card-container__border-radius"
      :disabled="Percentage === 100"
    >
      <div class="parent-card__department-title">
        <v-card-title> {{department_name}} </v-card-title>
      </div>
      <v-divider
        class="border-opacity"
        length="100%"
        thickness="1px"
        :vertical="false"
      ></v-divider>
      <div class="parent-card__main-info">
        <v-card-text>
          <div class="parent-card__main-info__labels">
            <div class="label__hours">
              <label style="font-weight: 500;">Ώρες Εργαστηρίου:</label>
              <label>{{timestring}}</label>
            </div>
            <div class="label__duration">
              <label>Διάρκεια (ώρες):</label>
              <label>{{`~ ${duration} ώρες`}}</label>
            </div>
            <div class="label__max-seats">
              <label>Μέγιστες Θέσεις:</label>
              <label>{{max_seats}}</label>
            </div>

            <div class="label__available-seats">
              <label>Διαθέσιμες Θέσεις:</label>
              <label style="font-weight: 500;">{{available_seats}}</label>
            </div>
            <div class="label__department-completeness">
              <label style="font-weight: 500;">Πληρότητα Τμήματος: </label>
              <label style="font-weight: 500;">{{`${Percentage}%`}}</label>
            </div>
          </div>
          <div class="progress-bar">
            <v-progress-linear
              :model-value="Percentage"
              :class="{
                'progress-bar__80-100' : Percentage >= 80,
                'progress-bar__60-80' : Percentage >= 60 && Percentage < 80,
                'progress-bar__40-60' : Percentage >= 40 && Percentage < 60,
                'progress-bar__20-40' : Percentage >= 20 && Percentage < 40,
                'progress-bar__0-20' : Percentage >= 0 && Percentage < 20,
              }"
              height="15px"
              :striped="Percentage < 100 ? true : false"
              rounded="5rem"
              :rounded-bar="true"
              :tag="'div'"
            ></v-progress-linear>
          </div>
          <div class="enroll-button">
            <v-btn @click="enroll()" variant="outlined" :class="{'button__border-color' : Percentage < 100,'button__border-color__full' : Percentage === 100}" :rounded="true">
              <div class="enroll-button__inside">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 2048 2048"
                >
                  <path
                    fill="black"
                    d="M1848 896q42 0 78 15t64 42t42 63t16 78q0 39-15 76t-43 65l-717 719l-377 94l94-377l717-718q28-28 65-42t76-15zm51 249q21-21 21-51q0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 694l-34 135l135-34l692-693zM640 896H512V768h128v128zm896 0H768V768h768v128zM512 1152h128v128H512v-128zm128-640H512V384h128v128zm896 0H768V384h768v128zM384 1664h443l-32 128H256V0h1536v743q-67 10-128 44V128H384v1536zm384-512h514l-128 128H768v-128z"
                  />
                </svg>
                <label :class="{'label__fill-color' : Percentage < 100,'label__fill-color__full' : Percentage === 100}">{{ ButtonText }}</label>
              </div>
            </v-btn>
          </div>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from "vue";
export default defineComponent({
  props: {
    duration: {
      type: Number,
      required: false,
      default:2
    },
    max_seats: {
      type: Number,
      required: false,
      default:50
    },
    available_seats:{
      type: Number,
      required: false,
      default:0
    },
    department_name:{
      type: String,
      required: false,
      default:'T1'
    },
    timestring:{
      type: String,
      required: false,
      default:'09:30-11:30'
    }
  },
  setup(props) {
    const {available_seats,duration,max_seats,department_name,timestring } = toRefs(props);
    const ButtonText = computed(() => {
      if (Percentage.value === 100) return "ΠΛΗΡΕΣ";
      if (!Percentage.value || Percentage.value < 100) return "ΕΓΓΡΑΦΗ";
    });
    const Percentage = computed(():number => {
      if(!available_seats.value || !max_seats.value)
        return 100;
      if(max_seats.value < available_seats.value)
        return 100;
      return (  (max_seats.value - available_seats.value)/ max_seats.value ) * 100;
    });
    const enroll = () => {
      //do something!
    };
    return { available_seats,duration,max_seats,department_name, timestring,ButtonText,Percentage,enroll};
  },
});
</script>

<style scoped>
.parent-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  min-width: 320px;
  padding: 1rem 1rem;
}
.parent-card-container__border-radius {
  border-radius: 32px;
}
.parent-card__department-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 0.5rem;
}
.parent-card__department-title > .v-card-title {
  font-weight: 1000;
  font-size: 1.8rem;
}
.parent-card__main-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.5rem;
}
div.parent-card__main-info__labels {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  line-height: 2rem;
  font-weight: 400;
}

.parent-card__main-info__labels > .label__department-completeness {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
  flex: 1 0;
}
.parent-card__main-info__labels > .label__available-seats {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex: 1 0;
}
.parent-card__main-info__labels > .label__max-seats {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex: 1 0;
}
.parent-card__main-info__labels > .label__duration {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex: 1 0;
}
.parent-card__main-info__labels > .label__hours {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
  flex: 1 0;
}
.parent-card__main-info > .v-card-text {
  font-weight: 400;
  font-size: 1.2rem;
}

.button__border-color{
  color:#272996;
  background-color:#f3f3f3;
}
.button__border-color__full{
  color:#ff4545;
  background-color:#f3f3f3;
}
.label__fill-color{
  color:#272996;
}
.label__fill-color__full{
  color:#ff4545;
}
.enroll-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}
.enroll-button__inside {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  gap: 0.3rem;
}
.enroll-button__inside > label {
  cursor: pointer;
}

.progress-bar {
  margin: 0.2rem 0;
  width: 100%;
}

.progress-bar__0-20{
  color:green
}
.progress-bar__20-40{
  color: darkgreen
}
.progress-bar__40-60{
  color: yellowgreen
}
.progress-bar__60-80{
  color: rgb(255, 166, 0)
}
.progress-bar__80-100{
  color: #ff4545;
}
.border-opacity {
  opacity: 50%;
  margin: 0 1rem;
}
</style>
