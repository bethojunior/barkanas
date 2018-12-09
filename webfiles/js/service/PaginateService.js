class PaginateService extends ElementProperty {
    setList({currentPage, lastPage, showEndButton, totalRows}, nameElement, callback) {
        this.currentPage = currentPage;
        this.lastPage = lastPage;
        this.showEndButton = showEndButton;
        this.totalRows = totalRows;
        this.nameElement = nameElement;
        this.callback = callback;

        this.getElement(nameElement, element => {
            element.innerHTML = '';
            element.scrollTop = 0;
        });

    }

    setNewPage(transactions) {
        const _that = this;

        this.getElement(_that.nameElement, element => {
            transactions.map(transaction => {
                _that.callback(transaction, element)
            })
        })
    }


    updatePage(callback) {
        const _that = this;
        this.addEventInElement(this.nameElement, "onscroll", function () {
            if (this.scrollHeight - this.scrollTop === this.clientHeight) {
                if (_that.currentPage < _that.lastPage) {
                    _that.currentPage = parseInt(_that.currentPage) + 1;
                    callback(_that.currentPage);
                }
            }
        });
    }
}