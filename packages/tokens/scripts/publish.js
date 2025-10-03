import { execSync } from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Dapatkan __dirname dalam ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Baca versi dari package.json
const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

if (!version) {
  console.error('Version is required in package.json');
  process.exit(1);
}

const confirmPublish = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Are you sure you want to publish @quantum/tokens@${version}?`,
      default: false
    }
  ]);

  return answers.confirm;
};

const runCommand = async (command, description) => {
  const { default: ora } = await import('ora');
  const spinner = ora(description).start();
  try {
    execSync(command, { stdio: 'inherit' });
    spinner.succeed();
  } catch (error) {
    spinner.fail();
    console.error(`Failed to ${description.toLowerCase()}:`, error);
    process.exit(1);
  }
};

const publish = async () => {
  const confirmed = await confirmPublish();
  if (!confirmed) {
    console.log('Publish cancelled.');
    process.exit(0);
  }

  try {
    // Build Project
    await runCommand('npm run build', 'Building Project');

    // Buat tag baru
    const tag = `@quantum/tokens@${version}`;
    await runCommand(`git tag ${tag}`, 'Creating new tag');

    // Push branch dan tag ke origin
    await runCommand(`git push origin ${tag}`, 'Pushing tag');

    // Publikasikan package ke npm
    await runCommand('npm publish', 'Publishing package to npm');

    console.log(`Successfully published @quantum/tokens@${version}`);
  } catch (error) {
    console.error('Failed to publish:', error);
    process.exit(1);
  }
};

publish();
