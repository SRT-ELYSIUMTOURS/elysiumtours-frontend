import React from "react";
import GalleryPhotoCard from "../../cards/GalleryPhotoCard";
import { classNames } from "../../../utils/classNames";

/**
 * Gallery category listing masonry — Figma 4-column layout (non-video).
 * Container max 1412px: cols 338 + 338 + 335 + 338, gap 21px.
 * One visual block = 21 images in fixed column-major slot order.
 */
export const GALLERY_PHOTO_PAGE_SIZE = 21;

const SLOT_COUNT = GALLERY_PHOTO_PAGE_SIZE;

const GalleryCategoryPhotoMasonry = ({ items, onPhotoClick }) => {
  if (!items?.length) return null;

  const blockCount = Math.ceil(items.length / SLOT_COUNT);

  return (
    <div className="flex  flex-col gap-[48px] w-full items-center">
      {Array.from({ length: blockCount }, (_, blockIdx) => {
        const start = blockIdx * SLOT_COUNT;
        const slice = items.slice(start, start + SLOT_COUNT);
        return (
          <MasonryBlock
            key={`block-${blockIdx}`}
            slice={slice}
            startOffset={start}
            onPhotoClick={onPhotoClick}
          />
        );
      })}
    </div>
  );
};

const MasonryBlock = ({ slice, startOffset, onPhotoClick }) => {
  let local = 0;

  const next = () => {
    if (local >= slice.length) return null;
    const item = slice[local];
    const index = startOffset + local;
    local += 1;
    return { item, index };
  };

  const renderLarge = (heightClass, keySuffix) => {
    const t = next();
    if (!t) return null;
    return (
      <GalleryPhotoCard
        key={`gl-${t.index}-${keySuffix}`}
        image={t.item.image}
        title={t.item.title}
        count={t.item.count}
        size="large"
        className={classNames("w-full self-stretch shrink-0", heightClass)}
        onClick={() => onPhotoClick(t.index)}
      />
    );
  };

  const renderSmallInner = (t, keySuffix) => (
    <GalleryPhotoCard
      key={`gs-${t.index}-${keySuffix}`}
      image={t.item.image}
      title={t.item.title}
      count={t.item.count}
      size="small"
      className="w-[162px] flex-1 h-[197px] shrink-0"
      onClick={() => onPhotoClick(t.index)}
    />
  );

  const pairRow = (keyBase) => {
    const a = next();
    const b = next();
    if (!a && !b) return null;
    return (
      <div
        key={keyBase}
        className="flex gap-[14px] items-center self-stretch shrink-0 flex-nowrap"
      >
        {a && renderSmallInner(a, `${keyBase}-a`)}
        {b && renderSmallInner(b, `${keyBase}-b`)}
      </div>
    );
  };

  const col1 = (
    <div className="flex flex-1 flex-col gap-[36px] items-start shrink-0">
      {renderLarge("h-[568px]", "568")}
      {pairRow("p1")}
      {renderLarge("h-[663px]", "663a")}
      {renderLarge("h-[323px]", "323")}
      {pairRow("p2")}
    </div>
  );

  const col2 = (
    <div className="flex flex-1 flex-col gap-[36px] items-start shrink-0">
      {pairRow("p3")}
      {renderLarge("h-[741px]", "741")}
      {pairRow("p4")}
      {renderLarge("h-[848px]", "848")}
    </div>
  );

  const col3 = (
    <div className="flex flex-1 flex-col gap-[32px] items-start shrink-0">
      {renderLarge("h-[663px]", "663b")}
      {renderLarge("h-[663px]", "663c")}
      {renderLarge("h-[663px]", "663d")}
    </div>
  );

  const col4 = (
    <div className="flex flex-1 flex-col gap-[32px] items-end shrink-0">
      {renderLarge("h-[663px]", "663e")}
      {renderLarge("h-[323px]", "323b")}
      <div className="flex flex-col gap-[36px] items-start self-stretch shrink-0">
        {pairRow("p5")}
        {renderLarge("h-[762px]", "762")}
      </div>
    </div>
  );

  return (
    <div className="flex w-full  gap-[21px] items-start flex-nowrap justify-center mx-auto">
      {col1}
      {col2}
      {col3}
      {col4}
    </div>
  );
};

export default GalleryCategoryPhotoMasonry;
