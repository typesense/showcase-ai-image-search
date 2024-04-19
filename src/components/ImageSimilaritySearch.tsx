'use client';
import { _documentSchema } from '@/types/typesenseResponse';
import Image from 'next/image';
import ImageSearch from './ImageSearch';
import { useEffect, useState } from 'react';
import Modal from './Modal';

/*
 * This component searchs for images using typesense document id
 */
export default function ImageSimilaritySearch({
  imageData,
}: {
  imageData: _documentSchema;
}) {
  const [modalData, setModalData] = useState<_documentSchema | null>(null);

  useEffect(() => {
    document.body.style.overflowY = modalData ? 'hidden' : 'auto';
  }, [modalData]);

  return (
    <>
      <h3 className=' m-auto my-6 w-max font-mono text-xs font-medium text-white-400'>
        Showing images similar to...
      </h3>

      <div
        className='group relative mb-12 h-[calc(18vh+12vmax)] w-full cursor-pointer'
        onClick={() => setModalData(imageData)}
      >
        <Image
          className='h-full w-full object-contain'
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? '/diffusiondb-20-images'}/${imageData.id}`}
          width={0}
          height={0}
          sizes='80vw'
          alt={imageData.prompt}
        />
        <div className='absolute inset-0 bg-dark-900 bg-opacity-0 transition group-hover:bg-opacity-40'></div>
      </div>

      <ImageSearch
        searchParameters={{
          q: '*',
          per_page: 25,
          vector_query: `embedding:([], id:${imageData.id})`,
          exclude_fields: ['embedding', 'out_of'], // reduce ~98.5% of bytes transferred over network
        }}
      />
      {modalData && (
        <Modal imageData={modalData} handleClose={() => setModalData(null)} />
      )}
    </>
  );
}
