import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useInitials } from '@/hooks/use-initials';
import { GroupChat } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export function UpdateGroup({ groupChat }: { groupChat: GroupChat }) {
    const [openUpdate, setOpenUpdate] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: groupChat.name,
        privacy: groupChat.privacy,
    });

    const handleUpdate = (e: any) => {
        e.preventDefault();
        put(`/group-chat/${groupChat.id}`, {
            onSuccess: () => {
                setOpenUpdate(false);
            },
        });
    };

    const getInitials = useInitials();

    return (
        <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
            <DialogTrigger asChild>
                <Button variant="secondary">Update Group</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Updating {groupChat.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="flex flex-col items-center gap-4">
                            <Avatar className="size-30 rounded-lg">
                                <AvatarImage
                                    src={groupChat.group_photo}
                                    alt={groupChat.name}
                                />
                                <AvatarFallback className="text-2xl">
                                    {getInitials(groupChat.name)}
                                </AvatarFallback>
                            </Avatar>
                            <Button>Change Photo</Button>
                        </div>
                        <div>
                            <Label htmlFor="group_name">Group Name</Label>
                            <Input
                                id="group_name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <Label htmlFor="privacy"></Label>
                            <Select
                                value={data.privacy}
                                onValueChange={(value) =>
                                    setData(
                                        'privacy',
                                        value as 'public' | 'private',
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select group privacy" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">
                                        Public
                                    </SelectItem>
                                    <SelectItem value="private">
                                        Private
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" type="reset">
                            Cancel
                        </Button>
                        <Button type="submit">Update</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
