Vue.component('bootstrap-label', {
    props: [
        'options',
        'name',
        'value'
    ],
    template: '<div>' +
        '<span v-for="option in this.options" :class="labelClass(option.type)" :data-id="option.id" v-if="isSelected(option.id)" style="cursor:pointer;">{{this.value}}{{ option.text }}</span>' +
        '<input :name="this.name" type="hidden" :value="this.value"></div>',
    methods: {
        labelClass: function(type) {

            var label = 'label-default';

            if(type != undefined) {

                label = 'label-'+ type;

            }

            return 'label '+ label;

        },
        isSelected: function(id) {

            return (id == this.value);

        }
    },
    watch: {
        value: function (value) {

            this.$emit('change');

        }
    }
});