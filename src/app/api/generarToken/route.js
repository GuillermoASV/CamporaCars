import { DICCIONARIO } from '@/utils/diccionario/constantes';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

const secret_key = new TextEncoder().encode(process.env.CLAVE_SECRETA);

export async function GET(request) {
  try {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30m')
      .sign(secret_key);

    return NextResponse.json({ token: token }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: DICCIONARIO.ERROR_GLOBAL }, { status: 500 });
  }
}
