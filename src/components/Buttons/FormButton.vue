<template>
        <b-button @click="HandleClick()" >{{type}}</b-button>
</template>

<script>
import { mapActions } from 'vuex';
import CreateForm from '../Form/CreateForm.vue';
import EditForm from '../Form/EditForm.vue';
import DeleteForm from '../Form/DeleteForm.vue';
export default {
    
  name: "Form",
  props:{
    type:{
        type:String,
        required:true
    },
    id:{
      type:Number
    }
  },
  data() {
        return {
        
        };
    },
  methods:{
    ...mapActions({
      set_component:'Modal/set_component',
      open:'Modal/open',
      set_form:'Form/set_form'
    }),
    HandleClick()
    {
      this.set_form(this.id)
      this.set_component(this.Component())
      this.open()
    },
    Component()
    {
      switch(this.type)
      {
        case 'Create':
          return CreateForm
        case 'Edit':
          return EditForm
        case 'Delete':
          return DeleteForm
      }
    }

  },

};
</script>
<style>

</style>