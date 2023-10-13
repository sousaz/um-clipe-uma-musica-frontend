<template>
  <div>
    <video ref="videoPlayer" controls :src="'../assests/video/'+ this.clip[0].url"></video>
    <button @click="playNextClip" v-if="true">Próximo Clip</button>
  </div>
</template>

<script>
import axios from "@/services/api.js";

export default {
  data() {
    return {
      clips: [],
      currentClipIndex: 0
    };
  },
  computed: {
    currentClip() {
      return this.clips[this.currentClipIndex];
    },
    hasNextClip() {
      return this.currentClipIndex < this.clips.length - 1;
    }
  },
  methods: {
    async fetchClips() {
      try {
        const response = await axios.get('/clips');
        this.clips = response.data;
        console.log(this.clips)
      } catch (error) {
        console.error('Erro ao buscar os clips:', error);
      }
    },
    playNextClip() {
      console.log(this.clips[0].url)
      return this.clips[0].url.toString()
      // if (this.hasNextClip) {
      //   this.currentClipIndex++;
      //   this.$refs.videoPlayer.load();
      //   this.$refs.videoPlayer.play();
      // }
    }
  },
  mounted() {
    this.fetchClips();
  }
};
</script>
