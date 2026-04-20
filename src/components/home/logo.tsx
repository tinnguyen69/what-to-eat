import { HeartIcon } from '@heroicons/react/24/outline';
import { lusitana } from '../../ui/font';

export default function YumLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <HeartIcon className="h-12 w-12 rotate-15" />
      <p className="text-[38px]">Yummy</p>
    </div>
  );
}
