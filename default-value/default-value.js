Vue.directive('default-value', {
    bind: function(el, binding, vnode) {

        var model = '';

        for(var key in vnode.data.directives) {

            var directive = vnode.data.directives[key];

            if(directive.rawName == 'v-model') {

                model = directive.expression;
                break;

            }

        }

        Vue.set(vnode.context, model, binding.value);

    }
});