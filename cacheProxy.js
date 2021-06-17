const fetch = require('node-fetch');
let memoData = {};

class LibraryProxyRemote {
	constructor(baseUrl) {
		this._baseUrl = baseUrl;
	}

	async search(name) {
		if (memoData[name]) {
			console.log('using cache');
			return memoData[name];
		}

		console.log('fetching');
		const response = await fetch(this._baseUrl + `/resources?sungby=${name}`);

		if (response.ok) {
			const data = await response.json();
			memoData[name] = data;

			return data;
		}
	}
}

const library = new LibraryProxyRemote('https://api-rv.herokuapp.com/rv/v1');

(async () => {
	const data1 = await library.search('Gathin');

	const data2 = await library.search('Gathin');
})();
