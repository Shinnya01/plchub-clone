import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
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

import InputError from "@/components/input-error";
import { BreadcrumbItem } from "@/types";

export default function CreateUser(){

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
    })
    
    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        post("/user-management")
    }

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'User Management',
            href: '/user-management',
        },
        {
            title: 'Create User',
            href: '/user-management/create',
        },
    ]
    
    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Create User"/>
            <div className="flex flex-col flex-1 gap-4 p-4 overflow-y-auto rounded-lg">
                <form onSubmit={submit} className="flex flex-col gap-4 p-4 max-w-md">
                    
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input 
                            id="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            placeholder="enter password"
                        />
                        <InputError message={errors.password} />
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
            </div>
        </AppLayout>
    )
}