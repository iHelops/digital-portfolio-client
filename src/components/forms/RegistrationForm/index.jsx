import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import {
    emailValidation,
    passwordValidation,
    requiredValidation,
} from '../../../constants/validation.js';
import { useState } from 'react';
import { registrationApi } from '../../../api/users/registration.js';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await registrationApi(
                data.login,
                data.email,
                data.first_name,
                data.surname,
                data.password,
            );
            navigate('/login');
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap={10}>
                <TextInput
                    label="Логин"
                    error={errors.login?.message}
                    {...register('login', requiredValidation())}
                />

                <TextInput
                    label="Почта"
                    error={errors.email?.message}
                    {...register('email', emailValidation())}
                />

                <Flex gap={10}>
                    <TextInput
                        style={{ flex: 1 }}
                        label="Имя"
                        error={errors.first_name?.message}
                        {...register('first_name', requiredValidation())}
                    />

                    <TextInput
                        style={{ flex: 1 }}
                        label="Фамилия"
                        error={errors.surname?.message}
                        {...register('surname', requiredValidation())}
                    />
                </Flex>

                <PasswordInput
                    label="Пароль"
                    error={errors.password?.message}
                    {...register('password', passwordValidation())}
                />
            </Flex>

            <Button type="submit" loading={loading} color="blue" fullWidth mt="md" radius="md">
                Зарегистрироваться
            </Button>
        </form>
    );
};

export default RegistrationForm;