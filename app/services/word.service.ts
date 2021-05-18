import {WordDal} from "../dals/word.dal";
import * as https from "https";
import {LemonadeError} from "../utils/error-handling";
import {InternalServerError} from "../consts/errors.const";
import fs from "fs";


export class WordService {

	constructor(
		private wordDal: WordDal
	) {
	}

	async countWords(text: string): Promise<void> {
		const wordCounts = new Map<string, number>();
		const rows = text.split(/\r?\n/);
		for (let row of rows) {
			const words = row.split(' ');
			for (let word of words) {
				word = this.getCleanWord(word);
				if (word) {
					if (wordCounts.has(word)) {
						wordCounts.set(word, wordCounts.get(word) + 1);
					} else {
						wordCounts.set(word, 1);
					}
				}
			}
		}
		await this.wordDal.addWords(wordCounts);
	}

	getWordStatistic(word: string): number {
		word = this.getCleanWord(word);
		return this.wordDal.getWordCount(word);
	}

	countWordsFromFile(fileUrl: string): void {
		const readStream = fs.createReadStream(fileUrl);
		this.parseStream(readStream);

	}

	async countWordsFromUrl(url: string): Promise<void> {
		https.get(url, (res) => {
			this.parseStream(res);
		});
	}

	parseStream(readStream) {
		let lastWordFromPreviousChunk: string = '';
		readStream.on('data', async (chunk) => {
			let text = lastWordFromPreviousChunk + chunk.toString('utf8');
			let splitIndex: number = text.lastIndexOf(' ');
			let firstPart: string = text.substring(0, splitIndex);
			let secondPart: string = text.substring(splitIndex);
			await this.countWords(firstPart);
			lastWordFromPreviousChunk = secondPart;
		});
		readStream.on('end', async () => {
			await this.countWords(lastWordFromPreviousChunk);
		});
		readStream.on('error', async (error) => {
			throw new LemonadeError(InternalServerError, error);
		});
	}

	private getCleanWord(word: string) {
		word = word.toLowerCase().replace(/[\,0-9\?/.]/g, '');
		return word;
	}
}
