/**
 * Copyright 2026 Tomasz Czechowski <tomasz@czechowski.pl>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import chalk from "chalk";
import { writeFileSync } from "fs";

export const init = async () => {
    const { input, select, password } = await import("@inquirer/prompts");

    console.log(chalk.bold("\nTaskforge setup\n"));

    const sourceType = await select({
        message: "Project management tool:",
        choices: [
            { value: "jira", name: "Jira" },
            { value: "trello", name: "Trello (coming soon)", disabled: true },
        ],
    });

    const sourceUrl = await input({
        message: "JIRA Instance URL (e.g. https://company.atlassian.net):",
    });
    const sourceEmail = await input({ message: "JIRA API account e-mail:" });
    const sourceToken = await password({ message: "JIRA API token:" });

    const agentName = await input({
        message: "Assignee name agent watches (e.g. a-bot):",
        default: "a-bot",
    });

    const prCreatedTicketStatus = await input({
        message: "JIRA ticket status when PR created (IN_REVIEW):",
        default: "IN_REVIEW",
    });

    const githubRepo = await input({ message: "GitHub repo (owner/repo):" });
    const githubRepoUrl = await input({
        message: "GitHub repo url (https://github.com/owner/repo.git):",
    });
    const githubToken = await password({ message: "GitHub token:" });
    const mainBranch = await input({ message: "Main branch:", default: "main" });

    const localPath = await input({
        message: "Project local repo path:",
        default: "./path/project-repo",
    });

    const agentPullingInverval = await input({
        message: "Agent pulling time interval (in seconds):",
        default: "30",
    });

    const config = {
        agents: {
            agentMarker: "🤖",
            list: [
                {
                    name: agentName,
                    poolingInterval: +agentPullingInverval * 1000,
                    llmModel: {
                        discussion: "claude-sonnet-4-6",
                        implementation: "claude-sonnet-4-6",
                    },
                    comments: {
                        searchTextFor: {
                            approved: "APPROVED",
                            waitingForAgentInput: "WAITING FOR AGENT INPUT",
                        },
                    },
                    specAreas: {
                        expected: "What is the expected behavior?",
                        edge: "Are there edge cases or constraints?",
                        api: "Should this expose or modify any API?",
                        ui: "Is there any UI/UX requirement?",
                    },
                },
            ],
        },
        source: {
            type: sourceType,
            workflow: {
                prCreated: prCreatedTicketStatus,
            },
        },
    };

    writeFileSync(`${localPath}/taskforge.config.json`, JSON.stringify(config, null, 2));

    // write .env with secrets (gitignored)
    const env = [
        "DEBUG_LEVEL=WARN",
        `JIRA_URL=${sourceUrl}/rest/api/3`,
        `JIRA_EMAIL=${sourceEmail}`,
        `JIRA_TOKEN=${sourceToken}`,
        `GITHUB_TOKEN=${githubToken}`,
        `GITHUB_REPO=${githubRepo}`,
        `GITHUB_REPO_URL=${githubRepoUrl}`,
        `GITHUB_REPO_MAIN_BRANCH=${mainBranch}`,
        `LOCAL_REPO_PATH=${localPath}`,
        `JIRA_USER_NAME=${agentName}`,
        `ANTHROPIC_API_KEY=`,
    ].join("\n");

    writeFileSync(`${localPath}/.env`, env);

    console.log(chalk.green("\n✓ taskforge.config.json created"));
    console.log(chalk.green("✓ .env created — add your ANTHROPIC_API_KEY"));
    console.log(chalk.dim("\nRun: taskforge start"));
};
