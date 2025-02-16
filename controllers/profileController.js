const { getDb } = require("../config/db");

const getProfilesList = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('ProfileList');
        const profiles = await collection.find({}).toArray();
        return res.status(200).json(profiles);
    } catch (error) {
        console.error('Error getting profiles list');
        return res.status(500).json({message: 'Error getting profiles list'});
    }
}

const createProfile = async (req, res) => {
    const { name, email, phone, address, profilePicture, jobTitle, company, bio, linkedIn, twitter } = req.body;
    try {
        const db = getDb();
        const collection = db.collection('ProfileList');
        const user = await collection.findOne({ email, phone });
        if (user) {
            res.status(400).json({message: 'Profile already Exists'});
            return;
        }
        await collection.insertOne({ name, email, phone, address, profilePicture, jobTitle, company, bio, linkedIn, twitter });
        res.status(200).json({message: 'Profile created successfully'});
    } catch(error) {
        console.error('Error creating profile');
        res.status(500).json({message: 'Error creating profile'});
    }
}

const updateProfile = async (req, res) => {
    const { name, email, phone, address, profilePicture, jobTitle, company, bio, linkedIn, twitter } = req.body;
    try {
        const db = getDb();
        const collection = db.collection('ProfileList');
        await collection.updateOne({
            email: email,
            phone: phone
        }, {
            $set: {
                name: name,
                phone: phone,
                address: address,
                profilePicture: profilePicture,
                jobTitle: jobTitle,
                company: company,
                bio: bio,
                linkedIn: linkedIn,
                twitter: twitter
            }
        });
        res.status(200).json({message: 'Profile updated successfully'});
    } catch(error) {
        console.error('Error updating profile');
        res.status(500).json({message: 'Error updating profile'});
    }
}

module.exports = { getProfilesList, createProfile };