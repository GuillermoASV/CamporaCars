import connectToDatabase from '@/mongoose/mongoose';
import { Historial } from '@/mongoose/todo-model';
import { DICCIONARIO } from '@/utils/diccionario/constantes';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { datos, metodo } = await req.json();
  try {
    await connectToDatabase();
    const texto = `La tarea "${datos.titulo}" ha sido ${
      metodo === 'eliminar'
        ? 'eliminada'
        : metodo === 'crear'
          ? 'creada exitosamente'
          : metodo === 'editar'
            ? 'editada'
            : metodo === 'completar'
              ? 'marcada como completada'
              : metodo === 'archivar'
                ? 'archivada'
                : 'actualizada'
    }.`;
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
