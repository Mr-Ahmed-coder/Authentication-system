import { User } from '../models/User.js';

export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    });
  } catch (err) {
    console.error('GetMe error:', err);
    return res
      .status(500)
      .json({ message: 'Server error during profile fetch', detail: err.message });
  }
}

