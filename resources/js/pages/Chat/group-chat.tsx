import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { CreateJoinGroup } from "./create-join-group";
import { Input } from "@/components/ui/input";


export default function GroupChats(){
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