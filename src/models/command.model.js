
import mongoose from 'mongoose';

const commandSchema = new mongoose.Schema({

    intent: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    examples: [
    {
        text: {
            type: String,
            required: true
        },

        embedding: {
            type: [Number],
            default: []
        }
    }
    
    ],

    operation: {
        type: String,
        required: true,
        enum: [
            'current_directory',
            'list_files',
            'show_date'
        ]
    },

    riskLevel: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },

    requiresConfirmation: {
        type: Boolean,
        default: false
    },

    isEnabled: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

const Command = mongoose.model('Command', commandSchema);

export default Command;
