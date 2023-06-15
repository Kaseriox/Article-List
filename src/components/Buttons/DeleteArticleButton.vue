<template>
    <div>
        <button @click="DeleteArticle">Delete</button>
    </div>
</template>
  
<script>
import {bus} from '../../main'
export default {
    name: "DeleteArticleButton",
    props:{
        id:{
            type:Number,
            required:true   
        }
    },
    data() {
        return {
        };
    },
    methods:{
        async DeleteArticle()
        {
            const response = await this.$DeleteArticle(this.id)
            if(response.statusText === 'OK')
            {
                bus.$emit('Notification','Succesfully Deleted Article')
            }
            else
            {
                bus.$emit('Notification','Failed To Delete Article')
            }
        }
    }
};
</script>