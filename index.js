#!/usr/bin/env node

/**
 * awesome-tech-blogs
 * CLI version of https://tech-blogs.dev
 *
 * @author Praveen Kumar <https://praveeen.in>
 */

import init from './utils/init.js';
import cli from './utils/cli.js';
import log from './utils/log.js';
import { getBlogsFromTag, listBlogs } from './app.js';

const input = cli.input;
const flags = cli.flags;
const { list, tag } = flags;

(async () => {
	init({ clear: true });
	input.includes(`help`) && cli.showHelp(0);

	input.includes(`tag`) && getBlogsFromTag(input[1]);

	input.includes(`all`) && listBlogs(input[1]);

	list && listBlogs();

	tag && getBlogsFromTag(tag);
})();
