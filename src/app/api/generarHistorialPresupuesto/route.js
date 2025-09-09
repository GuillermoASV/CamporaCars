import connectToDatabase from '@/mongoose/mongoose';
import { Historial } from '@/mongoose/todo-model';
import { DICCIONARIO } from '@/utils/diccionario/constantes';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { datos, metodo } = await req.json();
  try {
    await connectToDatabase();
    const texto = `${
      metodo === 'gasto'
        ? 'Se registró un nuevo gasto en'
        : metodo === 'grafica-gasto'
          ? 'Se revisaron las estadísticas de gasto de'
          : metodo === 'monto'
            ? 'Se registró un nuevo presupuesto en'
            : metodo === 'Inventario'
              ? 'Se utilizo un material de inventario en'
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
