const listing = {
  listingId: { type: Number, unique: true },
  typeId: Number,
  hostId: Number,
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
  descriptionSummary: String,
  descriptionSpace: String,
  descriptionInteraction: String,
  descriptionOther: String,
  amenityIds: [Number],
  sleepingArrangements: [
    { spaceName: String, mattressType: String, number: Number }
  ],
  rules: [String],
  cancellationTypeId: Number
};

const listingType = {
  id: Number,
  value: String
};

const host = {
  id: Number,
  name: String,
  avatar: String
};

const amenity = {
  id: Number,
  value: String
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
