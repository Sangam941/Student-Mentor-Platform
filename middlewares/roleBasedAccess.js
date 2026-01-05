
// Middleware for role-based access control

const roleBasedAccess = (...roles) => {
    return (req, res, next) => {
        try {
            // Check if user is authenticated (should be set by isAuthenticated middleware)
            if (!req.user || !req.user.role) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required. Please login first.'
                });
            }

            // Check if user's role is in the allowed roles
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. You do not have permission to access this resource.'
                });
            }

            // User has required role, proceed
            next();
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Authorization error.',
                error: error.message
            });
        }
    };
};

export default roleBasedAccess;

export const adminOnly = roleBasedAccess("admin");
export const mentorOnly = roleBasedAccess("mentor");
export const studentOnly = roleBasedAccess("student");
export const adminAndMentor = roleBasedAccess("admin", "mentor");

