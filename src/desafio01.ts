interface Book {
	title: string;
	author: string;
}

class User {
	name: string;
	lastName: string;
	books: Book[];
	pets: string[];

	constructor(name: string, lastName: string, books: Book[], pets: string[]) {
		this.name = name;
		this.lastName = lastName;
		this.books = books;
		this.pets = pets;
	}

	getFullName() {
		return `${this.name} ${this.lastName}`;
	}

	addPet(pet: string) {
		this.pets.push(pet);
	}

	countPets() {
		return this.pets.length;
	}

	addBook(book: Book) {
		this.books.push(book);
	}

	getBookNames() {
		return this.books.map(book => book.title);
	}
}

const books: Book[] = [
	{
		title: 'Percy Jackson and the Lightning Thief',
		author: 'Rick Riordan'
	},
	{
		title: 'The Lord of the Rings: The Fellowship of the Ring',
		author: 'J.R.R. Tolkien'
	}
];

const user = new User('Boris', 'Stecko', books, ['Nietzsche', 'Freud']);

console.log('Full name:', user.getFullName());

user.addPet('Foucault');
console.log('Pets after add:', user.pets);
console.log('Pet count:', user.countPets());

user.addBook({
	title: 'Harry Potter and the Prisoner of Azkaban',
	author: 'J.K. Rowling'
});
console.log('Books after add:', user.getBookNames());
