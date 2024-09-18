<template>
	<templates-ui-lib />
</template>
<script setup lang="ts">
definePageMeta({
	middleware: ["auth"],
});
</script>
