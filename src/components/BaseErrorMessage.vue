<template>
    <p aria-live="assertive" class="dynamic-form__error" :id="id">
        <slot></slot>
    </p>
</template>
  
<script>
export default {
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    }
}
</script>
