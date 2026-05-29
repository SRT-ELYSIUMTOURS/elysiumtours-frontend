import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryGalleryThunk,
  fetchPartnerGallerySummaryThunk,
  selectCategoryGalleryImages,
  selectPartnerSummary,
  selectCategoryGalleryStatus,
  selectPartnerSummaryStatus,
  clearCategoryImages,
} from "../../store/slices/gallerySlice";
import GalleryCardSkeleton from "../../components/sections/gallery/GalleryCardSkeleton";
import GallerySectionEmptyState from "../../components/sections/gallery/GallerySectionEmptyState";
import GallerySectionErrorState from "../../components/sections/gallery/GallerySectionErrorState";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
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

// Skeleton grid for loading state — 12 shimmer cards in a responsive grid
const PhotoSkeletonGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 w-full">
    {Array.from({ length: 12 }).map((_, i) => (
      <GalleryCardSkeleton key={i} className="aspect-[4/5]" />
    ))}
  </div>
);

// "Coming Soon" state for videos category
const VideoComingSoon = () => (
  <div className="flex flex-col items-center justify-center py-[80px] gap-[16px]">
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#d1d5db" strokeWidth="1.5" />
      <path d="M12 8v4l2.5 2.5" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <p className="font-raleway font-semibold text-[16px] leading-[22px] text-[#b9b9b9]">Coming Soon</p>
    <p className="font-raleway font-normal text-[14px] leading-[22px] text-[#b9b9b9] text-center max-w-[280px]">
      Videos are on their way — check back soon.
    </p>
  </div>
);

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
  const dispatch = useDispatch();
  const isVideoCategory = category === "videos";
  const isPartnersCategory = category === "partners";

  const rawImages = useSelector(selectCategoryGalleryImages);
  const partnerSummary = useSelector(selectPartnerSummary);
  const categoryStatus = useSelector(selectCategoryGalleryStatus);
  const partnerSummaryStatus = useSelector(selectPartnerSummaryStatus);

  useEffect(() => {
    dispatch(clearCategoryImages());
    if (!isVideoCategory) {
      dispatch(fetchCategoryGalleryThunk(category));
    }
    if (isPartnersCategory) {
      dispatch(fetchPartnerGallerySummaryThunk());
    }
  }, [category, dispatch, isVideoCategory, isPartnersCategory]);

  const activeStatus = isPartnersCategory ? partnerSummaryStatus : categoryStatus;

  const items = useMemo(() => {
    if (isVideoCategory) return [];
    if (isPartnersCategory) {
      return partnerSummary.map((p, i) => ({
        id: i + 1,
        image: p.coverImage,
        title: p.label,
        count: `${p.count} Partners`,
      }));
    }
    return rawImages.map((img, i) => ({
      id: i + 1,
      image: img.image,
      title: img.title,
      count: img.tourTitle,
    }));
  }, [isVideoCategory, isPartnersCategory, rawImages, partnerSummary]);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [fullGalleryOpen, setFullGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareItem, setShareItem] = useState(null);
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
      <div className="px-4  bg-secondary-light-default md:px-8 lg:px-[156px] py-10 lg:py-[80px] bg-primary-light-default">
        {/* Sort + Search — compact row, sort sized to content + search fills remaining */}
        <div className="flex items-center  justify-between gap-3 mb-8 lg:mb-[48px]">
          {/* Sort dropdown — auto width */}
          <button className="flex items-center justify-center gap-[6px] h-[40px] lg:h-[44px] px-4 border border-[#b9b9b9] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] bg-transparent cursor-pointer shrink-0">
            <span className="font-raleway font-medium text-[13px] leading-[22px] text-[#949494] whitespace-nowrap">Sort By</span>
            <DownIcon />
          </button>
          {/* Search — fills remaining width, capped at 379px on lg+ */}
          <div className="relative flex items-center h-[40px] lg:h-[44px] flex-1 min-w-0 lg:max-w-[379px] border border-[#b9b9b9] rounded-[20px] bg-transparent overflow-hidden">
            <input
              type="text"
              placeholder={`Search ${categoryLabel}`}
              className="flex-1 min-w-0 h-full pl-[16px] pr-[44px] font-raleway font-medium text-[13px] text-[#949494] outline-none bg-transparent"
            />
            <div className="absolute right-[8px] top-1/2 -translate-y-1/2 size-[37px] flex items-center justify-center pointer-events-none">
              <SearchIcon />
            </div>
          </div>
        </div>

        {/* Grid */}
        {isVideoCategory ? (
          <VideoComingSoon />
        ) : activeStatus === "loading" || activeStatus === "idle" ? (
          <PhotoSkeletonGrid />
        ) : activeStatus === "failed" ? (
          <GallerySectionErrorState
            onRetry={() => {
              if (isPartnersCategory) dispatch(fetchPartnerGallerySummaryThunk());
              else dispatch(fetchCategoryGalleryThunk(category));
            }}
          />
        ) : items.length === 0 ? (
          <GallerySectionEmptyState />
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
      <PartnerPromoCtaSection {...partnerPromoGallery} />

      {/* Image/Video Viewer Modal */}
      {isVideoCategory ? (
        <VideoViewerModal
          isOpen={viewerOpen}
          onClose={() => setViewerOpen(false)}
          video={items[viewerIndex]?.video}
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

    </main>
  );
};

export default GalleryCategoryPage;
