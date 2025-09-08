import connectToDatabase from '@/mongoose/mongoose';
import { Historial } from '@/mongoose/todo-model';

import { NextResponse } from 'next/server';

const DICCIONARIO = Object.freeze({
  ERROR: 'Falta rellenar uno/s campos para generar el TODO, Por favor, revisa los campos',
  OKAY: 'Salio todo como se esperaba, nice!',
});

export async function POST(req) {
  const { datos, metodo } = await req.json();
  if (!metodo || !datos) {
    return new NextResponse(JSON.stringify({ message: DICCIONARIO.ERROR }), { status: 400 });
  }

  try {
    await connectToDatabase();
    const texto = `${
      metodo === 'gasto'
        ? 'Se registró un nuevo gasto en'
        : metodo === 'grafica-gasto'
          ? 'Se revisaron las estadísticas de gasto de'
          : metodo === 'monto'
            ? 'Se registró un nuevo presupuesto en'
            : metodo
    } "${datos.titulo}".`;

    await Historial.create({
      accion: texto,
      titulo: datos.titulo,
      nombre: datos.nombre,
      apellido: datos.apellido,
      descripcion: datos.descripcion,
      importancia: datos.importancia,
      fecha: datos.fecha,
      limiteFecha: datos.limiteFecha,
    });
    return NextResponse.json({ message: DICCIONARIO.OKAY }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const historial = await Historial.find().sort({ _id: -1 });
    return NextResponse.json(historial, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
