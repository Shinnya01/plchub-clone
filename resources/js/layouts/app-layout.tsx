import AppLayoutSidebar from '@/layouts/app/app-sidebar-layout';
import AppLayoutHeader from '@/layouts/app/app-header-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import FlashToaster from '@/components/FlashToaster';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { auth } = usePage<SharedData>().props
    
    return (
        auth.user.role !== 'student' ? 
        
            <AppLayoutSidebar breadcrumbs={breadcrumbs} {...props}>
                {children}
                <Toaster position="bottom-right" richColors />
                <FlashToaster/>
            </AppLayoutSidebar>
            
        : 
            <AppLayoutHeader breadcrumbs={breadcrumbs} {...props}>
                {children}
                <Toaster position="bottom-right" richColors />
                <FlashToaster/>
            </AppLayoutHeader>
    )
};
