import React from 'react';
import { cn } from '@/lib/utils';

const InteractiveHoverButton = React.forwardRef(
  ({ text, className, variant = 'confirm', ...props }, ref) => {
    // Definimos los colores basados en la variante
    const colorClasses =
      variant === 'delete'
        ? 'border-orange-500 border-1 text-orange-500'
        : variant === 'Eliminar'
          ? 'border-red-500 border-1 text-red-500'
          : 'border-green-500 border-1 text-green-500';

    const bgColorClasses =
      variant === 'delete'
        ? 'bg-orange-500'
        : variant === 'Eliminar'
          ? 'bg-red-500'
          : 'bg-green-500';

    // Asignamos el texto por defecto si no se pasa
    const buttonText =
      text ||
      (variant === 'delete' ? 'Archivar' : variant === 'Eliminar' ? 'Eliminar' : 'Confirmar');

    return (
      <button
        ref={ref}
        className={cn(
          'group bg-background relative h-9 cursor-pointer overflow-hidden rounded-md p-2 px-4 py-2 text-center text-sm font-semibold',
          colorClasses,
          className,
        )}
        {...props}
      >
        <span className="inline-block transition-all duration-300 group-hover:translate-x-full group-hover:opacity-0">
          {buttonText}
        </span>
        <div className="absolute top-0 right-0 left-0 z-20 flex h-full w-full translate-x-full items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <span>{buttonText}</span>
        </div>
        <div
          className={cn(
            'absolute -top-0 -left-20 h-full w-1/2 scale-150 rounded-full transition-all duration-500 group-hover:left-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.8]',
            bgColorClasses,
          )}
        ></div>
      </button>
    );
  },
);

InteractiveHoverButton.displayName = 'InteractiveHoverButton';

export { InteractiveHoverButton };
