import React, { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  fetchBlogPostsThunk,
  selectBlogPosts,
  selectBlogStatus,
} from "../../store/slices/cmsSlice";
import BlogHero from "../../components/sections/blog/BlogHero";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import BlogCategoryFilter from "../../components/sections/blog/BlogCategoryFilter";
import BlogSectionHeader from "../../components/sections/blog/BlogSectionHeader";
import BlogPaginationBar from "../../components/sections/blog/BlogPaginationBar";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoBlogContact } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";
import BlogContentCard from "../../components/cards/BlogContentCard";
import HighlightCard from "../../components/cards/HighlightCard";

// Category configuration — maps slug to page content
const CATEGORY_CONFIG = {
  "travel-guides": {
    label: "TRAVEL GUIDE & TIPS",
    breadcrumb: "Travel Guide Explore All",
    title: "Travel Guides & Tips for Every Explorer",
    description: "Discover expert advice, destination guides, and local insights to help you plan your next West African adventure. From cultural etiquette to must-see attractions, our guides make every journey smoother, richer, and more meaningful.",
    gridLayout: "masonry-2col",
    bg: "bg-secondary-light-default",
  },
  "destination-highlights": {
    label: "DESTINATION HIGHLIGHT",
    breadcrumb: "Destination Highlight Explore All",
    title: "Unforgettable Places, Endless Discoveries",
    description: "From Ghana's golden coasts to Togo's vibrant markets and Benin's historic landmarks, discover the destinations that define the spirit of West Africa. Each highlight invites you to explore cities, cultures, adventures, and beauty like never before.",
    gridLayout: "grid-4col",
    bg: "bg-secondary-light-default",
  },
  "local-guides": {
    label: "BEHIND THE SCENES WITH GUIDES",
    breadcrumb: "Behind the scenes All Explore All",
    title: "Inside the World of Our Local Guides",
    description: "Our guides are more than travel experts — they're storytellers, explorers, and cultural ambassadors. Step behind the scenes to discover how their passion for Ghana transforms every journey into a story, a celebration.",
    gridLayout: "masonry-3col",
    bg: "bg-secondary-light-default",
  },
  "travel-stories": {
    label: "GHANA TRAVEL STORIES",
    breadcrumb: "Behind the scene with the guides Explore All",
    title: "BidsPora Travel Stories: Real Journeys, Real People",
    description: "Step into the world of Dispora travelers as they share their unforgettable adventures across West Africa. From cultural discoveries to spontaneous road trips, these stories capture the heart and spirit of exploration — inspiring you to create your own.",
    gridLayout: "grid-3x3",
    bg: "bg-primary-light-default",
  },
  "partner-spotlight": {
    label: "PARTNER SPOTLIGHT",
    breadcrumb: "Partner Spotlight All",
    title: "Building Meaningful Journeys Together",
    description: "From local artisans to eco-lodges and travel innovators, our partners bring each journey to life. 'Partner Spotlight' celebrates their dedication, creativity, and collaboration with Elysium in shaping responsible and memorable travel experiences across West Africa and beyond.",
    gridLayout: "partner-3col",
    bg: "bg-secondary-light-default",
  },
};

const PAGE_SIZE = 12;

// Map a real DB post to the card shape all grid components expect
function postToCard(post) {
  return {
    id: post._id,
    title: post.title,
    category: post.category,
    image: post.coverImage,
    slug: post.slug,
  };
}

// Navigate using the real DB slug when available, synthetic slug otherwise
function goCard(navigate, card) {
  if (card.slug) {
    navigate(`/blog/post/${card.slug}`, {
      state: { title: card.title, heroImage: card.image },
    });
  }
}

// ─── Grid states ──────────────────────────────────────────────────────────────

function SkeletonGrid({ layout }) {
  // Mirror the real grid structure with shimmer placeholders
  if (layout === "masonry-2col") {
    const rows = [];
    for (let i = 0; i < 6; i += 3) {
      rows.push(
        <div key={`sa-${i}`} className="flex flex-col md:flex-row gap-[15px]">
          <div className="w-full md:w-[70%] h-[220px] md:h-[371px] rounded-[16px] bg-[#e5e7eb] animate-pulse" />
          <div className="w-full md:w-[30%] h-[220px] md:h-[371px] rounded-[16px] bg-[#e5e7eb] animate-pulse" />
        </div>
      );
      rows.push(
        <div key={`sb-${i}`} className="flex gap-[15px]">
          <div className="w-full h-[220px] md:h-[415px] rounded-[16px] bg-[#e5e7eb] animate-pulse" />
        </div>
      );
    }
    return <div className="flex flex-col gap-[15px]">{rows}</div>;
  }
  if (layout === "partner-3col") {
    return (
      <div className="mx-auto flex w-full flex-col gap-xl lg:flex-row lg:items-stretch">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[400px] w-full md:h-[500px] lg:h-[656px] lg:flex-1 rounded-[16px] bg-[#e5e7eb] animate-pulse" />
        ))}
      </div>
    );
  }
  // All other layouts: simple responsive grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="w-full h-[240px] md:h-[364px] rounded-[16px] bg-[#e5e7eb] animate-pulse" />
      ))}
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-[80px] gap-4 text-center">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#d1d5db" strokeWidth="1.5" />
        <path d="M12 8v4" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="15.5" r=".75" fill="#d1d5db" />
      </svg>
      <p className="font-raleway font-semibold text-[16px] text-tertiary-normal-default">
        Could not load posts
      </p>
      <p className="font-raleway text-[14px] text-[#949494] max-w-[280px]">
        Something went wrong fetching articles. Please try again.
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="h-[44px] px-6 rounded-[22px] border border-secondary-normal-default font-raleway font-semibold text-[14px] text-secondary-dark-darker cursor-pointer hover:opacity-80 transition-opacity"
        >
          Retry
        </button>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-[80px] gap-4 text-center">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#d1d5db" strokeWidth="1.5" />
        <path d="M8 10h8M8 14h5" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="font-raleway font-semibold text-[16px] text-tertiary-normal-default">
        No posts yet
      </p>
      <p className="font-raleway text-[14px] text-[#949494] max-w-[280px]">
        There are no articles in this category yet — check back soon.
      </p>
    </div>
  );
}

// ─── Grid components (layouts preserved exactly) ─────────────────────────────

function Masonry2ColGrid({ cards, navigate }) {
  const rows = [];
  for (let i = 0; i < cards.length; i += 3) {
    if (cards[i]) {
      rows.push(
        <div key={`row-a-${i}`} className="flex flex-col md:flex-row gap-[15px]">
          <BlogContentCard
            title={cards[i].title}
            category={cards[i].category}
            image={cards[i].image}
            className="!w-full md:!w-[70%] !h-[220px] md:!h-[371px]"
            onClick={() => navigate && goCard(navigate, cards[i])}
          />
          {cards[i + 1] && (
            <BlogContentCard
              title={cards[i + 1].title}
              category={cards[i + 1].category}
              image={cards[i + 1].image}
              className="!w-full md:!w-[30%] !h-[220px] md:!h-[371px]"
              onClick={() => navigate && goCard(navigate, cards[i + 1])}
            />
          )}
        </div>
      );
    }
    if (cards[i + 2]) {
      rows.push(
        <div key={`row-b-${i}`} className="flex gap-[15px]">
          <BlogContentCard
            title={cards[i + 2].title}
            category={cards[i + 2].category}
            image={cards[i + 2].image}
            className="!w-full !h-[220px] md:!h-[415px]"
            onClick={() => navigate && goCard(navigate, cards[i + 2])}
          />
        </div>
      );
    }
  }
  return <div className="flex flex-col gap-[15px]">{rows}</div>;
}

function Grid4Col({ cards, navigate }) {
  return (
    <>
      {/* Mobile/tablet: clean 2-col grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] lg:hidden">
        {cards.map((card) => (
          <BlogContentCard
            key={card.id}
            title={card.title}
            category={card.category}
            image={card.image}
            className="!w-full !h-[220px] shadow-card"
            onClick={() => navigate && goCard(navigate, card)}
          />
        ))}
      </div>

      {/* Desktop: original Figma staggered 4-col bento */}
      <div className="hidden lg:flex mx-auto w-full max-w-[1416px] flex-col gap-[64px]">
        {(() => {
          const bands = [];
          for (let i = 0; i < cards.length; i += 6) bands.push(cards.slice(i, i + 6));
          return bands.map((band, bandIdx) => {
            const [a, b, c, d, e, f] = band;
            return (
              <div key={bandIdx} className="flex w-full justify-between gap-[15px] items-start">
                {a && <BlogContentCard key={a.id} title={a.title} category={a.category} image={a.image} size="tall" className="shrink-0 shadow-card" onClick={() => navigate && goCard(navigate, a)} />}
                <div className="flex max-w-[341px] shrink-0 flex-col gap-[15px] mt-[32px]">
                  {b && <BlogContentCard key={b.id} title={b.title} category={b.category} image={b.image} size="small" className="shrink-0 self-stretch shadow-card" onClick={() => navigate && goCard(navigate, b)} />}
                  {c && <BlogContentCard key={c.id} title={c.title} category={c.category} image={c.image} size="small" className="shrink-0 self-stretch shadow-card" onClick={() => navigate && goCard(navigate, c)} />}
                </div>
                {d && <BlogContentCard key={d.id} title={d.title} category={d.category} image={d.image} size="tall" className="shrink-0 shadow-card" onClick={() => navigate && goCard(navigate, d)} />}
                <div className="flex max-w-[341px] shrink-0 flex-col gap-[15px] mt-[32px]">
                  {e && <BlogContentCard key={e.id} title={e.title} category={e.category} image={e.image} size="small" className="shrink-0 self-stretch shadow-card" onClick={() => navigate && goCard(navigate, e)} />}
                  {f && <BlogContentCard key={f.id} title={f.title} category={f.category} image={f.image} size="small" className="shrink-0 self-stretch shadow-card" onClick={() => navigate && goCard(navigate, f)} />}
                </div>
              </div>
            );
          });
        })()}
      </div>
    </>
  );
}

function Masonry3ColGrid({ cards, navigate }) {
  const heights = [419, 339, 734, 734, 814, 419, 419, 339, 734, 734, 814, 419];
  const cols = [[], [], []];
  cards.forEach((card, i) => {
    cols[i % 3].push({ ...card, height: heights[i] || 364 });
  });

  return (
    <>
      {/* Mobile/tablet: 2-col grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] lg:hidden">
        {cards.map((card) => (
          <BlogContentCard
            key={card.id}
            title={card.title}
            category={card.category}
            image={card.image}
            className="!w-full !h-[240px]"
            onClick={() => navigate && goCard(navigate, card)}
          />
        ))}
      </div>

      {/* Desktop: 3-col masonry */}
      <div className="hidden lg:flex gap-[15px]">
        {cols.map((col, ci) => {
          const columnCards = ci === 1 ? [...col].reverse() : col;
          return (
            <div key={ci} className="flex flex-1 flex-col gap-[15px]">
              {columnCards.map((card) => (
                <BlogContentCard
                  key={card.id}
                  title={card.title}
                  category={card.category}
                  image={card.image}
                  className="!w-full rounded-[40px]"
                  style={{ height: `${card.height}px` }}
                  onClick={() => navigate && goCard(navigate, card)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}

function Grid3x3({ cards, navigate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px]">
      {cards.map((card) => (
        <BlogContentCard
          key={card.id}
          title={card.title}
          category={card.category}
          image={card.image}
          className="!w-full !h-[240px] md:!h-[300px] lg:!h-[364px]"
          onClick={() => navigate && goCard(navigate, card)}
        />
      ))}
    </div>
  );
}

function Partner3Col({ cards, navigate }) {
  return (
    <div className="mx-auto flex w-full flex-col gap-xl lg:flex-row lg:items-stretch">
      {cards.map((card) => (
        <HighlightCard
          key={card.id}
          image={card.image}
          category={card.title || card.category}
          className="h-[400px] w-full min-w-0 md:h-[500px] lg:h-[656px] lg:flex-1"
          onClick={() => navigate && goCard(navigate, card)}
        />
      ))}
    </div>
  );
}

const GRID_COMPONENTS = {
  "masonry-2col": Masonry2ColGrid,
  "grid-4col": Grid4Col,
  "masonry-3col": Masonry3ColGrid,
  "grid-3x3": Grid3x3,
  "partner-3col": Partner3Col,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const BlogCategoryPage = React.forwardRef(({ className, ...props }, ref) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allPosts = useAppSelector(selectBlogPosts);
  const blogStatus = useAppSelector(selectBlogStatus);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const gridTopRef = useRef(null);

  useEffect(() => {
    dispatch(fetchBlogPostsThunk({ category, pageSize: 30 }));
    setVisibleCount(PAGE_SIZE);
  }, [dispatch, category]);

  const config = CATEGORY_CONFIG[category];

  const cards = useMemo(
    () => allPosts.filter((p) => p.category === category).map(postToCard),
    [allPosts, category]
  );

  const visibleCards = cards.slice(0, visibleCount);
  const hasMore = cards.length > visibleCount;
  const canShowLess = visibleCount > PAGE_SIZE;
  const totalPages = Math.ceil(cards.length / PAGE_SIZE);
  const GridComponent = config ? GRID_COMPONENTS[config.gridLayout] : null;

  const isLoading = blogStatus === "idle" || blogStatus === "loading";
  const isError = blogStatus === "failed";

  const handleRetry = () => dispatch(fetchBlogPostsThunk({ category, pageSize: 30 }));

  // Fallback for unknown categories
  if (!config) {
    return (
      <main ref={ref} className={classNames("font-raleway", className)} {...props}>
        <BlogBreadcrumbBar
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Not Found" },
          ]}
        />
        <BlogHero />
        <BlogCategoryFilter />
        <div className="flex items-center justify-center py-[120px]">
          <p className="font-raleway font-medium text-[20px] text-primary-dark-darker">
            Category not found
          </p>
        </div>
      </main>
    );
  }

  return (
    <main ref={ref} className={classNames("font-raleway", className)} {...props}>
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: config.breadcrumb },
        ]}
      />
      <BlogHero />
      {/* <BlogCategoryFilter /> */}

      {/* Main content section */}
      <section className={classNames("w-full py-10 lg:py-[80px]", config.bg)}>
        <div className="mx-4 md:mx-8 lg:mx-[156px]">
          <BlogSectionHeader
            label={config.label}
            title={config.title}
            description={config.description}
          />

          {/* Card grid */}
          <div ref={gridTopRef} className="mt-10 lg:mt-[80px] scroll-mt-24">
            {isLoading ? (
              <SkeletonGrid layout={config.gridLayout} />
            ) : isError ? (
              <ErrorState onRetry={handleRetry} />
            ) : cards.length === 0 ? (
              <EmptyState />
            ) : (
              GridComponent && <GridComponent cards={visibleCards} navigate={navigate} />
            )}
          </div>
        </div>

        {/* Pagination — only when we have real data */}
        {!isLoading && !isError && cards.length > 0 && (
          <div className="mt-10 lg:mt-[80px]">
            <BlogPaginationBar
              currentPage={Math.ceil(visibleCount / PAGE_SIZE)}
              totalPages={totalPages}
              totalResults={cards.length}
              visibleResults={visibleCards.length}
              onLoadMore={
                hasMore
                  ? () => setVisibleCount((c) => Math.min(c + PAGE_SIZE, cards.length))
                  : undefined
              }
              onShowLess={
                canShowLess
                  ? () => {
                      setVisibleCount(PAGE_SIZE);
                      gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  : undefined
              }
            />
          </div>
        )}
      </section>

      <PartnerPromoCtaSection
        {...partnerPromoBlogContact}
        onCtaClick={() => setPartnerModalOpen(true)}
      />
      {partnerModalOpen && (
        <PartnerWithUsModal
          onClose={() => setPartnerModalOpen(false)}
          onSubmit={() => {}}
        />
      )}
    </main>
  );
});

BlogCategoryPage.displayName = "BlogCategoryPage";
export default BlogCategoryPage;
