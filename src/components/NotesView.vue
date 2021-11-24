<template>
  <div class="container">
    <h2>Post-it</h2>
    <AddNote @addNote="addNote"/>
    <div id="app">
      <NoteComponent
      v-for="note in notes"
      :key="note.id"
      :id="note.id"
      :title="note.title"
      :content="note.content"
      :viewable="true"
      :removable="true"
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
    };
  },
  mounted() {
    this.loadNotes();
  },

  methods: {
    async loadNotes() {
      const response = await fetch(`${this.apiUrl}/notes`, { headers: this.headers });
      const data = await response.json();
      this.notes = data.notes;
    },
    async addNote(note) {
      const response = await fetch(`${this.apiUrl}/notes`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(note),
      });
      const data = await response.json();
      const NewNote = {
        id: data.note_id,
        ...note,
      };
      this.notes.push(NewNote);
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
      this.notes = this.notes.filter(elem => elem.id !== id);
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
