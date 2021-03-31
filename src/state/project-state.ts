import { ProjectStatus, Project } from "../models/project";

// Project state Management
type Listener<T> = (items: T[]) => void;

class State<T> {
	// use protected so it can accessed by inherited classes
	protected listeners: Listener<T>[] = [];

	addListener(listenerFn: Listener<T>) {
		this.listeners.push(listenerFn);
	}
}

export class ProjectState extends State<Project> {
		
		private projects: Project[] = [];
		private static instance: ProjectState;

		private constructor() {
			super();
		}

		static getInstance() {
				if (this.instance) {
						return this.instance
				}

				this.instance = new ProjectState();
				return this.instance;
		}

		addProject(title: string, description: string, numOfPeople: number) {
				
				const id = Math.random().toString();
				const newProject = new Project(id, title, description, numOfPeople, ProjectStatus.Active);

				this.projects.push(newProject);
				this.updateListeners();
				
		}

		moveProject(projectId: string, newStatus: ProjectStatus) {
			const project = this.projects.find(prj => prj.id === projectId);

			if (project && project.status !== newStatus) {
				project.status = newStatus;
				this.updateListeners();
			}
		}

		private updateListeners() {
			for (const listenerFn of this.listeners) {
				// passing a copy of the project
				listenerFn(this.projects.slice());
			}
		}
}

// creating a global instance of projectState
// as a singleton class it can ONLY be once instance created
// thats why we call getInstances instead of instantiating the class with the new keyword
export const projectState = ProjectState.getInstance();