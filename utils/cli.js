import meow from 'meow';
import meowHelp from 'cli-meow-help';

const flags = {
	list: {
		type: 'boolean',
		default: false,
		alias: 'l',
		desc: 'List all blogs'
	},
	tag: {
		type: 'string',
		default: '',
		alias: 't',
		desc: 'Filter by tag'
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
};

const commands = {
	help: { desc: `Print help info` },
	tag: { desc: `Print help info` },
	all: { desc: `Print all blog details` },
};

const helpText = meowHelp({
	name: `atb`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

export default meow(helpText, options);
