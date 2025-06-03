import { loginSchema } from '../schemas/loginSchema.ts';
import { AuthService } from '../services/AuthService.ts';

const authService = new AuthService();

export async function loginHandler(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const parsed = loginSchema.parse(body);

    const token = await authService.login(parsed.email, parsed.password);

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        message: error.message || 'Error al procesar la petición',
      }),
      { status: 401 }
    );
  }
}
