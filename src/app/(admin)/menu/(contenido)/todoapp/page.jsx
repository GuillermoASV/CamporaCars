import { Suspense } from 'react';
import Todo from './components/todo';
export default function Page() {
  return (
    <Suspense fallback={<div className="h-full bg-gradient-to-bl from-gray-100 to-red-50"></div>}>
      <Todo />
    </Suspense>
  );
}
