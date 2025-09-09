import { serialize } from 'cookie';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { DICCIONARIO } from '@/utils/diccionario/constantes';
const secret_key = new TextEncoder().encode(process.env.CLAVE_SECRETA);
const MINUTOS = 60 * 30;

export async function POST(params) {
  const data = await params.json();
  const { token } = data;

  const JWT = async () => {
    return await jwtVerify(token, secret_key);
  };

  const SECRET_PASS = () => {
    return token === process.env.CLAVE_SECRETA;
  };

  if (!token)
    return NextResponse.json({ success: false, error: DICCIONARIO.INPUT_VACIO }, { status: 400 });
  try {
    if (SECRET_PASS()) {
      const realizarCookie = serialize('seccion', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: MINUTOS, // 30 minutos
        path: '/',
      });
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Set-Cookie': realizarCookie },
      });
    } else if (await JWT()) {
      const realizarCookie = serialize('seccion', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: MINUTOS, // 30 minutos
        path: '/',
      });
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Set-Cookie': realizarCookie },
      });
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, error: DICCIONARIO.ERROR_GLOBAL }, { status: 401 }),
    );
  }
}
