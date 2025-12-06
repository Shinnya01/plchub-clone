import FlashToaster from '@/components/FlashToaster';
import { Toaster } from '@/components/ui/sonner';
import AppLayoutHeader from '@/layouts/app/app-header-layout';
import AppLayoutSidebar from '@/layouts/app/app-sidebar-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Toaster position="bottom-right" richColors />
            <FlashToaster />
            {auth.user.role !== 'student' ? (
                <AppLayoutSidebar breadcrumbs={breadcrumbs} {...props}>
                    {children}
                </AppLayoutSidebar>
            ) : (
                <AppLayoutHeader breadcrumbs={breadcrumbs} {...props}>
                    {children}
                </AppLayoutHeader>
            )}
        </>
    );
};
