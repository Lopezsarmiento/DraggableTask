import { Component } from "../components/base-component";
import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import { autobind } from "../decorators/autobind";

// Project item class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
	private project: Project;

	// getter
	get persons() {
		if (this.project.people === 1) {
			return '1 person';
		} else {
			return `${this.project.people} persons`;
		}
	}

	constructor(hostId: string, project: Project) {
		super('single-project', hostId, false, project.id);
		this.project = project;	

		this.configure();
		this.renderContent();
	}

		// adds autobind otherwise I would need to use .bind
		// on -> this.element.addEventListener('dragstart', this.dragEndHandler.bind(this));

	@autobind
	dragStartHandler(event: DragEvent) {
		console.log('event: ', event);
		event.dataTransfer!.setData('text/plain', this.project.id);
		event.dataTransfer!.effectAllowed = 'move';
	}

	dragEndHandler(_: DragEvent) {
		console.log('dragEnd...');
	}

	configure() {
			this.element.addEventListener('dragstart', this.dragStartHandler);
			this.element.addEventListener('dragstart', this.dragEndHandler);
	}

	renderContent() {
		this.element.querySelector('h2')!.textContent = this.project.title;
		this.element.querySelector('h3')!.textContent = `${this.persons} assigned`;
		this.element.querySelector('p')!.textContent = this.project.description;
	}
}