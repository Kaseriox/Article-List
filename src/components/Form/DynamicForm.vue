<template v-if="FormComponent">
    <component :is="FormComponent" :id="this.id"></component>
</template>
  
<script>
import CreateForm from './CreateForm.vue';
import EditForm from './EditForm.vue';
import {bus} from '../../main'
export default {
    name: "DynamicForm",
    components: {CreateForm,EditForm},
    data() {
        return {
            FormComponent:undefined,
            id:undefined
        };
    },
    methods:{
        Open(type)
        {
            this.$store.dispatch('open',type)
        },
    },
    created()
    {
        bus.$on('Clicked', (data) =>
        {
           this.FormComponent = data.type === 'Edit' ? EditForm : CreateForm
           this.id = data.id
           this.Open(data.type)
        })
    }
};
</script>