import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Subject, Task } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
export function CreateTask({
    tasks,
    subject,
}: {
    tasks: Task[];
    subject: Subject;
}) {
    const [openCreate, setOpenCreate] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        due_date: '',
        subject_id: subject.id,
    });

    const createTask = () => {
        post('/task', {
            onSuccess: () => {
                reset();
                setOpenCreate(false);
            },
        });
    };
    return (
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
                <Button>Create Task</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Task</DialogTitle>
                </DialogHeader>
                <Label htmlFor="task-name">Task name</Label>
                <Input
                    id="task-name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} />
                <Label htmlFor="task-description">Task Description</Label>
                <Textarea
                    id="task-description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    rows={4}
                />
                <CardFooter className="mt-auto flex justify-end gap-4 p-0">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setOpenCreate(false);
                            reset();
                        }}
                    >
                        Discard
                    </Button>
                    <Button onClick={createTask}>Create</Button>
                </CardFooter>
            </DialogContent>
        </Dialog>
    );
}
