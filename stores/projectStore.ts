import { defineStore } from "pinia";
import { ref } from "vue";
import { getCurrentUserProjects } from "~/services/projectService";
import type { IProject } from "~/Interfaces/IProject";

export const useProjectStore = defineStore("projectStore", () => {
	const projects = ref<IProject[]>([]);

	const loadProjects = async () => {
		try {
			const fetchedProjects = await getCurrentUserProjects();
			projects.value = fetchedProjects;
		} catch (error) {
			console.error("Failed to load projects:", error);
		}
	};

	const addProject = (project: IProject) => {
		projects.value.push(project);
	};

	return {
		projects,
		loadProjects,
		addProject,
	};
});
