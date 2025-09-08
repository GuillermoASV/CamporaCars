import connectToDatabase from '@/mongoose/mongoose';
import { Todo } from '@/mongoose/todo-model';
import { NextResponse } from 'next/server';

const DICCIONARIO = Object.freeze({
  ERROR: 'Falta rellenar uno/s campos para generar el TODO, Por favor, revisa los campos',
  OKAY: 'Salio todo como se esperaba, nice!',
});

export async function POST(req) {
  const data = await req.json();
  const { nombre, apellido, descripcion, fecha, limiteFecha, importancia, titulo } = data;
  if (!nombre || !apellido || !descripcion || !fecha || !limiteFecha || !importancia || !titulo) {
    return new NextResponse(JSON.stringify({ message: DICCIONARIO.ERROR }), { status: 400 });
  }
  await connectToDatabase();
  const todo = await Todo.create({
    nombre,
    apellido,
    descripcion,
    fecha,
    limiteFecha,
    importancia,
    titulo,
  });
  try {
    return new NextResponse(JSON.stringify({ message: DICCIONARIO.OKAY }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 404 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filtro = searchParams.get('filtro');

  await connectToDatabase();

  let todos;

  if (filtro === 'completados') {
    todos = await Todo.find({ completado: true }).withDeleted().sort({ createdAt: -1 });
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
