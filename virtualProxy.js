class Library {
	constructor(addres, ref) {
		console.log("really heavy contructor here", addres, ref);
	}

	searchBook(title) {
		console.log("nice boock", title);
	}

	getBook(book) {
		console.log("there you have.", book.title, book.author);
	}
}

class LibraryProxy {
	constructor(addres, ref) {
		this.library = null;
		this.contructorProps = { addres, ref };
	}

	_init() {
		this.library = !this.library
			? new Library(this.contructorProps.addres, this.contructorProps.ref)
			: this.library;
	}

	searchBook(title) {
		this._init();
		this.library.searchBook(title);
	}

	getBook(book) {
		this._init();
		this.library.getBook(book);
	}
}

const library = new LibraryProxy("Av.Once de septiembre", "123!@3");

library.getBook({ title: "Rebelion en la granja", author: "george Orwell" });
