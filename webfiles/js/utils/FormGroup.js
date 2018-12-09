class FormGroup {
    constructor(name) {
        this.elementProperty = new ElementProperty();
        this.step = 0;
        this.groups = this.elementProperty.getElements(name);
        this.validate = {}
    }

    nextGroup() {
        this.step += 1;
        this.hideAllGroups();
        return this.showGroupSelected();
    }

    beforeGroup() {
        this.step -= 1;
        if (this.step === 1)
            this.step = 0;

        this.hideAllGroups();
        this.resetValidate();
        return this.showGroupSelected();
    }

    hideAllGroups() {
        this.groups.map(group => {
            group.classList.remove("active");
        });
    }

    showGroupSelected() {
        if (this.groups.length <= this.step || this.step < 0)
            return false;

        this.groups[this.step].classList.add("active");
        return true;
    }

    resetValidate() {
        Object.keys(this.validate).map((key, index) => {
            this.validate[key] = (index < this.step);
        });
    }
}