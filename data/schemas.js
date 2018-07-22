const listing = {
  listingId: { type: Number, unique: true },
  typeId: Number,
  hostId: Number,
  cancellationPolicyId: Number,
  title: String,
  amenityIds: [Number],
  location: {
    city: String,
    state: String,
    country: String,
  },
  capacity: [{ name: String, value: Number, icon: String }],
  highlights: [
    {
      id: Number,
      tagline: String,
      description: String,
      upvotes: Number,
      downvotes: Number,
    },
  ],
  descriptions: { main: String, more: [{ title: String, value: String }] },
  sleepingArrangements: [{ spaceName: String, mattressType: String, number: Number }],
  rules: [String],
};

const listingType = {
  id: Number,
  value: String,
};

const host = {
  id: Number,
  name: String,
  avatar: String,
};

const amenity = {
  id: Number,
  value: String,
  icon: String,
};

const cancellationPolicy = {
  id: Number,
  name: String,
  description: String,
};

module.exports = {
  listing,
  host,
  listingType,
  amenity,
  cancellationPolicy,
};
