import welcome from 'cli-welcome';
import unhandled from 'cli-handle-unhandled';
import { createRequire } from 'module';
import { downloadData } from './data.js';
const require = createRequire(import.meta.url);
const pkg = require('./../package.json');

export default ({ clear = true }) => {
	downloadData().then(() => {
		unhandled();
		welcome({
			title: `awesome-tech-blogs`,
			tagLine: `by Praveen Kumar`,
			description: pkg.description,
			version: pkg.version,
			bgColor: '#36BB09',
			color: '#000000',
			bold: true,
			clear
		});
	});
};
