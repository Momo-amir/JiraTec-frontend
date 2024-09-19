<template>
	<div class="mx-10 mt-10 mb-32">
		<hero :title="frontPageTitle" :description="frontPageDescription" imageUrl="/assets/images/heroimage.png" />
	</div>
	<div class="flex flex-col gap-8">
		<div class="flex items-center justify-center">
			<h1 class="text-h1">Take a look at your projects</h1>
		</div>
		<div class="mx-10 mt-5 mb-16 w-1/2">
			<project-summary />
		</div>
	</div>
</template>

<script setup lang="ts">
const currentUser = "John Doe";
const frontPageTitle = ref<string>(`Welcome to the Project Management App ${{ currentUser }}`);
const frontPageDescription = ref<string>("This is a simple project management app built with Vue 3 and Tailwind CSS");
const imageUrl = ref("/assets/images/heroimage.png");
</script>
