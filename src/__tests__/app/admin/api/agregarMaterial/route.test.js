import { PUT } from '@/app/api/gastosTodo/route';
import agregarGasto from './mock/agregarGasto.json';
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

describe('Test de la ruta PUT de gastosTODO', () => {
  it('Deberia de actualizar la tarea y agregar nuevos materiales', async () => {
    Todo.findByIdAndUpdate.mockResolvedValue(agregarGasto);
    const mockReq = {
      json: () => Promise.resolve(agregarGasto),
    };

    await PUT(mockReq);
    expect(Todo.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(
      agregarGasto.id,
      {
        $push: {
          gastos: [agregarGasto.gastos],
          materiales: [agregarGasto.materiales],
          cantidades: [agregarGasto.cantidades],
        },
      },
      { new: true, runValidators: true },
    );

    expect(NextResponse).toHaveBeenCalledTimes(1);
    expect(NextResponse).toHaveBeenCalledWith(
      JSON.stringify({
        message: 'ToDo Actualizado',
        informacionActualizada: agregarGasto,
      }),
      { status: 200 },
    );
  });
});
