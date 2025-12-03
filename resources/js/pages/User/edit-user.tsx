import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, User } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputError from "@/components/input-error";

export default function EditUser({user}: {user: User}){
    const {data, setData, put, processing, errors} = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    })

    const handleUpdate = (e: any) => {
        e.preventDefault();
        put(`/user-management/${user.id}`)
    }

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: "User Management",
            href: "/user-management"
        },
        
        {
            title: "View User",
            href: `/user-management/${user.id}`
        },
        {
            title: "Edit User",
            href: `/user-management/${user.id}/edit`
        }
    ]

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Edit User"/>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4 p-4 max-w-md">
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input 
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="enter username"
                        />
                    </Field>
                    <InputError message={errors.name} />

                    <Field>
                        <FieldLabel htmlFor="email">email</FieldLabel>
                        <Input 
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="enter email"
                        />
                    <InputError message={errors.email} />
                    </Field>

                    <Field>
                        <FieldLabel>Role</FieldLabel>
                        <Select
                            value={data.role}
                            onValueChange={(value) => setData("role", value)}
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
                        <InputError message={errors.role} />
                    </Field>

                    <Button 
                        type="submit" 
                        disabled={processing}>
                    {processing ? "Saving..." : "Create User"}
                    </Button>
            </form>
        </AppLayout>
    )
}