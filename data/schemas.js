const listing = {
  listingId: { type: Number, unique: true },
  typeId: Number,
  hostId: Number,
  amenityIds: [Number],
  cancellationPolicyId: Number,
  title: String,
  location: {
    city: String,
    state: String,
    country: String,
  },
  capacity: [{ name: String, number: Number, icon: String }],
  highlights: [
    {
      id: Number,
      tagline: String,
      description: String,
      upvotes: Number,
    },
  ],
  description: { main: String, more: [{ title: String, text: String }] },
  sleepingArrangements: [{ spaceName: String, mattressType: String, number: Number }],
  houseRules: [String],
};

const listingType = {
  id: Number,
  name: String,
};

const host = {
  id: Number,
  name: String,
  avatar: String,
};

const amenity = {
  id: Number,
  name: String,
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
