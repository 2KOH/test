const search = function*(string) {
	const words = string.toLowerCase().normalize('NFKC').split(/\s/)
	for (const [id, names] of puzzleNames) {
		if (names.some(
			name => words.every(
				word => name.includes(word)
			)
		)) {
			yield id
		}
	}
}

const searchText = document.querySelector('#search-text')
const liList = document.querySelectorAll('#search-text ~ ul > li')

searchText.addEventListener('input', () => {
	const regExp = new RegExp(`^${ [...search(searchText.value)].join('|') }$`)
	for (const li of liList) {
		const id = li.querySelector('a').herf.match(/^puzzle\/(.*).md$/)[1]
		li.style.display = regExp.test(id) ? '' : 'none'
	}
})
