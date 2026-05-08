import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import GalleryCategoryFilterBar from "../../components/sections/gallery/GalleryCategoryFilterBar";
import GalleryVideoCard from "../../components/cards/GalleryVideoCard";
import GalleryCategoryPhotoMasonry, {
  GALLERY_PHOTO_PAGE_SIZE,
} from "../../components/sections/gallery/GalleryCategoryPhotoMasonry";
import ImageViewerModal from "../../components/ui/ImageViewerModal";
import ImageGalleryModal from "../../components/ui/ImageGalleryModal";
import VideoViewerModal from "../../components/ui/VideoViewerModal";
import SocialShareModal from "../../components/ui/SocialShareModal";
import GalleryBecomePartSection from "../../components/sections/gallery/GalleryBecomePartSection";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoGallery } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";

// Route: /gallery/:category/all
// Sub-category listing page — photo masonry or video 3-col grid
// Supports image and video viewer modals + social share modal

const CATEGORY_LABELS = {
  destinations: "Destinations",
  activities: "Activities",
  nature: "Nature",
  culture: "Culture",
  videos: "Videos",
  partners: "Partners",
  "captured-by-you": "Captured by You",
};

// Generate mock photo items for a category
const generatePhotoItems = (catKey, count = 42) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/seed/${catKey}-item-${i}/600/600`,
    title: `${CATEGORY_LABELS[catKey] ?? catKey} ${i + 1}`,
    count: `${Math.floor(Math.random() * 40 + 10)} Photos`,
  }));

// Generate mock video items
const generateVideoItems = (catKey, count = 9) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/seed/${catKey}-vid-${i}/600/400`,
    title: `${CATEGORY_LABELS[catKey] ?? catKey} Video ${i + 1}`,
    count: `${Math.floor(Math.random() * 5 + 1)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")} min`,
  }));

const DownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6 9L12 15L18 9" stroke="#949494" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="#949494" strokeWidth="1.5" />
    <path d="M16.5 16.5L21 21" stroke="#949494" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GalleryCategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const isVideoCategory = category === "videos";

  const items = isVideoCategory
    ? generateVideoItems(category)
    : generatePhotoItems(category);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [fullGalleryOpen, setFullGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareItem, setShareItem] = useState(null);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [photoVisibleCount, setPhotoVisibleCount] = useState(GALLERY_PHOTO_PAGE_SIZE);

  const categoryLabel = CATEGORY_LABELS[category] ?? category;

  useEffect(() => {
    if (!isVideoCategory) setPhotoVisibleCount(GALLERY_PHOTO_PAGE_SIZE);
  }, [category, isVideoCategory]);

  const visiblePhotoItems = isVideoCategory
    ? items
    : items.slice(0, photoVisibleCount);

  const thumbnails = items.map((item) => item.image);
  const hasMorePhotos =
    !isVideoCategory && items.length > photoVisibleCount;

  const handleItemClick = (index) => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  const handleShare = (item) => {
    setShareItem(item);
    setShareOpen(true);
  };

  return (
    <main>
      {/* Breadcrumb */}
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
          { label: categoryLabel },
        ]}
      />

      {/* Category filter bar */}
      {/* <GalleryCategoryFilterBar
        activeTab={category}
        onTabChange={(tab) => {
          if (tab === "all") navigate("/gallery");
          else navigate(`/gallery/${tab}/all`);
        }}
      /> */}

      {/* Page content */}
      <div className="px-[156px] py-[80px] bg-primary-light-default">
        {/* Page heading + sort */}
        <div className="flex items-center  justify-between mb-[48px]">
         
            {/* Sort dropdown */}
            <button className="flex items-center gap-[4px] h-[44px] px-[12px] border border-[#b9b9b9] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] bg-transparent cursor-pointer">
              <span className="font-raleway font-medium text-[13px] leading-[22px] text-[#949494] whitespace-nowrap">Sort By</span>
              <DownIcon />
            </button>
            {/* Search */}
            <div className="relative flex items-center h-[44px] w-[379px] border border-[#b9b9b9] rounded-[20px] bg-transparent overflow-hidden">
              <input
                type="text"
                placeholder={`Search ${categoryLabel}`}
                className="flex-1 h-full px-[16px] font-raleway font-medium text-[13px] text-[#949494] outline-none bg-transparent"
              />
              <div className="absolute right-[8px] top-1/2 -translate-y-1/2 size-[37px] flex items-center justify-center">
                <SearchIcon />
              </div>
          </div>
        </div>

        {/* Grid */}
        {isVideoCategory ? (
          // Video 3-column grid
          <div className="grid grid-cols-3 gap-[24px]">
            {items.map((item, i) => (
              <GalleryVideoCard
                key={item.id}
                image={item.image}
                title={item.title}
                count={item.count}
                className="h-[364px]"
                onClick={() => handleItemClick(i)}
              />
            ))}
          </div>
        ) : (
          <>
            <GalleryCategoryPhotoMasonry
              items={visiblePhotoItems}
              onPhotoClick={handleItemClick}
            />
            {hasMorePhotos && (
              <div className="flex justify-center mt-[48px]">
                <button
                  type="button"
                  className="min-w-[180px] h-[52px] px-[32px] rounded-[26px] border border-secondary-light-active bg-primary-light-default font-raleway font-semibold text-[15px] text-secondary-dark-darker shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() =>
                    setPhotoVisibleCount((c) =>
                      Math.min(c + GALLERY_PHOTO_PAGE_SIZE, items.length)
                    )
                  }
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Share your travel moments — above partner CTA on every category listing */}
      <GalleryBecomePartSection />

      {/* CTA */}
      <PartnerPromoCtaSection
        {...partnerPromoGallery}
        onCtaClick={() => setPartnerModalOpen(true)}
      />

      {/* Image/Video Viewer Modal */}
      {isVideoCategory ? (
        <VideoViewerModal
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
          image={items[viewerIndex]?.image}
          title={items[viewerIndex]?.title}
          currentIndex={viewerIndex}
          totalImages={items.length}
          thumbnails={thumbnails}
          onPrev={() => setViewerIndex((p) => Math.max(0, p - 1))}
          onNext={() => setViewerIndex((p) => Math.min(items.length - 1, p + 1))}
          onShare={() => handleShare(items[viewerIndex])}
        />
      ) : (
        <ImageViewerModal
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
          image={items[viewerIndex]?.image}
          title={items[viewerIndex]?.title}
          currentIndex={viewerIndex}
          totalImages={items.length}
          thumbnails={thumbnails}
          onPrev={() => setViewerIndex((p) => Math.max(0, p - 1))}
          onNext={() => setViewerIndex((p) => Math.min(items.length - 1, p + 1))}
          onShare={() => handleShare(items[viewerIndex])}
          onOpenFullscreen={() => {
            setGalleryIndex(viewerIndex);
            setViewerOpen(false);
            setFullGalleryOpen(true);
          }}
        />
      )}

      {fullGalleryOpen && (
        <ImageGalleryModal
          images={thumbnails}
          currentIndex={galleryIndex}
          onClose={() => setFullGalleryOpen(false)}
          title={items[galleryIndex]?.title ?? ""}
          location="Ghana — Central Region, Cape Coast"
          onShare={(i) => items[i] && handleShare(items[i])}
          suppressEscapeClose={shareOpen}
        />
      )}

      {/* Social Share Modal */}
      <SocialShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        image={shareItem?.image}
        userSubtitle={shareItem?.title}
      />

      {partnerModalOpen && (
        <PartnerWithUsModal
          onClose={() => setPartnerModalOpen(false)}
          onSubmit={() => {}}
        />
      )}
    </main>
  );
};

export default GalleryCategoryPage;
