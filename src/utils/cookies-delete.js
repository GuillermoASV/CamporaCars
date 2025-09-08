import { NextResponse } from 'next/server';
export const BORRARCOOKIE = () => {
  const response = NextResponse.next();
  response.cookies.set('seccion', '', { expires: new Date(0) });
  return response;
};

export const BORRARCOOKIEYREDIRECCIONAR = (request) => {
  const response = NextResponse.redirect(new URL('/login', request.url));
  response.cookies.set('seccion', '', { expires: new Date(0) });
  return response;
};
