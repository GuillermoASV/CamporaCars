import { GET } from '@/app/api/buscarTODO/route'; // Asegúrate de que la ruta sea correcta
import mockTodos from './mock/Todos.json';
import { Todo } from '@/mongoose/todo-model';
import { NextResponse } from 'next/server';

// --- MOCKS ---

// Mock de 'next/server'
jest.mock('next/server', () => ({
  // Mockeamos el método estático .json de NextResponse
  NextResponse: {
    json: jest.fn((data) => ({
      // Simula la estructura de una respuesta para que no dé error
      status: 200,
      json: () => Promise.resolve(data),
    })),
  },
}));

// Mock encadenado para el modelo de Mongoose
// Creamos referencias a cada eslabón de la cadena para poder hacer aserciones sobre ellos
const mockSort = jest.fn().mockResolvedValue(mockTodos);
const mockWithDeleted = jest.fn(() => ({ sort: mockSort }));

jest.mock('@/mongoose/todo-model', () => ({
  Todo: {
    // find devolverá un objeto que contiene los siguientes métodos de la cadena
    find: jest.fn(() => ({
      withDeleted: mockWithDeleted,
      sort: mockSort,
    })),
  },
}));

// Mock de la conexión a la base de datos
jest.mock('@/mongoose/mongoose', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve(true)),
}));

// --- CONFIGURACIÓN DE LA PRUEBA ---

beforeEach(() => {
  // Limpia el historial de todas las llamadas a los mocks antes de cada test
  jest.clearAllMocks();
});

describe('Test de la ruta GET de todos', () => {
  // Test para el filtro 'completados'
  it("Debería retornar todos completados cuando el filtro es 'completados'", async () => {
    // Arrange: Simula una petición con el parámetro de búsqueda
    const mockRequest = {
      url: 'http://localhost/api/todos?filtro=completados',
    };

    // Act: Ejecuta la función de la API
    await GET(mockRequest);

    // Assert: Verifica que se llamó a 'find' con la condición correcta
    expect(Todo.find).toHaveBeenCalledTimes(1);
    expect(Todo.find).toHaveBeenCalledWith({ completado: true });
    // Verifica que se llamó a 'sort'
    expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    // Verifica que la respuesta final contiene los datos del mock
    expect(NextResponse.json).toHaveBeenCalledWith(mockTodos);
  });

  // Test para el filtro 'archivados'
  it("Debería retornar todos archivados cuando el filtro es 'archivados'", async () => {
    // Arrange
    const mockRequest = {
      url: 'http://localhost/api/todos?filtro=archivados',
    };

    // Act
    await GET(mockRequest);

    // Assert
    expect(Todo.find).toHaveBeenCalledTimes(1);
    expect(Todo.find).toHaveBeenCalledWith({ completado: false, deleted: true });
    // ¡Importante! Verifica que la parte 'withDeleted' de la cadena fue llamada
    expect(mockWithDeleted).toHaveBeenCalledTimes(1);
    expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(NextResponse.json).toHaveBeenCalledWith(mockTodos);
  });

  // Test para el filtro 'all'
  it("Debería retornar todos los no completados cuando el filtro es 'all'", async () => {
    // Arrange
    const mockRequest = {
      url: 'http://localhost/api/todos?filtro=all',
    };

    // Act
    await GET(mockRequest);

    // Assert
    expect(Todo.find).toHaveBeenCalledTimes(1);
    expect(Todo.find).toHaveBeenCalledWith({ completado: false });
    // Verifica que 'withDeleted' NO fue llamado en esta ruta
    expect(mockWithDeleted).not.toHaveBeenCalled();
    expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(NextResponse.json).toHaveBeenCalledWith(mockTodos);
  });

  // Test para un filtro de importancia (la rama 'else')
  it('Debería retornar todos con una importancia específica cuando el filtro es de importancia', async () => {
    // Arrange
    const mockRequest = {
      url: 'http://localhost/api/todos?filtro=alta',
    };

    // Act
    await GET(mockRequest);

    // Assert
    expect(Todo.find).toHaveBeenCalledTimes(1);
    expect(Todo.find).toHaveBeenCalledWith({ importancia: 'alta', completado: false });
    expect(mockWithDeleted).not.toHaveBeenCalled();
    expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(NextResponse.json).toHaveBeenCalledWith(mockTodos);
  });
});
