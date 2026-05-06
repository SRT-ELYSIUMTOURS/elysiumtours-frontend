import React, { useState } from "react";
import { classNames } from "../../utils/classNames";
import BlogHero from "../../components/sections/blog/BlogHero";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import BlogCategoryFilter from "../../components/sections/blog/BlogCategoryFilter";
import TravelGuidesPreview from "../../components/sections/blog/TravelGuidesPreview";
import DestinationHighlightsPreview from "../../components/sections/blog/DestinationHighlightsPreview";
import LocalGuidesPreview from "../../components/sections/blog/LocalGuidesPreview";
import TravelStoriesPreview from "../../components/sections/blog/TravelStoriesPreview";
import FestivalCalendarCta from "../../components/sections/blog/FestivalCalendarCta";
import PartnerSpotlightPreview from "../../components/sections/blog/PartnerSpotlightPreview";
import PartnerPromoCtaSection from "../../components/sections/PartnerPromoCtaSection";
import { partnerPromoBlogContact } from "../../data/partnerPromoCtaPresets.jsx";
import PartnerWithUsModal from "../../components/ui/PartnerWithUsModal";

function showBlogPreview(filter, slug) {
  return filter === "all" || filter === slug;
}

const BlogPage = React.forwardRef(({ className, ...props }, ref) => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  return (
    <main ref={ref} className={classNames("font-raleway", className)} {...props}>
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />
      <BlogHero />
      <BlogCategoryFilter
        selectedCategory={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />
      {showBlogPreview(categoryFilter, "travel-guides") && <TravelGuidesPreview />}
      {showBlogPreview(categoryFilter, "destination-highlights") && (
        <DestinationHighlightsPreview />
      )}
      {showBlogPreview(categoryFilter, "local-guides") && <LocalGuidesPreview />}
      {showBlogPreview(categoryFilter, "travel-stories") && <TravelStoriesPreview />}
      {showBlogPreview(categoryFilter, "festival-calendar") && <FestivalCalendarCta />}
      {showBlogPreview(categoryFilter, "partner-spotlight") && (
        <PartnerSpotlightPreview />
      )}
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

BlogPage.displayName = "BlogPage";
export default BlogPage;
