<template>
  <button class="button" :class="{ normal, next, confirm, hint }">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "buttonComp",
  props: {
    label: {},
    normal: { type: Boolean },
    next: { type: Boolean },
    confirm: { type: Boolean },
    hint: { type: Boolean },
  },
};
</script>

<style>
.button {
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
}

.button.normal {
  width: 200px;
  height: 60px;
  border-radius: 15px;
  margin-top: 25px;
  font-family: "Recursive";
  font-size: 1.8rem;
  background-color: #6d79aa;
}

.button:hover {
  background-color: rgb(234, 229, 226);
}

.button.normal:hover {
  background-color: #606b9c;
  cursor: pointer;
}

.button:active {
  background-color: #788a5c;
}

.button.confirm {
  background-color: #32CD32;
}

.button.confirm:hover {
  background-color: #309d30;
  cursor: pointer;
}

.button.hint {
  background-color: #FFD700;
}

.button.hint:hover {
  background-color: #c1a60f;
  cursor: pointer;
}

.button.next {
  background-color: #4682B4;
}

.button.next:hover {
  background-color: #3b77a8;
  cursor: pointer;
}
</style>