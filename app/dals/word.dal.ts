import fs from 'fs';
import {LemonadeError} from "../utils/error-handling";
import {InternalServerError} from "../consts/errors.const";

export class WordDal {

	/** The file for caching our words count **/
	fileName: string = 'assets/words-count.json';
	words: Map<string, number>;

	constructor() {
		if (!fs.existsSync(this.fileName)) {
			this.words = new Map<string, number>();
			this.saveFile();
		}
		/** We use sync to make sure the file is ready before any request. */
		this.words = new Map(Object.entries(JSON.parse(fs.readFileSync(this.fileName, 'utf8'))));
	}

	async addWords(wordCounts: Map<string, number>): Promise<void> {
		for (const [key, value] of wordCounts.entries()) {
			if (this.words.has(key)) {
				this.words.set(key, this.words.get(key) + value);
			} else {
				this.words.set(key, value);
			}
		}
		/** Save the words counts to cache **/
		await this.saveFile();
	}

	private saveFile() {
		/** With writeFile function we can write a file in a non-blocking asynchronous way **/
		// @ts-ignore
		fs.writeFile(this.fileName, JSON.stringify(Object.fromEntries(this.words)),  (err) => {
			if (err) {
				throw new LemonadeError(InternalServerError, err);
			}
		});
	}

	getWordCount(word: string) {
		if (this.words.has(word)) {
			return this.words.get(word);
		} else {
			return 0;
		}
	}
}
