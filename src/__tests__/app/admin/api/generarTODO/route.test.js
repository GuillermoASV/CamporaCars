import { POST } from '@/app/api/generarTodo/route';
import generarTODO from './mock/generarTODO.json';
import { Todo } from '@/mongoose/todo-model';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => ({
  NextResponse: jest.fn((body) => ({
    json: () => Promise.resolve(JSON.parse(body)),
    status: 200,
  })),
}));

jest.mock('@/mongoose/todo-model', () => ({
  Todo: {
    create: jest.fn(),
  },
}));

jest.mock('@/mongoose/mongoose', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve(true)),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test de la ruta POST de generarTODO', () => {
  it('Deberia de generar una tarea', async () => {
    Todo.create.mockResolvedValue(generarTODO);
    const mockReq = {
      json: () => Promise.resolve(generarTODO),
    };

    await POST(mockReq);
    expect(Todo.create).toHaveBeenCalledTimes(1);
    expect(Todo.create).toHaveBeenCalledWith({
      nombre: generarTODO.nombre,
      apellido: generarTODO.apellido,
      descripcion: generarTODO.descripcion,
      fecha: generarTODO.fecha,
      limiteFecha: generarTODO.limiteFecha,
      importancia: generarTODO.importancia,
      titulo: generarTODO.titulo,
    });

    expect(NextResponse).toHaveBeenCalledTimes(1);
    expect(NextResponse).toHaveBeenCalledWith(
      JSON.stringify({
        message: 'Salio todo como se esperaba, nice!',
      }),
      { status: 200 },
    );
  });
});
