const listing = {
  listing_id: { type: Number, unique: true },
  type_id: Number,
  host_id: Number,
  title: String,
  city: String,
  state: String,
  country: String,
  guests: Number,
  bedrooms: Number,
  beds: Number,
  baths: Number,
  highlights: [
    { tagline: String, description: String, upvotes: Number, downvotes: Number }
  ],
  description_summary: String,
  description_space: String,
  description_interaction: String,
  description_other: String,
  amenity_ids: [Number],
  sleeping_arrangements: [
    { space_name: String, mattressType: String, number: Number }
  ],
  rules: [String],
  cancellation_type_id: Number
};

const listingType = {
  id: Number,
  value: String
};

const host = {
  id: Number,
  name: String,
  photo: { data: Buffer, contentType: String }
};

const amenity = {
  id: Number,
  value: String,
  icon: String
};

const cancellationType = {
  id: Number,
  title: String,
  description: String
};

module.exports = {
  listing,
  host,
  listingType,
  amenity,
  cancellationType
};
