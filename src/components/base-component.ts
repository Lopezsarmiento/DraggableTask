// component base class
// this is an abstract class as it should never be instantiated, ONLY inherited
export abstract class Component <T extends HTMLElement, U extends HTMLElement> {
	templateElement: HTMLTemplateElement;
	hostElement: T;
	element: U;
	
	constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
			this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
			this.hostElement = document.getElementById(hostElementId)! as T;

			const importedNode = document.importNode(this.templateElement.content, true);
			this.element = importedNode.firstElementChild as U;
			if (newElementId) {
					this.element.id = newElementId;
			}

			this.attach(insertAtStart);

	}

	private attach(insertAtBeginning: boolean) {
			const insertedAt = insertAtBeginning ? "afterbegin":"beforeend";
			this.hostElement.insertAdjacentElement(insertedAt, this.element);
	}

	abstract configure(): void;
	abstract renderContent(): void;
}