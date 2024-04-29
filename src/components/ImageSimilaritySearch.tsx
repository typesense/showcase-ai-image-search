'use client';
import { _documentSchema } from '@/types/typesenseResponse';
import Image from 'next/image';
import ImageSearch from './ImageSearch';
import { useEffect, useState } from 'react';
import Modal from './Modal';

/*
 * This component searches for images using typesense document id
 */
export default function ImageSimilaritySearch({
  imageData,
}: {
  imageData: _documentSchema;
}) {
  const [modalData, setModalData] = useState<_documentSchema | null>(null);

  // prevent scrolling when showing the modal
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
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? 'https://ai-image-search-images.typesense.org'}/${imageData.image_name}`}
          width={0}
          height={0}
          sizes='80vw'
          alt={imageData.prompt}
          unoptimized
        />
        <div className='pointer-events-none absolute inset-0 flex items-end justify-center bg-dark-900 bg-opacity-40 opacity-0 transition group-hover:opacity-100'>
          <div className='mb-4 font-mono text-xs font-medium'>View more</div>
        </div>
      </div>

      <ImageSearch
        searchParameters={{
          q: '*',
          per_page: 25,
          vector_query: `embedding:([], id:${imageData.id}, distance_threshold: 0.8, k: 100)`,
          exclude_fields: ['embedding', 'out_of'], // reduce ~98.5% of bytes transferred over network
        }}
      />
      {modalData && (
        <Modal imageData={modalData} handleClose={() => setModalData(null)} />
      )}
    </>
  );
}
