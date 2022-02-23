import {
  Form as VeeForm, Field as VeeField, ErrorMessage, defineRule,
  configure,
} from 'vee-validate';
import {
  required,
  min,
  max, alpha_spaces as alphaSpaces, email, min_value as minVal,
  max_value as maxVal, confirmed, not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);
    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alphaSpaces', alphaSpaces);
    defineRule('email', email);
    defineRule('minVal', minVal);
    defineRule('maxVal', maxVal);
    defineRule('passwordsMismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('countryExcluded', excluded);
    defineRule('tos', required);
    defineRule('modifiedSong', required);

    configure(
      {
        generateMessage: (ctx) => {
          const messages = {
            required: `The field ${ctx.field} is required.`,
            min: `The field ${ctx.field} is too short.`,
            max: `The field ${ctx.field} is too long.`,
            alphaSpaces: `The field ${ctx.field} is not Valid.`,
            email: `The field ${ctx.field} must be a valid email.`,
            minVal: `The field ${ctx.field} is too low.`,
            maxVal: `The field ${ctx.field} is too high.`,
            excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
            countryExcluded: 'Due to restrictions we do not accept users from this location.',
            passwordsMismatch: "The password don't match.",
            tos: 'You must accept the Terms of Service.',
            modifiedSong: 'Song Title is required',
          };
          const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid.`;
          return message;
        },
        validateOnBlur: true,
        validateOnChange: true,
        validateOnInput: false,
        validateOnModelUpdate: true,
      },
    );
  },
};
