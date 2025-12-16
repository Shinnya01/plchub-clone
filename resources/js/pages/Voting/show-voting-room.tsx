import AppLayout from '@/layouts/app-layout';
import { VotingRoom } from '@/types';
import { Head } from '@inertiajs/react';

export default function ShowVotingRoom({
    votingRoom,
}: {
    votingRoom: VotingRoom;
}) {
    return (
        <AppLayout>
            <Head title="Voting Room" />
            <div className="flex-cod flex flex-1 gap-4 overflow-hidden rounded-lg p-4">
                show room
                {votingRoom.name}
            </div>
        </AppLayout>
    );
}
