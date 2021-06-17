// The real Library service is contained on the server, so
// LibraryProxyRemote gets the information from the server

const fetch = require('node-fetch');

class LibraryProxyRemote {
	constructor(baseUrl) {
		this._baseUrl = baseUrl;
	}

	async search(name) {
		const response = await fetch(this._baseUrl + `/resources?sungby=${name}`);

		if (response.ok) {
			return response.json();
		}
	}
}

const library = new LibraryProxyRemote('https://api-rv.herokuapp.com/rv/v1');

(async () => {
	const data = await library.search('Gathin');
	console.log(data);
})();
