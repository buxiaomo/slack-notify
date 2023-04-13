const core = require('@actions/core');
const wait = require('./wait');
import fetch from 'node-fetch'

// most @actions toolkit packages have async methods
async function run() {
  try {
    const channel = core.getInput('channel');
    const username = core.getInput('username');
    const icon_url = core.getInput('icon_url');
    const title = core.getInput('title');
    const text = core.getInput('text');
    const webhook_url = core.getInput('webhook_url');

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channel: channel,
        username: username,
        icon_url: icon_url,
        attachments: [
          {
            color: '#74975D',
            fields: [
              {
                title: title,
                value: text,
                short: false
              }
            ]
          }
        ]
      })
    }

    const response = await fetch(webhook_url, payload);

    if (!response.ok) {
      core.setFailed(`Failed to send request: ${response.statusText}, status_code: ${response.status}`)
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
