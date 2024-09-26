<template>
	<div>
		<NuxtLayout>
			<header>
				<Navbar />
			</header>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: ["auth"],
});
</script>
