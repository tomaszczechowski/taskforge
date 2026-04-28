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

export * from "./types.js";
export * from "./logger.js";

export const JiraTransition = {
    SpecReview: "SPEC_REVIEW",
    InProgress: "IN_PROGRESS",
    Review: "IN_REVIEW",
} as const;

// description and body are ADF objects in Jira REST API v3
export interface JiraComment {
    body: unknown;
}

export interface JiraIssue {
    key: string;
    fields: {
        summary: string;
        description: unknown;
        status: { name: string };
        comment: { comments: JiraComment[] };
    };
}

/** Recursively extract plain text from an ADF node or a plain string. */
export function extractText(node: unknown): string {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (typeof node === "object") {
        const n = node as Record<string, unknown>;

        if (typeof n["text"] === "string") return n["text"];
        if (Array.isArray(n["content"])) return n["content"].map(extractText).join(" ");
    }

    return "";
}

/** Wrap plain text in a minimal ADF document (required by Jira REST API v3). */
export function toAdf(text: string): object {
    return {
        version: 1,
        type: "doc",
        content: [
            {
                type: "paragraph",
                content: [{ type: "text", text }],
            },
        ],
    };
}

/** Wrap a short message + a preformatted block (e.g. test output) in ADF. */
export function toAdfWithCode(message: string, code: string): object {
    return {
        version: 1,
        type: "doc",
        content: [
            {
                type: "paragraph",
                content: [{ type: "text", text: message }],
            },
            {
                type: "codeBlock",
                attrs: {},
                content: [{ type: "text", text: code }],
            },
        ],
    };
}
