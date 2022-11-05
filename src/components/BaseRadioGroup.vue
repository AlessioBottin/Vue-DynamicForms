<template>
    <div class="base-radio__group">
        <p v-if="title" class="base-radio__title">{{ title }}</p>
        <component v-for="opts in options" :key="opts.value" :is="vertical ? 'div' : 'span'"
            :class="vertical ? 'base-radio--vertical' : 'base-radio--horizontal'">
            <BaseRadio :name="name" :label="opts.label" :modelValue="modelValue" :value="opts.value"
                @update:modelValue="$emit('update:modelValue', $event)" />
        </component>
    </div>
</template>
  
<script>
import BaseRadio from './BaseRadio.vue';
export default {
    components: { BaseRadio },
    props: {
        vertical: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: [String, Number],
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: false
        }
    }
}
</script>