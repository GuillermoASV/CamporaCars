import { serialize } from 'cookie';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const secret_key = new TextEncoder().encode('clave_secreta');

export async function POST(params) {
  const data = await params.json();
  const { token } = data;

  const JWT = async () => {
    return await jwtVerify(token, secret_key);
  };

  const SECRET_PASS = () => {
    return token === 'clave_secreta';
  };

  if (!token)
    return NextResponse.json({ success: false, error: 'El token no esta' }, { status: 400 });

  //Verificar un token que sea una contraseña en especial y pasar a ser un cookie

  try {
    if (SECRET_PASS()) {
      console.log('SECRET PASS es valido en verificarToken');
      const realizarCookie = serialize('seccion', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 30, // 30 minutos
        path: '/',
      });
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Set-Cookie': realizarCookie },
      });
    } else if (await JWT()) {
      console.log('JWT es valido en verificarToken');
      const realizarCookie = serialize('seccion', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 30, // 30 minutos
        path: '/',
      });
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Set-Cookie': realizarCookie },
      });
    }
  } catch (error) {
    console.log('JWT verify womp womp | api/verificarToken/route.js -> ', error.message);

    return new NextResponse(
      JSON.stringify(
        { success: false, error: 'Hubo un error al hacer la verificacion' },
        { status: 401 },
      ),
    );
  }
}
