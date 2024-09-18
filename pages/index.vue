<template>
	<div class="">
		<templates-frontpage />
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: ["auth"],
});
</script>
