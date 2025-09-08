import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

const secret_key = new TextEncoder().encode('clave_secreta');

export async function GET(request) {
  try {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30m')
      .sign(secret_key);

    return NextResponse.json({ token: token }, { status: 200 });
  } catch (e) {
    console.log('Error al crear el token', e.message);
    return NextResponse.json({ error: 'Hubo un error al crear el token' }, { status: 500 });
  }
}
