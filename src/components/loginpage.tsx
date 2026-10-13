'use client';

import React, { useEffect } from 'react';
import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from '../app/lib/Store/hooks';
import { loginStart, loginSuccess, loginFailure, clearError } from '../app/lib/Store/authSlice';
import { useRouter } from 'next/navigation';

interface LoginFormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
    const router = useRouter();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    // Clear error when component mounts
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleLoginSubmit = async (formData: LoginFormData): Promise<void> => {
        try {
            dispatch(loginStart());

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include', // Include cookies for session management
            });

            const data = await response.json();

            if (response.ok) {
                // Store token in localStorage or httpOnly cookie (handled by backend)
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }

                dispatch(loginSuccess({
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    token: data.token,
                    role: data.user.role
                }));

                // Redirect based on user role
                const redirectPath = data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
                router.push(redirectPath);
            } else {
                dispatch(loginFailure(data.message || 'Login failed'));
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Network error occurred';
            dispatch(loginFailure(errorMessage));
        }
    };

    // Don't render if already authenticated (prevents flash)
    if (isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p>Redirecting...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between h-screen max-h-screen">
            <section className="w-fit h-fit mx-auto px-8 max-w-full 2xl:max-w-[1400px] my-auto">
                <div className="space-y-6">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        width={1000}
                        height={1000}
                        alt="CarePulse Logo"
                        className="mb-12 h-10 w-fit"
                        priority
                    />
                    
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-white">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600">
                            Sign in to your CarePulse account
                        </p>
                    </div>

                    <PatientForm
                        onSubmit={handleLoginSubmit}
                        loading={loading}
                        error={error}
                    />

                    <div className="text-14-regular mt-8 flex justify-between items-center">
                        <p className="text-[#76828D] xl:text-left">
                            © 2025 CarePulse
                        </p>
                        <Link 
                            href="/admin/login" 
                            className="text-green-500 hover:text-green-600 transition-colors"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </section>
            
            <Image
                src="/assets/images/onboarding-img.png"
                height={1000}
                width={1000}
                alt="Patient onboarding illustration"
                className="hidden h-full object-cover md:block max-w-[50%]"
                priority={false}
            />
        </div>
    );
};

export default LoginPage;

<Image 
    src="/assets/images/onboarding-image.png" 
    alt='Paitent onboarding illustration'
    height={1000}
    width={1000}
    className='hidden h-full object-over md:block max-w-[50%]'
/>