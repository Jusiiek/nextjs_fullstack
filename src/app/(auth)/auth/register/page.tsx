'use client';
import { useState } from 'react';
import { TextInput, PasswordInput, Button, Card, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import {AuthService} from "@/services/auth";
import {showNotification} from "@/utils/notifications";
import Link from "next/link";

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            const { res } = await AuthService.register(values.email, values.password);

            if (!res.ok) {
                showNotification("Error", 'Registration failed', 'red');
            } else {
                showNotification("Success", 'Successfully created an account.', 'green');
                form.reset();
            }
        } catch (err) {
            showNotification("Error", 'Network error. Please try again.', 'red');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card shadow="sm" padding="lg" className="max-w-md mx-auto">
            <Title order={2} className="text-center mb-6">Register</Title>

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
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Register
                </Button>
                <Button
                    fullWidth
                    variant="outline"
                    color="blue"
                    radius="md"
                    size="md"
                    component={Link}
                    href="/auth/login"
                    className="mt-2"
                >
                    Already have an account? Log in.
                </Button>
            </form>
        </Card>
    );
}
