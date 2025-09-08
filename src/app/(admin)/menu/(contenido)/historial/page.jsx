import { getHistorial } from '@/utils/makeHistorial';

import MakeHistorial from './components/makeHistorial';
export default async function Page() {
  const historial = await getHistorial();

  return (
    <div>
      <div className="min-h-screen items-start justify-center bg-gradient-to-bl from-gray-100 to-red-50">
        <div className="mb-15 flex h-18 w-full items-center justify-center bg-gray-900">
          <h1 className="text-4xl text-white">Historial</h1>{' '}
        </div>
        <div className="w-full px-4">
          <div className="mb-32 flex flex-col items-center">
            <div className="">
              <MakeHistorial historial={historial} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
