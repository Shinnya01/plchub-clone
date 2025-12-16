import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Crud } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export function CrudUpdate({ crud }: { crud: Crud }) {
    const [openUpdate, setOpenUpdate] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: crud.name,
        description: crud.description,
    });

    const handleUpdate = (id: number) => {
        put(`/crud/${id}`, {
            onSuccess: () => {
                setOpenUpdate(false);
            },
        });
    };

    return (
        <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
            <DialogTrigger asChild>
                <Button>Update</Button>
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
                            setOpenUpdate(false);
                            reset();
                        }}
                    >
                        Discard
                    </Button>
                    <Button onClick={() => handleUpdate(crud.id)}>
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
