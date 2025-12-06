import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardTitle,
} from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useInitials } from '@/hooks/use-initials';
import { GroupChat, SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import {
    Check,
    ChevronDown,
    ChevronRight,
    CircleUserRound,
    Ellipsis,
    LogOut,
    MessageCircle,
    PlusCircle,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { UpdateGroup } from './update-group';

export function ChatInfo({ groupChat }: { groupChat: GroupChat }) {
    const { auth } = usePage<SharedData>().props;
    const [openMembers, setOpenMembers] = useState(false);
    const [openRequest, setOpenRequest] = useState(false);

    const { post, data } = useForm({
        group_chat_id: groupChat.id,
        request_id: null as number | null,
    });

    const leaveGroup = () => {
        post('/group-chat/leave-group');
    };

    const acceptUser = (request_id: number) => {
        router.post('/group-chat/accept-user', {
            group_chat_id: groupChat.id,
            request_id: request_id,
        });
    };

    const rejectUser = (request_id: number) => {
        router.post('/group-chat/reject-user', {
            group_chat_id: groupChat.id,
            request_id: request_id,
        });
    };

    const getInitials = useInitials();
    return (
        <Card className="flex-1 pb-4">
            <div className="flex flex-col items-center gap-4">
                <Avatar className="size-12 rounded-lg">
                    <AvatarImage
                        src={groupChat.group_photo}
                        alt={groupChat.name}
                    />
                    <AvatarFallback>
                        {getInitials(groupChat.name)}
                    </AvatarFallback>
                </Avatar>
                <CardTitle>{groupChat.name}</CardTitle>
                {groupChat.privacy === 'private' && (
                    <CardDescription>{groupChat.group_code}</CardDescription>
                )}
                <UpdateGroup groupChat={groupChat} />
                <div className="w-full px-2">
                    <Collapsible
                        open={openMembers}
                        onOpenChange={setOpenMembers}
                    >
                        <CollapsibleTrigger asChild>
                            <Button
                                className="flex h-12 w-full justify-between"
                                variant="ghost"
                            >
                                <div>Chat Members</div>
                                {!openMembers ? (
                                    <ChevronRight />
                                ) : (
                                    <ChevronDown />
                                )}
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-4 px-3">
                            {groupChat.members?.map((member) => (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="size-10 rounded-lg">
                                            <AvatarImage
                                                src={member.user?.avatar}
                                                alt={member.user?.name}
                                            />
                                            <AvatarFallback>
                                                {getInitials(
                                                    member.user?.name ??
                                                        'Unknown User',
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-sm">
                                                {member.user?.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                {member.role} ● @Username.1234
                                            </p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button
                                                        size="icon-sm"
                                                        variant="ghost"
                                                        className="rounded-full"
                                                    >
                                                        <Ellipsis />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="left">
                                                    Member Option
                                                </TooltipContent>
                                            </Tooltip>
                                        </DropdownMenuTrigger>

                                        {member.user_id == auth.user.id ? (
                                            <DropdownMenuContent
                                                align="center"
                                                side="left"
                                            >
                                                <DropdownMenuItem>
                                                    <CircleUserRound /> View
                                                    Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <LogOut /> Leave
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        ) : (
                                            <DropdownMenuContent
                                                align="center"
                                                side="left"
                                            >
                                                <DropdownMenuItem>
                                                    <MessageCircle /> Message
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <CircleUserRound /> View
                                                    Profile
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        )}
                                    </DropdownMenu>
                                </div>
                            ))}
                            <Button
                                className="flex w-full justify-between p-0"
                                variant="ghost"
                            >
                                <div className="flex items-center gap-2">
                                    <PlusCircle className="size-5" />
                                    <p>Add people</p>
                                </div>
                                <div></div>
                            </Button>
                        </CollapsibleContent>
                    </Collapsible>
                    {auth.user.id === groupChat.owner_id && (
                        <Collapsible
                            open={openRequest}
                            onOpenChange={setOpenRequest}
                        >
                            <CollapsibleTrigger asChild>
                                <Button
                                    className="flex h-12 w-full justify-between"
                                    variant="ghost"
                                >
                                    <div>Group Request</div>
                                    {!openRequest ? (
                                        <ChevronRight />
                                    ) : (
                                        <ChevronDown />
                                    )}
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-3 space-y-4 px-3">
                                {groupChat.requests?.length === 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        No pending requests
                                    </p>
                                )}

                                {groupChat.requests?.map((request) => (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="size-10 rounded-lg">
                                                <AvatarImage
                                                    src={request.user?.avatar}
                                                    alt={request.user?.name}
                                                />
                                                <AvatarFallback>
                                                    {getInitials(
                                                        request.user?.name ??
                                                            'Unknown User',
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-sm">
                                                    {request.user?.name}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    @Username.1234
                                                </p>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Button
                                                            size="icon-sm"
                                                            variant="ghost"
                                                            className="rounded-full"
                                                        >
                                                            <Ellipsis />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="left">
                                                        Member Option
                                                    </TooltipContent>
                                                </Tooltip>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent
                                                align="center"
                                                side="left"
                                            >
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        acceptUser(
                                                            request.user_id,
                                                        )
                                                    }
                                                >
                                                    <Check /> Accept
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        rejectUser(
                                                            request.user_id,
                                                        )
                                                    }
                                                >
                                                    <X /> Reject
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ))}
                            </CollapsibleContent>
                        </Collapsible>
                    )}
                </div>
            </div>
            <CardFooter className="mt-auto justify-end px-2">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <LogOut /> Leave Group
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently remove your account from this group.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={leaveGroup}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}
