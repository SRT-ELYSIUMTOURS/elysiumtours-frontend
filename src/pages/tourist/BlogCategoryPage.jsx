import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import { openBlogPost } from "../../utils/blogPostRoute";
import BlogHero from "../../components/sections/blog/BlogHero";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import BlogCategoryFilter from "../../components/sections/blog/BlogCategoryFilter";
import BlogSectionHeader from "../../components/sections/blog/BlogSectionHeader";
import BlogPaginationBar from "../../components/sections/blog/BlogPaginationBar";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoBlogContact } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";
import BlogContentCard from "../../components/cards/BlogContentCard";
import PartnerHighlightCard from "../../components/cards/PartnerHighlightCard";

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

// Generate placeholder cards for each grid layout
function generateCards(layout, seed = "cat") {
  switch (layout) {
    case "masonry-2col":
      return Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `8 ways to enjoy Ghana in fall`,
        category: "Leisure Tours",
        image: `https://picsum.photos/seed/${seed}-${i}/600/400`,
      }));
    case "grid-4col":
      return Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Destination ${i + 1}`,
        category: "Explore",
        image: `https://picsum.photos/seed/${seed}-${i}/340/364`,
      }));
    case "masonry-3col":
      return Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Guide Story ${i + 1}`,
        category: "Behind the Scenes",
        image: `https://picsum.photos/seed/${seed}-${i}/457/400`,
      }));
    case "grid-3x3":
      return Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        title: `Travel Story ${i + 1}`,
        category: "Personal",
        image: `https://picsum.photos/seed/${seed}-${i}/461/364`,
      }));
    case "partner-3col":
      return [
        { id: 1, category: "Accommodation", image: `https://picsum.photos/seed/${seed}-acc/451/656` },
        { id: 2, category: "Transportation", image: `https://picsum.photos/seed/${seed}-trans/451/656` },
        { id: 3, category: "Dining", image: `https://picsum.photos/seed/${seed}-din/451/656` },
      ];
    default:
      return [];
  }
}

// Render the 2-column masonry grid
function Masonry2ColGrid({ cards, navigate }) {
  // Alternating rows: [wide + short], [full-width], repeat
  const rows = [];
  for (let i = 0; i < cards.length; i += 3) {
    // Row A: wide left + short right
    if (cards[i]) {
      rows.push(
        <div key={`row-a-${i}`} className="flex gap-[15px]">
          <BlogContentCard
            title={cards[i].title}
            category={cards[i].category}
            image={cards[i].image}
            className="!w-[70%] !h-[371px]"
            onClick={() => navigate && openBlogPost(navigate, { ...cards[i], uniqueKey: cards[i].id })}
          />
          {cards[i + 1] && (
            <BlogContentCard
              title={cards[i + 1].title}
              category={cards[i + 1].category}
              image={cards[i + 1].image}
              className="!w-[30%] !h-[371px]"
              onClick={() => navigate && openBlogPost(navigate, { ...cards[i + 1], uniqueKey: cards[i + 1].id })}
            />
          )}
        </div>
      );
    }
    // Row B: full width
    if (cards[i + 2]) {
      rows.push(
        <div key={`row-b-${i}`} className="flex gap-[15px]">
          <BlogContentCard
            title={cards[i + 2].title}
            category={cards[i + 2].category}
            image={cards[i + 2].image}
            className="!w-full !h-[415px]"
            onClick={() => navigate && openBlogPost(navigate, { ...cards[i + 2], uniqueKey: cards[i + 2].id })}
          />
        </div>
      );
    }
  }
  return <div className="flex flex-col gap-[15px]">{rows}</div>;
}

// Destination highlights: 4-column staggered grid (Figma)
// Cols a & d: tall cards (340×653), top-aligned. Cols b/c & e/f: stacked small cards, shifted down slightly.
function Grid4Col({ cards, navigate }) {
  const bands = [];
  for (let i = 0; i < cards.length; i += 6) {
    bands.push(cards.slice(i, i + 6));
  }

  return (
    <div className="mx-auto flex w-full max-w-[1416px] flex-col gap-[64px]">
      {bands.map((band, bandIdx) => {
        const [a, b, c, d, e, f] = band;
        return (
          <div
            key={bandIdx}
            className="flex w-full flex-col items-center justify-between gap-[15px] lg:flex-row lg:items-start"
          >
            {a ? (
              <BlogContentCard
                key={a.id}
                title={a.title}
                category={a.category}
                image={a.image}
                size="tall"
                className="shrink-0 shadow-card"
                onClick={() => navigate && openBlogPost(navigate, { ...a, uniqueKey: a.id })}
              />
            ) : null}

            <div className="flex w-full max-w-[341px] shrink-0 flex-col gap-[15px] lg:mt-[32px]">
              {b ? (
                <BlogContentCard
                  key={b.id}
                  title={b.title}
                  category={b.category}
                  image={b.image}
                  size="small"
                  className="shrink-0 self-stretch shadow-card"
                  onClick={() => navigate && openBlogPost(navigate, { ...b, uniqueKey: b.id })}
                />
              ) : null}
              {c ? (
                <BlogContentCard
                  key={c.id}
                  title={c.title}
                  category={c.category}
                  image={c.image}
                  size="small"
                  className="shrink-0 self-stretch shadow-card"
                  onClick={() => navigate && openBlogPost(navigate, { ...c, uniqueKey: c.id })}
                />
              ) : null}
            </div>

            {d ? (
              <BlogContentCard
                key={d.id}
                title={d.title}
                category={d.category}
                image={d.image}
                size="tall"
                className="shrink-0 shadow-card"
                onClick={() => navigate && openBlogPost(navigate, { ...d, uniqueKey: d.id })}
              />
            ) : null}

            <div className="flex w-full max-w-[341px] shrink-0 flex-col gap-[15px] lg:mt-[32px]">
              {e ? (
                <BlogContentCard
                  key={e.id}
                  title={e.title}
                  category={e.category}
                  image={e.image}
                  size="small"
                  className="shrink-0 self-stretch shadow-card"
                  onClick={() => navigate && openBlogPost(navigate, { ...e, uniqueKey: e.id })}
                />
              ) : null}
              {f ? (
                <BlogContentCard
                  key={f.id}
                  title={f.title}
                  category={f.category}
                  image={f.image}
                  size="small"
                  className="shrink-0 self-stretch shadow-card"
                  onClick={() => navigate && openBlogPost(navigate, { ...f, uniqueKey: f.id })}
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Render 3-column masonry grid
function Masonry3ColGrid({ cards, navigate }) {
  // Per-card heights (Figma). Cards go to col i % 3 — column totals must match or the shortest
  // column “hangs” above the longest. Last column had indices 2,5,8,11 summing higher until 433→419 on 5 & 11.
  const heights = [419, 339, 734, 734, 814, 419, 419, 339, 734, 734, 814, 419];
  const cols = [[], [], []];
  cards.forEach((card, i) => {
    cols[i % 3].push({ ...card, height: heights[i] || 364 });
  });

  return (
    <div className="flex  gap-[15px]">
      {cols.map((col, ci) => {
        const columnCards = ci === 1 ? [...col].reverse() : col;
        return (
          <div key={ci} className="flex flex-1  flex-col gap-[15px]">
            {columnCards.map((card) => (
              <BlogContentCard
                key={card.id}
                title={card.title}
                category={card.category}
                image={card.image}
                className={`!w-[100%] rounded-[40px] !h-[${card.height}px]`}
                style={{ width: "457px", height: `${card.height}px` }}
                onClick={() => navigate && openBlogPost(navigate, { ...card, uniqueKey: card.id })}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

// Render 3x3 equal grid
function Grid3x3({ cards, navigate }) {
  const rows = [];
  for (let i = 0; i < cards.length; i += 3) {
    rows.push(
      <div key={i} className="flex gap-[15px]">
        {cards.slice(i, i + 3).map((card) => (
          <BlogContentCard
            key={card.id}
            title={card.title}
            category={card.category}
            image={card.image}
            className="!w-auto !h-[364px] flex-1"
            onClick={() => navigate && openBlogPost(navigate, { ...card, uniqueKey: card.id })}
          />
        ))}
      </div>
    );
  }
  return <div className="flex flex-col gap-[15px]">{rows}</div>;
}

// Render 3-column partner cards (PartnerHighlightCard needs explicit height — same as PartnerSpotlightPreview)
function Partner3Col({ cards, navigate }) {
  return (
    <div className="mx-auto flex w-full flex-col gap-xl lg:flex-row lg:items-stretch">
      {cards.map((card) => (
        <PartnerHighlightCard
          key={card.id}
          image={card.image}
          category={card.category}
          className="h-[400px] w-full min-w-0 md:h-[500px] lg:h-[656px] lg:flex-1"
          onClick={() =>
            navigate &&
            openBlogPost(navigate, {
              title: card.category,
              image: card.image,
              category: card.category,
              uniqueKey: card.id,
            })
          }
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

const BlogCategoryPage = React.forwardRef(({ className, ...props }, ref) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  const config = CATEGORY_CONFIG[category];

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

  const cards = generateCards(config.gridLayout, category);
  const GridComponent = GRID_COMPONENTS[config.gridLayout];

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
      <section className={classNames("w-full py-[80px]", config.bg)}>
        <div className="mx-[156px]">
          <BlogSectionHeader
            label={config.label}
            title={config.title}
            description={config.description}
          />

          {/* Card grid */}
          <div className="mt-[80px]">
            {GridComponent && <GridComponent cards={cards} navigate={navigate} />}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-[80px]">
          <BlogPaginationBar
            currentPage={currentPage}
            totalPages={20}
            totalResults={200}
            onPageChange={setCurrentPage}
          />
        </div>
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
