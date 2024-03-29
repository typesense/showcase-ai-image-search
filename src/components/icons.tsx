import { ComponentPropsWithoutRef } from 'react';
type _svgProp = ComponentPropsWithoutRef<'svg'>;

export function ChevronRight({ ...svgProps }: _svgProp) {
  return (
    <svg
      stroke='currentColor'
      fill='none'
      stroke-width='2'
      viewBox='0 0 24 24'
      stroke-linecap='round'
      stroke-linejoin='round'
      height='1em'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
      {...svgProps}
    >
      <polyline points='9 18 15 12 9 6'></polyline>
    </svg>
  );
}
