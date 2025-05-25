// jobs/cleanupUnverifiedUsers.js
const User = require('../models/User');

const deleteStaleUnverifiedUsers = async () => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const result = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: oneWeekAgo }
    });

    if (result.deletedCount > 0) {
      console.log(`[CLEANUP] Deleted ${result.deletedCount} unverified users.`);
    }
  } catch (err) {
    console.error('[CLEANUP] Failed to delete unverified users:', err);
  }
};

module.exports = deleteStaleUnverifiedUsers;
