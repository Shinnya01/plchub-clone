import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Post {
    id: number;
    user_id: number;
    description: string | null;
    created_at: string;
    image: string | null;

    user?: User;
}

export interface GroupChat {
    id: number;
    owner_id: number;
    name: string;
    group_code: string;
    privacy: 'public' | 'private';
    group_photo?: string;
    members?: GroupMember[];
    messages?: ChatMessage[];
    requests?: GroupRequest[];
}

export interface GroupMember {
    id: number;
    user_id: number;
    group_chat_id: number;
    role: string;
    user?: User;
}

export interface ChatMessage {
    id: number;
    user_id: number;
    message: string;
    group_chat_id: number;
    created_at: string;
    user: User;
}

export interface GroupRequest {
    id: number;
    user_id: number;
    group_chat_id: number;
    user?: User;
}

export interface Subject {
    id: number;
    name: string;
    teacher_id: number;
    subject_code: string;

    teacher?: User;
    students_count?: number;
    tasks_count?: number;
}

export interface Task {
    id: number;
    name: string;
    description: string;
    due_date: string;

    subject?: Subject;
    comment?: Comment[];
}

export interface Crud {
    id: number;
    name: string;
    description: string;
}

export interface Comment {
    id: number;
    comment: string;
    user_id: number;
    student_task_id: number;

    user?: User;
}

export interface VotingRoom {
    id: number;
    name: string;
    privacy: string;
    start_date: string;
    end_date: string;

    user: User;
    positions?: Position[];
    candidates?: Candidate[];
}

export interface Position {
    id: number;
    name: string;

    candidates?: Candidate[];
}

export interface Candidate {
    id: number;
    name: string;
    description: string;
    image?: string;
}
