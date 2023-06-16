<template v-if="FormComponent">
    <component :is="FormComponent" :id="this.id"></component>
</template>
  
<script>
import CreateForm from './CreateForm.vue';
import EditForm from './EditForm.vue';
import DeleteForm from './DeleteForm.vue';
import {bus} from '../../main'
export default {
    name: "DynamicForm",
    components: {CreateForm,EditForm,DeleteForm},
    data() {
        return {
            FormComponent:undefined,
            id:undefined
        };
    },
    methods:{
        Open()
        {
            this.$store.dispatch('Modal/open')
        },
        IsComponent(type)
        {
            let ComponentType 
            switch (type)
            {
                case 'Edit':
                    ComponentType = EditForm
                break
                case 'Create':
                    ComponentType = CreateForm
                break
                case 'Delete':
                    ComponentType = DeleteForm
                break
            }
            return ComponentType
        }
    },
    created()
    {
        bus.$on('Clicked', (data) =>
        {

           this.FormComponent = this.IsComponent(data.type)
           this.id = data.id
           this.Open(data.type)
        })
    },
    watch:{
    '$store.state.Modal.Open':function()
    {
        
      if(!this.$store.getters['Modal/Active']){
        this.FormComponent = undefined
        return
        }
    }
  }
};
</script>