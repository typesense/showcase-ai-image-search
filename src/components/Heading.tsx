export default function Heading() {
  return (
    <div>
      <h1 className='m-auto w-max text-4xl font-medium'>
        Text to Image and Similarity Search
      </h1>
      <h2 className='m-auto mb-5 w-max text-base'>
        powered by{' '}
        <a
          href='https://typesense.org/'
          target='_blank'
          rel='noopener noreferrer'
          className=' text-accent'
        >
          type<b>sense|</b>
        </a>
      </h2>
    </div>
  );
}
