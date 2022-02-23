<template>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_message }}
  </div>
  <vee-form ref="form" :validation-schema="schema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label for="name" class="inline-block mb-2">Name</label>
      <vee-field :bails="false" v-slot="{ field, errors }" name="name">
        <input
          type="text"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
              transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Name"
          v-bind="field"
        />
        <div :key="error" class="text-red-600" v-for="error in errors">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label for="email" class="inline-block mb-2">Email</label>
      <vee-field :bails="false" name="email" v-slot="{ field, errors }">
        <input
          type="email"
          placeholder="Enter Email"
          v-bind="field"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        />
        <div :key="error" class="text-red-600" v-for="error in errors">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label for="age" class="inline-block mb-2">Age</label>
      <vee-field :bails="false" name="age" v-slot="{ field, errors }">
        <input
          type="number"
          v-bind="field"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        />
        <div :key="error" class="text-red-600" v-for="error in errors">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label for="password" class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                  transition duration-500 focus:outline-none focus:border-black rounded"
          type="password"
          placeholder="Password"
          v-bind="field"
        />
        <div :key="error" class="text-red-600" v-for="error in errors">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label for="confirmPassword" class="inline-block mb-2">Confirm Password</label>
      <vee-field :bails="false" name="confirmPassword" v-slot="{ field, errors }">
        <input
          v-bind="field"
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Confirm Password"
        />
        <div :key="error" class="text-red-600" v-for="error in errors">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label for="country" class="inline-block mb-2">Country</label>
      <vee-field :bails="false" name="country" v-slot="{ field, errors }">
        <select
          v-bind="field"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="Antarctica">Antarctica</option>
          <option value="Germany">Germany</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>
        <div :key="error" class="text-red-600" v-for="error in errors">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- TOS -->
    <div class="mb-3">
      <div class="pl-6">
        <vee-field
          as="input"
          type="checkbox"
          name="tos"
          value="1"
          id="tos"
          class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        >
        </vee-field>
        <label for="tos" class="inline-block">Accept terms of service</label>
      </div>
      <error-message as="div" class="text-red-600" name="tos"></error-message>
    </div>
    <button
      :disabled="reg_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|email',
        age: 'required|minVal:18|maxVal:100',
        password: 'required|min:8|max:100',
        confirmPassword: 'passwordsMismatch:@password',
        country: 'countryExcluded:Antarctica',
        tos: 'tos',
      },
      userData: {
        country: 'India',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_message: 'Please wait your account is being created',
    };
  },
  methods: {
    async register(values) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      this.reg_alert_variant = 'bg-blue-500';
      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        console.log(error);
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_message = 'Error! Please try again later!';
        return;
      }

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_message = 'Success! Your account has been created!';
      this.$refs.form.resetForm();
      this.reg_in_submission = false;
      this.reg_show_alert = false;
      this.$store.commit('toggleAuthModal');
      this.$store.commit('toggleAuthModal');
    },
  },
};
</script>
