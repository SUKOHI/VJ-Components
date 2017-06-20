Vue.component('bootstrap-buttons', {
    props: [
        'options',
        'name',
        'value',
        'type',
        'size'
    ],
    template: '<div><div class="btn-group">' +
        '<button v-for="(optionText, optionKey) in options" type="button" :class="btnClass" :data-id="optionKey">{{ optionText }}</button>' +
        '</div>' +
        '<input :name="this.name" type="hidden" :value="this.value"></div>',
    methods: {
        active: function() {

            var selectedId = this.value;

            $(this.$el).find('button').each(function(i, el){

                if(selectedId == $(el).data('id')) {

                    $(el).addClass('active');

                } else {

                    $(el).removeClass('active');

                }

            });

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

        var vm = this;
        $(this.$el).find('button').on('click', function(e){

            vm.$emit('input', $(e.target).data('id'));

        });
        this.active();

    },
    watch: {
        value: function (value) {

            $(this.$el).val(value).trigger('change');
            this.active();

        }
    }
});