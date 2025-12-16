import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Card,
    CardContent,
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
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, VotingRoom } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ChevronDownIcon } from 'lucide-react';
import React, { useState } from 'react';

export default function VotingRooms({
    publicRooms,
    privateRooms,
}: {
    publicRooms: VotingRoom[];
    privateRooms: VotingRoom[];
}) {
    const [openCreate, setOpenCreate] = useState(false);
    const [openStartCalendar, setOpenStartCalendar] = React.useState(false);
    const [openEndCalendar, setOpenEndCalendar] = React.useState(false);
    const [startDate, setStartDate] = React.useState<Date | undefined>(
        undefined,
    );
    const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        privacy: '',
        start_date: '',
        end_date: '',
    });

    const createRoom = () => {
        post('/voting', {
            onSuccess: () => {
                reset();
                setStartDate(undefined);
                setEndDate(undefined);
                setOpenCreate(false);
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Voting rooms',
            href: '/voting',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Voting rooms" />
            <div className="mx-auto flex w-7xl flex-1 flex-col gap-4 overflow-hidden rounded-lg p-4">
                <div>
                    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                        <DialogTrigger asChild>
                            <Button>Create Room</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create voting room</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <Label htmlFor="room-name">Room name</Label>
                                <Input
                                    id="room-name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-4">
                                <Label>Privacy</Label>
                                <Select
                                    value={data.privacy}
                                    onValueChange={(value) =>
                                        setData('privacy', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select privacy..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="public">
                                                Public
                                            </SelectItem>
                                            <SelectItem value="private">
                                                Private
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.privacy} />
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="start_date">From</Label>
                                <div className="flex items-center gap-2">
                                    <Popover
                                        open={openStartCalendar}
                                        onOpenChange={setOpenStartCalendar}
                                    >
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="start-date-picker"
                                                className="justify-between font-normal"
                                            >
                                                {startDate
                                                    ? startDate.toLocaleDateString()
                                                    : 'Select date'}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto overflow-hidden p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={startDate}
                                                captionLayout="dropdown"
                                                onSelect={(selectedDate) => {
                                                    setStartDate(selectedDate);

                                                    if (selectedDate) {
                                                        const formatted =
                                                            selectedDate.toLocaleDateString(
                                                                'en-CA',
                                                            ); // YYYY-MM-DD
                                                        setData(
                                                            'start_date',
                                                            formatted,
                                                        );
                                                    }

                                                    setOpenStartCalendar(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <InputError message={errors.start_date} />
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="end_date">To</Label>
                                <div className="flex items-center gap-2">
                                    <Popover
                                        open={openEndCalendar}
                                        onOpenChange={setOpenEndCalendar}
                                    >
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="end-date-picker"
                                                className="justify-between font-normal"
                                            >
                                                {endDate
                                                    ? endDate.toLocaleDateString()
                                                    : 'Select date'}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto overflow-hidden p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={endDate}
                                                captionLayout="dropdown"
                                                onSelect={(selectedDate) => {
                                                    setEndDate(selectedDate);

                                                    if (selectedDate) {
                                                        setData(
                                                            'end_date',
                                                            selectedDate
                                                                .toISOString()
                                                                .slice(0, 10),
                                                        );
                                                    }

                                                    setOpenEndCalendar(false);
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <InputError message={errors.end_date} />
                            </div>
                            <DialogFooter>
                                <Button>Discard</Button>
                                <Button onClick={createRoom}>Create</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Public rooms</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {publicRooms.map((room) => (
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle>
                                                    {room.name}
                                                </CardTitle>
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/voting/${room.id}`,
                                                        )
                                                    }
                                                >
                                                    Enter Room
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <CardDescription>
                                                    Creator: {room.user.name}
                                                </CardDescription>
                                            </div>
                                            <CardDescription>
                                                Start: {room.start_date} -{' '}
                                                {room.end_date}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Private rooms</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
