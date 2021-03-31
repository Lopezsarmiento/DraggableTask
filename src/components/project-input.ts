import { Component } from "./base-component";
import { autobind } from "../decorators/autobind";
import { Validatable, validate } from "../util/validation";
import { projectState } from "../state/project-state";

// Project input class
export class ProjectInput extends Component<HTMLDivElement ,HTMLElement>{
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		super('project-input', 'app', true, 'user-input');

		this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;


		this.configure();
	}

	configure() {
		// to avoid using bind inside the listener we use a decorator
		// on the submit handler
		//this.element.addEventListener('submit', this.submitHandler.bind(this));

		this.element.addEventListener('submit', this.submitHandler);
	}

	renderContent() {}

	// this method returns a tuple that has 3 items of type (string, string, number) accordingly.
	private gatherUserInput() : [string, string, number] | void {

			// get input values
			const enteredTitle = this.titleInputElement.value;
			const enteredDescription = this.descriptionInputElement.value;
			const enteredPeople = this.peopleInputElement.value;

			//
			const titleValidatable: Validatable = {
					value: enteredTitle,
					required: true
			}

			const descriptionValidatable: Validatable = {
					value: enteredDescription,
					required: true,
					minLength: 5
			}

			const peopleValidatable: Validatable = {
					value: +enteredPeople,
					required: true,
					min: 1,
					max: 5
			}

			if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
					alert('Invalid input. Please try again!');
					return;
			} else {
					return [enteredTitle, enteredDescription, +enteredPeople];
			}
	}

	private clearInputs() {
			this.titleInputElement.value = "";
			this.descriptionInputElement.value = "";
			this.peopleInputElement.value = "";
	}

	@autobind
	private submitHandler(event: Event) {
			event.preventDefault();
			console.log(this.titleInputElement.value);
			const userInput = this.gatherUserInput();

			// check if userInput is a tuple (ts) or array (js)
			if (Array.isArray(userInput)) {
					const [title, desc, people] = userInput;
					console.log('values: ', `${title}:${desc}:${people}`);
					projectState.addProject(title, desc, people);
					this.clearInputs();
			}
	}
}