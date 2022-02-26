const Booking = require('./models/booking')
const Listing = require('./models/listing')
const User = require('./models/user')

exports.resolvers = {
    Query: {
        getListings: async (parents, args) => {
            return await Listing.find({})
        },
        
        getListingsByName: async (parent, args) => {
            return await Listing.find({ listing_title: { $regex: args.name, $options: 'i' } })
        },

        getListingsByCity: async (parent, args) => {
            return await Listing.find({ city: args.city })
        },

        getListingsByPostalCode: async (parent, args) => {
            return await Listing.find({ postal_code: { $regex: args.postal_code, $options: 'i' } })
        },

        getBookingsByUser: async (parents, args) => {
            
            if (!args.userId) {
                return
            }

            const userFind = await User.findById(args.userId)

            if (!userFind) {
                return
            }
            
            return await Booking.find({ username: userFind.username })
        },

        getListingsByAdmin: async (parent, args) => {

            if (!args.userId) {
                return
            }

            const userFind = await User.findById(args.userId)

            if (!userFind) {
                return
            }

            if (userFind.type != 'admin') {
                return
            }

            return await Listing.find({ username: userFind.username })
        }

    },

    Mutation: {
        createUser: async (parent, args) => {

            let user = new User({
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                password: args.password,
                email: args.email,
                type: args.type
            })

            return user.save()
        },

        login: async (parent, args) => {
            const userFind = await User.findOne({username: args.username})

            if (!userFind) {
                return
            }

            if (userFind.password != args.password) {
                return
            }
            return userFind._id
        },

        createListing: async (parent, args, context) => {

            let newListing = new Listing({
                listing_id : args.listing_id,
                listing_title : args.listing_title,
                description : args.description,
                street : args.street,
                city : args.city,
                postal_code : args.postal_code,
                price : args.price,
                email : args.email,
                username : args.username,
            });
    
            return newListing.save();
        },

        createBooking: async (parent, args) => {

            let newBooking = new Booking({
                listing_id : args.listing_id,
                booking_id : args.booking_id,
                booking_date : args.booking_date,
                booking_start : args.booking_start,
                booking_end : args.booking_end,
                username : args.username
            });
            return newBooking.save();
        }
        
    }
}