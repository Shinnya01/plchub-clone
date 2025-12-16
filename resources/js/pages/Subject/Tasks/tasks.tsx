import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData, Subject, Task } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { AdviserList } from './adviser-list';

export default function Tasks({
    tasks,
    subject,
}: {
    tasks: Task[];
    subject: Subject;
}) {
    const { auth } = usePage<SharedData>().props;

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Subject',
            href: '/subject',
        },
        {
            title: 'Task',
            href: `/task/student-task/${subject.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Tasks" />
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded-lg p-4">
                <div>
                    <h3 className="text-2xl">{subject.name}</h3>
                    <p className="text-muted-foreground">
                        Adviser: {subject.teacher?.name}
                    </p>
                </div>
                {auth.user.role !== 'student' ? (
                    <AdviserList tasks={tasks} subject={subject} />
                ) : (
                    <div className="grid grid-cols-4 gap-4">
                        {tasks.length === 0 && (
                            <p className="col-span-4 text-center">
                                No tasks yet
                            </p>
                        )}
                        {tasks.map((task) => (
                            <Card
                                key={task.id}
                                onClick={() =>
                                    router.visit(
                                        `/task/show-task/${task.id}/${auth.user.id}`,
                                    )
                                }
                            >
                                <CardHeader>
                                    <CardTitle>{task.name}</CardTitle>
                                    <CardDescription>
                                        {task.description ?? 'No description'}
                                    </CardDescription>
                                    <CardDescription>
                                        {task.due_date ?? 'No due date'}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
