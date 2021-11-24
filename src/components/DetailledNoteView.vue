<template>
  <div class="container">
    <h2>Post-it bleu</h2>
    <a @click="$router.go(-1)">back</a>
    <div id="app">
      <NoteComponent
      v-for="note in notes"
      :key="note.id"
      :id="note.id"
      :title="note.title"
      :content="note.content"
      :viewable="false"
      :removable="false"
      @updateNote="updateNote"
      @removeNote="removeNote"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import NoteComponent from './NoteComponent';
import AddNote from './AddNote';

export default {
  components: {
    NoteComponent,
    AddNote,
  },
  data() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Username: process.env.USERNAME,
      },
      apiUrl: process.env.API_BASE_URL,
      notes: [],
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.loadNote();
  },

  methods: {
    async loadNote() {
      const response = await fetch(`${this.apiUrl}/notes/${this.id}`, { headers: this.headers });
      const data = await response.json();
      this.notes.push(data.note);
    },
    async updateNote(note) {
      const response = await fetch(`${this.apiUrl}/notes/${note.id}`, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify({
          title: note.title,
          content: note.content,
        }),
      });
      const data = await response.json();
      const idx = this.notes.findIndex(elem => elem.id === data.note_id);
      this.notes[idx] = note;
    },
    async removeNote(id) {
      await fetch(`${this.apiUrl}/notes/${id}`, {
        method: 'DELETE',
        headers: this.headers,
      });
    },
  },
};
</script>

<style scoped>
#app{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 100px;
}
</style>
