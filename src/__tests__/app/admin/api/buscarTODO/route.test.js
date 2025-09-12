import { GET } from '@/app/api/buscarTodo/route';
import mockTodos from './mock/Todos.json';
import { Todo } from '@/mongoose/todo-model';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data) => ({
      status: 200,
      json: () => Promise.resolve(data),
    })),
  },
}));

const mockSort = jest.fn().mockResolvedValue(mockTodos);
const mockWithDeleted = jest.fn(() => ({ sort: mockSort }));

jest.mock('@/mongoose/todo-model', () => ({
  Todo: {
    find: jest.fn(() => ({
      withDeleted: mockWithDeleted,
      sort: mockSort,
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

describe('Test de la ruta GET de todos', () => {
  it("Debería retornar todos completados cuando el filtro es 'completados'", async () => {
    const mockRequest = {
      url: 'http://localhost/api/todos?filtro=completados',
    };
    await GET(mockRequest);
    expect(Todo.find).toHaveBeenCalledTimes(1);
    expect(Todo.find).toHaveBeenCalledWith({ completado: true });
    expect(NextResponse.json).toHaveBeenCalledWith(mockTodos);
  });
  it("Debería retornar todos archivados cuando el filtro es 'archivados'", async () => {
    const mockRequest = {
      url: 'http://localhost/api/todos?filtro=archivados',
    };
    await GET(mockRequest);
    expect(Todo.find).toHaveBeenCalledTimes(1);
    expect(Todo.find).toHaveBeenCalledWith({ completado: false, deleted: true });
    expect(mockWithDeleted).toHaveBeenCalledTimes(1);
    expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(NextResponse.json).toHaveBeenCalledWith(mockTodos);
  });

  it("Debería retornar todos los no completados cuando el filtro es 'all'", async () => {
    const mockRequest = {
      url: 'http://localhost/api/todos?filtro=all',
    };
    await GET(mockRequest);
    expect(Todo.find).toHaveBeenCalledTimes(1);
    expect(Todo.find).toHaveBeenCalledWith({ completado: false });
    expect(mockWithDeleted).not.toHaveBeenCalled();
    expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(NextResponse.json).toHaveBeenCalledWith(mockTodos);
  });

  it('Debería retornar todos con una importancia específica cuando el filtro es de importancia', async () => {
    const mockRequest = {
      url: 'http://localhost/api/todos?filtro=alta',
    };
    await GET(mockRequest);
    expect(Todo.find).toHaveBeenCalledTimes(1);
    expect(Todo.find).toHaveBeenCalledWith({ importancia: 'alta', completado: false });
    expect(mockWithDeleted).not.toHaveBeenCalled();
    expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(NextResponse.json).toHaveBeenCalledWith(mockTodos);
  });
});
