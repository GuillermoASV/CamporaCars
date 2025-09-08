import connectToDatabase from '@/mongoose/mongoose';
import { Todo } from '@/mongoose/todo-model';
import { NextResponse } from 'next/server';
//TODO ESTO ES SOLO POR AHORA RECUERDA QUE HAY QUE AGREGAR SOFT DELETE

const DICCIONARIO = Object.freeze({
  ERROR: 'Falta rellenar uno/s campos para generar el TODO, Por favor, revisa los campos',
  OKAY: 'Salio todo como se esperaba, nice!',
});

export async function DELETE(req) {
  const data = await req.json();
  const { id } = data;
  if (!id) {
    return new NextResponse(JSON.stringify({ message: DICCIONARIO.ERROR }), { status: 400 });
  }

  try {
    await connectToDatabase();
    await Todo.deleteOne({ _id: id });
    return new NextResponse(JSON.stringify({ message: 'TODO BORRADO CORRECTAMENTE' }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 404 });
  }
}
