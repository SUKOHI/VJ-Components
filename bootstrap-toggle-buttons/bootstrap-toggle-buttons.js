Vue.component('bootstrap-toggle-buttons', {
    props: [
        'options',
        'name',
        'value',
        'type',
        'size'
    ],
    data: function () {
        return {
            selectedValues: this.getSelectedKeys()
        }
    },
    template: [
        '<div>',
        '<div class="btn-group">',
        '<button v-for="(optionText, optionKey) in options" type="button" :class="btnClass" :data-id="optionKey" @click="onclick(optionKey)">{{ optionText }}</button>',
        '</div>',
        '<input v-for="(optionText, optionKey) in options" :name="getName(optionKey)" type="hidden" :value="optionKey" v-if="isChecked(optionKey)">',
        '</div>'
    ].join(''),
    methods: {
        active: function() {

            var self = this;
            $(this.$el).find('button').each(function(i, el){

                var key = $(el).data('id');
                $(el).removeClass('active');

                if(self.isChecked(key)) {

                    $(el).addClass('active');

                }

            });

        },
        getName: function(key) {

            return this.name +'['+ key +']';

        },
        isChecked: function(key) {

            return $.inArray(''+ key, this.selectedValues) > -1;

        },
        getSelectedKeys: function() {

            var keys = [];

            for(var key in this.value) {

                var value = this.value[key];

                if(this.options[value] != undefined) {

                    keys.push(''+ value);

                }

            }

            return keys;

        },
        onclick: function(key) {

            if(!this.isChecked(key)) {

                this.selectedValues.push(key);

            } else {

                var removeingIndex = this.selectedValues.indexOf(key);

                if (removeingIndex > -1) {

                    this.selectedValues.splice(removeingIndex, 1);

                }

            }

            this.selectedValues.sort();
            this.$emit('input', this.selectedValues);
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

            this.selectedValues = this.getSelectedKeys();
            this.$emit('input', value);
            this.active();

        },
        options: function() {

            this.selectedValues = this.getSelectedKeys();
            this.$emit('input', this.selectedValues);
            this.active();

        }
    }
});