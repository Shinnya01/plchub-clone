// resources/js/Components/FlashToaster.jsx (or .tsx)

import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';
// Define the structure of your flash messages
interface FlashType {
    success: string | null;
    error: string | null;
    // Add other keys you might share, e.g., info: string | null;
}
interface InertiaPageProps {
    flash: FlashType;
    // ... other shared props can go here (e.g., auth, errors)
    [key: string]: any;
}

export default function FlashToaster() {
  // Access the shared Inertia props
  const { flash } = usePage<InertiaPageProps>().props;

  useEffect(() => {
    // Check if a success message exists
    if (flash.success) {
      toast.success(flash.success);
    }
    
    // Check if an error message exists
    if (flash.error) {
      toast.error(flash.error);
    }
    
    // You can add other types (info, warning, etc.) here
    
  }, [flash]); // Re-run effect when the flash prop changes (i.e., after a redirect)

  // This component doesn't render anything visually, 
  // it just manages the side effect of showing the toast.
  return null;
}