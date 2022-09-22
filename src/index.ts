import * as core from '@actions/core';
import * as github from '@actions/github';
import {run} from './action';

const INPUTS = {
  NOTION_TOKEN: 'notion-token',
  NOTION_DB: 'notion-db',
  GITHUB_TOKEN: 'github-token',
};

async function start() {
  try {
    const notionToken = core.getInput(INPUTS.NOTION_TOKEN, {required: true});
    const notionDb = core.getInput(INPUTS.NOTION_DB, {required: true});
    const githubToken = core.getInput(INPUTS.GITHUB_TOKEN, {required: true});

    core.info(`context event: ${github.context.eventName}`);
    core.info(`context action: ${github.context.action}`);
    core.info(`payload action: ${github.context.payload.action}`);
    const options = {
      notion: {
        token: notionToken,
        databaseId: notionDb,
      },
      github: {
        payload: github.context.payload,
        eventName: github.context.eventName,
        token: githubToken,
      },
    };

    await run(options);
  } catch (e) {
    core.setFailed(e instanceof Error ? e.message : e + '');
  }
}

(async () => {
  await start();
})();
