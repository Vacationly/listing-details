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
    country: String
  },
  capacity: [{ name: String, number: Number, icon: String }],
  highlights: [
    {
      id: Number,
      tagline: String,
      description: String,
      upvotes: Number
    }
  ],
  description: { main: String, more: [{ title: String, text: String }] },
  sleepingArrangements: [
    { spaceName: String, mattressType: String, number: Number }
  ],
  houseRules: [String],
  videoSource: String
};

const listingType = {
  id: Number,
  name: String
};

const host = {
  id: Number,
  name: String,
  avatar: String
};

const amenity = {
  id: Number,
  name: String,
  icon: String
};

const cancellationPolicy = {
  id: Number,
  name: String,
  overview: String,
  description: String
};

module.exports = {
  listing,
  host,
  listingType,
  amenity,
  cancellationPolicy
};

/*
{
  "type": 1,
  "host": 4,
  "cancellationPolicy": 0,
  "title": "Small home",
  "location": {
    "city": "tracy",
      "state": "CA",
      "country": "USA",
  },
  "capacity": [{
    "name" : "Guest",
    "number" : 4,
    "icon" : "https://s3.amazonaws.com/fec-overview-service-images/guest.png"
  },
  {
    "name" : "Bedroom",
    "number" : 1,
    "icon" : "https://s3.amazonaws.com/fec-overview-service-images/bedroom.png"
  }],
  "highlights": [
      {
      "id" : 1,
      "tagline" : "online wireless upward-trending",
      "description" : "Autem quam occaecati.",
      "upvotes" : 0
    },
    {
      "id" : 2,
      "tagline" : "sexy",
      "description" : "Officiis minima maiores tempora.",
      "upvotes" : 0
    },
    {
      "id" : 3,
      "tagline" : "port payment orange",
      "description" : "Accusantium maxime voluptates voluptatem quasi incidunt.",
      "upvotes" : 0
    }
  ],
  "description": { 
    "main": "this place rocks", 
    "more": [
      {
        "title" : "The space",
        "text" : "Assumenda molestiae assumenda ut neque voluptas impedit laudantium voluptatem dolorum. Nisi eligendi in veritatis. Sit sequi cum voluptatem. Quia doloribus eveniet aliquid ab molestiae quos consequuntur necessitatibus eos. Nesciunt porro voluptas vel eligendi magni. Dolores est voluptates."
      },
      {
        "title" : "Guest access",
        "text" : "Ea et commodi est delectus accusantium numquam quisquam. Sequi aut fuga et laudantium cumque hic. Ut itaque possimus quas adipisci provident deleniti ducimus."
      }
    ]
  },
  "sleepingArrangements": [{
    "spaceName" : "Generic Global",
    "mattressType" : "Orchestrator",
    "number" : 3
  }],
  "houseRules": ["none"],
  "videoSource": "",
}
*/
