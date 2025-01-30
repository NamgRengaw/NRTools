<template>
    <component :is="tag" :class="class">
        {{ translatedText }}
    </component>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
    tKey: String,
    tag: {
        type: String,
        default: 'span',
    },
    class: {
        type: String,
        default: '',
    },
})

const { t } = useI18n()
const translatedText = computed(() => t(props.tKey))
</script>