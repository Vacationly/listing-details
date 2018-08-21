## Api Routes

C: `/api/details/`

R: `/api/details/:listingId'`

U: `/api/details/:listingId/highlights/:highlightId'`

d: `/api/details/:listingId/delete'`

## Schema Structure

#### Listings

    {
      listingId: { type: Number, unique: true },
      type: ForeignKey<Type>,
      host: ForeignKey<Host>,
      amenitys: [ ForeignKey<Amenities> ],
      cancellationPolicy ForeignKey<CancellationPolicy>,
      title: String,
      location: ForgeinKey<Location>,

      <!-- old -->
      // capacity: [{ name: String, number: Number, icon: String }],
      <!-- new -->
      guests: Number,
      bedrooms: Number,
      beds: Number,
      bathrooms: Number
      <!-- / -->

      <!-- old -->
      // highlights: [
      // {
        //  id: Number,
        //  tagline: String,
        //  description: String,
        //  upvotes: Number,
       // },
      // ],
      <!-- new -->
      highlights: <join table>
      <!-- / -->

      <!-- old -->
      description: { main: String, more: [{ title: String, text: String }] },
      <!-- new -->
      description: textArea
      additionalDescription: wysiwyg || textarea
      <!-- / -->

      // sleepingArrangements: [{ spaceName: String, mattressType: String, number: Number }], refactor
      houseRules: [String],
      videoSource: String,
    }

#### Highlights

      {
        id: Number,
        tagline: String,
        description: String,
        upvotes: Number,
        listingId: Number<Listing main id>
      }

#### HouseRules

      {
        rule: String
        listingId: Number<Listing main id>
      }

#### ListingType

    {
      // id: Number, -> db unquie id
      name: String
    }

#### Host

    {
      // id: Number, -> db unquie id
      name: String,
      avatar: String
    }

#### Amenities

    {
      // id: Number, -> db unquie id
      name: String,
      icon: String
    }

#### cancellationPolicy

    {
      // id: Number, -> db unquie id
      name: String,
      overview: String,
      description: String,
      listingId: Number<Listing main id>
    }
