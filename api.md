## Api Routes

C: `/api/details/:listingId`

R: `/api/details/:listingId'`

U: `/api/details/:listingId/highlights/:highlightId'`

d: `/api/details/:listingId/delete'`

## Schema Structure

#### Listings

    {
      listingId: { type: Number, unique: true },

      // Old Server Code
      // typeId: Number,
      // hostId: Number,
      // amenityIds: [ Number ],
      // cancellationPolicyId: Number,

      type: ForeignKey<Type>,
      host: ForeignKey<Host>,
      amenitys: [ ForeignKey<Amenities> ],
      cancellationPolicy ForeignKey<CancellationPolicy>,
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
      videoSource: String,
    }

#### ListingType

    {
      // id: Number, -> db unquie id
      name: String,
    }

#### Host

    {
      // id: Number, -> db unquie id
      name: String,
      avatar: String,
    }

#### Amenity

    {
      // id: Number, -> db unquie id
      name: String,
      icon: String,
    }

#### cancellationPolicy

    {
      // id: Number, -> db unquie id
      name: String,
      overview: String,
      description: String,
    }
