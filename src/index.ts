import figlet from 'figlet';
import inquirer from 'inquirer';

import { installRepo } from './installer';

type Answers = {
	projectName: string;
	front: string;
	typescript: string;
};

async function handleAnswers(answers: Answers) {
	const repoType = `${answers.front}|${answers.typescript}`;
	console.log(repoType)
	switch (repoType) {
		case 'React|Yes':
			installRepo(
				'https://github.com/christophe77/create-chrome-extension-react-ts',
				answers.projectName,
			);
			break;
		case 'React|No':
			installRepo(
				'https://github.com/christophe77/create-chrome-extension-react-js',
				answers.projectName,
			);
			break;
		case 'Vanilla|Yes':
			installRepo(
				'https://github.com/christophe77/create-chrome-extension-vanilla-ts',
				answers.projectName,
			);
			break;
		case 'Vanilla|No':
			installRepo(
				'https://github.com/christophe77/create-chrome-extension-vanilla-js',
				answers.projectName,
			);
			break;
		default:
			break;
	}
}

async function launchPrompt() {
	try {
		console.log(`${figlet.textSync('Create Chrome Extension')}`);

		const answers: Answers = await inquirer.prompt([
			{
				type: 'input',
				name: 'projectName',
				message: 'Project name :',
			},
			{
				type: 'list',
				name: 'front',
				message: 'Frontend :',
				choices: ['React', 'Vanila'],
				default: 'React',
			},
			{
				type: 'list',
				name: 'typescript',
				message: 'TypeScript :',
				choices: ['Yes', 'No'],
				default: 'Yes',
			},
		]);
		await handleAnswers(answers);
	} catch (error) {
		console.log(error);
	}
}

launchPrompt();
