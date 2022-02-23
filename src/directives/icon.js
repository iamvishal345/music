export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} float-right text-green-400 text-xl`;
    if (binding.arg === 'full') {
      iconClass = binding.value;
    }
    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};

// Supporting ModifierFlags

// binding.modifiers.name
// pass multiple modifier like v-icon.right.yellow:full  with . is modifier and with : is arg
// we can have multiple modifiers and single args at a time

// To register locally

// add this in component script
/**
  directives:{
    'directive-name': FunctionName
  }

  vue will add v- prefix automatically
 */
