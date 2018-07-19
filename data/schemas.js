const listing = {
  listingId: { type: Number, unique: true },
  typeId: Number,
  hostId: Number,
  title: String,
  location: {
    city: String,
    state: String,
    country: String,
  },
  capacity: [{ name: String, value: Number }],
  highlights: [
    {
      tagline: String,
      description: String,
      upvotes: Number,
      downvotes: Number,
    },
  ],
  descriptions: [{ name: String, value: String }],
  amenityIds: [Number],
  sleepingArrangements: [{ spaceName: String, mattressType: String, number: Number }],
  rules: [String],
  cancellationTypeId: Number,
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
};

const cancellationType = {
  id: Number,
  title: String,
  description: String,
};

module.exports = {
  listing,
  host,
  listingType,
  amenity,
  cancellationType,
};
