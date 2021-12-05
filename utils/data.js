import fs from 'fs';
import GitFileDownloader from './git-file-downloader.js';
import ora from 'ora';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const downloader = new GitFileDownloader({
	provider: 'github',
	repository: 'MarkoDenic/awesome-tech-blogs',
	branch: 'main',
	file: 'data.js',
	output: process.cwd(),
	outputName: 'data.cjs'
});

const spinner = ora({
	text: 'Getting Latest Blog lists...'
});

export async function downloadData() {
	try {
		const filePath = path.join(process.cwd(), 'data.cjs');
		try {
			if (fs.existsSync(filePath)) {
				return;
			}
			spinner.start();
			await downloader.run();
			spinner.succeed('Successfully downloaded latest blog lists');
		} catch (err) {
			console.error(err);
			spinner.fail('Failed to download latest blog lists');
			process.exitCode = 1;
		}
	} catch (error) {
		console.error(err);
		spinner.fail('Failed to download latest blog lists');
		process.exitCode = 1;
	}
}

export function getAllBlogs() {
	const filePath = path.join(process.cwd(), 'data.cjs');
	if (!fs.existsSync(filePath)) {
		downloadData();
	}
	const data = require(filePath);
	return data.blogs;
}
