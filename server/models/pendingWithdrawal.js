const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pendingWithdrawalSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
     
        status: {
            type: String,
            required: true,
            default: 'Pending',
        },
        currency: {
            type: String,
            required: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },

        email: {
            type: String,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('pendingWithdrawal', pendingWithdrawalSchema)
