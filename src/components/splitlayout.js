import { defineAsyncComponent } from 'vue'
import LayoutArea from './LayoutArea.vue'
import store from '../store/store.js'

export default function(){
  return {
    components: {
      LayoutArea: defineAsyncComponent(() => Promise.resolve(LayoutArea))
    },
    props: {
      activeWindow: Number,
      layout: Object,
      msg: String
    },
    computed:{
      size(){
        return store.state.size[this.layout.no]
      }
    },
    methods: {
      dragStart: ($event) => {
        console.log('start',[$event.clientY,$event.layerY,$event.offsetY,$event.pageY,$event.screenY])
      },
      dragEnd: ($event) => {
        console.log('end',[$event.clientY,$event.layerY,$event.offsetY,$event.pageY,$event.screenY])
      },
      dragOver: ($event) => {
        console.log('over',[$event.clientY,$event.layerY,$event.offsetY,$event.pageY,$event.screenY])
      },
      drag: ($event) => {
        console.log('drag',[$event.clientY,$event.layerY,$event.offsetY,$event.pageY,$event.screenY])
      },
    }
  }
}
