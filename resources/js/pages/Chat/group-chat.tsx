import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, GroupChat } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { CreateJoinGroup } from './create-join-group';

export default function GroupChats({
    myGroups,
    publicGroups,
}: {
    myGroups: GroupChat[];
    publicGroups: GroupChat[];
}) {
    const { data, setData, post } = useForm({
        group_chat_id: null as number | null,
    });

    const joinGroup = (group_chat_id: number) => {
        router.post('/group-chat/join-group', { group_chat_id });
    };

    const getInitials = useInitials();

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Group Chat',
            href: '/group-chat',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Chat" />
            <div className="mx-auto flex w-5xl flex-1 flex-col gap-4 overflow-y-auto rounded-lg p-4">
                <div className="flex justify-between">
                    <Input className="max-w-md" />
                    <CreateJoinGroup />
                </div>
                <div className="grid flex-1 grid-cols-2 gap-2">
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Your Group</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                            <div className="space-y-4">
                                {myGroups.length <= 0 && (
                                    <div className="px-4 text-muted-foreground">
                                        No groups yet.
                                    </div>
                                )}
                                {myGroups.map((myGroup) => (
                                    <Card
                                        key={myGroup.id}
                                        onClick={() =>
                                            router.visit(
                                                `/group-chat/${myGroup.id}`,
                                            )
                                        }
                                        className="cursor-pointer pt-4 pb-2"
                                    >
                                        <CardHeader className="px-4">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="size-12 rounded-lg">
                                                    <AvatarImage
                                                        src={
                                                            myGroup.group_photo ||
                                                            undefined
                                                        }
                                                        alt="@evilrabbit"
                                                    />
                                                    <AvatarFallback>
                                                        {getInitials(
                                                            myGroup.name ??
                                                                'Unknown Group',
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <CardTitle>
                                                    {myGroup.name}
                                                </CardTitle>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Public Groups</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                            <div className="flex flex-col space-y-4">
                                {publicGroups.length <= 0 && (
                                    <div className="px-4 text-muted-foreground">
                                        No public groups yet.
                                    </div>
                                )}
                                {publicGroups.map((publicGroup) => (
                                    <Dialog key={publicGroup.id}>
                                        <DialogTrigger asChild>
                                            <div className="cursor-pointer">
                                                <Card className="pt-4 pb-2">
                                                    <CardHeader className="px-4">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="size-12 rounded-lg">
                                                                <AvatarImage
                                                                    src={
                                                                        publicGroup.group_photo ||
                                                                        undefined
                                                                    }
                                                                    alt="@evilrabbit"
                                                                />
                                                                <AvatarFallback>
                                                                    {getInitials(
                                                                        publicGroup.name ??
                                                                            'Unknown Group',
                                                                    )}
                                                                </AvatarFallback>
                                                            </Avatar>

                                                            <CardTitle>
                                                                {
                                                                    publicGroup.name
                                                                }
                                                            </CardTitle>
                                                        </div>
                                                    </CardHeader>
                                                </Card>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Join Group
                                                </DialogTitle>
                                                <CardDescription>
                                                    Are you sure you want to
                                                    join {publicGroup.name}
                                                </CardDescription>
                                            </DialogHeader>
                                            <DialogFooter className="mt-auto">
                                                <Button
                                                    onClick={() =>
                                                        joinGroup(
                                                            publicGroup.id,
                                                        )
                                                    }
                                                >
                                                    Confirm
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
