Vue.component('bootstrap-datepicker', {
    props: [
        'value',
        'options'
    ],
    template: '<input type="text" :value="this.value" />',
    mounted: function() {

        var vm = this;
        $(this.$el).datepicker(this.options).on('changeDate', function(e){

            vm.$emit('input', $(e.target).val());

        });

    },
    watch: {
        value: function (value) {

            $(this.$el).val(value).trigger('change');
            $(this.$el).datepicker('update', value);

        }
    }
});