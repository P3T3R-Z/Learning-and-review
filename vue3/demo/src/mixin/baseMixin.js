const baseMixin = {
    data(){
        return {
            title: 'hello world'
        }
    },
    methods:{
        run(){
            this.title = 'has change'
        }
    }
}
export default baseMixin