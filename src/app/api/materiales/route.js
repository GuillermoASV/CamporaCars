import connectToDatabase from '@/mongoose/mongoose';
import { Material } from '@/mongoose/todo-model';
import { NextResponse } from 'next/server';
import { DICCIONARIO } from '@/utils/diccionario/constantes';

export async function POST(req) {
  const data = await req.json();
  const { material, costo, inventario } = data;
  await connectToDatabase();
  const materialList = await Material.create({
    materialYCosto: [material, Number(costo), Number(inventario)],
  });
  try {
    return new NextResponse(JSON.stringify({ message: DICCIONARIO.OKAY }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 404 });
  }
}

export async function GET() {
  await connectToDatabase();
  const materialList = await Material.find();
  return NextResponse.json(materialList);
}

export async function PUT(req) {
  const data = await req.json();
  const { id, material, costo, inventario } = data;

  try {
    await connectToDatabase();
    const actualizarMaterialList = await Material.findByIdAndUpdate(
      id,
      {
        materialYCosto: [material, costo, inventario],
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return new NextResponse(
      JSON.stringify({
        message: 'Lista de materiales Actualizada',
        informacionActualizada: actualizarMaterialList,
      }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 404 });
  }
}

export async function DELETE(req) {
  const data = await req.json();
  const { id } = data;
  try {
    await connectToDatabase();
    const borrarMaterialList = await Material.findByIdAndDelete(id);
    return new NextResponse(
      JSON.stringify({
        message: 'Lista de materiales Actualizada',
        informacionActualizada: borrarMaterialList,
      }),
      { status: 200 },
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 404 });
  }
}
