<script setup>
import {onMounted, onUnmounted, ref} from "vue"
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    switch (label) {
      case 'javascript':
        return new tsWorker();
      default:
        return new editorWorker()
    }
  }
};

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

const props = defineProps({
  modelValue: {
    type: String,
    default: '{"foo":"bar"}'
  },
});

const emit = defineEmits(['update:modelValue']);

const container = ref()

let instance = null

onMounted(() => {
  instance = monaco.editor.create(container.value, {
    value: 'let hello = "hello"',
    language: 'javascript',
    tabSize: 2,
  })

  instance.onDidChangeModelContent(() => {
    emit('update:modelValue', instance.getValue());
  });
})

onUnmounted(() => {
  instance?.dispose()
})
</script>

<template>
  <div id="container" ref="container"></div>
</template>

<style scoped>
#container {
  height: 100vh;
  width: 100vw;
}
</style>