import connectToDatabase from '@/mongoose/mongoose';
import { Todo } from '@/mongoose/todo-model';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filtro = searchParams.get('filtro');

  await connectToDatabase();

  let todos;

  if (filtro === 'completados') {
    todos = await Todo.find({ completado: true }).sort({ createdAt: -1 });
  } else if (filtro === 'archivados') {
    todos = await Todo.find({ completado: false, deleted: true })
      .withDeleted()
      .sort({ createdAt: -1 });
  } else if (filtro === 'all') {
    todos = await Todo.find({ completado: false }).sort({ createdAt: -1 });
  } else {
    todos = await Todo.find({ importancia: filtro, completado: false }).sort({ createdAt: -1 });
  }

  return NextResponse.json(todos);
}
