import { BundlesReportI, OptionsI } from './types';
import inquirer = require('inquirer');
import { logStats } from './logStat';
import { runResultExpress, generateStaticHtml } from './generateTemplate';

const resultOptions = [
  {
    name: `Log results`,
    value: 'log',
  },
  {
    name: `Generate static HTML file.`,
    value: 'html',
  },
  {
    name: `Open in browser`,
    value: 'browser',
  },
];

const resultPromptOpts = [
  {
    type: 'list',
    name: 'type',
    message: 'There was a problem checking out the target branch...',
    choices: resultOptions,
  },
];

export async function resultPrompt(
  bundleReport: BundlesReportI,
  options: OptionsI
): Promise<void> {
  const answer = await inquirer.prompt(resultPromptOpts);

  switch (answer.type) {
    case 'log': {
      logStats(bundleReport);
      return;
    }
    case 'html': {
      //GenerateHTML function
      generateStaticHtml(bundleReport, options);
      return;
    }
    case 'browser': {
      //Generate HTML and serve.
      runResultExpress(bundleReport, options);
      return;
    }
    default:
      return;
  }
}
