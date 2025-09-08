import connectToDatabase from '@/mongoose/mongoose';
import { Todo } from '@/mongoose/todo-model';
import { NextResponse } from 'next/server';

export async function PUT(req) {
  const data = await req.json();
  const { id, gastos, materiales, cantidades } = data;
  try {
    await connectToDatabase();
    const informacionActualizada = await Todo.findByIdAndUpdate(
      id,
      {
        $push: {
          gastos: [gastos],
          materiales: [materiales],
          cantidades: [cantidades],
        },
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
    return new NextResponse(JSON.stringify({ error: error.message }, { status: 404 }));
  }
}
