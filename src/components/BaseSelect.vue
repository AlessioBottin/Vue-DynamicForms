<template>
    <label v-if="label" :for="uuid" class="base-select__label">
        {{ label }}
    </label>
    <select v-bind="{ ...$attrs }" @input="updateValue" :value="modelValue" :id="uuid"
        :aria-describedby="error ? `${uuid}-error` : null" :aria-invalid="error ? true : false"
        class="base-select__select">
        <option v-for="option in options" :value="option" :key="option" :selected="option === modelValue"
            class="base-select__option">
            {{ option }}
        </option>
    </select>
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
        options: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            default: ''
        },
        error: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number]
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