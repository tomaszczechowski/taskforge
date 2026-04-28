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

export interface TaskForgeConfigAgentLlmModel {
    discussion: string;
    implementation: string;
}

export interface TaskForgeConfigAgentSpecAreas {
    expected: string;
    edge: string;
    api: string;
    ui: string;
}

export interface TaskForgeConfigAgent {
    name: string;
    poolingInterval: number;
    llmModel: TaskForgeConfigAgentLlmModel,
    comments: {
        searchTextFor: {
            approved: string;
            waitingForAgentInput: string;
        }
    },
    specAreas: TaskForgeConfigAgentSpecAreas;
}

export interface TaskForgeConfigAgents {
    agentMarker: string;
    list: TaskForgeConfigAgent[];
}

export type TaskForgeConfigSourceType = "jira";

export interface TaskForgeConfigSource {
    type: TaskForgeConfigSourceType;
    workflow: {
        prCreated: string;
    }
}

export interface TaskForgeConfig {
    agents: TaskForgeConfigAgents;
    source: TaskForgeConfigSource;
}