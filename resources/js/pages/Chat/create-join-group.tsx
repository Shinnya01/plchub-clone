import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import InputError from "@/components/input-error";

export function CreateJoinGroup(){

    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        privacy: 'public',
    });

    const handleCreate = (e: any) => {
        e.preventDefault();
        post('/group-chat', {
            onSuccess: () => {
                reset();
                setOpen(false);
            }
        })
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>Create / Join</Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="p-2">
                    <Tabs defaultValue="create-group" className="">
                    <DialogHeader className="mb-6">
                        <DialogTitle>
                        <TabsList>
                            <TabsTrigger value="create-group">Create Group</TabsTrigger>
                            <TabsTrigger value="join-group">Join Group</TabsTrigger>
                        </TabsList>
                        </DialogTitle>
                    </DialogHeader>
                    <TabsContent value="create-group">
                        <form onSubmit={handleCreate}>
                        <div className="space-y-4">
                            <Label htmlFor="name">Group Name</Label>
                            <Input 
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Group name"/>
                            <InputError message={errors.name} />

                            <Label htmlFor="privacy">Privacy</Label>
                            <Select
                                    value={data.privacy}
                                    onValueChange={(value) => setData("privacy", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                    </SelectContent>
                                </Select>


                            <div className="flex justify-end">
                                <Button size="sm">Create Group</Button>
                            </div>
                        </div>
                        </form>
                    </TabsContent>
                    <TabsContent value="join-group">
                        <div className="space-y-2">
                            <Label htmlFor="id">Group Name</Label>
                            <Input 
                                id="ids"
                                placeholder="Group ID"/>
                            <div className="flex justify-end">
                                <Button size="sm">Join Group</Button>
                            </div>
                        </div>
                    </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    )
}