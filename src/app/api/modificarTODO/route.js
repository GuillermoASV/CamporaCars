import connectToDatabase from '@/mongoose/mongoose';
import { Todo } from '@/mongoose/todo-model';
import { NextResponse } from 'next/server';

export async function PUT(req) {
  const data = await req.json();
  const { id, nombre, apellido, descripcion, limiteFecha, importancia, titulo } = data;
  if (!id || !nombre || !apellido || !descripcion || !limiteFecha || !importancia || !titulo) {
    return new NextResponse(JSON.stringify({ message: 'Hubo un error' }), { status: 400 });
  }

  try {
    await connectToDatabase();
    const actualizarTodo = await Todo.findByIdAndUpdate(
      id,
      {
        nombre,
        apellido,
        descripcion,
        limiteFecha,
        importancia,
        titulo,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return new NextResponse(
      JSON.stringify({ message: 'ToDo Actualizado', informacionActualizada: actualizarTodo }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 404 });
  }
}
