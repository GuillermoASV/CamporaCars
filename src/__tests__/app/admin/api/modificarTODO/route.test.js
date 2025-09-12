import { PUT } from '@/app/api/modificarTodo/route';
import ToDo from './mock/ToDo.json';
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
    findByIdAndUpdate: jest.fn(),
  },
}));

jest.mock('@/mongoose/mongoose', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve(true)),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test de la ruta PUT de modificarTODO', () => {
  it('Deberia de actualizar la tarea', async () => {
    Todo.findByIdAndUpdate.mockResolvedValue(ToDo);
    const mockReq = {
      json: () => Promise.resolve(ToDo),
    };

    await PUT(mockReq);
    expect(Todo.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(
      ToDo.id,
      {
        nombre: ToDo.nombre,
        apellido: ToDo.apellido,
        descripcion: ToDo.descripcion,
        limiteFecha: ToDo.limiteFecha,
        importancia: ToDo.importancia,
        titulo: ToDo.titulo,
      },
      { new: true, runValidators: true },
    );

    expect(NextResponse).toHaveBeenCalledTimes(1);
    expect(NextResponse).toHaveBeenCalledWith(
      JSON.stringify({
        message: 'ToDo Actualizado',
        informacionActualizada: ToDo,
      }),
      { status: 200 },
    );
  });
});
