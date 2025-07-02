import { Router } from 'express';
import { 
    logoutUser, 
    updateAccountDetails, 
    updateUserAvatar,
    getUserProfile
} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

// NOTE: User registration and login POST routes are handled in `auth.route.js` to avoid duplication.

// Secured Routes
router.route("/profile/:username").get(protect, getUserProfile);
router.route("/logout").post(protect, logoutUser);
router.route("/update-account").patch(protect, updateAccountDetails);
router.route("/avatar").patch(protect, upload.single("avatar"), updateUserAvatar);

export default router;