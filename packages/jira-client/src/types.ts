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

declare global {
    // Context variables
    const user: User;
    const app: App;
    const issue: Issue;
    const originalIssue: Issue;
    const issues: Issue[];
    const project: Project;
    const sprint: Sprint;
    const board: Board;
    const serviceDesk: ServiceDesk;
    const customerRequest: CustomerRequest;
    const transition: Transition;
    const workflow: Workflow;
    const config: any;

    // Constructors
    const Issue: IssueConstructor;
    const Project: ProjectConstructor;
    const User: UserConstructor;
    const RichText: RichTextConstructor;
    const CalendarDate: CalendarDateConstructor;
}

export interface JiraDate extends Date {
    toCalendarDate(): JiraCalendarDate;
    toCalendarDateUTC(): JiraCalendarDate;
    plusMonths(months: number): JiraDate;
    minusMonths(months: number): JiraDate;
    plusDays(days: number): JiraDate;
    minusDays(days: number): JiraDate;
    plusHours(hours: number): JiraDate;
    minusHours(hours: number): JiraDate;
    plusMinutes(minutes: number): JiraDate;
    minusMinutes(minutes: number): JiraDate;
}

export interface JiraCalendarDate extends Pick<Date,
    | 'getDay'
    | 'getDate'
    | 'getMonth'
    | 'getFullYear'
    | 'toISOString'
    | 'toString'
> {
    plusMonths(months: number): JiraCalendarDate;
    minusMonths(months: number): JiraCalendarDate;
    plusDays(days: number): JiraCalendarDate;
    minusDays(days: number): JiraCalendarDate;
}

export interface DateConstructor {
    new (): JiraDate;
    new (timestamp: number): JiraDate;
    new (dateString: string): JiraDate;
}

export interface CalendarDateConstructor {
    new (): JiraCalendarDate;
    new (dateString: string): JiraCalendarDate;
}

export interface Ticket {
    key: string;
    fields: Issue;
}

export interface Issue {
    id: number;
    parent: Issue;
    project: Project;
    key: string;
    summary: string;
    subtasks: Issue[];
    childIssues: Issue[];
    description: RichText;
    priority: IssuePriority;
    assignee: User;
    reporter: User;
    creator: User;
    watches: number;
    watchers: User[];
    votes: number;
    voters: User[];
    issueType: IssueType;
    status: IssueStatus;
    created: JiraDate;
    updated: JiraDate;
    dueDate: JiraCalendarDate;
    resolutionDate: JiraDate;
    resolution: Resolution;
    timeSpent: number;
    originalEstimate: number;
    remainingEstimate: number;
    environment: RichText;
    securityLevel: SecurityLevel;
    labels: string[];
    components: Component[];
    versions: Version[];
    fixVersions: Version[];
    comments: Comment[];
    attachments: Attachment[];
    links: IssueLink[];
    changelogs: Changelog[];
    getNewestChangelog(fieldName: string): Changelog;
    getNewestChangelog(fieldName: string, filters: Record<string, string>): Changelog;
    properties: EntityProperties;
    worklogs: Worklog[];

    // Jira Software fields (when Jira Software is licensed)
    sprint?: Sprint;
    closedSprints?: Sprint[];
    flagged?: boolean;
    epic?: Issue;
    isEpic?: boolean;
    name?: string;
    color?: string;
    done?: boolean;
    stories?: Issue[];

    // Custom fields - accessed via ID or key
    [customFieldId: string]: any;
}

export interface ADF {
    type: string;
    version: number;
    content: Array<Record<string, any>>;
}

export interface EntityProperties {
    get(key: string): any;
    keys(): string[];
    updated(): JiraDate;
    updated(key: string): JiraDate;
}

export interface UserPermissions {
    global: string[];
}

export interface User {
    accountId: string;
    displayName: string;
    locale: string;
    timeZone: string;
    avatarUrls: Record<string, string>;
    active: boolean;
    permissions: UserPermissions;
    groups: string[];
    groupIds: string[];
    getProjectRoles(project: Project): ProjectRole[];
    properties: EntityProperties;
}

export interface ProjectCategory {
    id: number;
    name: string;
    description: string;
}

export interface ProjectRole {
    id: number;
    name: string;
    description: string;
}

export interface Component {
    id: number;
    name: string;
}

export interface Project {
    id: number;
    key: string;
    style: string;
    name: string;
    avatarUrls: Record<string, string>;
    lead: User;
    projectTypeKey: string;
    projectCategory: ProjectCategory;
    properties: EntityProperties;
}

export interface IssuePriority {
    id: number;
    name: string;
    description: string;
}

export interface IssueStatusCategory {
    id: number;
    key: string;
    name: string;
    colorName: string;
}

export interface IssueStatus {
    id: number;
    name: string;
    description: string;
    category: IssueStatusCategory;
}

export interface IssueType {
    id: number;
    name: string;
    description: string;
    iconUrl: string;
    hierarchyLevel: number;
    properties: EntityProperties;
}

export interface Resolution {
    id: number;
    name: string;
    description: string;
}

export interface Version {
    id: number;
    name: string;
    description: string;
    archived: boolean;
    released: boolean;
    releaseDate: JiraCalendarDate;
    startDate: JiraCalendarDate;
}

export interface SecurityLevel {
    id: number;
    name: string;
    description: string;
}

export interface Attachment {
    id: number;
    author: User;
    filename: string;
    size: number;
    mimeType: string;
    created: JiraDate;
}

export interface RichText {
    plainText: string;
}

export interface Comment {
    id: number;
    author: User;
    body: RichText;
    created: JiraDate;
    updated: JiraDate;
    properties: EntityProperties;
}

export interface ChangelogItem {
    field: string;
    fieldId: string;
    from: string;
    fromString: string;
    to: string;
    toString: string;
}

export interface Changelog {
    id: string;
    author: User;
    items: ChangelogItem[];
    created: JiraDate;
}

export interface Worklog {
    id: string;
    author: User;
    updateAuthor: User;
    created: JiraDate;
    updated: JiraDate;
    started: JiraDate;
    timeSpent: number;
}

export interface IssueLinkType {
    id: number;
    name: string;
    inward: string;
    outward: string;
}

export interface IssueLink {
    id: number;
    type: IssueLinkType;
    direction: string;
    linkedIssue: Issue;
    outwardIssue: Issue;
    inwardIssue: Issue;
}

export interface Transition {
    id: number;
    name: string;
    from: IssueStatus;
    to: IssueStatus;
    hasScreen: boolean;
}

export interface Workflow {
    id: string;
    name: string;
}

export interface Sprint {
    id: number;
    state: string;
    name: string;
    goal: string;
    startDate: JiraDate;
    endDate: JiraDate;
    completeDate: JiraDate;
    properties: EntityProperties;
}

export interface Board {
    id: number;
    hasBacklog: boolean;
    hasSprints: boolean;
    activeSprints: Sprint[];
    futureSprints: Sprint[];
    closedSprints: Sprint[];
    canAdminister: boolean;
    properties: EntityProperties;
}

export interface ServiceDesk {
    id: number;
    project: Project;
}

export interface CustomerRequestType {
    id: number;
}

export interface CustomerRequestStatus {
    name: string;
    category: string;
    date: string;
}

export interface CustomerRequest {
    issue: Issue;
    currentStatus: CustomerRequestStatus;
    requestType: CustomerRequestType;
    serviceDesk: ServiceDesk;
}

export interface License {
    active: boolean;
}

export interface App {
    id: string;
    key: string;
    license: License;
    properties: EntityProperties;
}

export interface IssueConstructor {
    new (id: number): Issue | null;
    new (key: string): Issue | null;
}

export interface ProjectConstructor {
    new (id: number): Project | null;
    new (key: string): Project | null;
}

export interface UserConstructor {
    new (accountId: string): User | null;
}

export interface RichTextConstructor {
    new (adf: ADF): RichText;
}

export interface NumberFunction {
    (value: any): number;
}

export interface JSONUtility {
    stringify(value: any): string;
    parse(json: string): any;
}
