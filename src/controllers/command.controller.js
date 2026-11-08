
import Command from '../models/command.model.js';

export const createCommand = async (req, res) => {
    try {
        const {
            intent,
            description,
            examples,
            operation,
            riskLevel,
            requiresConfirmation
        } = req.body;

        // Check required fields
        if (
            !intent ||
            !description ||
            !examples ||
            !operation
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check examples
        if (!Array.isArray(examples) || examples.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Examples must be a non-empty array'
            });
        }

        // Create command
        const command = await Command.create({
            intent,
            description,
            examples,
            operation,
            riskLevel,
            requiresConfirmation
        });

        return res.status(201).json({
            success: true,
            message: 'Command created successfully',
            data: command
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'This intent already exists'
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
