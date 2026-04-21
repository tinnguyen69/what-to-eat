import { clsx } from 'clsx';

type TextInputProps = {
  label?: string;
  icon?: React.ElementType;
  errors?: string[];
} & React.InputHTMLAttributes<HTMLInputElement>;

export function TextInput({
  label,
  icon: Icon,
  errors,
  id,
  className,
  ...rest
}: TextInputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id={id}
            {...rest}
            className={clsx('app-input peer', className)}
            aria-describedby={`${id}-error`}
          />
          {Icon && (
            <Icon className="pointer-events-none absolute top-1/2 left-3 h-4.5 w-4.5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          )}
        </div>
      </div>
      <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
        {errors?.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>
    </div>
  );
}
