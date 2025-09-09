import connectToDatabase from '@/mongoose/mongoose';
import { Todo } from '@/mongoose/todo-model';
import { DICCIONARIO } from '@/utils/diccionario/constantes';
import { NextResponse } from 'next/server';

export async function PUT(req) {
  const data = await req.json();
  const { id, presupuesto } = data;

  try {
    await connectToDatabase();
    const informacionActualizada = await Todo.findByIdAndUpdate(
      id,
      {
        presupuesto,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return new NextResponse(
      JSON.stringify({
        message: 'ToDo Actualizado',
        informacionActualizada: informacionActualizada,
      }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 404 });
  }
}
