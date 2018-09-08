Vue.component('bootstrap-toggle-button', {
    props: [
        'options',
        'name',
        'value',
        'type',
        'size'
    ],
    data: function () {
        return {
            checked: this.value
        }
    },
    template: [
        '<div>',
        '<div class="btn-group">',
        '<button type="button" :class="btnClass" @click="onclick()"><slot></slot></button>',
        '</div>',
        '<input :name="this.name" type="hidden" value="1" v-if="checked">',
        '</div>'
    ].join(''),
    methods: {
        active: function() {

            var target = $(this.$el).find('button');

            if(this.checked) {

                target.addClass('active');

            } else {

                target.removeClass('active');

            }

            target.blur();

        },
        onclick: function() {

            this.checked = !this.checked;
            this.$emit('input', this.checked);
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

        this.active();

    },
    watch: {
        value: function (value) {

            this.checked = value;
            this.active();
            this.$emit('input', value);

        }
    }
});