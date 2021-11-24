<template>
  <div class="postit">
    <div>
      <h2><Editable v-model="titleData"/></h2>
      <a v-if="removable" @click="removeNote()"><i class="window close outline icon"></i></a>
      <template v-for="(line, i) in contentDataWithId">
        <div :key="line.key" class="inline">
            <Editable v-model="line.value" />
            <a @click="removeContentByIndex(i)"><i class="close icon"></i></a>
        </div>
      </template>
    </div>
    <div>
      <a v-if="viewable" @click="viewNote()"><i class="eye icon"></i></a>
      <a @click="addContent()"><i class="add icon"></i></a>
      <a @click="save()"><i class="save icon"></i></a>
    </div>
  </div>
</template>

<script>
import Editable from './Editable';

export default {
  name: 'NoteComponent',
  components: {
    Editable,
  },
  props: {
    title: String,
    content: Array,
    viewable: Boolean,
    removable: Boolean,
    id: String,
  },
  data() {
    return {
      titleData: this.title,
      contentData: this.content,
    };
  },
  computed: {
    contentDataWithId() {
      return this.contentData.map(line => ({ value: line, key: this.$uuid.v4() }));
    },
  },
  methods: {
    removeNote() {
      this.$emit('removeNote', this.id);
    },
    viewNote() {
      this.$router.push({ path: `/notes/${this.id}` });
    },
    addContent() {
      this.contentData.push('texte');
    },
    removeContentByIndex(index) {
      this.contentData.splice(index, 1);
    },
    save() {
      this.contentData = this.contentDataWithId.map(elem => elem.value);
      this.$emit('updateNote', { id: this.id, content: this.contentData, title: this.titleData });
    },
  },
};
</script>

<style scoped>
.postit {
  font-size: 15px;
  padding: 15px;
  background-color: #ffff99;
  width: 300px;
  height: 300px;
  margin: 10px;
  box-shadow: 8px 8px 12px #aaa;
}
.window.close.outline.icon {
  position: relative;
  bottom: 60px;
  left: 145px;
}
.inline {
  display: flex;
  justify-content: space-around;
}
</style>
