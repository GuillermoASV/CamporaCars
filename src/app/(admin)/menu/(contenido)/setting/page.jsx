import Setting from './components/setting';

export default function Page() {
  return (
    <div className="to-white-50 min-h-screen items-start justify-center bg-gradient-to-bl from-gray-100">
      <div className="flex h-18 w-full items-center justify-center bg-gray-900">
        {' '}
        <h1 className="text-4xl text-white">Configuracion</h1>{' '}
      </div>
      <div className="bg-whit mx-auto mt-5 w-5/6 items-center justify-center">
        <Setting />
      </div>
    </div>
  );
}
