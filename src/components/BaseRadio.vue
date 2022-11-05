<template>
    <input class="base-radio__input" type="radio" v-bind="{ ...$attrs }" @change="updateValue"
        :checked="modelValue === value" :id="uuid" />
    <label v-if="label" :for="uuid" class="base-radio__label">
        {{ label }}
    </label>
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
        modelValue: {
            type: [String, Number]
        },
        value: {
            type: [String, Number]
        },
        error: {
            type: String,
            default: ''
        }
    },
    setup(props, context) {
        const uuid = UniqueID().getID()
        const { updateValue } = SetupFormComponent(props, context)

        return {
            updateValue,
            uuid
        }
    }
}
</script>
  