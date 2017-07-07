Vue.component('bootstrap-spinner-button', {
    props: ['loading-text'],
    template: [
        '<button type="button" :data-loading-text="computedLoadingText" @click="loading">'+
        '<slot>Submit</slot>'+
        '</button>'
    ].join(''),
    methods: {
        loading: function(e) {

            $(e.target).button('loading');
            this.$emit('spinner:click', true);

        }
    },
    computed: {
        computedLoadingText: function() {

            return (this.loadingText != undefined) ? this.loadingText : '<i class=\'fa fa-spinner fa-spin\'></i> Loading';

        }
    }
});