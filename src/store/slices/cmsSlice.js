import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  listBlogPostsApi,
  getBlogPostApi,
  listFAQsApi,
  listTestimonialsApi,
  listGalleryApi,
} from "../../api/cms.api";

export const fetchBlogPostsThunk = createAsyncThunk(
  "cms/fetchBlogPosts",
  async (params, { rejectWithValue }) => {
    try {
      return await listBlogPostsApi(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load blog posts.");
    }
  }
);

export const fetchBlogPostThunk = createAsyncThunk(
  "cms/fetchBlogPost",
  async (slug, { rejectWithValue }) => {
    try {
      return await getBlogPostApi(slug);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Post not found.");
    }
  }
);

export const fetchFAQsThunk = createAsyncThunk(
  "cms/fetchFAQs",
  async (_, { rejectWithValue }) => {
    try {
      return await listFAQsApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load FAQs.");
    }
  }
);

export const fetchTestimonialsThunk = createAsyncThunk(
  "cms/fetchTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      return await listTestimonialsApi();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load testimonials.");
    }
  }
);

export const fetchGalleryThunk = createAsyncThunk(
  "cms/fetchGallery",
  async (params, { rejectWithValue }) => {
    try {
      return await listGalleryApi(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load gallery.");
    }
  }
);

const cmsSlice = createSlice({
  name: "cms",
  initialState: {
    blogPosts: [],
    currentPost: null,
    faqs: [],
    testimonials: [],
    gallery: [],
    blogStatus: "idle",
    currentPostStatus: "idle",
    faqsStatus: "idle",
    testimonialsStatus: "idle",
    galleryStatus: "idle",
    error: null,
  },
  reducers: {
    clearCurrentPost(state) {
      state.currentPost = null;
      state.currentPostStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    const normalize = (payload) =>
      Array.isArray(payload) ? payload : (payload.rows || payload.data || []);

    builder
      .addCase(fetchBlogPostsThunk.pending, (state) => { state.blogStatus = "loading"; })
      .addCase(fetchBlogPostsThunk.fulfilled, (state, action) => {
        state.blogPosts = normalize(action.payload);
        state.blogStatus = "succeeded";
      })
      .addCase(fetchBlogPostsThunk.rejected, (state, action) => {
        state.blogStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchBlogPostThunk.pending, (state) => { state.currentPostStatus = "loading"; state.currentPost = null; })
      .addCase(fetchBlogPostThunk.fulfilled, (state, action) => {
        state.currentPost = action.payload;
        state.currentPostStatus = "succeeded";
      })
      .addCase(fetchBlogPostThunk.rejected, (state, action) => {
        state.currentPostStatus = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(fetchFAQsThunk.pending, (state) => { state.faqsStatus = "loading"; })
      .addCase(fetchFAQsThunk.fulfilled, (state, action) => {
        state.faqs = normalize(action.payload);
        state.faqsStatus = "succeeded";
      })
      .addCase(fetchFAQsThunk.rejected, (state, action) => {
        state.faqsStatus = "failed";
      });

    builder
      .addCase(fetchTestimonialsThunk.pending, (state) => { state.testimonialsStatus = "loading"; })
      .addCase(fetchTestimonialsThunk.fulfilled, (state, action) => {
        state.testimonials = normalize(action.payload);
        state.testimonialsStatus = "succeeded";
      })
      .addCase(fetchTestimonialsThunk.rejected, (state, action) => {
        state.testimonialsStatus = "failed";
      });

    builder
      .addCase(fetchGalleryThunk.pending, (state) => { state.galleryStatus = "loading"; })
      .addCase(fetchGalleryThunk.fulfilled, (state, action) => {
        state.gallery = normalize(action.payload);
        state.galleryStatus = "succeeded";
      })
      .addCase(fetchGalleryThunk.rejected, (state, action) => {
        state.galleryStatus = "failed";
      });
  },
});

export const { clearCurrentPost } = cmsSlice.actions;

export const selectBlogPosts = (state) => state.cms.blogPosts;
export const selectCurrentPost = (state) => state.cms.currentPost;
export const selectFAQs = (state) => state.cms.faqs;
export const selectTestimonials = (state) => state.cms.testimonials;
export const selectGallery = (state) => state.cms.gallery;
export const selectBlogStatus = (state) => state.cms.blogStatus;
export const selectCurrentPostStatus = (state) => state.cms.currentPostStatus;
export const selectTestimonialsStatus = (state) => state.cms.testimonialsStatus;
export const selectGalleryStatus = (state) => state.cms.galleryStatus;
export const selectFAQsStatus = (state) => state.cms.faqsStatus;

export default cmsSlice.reducer;
