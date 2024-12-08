import { User } from "../models/user.model.js";


export const authCallback = async (req, res, next) => {    
    try {
    const { id, firstName, lastName, imageUrl} = req.body;

        //if user is already exist
        const user = await User.findOne(id);
        if(!user) {
            //signup
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            });
        }

        res.status(200).json({
            success: true,
            message: "User created successfully",
        });

    } catch (error) {
        console.log("Error in authCallback");
        next(error);
    }
}