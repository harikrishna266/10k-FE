import {
	Directive,
	HostBinding,
	HostListener,
	Output,
	EventEmitter
} from "@angular/core";

@Directive({
	selector: "[appDrag]"
})
export class DragDirective {
	@Output() files: EventEmitter<DragEvent> = new EventEmitter();

	@HostBinding("style.borderWidth") private background = '1px !important';

	constructor() {}

	@HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = '18px !important';
	}

	@HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = '1px !important';
	}

	@HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
		evt.preventDefault();
		evt.stopPropagation();
		this.background = '1px !important';
		this.files.emit(evt);
	}
}
