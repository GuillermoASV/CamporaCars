import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const expiredCookie = serialize('seccion', '', {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
    return new NextResponse(
      JSON.stringify({ success: true, message: 'Sesión cerrada exitosamente.' }),
      {
        status: 200,
        headers: { 'Set-Cookie': expiredCookie },
      },
    );
  } catch (error) {
    console.error('Error al intentar cerrar sesión en el servidor:', error);
    return new NextResponse(JSON.stringify({ success: false, error: 'Error al cerrar sesión.' }), {
      status: 500,
    });
  }
}
