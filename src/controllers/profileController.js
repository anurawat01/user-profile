const User = require('../models/User');

// Get user profile by user ID
exports.getUserProfile = async function (req, res) {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.status(200).send({ user });
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).send({ message: 'Internal server error.' });
    }
};

// Get all user profiles based on user's role
exports.getAllUserProfiles = async function (req, res) {
    try {
        const isAdmin = req.role;
        const users = isAdmin ? await User.find() : await User.find({ 'profile.public': true });

        if (!users || users.length === 0) {
            return res.status(404).send({ message: 'No users found.' });
        }

        const profiles = users.map(user => user.profile);
        res.status(200).send({ profiles });
    } catch (error) {
        console.error('Error in getAllUserProfiles:', error);
        res.status(500).send({ message: 'Internal server error.' });
    }
};

// Edit user profile by user ID
exports.editUserProfile = async function (req, res) {
    try {
        const { _id, username, ...updateData } = req.body;
        if (_id || username ) {
            throw new Error('Cannot update _id or username.');
        }

        const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found.' });
        }

        res.status(200).send({ message: 'Profile updated successfully', data: updatedUser });
    } catch (error) {
        console.error('Error in editUserProfile:', error);
        res.status(500).send({ message: 'Internal server error.' });
    }
};
