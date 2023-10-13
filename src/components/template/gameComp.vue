<template>
  <div v-if="clip.length && !endGame" class="game">
    <p class="pontuation">Pontuação: {{ currentPontuation }}</p>
    <progress
      class="progress-bar"
      :value="currentIndex"
      :max="clip.length"
    ></progress>
    <audio ref="audioElement" :src="clip[currentIndex].url"></audio>
    <div v-if="answerStatus === null" class="player">
      <video :src="clip[currentIndex].url" autoplay muted loop></video>
    </div>
    <div class="answer-feedback" v-else>
      <p v-if="answerStatus" :style="{backgroundColor: collorText}">Você acertou a música!</p>
      <p v-else :style="{backgroundColor: collorText}">Você errou a música.</p>
    </div>
    <div class="btn-group">
      <buttonComp label="Dica" hint @click="getHint()" />
      <buttonComp label="Confirmar" confirm @click="confirm()" />
      <buttonComp label="Próximo" next @click="nextClip()" />
    </div>
    <div class="input">
      <input
        :disabled="disabled"
        type="search"
        name=""
        id=""
        v-model="text"
        @keydown="show = true"
      />
      <ul v-show="show">
        <li
          v-for="(lister, index) in list"
          :key="index"
          v-show="lister.music_name.includes(text)"
        >
          <a @click="updateTextAndShowOff(lister.music_name)">{{
            lister.music_name
          }}</a>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="game">
    <p class="msg-final win" v-if="currentPontuation >= 30">
      Parabéns pelo seus {{ currentPontuation }} pontos.
    </p>
    <div class="msg-final lose" v-else>
      <p>Poxa que pena você conseguiu apenas {{ currentPontuation }} pontos.</p>
      <p>Gostaria de tentar novamente?</p>
    </div>
    <router-link to="/">
      <buttonComp class="back-to-menu" normal label="Voltar"></buttonComp>
    </router-link>
  </div>
</template>

<script>
import api from "@/services/api.js";
import buttonComp from "../buttonComp.vue";
export default {
  name: "gameComp",
  components: {
    buttonComp,
  },
  data() {
    return {
      clip: [],
      list: [],
      text: "",
      show: false,
      currentIndex: 0,
      confirmed: false,
      currentPontuation: 0,
      hint: false,
      endGame: false,
      disabled: false,
      answerStatus: null
    };
  },
  async mounted() {
    this.loadList();
    this.loadClip();
  },
  computed: {
    collorText() {
      if(this.answerStatus)
        return 'green'
      return 'red'
    }
  },
  methods: {
    async loadList() {
      const url = "/musics";
      const response = await api.get(url);
      this.list = response.data;
    },
    async loadClip() {
      const url = "/clips";
      const response = await api.get(url);
      this.clip = response.data;
      this.shuffle(this.clip);
    },
    updateTextAndShowOff(newText) {
      this.text = newText;
      this.show = false;
    },
    nextClip() {
      if (this.confirmed) {
        this.confirmed = false;
        this.autoplay = false;
        this.hint = false;
        this.disabled = false;
        this.answerStatus = null
        this.text = "";
        this.currentIndex++;
        if (this.currentIndex >= this.clip.length) {
          this.endGame = true;
          return;
        }
        return;
      }

      return;
    },
    compareAnswer() {
      if (this.text === this.clip[this.currentIndex].name && !this.confirmed) {
        this.currentPontuation += 2;
        this.answerStatus = true;
      } else {
        this.answerStatus = false; 
      }
    },
    confirm() {
      this.disabled = true;
      this.compareAnswer();
      this.confirmed = true;
    },
    getHint() {
      if (!this.hint) {
        this.hint = true;
        this.currentPontuation--;
      }
      this.$refs.audioElement.play();
    },
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
  },
};
</script>

<style>
* {
  margin: 0px;
  box-sizing: border-box;
  padding: 0;
  outline: 0;
}

.game {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 500px;
  border: 5px solid #2c3764;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: #3c7087;
}

.player {
  width: 500px;
  height: 200px;
}

.player video {
  width: 100%;
  height: 100%;
}

.input {
  overflow: auto;
  max-height: 150px;
  width: 250px;
}

.input input {
  width: 100%;
  border: 3px solid black;
  border-radius: 9px;
  background-color: #8da2ac;
  padding: 5px;
}

.input li {
  list-style: none;
  width: 100%;
  margin-top: 3px;
}

.input a {
  width: 100%;
  display: flex;
  flex-direction: column;
}

::-webkit-scrollbar {
  width: 5px;
  background-color: #cdc6ac;
}

::-webkit-scrollbar-thumb {
  background-color: #816477;
  border-radius: 10px;
}

.input a:hover {
  background-color: #b0a19d;
}

.pontuation {
  font-size: 2.1rem;
  margin-bottom: 5px;
}

.progress-bar {
  margin-bottom: 40px;
}

.msg-final {
  font-size: 1.7rem;
  text-align: center;
}

.answer-feedback {
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
}
</style>