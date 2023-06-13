const jwt=require("jsonwebtoken");

exports.auth = function (req, res, next) {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Access denied: no token provided' });
      }    
      try {
        // Verify the token and get the payload
        const decoded = jwt.verify(token, 'harry');
    
        // Add the payload to the request object
        req.user = decoded;
    
        // Call the next middleware function
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Access denied: invalid token' });
      }
    }