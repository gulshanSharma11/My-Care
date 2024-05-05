import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "SuccessFully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id).select("-password");
    res.status(200).json({
      success: true,
      message: "SuccessFully Deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to Delete" });
  }
};
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No user found" });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};




export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    res
      .status(200)
      .json({
        success: true,
        message: "Profile info is getting",
        data: { ...rest },
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "somethink went wrong, cant get" });
  }
};

// export const getMyAppointments = async (req, res) => {
//   try {
//     // step-1 retrieve appointment from booking for specific user

//     const bookings = await Booking.findById({ user: req.userId });

//     // step2 extract doctor ids from appoinment booking

//     const doctorIds = bookings.map(el => el.doctor.id);

//     // step 3 retrieve doctors using ddoctor ids

//     const doctors = await Doctor.find();

//     res.status(200).json({success:true, message:'Appoinments are getting', data:doctors})
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, message: "somethink went wrong, cant get" });
//   }
// };
export const getMyAppointments = async (req, res) => {
  try {
    // Step 1: Retrieve appointments (bookings) for the specific user
    const bookings = await Booking.find({ user: req.userId });

    // Step 2: Extract doctor ids from the appointments
    const doctorIds = bookings.map(el => el.doctor);

    // Step 3: Retrieve doctors using the extracted doctor ids
    const doctors = await Doctor.find({ _id: { $in: doctorIds } });

    res.status(200).json({ success: true, message: 'Appointments are retrieved', data: doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Something went wrong, unable to retrieve appointments' });
  }
};

