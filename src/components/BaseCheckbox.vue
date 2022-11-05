<template>
    <label :for="uuid" v-if="label" class="base-checkbox__label">
        {{ label }}
    </label>
    <input v-bind="{ ...$attrs }" @input="updateValue" :checked="modelValue" :id="uuid" type="checkbox"
        class="base-checkbox__input" />
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
            type: Boolean
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

<style scoped>
label {
    margin-right: 10px;
}
</style>