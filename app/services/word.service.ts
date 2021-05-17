import { WordDal } from "../dals/word.dal";
import * as https from "https";
import {LemonadeError} from "../utils/error-handling";
import {InternalServerError} from "../consts/errors.const";
import reader from "buffered-reader";

const DataReader = reader.DataReader;


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
		word = word.toLowerCase().replace(/[\,0-9\?/\n\r.]/g, '');
		return word;
	}

	countWordsFromFile(fileUrl: string): void {
		new DataReader (fileUrl, { encoding: "utf8" })
			.on ("error", function (error){
				throw new LemonadeError(InternalServerError, error);
			})
			.on ("line",  (line) => {
				this.countWords(line)
			})
			.on ("end", function (){
			})
			.read ();
	}

	async countWordsFromUrl(url: string): Promise<void> {
		https.get(url, response => {
			response.on("data", (chunk => {
				this.countWords(chunk.toString('utf8'));
			}));
		});
	}

}
