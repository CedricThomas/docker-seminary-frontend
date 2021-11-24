import Vue from 'vue';
import Router from 'vue-router';
import NotesView from '@/components/NotesView';
import DetailledNoteView from '@/components/DetailledNoteView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/notes/:id',
      name: 'DetailledNoteView',
      component: DetailledNoteView,
    },
    {
      path: '/notes',
      name: 'NotesView',
      component: NotesView,
    },
  ],
});
