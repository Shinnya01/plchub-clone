import Heading from "@/components/heading";
import { UserDataTable } from "@/components/ui/user-data-table";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, User } from "@/types";
import { Head } from "@inertiajs/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user-management'
    },
];

export default function UserManagement({users}: {users: User[]}){
    return (
        <AppLayout breadcrumbs={breadcrumb}> 
            <Head title="User Management"/>
            <div className="flex flex-col flex-1 h-full gap-4 overflow-x-auto rounded-lg p-4">
                <UserDataTable users = {users}/>
                
            </div>
        </AppLayout>
    )
}