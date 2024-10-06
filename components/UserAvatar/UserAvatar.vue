<template>
	<div class="relative w-10 h-10 rounded-full flex items-center justify-center text-white font-bold cursor-pointer" :style="{ backgroundColor: getRandomColor(user.userID) }" @mouseover="showTooltip" @mouseleave="hideTooltip">
		<!-- First letter of user name -->
		{{ user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase() }}

		<!-- Tooltip with full name -->
		<div v-if="tooltipVisible" class="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-base-100 text-base-content text-xs py-1 px-2 rounded shadow-lg z-10">
			{{ user.name || user.email }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { IUser } from "~/Interfaces/IUser";

interface Props {
	user: IUser;
}

const props = defineProps<Props>();

const tooltipVisible = ref(false);

// Function to toggle the tooltip visibility
const showTooltip = () => {
	tooltipVisible.value = true;
};

const hideTooltip = () => {
	tooltipVisible.value = false;
};

// Generate random color based on userID for consistency
const getRandomColor = (userID: number) => {
	const colors = ["#34A853", "#EA4335", "#4285F4", "#FBBC05", "#FF6D00", "#46BDFA", "#9AA0A6"];
	return colors[userID % colors.length]; // Use the remainder to get a color from the array so if the userID is above 6, it will loop back to the first color
};
</script>
