import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import BlogHero from "../../components/sections/blog/BlogHero";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import BlogCategoryFilter from "../../components/sections/blog/BlogCategoryFilter";
import BlogSectionHeader from "../../components/sections/blog/BlogSectionHeader";
import BlogPaginationBar from "../../components/sections/blog/BlogPaginationBar";
import BlogCtaSection from "../../components/sections/blog/BlogCtaSection";
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
        { id: 3, category: "Dinning", image: `https://picsum.photos/seed/${seed}-din/451/656` },
      ];
    default:
      return [];
  }
}

// Render the 2-column masonry grid
function Masonry2ColGrid({ cards }) {
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
            className="!w-[1028px] !h-[371px]"
          />
          {cards[i + 1] && (
            <BlogContentCard
              title={cards[i + 1].title}
              category={cards[i + 1].category}
              image={cards[i + 1].image}
              className="!w-[363px] !h-[371px]"
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
          />
        </div>
      );
    }
  }
  return <div className="flex flex-col gap-[15px]">{rows}</div>;
}

// Render 4-column equal grid
function Grid4Col({ cards }) {
  const rows = [];
  for (let i = 0; i < cards.length; i += 4) {
    rows.push(
      <div key={i} className="flex gap-[15px]">
        {cards.slice(i, i + 4).map((card) => (
          <BlogContentCard
            key={card.id}
            title={card.title}
            category={card.category}
            image={card.image}
            className="!w-[340px] !h-[364px]"
          />
        ))}
      </div>
    );
  }
  return <div className="flex flex-col gap-[15px]">{rows}</div>;
}

// Render 3-column masonry grid
function Masonry3ColGrid({ cards }) {
  const heights = [419, 337, 734, 734, 814, 433, 419, 337, 734, 734, 814, 433];
  const cols = [[], [], []];
  cards.forEach((card, i) => {
    cols[i % 3].push({ ...card, height: heights[i] || 364 });
  });

  return (
    <div className="flex gap-[15px]">
      {cols.map((col, ci) => (
        <div key={ci} className="flex flex-col gap-[15px]">
          {col.map((card) => (
            <BlogContentCard
              key={card.id}
              title={card.title}
              category={card.category}
              image={card.image}
              className={`!w-[457px] !h-[${card.height}px]`}
              style={{ width: "457px", height: `${card.height}px` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Render 3x3 equal grid
function Grid3x3({ cards }) {
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
          />
        ))}
      </div>
    );
  }
  return <div className="flex flex-col gap-[15px]">{rows}</div>;
}

// Render 3-column partner cards
function Partner3Col({ cards }) {
  return (
    <div className="flex items-center gap-xl">
      {cards.map((card) => (
        <PartnerHighlightCard
          key={card.id}
          image={card.image}
          category={card.category}
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
  const [currentPage, setCurrentPage] = useState(1);

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
      <BlogCategoryFilter />

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
            {GridComponent && <GridComponent cards={cards} />}
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

      <BlogCtaSection />
    </main>
  );
});

BlogCategoryPage.displayName = "BlogCategoryPage";
export default BlogCategoryPage;
