import { POST, GET, PUT, DELETE } from '@/app/api/materiales/route';
import { Material } from '@/mongoose/todo-model';

const mockMaterial = {
  _id: '32af732a328ce843efe32cdf',
  materialYCosto: ['Macilla', 10, 5],
};

const mockMaterialesList = [
  { _id: '1', materialYCosto: ['Cemento', 15, 10] },
  { _id: '2', materialYCosto: ['Arena', 5, 20] },
];
jest.mock('next/server', () => ({
  NextResponse: jest.fn().mockImplementation((body, options) => {
    return {
      json: jest.fn().mockResolvedValue(JSON.parse(body)),
      status: options?.status || 200,
      body: body,
      options: options,
    };
  }),
}));
const { NextResponse } = require('next/server');
NextResponse.json = jest.fn().mockImplementation((data, options) => ({
  json: jest.fn().mockResolvedValue(data),
  status: options?.status || 200,
  data: data,
}));

jest.mock('@/mongoose/todo-model', () => ({
  Material: {
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

jest.mock('@/mongoose/mongoose', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(true),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('API de Materiales - Tests Unitarios', () => {
  describe('POST - Crear Material', () => {
    it('Debería crear un nuevo material correctamente', async () => {
      Material.create.mockResolvedValue(mockMaterial);
      const mockReq = {
        json: jest.fn().mockResolvedValue({
          material: 'Macilla',
          costo: '10',
          inventario: '5',
        }),
      };
      const response = await POST(mockReq);
      expect(mockReq.json).toHaveBeenCalledTimes(1);
      expect(Material.create).toHaveBeenCalledTimes(1);
      expect(Material.create).toHaveBeenCalledWith({
        materialYCosto: ['Macilla', 10, 5],
      });
      expect(NextResponse).toHaveBeenCalledWith(
        JSON.stringify({ message: 'Salio todo como se esperaba, nice!' }),
        { status: 200 },
      );
    });
    describe('GET - Obtener Materiales', () => {
      it('Debería obtener todos los materiales', async () => {
        Material.find.mockResolvedValue(mockMaterialesList);
        await GET();
        expect(Material.find).toHaveBeenCalledTimes(1);
        expect(NextResponse.json).toHaveBeenCalledWith(mockMaterialesList);
      });
    });
    describe('PUT - Actualizar Material', () => {
      it('Debería actualizar un material correctamente', async () => {
        const materialActualizado = {
          _id: '32af732a328ce843efe32cdf',
          materialYCosto: ['Macilla Premium', 15, 8],
        };

        Material.findByIdAndUpdate.mockResolvedValue(materialActualizado);
        const mockReq = {
          json: jest.fn().mockResolvedValue({
            id: '32af732a328ce843efe32cdf',
            material: 'Macilla Premium',
            costo: 15,
            inventario: 8,
          }),
        };
        await PUT(mockReq);

        expect(mockReq.json).toHaveBeenCalledTimes(1);
        expect(Material.findByIdAndUpdate).toHaveBeenCalledTimes(1);
        expect(Material.findByIdAndUpdate).toHaveBeenCalledWith(
          '32af732a328ce843efe32cdf',
          { materialYCosto: ['Macilla', 15, 8] },
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
        const mockReq = {
          json: jest.fn().mockResolvedValue({
            id: '',
            material: 'Macilla',
            costo: 15,
            inventario: 8,
          }),
        };
        await PUT(mockReq);
        expect(Material.findByIdAndUpdate).not.toHaveBeenCalled();
        expect(NextResponse).toHaveBeenCalledWith(
          JSON.stringify({
            message: 'Falta rellenar uno/s campos, Por favor, revisa los campos',
          }),
          { status: 400 },
        );
      });

      it('Debería manejar errores de base de datos', async () => {
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

        await PUT(mockReq);

        expect(NextResponse).toHaveBeenCalledWith(JSON.stringify({ error: mockError.message }), {
          status: 404,
        });
      });
    });

    describe('DELETE - Eliminar Material', () => {
      it('Debería eliminar un material', async () => {
        Material.findByIdAndDelete.mockResolvedValue(mockMaterial);

        const mockReq = {
          json: jest.fn().mockResolvedValue({
            id: '32af732a328ce843efe32cdf',
          }),
        };

        await DELETE(mockReq);
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
    });
  });
});
