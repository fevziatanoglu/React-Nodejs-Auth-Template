import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useStore from '../../store';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object({
    email: z.string().email('Geçerli bir e-posta giriniz'),
    username: z.string().min(3, 'Kullanıcı adı en az 3 karakter olmalıdır'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
    const { registerFetch } = useStore();

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        await registerFetch(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label>Email</label>
                <input {...register('email')} className="border p-2 w-full" />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label>Username</label>
                <input {...register('username')} className="border p-2 w-full" />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>


            <div>
                <label>Şifre</label>
                <input type="password" {...register('password')} className="border p-2 w-full" />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Kayıt Ol
            </button>
        </form>
    );
}
