import mongoose from 'mongoose';

export interface IBlog {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  published: boolean;
  publishDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Normalises read time input: "5", "5min", "5 mins", "5 min  read" -> "5 min read" / "5 mins read".
 * Values that don't look like a read time are returned trimmed, so the schema validator can reject them.
 * Used by the pre-validate hook and by the update route (findByIdAndUpdate skips document hooks).
 */
export function normalizeReadTime(value: string): string {
  const readTime = value.toLowerCase().trim();
  const match = readTime.match(/^(\d+)\s*(min|mins|minute|minutes)?\s*(read)?$/);
  if (!match) return value.trim();
  return `${match[1]} ${match[2] || 'min'} read`;
}

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Blog slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  excerpt: {
    type: String,
    required: [true, 'Blog excerpt is required'],
    trim: true,
    minlength: [20, 'Excerpt must be at least 20 characters long'],
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Blog content is required'],
    minlength: [100, 'Content must be at least 100 characters long']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    minlength: [2, 'Author name must be at least 2 characters long'],
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: {
      values: [
        'Education Trends',
        'Career Guidance', 
        'Study Abroad',
        'Scholarships',
        'Skills Development',
        'University Rankings',
        'Regulations',
        'Study Tips',
        'Industry Insights',
        'Technology',
        'News'
      ],
      message: 'Please select a valid category'
    }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  readTime: {
    type: String,
    required: [true, 'Read time is required'],
    match: [/^\d+\s*(min|mins|minute|minutes)\s*read$/i, 'Read time format should be like "5 min read"']
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  publishDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Runs before validation (not 'save') so the readTime normalisation below
// happens before the readTime format validator checks it.
BlogSchema.pre('validate', async function() {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  if (this.readTime) {
    this.readTime = normalizeReadTime(this.readTime);
  }
});

// Index for better query performance
BlogSchema.index({ published: 1, publishDate: -1 });
BlogSchema.index({ category: 1, published: 1 });
BlogSchema.index({ featured: 1, published: 1 });
// Note: slug already has a unique index from `unique: true` on the field.

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);