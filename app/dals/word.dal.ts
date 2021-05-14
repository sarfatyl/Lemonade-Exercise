import fs from 'fs';

export class WordDal {

	fileName: string = 'words.json';
	words: Map<string, number>;

	constructor() {
		if (!fs.existsSync(this.fileName)) {
			this.words = new Map<string, number>();
			this.saveFile();
		}
		/** We use sync to make sure the file is ready before any request. */
		this.words = new Map(Object.entries(JSON.parse(fs.readFileSync(this.fileName,'utf8'))));
	}

	addWords(wordCounts: Map<string, number>): void {
		for (const [key, value] of wordCounts.entries()) {
			if (this.words.has(key)) {
				this.words.set(key, this.words.get(key) + value);
			} else {
				this.words.set(key, 1);
			}
		}
		this.saveFile();
	}

	private saveFile() {
		// @ts-ignore
		fs.writeFileSync(this.fileName, JSON.stringify(Object.fromEntries(this.words)));
	}

	getWordCount(word: string) {
		if (this.words.has(word)) {
			return this.words.get(word);
		} else {
			return 0;
		}
	}
}
