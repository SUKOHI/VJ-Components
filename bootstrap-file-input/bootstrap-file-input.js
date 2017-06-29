Vue.component('bootstrap-file-input', {
    props: [
        'name',
        'placeholder',
        'accept',
        'btn-color',
        'btn-label',
        'input-bg-color',
        'value'
    ],
    template: [
        '<div class="input-group">',
        '<input class="form-control" :style="computedInputBgColor" type="text" :placeholder="computedPlaceholder" :value="this.value" readonly>',
        '<label class="input-group-btn">',
        '<span :class="buttonClass">',
        '{{ computedBtnLabel }} <input :name="this.name" class="hidden" type="file" :accept="this.accept">',
        '</span>',
        '</label>',
        '</div>'
    ].join(''),
    computed: {
        buttonClass: function() {

            var buttonClass = 'btn ';

            if(this.btnColor != '' && this.btnColor != undefined) {

                buttonClass += 'btn btn-'+ this.btnColor;

            } else {

                buttonClass += 'btn btn-default';

            }

            return buttonClass;

        },
        computedBtnLabel: function() {

            var text = 'Browse';

            if(this.btnLabel != '' && this.btnLabel != undefined) {

                text = this.btnLabel;

            }

            return text;

        },
        computedPlaceholder: function() {

            var placeholder = '';

            if(this.placeholder == undefined) {

                placeholder = 'select file...';

            } else if(this.placeholder != '') {

                placeholder = this.placeholder;

            }

            return placeholder;

        },
        computedInputBgColor: function() {

            var backgroundColor = '#ffffff';

            if(this.inputBgColor != undefined && this.inputBgColor != '') {

                backgroundColor = this.inputBgColor;

            }

            return 'background:'+ backgroundColor +';';

        }
    },
    watch: {
        value: function() {

            $(':file').val('');

        }
    },
    mounted: function() {

        var component = this.$el;

        $(component).on('change', ':file', function() {

            var filename = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');
            $(component).find(':text').val(filename);

        });

        $(component).on('click', ':text', function() {

            $(component).find(':file').click();

        });

    }
});