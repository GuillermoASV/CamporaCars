import connectToDatabase from '@/mongoose/mongoose';
import { Todo } from '@/mongoose/todo-model';
import { DICCIONARIO } from '@/utils/diccionario/constantes';
import { NextResponse } from 'next/server';

export async function PUT(req) {
  const data = await req.json();
  const { id } = data;

  try {
    await connectToDatabase();
    const actualizarTodo = await Todo.findOne({ _id: id }).withDeleted();
    actualizarTodo.completado = true;
    await actualizarTodo.save();
    return new NextResponse(
      JSON.stringify({ message: 'ToDo Completado', informacionActualizada: actualizarTodo }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }, { status: 404 }));
  }
}
