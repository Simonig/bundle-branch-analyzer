import chalk from 'chalk';
import { getCurrentBranchName } from './git';
import { OptionsI } from './types';

const exec = require('await-exec');
const execOpts = { log: false };

export async function getCurrentBundleStats(options: OptionsI) {
  try {
    const currentBranch = getCurrentBranchName();
    await exec(`${options.packageManager} install`, execOpts);

    if (options.webpackConfigScript.length > 0) {
      await exec(
        `webpack --config ${options.webpackConfigScript} --profile --json > ${options.outputDir}/${currentBranch}-stats.json`,
        execOpts
      );
    } else {
      await exec(
        `webpack --profile --json > ${options.outputDir}/${currentBranch}-stats.json`,
        execOpts
      );
    }
  } catch (err) {
    console.log('');
    console.log(
      chalk.red(
        `The following error ocurre while running your webpack configuration:`
      )
    );
    console.error(err);
  }
}
