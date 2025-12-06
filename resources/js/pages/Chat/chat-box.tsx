import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';

import { BreadcrumbItem, GroupChat, SharedData } from '@/types';
import { ChatConvo } from './chat-convo';
import { ChatInfo } from './chat-info';

export default function ChatBox({ groupChat }: { groupChat: GroupChat }) {
    const { auth } = usePage<SharedData>().props;

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Group Chat',
            href: '/group-chat',
        },
        {
            title: groupChat.name,
            href: `/group-chat/${groupChat.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Chat Box" />
            <div className="mx-auto flex w-7xl flex-1 flex-col gap-4 rounded-lg p-4">
                <div className="grid flex-1 grid-cols-[3fr_2fr] gap-4">
                    {/* CHATS / LEFT */}
                    <ChatConvo groupChat={groupChat} />

                    {/* CHAT SETTING / RIGHT */}
                    <ChatInfo groupChat={groupChat} />
                </div>
            </div>
        </AppLayout>
    );
}
