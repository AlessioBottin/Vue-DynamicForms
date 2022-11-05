<template>
  <form @submit.prevent="OnSubmit" class="dynamic-form__form">

    <!-- Fieldsets  -->
    <fieldset class="dynamic-form__fieldset" v-for="{ legend, fields } in schema.fieldsets">
      <legend class="dynamic-form__legend" v-if="legend">{{ legend }}</legend>
      <div v-for="{ as, name, label, vmodel, ...attrs } in fields" :key="name" class="dynamic-form__field">
        <component :is="as" :label="label" v-model="formData[vmodel]" :name="name" v-bind="{ ...attrs }"
          :error="errors[vmodel]">
        </component>
      </div>
    </fieldset>

    <!-- Button submit  -->
    <button type="submit" class="dynamic-form__submit">
      <slot>Submit</slot>
    </button>

  </form>
</template>

<script>
import { reactive } from 'vue'
import BaseCheckbox from './BaseCheckbox.vue';
import BaseInput from './BaseInput.vue';
import BaseSelect from './BaseSelect.vue';
import BaseRadioGroup from './BaseRadioGroup.vue';

export default {
  name: 'DynamicForm',
  components: {
    BaseInput,
    BaseCheckbox,
    BaseSelect,
    BaseRadioGroup
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {

    const { data, validation: validationSchema, validationYup: validationSchemaYup } = props.schema
    const formData = reactive(data)
    const errors = reactive({})

    /**
     * Takes a validationSchema and applies every validation function to the correspondant key on formData then if any error is found update directly error obj
     * @param {obj} validationSchema custom validation schema 
     * @param {obj} formData 
     * @param {obj} errors the errors obj to display
     * @returns {bool} wether there is an error
     */
    const validateWithCustomValidation = (validationSchema, formData, errors) => {
      let errorFound = false
      Object.entries(validationSchema).forEach(([key, validate]) => {
        const msg = validate(formData[key])
        if (typeof (msg) === 'string') {
          errors[key] = msg
          errorFound = true
        }
      })
      return errorFound
    }

    /**
    * Takes a validationSchema and await for yup to validate the keys, then if any error is found update directly error obj
    * @param {obj} validationSchema yup validation schema 
    * @param {obj} formData 
    * @param {obj} errors the errors obj to display
    * @returns {bool} wether there is an error
    */
    const validateWithYup = async (validationSchema, formData, errors) => {
      let errorFound = false
      try {
        await validationSchema.validate(formData)
      } catch (err) {
        const key = err.message.split(' ')[0]
        errors[key] = err.message
        errorFound = true
      }
      return errorFound
    }

    const OnSubmit = async () => {

      // Reset error messages
      Object.keys(errors).forEach(k => errors[k] = '')

      // Check for errors
      let errorCustom, errorYup
      errorCustom = validateWithCustomValidation(validationSchema, formData, errors)
      errorYup = await validateWithYup(validationSchemaYup, formData, errors)

      if (errorCustom || errorYup) return

      emit('formValidated', formData)

    };

    return { formData, OnSubmit, errors }
  }
};
</script>

<style >
@import '../style.css';
</style>