import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export function CrudCreate() {
    const [openCreate, setOpenCreate] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const handleCreate = () => {
        post('/crud', {
            onSuccess: () => {
                setOpenCreate(false);
            },
        });
    };

    return (
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
                <Button>Create</Button>
            </DialogTrigger>
            <DialogContent>
                <Input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="name"
                />
                <Input
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="description"
                />
                <DialogFooter>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setOpenCreate(false);
                            reset();
                        }}
                    >
                        Discard
                    </Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
