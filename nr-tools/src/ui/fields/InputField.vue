<template>
    <q-input 
        ref="inputRef"
        outlined 
        label-slot
        :class="inputClass" 
        :type="type"
        :model-value="modelValue"
        @update:model-value="emitUpdate"
        lazy-rules="ondemand"
        :rules="rules"
        :disable="disabled"
        :readonly="readonly"
        >
        <template v-slot:label>
            <Typography :tKey="label"/>
        </template>
        <template v-slot:append v-if="$slots.append">
            <slot name="append"></slot>
        </template>
    </q-input>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from 'vue';
import Typography from '@/ui/text/Typography.vue';

defineProps({
    modelValue: [String, Number, null],
    rules: Array,
    label: String,
    type: String,
    inputClass: String,
    disabled: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
})

const emit = defineEmits(['update:modelValue']);

const emitUpdate = (value) => {
  emit('update:modelValue', value);
};

const inputRef = ref(null);

defineExpose({
    validate: () => inputRef.value?.validate()
})

</script>