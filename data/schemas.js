const listing = {
  listingId: { type: Number, unique: true },
  typeId: Number,
  hostId: Number,
  cancellationTypeId: Number,
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
      tagline: String,
      description: String,
      upvotes: Number,
      downvotes: Number,
    },
  ],
  descriptions: [{ name: String, value: String }],
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
