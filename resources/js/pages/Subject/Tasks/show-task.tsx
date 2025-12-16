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
import { Textarea } from '@/components/ui/textarea';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData, Task, User } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function StudentTask({
    task,
    user,
}: {
    task: Task;
    user: User;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        comment: '',
    });

    const addComment = (task: number, user: number) => {
        post(`/task/comment/${task}/${user}`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const getInitials = useInitials();
    const { auth } = usePage<SharedData>().props;

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Subject',
            href: '/subject',
        },
        {
            title: 'Task',
            href: `/task/student-task/${task.subject?.id}`,
        },
        {
            title: 'Comment',
            href: `/task/show-task`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Student Task" />
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded-lg p-4">
                <div className="grid grid-cols-[1fr_auto] gap-2">
                    <Card className="flex">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>{task.name}</CardTitle>
                                <p className="text-muted-foreground">
                                    {task.due_date ?? 'No due date'}
                                </p>
                            </div>
                            <CardDescription>
                                {task.description ?? 'No description'}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Add File</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input type="file" accept="image/*" />
                        </CardContent>
                    </Card>
                </div>

                <Card className="flex flex-col gap-2 pb-2">
                    <CardHeader className="pb-2">
                        <CardTitle>Comment</CardTitle>
                    </CardHeader>

                    <CardContent className="max-h-[50svh] flex-1 space-y-4 overflow-y-auto border p-2">
                        {task.comment?.length === 0 && <p>No comment yet</p>}

                        {task.comment?.map((comment) =>
                            comment.user?.id === auth.user.id ? (
                                <div
                                    key={comment.id}
                                    className="flex flex-row-reverse items-center gap-2"
                                >
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={comment.user?.avatar}
                                            alt={comment.user?.name}
                                        />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(
                                                comment.user?.name ?? '?',
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-lg border bg-zinc-700 p-2">
                                        {comment.comment}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={comment.id}
                                    className="flex flex-row items-center gap-2"
                                >
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={comment.user?.avatar}
                                            alt={comment.user?.name}
                                        />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(
                                                comment.user?.name ?? '?',
                                            )}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-lg border bg-zinc-700 p-2">
                                        {comment.comment}
                                    </div>
                                </div>
                            ),
                        )}

                        <div></div>
                    </CardContent>

                    <CardFooter className="mt-auto p-2">
                        <Textarea
                            rows={4}
                            value={data.comment} // bind the value
                            onChange={(e) => setData('comment', e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addComment(task.id, user.id);
                                }
                            }}
                        />
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
