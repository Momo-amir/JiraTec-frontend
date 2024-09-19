<template>
	<div class="flex mx-auto w-full">
		<div class="w-1/2">
			<div class="mx-6 my-4 flex flex-col gap-y-4">
				<h1 class="text-h1">{{ props.title }}</h1>
				<p class="text-sm">{{ props.description }}</p>
			</div>
		</div>
		<div v-if="props.imageUrl" class="w-1/2">
			<img alt="Hero Image" class="w-full rounded-lg" src="/assets/images/heroimage.png" />
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	title: string;
	description: string;
	imageUrl: string;
}>();

console.log("Props received in Hero.vue:", props);
</script>
