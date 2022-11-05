<template>
    <label v-if="label" :for="uuid" class="base-input__label">
        {{ label }}
    </label>
    <input v-bind="{ ...$attrs }" @input="updateValue" :id="uuid" :value="modelValue" :placeholder="label"
        :aria-describedby="error ? `${uuid}-error` : null" :aria-invalid="error ? true : false"
        class="base-input__input">
    <BaseErrorMessage v-if="error" :id="`${uuid}-error`">
        {{ error }}
    </BaseErrorMessage>
</template>
  
<script>
import BaseErrorMessage from './BaseErrorMessage.vue'

import SetupFormComponent from '../composables/setUpFormComponent'
import UniqueID from '../composables/useUniqueID'
export default {
    components: { BaseErrorMessage },
    props: {
        label: {
            type: String,
            default: ''
        },
        error: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number],
            default: ''
        }
    },
    setup(props, context) {
        const { updateValue } = SetupFormComponent(props, context)
        const uuid = UniqueID().getID()

        return {
            updateValue,
            uuid
        }
    }
}
</script>