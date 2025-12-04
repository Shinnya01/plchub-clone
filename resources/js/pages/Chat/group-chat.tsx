import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { CreateJoinGroup } from "./create-join-group";
import { Input } from "@/components/ui/input";
import { GroupChat } from "@/types";



export default function GroupChats({myGroups}: {myGroups: GroupChat[]}){
    return (
        <AppLayout>
            <Head title="Chat"/>
            <div className="flex flex-col flex-1 overflow-y-auto gap-4 p-4 rounded-lg w-5xl mx-auto">
                <div className="flex justify-between">
                    <Input className="max-w-md"/>
                    <CreateJoinGroup/>
                </div>
                <div className="grid grid-cols-2 flex-1 gap-2">
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Your Group</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                            <div className="space-y-4">
                                {myGroups.map((myGroup) => (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                {myGroup.name}
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex-1">
                        <CardHeader>
                           <CardTitle>Public Groups</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}