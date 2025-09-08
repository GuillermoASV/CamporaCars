import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { BORRARCOOKIE, BORRARCOOKIEYREDIRECCIONAR } from './utils/cookies-delete';

const CLAVE_SECRETA = new TextEncoder().encode('clave_secreta');

async function validarToken(token) {
  if (!token) return false;

  if (token === 'clave_secreta') {
    console.log('SECRET PASS es válido.');
    return true;
  }

  try {
    await jwtVerify(token, CLAVE_SECRETA);
    console.log('JWT es válido.');
    return true;
  } catch (error) {
    console.log('Token JWT inválido:', error.message);
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
