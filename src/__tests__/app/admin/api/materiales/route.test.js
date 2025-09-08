// __tests__/app/api/modificarTODO/route.test.js

// Importar funciones desde la ruta correcta de tu API
import { POST, GET, PUT, DELETE } from '@/app/api/materiales/route';
import { Material } from '@/mongoose/todo-model';

// Mock datos de prueba
const mockMaterial = {
  _id: '32af732a328ce843efe32cdf',
  materialYCosto: ['Macilla', 10, 5],
};

const mockMaterialesList = [
  { _id: '1', materialYCosto: ['Cemento', 15, 10] },
  { _id: '2', materialYCosto: ['Arena', 5, 20] },
];

// Mock correcto de NextResponse como constructor
jest.mock('next/server', () => ({
  NextResponse: jest.fn().mockImplementation((body, options) => {
    // Simular el constructor de NextResponse
    return {
      json: jest.fn().mockResolvedValue(JSON.parse(body)),
      status: options?.status || 200,
      body: body,
      options: options,
    };
  }),
}));

// También crear un mock global para cuando se use como función estática
const { NextResponse } = require('next/server');
NextResponse.json = jest.fn().mockImplementation((data, options) => ({
  json: jest.fn().mockResolvedValue(data),
  status: options?.status || 200,
  data: data,
}));

// Mock del modelo Material
jest.mock('@/mongoose/todo-model', () => ({
  Material: {
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

// Mock de connectToDatabase
jest.mock('@/mongoose/mongoose', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(true),
}));

// Limpiar mocks antes de cada test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('API de Materiales - Tests Unitarios', () => {
  // ==================== TESTS PARA POST ====================
  describe('POST - Crear Material', () => {
    it('Debería crear un nuevo material correctamente', async () => {
      // Setup: Configurar mocks
      Material.create.mockResolvedValue(mockMaterial);

      // Arrange: Preparar datos del request
      const mockReq = {
        json: jest.fn().mockResolvedValue({
          material: 'Macilla',
          costo: '10',
          inventario: '5',
        }),
      };

      // Act: Ejecutar la función POST
      const response = await POST(mockReq);

      // Assert: Verificar comportamiento esperado
      expect(mockReq.json).toHaveBeenCalledTimes(1);
      expect(Material.create).toHaveBeenCalledTimes(1);
      expect(Material.create).toHaveBeenCalledWith({
        materialYCosto: ['Macilla', 10, 5],
      });

      // Verificar que NextResponse fue llamado correctamente
      expect(NextResponse).toHaveBeenCalledWith(
        JSON.stringify({ message: 'Salio todo como se esperaba, nice!' }),
        { status: 200 },
      );
    });

    // =================== TESTS PARA GET ====================
    describe('GET - Obtener Materiales', () => {
      it('Debería obtener todos los materiales', async () => {
        // Setup
        Material.find.mockResolvedValue(mockMaterialesList);

        // Act
        await GET();

        // Assert
        expect(Material.find).toHaveBeenCalledTimes(1);
        expect(NextResponse.json).toHaveBeenCalledWith(mockMaterialesList);
      });
    });

    // ==================== TESTS PARA PUT ====================
    describe('PUT - Actualizar Material', () => {
      it('Debería actualizar un material correctamente', async () => {
        // Setup
        const materialActualizado = {
          _id: '32af732a328ce843efe32cdf',
          materialYCosto: ['Macilla Premium', 15, 8],
        };

        Material.findByIdAndUpdate.mockResolvedValue(materialActualizado);

        // Arrange: Request con todos los campos requeridos
        const mockReq = {
          json: jest.fn().mockResolvedValue({
            id: '32af732a328ce843efe32cdf',
            material: 'Macilla Premium',
            costo: 15,
            inventario: 8,
          }),
        };

        // Act
        await PUT(mockReq);

        // Assert
        expect(mockReq.json).toHaveBeenCalledTimes(1);
        expect(Material.findByIdAndUpdate).toHaveBeenCalledTimes(1);
        expect(Material.findByIdAndUpdate).toHaveBeenCalledWith(
          '32af732a328ce843efe32cdf',
          { materialYCosto: ['Macilla Premium', 15, 8] },
          { new: true, runValidators: true },
        );

        expect(NextResponse).toHaveBeenCalledWith(
          JSON.stringify({
            message: 'Lista de materiales Actualizada',
            informacionActualizada: materialActualizado,
          }),
          { status: 200 },
        );
      });

      it('Debería devolver error 400 cuando faltan campos', async () => {
        // Arrange: Request con campos faltantes
        const mockReq = {
          json: jest.fn().mockResolvedValue({
            id: '', // Campo vacío para triggear validación
            material: 'Macilla',
            costo: 15,
            inventario: 8,
          }),
        };

        // Act
        await PUT(mockReq);

        // Assert: Verificar que no se llama a la base de datos
        expect(Material.findByIdAndUpdate).not.toHaveBeenCalled();

        // Verificar respuesta de error
        expect(NextResponse).toHaveBeenCalledWith(
          JSON.stringify({
            message: 'Falta rellenar uno/s campos, Por favor, revisa los campos',
          }),
          { status: 400 },
        );
      });

      it('Debería manejar errores de base de datos', async () => {
        // Setup: Simular error de BD
        const mockError = new Error('Database update failed');
        Material.findByIdAndUpdate.mockRejectedValue(mockError);

        const mockReq = {
          json: jest.fn().mockResolvedValue({
            id: '32af732a328ce843efe32cdf',
            material: 'Macilla',
            costo: 15,
            inventario: 8,
          }),
        };

        // Act
        await PUT(mockReq);

        // Assert
        expect(NextResponse).toHaveBeenCalledWith(JSON.stringify({ error: mockError.message }), {
          status: 404,
        });
      });
    });

    // ==================== TESTS PARA DELETE ====================
    describe('DELETE - Eliminar Material', () => {
      it('Debería eliminar un material correctamente', async () => {
        // Setup
        Material.findByIdAndDelete.mockResolvedValue(mockMaterial);

        const mockReq = {
          json: jest.fn().mockResolvedValue({
            id: '32af732a328ce843efe32cdf',
          }),
        };

        // Act
        await DELETE(mockReq);

        // Assert
        expect(Material.findByIdAndDelete).toHaveBeenCalledTimes(1);
        expect(Material.findByIdAndDelete).toHaveBeenCalledWith('32af732a328ce843efe32cdf');

        expect(NextResponse).toHaveBeenCalledWith(
          JSON.stringify({
            message: 'Lista de materiales Actualizada',
            informacionActualizada: mockMaterial,
          }),
          { status: 200 },
        );
      });

      it('Debería devolver error 400 cuando falta ID', async () => {
        const mockReq = {
          json: jest.fn().mockResolvedValue({
            id: '', // ID vacío
          }),
        };

        await DELETE(mockReq);

        // Verificar que no se llama a la base de datos
        expect(Material.findByIdAndDelete).not.toHaveBeenCalled();

        // Verificar respuesta de error
        expect(NextResponse).toHaveBeenCalledWith(
          JSON.stringify({
            message: 'Falta rellenar uno/s campos, Por favor, revisa los campos',
          }),
          { status: 400 },
        );
      });

      it('Debería manejar errores de eliminación', async () => {
        const mockError = new Error('Delete failed');
        Material.findByIdAndDelete.mockRejectedValue(mockError);

        const mockReq = {
          json: jest.fn().mockResolvedValue({
            id: '32af732a328ce843efe32cdf',
          }),
        };

        await DELETE(mockReq);

        expect(NextResponse).toHaveBeenCalledWith(JSON.stringify({ error: mockError.message }), {
          status: 404,
        });
      });
    });
  });
});
