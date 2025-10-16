'use client';
import { useState } from 'react';
import { TextInput, PasswordInput, Button, Card, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import {showNotification} from "@/utils/notifications";
import {signIn} from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (result?.error) {
                showNotification("Error", result.error || 'Login failed', 'red');
                return;
            }

            showNotification("Success",  `Welcome, ${values.email}!`, 'green')
            router.push('/');
            form.reset();

        } catch (err) {
            showNotification("Error", 'Network error. Please try again.', 'red');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card shadow="sm" padding="lg" className="max-w-md mx-auto">
            <Title order={2} className="text-center mb-6">Login</Title>

            <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
                <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    required
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    {...form.getInputProps('password')}
                />

                <Button
                    type="submit"
                    fullWidth
                    loading={loading}
                    className="bg-green-600 hover:bg-green-700"
                >
                    Login
                </Button>
                <Button
                    fullWidth
                    variant="outline"
                    color="blue"
                    radius="md"
                    size="md"
                    component={Link}
                    href="/auth/register"
                    className="mt-2"
                >
                    Don't have an account? Create one.
                </Button>
            </form>
        </Card>
    );
}
