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

        if(model.indexOf('.') > -1) {

            function stringToObj(path, value, obj) {
                var parts = path.split('.'), part;
                while (part = parts.shift()) {
                    if (typeof obj[part] != 'object') {
                        obj[part] = {};
                    }
                    if (parts.length === 0) {
                        obj[part] = value;
                    } else {
                        obj = obj[part];
                    }
                }
            }
            stringToObj(model, binding.value, vnode.context._data);

        } else {

            Vue.set(vnode.context, model, binding.value);

        }

    }
});