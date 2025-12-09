import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Subject } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Subjects({ subjects }: { subjects: Subject[] }) {
    const [openCreate, setOpenCreate] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        subject_code: '',
    });

    const createSubject = () => {
        setData('name', data.name);
        post('/subject', {
            onSuccess: () => {
                setOpenCreate(false);
            },
        });
    };

    const joinSubject = () => {
        post('/subject/join-subject', {
            onSuccess: () => {
                setOpenJoin(false);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Subjects" />
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <Input className="max-w-lg" />
                    <div>
                        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                            <DialogTrigger asChild>
                                <Button>Add Subject</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create Subject</DialogTitle>
                                </DialogHeader>
                                <Input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="Input a subject"
                                />
                                <InputError message={errors.name} />
                                <DialogFooter className="mt-auto">
                                    <Button
                                        variant="ghost"
                                        onClick={() => reset}
                                    >
                                        Discard
                                    </Button>
                                    <Button onClick={createSubject}>
                                        Create
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog open={openJoin} onOpenChange={setOpenJoin}>
                            <DialogTrigger asChild>
                                <Button>Join Subject</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Join Subject</DialogTitle>
                                </DialogHeader>
                                <Input
                                    value={data.subject_code}
                                    onChange={(e) =>
                                        setData('subject_code', e.target.value)
                                    }
                                    placeholder="Enter Group Code"
                                />
                                <InputError message={errors.subject_code} />
                                <DialogFooter className="mt-auto">
                                    <Button
                                        variant="ghost"
                                        onClick={() => reset}
                                    >
                                        Discard
                                    </Button>
                                    <Button onClick={joinSubject}>Join</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {subjects.map((subject) => (
                        <Card key={subject.id}>
                            <CardHeader>
                                <div className="flex justify-between">
                                    <CardTitle>{subject.name}</CardTitle>
                                    <p>10 Tasks</p>
                                </div>
                                <CardDescription>
                                    Code: {subject.subject_code}
                                </CardDescription>
                                <CardDescription>
                                    {subject.students_count} Students
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
