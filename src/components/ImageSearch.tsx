"use client";
import useImageSearch from "@/hooks/useImageSearch";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Masonry } from "react-plock";
import Modal from "./Modal";
import { useImageSearchParams } from "@/types/useImageSearch";

export default function ImageSearch({
  searchParameters,
}: {
  searchParameters: useImageSearchParams;
}) {
  const { hits, nextPage } = useImageSearch(searchParameters);
  const { ref, inView } = useInView({ threshold: 0.001 });
  const [activeHit, setActiveHit] = useState(null);
  useEffect(() => {
    if (inView) nextPage();
  }, [inView]);

  return (
    <>
      <section className="w-full overflow-hidden rounded-xl">
        <Masonry
          className="min-h-screen"
          items={hits}
          config={{
            columns: [2, 4, 6],
            gap: [6, 6, 6],
            media: [640, 768, 1024],
          }}
          render={({ document }: any) => (
            <li
              className="relative cursor-pointer list-none overflow-hidden rounded-sm"
              onClick={() => setActiveHit(document)}
              key={document.id}
            >
              <Image
                src={`/part-1-2-2m/${document.id}`}
                width={0}
                height={0}
                sizes="20vw"
                style={{ width: "100%", height: "auto" }}
                alt={document.prompt}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-1 py-2">
                <span className="line-clamp-3 text-xs">{document.prompt}</span>
              </div>
            </li>
          )}
        />
        <div ref={ref} className="mt-[-120vh] h-[10vh]"></div>
      </section>

      {activeHit && (
        <Modal data={activeHit} handleClose={() => setActiveHit(null)} />
      )}
    </>
  );
}
