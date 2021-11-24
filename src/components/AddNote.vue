<template>
  <div class="addpost">
    <input v-model="newTitle" />
    <input v-model="newText" />
    <button @click="addNote" class="ui primary button">Add Post-it</button>
  </div>
</template>

<script>
export default {
  name: 'AddNote',
  data() {
    return {
      notes: [],
      newTitle: null,
      newText: null,
    };
  },
  methods: {
    addNote() {
      if (!this.newText || !this.newTitle) {
        return;
      }
      this.$emit('addNote', { title: this.newTitle, content: [this.newText] });
      this.newText = '';
      this.newTitle = '';
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
</style>
