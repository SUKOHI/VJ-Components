Vue.component('bootstrap-buttons', {
    props: [
        'options',
        'name',
        'value',
        'default-value',
        'type',
        'size'
    ],
    data: function () {
        return {
            selectedValue: this.value
        }
    },
    template: '<div><div :class="groupClass">' +
        '<button v-for="(optionText, optionKey) in options" type="button" :class="btnClass" :data-id="optionKey" @click="onclick(optionKey)">{{ optionText }}</button>' +
        '</div>' +
        '<input :name="this.name" type="hidden" :value="selectedValue"></div>',
    methods: {
        active: function() {

            var vm = this;
            var target = $(this.$el).find('button');
            target.each(function(i, el){

                if(vm.selectedValue == $(el).data('id')) {

                    $(el).addClass('active');

                } else {

                    $(el).removeClass('active');

                }

            }).blur();

        },
        onclick: function(value) {

            this.selectedValue = value;
            this.$emit('input', value);
            this.active();

        }
    },
    computed: {
        btnClass: function() {

            var type = 'btn-default';
            var size = 'btn-md';

            if(this.type != undefined) {

                type = 'btn-'+ this.type;

            }
            if(this.size != undefined) {

                size = 'btn-'+ this.size;

            }

            return 'btn '+ type +' '+ size;

        },
        groupClass: function() {

            var css = 'btn-group';

            if(this.size == 'lg' || this.size == 'sm') {

                css += ' btn-group-'+ this.size;

            }

            return css;

        }
    },
    mounted: function() {

        var self = this;

        if(this.defaultValue != undefined) {

            this.selectedValue = this.defaultValue;
            this.$emit('input', this.defaultValue);

        }

        $(function(){

            self.active();

        });

        $(this.$el).find('input').on('change', function(e) {

            self.selectedValue = $(e.target).val();
            self.active();

        });

    },
    watch: {
        value: function (value) {

            this.selectedValue = value;
            this.$emit('input', value);
            this.active();

        }
    }
});