import { DELETE } from '@/app/api/borrarTodo/route';
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
    deleteOne: jest.fn(),
  },
}));

jest.mock('@/mongoose/mongoose', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve(true)),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test de la ruta DELETE de borrarTODO', () => {
  it('Deberia de borrar una tarea', async () => {
    Todo.deleteOne.mockResolvedValue(ToDo);
    const mockReq = {
      json: () => Promise.resolve(ToDo),
    };

    await DELETE(mockReq);
    expect(Todo.deleteOne).toHaveBeenCalledTimes(1);
    expect(Todo.deleteOne).toHaveBeenCalledWith({ _id: ToDo.id });

    expect(NextResponse).toHaveBeenCalledTimes(1);
    expect(NextResponse).toHaveBeenCalledWith(
      JSON.stringify({
        message: 'TODO BORRADO CORRECTAMENTE',
      }),
      { status: 200 },
    );
  });
});
