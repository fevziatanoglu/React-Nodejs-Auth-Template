import { useForm } from 'react-hook-form';
import useStore from '../../store';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormValues, loginSchema } from '../../validations/authSchema';



export default function Login() {
    const { loginFetch } = useStore();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        await loginFetch(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label>Email</label>
                <input {...register('email')} className="border p-2 w-full" />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label>Password</label>
                <input type="password" {...register('password')} className="border p-2 w-full" />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Sign In
            </button>
        </form>
    );
}
