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
    template: '<div><div class="btn-group">' +
        '<button v-for="(optionText, optionKey) in options" type="button" :class="btnClass" :data-id="optionKey" @click="onclick(optionKey)">{{ optionText }}</button>' +
        '</div>' +
        '<input :name="this.name" type="hidden" :value="selectedValue"></div>',
    methods: {
        active: function() {

            var vm = this;
            $(this.$el).find('button').each(function(i, el){

                if(vm.selectedValue == $(el).data('id')) {

                    $(el).addClass('active');

                } else {

                    $(el).removeClass('active');

                }

            });

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

        }
    },
    mounted: function() {

        if(this.defaultValue != undefined) {

            this.selectedValue = this.defaultValue;
            this.$emit('input', this.defaultValue);

        }

        this.active();

        var self = this;
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