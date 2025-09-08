export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="-mt-[6.25rem] text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-800">
          <span className="text-red-700">404</span> - Page Not Found
        </h1>
        <p className="text-gray-600">Estas buscando en una pagina muy equivocada mi pana.</p>
      </div>
    </div>
  );
}
