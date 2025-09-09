import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { BORRARCOOKIE, BORRARCOOKIEYREDIRECCIONAR } from './utils/cookies-delete';

const CLAVE_SECRETA = new TextEncoder().encode(process.env.CLAVE_SECRETA);

async function validarToken(token) {
  if (!token) return false;

  if (token === process.env.CLAVE_SECRETA) {
    return true;
  }

  try {
    await jwtVerify(token, CLAVE_SECRETA);
    return true;
  } catch (error) {
    return false;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('seccion')?.value;

  const esTokenValido = await validarToken(token);

  if (pathname.startsWith('/login')) {
    if (esTokenValido) {
      return NextResponse.redirect(new URL('/menu', request.url));
    }

    return BORRARCOOKIE();
  }

  if (!esTokenValido) {
    return BORRARCOOKIEYREDIRECCIONAR(request);
  }
}

export const config = {
  matcher: ['/', '/login', '/menu/:path*'],
};
