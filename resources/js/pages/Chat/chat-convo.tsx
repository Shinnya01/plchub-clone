import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useInitials } from '@/hooks/use-initials';
import { GroupChat, SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export function ChatConvo({ groupChat }: { groupChat: GroupChat }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
        group_chat_id: groupChat.id,
    });

    // AUTO SCROLL
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        if (!scrollRef.current) return;

        const viewport = scrollRef.current.querySelector(
            '[data-radix-scroll-area-viewport]',
        ) as HTMLDivElement | null;

        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    };

    const sendMessage = () => {
        if (!data.message.trim()) {
            return toast.info('Cannot send blank message');
        }

        post('/group-chat/send-message', {
            onSuccess: () => {
                reset();
                toast.success('Sent!');
                setTimeout(scrollToBottom, 50);
            },
        });
    };

    const sendLike = () => {
        router.post('/group-chat/send-message', {
            message: '👍',
            group_chat_id: groupChat.id,
        });
    };

    // SCROLLING ON CLICK
    useEffect(() => {
        scrollToBottom();
    }, [groupChat.messages]);

    const getInitials = useInitials();
    return (
        <Card className="flex flex-1 flex-col gap-3 py-4">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Avatar className="size-12 rounded-lg">
                        <AvatarImage
                            src={groupChat.group_photo}
                            alt={groupChat.name}
                        />
                        <AvatarFallback>
                            {getInitials(groupChat.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                        <CardTitle>{groupChat.name}</CardTitle>
                        {groupChat.privacy === 'private' && (
                            <CardDescription>
                                {groupChat.group_code}
                            </CardDescription>
                        )}
                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent
                className={`py-2' flex flex-1 flex-col ${auth.user.role !== 'student' ? 'max-h-116 2xl:max-h-170' : 'max-h-104 2xl:max-h-156'}`}
            >
                <ScrollArea className="min-h-0 flex-1" ref={scrollRef}>
                    <p className="text-center text-xs text-muted-foreground">
                        Today
                    </p>
                    <div className="mr-3 space-y-4">
                        {groupChat.messages?.map((message, index) => {
                            const isMe = message.user_id === auth.user.id;

                            const prev = groupChat.messages?.[index - 1];
                            const next = groupChat.messages?.[index + 1];

                            const isFirstOfGroup =
                                prev?.user_id !== message.user_id;
                            const isLastOfGroup =
                                next?.user_id !== message.user_id;

                            return isMe ? (
                                <div
                                    className="flex flex-row-reverse items-end gap-2"
                                    key={message.id}
                                >
                                    <div className="max-w-md space-y-1">
                                        {/* displays the name on the first chat */}
                                        {isFirstOfGroup && (
                                            <p className="mr-2 text-right text-xs text-muted-foreground">
                                                You
                                            </p>
                                        )}

                                        <Tooltip>
                                            <TooltipTrigger className="text-left">
                                                <div className="rounded-lg bg-zinc-800 p-2">
                                                    {message.message}
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="left">
                                                {message.created_at}
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            ) : (
                                // other sender
                                <div
                                    className="flex items-end gap-2"
                                    key={message.id}
                                >
                                    {/* shows the avatar on the last chat */}
                                    {isLastOfGroup ? (
                                        <Avatar className="size-8 rounded-lg">
                                            <AvatarImage
                                                src={
                                                    message.user?.avatar ||
                                                    undefined
                                                }
                                            />
                                            <AvatarFallback>
                                                {getInitials(message.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    ) : (
                                        <div className="ml-8"></div>
                                    )}

                                    <div className="max-w-md space-y-1">
                                        {/* displays the name on the first chat */}
                                        {isFirstOfGroup && (
                                            <p className="ml-2 text-xs text-muted-foreground">
                                                {message.user?.name}
                                            </p>
                                        )}

                                        <Tooltip>
                                            <TooltipTrigger className="text-left">
                                                <div className="rounded-lg bg-zinc-800 p-2">
                                                    {message.message}
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="left">
                                                {message.created_at}
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="mt-auto px-2">
                <div className="flex flex-1 items-center gap-2">
                    <Input
                        className="rounded-full"
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        autoFocus={true}
                        disabled={processing}
                    />
                    <p
                        onClick={sendLike}
                        className="cursor-pointer text-2xl select-none"
                    >
                        👍
                    </p>
                </div>
            </CardFooter>
        </Card>
    );
}
