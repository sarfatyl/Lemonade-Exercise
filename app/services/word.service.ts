import { WordDal } from "../dals/word.dal";
import fs from "fs";
import * as http from "http";


export class WordService {

	constructor(
		private wordDal: WordDal
	) {
	}

	countWords(text: string): void {
		const wordCounts = new Map<string, number>();
		const words = text.split(' ');
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
		this.wordDal.addWords(wordCounts);
	}

	getWordStatistic(word: string): number {
		word = this.getCleanWord(word);
		return this.wordDal.getWordCount(word);
	}

	private getCleanWord(word: string) {
		word = word.toLowerCase().replace(/[\,0-9\-\n\r.]/g, '');
		return word;
	}

	countWordsFromFile(fileUrl: string): void {
		const readStream = fs.createReadStream(fileUrl);
		readStream.on('data', (chunk) => {
			this.countWords(chunk.toString('utf8'));
		});
	}

	async countWordsFromUrl(url: string): Promise<void> {
		http.get(url, response => {
			response.on("data", (chunk => {
				this.countWords(chunk.toString('utf8'));
			}));
		});
	}

}
