import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
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
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { VotingRoom } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';

export default function ShowVotingRoom({
    votingRoom,
}: {
    votingRoom: VotingRoom;
}) {
    const [focused, setFocused] = useState(false);
    const [newCandidateDescription, setNewCandidateDescription] = useState('');
    const [newCandidate, setNewCandidate] = useState('');
    const [newPosition, setNewPosition] = useState('');

    const [openPosition, setOpenPosition] = useState(false);
    const [openCandidate, setOpenCandidate] = useState(false);
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     position: '',
    // });

    const positions = ['president', 'vise president', 'secretary', 'treasurer'];

    const filtered = positions.filter((position: string) =>
        position.toLowerCase().includes(newPosition.toLowerCase()),
    );

    const showDropdown = focused && filtered.length > 0;

    const createPosition = () => {
        router.post(
            '/voting/create-position',
            {
                name: newPosition,
                voting_room_id: votingRoom.id,
            },
            {
                onSuccess: () => {
                    setOpenPosition(false);
                    setNewPosition('');
                },
            },
        );
    };

    const createCandidate = (position_id: number) => {
        router.post(
            `/voting/create-candidate/${position_id}`,
            {
                name: newCandidate,
                voting_room_id: votingRoom.id,
                description: newCandidateDescription,
            },
            {
                onSuccess: () => {
                    setOpenCandidate(false);
                    setNewCandidate('');
                    setNewCandidateDescription('');
                },
            },
        );
    };

    const { errors } = usePage().props as {
        errors: Record<string, string>;
    };
    const totalCandidates = votingRoom.positions?.reduce(
        (acc, position) => acc + (position.candidates?.length ?? 0),
        0,
    );

    return (
        <AppLayout>
            <Head title="Voting Room" />
            <div className="mx-auto flex w-5xl flex-1 flex-col gap-4 overflow-hidden rounded-lg p-4">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-lg font-bold">{votingRoom.name}</h3>
                        <p className="text-sm text-muted-foreground">
                            Creator: {votingRoom.user.name}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                            {votingRoom.start_date} - {votingRoom.end_date}
                        </p>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="link" asChild>
                        <Link>Voters List</Link>
                    </Button>
                    <Dialog open={openPosition} onOpenChange={setOpenPosition}>
                        <DialogTrigger asChild>
                            <Button>Add Position</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Position</DialogTitle>
                                <DialogDescription>
                                    Position for candidates
                                </DialogDescription>
                                <div>
                                    <Input
                                        className="capitalize"
                                        value={newPosition}
                                        onChange={(e) =>
                                            setNewPosition(e.target.value)
                                        }
                                        onFocus={() => setFocused(true)}
                                        placeholder="position name"
                                    />

                                    {showDropdown && (
                                        <div>
                                            <Command>
                                                <CommandGroup>
                                                    {filtered.map(
                                                        (position) => (
                                                            <CommandItem
                                                                key={position}
                                                                onMouseDown={() => {
                                                                    setNewPosition(
                                                                        position,
                                                                    );
                                                                    setFocused(
                                                                        false,
                                                                    );
                                                                }}
                                                            >
                                                                <span className="capitalize">
                                                                    {position}
                                                                </span>
                                                            </CommandItem>
                                                        ),
                                                    )}
                                                </CommandGroup>
                                            </Command>
                                        </div>
                                    )}
                                    <InputError message={errors.name} />
                                </div>
                                <DialogFooter>
                                    <Button>Discard</Button>
                                    <Button onClick={createPosition}>
                                        Create
                                    </Button>
                                </DialogFooter>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle>1/9</CardTitle>
                            <CardDescription>Votes</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle>{votingRoom.start_date}: 8AM</CardTitle>
                            <CardDescription>Starts</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle>{totalCandidates}</CardTitle>
                            <CardDescription>Candidates</CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                <div className="space-y-4">
                    {/* <Card>
                        <CardHeader className="text-center">
                            <CardTitle>President</CardTitle>
                            <CardDescription>
                                Candidates for President position
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-4">
                                <Card className="gap-0 overflow-hidden py-0">
                                    <CardHeader className="space-y-4 p-0">
                                        <PlaceholderPattern className="h-50 w-full bg-white" />
                                    </CardHeader>
                                    <CardContent className="p-2">
                                        <CardTitle>CANDIDATE NAME</CardTitle>
                                        <CardDescription>
                                            CANDIDATE SABISABI
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter className="gap-2 p-2">
                                        <Button size="sm">Vote</Button>
                                        <Button size="sm" variant="secondary">
                                            View
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </CardContent>
                    </Card> */}

                    {votingRoom.positions?.map((position) => (
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="flex items-center justify-between capitalize">
                                    {position.name}

                                    <Dialog
                                        open={openCandidate}
                                        onOpenChange={setOpenCandidate}
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                            >
                                                Add Candidate
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Add Position
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Position for candidates
                                                </DialogDescription>
                                                <div>
                                                    <Label>
                                                        Candidate name
                                                    </Label>
                                                    <Input
                                                        className="capitalize"
                                                        value={newCandidate}
                                                        onChange={(e) =>
                                                            setNewCandidate(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="candidate name"
                                                    />

                                                    <InputError
                                                        message={errors.name}
                                                    />

                                                    <Label>
                                                        Candidate description
                                                    </Label>
                                                    <Input
                                                        className="capitalize"
                                                        value={
                                                            newCandidateDescription
                                                        }
                                                        onChange={(e) =>
                                                            setNewCandidateDescription(
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="candidate name"
                                                    />
                                                </div>
                                                <DialogFooter>
                                                    <Button>Discard</Button>
                                                    <Button
                                                        onClick={() =>
                                                            createCandidate(
                                                                position.id,
                                                            )
                                                        }
                                                    >
                                                        Create
                                                    </Button>
                                                </DialogFooter>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </CardTitle>
                                <CardDescription className="text-left">
                                    Candidates for{' '}
                                    <span className="capitalize">
                                        {position.name}
                                    </span>{' '}
                                    position
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-4 gap-4">
                                    {position.candidates?.map((candidate) => (
                                        <Card className="gap-0 overflow-hidden py-0">
                                            <CardHeader className="space-y-4 p-0">
                                                <PlaceholderPattern className="h-50 w-full bg-white" />
                                            </CardHeader>
                                            <CardContent className="p-2">
                                                <CardTitle>
                                                    {candidate.name}
                                                </CardTitle>
                                                <CardDescription>
                                                    {candidate.description ??
                                                        'No description'}
                                                </CardDescription>
                                            </CardContent>
                                            <CardFooter className="gap-2 p-2">
                                                <Button size="sm">Vote</Button>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                >
                                                    View
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
