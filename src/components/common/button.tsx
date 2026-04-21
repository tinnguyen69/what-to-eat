import { clsx } from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={clsx('app-button-primary cursor-pointer', className)}
    >
      {children}
    </button>
  );
}
