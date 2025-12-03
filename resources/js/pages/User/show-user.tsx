import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, User } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ViewUser({user}: {user: User}){
    
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'User Management',
            href: '/user-management',
        },
        {
            title: 'View user',
            href: `/user-management/${user.id}`,
        },
    ]

    const {data, errors} = useForm({
            name: user.name,
            email: user.email,
            role: user.role,
        })

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Show user"/>
            <div className="flex flex-col flex-1 gap-4 p-4 overflow-y-auto rounded-lg">
                <div className="flex justify-between">
                    <Button size="icon" onClick={() => router.visit('/user-management')}>
                        <ChevronLeft/>
                    </Button>
                    <Button onClick={() => router.visit(`/user-management/${user.id}/edit`)}>
                        Edit
                    </Button>
                </div>
                <div className="flex flex-col gap-4 p-4 max-w-md">
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                            id="name"
                            value={data.name}
                            disabled
                            placeholder="enter username"
                        />
                    </Field>
                    <InputError message={errors.name} />

                    <Field>
                        <FieldLabel htmlFor="email">email</FieldLabel>
                        <Input 
                            id="email"
                            value={data.email}
                            disabled
                            placeholder="enter email"
                        />
                    
                    </Field>

                    <Field>
                        <FieldLabel>Role</FieldLabel>
                        <Select
                            value={data.role}
                            disabled
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="org">Org</SelectItem>
                                <SelectItem value="student">Student</SelectItem>
                            </SelectContent>
                        </Select>
                        
                    </Field>
                </div>
            </div>
        </AppLayout>
    )
}