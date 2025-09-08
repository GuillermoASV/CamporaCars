import { PUT } from '@/app/api/completarTODO/route';
import ToDo from './mock/ToDo.json';
import { Todo } from '@/mongoose/todo-model';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => ({
  NextResponse: jest.fn((body, init) => ({
    json: () => Promise.resolve(JSON.parse(body)),
    status: init ? init.status : 200,
  })),
}));

// CORRECCIÓN 1: Configuración del mock encadenado
// 1a. Crea una referencia a la función mock para la parte final de la cadena (.save)
const mockSave = jest.fn().mockResolvedValue(ToDo);

// 1b. Crea una referencia para la parte media de la cadena (.withDeleted)
const mockWithDeleted = jest.fn().mockResolvedValue({
  ...ToDo,
  save: mockSave,
});
jest.mock('@/mongoose/todo-model', () => ({
  Todo: {
    findOne: jest.fn(() => ({
      withDeleted: mockWithDeleted,
    })),
  },
}));
jest.mock('@/mongoose/mongoose', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve(true)),
}));
beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test de la ruta Api para completarTODO', () => {
  it('Deberia de encontrar una tarea, completarla y guardarla', async () => {
    const mockReq = {
      json: () => Promise.resolve({ id: ToDo.id }),
    };
    await PUT(mockReq);
    expect(Todo.findOne).toHaveBeenCalledTimes(1);

    expect(Todo.findOne).toHaveBeenCalledWith({ _id: ToDo.id });

    expect(NextResponse).toHaveBeenCalledTimes(1);
    expect(NextResponse).toHaveBeenCalledWith(
      JSON.stringify({
        message: 'ToDo Completado',
        informacionActualizada: ToDo,
      }),
      { status: 200 },
    );
  });
});
