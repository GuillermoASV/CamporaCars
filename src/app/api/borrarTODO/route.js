import connectToDatabase from '@/mongoose/mongoose';
import { Todo } from '@/mongoose/todo-model';
import { NextResponse } from 'next/server';
import { DICCIONARIO } from '@/utils/diccionario/constantes';

export async function DELETE(req) {
  const data = await req.json();
  const { id } = data;
  try {
    await connectToDatabase();
    await Todo.deleteOne({ _id: id });
    return new NextResponse(JSON.stringify({ message: DICCIONARIO.OKAY }, { status: 200 }));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 404 });
  }
}
