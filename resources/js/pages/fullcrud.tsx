import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Crud, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { CrudCreate } from './crud-create';
import { CrudUpdate } from './crud-update';

export default function CrudFull({ cruds }: { cruds: Crud[] }) {
    const { auth } = usePage<SharedData>().props;

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
        <AppLayout>
            <Head title="full crud" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardContent className="space-y-20">
                        <div className="flex items-center justify-between">
                            <div>{auth.user.name}</div>
                            <CrudCreate />
                        </div>
                        <div className="w-full">
                            <table className="w-full">
                                <tr className="text-left">
                                    <th>name</th>
                                    <th>description</th>
                                    <th>action</th>
                                </tr>
                                {cruds.map((crud) => (
                                    <tr key={crud.id}>
                                        <td>{crud.name}</td>
                                        <td>{crud.description}</td>
                                        <td>
                                            <CrudUpdate crud={crud} />

                                            <Button
                                                onClick={() =>
                                                    router.delete(
                                                        `/crud/${crud.id}`,
                                                    )
                                                }
                                            >
                                                delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
