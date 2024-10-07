<template>
	<div class="m-10">
		<ProjectSummary></ProjectSummary>
	</div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const currentUser = computed(() => authStore.user?.name || "Guest");
</script>
