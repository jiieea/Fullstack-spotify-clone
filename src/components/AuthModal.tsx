"use client"

import React, { useEffect } from 'react'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import useAuthModal from '@/hooks/useAuthModal'
import ModalContainer from './ModalContainer'
/**
 * AuthModal Component
 *
 * This component renders an authentication modal using Radix UI's Dialog primitive
 * wrapped by a custom `Modal` component. It integrates with Supabase for user
 * authentication, allowing users to log in or sign up.
 *
 * The modal automatically closes and refreshes the page upon successful authentication.
 */
const AuthModal = () => {
    // Initialize Supabase client for interacting with your Supabase project.
    const supabaseClient = useSupabaseClient();
    // Initialize Next.js router for client-side navigation.
    const router = useRouter();
    // Get the current session context from Supabase, including the active session.
    const { session } = useSessionContext();
    // Destructure the `isOpen` state and `onClose` function from the custom auth modal hook.
    const { isOpen, onClose } = useAuthModal();

    /**
   * useEffect Hook for Session Management
   *
   * This effect runs whenever the `session`, `router`, or `onClose` dependencies change.
   * It checks if a user session exists. If it does, it means the user has successfully
   * logged in or signed up. In this case, it refreshes the router to update the page
   * content (e.g., show authenticated UI) and closes the authentication modal.
   */
    useEffect(() => {
        if (session) {
            router.refresh();
            onClose()
        }
    }, [session, router, onClose])

    /*onChange handler for modal state */
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <ModalContainer
            title="Welcome Back"
            description='Login To Your Account'
            isOpen={isOpen}
            onChange={onChange}>
            <Auth
                theme='dark'
                providers={[ 'google']}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22c55e",
                            }
                        }
                    }
                }}
            />
        </ModalContainer>
    )
}

export default AuthModal