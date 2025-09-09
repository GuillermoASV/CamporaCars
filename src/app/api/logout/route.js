import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import { DICCIONARIO } from '@/utils/diccionario/constantes';

export async function POST() {
  try {
    const expiredCookie = serialize('seccion', '', {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });
    return new NextResponse(JSON.stringify({ success: true, message: DICCIONARIO.LOGOUT }), {
      status: 200,
      headers: { 'Set-Cookie': expiredCookie },
    });
  } catch (error) {
    console.error(DICCIONARIO.ERROR_GLOBAL, error.message);
    return new NextResponse(JSON.stringify({ success: false, error: DICCIONARIO.ERROR_GLOBAL }), {
      status: 500,
    });
  }
}
